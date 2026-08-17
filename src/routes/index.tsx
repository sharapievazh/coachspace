import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Onboarding, { isOnboardingDone } from "@/components/onboarding";
import {
  Play, Pause, Target, Heart, Triangle, Layers,
  Timer,
  Gem, Users, GraduationCap, Star, CheckCircle2,
  AlertTriangle, Award, Sparkles, Workflow, Compass,
} from "lucide-react";

const SessionPanelLazy = lazy(() => import("@/components/tabs/session"));
const GrowLazy = lazy(() => import("@/components/tabs/grow"));
const SwotLazy = lazy(() => import("@/components/tabs/swot"));
const SoarLazy = lazy(() => import("@/components/tabs/soar"));
const ScoreLazy = lazy(() => import("@/components/tabs/score"));
const SosLazy = lazy(() => import("@/components/tabs/sos"));
const RapportLazy = lazy(() => import("@/components/tabs/rapport"));
const SmartGoalLazy = lazy(() => import("@/components/tabs/smart"));
const EricksonStarLazy = lazy(() => import("@/components/tabs/erickson"));
const ValuesLazy = lazy(() => import("@/components/tabs/values"));
const SupervisionLazy = lazy(() => import("@/components/tabs/supervision"));
const OsvkLazy = lazy(() => import("@/components/tabs/osvk"));
const CompetenciesLazy = lazy(() => import("@/components/tabs/competencies"));
const TeamCoachingLazy = lazy(() => import("@/components/tabs/team-coaching"));

export const Route = createFileRoute("/")({
  component: CoachSpace,
});

const SHARE_CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    color: "#25d366",
    icon: "💬",
    href: (t: string) => `https://wa.me/?text=${encodeURIComponent(t)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    color: "#229ED9",
    icon: "✈️",
    href: (t: string) => `https://t.me/share/url?url=&text=${encodeURIComponent(t)}`,
  },
  {
    id: "email",
    label: "E-mail",
    color: "#6b7280",
    icon: "📧",
    href: (t: string) => `mailto:?subject=${encodeURIComponent("Протокол сессии Coach Space")}&body=${encodeURIComponent(t)}`,
  },
];

