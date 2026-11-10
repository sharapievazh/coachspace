import { useCallback, useEffect, useRef, useState } from "react";
import { X, BookOpen, ListChecks, MessageCircleQuestion, Headphones, Wrench } from "lucide-react";

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
  items?: { icon: React.ElementType; text: string }[];
};

const STEPS: TourStep[] = [
  {
    selector: null,
    title: "Добро пожаловать!",
    desc: "Coach Space — рабочее пространство профессионального коуча. Покажем, что здесь есть.",
    icon: "👋",
  },
  {
    selector: "[data-tour='nav']",
    title: "Что есть в приложении",
    desc: "",
    icon: "🧭",
    items: [
      { icon: BookOpen, text: "Модули по обучению коучинга" },
      { icon: ListChecks, text: "33 техники коучинга" },
      { icon: MessageCircleQuestion, text: "Коучинговые вопросы и инструменты" },
      { icon: Headphones, text: "Подкасты — аудиоподкасты в виде разговоров" },
    ],
  },
  {
    selector: "[data-tour='nav-modules']",
    title: "Учебные модули",
    desc: "7 модулей профессиональной программы — GROW, супервизия, трансформационный коучинг, метафоры.",
    icon: "📚",
  },
  {
    selector: "[data-tour='nav-tools']",
    title: "Инструменты",
    desc: "Колесо жизни, SMART, SWOT, Декарт, 33 техники коучинга и другие — готовы прямо во время сессии с клиентом.",
    icon: "🛠️",
  },
  {
    selector: "[data-tour='nav-notes']",
    title: "Заметки сессии",
    desc: "Записывайте ход сессии и экспортируйте протокол в WhatsApp, Telegram или email.",
    icon: "📝",
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
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: Math.max(0, rect.top - PADDING), background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: rect.bottom + PADDING, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", top: rect.top - PADDING, left: 0, width: Math.max(0, rect.left - PADDING), height: rect.height + PADDING * 2, background: "rgba(0,0,0,0.6)" }} />
        <div style={{ position: "absolute", top: rect.top - PADDING, right: 0, left: rect.right + PADDING, height: rect.height + PADDING * 2, background: "rgba(0,0,0,0.6)" }} />
      </div>
      <div
        style={{
          position: "fixed",
          top: rect.top - PADDING,
          left: rect.left - PADDING,
          width: rect.width + PADDING * 2,
          height: rect.height + PADDING * 2,
          borderRadius: 16,
          border: "2px solid var(--primary)",
          boxShadow: "0 0 20px var(--primary)",
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

  const spaceBelow = rect ? window.innerHeight - (rect.bottom + PADDING + 16) : 0;
  const goAbove = rect ? spaceBelow < 260 : false;

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
          background: "var(--card)",
          borderRadius: 24,
          border: "1px solid var(--border)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          background: "var(--primary)",
          padding: "20px 20px 16px",
        }}>
          {/* Progress dots + close */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {STEPS.map((_, i) => (
                <div key={i} style={{
                  width: i === stepIndex ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === stepIndex ? "var(--primary-foreground)" : "rgba(255,255,255,0.35)",
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
                color: "var(--primary-foreground)",
              }}
              aria-label="Закрыть тур"
            >
              <X size={14} />
            </button>
          </div>

          <div style={{ fontSize: 34, lineHeight: 1, marginBottom: 10 }}>{step.icon}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "var(--primary-foreground)", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
            {step.title}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 20px 20px" }}>
          {step.desc && (
            <p style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--muted-foreground)",
              margin: 0,
              marginBottom: step.items ? 12 : 20,
            }}>
              {step.desc}
            </p>
          )}

          {step.items && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {step.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "var(--primary)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      opacity: 0.9,
                    }}>
                      <Icon size={18} color="var(--primary-foreground)" />
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {!isLast && (
              <button
                onClick={onSkip}
                style={{
                  flex: "0 0 auto",
                  padding: "10px 14px",
                  borderRadius: 14,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--muted-foreground)",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Пропустить
              </button>
            )}
            <button
              onClick={onNext}
              style={{
                flex: 1,
                padding: "12px 20px",
                borderRadius: 14,
                background: "var(--primary)",
                border: "none",
                color: "var(--primary-foreground)",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
            >
              {isLast ? "Начать работу →" : "Далее →"}
            </button>
          </div>
        </div>
      </div>

      {/* Arrow */}
      {rect && (
        <div style={{
          position: "absolute",
          [goAbove ? "bottom" : "top"]: -10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          [goAbove ? "borderTop" : "borderBottom"]: "10px solid var(--card)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
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
    rafRef.current = requestAnimationFrame(() => { measureRect(); });
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
      {!rect && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 49,
            background: visible ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
            transition: "background 0.2s ease",
            pointerEvents: "all",
          }}
          onClick={advance}
        />
      )}

      {rect && <SpotlightHole rect={rect} visible={visible} />}

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
