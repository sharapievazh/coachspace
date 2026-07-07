import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Pause, Target, Heart, Triangle, Layers, Sandwich,
  MessageSquare, Timer,
  Gem, Users, GraduationCap, Star, CheckCircle2,
  AlertTriangle, LayoutGrid, Award, Sparkles,
} from "lucide-react";
import { RadarChartIcon } from "@/components/coach/CoachVisuals";
import { BALANCE_AREAS } from "@/components/tabs/_shared";

const SessionPanelLazy = lazy(() => import("@/components/tabs/session"));
const GrowLazy = lazy(() => import("@/components/tabs/grow"));
const SwotLazy = lazy(() => import("@/components/tabs/swot"));
const NluLazy = lazy(() => import("@/components/tabs/nlu"));
const SosLazy = lazy(() => import("@/components/tabs/sos"));
const RapportLazy = lazy(() => import("@/components/tabs/rapport"));
const SmartGoalLazy = lazy(() => import("@/components/tabs/smart"));
const EisenhowerLazy = lazy(() => import("@/components/tabs/eisenhower"));
const BurgerLazy = lazy(() => import("@/components/tabs/burger"));
const EricksonStarLazy = lazy(() => import("@/components/tabs/erickson"));
const BurgerRulesLazy = lazy(() => import("@/components/tabs/rules"));
const BalanceLazy = lazy(() => import("@/components/tabs/balance"));
const ValuesLazy = lazy(() => import("@/components/tabs/values"));
const SupervisionLazy = lazy(() => import("@/components/tabs/supervision"));
const FeedbackLazy = lazy(() => import("@/components/tabs/feedback"));
const CompetenciesLazy = lazy(() => import("@/components/tabs/competencies"));

export const Route = createFileRoute("/")({
  component: CoachSpace,
});

type TabId = "session" | "erickson" | "grow" | "swot" | "rapport" | "smart" | "eisenhower" | "burger" | "rules" | "nlu" | "sos" | "balance" | "supervision" | "values" | "feedback" | "competencies";

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

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "competencies", label: "16 Компетенций", icon: GraduationCap },
  { id: "session", label: "Вести Сессию", icon: Sparkles },
  { id: "erickson", label: "Звезда Эриксона", icon: Star },
  { id: "rapport", label: "Раппорт", icon: Heart },
  { id: "grow", label: "GROW", icon: Target },
  { id: "swot", label: "SWOT", icon: Layers },
  { id: "smart", label: "SMART-цель", icon: CheckCircle2 },
  { id: "nlu", label: "Пирамида Дилтса", icon: Triangle },
  { id: "balance", label: "Колесо баланса", icon: RadarChartIcon },
  { id: "values", label: "Ценности", icon: Gem },
  { id: "supervision", label: "Супервизия", icon: Users },
  { id: "eisenhower", label: "Матрица Эйзенхауэра", icon: LayoutGrid },
  { id: "burger", label: "Гамбургер ОСВК", icon: Sandwich },
  { id: "rules", label: "8 Правил ОСВК", icon: Award },
  { id: "sos", label: "SOS Карпман", icon: AlertTriangle },
  { id: "feedback", label: "Обратная связь", icon: MessageSquare },
];

const TIMER_STORAGE_KEY = "coach-space-session-timer";

