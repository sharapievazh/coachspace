// Background timer worker — keeps ticking even when the tab is hidden.
let intervalId = null;
let endsAt = null;

function clear() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  endsAt = null;
}

self.addEventListener("message", (e) => {
  const data = e.data || {};
  if (data.type === "start" && typeof data.endsAt === "number") {
    clear();
    endsAt = data.endsAt;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      self.postMessage({ type: "tick", remaining });
      if (remaining <= 0) {
        self.postMessage({ type: "end" });
        clear();
      }
    };
    tick();
    intervalId = setInterval(tick, 500);
  } else if (data.type === "stop") {
    clear();
  }
});
