// Lightweight runtime diagnostics for iOS WebView (Capacitor) and browsers.
// Logs long tasks, frame hangs, unhandled errors, slow resources and memory.
// Zero deps. Safe to import once from the app entry.

type LogLevel = "info" | "warn" | "error";

const TAG = "[perf]";
const LONG_TASK_MS = 50;      // PerformanceObserver longtask threshold
const FRAME_HANG_MS = 400;    // rAF gap considered a hang
const SLOW_RESOURCE_MS = 1500;

function log(level: LogLevel, ...args: unknown[]) {
  // eslint-disable-next-line no-console
  (console[level] ?? console.log).call(console, TAG, ...args);
}

let started = false;

export function startPerfDiagnostics() {
  if (started || typeof window === "undefined") return;
  started = true;

  const nav =
    typeof navigator !== "undefined" ? navigator.userAgent : "unknown";
  log("info", "diagnostics started", { ua: nav, at: new Date().toISOString() });

  // 1) Global JS errors
  window.addEventListener("error", (e) => {
    log("error", "window.error", {
      message: e.message,
      source: e.filename,
      line: e.lineno,
      col: e.colno,
      stack: e.error && (e.error as Error).stack,
    });
  });

  window.addEventListener("unhandledrejection", (e) => {
    const reason = (e as PromiseRejectionEvent).reason;
    log("error", "unhandledrejection", {
      reason:
        reason instanceof Error
          ? { message: reason.message, stack: reason.stack }
          : reason,
    });
  });

  // 2) Long tasks (blocking >50ms on the main thread)
  try {
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration >= LONG_TASK_MS) {
          log("warn", "longtask", {
            duration: Math.round(entry.duration),
            startTime: Math.round(entry.startTime),
            name: entry.name,
          });
        }
      }
    });
    po.observe({ type: "longtask", buffered: true });
  } catch {
    // longtask not supported on iOS WebKit — fall through to rAF hang detector
  }

  // 3) Frame-hang detector (works on iOS WebKit)
  let lastFrame = performance.now();
  const tick = () => {
    const now = performance.now();
    const gap = now - lastFrame;
    if (gap > FRAME_HANG_MS) {
      log("warn", "frame hang", { gapMs: Math.round(gap) });
    }
    lastFrame = now;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // 4) Slow resources
  try {
    const ro = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceResourceTiming[]) {
        if (entry.duration >= SLOW_RESOURCE_MS) {
          log("warn", "slow resource", {
            name: entry.name,
            duration: Math.round(entry.duration),
            transferSize: entry.transferSize,
            initiatorType: entry.initiatorType,
          });
        }
      }
    });
    ro.observe({ type: "resource", buffered: true });
  } catch {
    /* ignore */
  }

  // 5) Navigation timing snapshot
  window.addEventListener("load", () => {
    setTimeout(() => {
      const [n] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];
      if (n) {
        log("info", "navigation timing", {
          domContentLoaded: Math.round(
            n.domContentLoadedEventEnd - n.startTime,
          ),
          load: Math.round(n.loadEventEnd - n.startTime),
          domInteractive: Math.round(n.domInteractive - n.startTime),
          transferSize: n.transferSize,
        });
      }
      // Chromium-only, but harmless where absent
      const mem = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (mem) {
        log("info", "memory", {
          usedMB: Math.round(mem.usedJSHeapSize / 1048576),
          totalMB: Math.round(mem.totalJSHeapSize / 1048576),
          limitMB: Math.round(mem.jsHeapSizeLimit / 1048576),
        });
      }
    }, 0);
  });

  // 6) Visibility changes — helpful when iOS suspends the WebView
  document.addEventListener("visibilitychange", () => {
    log("info", "visibility", { state: document.visibilityState });
  });

  // 7) First tap latency (from pointerdown to next frame)
  window.addEventListener(
    "pointerdown",
    (e) => {
      const t0 = performance.now();
      requestAnimationFrame(() => {
        const dt = performance.now() - t0;
        if (dt > 100) {
          log("warn", "slow tap response", {
            ms: Math.round(dt),
            target: (e.target as Element | null)?.tagName,
          });
        }
      });
    },
    { passive: true, capture: true },
  );
}
