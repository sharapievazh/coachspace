type CapacitorKeyboard = {
  setResizeMode?: (options: { mode: "native" | "body" | "ionic" | "none" }) => Promise<void>;
  setScroll?: (options: { isDisabled: boolean }) => Promise<void>;
  setAccessoryBarVisible?: (options: { isVisible: boolean }) => Promise<void>;
};

declare global {
  interface Window {
    Capacitor?: {
      getPlatform?: () => string;
      Plugins?: {
        Keyboard?: CapacitorKeyboard;
      };
    };
    webkit?: {
      messageHandlers?: {
        nativeTextInput?: {
          postMessage?: (data: unknown) => void;
        };
      };
    };
    // Called by Swift after the user taps Done in the native editor
    nativeTextareaSetValue?: (text: string) => void;
    // The input/textarea currently being edited natively
    __activeNativeInput?: HTMLInputElement | HTMLTextAreaElement | null;
  }
}

const isIOSCapacitor = () => {
  if (typeof window === "undefined") return false;
  const platform = window.Capacitor?.getPlatform?.();
  return window.location.protocol === "capacitor:" && platform === "ios";
};

// Input types that need native keyboard (exclude checkbox, radio, button, etc.)
const TEXT_INPUT_TYPES = new Set([
  "", "text", "search", "email", "tel", "url", "number",
]);

function isTextInput(el: Element): el is HTMLInputElement | HTMLTextAreaElement {
  if (el instanceof HTMLTextAreaElement) return true;
  if (el instanceof HTMLInputElement) {
    return TEXT_INPUT_TYPES.has((el.type ?? "").toLowerCase());
  }
  return false;
}

export function startIOSKeyboardStabilizer() {
  if (!isIOSCapacitor()) return;

  document.documentElement.classList.add("cap-ios");

  const keyboard = window.Capacitor?.Plugins?.Keyboard;
  keyboard?.setScroll?.({ isDisabled: false }).catch(() => {});
  keyboard?.setAccessoryBarVisible?.({ isVisible: false }).catch(() => {});

  setupNativeTextInput();
}

function setupNativeTextInput() {
  // Swift calls this after the user taps Done.
  window.nativeTextareaSetValue = (text: string) => {
    const el = window.__activeNativeInput;
    if (!el) return;

    // Use the native property setter so React's synthetic events fire.
    const proto =
      el instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(proto, "value");
    descriptor?.set?.call(el, text);

    // Dispatch both input and change — React onChange listens to whichever
    // the current React version maps to (varies between 16/17/18).
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
    window.__activeNativeInput = null;
  };

  // ── Patch HTMLTextAreaElement.prototype.focus ──────────────────────────────
  // Intercepts programmatic .focus() calls (e.g. React autofocus, appendToNotes).
  // NEVER call originalFocus on iOS Capacitor — it triggers WebKit RTI which
  // disconnects because WebContent CPU-render latency > 333ms RTI timeout.
  const _origTextareaFocus = HTMLTextAreaElement.prototype.focus;
  HTMLTextAreaElement.prototype.focus = function (options?: FocusOptions) {
    const h = window.webkit?.messageHandlers?.nativeTextInput;
    if (h?.postMessage) {
      window.__activeNativeInput = this;
      h.postMessage({ action: "show", text: this.value, placeholder: this.placeholder || "" });
      return;
    }
    // Handler not yet registered — suppress RTI silently.
    console.log("[NativeInput] textarea.focus() suppressed (handler not ready)");
  };

  // ── Patch HTMLInputElement.prototype.focus ────────────────────────────────
  const _origInputFocus = HTMLInputElement.prototype.focus;
  HTMLInputElement.prototype.focus = function (options?: FocusOptions) {
    if (!isTextInput(this)) {
      // Non-text inputs (checkbox, radio…) — keep original behaviour.
      _origInputFocus.call(this, options);
      return;
    }
    const h = window.webkit?.messageHandlers?.nativeTextInput;
    if (h?.postMessage) {
      window.__activeNativeInput = this;
      h.postMessage({ action: "show", text: this.value, placeholder: this.placeholder || "" });
      return;
    }
    console.log("[NativeInput] input.focus() suppressed (handler not ready)");
  };

  // ── Per-element touch interception ────────────────────────────────────────

  function sendToNative(el: HTMLInputElement | HTMLTextAreaElement) {
    const h = window.webkit?.messageHandlers?.nativeTextInput;
    window.__activeNativeInput = el;

    // Blur any active element before sending to Swift. Without this, WKContentView
    // may still hold an internal "about to focus" state and try to establish RTI
    // when the UITextView keyboard appears, causing Reporter disconnected × 9.
    if (document.activeElement && document.activeElement !== document.body) {
      (document.activeElement as HTMLElement).blur?.();
    }

    if (h?.postMessage) {
      console.log("[NativeInput] → native editor (" + el.tagName.toLowerCase() + ") text.length=" + el.value.length);
      h.postMessage({ action: "show", text: el.value, placeholder: el.placeholder || "" });
    } else {
      console.log("[NativeInput] ERROR: handler not registered");
    }
  }

  function interceptElement(el: HTMLInputElement | HTMLTextAreaElement) {
    const tagged = el as typeof el & { __nativeIntercepted?: boolean };
    if (tagged.__nativeIntercepted) return;
    tagged.__nativeIntercepted = true;

    // touchstart: preventDefault stops scroll/zoom and the simulated-mouse-event
    // chain (touchstart → touchend → click → focus) that would trigger WebKit RTI.
    el.addEventListener(
      "touchstart",
      (e) => { e.preventDefault(); e.stopImmediatePropagation(); },
      { passive: false, capture: true },
    );

    // touchend: preventDefault blocks any remaining focus/click path,
    // then we open the native editor ourselves.
    el.addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        sendToNative(el);
      },
      { passive: false, capture: true },
    );
  }

  const INPUT_SELECTOR =
    "textarea, input:not([type]), input[type='text'], input[type='search'], " +
    "input[type='email'], input[type='tel'], input[type='url'], input[type='number']";

  function scanForInputs(root: Element | Document) {
    (root as Element).querySelectorAll?.(INPUT_SELECTOR)?.forEach((el) => {
      if (isTextInput(el)) interceptElement(el as HTMLInputElement | HTMLTextAreaElement);
    });
  }

  scanForInputs(document);
  console.log("[NativeInput] initial scan done");

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if ((node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) && isTextInput(node)) {
          interceptElement(node);
        } else if (node instanceof Element) {
          scanForInputs(node);
        }
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  console.log("[NativeInput] MutationObserver started");
}