function CoachSpace() {
  const [tab, setTab] = useState<TabId>("session");

  // Session timer state (lives in parent so it persists between tabs)
  const [duration, setDuration] = useState(20 * 60);
  const [remaining, setRemaining] = useState(20 * 60);
  const [running, setRunning] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  // Session fields are held in refs (updated from SessionPanel) so keystrokes
  // don't re-render this huge parent tree on every character — critical for
  // input responsiveness inside the iOS/Xcode WebView.
  const clientNameRef = useRef("");
  const topicRef = useRef("");
  const notesRef = useRef("");
  const [balanceScores, setBalanceScores] = useState<Record<number, number>>(() =>
    Object.fromEntries(Array.from({ length: 8 }, (_, i) => [i + 1, 5]))
  );
  const audioCtxRef = useRef<any>(null);
  const wakeLockRef = useRef<any>(null);
  const alertPlayedRef = useRef(false);
  const workerRef = useRef<Worker | null>(null);
  const silentAudioRef = useRef<HTMLAudioElement | null>(null);
  const releaseWakeLockRef = useRef<(() => void) | null>(null);
  const stopSilentKeepAliveRef = useRef<(() => void) | null>(null);
  const silentStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [timeUp, setTimeUp] = useState(false);

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
    const balanceLines = BALANCE_AREAS.map(
      (a) => `  ${a.n}. ${a.name}: ${balanceScores[a.n] ?? 5}/10`
    ).join("\n");
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
Клиент: ${clientNameRef.current || "—"}
Запрос: ${topicRef.current || "—"}
Остаток времени: ${mmss}

Колесо баланса (оценки):
${balanceLines}
${smartBlock}
Заметки коуча:
${notesRef.current || "—"}
`;
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${clientNameRef.current || "client"}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [mmss, balanceScores]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
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
        {/* Mobile top-tabs (hidden on iPad+) */}
        <nav className="md:hidden max-w-7xl mx-auto px-2 sm:px-4 flex gap-1 overflow-x-auto pb-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  if (active && el) {
                    el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }
                }}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 min-h-11 text-xs rounded-lg transition-all duration-200 max-w-[140px] ${
                  active
                    ? "bg-primary text-primary-foreground scale-[1.02]"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon size={16} />
                <span className="truncate min-w-0">{t.label}</span>
              </button>
            );
          })}
        </nav>

      </header>

      <div className="max-w-7xl mx-auto md:flex md:gap-6 md:px-6">
        {/* iPad+ sidebar nav */}
        <aside className="hidden md:block md:w-56 lg:w-64 shrink-0 py-6 sticky top-[calc(env(safe-area-inset-top)+72px)] self-start max-h-[calc(100vh-72px)] overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-3 min-h-11 text-sm rounded-lg text-left transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="truncate">{t.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-6 md:px-0 py-6">
          <Suspense fallback={<div className="py-10 text-center text-sm text-muted-foreground">Загрузка…</div>}>
            {tab === "session" && <SessionPanelLazy duration={duration} setDuration={changeDuration} remaining={remaining} running={running} setRunning={handleSetRunning} reset={resetTimer} mmss={mmss} clientName={clientName} setClientName={setClientName} topic={topic} setTopic={setTopic} notes={notes} setNotes={setNotes} exportSession={exportSession} testSound={testSound} />}
            {tab === "grow" && <GrowLazy />}
            {tab === "swot" && <SwotLazy />}
            {tab === "nlu" && <NluLazy />}
            {tab === "sos" && <SosLazy />}
            {tab === "rapport" && <RapportLazy />}
            {tab === "smart" && <SmartGoalLazy />}
            {tab === "eisenhower" && <EisenhowerLazy />}
            {tab === "burger" && <BurgerLazy />}
            {tab === "erickson" && <EricksonStarLazy />}
            {tab === "rules" && <BurgerRulesLazy />}
            {tab === "balance" && <BalanceLazy scores={balanceScores} onChange={setBalanceScores} />}
            {tab === "values" && <ValuesLazy />}
            {tab === "supervision" && <SupervisionLazy />}
            {tab === "feedback" && <FeedbackLazy />}
            {tab === "competencies" && <CompetenciesLazy />}
          </Suspense>
        </main>


      </div>

      {timeUp && (
        <div className="mt-4 rounded-2xl border border-primary/40 bg-card p-4 sm:p-5 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/15 text-primary grid place-items-center shrink-0">
              <Timer size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold">Время сессии истекло</h3>
              <p className="text-sm text-muted-foreground">Пора подводить итоги.</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <button
                  onClick={() => { setTimeUp(false); resetTimer(); }}
                  className="px-3 py-2 min-h-11 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => playBell(false)}
                  className="px-3 py-2 min-h-11 text-sm rounded-lg bg-secondary hover:bg-muted"
                >
                  Повторить звук
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
