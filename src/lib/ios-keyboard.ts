type CapacitorKeyboard = {
  setResizeMode?: (options: { mode: "native" | "body" | "ionic" | "none" }) => Promise<void>;
  setScroll?: (options: { isDisabled: boolean }) => Promise<void>;
  setAccessoryBarVisible?: (options: { isVisible: boolean }) => Promise<void>;
  addListener?: (eventName: string, listener: (info?: { keyboardHeight?: number }) => void) => { remove?: () => void } | Promise<{ remove?: () => void }>;
};

declare global {
  interface Window {
    __coachSpaceKeyboardActive?: boolean;
    Capacitor?: {
      getPlatform?: () => string;
      isNativePlatform?: () => boolean;
      Plugins?: {
        Keyboard?: CapacitorKeyboard;
      };
    };
  }
}

const isInputElement = (target: EventTarget | null): target is HTMLInputElement | HTMLTextAreaElement => {
  return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
};

const isIOSCapacitor = () => {
  if (typeof window === "undefined") return false;
  const platform = window.Capacitor?.getPlatform?.();
  return window.location.protocol === "capacitor:" && platform === "ios";
};

export function startIOSKeyboardStabilizer() {
  if (!isIOSCapacitor()) return;

  const keyboard = window.Capacitor?.Plugins?.Keyboard;

  keyboard?.setResizeMode?.({ mode: "native" }).catch((error) => {
    console.warn("[keyboard] resize mode failed", error);
  });
  keyboard?.setScroll?.({ isDisabled: false }).catch((error) => {
    console.warn("[keyboard] scroll mode failed", error);
  });
  keyboard?.setAccessoryBarVisible?.({ isVisible: true }).catch(() => {});

  const scrollFocusedField = (el: HTMLInputElement | HTMLTextAreaElement) => {
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        if (document.activeElement !== el) return;
        el.scrollIntoView({ block: "center", inline: "nearest", behavior: "auto" });
      }, 180);
    });
  };

  document.addEventListener(
    "focusin",
    (event) => {
      if (!isInputElement(event.target)) return;
      window.__coachSpaceKeyboardActive = true;
      document.documentElement.classList.add("ios-keyboard-active");
      scrollFocusedField(event.target);
      console.info("[keyboard] focus", { tag: event.target.tagName, type: event.target.type });
    },
    { passive: true },
  );

  document.addEventListener(
    "focusout",
    (event) => {
      if (!isInputElement(event.target)) return;
      window.setTimeout(() => {
        if (isInputElement(document.activeElement)) return;
        window.__coachSpaceKeyboardActive = false;
        document.documentElement.classList.remove("ios-keyboard-active");
        console.info("[keyboard] blur");
      }, 250);
    },
    { passive: true },
  );

  window.addEventListener("keyboardWillShow", (event) => {
    window.__coachSpaceKeyboardActive = true;
    document.documentElement.classList.add("ios-keyboard-active");
    console.info("[keyboard] will show", (event as CustomEvent).detail ?? {});
  });

  window.addEventListener("keyboardWillHide", () => {
    window.__coachSpaceKeyboardActive = false;
    document.documentElement.classList.remove("ios-keyboard-active");
    console.info("[keyboard] will hide");
  });
}