function ExportModal({ text, onClose }: { text: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 5000);
    });
  };

  const openShare = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-semibold text-foreground">Протокол сессии</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground"
          >✕</button>
        </div>

        {/* Text preview */}
        <textarea
          readOnly
          value={text}
          rows={10}
          className="w-full px-5 py-4 bg-background text-xs font-mono text-foreground resize-none focus:outline-none"
        />

        {/* Copy button */}
        <div className="px-5 pt-3 pb-2">
          <button
            onClick={copy}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
              copied ? "bg-emerald-500 text-white" : "bg-secondary hover:bg-muted text-foreground"
            }`}
          >
            {copied ? "✓ Скопировано в буфер — можно вставить в любое место!" : "Скопировать текст"}
          </button>
        </div>

        {/* Share row */}
        <div className="px-5 pb-5 pt-2">
          <p className="text-xs text-muted-foreground mb-2 text-center">Поделиться через:</p>
          <div className="flex gap-2">
            {SHARE_CHANNELS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => openShare(ch.href(text))}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                <span className="text-xl leading-none">{ch.icon}</span>
                <span className="text-xs font-medium" style={{ color: ch.color }}>{ch.label}</span>
              </button>
            ))}
            {typeof navigator !== "undefined" && navigator.share && (
              <button
                onClick={() => navigator.share({ title: "Протокол сессии", text }).catch(() => {})}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                <span className="text-xl leading-none">📤</span>
                <span className="text-xs font-medium text-muted-foreground">Ещё...</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type TabId = "session" | "team-coaching" | "competencies" | "erickson" | "rapport" | "values" | "sos" | "grow" | "soar" | "score" | "swot" | "smart" | "supervision" | "osvk";

type NavEntry =
  | { type: "tab"; id: TabId; label: string; icon: any }
  | { type: "section"; label: string };

const SMART_STORAGE = "coach-space-smart-goal";
type SmartData = { s: string; m: string; a: string; r: string; t: string; positive: boolean; balanced: boolean };
const SMART_EMPTY: SmartData = { s: "", m: "", a: "", r: "", t: "", positive: false, balanced: false };
const buildSmartParagraph = (d: SmartData) => {
  const parts: string[] = [];
  if (d.s.trim()) parts.push(d.s.trim().replace(/[.!?]+$/, "") + ".");
  if (d.m.trim()) parts.push("Результат измерим: " + d.m.trim().replace(/[.!?]+$/, "") + ".");
  if (d.a.trim()) parts.push("Цель достижима — " + d.a.trim().replace(/[.!?]+$/, "") + ".");
  if (d.r.trim()) parts.push("Это важно сейчас, потому что " + d.r.trim().replace(/[.!?]+$/, "") + ".");
  if (d.t.trim()) parts.push("Срок: " + d.t.trim().replace(/[.!?]+$/, "") + ".");
  return parts.join(" ");
};

const NAV: NavEntry[] = [
  { type: "tab",     id: "session",       label: "Вести Сессию",       icon: Sparkles },
  { type: "tab",     id: "team-coaching", label: "Командный коучинг",   icon: Users },
  { type: "section", label: "ТЕОРИЯ" },
  { type: "tab",     id: "competencies",  label: "16 Компетенций",      icon: GraduationCap },
  { type: "tab",     id: "erickson",      label: "Звезда Эриксона",     icon: Star },
  { type: "tab",     id: "rapport",       label: "Раппорт",             icon: Heart },
  { type: "tab",     id: "values",        label: "Ценности",            icon: Gem },
  { type: "tab",     id: "sos",           label: "SOS Карпман",         icon: AlertTriangle },
  { type: "section", label: "ИНСТРУМЕНТЫ" },
  { type: "tab",     id: "grow",          label: "GROW",                icon: Target },
  { type: "tab",     id: "soar",          label: "SOAR",                icon: Workflow },
  { type: "tab",     id: "score",         label: "S.C.O.R.E.",          icon: Compass },
  { type: "tab",     id: "smart",         label: "SMART-цель",          icon: CheckCircle2 },
  { type: "tab",     id: "swot",          label: "SWOT",                icon: Layers },
  { type: "section", label: "СУПЕРВИЗИЯ И ОСВК" },
  { type: "tab",     id: "supervision",   label: "Супервизия",          icon: Users },
  { type: "tab",     id: "osvk",          label: "ОСВК",                icon: Award },
];

const TIMER_STORAGE_KEY = "coach-space-session-timer";

function CoachSpace() {
  const [onboarded, setOnboarded] = useState(() => isOnboardingDone());
  const [tab, setTab] = useState<TabId>("session");

  // Preload all lazy tab chunks after first render so tapping a tab never
  // blocks the JS thread with a cold dynamic import parse.
  useEffect(() => {
    const t = setTimeout(() => {
      import("@/components/tabs/session");
      import("@/components/tabs/grow");
      import("@/components/tabs/swot");
      import("@/components/tabs/soar");
      import("@/components/tabs/score");
      import("@/components/tabs/sos");
      import("@/components/tabs/rapport");
      import("@/components/tabs/smart");
      import("@/components/tabs/erickson");
      import("@/components/tabs/values");
      import("@/components/tabs/supervision");
      import("@/components/tabs/osvk");
      import("@/components/tabs/competencies");
      import("@/components/tabs/team-coaching");
    }, 800);
    return () => clearTimeout(t);
  }, []);

  // Session timer state (lives in parent so it persists between tabs)
  const [duration, setDuration] = useState(20 * 60);
  const [remaining, setRemaining] = useState(20 * 60);
  const [running, setRunning] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  // Session fields are held in refs (updated from SessionPanel) so keystrokes
  // don't re-render this huge parent tree on every character — critical for
  // input responsiveness inside the iOS/Xcode WebView.
  const clientNameRef = useRef("");
  const coachNameRef = useRef("");
  const topicRef = useRef("");
  const notesRef = useRef("");
  const [menuOpen, setMenuOpen] = useState(false);
  const audioCtxRef = useRef<any>(null);
  const wakeLockRef = useRef<any>(null);
  const alertPlayedRef = useRef(false);
  const workerRef = useRef<Worker | null>(null);
  const silentAudioRef = useRef<HTMLAudioElement | null>(null);
  const releaseWakeLockRef = useRef<(() => void) | null>(null);
  const stopSilentKeepAliveRef = useRef<(() => void) | null>(null);
  const silentStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timeUp, setTimeUp] = useState(false);
  const [exportText, setExportText] = useState<string | null>(null);

  const getWorker = () => {
    if (typeof window === "undefined") return null;
    if (!workerRef.current) {
      try {
        workerRef.current = new Worker("/timer-worker.js");
      } catch (e) {
        console.warn("worker init failed", e);
        return null;
      }
    }
    return workerRef.current;
  };

  const ensureAudioReady = async () => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AC();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch (e) {
      console.warn("audio unlock failed", e);
    }
  };

  // Keep the audio session alive on mobile (iOS/Android suspend WebAudio when
  // the screen locks). Looping a tiny silent media element prevents that so
  // the end-of-session bell still plays when the phone is locked.
  const startSilentKeepAlive = () => {
    try {
      if (silentAudioRef.current) {
        silentAudioRef.current.play().catch(() => {});
        return;
      }
      // 1s of silent WAV
      const silentWav =
        "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";
      const el = new Audio(silentWav);
      el.loop = true;
      el.volume = 0.001;
      (el as any).playsInline = true;
      el.setAttribute("playsinline", "true");
      silentAudioRef.current = el;
      el.play().catch((e) => console.warn("silent keepalive failed", e));
    } catch (e) {
      console.warn("silent keepalive init failed", e);
    }
  };

  const stopSilentKeepAlive = () => {
    try {
      silentAudioRef.current?.pause();
    } catch {}
  };
  stopSilentKeepAliveRef.current = stopSilentKeepAlive;

  const requestWakeLock = async () => {
    try {
      if ("wakeLock" in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await (navigator as any).wakeLock.request("screen");
        wakeLockRef.current.addEventListener("release", () => {
          wakeLockRef.current = null;
        });
      }
    } catch (e) {
      console.warn("wake lock failed", e);
    }
  };

  const releaseWakeLock = () => {
    const sentinel = wakeLockRef.current;
    if (sentinel) {
      sentinel.release().catch(() => {});
    }
    wakeLockRef.current = null;
  };
  releaseWakeLockRef.current = releaseWakeLock;

  const startTimer = async () => {
    alertPlayedRef.current = false;
    setTimeUp(false);
    await ensureAudioReady();
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch((e) => console.warn("notification permission failed", e));
    }
    await requestWakeLock();
    startSilentKeepAlive();
    const nextEndsAt = Date.now() + remaining * 1000;
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify({ endsAt: nextEndsAt, duration }));
    setEndsAt(nextEndsAt);
    setRunning(true);
    getWorker()?.postMessage({ type: "start", endsAt: nextEndsAt });
  };

  const pauseTimer = () => {
    if (endsAt) setRemaining(Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)));
    setRunning(false);
    setEndsAt(null);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    releaseWakeLock();
    stopSilentKeepAlive();
    getWorker()?.postMessage({ type: "stop" });
  };

  const toggleTimer = () => {
    if (running) {
      pauseTimer();
    } else if (remaining > 0) {
      startTimer();
    }
  };

  const changeDuration = useCallback((seconds: number) => {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(false);
    setEndsAt(null);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    releaseWakeLock();
    stopSilentKeepAlive();
    alertPlayedRef.current = false;
    setTimeUp(false);
    getWorker()?.postMessage({ type: "stop" });
  }, []);

  const resetTimer = useCallback(() => {
    setRunning(false);
    setRemaining(duration);
    setEndsAt(null);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    releaseWakeLock();
    stopSilentKeepAlive();
    alertPlayedRef.current = false;
    setTimeUp(false);
    getWorker()?.postMessage({ type: "stop" });
  }, [duration]);

  // Stable refs so memoized SessionPanel callbacks don't change identity each render.
  const startTimerRef = useRef(startTimer);
  const pauseTimerRef = useRef(pauseTimer);
  startTimerRef.current = startTimer;
  pauseTimerRef.current = pauseTimer;
  const handleSetRunning = useCallback((next: boolean) => {
    if (next) startTimerRef.current();
    else pauseTimerRef.current();
  }, []);

  const playBell = async (short = false) => {
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = audioCtxRef.current || new AC();
      audioCtxRef.current = ctx;
      if (ctx.state === "suspended") await ctx.resume();
      const strike = (when: number, base: number) => {
        // Bell = fundamental + inharmonic partials with exponential decay
        const partials = [
          { mult: 1, gain: 0.5, decay: 2.6 },
          { mult: 2.0, gain: 0.32, decay: 1.8 },
          { mult: 3.01, gain: 0.22, decay: 1.2 },
          { mult: 4.2, gain: 0.14, decay: 0.9 },
          { mult: 5.4, gain: 0.08, decay: 0.6 },
        ];
        partials.forEach((p) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = base * p.mult;
          const t0 = ctx.currentTime + when;
          gain.gain.setValueAtTime(0.0001, t0);
          gain.gain.exponentialRampToValueAtTime(p.gain, t0 + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.0001, t0 + p.decay);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t0);
          osc.stop(t0 + p.decay + 0.05);
        });
      };
      if (short) {
        strike(0, 880);
      } else {
        strike(0, 880);
        strike(0.6, 1175);
        strike(1.25, 880);
      }
    } catch (e) {
      console.warn("audio failed", e);
    }
  };

  const playEndAlert = async () => {
    await playBell(false);
    setTimeUp(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.([400, 150, 400, 150, 600]);
    }
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Сессия завершена", {
        body: "Время сессии истекло. Пора подводить итоги!",
        icon: "/apple-touch-icon.png",
      });
    }
  };

  const testSound = useCallback(async () => {
    await ensureAudioReady();
    playBell(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(TIMER_STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { endsAt?: number; duration?: number };
      if (!parsed.endsAt || !parsed.duration) return;
      const next = Math.max(0, Math.ceil((parsed.endsAt - Date.now()) / 1000));
      setDuration(parsed.duration);
      setRemaining(next);
      if (next > 0) {
        setEndsAt(parsed.endsAt);
        setRunning(true);
        getWorker()?.postMessage({ type: "start", endsAt: parsed.endsAt });
      } else {
        localStorage.removeItem(TIMER_STORAGE_KEY);
        playEndAlert();
      }
    } catch (e) {
      console.warn("timer restore failed", e);
      localStorage.removeItem(TIMER_STORAGE_KEY);
    }
  }, []);

  // Subscribe to worker messages (background tick source)
  useEffect(() => {
    const w = getWorker();
    if (!w) return;
    const onMessage = async (e: MessageEvent) => {
      const data = e.data || {};
      if (data.type === "tick" && typeof data.remaining === "number") {
        setRemaining(data.remaining);
      } else if (data.type === "end" && !alertPlayedRef.current) {
        alertPlayedRef.current = true;
        setRunning(false);
        setEndsAt(null);
        setRemaining(0);
        localStorage.removeItem(TIMER_STORAGE_KEY);
        releaseWakeLockRef.current?.();
        try {
          await playEndAlert();
        } finally {
          if (silentStopTimerRef.current) clearTimeout(silentStopTimerRef.current);
          silentStopTimerRef.current = setTimeout(() => stopSilentKeepAliveRef.current?.(), 4000);
        }
      }
    };
    w.addEventListener("message", onMessage);
    return () => {
      w.removeEventListener("message", onMessage);
      if (silentStopTimerRef.current) clearTimeout(silentStopTimerRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!running || !endsAt) return;
    const handleSessionEnd = async () => {
      alertPlayedRef.current = true;
      setRunning(false);
      setEndsAt(null);
      localStorage.removeItem(TIMER_STORAGE_KEY);
      releaseWakeLock();
      try {
        await playEndAlert();
      } finally {
        setTimeout(stopSilentKeepAlive, 4000);
      }
    };
    const tick = () => {
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(next);
      if (next <= 0 && !alertPlayedRef.current) {
        handleSessionEnd();
      }
    };
    const hasWorker = !!getWorker();
    let id: ReturnType<typeof setInterval> | null = null;
    if (!hasWorker) {
      id = setInterval(tick, 1000);
    }
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      if (id) clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
    };
  }, [running, endsAt]);


  useEffect(() => {
    if (!running) return;
    const restoreWakeLock = () => {
      if (document.visibilityState === "visible") requestWakeLock();
    };
    document.addEventListener("visibilitychange", restoreWakeLock);
    return () => document.removeEventListener("visibilitychange", restoreWakeLock);
  }, [running]);

  const mmss = useMemo(() => {
    const m = Math.floor(remaining / 60).toString().padStart(2, "0");
    const s = (remaining % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [remaining]);

  const exportSession = useCallback(() => {
    let smartBlock = "";
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(SMART_STORAGE) : null;
      if (raw) {
        const d = { ...SMART_EMPTY, ...JSON.parse(raw) } as SmartData;
        const para = buildSmartParagraph(d);
        if (para || d.s || d.m || d.a || d.r || d.t) {
          smartBlock = `\nSMART-цель:
  S (конкретная): ${d.s || "—"}
  M (измеримая): ${d.m || "—"}
  A (достижимая): ${d.a || "—"}
  R (актуальная): ${d.r || "—"}
  T (срок): ${d.t || "—"}
  Позитивная формулировка: ${d.positive ? "да" : "нет"}
  Баланс вызова и реальности: ${d.balanced ? "да" : "нет"}
  Итог: ${para || "—"}
