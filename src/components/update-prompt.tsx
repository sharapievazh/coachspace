import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { APP_VERSION, BUNDLE_ID, isNewerVersion } from "@/lib/app-version";

const DISMISSED_KEY = "coach-space-update-dismissed";

export default function UpdatePrompt() {
  const [storeVersion, setStoreVersion] = useState<string | null>(null);
  const [storeUrl, setStoreUrl] = useState<string>("");
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Only run on real iOS/Android device
    if (!Capacitor.isNativePlatform()) return;

    // Don't show if already dismissed this version
    try {
      if (localStorage.getItem(DISMISSED_KEY) === APP_VERSION) return;
    } catch {}

    const check = async () => {
      try {
        const res = await fetch(
          `https://itunes.apple.com/lookup?bundleId=${BUNDLE_ID}&country=ru`,
          { cache: "no-store" }
        );
        const data = await res.json();
        const result = data?.results?.[0];
        if (!result) return;
        const ver: string = result.version;
        const url: string = result.trackViewUrl;
        if (isNewerVersion(ver, APP_VERSION)) {
          setStoreVersion(ver);
          setStoreUrl(url);
        }
      } catch {
        // No network or API unavailable — silent fail
      }
    };

    // Small delay so app finishes loading first
    const t = setTimeout(check, 3000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    try { localStorage.setItem(DISMISSED_KEY, APP_VERSION); } catch {}
    setDismissed(true);
  };

  const openStore = () => {
    if (storeUrl) window.open(storeUrl, "_blank");
    dismiss();
  };

  if (!storeVersion || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 72px)",
        left: 16,
        right: 16,
        zIndex: 200,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          background: "var(--card)",
          border: "1.5px solid var(--border)",
          borderRadius: 20,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: "var(--primary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: 22,
          }}
        >
          🚀
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>
            Доступно обновление {storeVersion}
          </div>
          <div style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 2 }}>
            Новые функции и улучшения
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
          <button
            onClick={openStore}
            style={{
              padding: "7px 14px",
              borderRadius: 10,
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              fontSize: 13, fontWeight: 700,
              border: "none", cursor: "pointer",
            }}
          >
            Обновить
          </button>
          <button
            onClick={dismiss}
            style={{
              padding: "4px 8px",
              borderRadius: 8,
              background: "transparent",
              color: "var(--muted-foreground)",
              fontSize: 11, fontWeight: 500,
              border: "none", cursor: "pointer",
              textAlign: "center",
            }}
          >
            Позже
          </button>
        </div>
      </div>
    </div>
  );
}
