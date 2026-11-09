import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

// ─── Storage ─────────────────────────────────────────────────────────────────

const TOUR_KEY = "coach-space-tour-v1";
export function isTourDone(): boolean {
  try { return !!localStorage.getItem(TOUR_KEY); } catch { return true; }
}
function saveTourDone() {
  try { localStorage.setItem(TOUR_KEY, "1"); } catch {}
}

// ─── Steps ───────────────────────────────────────────────────────────────────

type TourStep = {
  selector: string | null;
  title: string;
  desc: string;
  icon: string;
  arrowDir?: "up" | "down";
};

const STEPS: TourStep[] = [
  {
    selector: null,
    title: "Быстрый тур",
    desc: "Покажем, где что находится — займёт меньше минуты.",
    icon: "🗺️",
  },
  {
    selector: "[data-tour='nav']",
    title: "Навигация",
    desc: "Четыре раздела: Главная, Модули, Инструменты и Заметки. Всё под рукой.",
    icon: "🧭",
    arrowDir: "down",
  },
  {
    selector: "[data-tour='nav-modules']",
    title: "Учебные модули",
    desc: "7 модулей профессиональной программы — GROW, супервизия, трансформационный коучинг, метафоры.",
    icon: "📚",
    arrowDir: "down",
  },
  {
    selector: "[data-tour='nav-tools']",
    title: "Инструменты",
    desc: "Колесо жизни, SMART, SWOT, Декарт и другие — готовы прямо во время сессии с клиентом.",
    icon: "🛠️",
    arrowDir: "down",
  },
  {
    selector: "[data-tour='nav-notes']",
    title: "Заметки сессии",
    desc: "Записывайте ход сессии и экспортируйте протокол в WhatsApp, Telegram или email.",
    icon: "📝",
    arrowDir: "down",
  },
  {
    selector: null,
    title: "Всё готово!",
    desc: "Coach Space готов к работе. Удачных сессий и вдохновляющих коучинговых встреч!",
    icon: "🎯",
  },
];

// ─── Spotlight ────────────────────────────────────────────────────────────────

const PADDING = 10;