`;
        }
      }
    } catch {}
    const txt = `Coach Space — Протокол сессии
Дата: ${new Date().toLocaleString()}
Коуч: ${coachNameRef.current || "—"}
Клиент: ${clientNameRef.current || "—"}
Запрос: ${topicRef.current || "—"}
${smartBlock}
Заметки коуча:
${notesRef.current || "—"}
`;
    // Always show modal — user can copy or use native share
    if (navigator.share) {
      const file = new File([txt], `session-${clientNameRef.current || "client"}.txt`, { type: "text/plain" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare?.({ files: [file] })) {
        navigator.share({ files: [file], title: "Протокол сессии" }).catch(() => setExportText(txt));
        return;
      }
    }
    setExportText(txt);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!onboarded) {
    return <Onboarding onFinish={() => setOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-[env(safe-area-inset-top)] pb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold shrink-0">CS</div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold leading-tight truncate">Coach Space</h1>
              <p className="text-xs text-muted-foreground truncate">Рабочее пространство коуча</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 px-3 py-2 rounded-lg bg-secondary shrink-0">
            <div className="font-mono text-base sm:text-xl tabular-nums">{mmss}</div>
            <button
              onClick={toggleTimer}
              className="min-w-11 min-h-11 grid place-items-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
              aria-label="toggle"
            >
              {running ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>
        {/* Mobile header bottom row: active tab name + hamburger */}
        <div className="md:hidden max-w-7xl mx-auto px-4 pb-3 flex items-center justify-between gap-3">
          {/* Active tab label */}
          {(() => {
            const active = NAV.find((e) => e.type === "tab" && e.id === tab) as Extract<NavEntry, { type: "tab" }> | undefined;
            if (!active) return null;
            const Icon = active.icon;
            return (
              <div className="flex items-center gap-2 min-w-0">
                <Icon size={16} className="text-primary shrink-0" />
                <span className="text-sm font-semibold text-foreground truncate">{active.label}</span>
              </div>
            );
          })()}
          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors text-foreground shrink-0"
            aria-label="Меню"
          >
            <span className="flex flex-col gap-[4px]">
              <span className="block w-4 h-[2px] bg-current rounded" />
              <span className="block w-4 h-[2px] bg-current rounded" />
              <span className="block w-4 h-[2px] bg-current rounded" />
            </span>
            <span className="text-xs font-medium">Меню</span>
          </button>
        </div>

      </header>

      {/* Mobile dropdown menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-card border-b border-border shadow-xl pt-[env(safe-area-inset-top)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="font-semibold text-foreground">Разделы</span>
              <button onClick={() => setMenuOpen(false)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">✕</button>
            </div>
            <nav className="flex flex-col py-2 max-h-[70vh] overflow-y-auto">
              {NAV.map((entry, i) =>
                entry.type === "section" ? (
                  <div key={i} className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    {entry.label}
                  </div>
                ) : (
                  <button
                    key={entry.id}
                    onClick={() => { setTab(entry.id); setMenuOpen(false); }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors ${
                      tab === entry.id ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <entry.icon size={18} className="shrink-0" />
                    <span>{entry.label}</span>
                    {tab === entry.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                )
              )}
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto md:flex md:gap-6 md:px-6">
        {/* iPad+ sidebar nav */}
        <aside className="hidden md:block md:w-56 lg:w-64 shrink-0 py-6 self-start sticky top-6">
          <nav className="flex flex-col gap-0.5">
            {NAV.map((entry, i) =>
              entry.type === "section" ? (
                <div key={i} className="px-3 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  {entry.label}
                </div>
              ) : (
                <button
                  key={entry.id}
                  onClick={() => setTab(entry.id)}
                  className={`flex items-center gap-3 px-3 min-h-10 text-sm rounded-lg text-left transition-colors ${
                    tab === entry.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <entry.icon size={17} className="shrink-0" />
                  <span className="truncate">{entry.label}</span>
                </button>
              )
            )}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-0 py-6">
          <Suspense fallback={<div className="py-10 text-center text-sm text-muted-foreground">Загрузка…</div>}>
            {tab === "session" && <SessionPanelLazy duration={duration} setDuration={changeDuration} remaining={remaining} running={running} setRunning={handleSetRunning} reset={resetTimer} mmss={mmss} clientNameRef={clientNameRef} coachNameRef={coachNameRef} topicRef={topicRef} notesRef={notesRef} exportSession={exportSession} testSound={testSound} />}
            {tab === "grow" && <GrowLazy />}
            {tab === "soar" && <SoarLazy />}
            {tab === "score" && <ScoreLazy />}
            {tab === "swot" && <SwotLazy />}
            {tab === "sos" && <SosLazy />}
            {tab === "rapport" && <RapportLazy />}
            {tab === "smart" && <SmartGoalLazy />}
            {tab === "erickson" && <EricksonStarLazy />}
            {tab === "values" && <ValuesLazy />}
            {tab === "supervision" && <SupervisionLazy />}
            {tab === "osvk" && <OsvkLazy />}
            {tab === "competencies" && <CompetenciesLazy />}
            {tab === "team-coaching" && <TeamCoachingLazy />}
          </Suspense>
        </main>


      </div>

      {/* Export modal */}
      {exportText && (
        <ExportModal text={exportText} onClose={() => setExportText(null)} />
      )}

      {timeUp && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.45)" }} onClick={() => { setTimeUp(false); resetTimer(); }}>
          <div className="w-full max-w-sm rounded-2xl border border-primary/40 bg-card p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 text-primary grid place-items-center shrink-0">
                <Timer size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold">Время сессии истекло</h3>
                <p className="text-sm text-muted-foreground mt-1">Пора подводить итоги.</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => { setTimeUp(false); resetTimer(); }}
                    className="px-4 py-2.5 min-h-11 text-sm rounded-xl bg-primary text-primary-foreground hover:opacity-90 font-medium"
                  >
                    Закрыть
                  </button>
                  <button
                    onClick={() => playBell(false)}
                    className="px-4 py-2.5 min-h-11 text-sm rounded-xl bg-secondary hover:bg-muted font-medium"
                  >
                    Повторить звук
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