function SpotlightHole({ rect, visible }: { rect: DOMRect; visible: boolean }) {
  return (
    <>
      {/* Dark overlay — four quadrants around the spotlight */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        {/* Top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: Math.max(0, rect.top - PADDING), background: "rgba(0,0,0,0.78)" }} />
        {/* Bottom */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: rect.bottom + PADDING, background: "rgba(0,0,0,0.78)" }} />
        {/* Left */}
        <div style={{ position: "absolute", top: rect.top - PADDING, left: 0, width: Math.max(0, rect.left - PADDING), height: rect.height + PADDING * 2, background: "rgba(0,0,0,0.78)" }} />
        {/* Right */}
        <div style={{ position: "absolute", top: rect.top - PADDING, right: 0, left: rect.right + PADDING, height: rect.height + PADDING * 2, background: "rgba(0,0,0,0.78)" }} />
      </div>
      {/* Glow ring around spotlight */}
      <div
        style={{
          position: "fixed",
          top: rect.top - PADDING,
          left: rect.left - PADDING,
          width: rect.width + PADDING * 2,
          height: rect.height + PADDING * 2,
          borderRadius: 16,
          border: "2px solid rgba(255,255,255,0.25)",
          boxShadow: "0 0 24px rgba(255,255,255,0.08)",
          zIndex: 50,
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}

// ─── Tooltip card ─────────────────────────────────────────────────────────────

function TourCard({
  step, stepIndex, total, rect, visible, isLast,
  onNext, onSkip,
}: {
  step: TourStep;
  stepIndex: number;
  total: number;
  rect: DOMRect | null;
  visible: boolean;
  isLast: boolean;
  onNext: () => void;
  onSkip: () => void;
}) {
  const isFullScreen = !rect;

  // Position: if rect exists and is in lower half → card goes above
  const spaceBelow = rect ? window.innerHeight - (rect.bottom + PADDING + 16) : 0;
  const goAbove = rect ? spaceBelow < 220 : false;

  const cardStyle: React.CSSProperties = isFullScreen
    ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.92})`,
        width: "min(340px, calc(100vw - 32px))",
        zIndex: 60,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }
    : goAbove
    ? {
        position: "fixed",
        bottom: window.innerHeight - rect.top + PADDING + 12,
        left: 16,
        right: 16,
        zIndex: 60,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 10}px)`,
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }
    : {
        position: "fixed",
        top: rect.bottom + PADDING + 12,
        left: 16,
        right: 16,
        zIndex: 60,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : -10}px)`,
        transition: "opacity 0.22s ease, transform 0.22s ease",
      };

  return (
    <div style={cardStyle}>
      <div
        style={{
          background: "var(--card, #1c1c1e)",
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header gradient strip */}
        <div style={{
          background: "linear-gradient(135deg, oklch(0.55 0.18 290), oklch(0.5 0.2 250))",
          padding: "20px 20px 16px",
        }}>
          {/* Top row: dots + skip */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{
                  width: i === stepIndex ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === stepIndex ? "white" : "rgba(255,255,255,0.35)",
                  transition: "width 0.3s ease",
                }} />
              ))}
            </div>
            <button
              onClick={onSkip}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "white",
              }}
              aria-label="Закрыть тур"
            >
              <X size={14} />
            </button>
          </div>

          {/* Emoji */}
          <div style={{ fontSize: 36, lineHeight: 1, marginBottom: 10 }}>{step.icon}</div>
          {/* Title */}
          <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
            {step.title}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 20px 20px" }}>
          <p style={{
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--muted-foreground, rgba(255,255,255,0.65))",
            margin: 0,
            marginBottom: 20,
          }}>
            {step.desc}
          </p>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Skip link */}
            {!isLast && (
              <button
                onClick={onSkip}
                style={{
                  flex: "0 0 auto",
                  padding: "10px 14px",
                  borderRadius: 14,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--muted-foreground, rgba(255,255,255,0.5))",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Пропустить
              </button>
            )}
            {/* Next / Done */}
            <button
              onClick={onNext}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 14,
                background: "linear-gradient(135deg, oklch(0.55 0.18 290), oklch(0.5 0.2 250))",
                border: "none",
                color: "white",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 16px oklch(0.55 0.18 290 / 0.4)",
              }}
            >
              {isLast ? "Начать работу →" : "Далее →"}
            </button>
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      {rect && (
        <div style={{
          position: "absolute",
          [goAbove ? "bottom" : "top"]: goAbove ? -10 : -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          [goAbove ? "borderTop" : "borderBottom"]: "10px solid var(--card, #1c1c1e)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }} />
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FeatureTour({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number | null>(null);

  const currentStep = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const measureRect = useCallback(() => {
    const sel = currentStep.selector;
    if (!sel) { setRect(null); return; }
    const el = document.querySelector(sel);
    if (el) setRect(el.getBoundingClientRect());
  }, [currentStep.selector]);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // slight delay so layout is settled
    rafRef.current = requestAnimationFrame(() => {
      measureRect();
    });
    window.addEventListener("resize", measureRect);
    return () => {
      window.removeEventListener("resize", measureRect);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measureRect]);

  const advance = () => {
    if (isLast) {
      saveTourDone();
      onFinish();
      return;
    }
    setVisible(false);
    setTimeout(() => {
      setStep((s) => s + 1);
      setVisible(true);
    }, 200);
  };

  const skip = () => {
    saveTourDone();
    onFinish();
  };

  return (
    <>
      {/* Full-screen click blocker (not over spotlight area) */}
      {!rect && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            background: visible ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0)",
            transition: "background 0.2s ease",
            pointerEvents: "all",
          }}
          onClick={advance}
        />
      )}

      {/* Spotlight overlay */}
      {rect && <SpotlightHole rect={rect} visible={visible} />}

      {/* Card */}
      <TourCard
        step={currentStep}
        stepIndex={step}
        total={STEPS.length}
        rect={rect}
        visible={visible}
        isLast={isLast}
        onNext={advance}
        onSkip={skip}
      />
    </>
  );
}
