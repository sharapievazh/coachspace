import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Pause, RotateCcw, Download, Target, Search, Lightbulb, Rocket,
  AlertTriangle, Heart, Triangle, Layers, MessageCircle, Sparkles, Sandwich,
  MessageSquare, Send, ThumbsUp, ThumbsDown,
  Gem, Users, BookOpen, ClipboardList, UserCheck, ShieldCheck, Footprints, Star,
  Circle, HeartPulse, Coins, Baby, HandHeart, Laptop, GraduationCap, Activity,
  Eye, Timer, Brain, Flag, Calendar, CheckCircle2, Wrench, Home, User, Bell,
  ChevronRight, Zap, ListChecks, Compass, Sun, Hourglass, TrendingUp, Scale,
  HelpCircle, AlertOctagon, Hand, Mountain, Telescope, Glasses,
  Ear, Crown, Palette, Calculator, Smile, Wind, ChevronDown, Briefcase,
} from "lucide-react";
import burgerTop from "@/assets/burger-top.png";
import burgerPatty from "@/assets/burger-patty.png";
import burgerBottom from "@/assets/burger-bottom.png";
import {
  GrowIcon,
  BalanceRadar,
  DiltsPyramidSvg,
  KarpmanTriangleSvg,
} from "@/components/coach/CoachVisuals";

export const Route = createFileRoute("/")({
  component: CoachSpace,
});

type TabId = "session" | "grow" | "swot" | "rapport" | "burger" | "nlu" | "sos" | "balance" | "supervision" | "values" | "feedback";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "session", label: "Вести Сессию", icon: Sparkles },
  { id: "rapport", label: "Раппорт", icon: Heart },
  { id: "grow", label: "GROW", icon: Target },
  { id: "swot", label: "SWOT", icon: Layers },
  { id: "nlu", label: "Пирамида Дилтса", icon: Triangle },
  { id: "balance", label: "Колесо баланса", icon: Circle },
  { id: "values", label: "Ценности", icon: Gem },
  { id: "supervision", label: "Супервизия", icon: Users },
  { id: "burger", label: "Гамбургер", icon: Sandwich },
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
  const [clientName, setClientName] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [balanceScores, setBalanceScores] = useState<Record<number, number>>(() =>
    Object.fromEntries(Array.from({ length: 8 }, (_, i) => [i + 1, 5]))
  );
  const audioCtxRef = useRef<any>(null);
  const wakeLockRef = useRef<any>(null);
  const alertPlayedRef = useRef(false);
  const workerRef = useRef<Worker | null>(null);
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
    wakeLockRef.current?.release?.();
    wakeLockRef.current = null;
  };

  const startTimer = async () => {
    alertPlayedRef.current = false;
    setTimeUp(false);
    await ensureAudioReady();
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission().catch((e) => console.warn("notification permission failed", e));
    }
    await requestWakeLock();
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
    getWorker()?.postMessage({ type: "stop" });
  };

  const toggleTimer = () => {
    if (running) {
      pauseTimer();
    } else if (remaining > 0) {
      startTimer();
    }
  };

  const changeDuration = (seconds: number) => {
    setDuration(seconds);
    setRemaining(seconds);
    setRunning(false);
    setEndsAt(null);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    releaseWakeLock();
    alertPlayedRef.current = false;
    setTimeUp(false);
    getWorker()?.postMessage({ type: "stop" });
  };

  const resetTimer = () => {
    setRunning(false);
    setRemaining(duration);
    setEndsAt(null);
    localStorage.removeItem(TIMER_STORAGE_KEY);
    releaseWakeLock();
    alertPlayedRef.current = false;
    setTimeUp(false);
    getWorker()?.postMessage({ type: "stop" });
  };

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

  const playEndAlert = () => {
    playBell(false);
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

  const testSound = async () => {
    await ensureAudioReady();
    playBell(true);
  };

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
    const onMessage = (e: MessageEvent) => {
      const data = e.data || {};
      if (data.type === "tick" && typeof data.remaining === "number") {
        setRemaining(data.remaining);
      } else if (data.type === "end" && !alertPlayedRef.current) {
        alertPlayedRef.current = true;
        setRunning(false);
        setEndsAt(null);
        setRemaining(0);
        localStorage.removeItem(TIMER_STORAGE_KEY);
        releaseWakeLock();
        playEndAlert();
      }
    };
    w.addEventListener("message", onMessage);
    return () => {
      w.removeEventListener("message", onMessage);
    };
  }, []);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!running || !endsAt) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(next);
      if (next <= 0 && !alertPlayedRef.current) {
        alertPlayedRef.current = true;
        setRunning(false);
        setEndsAt(null);
        localStorage.removeItem(TIMER_STORAGE_KEY);
        releaseWakeLock();
        playEndAlert();
      }
    };
    tick();
    const id = setInterval(() => {
      tick();
    }, 1000);
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    return () => {
      clearInterval(id);
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

  const exportSession = () => {
    const balanceLines = BALANCE_AREAS.map(
      (a) => `  ${a.n}. ${a.name}: ${balanceScores[a.n] ?? 5}/10`
    ).join("\n");
    const txt = `Coach Space — Протокол сессии
Дата: ${new Date().toLocaleString()}
Клиент: ${clientName || "—"}
Запрос: ${topic || "—"}
Остаток времени: ${mmss}

Колесо баланса (оценки):
${balanceLines}

Заметки коуча:
${notes || "—"}
`;
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${clientName || "client"}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold">CS</div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Coach Space</h1>
              <p className="text-xs text-muted-foreground">Рабочее пространство коуча</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary">
            <div className="font-mono text-xl tabular-nums">{mmss}</div>
            <button
              onClick={toggleTimer}
              className="p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
              aria-label="toggle"
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-2 sm:px-4 flex gap-1 overflow-x-auto pb-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {tab === "session" && (
          <SessionPanel
            duration={duration}
            setDuration={changeDuration}
            remaining={remaining}
            running={running}
            setRunning={(next: boolean) => { next ? startTimer() : pauseTimer(); }}
            reset={resetTimer}
            mmss={mmss}
            clientName={clientName}
            setClientName={setClientName}
            topic={topic}
            setTopic={setTopic}
            notes={notes}
            setNotes={setNotes}
            exportSession={exportSession}
            testSound={testSound}
            balanceScores={balanceScores}
          />
        )}
        {tab === "grow" && <Grow />}
        {tab === "swot" && <Swot />}
        {tab === "nlu" && <Nlu />}
        {tab === "sos" && <Sos />}
        {tab === "rapport" && <Rapport />}
        {tab === "burger" && <Burger />}
        {tab === "balance" && <Balance scores={balanceScores} onChange={setBalanceScores} />}
        {tab === "values" && <Values />}
        {tab === "supervision" && <Supervision />}
        {tab === "feedback" && <Feedback />}
      </main>

      {timeUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative max-w-md w-full rounded-2xl border border-primary/40 bg-card p-6 sm:p-8 text-center shadow-2xl">
            <div className="absolute inset-0 rounded-2xl ring-2 ring-primary/60 animate-ping pointer-events-none" />
            <div className="relative">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/15 text-primary grid place-items-center animate-pulse">
                <Timer size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Время сессии истекло</h3>
              <p className="text-muted-foreground mb-6">Пора подводить итоги!</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => { setTimeUp(false); resetTimer(); }}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
                >
                  Закрыть
                </button>
                <button
                  onClick={() => playBell(false)}
                  className="px-4 py-2 rounded-lg bg-secondary hover:bg-muted"
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

/* ---------- Session ---------- */
function SessionPanel(p: any) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-1 bg-card rounded-2xl border border-border p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Sparkles size={18} className="text-primary" /> Таймер сессии</h2>
        <div className="text-center py-6 rounded-xl bg-secondary">
          <div className="font-mono text-5xl tabular-nums text-foreground">{p.mmss}</div>
          <div className="text-xs text-muted-foreground mt-1">из {Math.floor(p.duration/60)} мин</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => p.setRunning(!p.running)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            {p.running ? <Pause size={16}/> : <Play size={16}/>} {p.running ? "Пауза" : "Старт"}
          </button>
          <button onClick={p.reset} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-muted">
            <RotateCcw size={16}/> Сброс
          </button>
        </div>
        <button
          onClick={p.testSound}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary text-sm"
        >
          <Bell size={16} className="text-primary" /> Тест звука
        </button>
        <div className="flex gap-2 flex-wrap">
          {[20, 30, 45, 60, 90].map((m) => (
            <button key={m} onClick={() => p.setDuration(m*60)}
              className={`px-3 py-1.5 text-xs rounded-md border ${p.duration===m*60 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
              {m} мин
            </button>
          ))}
        </div>
      </section>

      <section className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Клиент">
            <input value={p.clientName} onChange={(e)=>p.setClientName(e.target.value)}
              placeholder="Имя клиента"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
          <Field label="Запрос сессии">
            <input value={p.topic} onChange={(e)=>p.setTopic(e.target.value)}
              placeholder="Тема / цель"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
        </div>
        <Field label="Потоковый блокнот · ценностные слова, инсайты, цитаты клиента">
          <textarea value={p.notes} onChange={(e)=>p.setNotes(e.target.value)}
            rows={14}
            placeholder="Веди заметки прямо во время сессии..."
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"/>
        </Field>
        <div className="flex justify-end">
          <button onClick={p.exportSession} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            <Download size={16}/> Экспорт .txt
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Visual helpers for rich block cards ---------- */
const BLOCK_ICON_MAP: Array<{ match: RegExp; icon: any; tone: string }> = [
  { match: /цель сессии/i,                 icon: Target,      tone: "from-emerald-500 to-teal-500" },
  { match: /долгосрочн/i,                  icon: Mountain,    tone: "from-emerald-600 to-green-500" },
  { match: /smart/i,                       icon: ListChecks,  tone: "from-lime-500 to-emerald-500" },
  { match: /колесо баланса/i,              icon: Circle,      tone: "from-amber-500 to-orange-500" },
  { match: /шкалирован/i,                  icon: TrendingUp,  tone: "from-cyan-500 to-sky-500" },
  { match: /идеальн/i,                     icon: Sun,         tone: "from-yellow-400 to-amber-500" },
  { match: /путешеств/i,                   icon: Telescope,   tone: "from-indigo-500 to-violet-500" },
  { match: /коучинговые вопросы/i,         icon: HelpCircle,  tone: "from-sky-500 to-blue-500" },
  { match: /что происходит/i,              icon: ClipboardList, tone: "from-blue-500 to-sky-500" },
  { match: /что уже работает/i,            icon: ThumbsUp,    tone: "from-emerald-500 to-sky-500" },
  { match: /что мешает/i,                  icon: AlertOctagon, tone: "from-rose-500 to-orange-500" },
  { match: /swot/i,                        icon: Layers,      tone: "from-indigo-500 to-blue-600" },
  { match: /5 почему/i,                    icon: HelpCircle,  tone: "from-violet-500 to-fuchsia-500" },
  { match: /линия времени/i,               icon: Hourglass,   tone: "from-sky-500 to-cyan-500" },
  { match: /ресурс/i,                      icon: Coins,       tone: "from-amber-500 to-yellow-500" },
  { match: /мозгов|штурм|генерац/i,        icon: Zap,         tone: "from-amber-500 to-orange-500" },
  { match: /дисне/i,                       icon: Sparkles,    tone: "from-pink-500 to-rose-500" },
  { match: /шляп/i,                        icon: Brain,       tone: "from-violet-500 to-indigo-500" },
  { match: /реверсивн/i,                   icon: RotateCcw,   tone: "from-fuchsia-500 to-purple-500" },
  { match: /а что ещё|ещe/i,               icon: Sparkles,    tone: "from-amber-500 to-orange-500" },
  { match: /план действ|smart-шаги/i,      icon: ListChecks,  tone: "from-violet-500 to-indigo-500" },
  { match: /90 дн/i,                       icon: Calendar,    tone: "from-violet-500 to-purple-500" },
  { match: /30.60.90/i,                    icon: Calendar,    tone: "from-indigo-500 to-violet-500" },
  { match: /accountab|ответствен/i,        icon: ShieldCheck, tone: "from-emerald-500 to-teal-500" },
  { match: /препятств/i,                   icon: AlertOctagon, tone: "from-rose-500 to-red-500" },
  { match: /план б/i,                      icon: Compass,     tone: "from-sky-500 to-indigo-500" },
];

function pickBlockIcon(head: string) {
  return BLOCK_ICON_MAP.find((m) => m.match.test(head)) ?? { icon: Sparkles, tone: "from-primary to-primary/60" };
}

const ITEM_BULLETS = [CheckCircle2, Zap, Star, ChevronRight, Sparkles];
function getItemIcon(i: number) { return ITEM_BULLETS[i % ITEM_BULLETS.length]; }

function BlockCard({ head, items }: { head: string; items: string[] }) {
  const meta = pickBlockIcon(head);
  const I = meta.icon;
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-4 group hover:border-primary/40 transition-colors">
      {/* glow watermark */}
      <I
        size={140}
        className={`absolute -right-6 -bottom-8 text-foreground/[0.04] pointer-events-none`}
        strokeWidth={1.2}
      />
      <div className="relative flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.tone} text-white grid place-items-center shadow-md shadow-primary/20`}>
          <I size={20} />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 leading-tight">{head}</div>
      </div>
      <ul className="relative space-y-1.5 text-sm">
        {items.map((it, j) => {
          const B = getItemIcon(j);
          return (
            <li key={j} className="flex items-start gap-2">
              <B size={14} className="text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/90">{it}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- GROW (Полная модель из материалов обучения) ---------- */
const GROW_STEPS = [
  {
    id: "G", label: "GOAL", title: "ЦЕЛЬ",
    subtitle: "Что вы хотите получить?",
    icon: Target, time: "10 мин",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30 text-emerald-700",
    blocks: [
      {
        head: "ЦЕЛЬ СЕССИИ",
        items: [
          "Что хотите получить по итогам встречи?",
          "Какой результат будет идеальным?",
          "Что должно измениться?",
        ],
      },
      {
        head: "ЦЕЛЬ В ДОЛГОСРОЧНОЙ ПЕРСПЕКТИВЕ",
        items: ["Через 3 месяца", "Через 6 месяцев", "Через 1 год", "Через 5 лет"],
      },
      {
        head: "ИНСТРУМЕНТЫ · SMART",
        items: ["Specific", "Measurable", "Achievable", "Relevant", "Time-bound"],
      },
      {
        head: "КОЛЕСО БАЛАНСА",
        items: ["Семья", "Отношения", "Дети", "Карьера", "Финансы", "Здоровье", "Самореализация", "Отдых"],
      },
      {
        head: "ШКАЛИРОВАНИЕ",
        items: ["Где вы сейчас от 1 до 10?", "Где хотите быть?"],
      },
      {
        head: "ИДЕАЛЬНЫЙ ДЕНЬ",
        items: [
          "Представьте результат достигнутым",
          "Что изменилось?",
          "Что вы чувствуете?",
        ],
      },
      {
        head: "ПУТЕШЕСТВИЕ В БУДУЩЕЕ",
        items: ["Визуализация результата", "Образ успешного будущего"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Чего вы хотите?",
          "Что для вас важно?",
          "Как выглядит успех?",
          "Почему это важно сейчас?",
          "Что произойдёт после достижения цели?",
        ],
      },
    ],
  },
  {
    id: "R", label: "REALITY", title: "РЕАЛЬНОСТЬ",
    subtitle: "Где вы находитесь сейчас?",
    icon: Search, time: "15 мин",
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30 text-sky-700",
    blocks: [
      {
        head: "ЧТО ПРОИСХОДИТ СЕЙЧАС?",
        items: ["Факты", "События", "Результаты"],
      },
      {
        head: "ЧТО УЖЕ РАБОТАЕТ?",
        items: ["Успешный опыт", "Достижения", "Сильные стороны"],
      },
      {
        head: "ЧТО МЕШАЕТ?",
        items: ["Ограничения", "Страхи", "Убеждения", "Внешние факторы"],
      },
      {
        head: "ИНСТРУМЕНТЫ · SWOT-АНАЛИЗ",
        items: [
          "S — Сильные стороны",
          "W — Слабые стороны",
          "O — Возможности",
          "T — Угрозы",
        ],
      },
      {
        head: "МЕТОД 5 ПОЧЕМУ",
        items: ["Почему?", "Почему?", "Почему?", "Почему?", "Почему?"],
      },
      {
        head: "ЛИНИЯ ВРЕМЕНИ",
        items: ["Прошлое", "Настоящее", "Будущее"],
      },
      {
        head: "АНАЛИЗ РЕСУРСОВ",
        items: ["Деньги", "Время", "Энергия", "Связи", "Знания"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Где вы сейчас?",
          "Что уже сделано?",
          "Что помогает?",
          "Что препятствует?",
          "Какие ресурсы доступны?",
          "Что находится под вашим контролем?",
        ],
      },
    ],
  },
  {
    id: "O", label: "OPTIONS", title: "ВОЗМОЖНОСТИ",
    subtitle: "Какие варианты у вас есть?",
    icon: Lightbulb, time: "20 мин",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30 text-amber-700",
    blocks: [
      {
        head: "ГЕНЕРАЦИЯ ВАРИАНТОВ · МОЗГОВОЙ ШТУРМ",
        items: [
          "Правила: не критиковать идеи",
          "Количество важнее качества",
        ],
      },
      {
        head: "МЕТОД ДИСНЕЯ",
        items: [
          "Мечтатель — что возможно?",
          "Реалист — как реализовать?",
          "Критик — какие риски?",
        ],
      },
      {
        head: "ШЕСТЬ ШЛЯП МЫШЛЕНИЯ",
        items: [
          "Белая — факты",
          "Красная — эмоции",
          "Чёрная — риски",
          "Жёлтая — плюсы",
          "Зелёная — креатив",
          "Синяя — управление процессом",
        ],
      },
      {
        head: "РЕВЕРСИВНОЕ МЫШЛЕНИЕ",
        items: ["Как гарантированно провалиться?", "Что нужно исключить?"],
      },
      {
        head: "А ЧТО ЕЩЁ?",
        items: ["Задаётся минимум 5–7 раз подряд"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Какие варианты вы видите?",
          "Что ещё возможно?",
          "Если бы не было ограничений?",
          "Что сделал бы ваш наставник?",
          "Какое решение кажется самым сильным?",
          "Что вы ещё не рассматривали?",
        ],
      },
    ],
  },
  {
    id: "W", label: "WILL / WAY FORWARD", title: "ДЕЙСТВИЕ",
    subtitle: "Что вы будете делать?",
    icon: Rocket, time: "15 мин",
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30 text-violet-700",
    blocks: [
      {
        head: "ПЛАН ДЕЙСТВИЙ · SMART-ШАГИ",
        items: ["Каждый шаг: конкретный, измеримый, реалистичный"],
      },
      {
        head: "ПЛАН 90 ДНЕЙ",
        items: ["Цель", "30 дней", "60 дней", "90 дней"],
      },
      {
        head: "ПЛАН 30–60–90",
        items: ["Что сделать за неделю", "За месяц", "За квартал"],
      },
      {
        head: "ACCOUNTABILITY · Ответственность",
        items: ["Кто поддержит?", "Кто проконтролирует?", "Как отслеживать прогресс?"],
      },
      {
        head: "АНАЛИЗ ПРЕПЯТСТВИЙ · Что может помешать?",
        items: ["Время", "Страх", "Лень", "Деньги", "Отсутствие поддержки"],
      },
      {
        head: "ПЛАН Б",
        items: ["Что будете делать, если возникнет препятствие?"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Что конкретно сделаете?",
          "Когда?",
          "Где?",
          "С кем?",
          "Какой первый шаг?",
          "Что может помешать?",
          "Как преодолеете препятствия?",
          "Насколько готовы действовать от 1 до 10?",
        ],
      },
    ],
  },
];

const GROW_STRUCTURE = [
  { n: 1, code: "G — GOAL", time: "10 мин", text: "Формулируем цель встречи" },
  { n: 2, code: "R — REALITY", time: "15 мин", text: "Анализируем текущую ситуацию" },
  { n: 3, code: "O — OPTIONS", time: "20 мин", text: "Генерируем варианты решений" },
  { n: 4, code: "W — WILL", time: "15 мин", text: "Создаём план действий" },
];

const GROW_CLOSE = [
  { t: "ИНСАЙТЫ", d: "Что стало главным открытием? Что удивило?", icon: Lightbulb },
  { t: "РЕЗУЛЬТАТ", d: "Что берёте с собой?", icon: Sparkles },
  { t: "ОБЯЗАТЕЛЬСТВО", d: "Что сделаете в течение 24 часов?", icon: Target },
  { t: "МОТИВАЦИЯ", d: "Почему это важно для вас?", icon: Heart },
  { t: "УВЕРЕННОСТЬ", d: "Насколько уверены в успехе от 1 до 10?", icon: Activity },
  { t: "ДОМАШНЕЕ ЗАДАНИЕ", d: "Конкретное действие до следующей встречи.", icon: ClipboardList },
];

function Grow() {
  const [active, setActive] = useState("G");
  const step = GROW_STEPS.find((s) => s.id === active)!;
  void step.icon;
  return (
    <div className="space-y-6">
      <SectionHead title="Модель GROW" subtitle="Структура эффективной коуч-сессии (60 мин)" />

      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Timer size={18} className="text-primary"/> Структура сессии (60 мин)</h3>
        <div className="grid sm:grid-cols-4 gap-2">
          {GROW_STRUCTURE.map((s) => (
            <div key={s.n} className="p-3 rounded-xl bg-secondary/60">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs">{s.n}</span>
                {s.code}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.time}</div>
              <div className="text-sm mt-1">{s.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GROW_STEPS.map((s) => {
          const act = active === s.id;
          return (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`p-4 rounded-xl border text-left transition-all ${act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"}`}>
              <GrowIcon step={s.id as "G" | "R" | "O" | "W"} size={44} className="mb-2" />
              <div className="font-bold text-2xl">{s.id}</div>
              <div className={`text-xs ${act ? "opacity-90" : "text-muted-foreground"}`}>{s.label}</div>
            </button>
          );
        })}
      </div>

      <div className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${step.accent}`}>
        {/* giant decorative watermark */}
        <div className="absolute -right-10 -top-10 opacity-[0.07] pointer-events-none">
          <GrowIcon step={step.id as "G" | "R" | "O" | "W"} size={320} />
        </div>
        {/* sparkles */}
        <Sparkles className="absolute right-10 top-6 text-primary/30 animate-pulse" size={24} />
        <Star className="absolute right-32 top-20 text-amber-400/40 animate-pulse" size={16} />
        <Sparkles className="absolute right-20 bottom-10 text-primary/20 animate-pulse" size={18} />

        <div className="relative flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-2xl bg-card grid place-items-center shadow-xl ring-2 ring-white/40">
              <GrowIcon step={step.id as "G" | "R" | "O" | "W"} size={64} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">{step.label}</div>
              <h3 className="text-3xl font-extrabold text-foreground tracking-tight">{step.title}</h3>
              <p className="text-sm text-foreground/70">{step.subtitle}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-card text-foreground text-xs font-medium shadow flex items-center gap-1.5">
            <Timer size={12} className="text-primary" /> {step.time}
          </span>
        </div>

        <div className="relative mt-6 grid sm:grid-cols-2 gap-3">
          {step.blocks.map((b, i) => (
            <BlockCard key={i} head={b.head} items={b.items} />
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Flag size={18} className="text-primary"/> Завершение сессии</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {GROW_CLOSE.map((c, i) => {
            const I = c.icon;
            return (
              <div key={i} className="p-3 rounded-xl bg-secondary/60">
                <I size={18} className="text-primary mb-1"/>
                <div className="font-semibold text-xs">{c.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <Star size={20} className="text-primary mt-0.5"/>
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Финальный вопрос коуча</div>
          <div className="font-medium">Если бы вы начали действовать уже сегодня, что стало бы первым шагом?</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SWOT ---------- */
function Swot() {
  const cells = [
    { k: "S", title: "Strengths · Сильные стороны", Icon: ShieldCheck, grad: "from-emerald-500 to-teal-500", ring: "border-emerald-500/30 bg-emerald-500/5", ic: "text-emerald-600",
      q: ["В чём ты силён?", "Какие ресурсы у тебя уже есть?", "Что говорят другие о твоих сильных сторонах?"] },
    { k: "W", title: "Weaknesses · Слабые стороны", Icon: AlertOctagon, grad: "from-amber-500 to-orange-500", ring: "border-amber-500/30 bg-amber-500/5", ic: "text-amber-600",
      q: ["Что тебя ограничивает?", "Чего тебе не хватает?", "Где ты чаще всего спотыкаешься?"] },
    { k: "O", title: "Opportunities · Возможности", Icon: Lightbulb, grad: "from-sky-500 to-cyan-500", ring: "border-sky-500/30 bg-sky-500/5", ic: "text-sky-600",
      q: ["Какие тренды тебе на руку?", "Кто может стать союзником?", "Какие двери открыты прямо сейчас?"] },
    { k: "T", title: "Threats · Угрозы", Icon: AlertTriangle, grad: "from-rose-500 to-red-500", ring: "border-rose-500/30 bg-rose-500/5", ic: "text-rose-600",
      q: ["Что может пойти не так?", "Кто или что мешает?", "Какие риски ты избегаешь замечать?"] },
  ];
  const qIcons = [HelpCircle, Compass, Eye];
  return (
    <div className="space-y-6">
      <SectionHead title="Матрица SWOT" subtitle="Внутренняя и внешняя среда клиента" />
      <div className="grid sm:grid-cols-2 gap-4">
        {cells.map((c) => {
          const C = c.Icon;
          return (
            <div key={c.k} className={`relative overflow-hidden p-5 rounded-2xl border ${c.ring}`}>
              {/* huge faded letter */}
              <div className={`absolute -right-4 -bottom-10 text-[180px] font-black leading-none bg-gradient-to-br ${c.grad} bg-clip-text text-transparent opacity-[0.12] pointer-events-none select-none`}>
                {c.k}
              </div>
              <div className="relative flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} text-white grid place-items-center shadow-lg`}>
                  <C size={22} />
                </div>
                <div>
                  <div className={`text-2xl font-black bg-gradient-to-br ${c.grad} bg-clip-text text-transparent leading-none`}>{c.k}</div>
                  <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
                </div>
              </div>
              <ul className="relative space-y-2 text-sm text-foreground/85">
                {c.q.map((x, i) => {
                  const QI = qIcons[i % qIcons.length];
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <QI size={14} className={`mt-0.5 shrink-0 ${c.ic}`} />
                      <span>{x}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold flex items-center gap-2"><Lightbulb size={18} className="text-primary"/> Мосты SWOT — от Реальности к Возможностям</h3>
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <Bridge title="S × O — Усиление" text="Как сильные стороны помогут поймать возможности?" />
          <Bridge title="S × T — Защита" text="Как сильные стороны нейтрализуют угрозы?" />
          <Bridge title="W × O — Развитие" text="Какие возможности помогут преодолеть слабости?" />
          <Bridge title="W × T — Минимизация" text="Как защититься, где слабости встречаются с угрозами?" />
        </div>
      </div>
    </div>
  );
}
function Bridge({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-3 rounded-lg bg-secondary/60">
      <div className="font-medium text-primary text-xs mb-1">{title}</div>
      <div>{text}</div>
    </div>
  );
}

/* ---------- Пирамида Дилтса ---------- */
const DILTS = [
  {
    n: 6, name: "МИССИЯ", q: "Ради чего?",
    icon: Flag, color: "bg-violet-500 text-white",
    desc: "Ваш вклад в мир. Высшая цель и смысл существования.",
    focus: "Ради чего я живу? Какой след я хочу оставить?",
  },
  {
    n: 5, name: "ИДЕНТИЧНОСТЬ", q: "Кто я?",
    icon: User, color: "bg-blue-500 text-white",
    desc: "Кем вы себя видите. Ценности, убеждения, самоощущение.",
    focus: "Кто я? Во что верю? Что для меня важно?",
  },
  {
    n: 4, name: "УБЕЖДЕНИЯ И ЦЕННОСТИ", q: "Почему?",
    icon: Gem, color: "bg-teal-500 text-white",
    desc: "Ваши убеждения, принципы и ценности, которые управляют поведением.",
    focus: "Почему я это делаю? Что для меня важно?",
  },
  {
    n: 3, name: "СПОСОБНОСТИ", q: "Как?",
    icon: Wrench, color: "bg-green-500 text-white",
    desc: "Ваши навыки, умения, таланты. То, что вы умеете делать.",
    focus: "Как я могу это сделать? Какие навыки мне нужны?",
  },
  {
    n: 2, name: "ПОВЕДЕНИЕ", q: "Что делаю?",
    icon: Footprints, color: "bg-yellow-500 text-white",
    desc: "Ваши действия и поступки. Конкретные шаги и поведение.",
    focus: "Что я делаю? Что я могу изменить в своих действиях?",
  },
  {
    n: 1, name: "ОКРУЖЕНИЕ", q: "Где? Когда? С кем?",
    icon: Home, color: "bg-orange-500 text-white",
    desc: "Ваше окружение и контекст. Место, время, люди, ресурсы.",
    focus: "Где я? С кем я? Какие ресурсы у меня есть?",
  },
];

const DILTS_HOW = [
  { n: 1, t: "Определите уровень", d: "На каком уровне находится ваш запрос сейчас?" },
  { n: 2, t: "Идите снизу вверх", d: "Начинайте изменения с нижних уровней и поднимайтесь вверх." },
  { n: 3, t: "Проверяйте согласованность", d: "Все уровни должны быть согласованы между собой." },
  { n: 4, t: "Меняйте глубинные уровни", d: "Устойчивые изменения происходят при работе с верхними уровнями." },
];

function Nlu() {
  const [open, setOpen] = useState<number | null>(6);
  return (
    <div className="space-y-6">
      <SectionHead title="Пирамида Дилтса" subtitle="Неврологические уровни изменений" />

      <div className="grid md:grid-cols-2 gap-6 items-start">
        <DiltsPyramidSvg
          levels={DILTS.map((lv) => {
            // map tailwind bg class to hex for SVG fill
            const hex: Record<string, string> = {
              "bg-violet-500 text-white": "#8b5cf6",
              "bg-blue-500 text-white": "#3b82f6",
              "bg-teal-500 text-white": "#14b8a6",
              "bg-green-500 text-white": "#22c55e",
              "bg-yellow-500 text-white": "#eab308",
              "bg-orange-500 text-white": "#f97316",
            };
            return { n: lv.n, name: lv.name, q: lv.q, desc: lv.desc, focus: lv.focus, color: hex[lv.color] ?? "#64748b" };
          })}
          active={open ?? 0}
          onSelect={(n) => setOpen(open === n ? null : n)}
        />
        <div className="space-y-2">
          {DILTS.map((lv) => {
            const isOpen = open === lv.n;
            const I = lv.icon;
            return (
              <button
                key={lv.n}
                onClick={() => setOpen(isOpen ? null : lv.n)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-start gap-3 ${
                  isOpen ? "ring-2 ring-primary border-transparent " + lv.color : "bg-card border-border hover:border-primary/40"
                }`}
              >
                <span className={`w-7 h-7 rounded-full grid place-items-center font-bold text-xs shrink-0 ${isOpen ? "bg-white/25" : "bg-secondary"}`}>{lv.n}</span>
                <I size={18} className="mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold text-sm leading-tight">{lv.name}</div>
                  <div className={`text-xs ${isOpen ? "opacity-90" : "text-muted-foreground"}`}>{lv.q}</div>
                  {isOpen && (
                    <div className={`mt-2 text-xs ${isOpen ? "opacity-95" : ""}`}>
                      <div className="mb-1">{lv.desc}</div>
                      <div className="font-semibold">▸ {lv.focus}</div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>


      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold mb-4">Как работать с пирамидой Дилтса</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DILTS_HOW.map((s) => (
            <div key={s.n} className="p-3 rounded-xl bg-secondary/60">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">{s.n}</span>
                <div className="font-semibold text-sm">{s.t}</div>
              </div>
              <p className="text-xs text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5">
        <div className="text-xs uppercase tracking-wide text-primary font-bold mb-2">Принцип</div>
        <p className="font-medium mb-2">«Чтобы изменить результат, начните с изменения себя»</p>
        <p className="text-sm text-muted-foreground">
          Изменение окружения влияет на поведение. Изменение поведения развивает способности.
          Изменение способностей формирует убеждения. Изменение убеждений меняет идентичность.
          Изменение идентичности определяет вашу миссию.
        </p>
      </div>
    </div>
  );
}

/* ---------- Колесо баланса жизни (Пола Майера) ---------- */
const BALANCE_AREAS = [
  { n: 1, name: "Здоровье и энергия", icon: HeartPulse, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/30",
    desc: "Физическое здоровье, спорт, питание, режим дня, восстановление и забота о себе.",
    tips: ["физическое здоровье", "спорт", "питание", "режим дня", "восстановление", "забота о себе"],
    q: "Насколько вы полны энергии и сил?" },
  { n: 2, name: "Муж и отношения", icon: Heart, color: "text-rose-600 bg-rose-500/10 border-rose-500/30",
    desc: "Близость, поддержка, гармония в паре и совместное время.",
    tips: ["близость", "поддержка", "гармония в паре", "совместное время"],
    q: "Насколько вы счастливы в отношениях?" },
  { n: 3, name: "Дети и материнство", icon: Baby, color: "text-orange-600 bg-orange-500/10 border-orange-500/30",
    desc: "Отношения с детьми, воспитание, радость материнства и развитие.",
    tips: ["отношения с детьми", "воспитание", "радость материнства", "развитие"],
    q: "Насколько вы довольны этой сферой?" },
  { n: 4, name: "Особенный ребёнок и развитие семьи", icon: HandHeart, color: "text-teal-600 bg-teal-500/10 border-teal-500/30",
    desc: "Забота, реабилитация, эмоциональное состояние ребёнка, ресурсы и поддержка.",
    tips: ["забота", "реабилитация", "эмоциональное состояние ребёнка", "ресурсы", "поддержка"],
    q: "Чувствуете ли вы, что у вас достаточно поддержки и ресурсов?" },
  { n: 5, name: "Фонд и социальное влияние", icon: HandHeart, color: "text-violet-600 bg-violet-500/10 border-violet-500/30",
    desc: "Помощь людям, реализация миссии, социальное влияние и проекты.",
    tips: ["помощь людям", "реализация миссии", "социальное влияние", "проекты"],
    q: "Насколько вы реализованы в своём деле и чувствуете свой вклад?" },
  { n: 6, name: "Личный бренд и блог", icon: Laptop, color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/30",
    desc: "Публичность, самовыражение, создание контента и признание.",
    tips: ["публичность", "самовыражение", "создание контента", "признание"],
    q: "Насколько вы довольны своей реализацией в публичном поле?" },
  { n: 7, name: "Финансы и капитал", icon: Coins, color: "text-amber-600 bg-amber-500/10 border-amber-500/30",
    desc: "Доходы, накопления, инвестиции, финансовая грамотность и стабильность.",
    tips: ["доходы", "накопления", "инвестиции", "финансовая грамотность", "стабильность"],
    q: "Насколько вы чувствуете финансовую стабильность и уверенность?" },
  { n: 8, name: "Самореализация и обучение", icon: GraduationCap, color: "text-purple-600 bg-purple-500/10 border-purple-500/30",
    desc: "Личностный рост, новые навыки, знания, опыт и вдохновение.",
    tips: ["личностный рост", "новые навыки", "знания", "опыт", "вдохновение"],
    q: "Насколько вы развиваетесь и двигаетесь к своим целям?" },
];

const BALANCE_COLORS = ["#10b981", "#e11d48", "#f59e0b", "#14b8a6", "#8b5cf6", "#6366f1", "#d97706", "#a855f7"];

function RadarWithTooltip({ scores }: { scores: Record<number, number> }) {
  const [active, setActive] = useState<number | null>(null);
  const area = active != null ? BALANCE_AREAS[active] : null;
  const I = area?.icon;
  return (
    <div className="relative w-full max-w-md">
      <BalanceRadar
        values={BALANCE_AREAS.map((a) => scores[a.n])}
        labels={BALANCE_AREAS.map((a) => a.name)}
        colors={BALANCE_COLORS}
        active={active}
        onSelect={setActive}
      />
      {area && I && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-2 w-[88%] max-w-sm rounded-xl border bg-card/95 backdrop-blur shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200"
          style={{ borderColor: BALANCE_COLORS[active!] + "66" }}
        >
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg grid place-items-center text-white shrink-0"
              style={{ background: BALANCE_COLORS[active!] }}
            >
              <I size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-bold text-sm leading-tight">
                  {area.n}. {area.name}
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: BALANCE_COLORS[active!] }}>
                  {scores[area.n]} / 10
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {area.tips.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded-full border"
                    style={{
                      borderColor: BALANCE_COLORS[active!] + "55",
                      color: BALANCE_COLORS[active!],
                      background: BALANCE_COLORS[active!] + "14",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[11px] italic text-muted-foreground mt-1.5">{area.q}</p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="text-muted-foreground hover:text-foreground text-xs leading-none p-1"
              aria-label="закрыть"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Balance({ scores, onChange }: { scores: Record<number, number>; onChange: (s: Record<number, number>) => void }) {
  const average = (
    BALANCE_AREAS.reduce((s, a) => s + scores[a.n], 0) / BALANCE_AREAS.length
  ).toFixed(1);
  return (
    <div className="space-y-6">
      <SectionHead
        title="Колесо баланса жизни"
        subtitle="Оцените каждую сферу вашей жизни по шкале от 1 до 10 и создайте свою гармоничную и наполненную жизнь"
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {BALANCE_AREAS.map((a) => {
          const I = a.icon;
          const v = scores[a.n];
          return (
            <div key={a.n} className={`rounded-2xl border p-4 ${a.color}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-card grid place-items-center shrink-0"><I size={20}/></div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm">{a.n}. {a.name}</div>
                  <p className="text-xs text-foreground/70 mt-1">{a.desc}</p>
                  <p className="text-xs italic mt-2">{a.q}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Оценка</span>
                  <span className="font-mono font-bold text-foreground">{v} / 10</span>
                </div>
                <input
                  type="range" min={1} max={10} value={v}
                  onChange={(e) => onChange({ ...scores, [a.n]: Number(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6 flex flex-col items-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Ваше колесо баланса</div>
        <p className="text-xs text-muted-foreground mb-3 text-center max-w-md">
          Оранжевый полигон — ваши текущие оценки. Серый пунктирный круг — идеальный баланс.
          Чем «круглее» полигон — тем гармоничнее жизнь. Средний балл:{" "}
          <span className="font-bold text-foreground">{average} / 10</span>.
        </p>
        <RadarWithTooltip scores={scores} />
      </div>


      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2 mb-3"><Lightbulb size={18} className="text-primary"/> Как работать с колесом</h3>
        <ol className="space-y-1.5 text-sm list-decimal pl-5">
          <li>Оцените каждую сферу от 1 (совсем не удовлетворены) до 10 (полностью удовлетворены).</li>
          <li>Отметьте баллы на шкале и соедините точки по кругу.</li>
          <li>Посмотрите, какие сферы «проседают» и требуют внимания.</li>
          <li>Определите конкретные шаги для улучшения баланса в жизни.</li>
        </ol>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="text-xs uppercase tracking-wide text-emerald-700 font-bold mb-1">Гармоничная жизнь — это баланс</div>
        <p className="text-sm">Когда все сферы развиваются вместе, вы чувствуете радость, лёгкость и наполненность.</p>
        <p className="text-sm mt-3 italic text-foreground/70">♥ Баланс — это не совершенство, а осознанный выбор каждый день. ♥</p>
      </div>
    </div>
  );
}

/* ---------- Ценности ---------- */
const VALUES_PROJECT = [
  { name: "ЗНАНИЕ", icon: BookOpen, d: "Постоянное обучение и развитие, погружение в тему, расширение компетенций." },
  { name: "ЭКСПЕРТНОСТЬ", icon: UserCheck, d: "Глубокое понимание своего дела, опыт и навыки, высокое качество результатов." },
  { name: "ДЕТАЛЬНЫЙ ПЛАН", icon: ClipboardList, d: "Чёткая стратегия, пошаговый план действий, организация и контроль." },
];
const VALUES_SELF = [
  { name: "ОПЫТ", icon: Footprints, d: "Прошитые ситуации, достижения и преодоления, которые создают уверенность и опору на себя." },
  { name: "ОЦЕНКА ЗНАЧИМЫХ ЛЮДЕЙ", icon: Users, d: "Поддержка, признание и обратная связь от людей, чьё мнение важно." },
  { name: "РОЛЕВАЯ МОДЕЛЬ", icon: Star, d: "Пример человека, на которого хочется равняться и у которого можно учиться." },
  { name: "ВЕРА В СВОИ СПОСОБНОСТИ", icon: ShieldCheck, d: "Уверенность в своих силах, вера в то, что могу справиться с любыми задачами." },
];

function Values() {
  return (
    <div className="space-y-6">
      <SectionHead title="Ценности" subtitle="Опоры, которые двигают вперёд" />

      <div className="rounded-2xl bg-[#0f1b3d] text-white p-5 flex items-center gap-3">
        <Gem size={28} className="text-amber-300"/>
        <div>
          <div className="text-2xl font-bold tracking-wide">ЦЕННОСТИ</div>
          <div className="text-xs text-white/70">Внутренние опоры профессионала</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-blue-500/5 rounded-2xl border border-blue-500/30 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 grid place-items-center"><Rocket size={20} className="text-blue-600"/></div>
            <h3 className="font-bold text-blue-700">ВЕРА В ПРОЕКТ</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {VALUES_PROJECT.map((v) => {
              const I = v.icon;
              return (
                <div key={v.name} className="bg-card rounded-xl border border-blue-500/20 p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 grid place-items-center mx-auto mb-2"><I size={22} className="text-blue-600"/></div>
                  <div className="font-bold text-sm mb-1">{v.name}</div>
                  <p className="text-xs text-muted-foreground">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/30 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 grid place-items-center"><Heart size={20} className="text-emerald-600"/></div>
            <h3 className="font-bold text-emerald-700">ВЕРА В СЕБЯ</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {VALUES_SELF.map((v) => {
              const I = v.icon;
              return (
                <div key={v.name} className="bg-card rounded-xl border border-emerald-500/20 p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 grid place-items-center mx-auto mb-2"><I size={22} className="text-emerald-600"/></div>
                  <div className="font-bold text-sm mb-1">{v.name}</div>
                  <p className="text-xs text-muted-foreground">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 flex items-start gap-3">
        <Target size={22} className="text-violet-600 mt-1"/>
        <div>
          <div className="text-xs uppercase tracking-wide text-violet-700 font-bold mb-1">ИТОГ</div>
          <p className="text-sm">Сочетание веры в проект и веры в себя создаёт внутреннюю опору, двигает вперёд и помогает достигать больших целей.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Супервизия ---------- */
const SUP_TYPES = [
  {
    name: "IN VITRO («В ПРОЦЕССЕ»)", icon: Timer, color: "border-amber-500/40 bg-amber-500/10",
    desc: "Обсуждение во время сессии (онлайн или в отдельной комнате).",
    when: ["При сложных ситуациях", "Когда нужно быстрое вмешательство", "Для новичков", "При острых эмоциях"],
  },
  {
    name: "IN VIVO («В ЖИВУЮ»)", icon: Eye, color: "border-emerald-500/40 bg-emerald-500/10",
    desc: "Наблюдение супервизора за работой специалиста с клиентом.",
    when: ["Для развития навыков", "Для объективной оценки", "При обучении новичков", "Для работы с телом, голосом, невербаликой"],
  },
  {
    name: "ОБСУЖДЕНИЕ (DEBRIEFING)", icon: MessageSquare, color: "border-sky-500/40 bg-sky-500/10",
    desc: "Структурированное обсуждение прошедшей работы.",
    when: ["После завершения сессии/проекта", "Для анализа результатов", "Для планирования дальнейших шагов", "Для работы с долгосрочными случаями"],
  },
];

const SUP_PROCESS = [
  { n: 1, t: "ЗАПРОС", icon: Search, q: ["Какой кейс вы хотите разобрать?", "Что вызывает затруднение?", "Какой результат вы ожидаете от супервизии?"] },
  { n: 2, t: "КОНТЕКСТ", icon: User, q: ["С каким запросом пришёл/а клиент?", "Какова цель работы?", "На каком этапе вы сейчас?"] },
  { n: 3, t: "ЧТО ПРОИСХОДИЛО", icon: ClipboardList, q: ["Что происходило на сессии/в работе?", "Какие техники использовали?", "Что сработало хорошо?", "Что вызвало трудности?"] },
  { n: 4, t: "РЕФЛЕКСИЯ СПЕЦИАЛИСТА", icon: Brain, q: ["Что вы чувствовали?", "Что вас зацепило?", "Какие ваши реакции могли повлиять на процесс?"] },
  { n: 5, t: "АНАЛИЗ И ИНСАЙТЫ", icon: Lightbulb, q: ["Что происходит с клиентом глубже?", "Какие потребности и ограничения есть?", "Какие есть ресурсы?", "Что вы не замечаете?"] },
  { n: 6, t: "РЕШЕНИЯ И ПЛАН", icon: Target, q: ["Какие варианты работы возможны?", "Какой следующий шаг будет полезным?", "Что вы сделаете по-другому?"] },
  { n: 7, t: "ЗАВЕРШЕНИЕ", icon: Flag, q: ["Что было самым ценным?", "Какие инсайты вы получили?", "Что возьмёте в работу?", "Какой конкретный шаг сделаете?"] },
];

function Supervision() {
  const [step, setStep] = useState(1);
  const cur = SUP_PROCESS.find((s) => s.n === step)!;
  const CurI = cur.icon;
  return (
    <div className="space-y-6">
      <SectionHead title="Виды супервизии" subtitle="Система профессиональной поддержки и развития специалиста" />

      <div className="rounded-2xl bg-[#1e3a6e] text-white p-5 flex items-start gap-3">
        <Users size={28} className="shrink-0"/>
        <div>
          <div className="text-lg font-bold">СУПЕРВИЗИЯ</div>
          <p className="text-sm text-white/80 mt-1">
            Профессиональное обсуждение работы специалиста для повышения компетентности и качества помощи клиенту.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/30 p-4">
          <h3 className="font-bold text-emerald-700 mb-1">НЕПОСРЕДСТВЕННАЯ СУПЕРВИЗИЯ</h3>
          <p className="text-xs text-muted-foreground mb-3">Проводится в реальном времени или сразу после работы с клиентом.</p>
          <div className="space-y-2">
            {SUP_TYPES.slice(0, 2).map((s) => {
              const I = s.icon;
              return (
                <div key={s.name} className={`rounded-xl border p-3 ${s.color}`}>
                  <div className="flex items-center gap-2 mb-1"><I size={16}/><div className="font-bold text-sm">{s.name}</div></div>
                  <p className="text-xs mb-2">{s.desc}</p>
                  <div className="text-xs font-semibold mb-1">Когда использовать:</div>
                  <ul className="text-xs space-y-0.5">{s.when.map((w, i) => <li key={i}>· {w}</li>)}</ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-sky-500/5 rounded-2xl border border-sky-500/30 p-4">
          <h3 className="font-bold text-sky-700 mb-1">УДАЛЁННАЯ СУПЕРВИЗИЯ</h3>
          <p className="text-xs text-muted-foreground mb-3">Проводится после завершения работы (сессии, проекта, периода).</p>
          {(() => {
            const s = SUP_TYPES[2]; const I = s.icon;
            return (
              <div className={`rounded-xl border p-3 ${s.color}`}>
                <div className="flex items-center gap-2 mb-1"><I size={16}/><div className="font-bold text-sm">{s.name}</div></div>
                <p className="text-xs mb-2">{s.desc}</p>
                <div className="text-xs font-semibold mb-1">Когда использовать:</div>
                <ul className="text-xs space-y-0.5">{s.when.map((w, i) => <li key={i}>· {w}</li>)}</ul>
              </div>
            );
          })()}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <h3 className="font-semibold">Когда какой вид выбирать?</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="font-bold text-emerald-700 mb-2">НЕПОСРЕДСТВЕННАЯ (IN VITRO / IN VIVO)</div>
            <ul className="space-y-1 text-xs">
              <li>✓ Ситуация сложная и важна поддержка здесь и сейчас</li>
              <li>✓ Эмоции мешают работе</li>
              <li>✓ Нужна обратная связь в реальном времени</li>
              <li>✓ Вы развиваете новые навыки</li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30">
            <div className="font-bold text-sky-700 mb-2">УДАЛЁННАЯ (ОБСУЖДЕНИЕ)</div>
            <ul className="space-y-1 text-xs">
              <li>✓ Ситуация уже завершена</li>
              <li>✓ Нужно глубоко проанализировать</li>
              <li>✓ Есть время на рефлексию</li>
              <li>✓ Нужно увидеть картину целиком</li>
            </ul>
          </div>
          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30">
            <div className="font-bold text-violet-700 mb-2">ЧТО ДАЁТ СУПЕРВИЗИЯ?</div>
            <ul className="space-y-1 text-xs">
              <li>✓ Профессиональный рост специалиста</li>
              <li>✓ Повышение качества работы с клиентами</li>
              <li>✓ Поддержка и снижение выгорания</li>
              <li>✓ Развитие осознанности и уверенности</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold mb-3">Как должна проходить супервизия?</h3>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-1 mb-4">
          {SUP_PROCESS.map((s) => {
            const I = s.icon; const act = step === s.n;
            return (
              <button key={s.n} onClick={() => setStep(s.n)}
                className={`p-2 rounded-lg border text-center transition-all ${act ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/60 border-border hover:border-primary/40"}`}>
                <div className="text-[10px] opacity-80">{s.n}</div>
                <I size={16} className="mx-auto my-1"/>
                <div className="text-[10px] font-semibold leading-tight">{s.t}</div>
              </button>
            );
          })}
        </div>
        <div className="bg-secondary/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center"><CurI size={18}/></div>
            <div className="font-bold">{cur.n}. {cur.t}</div>
          </div>
          <ul className="space-y-1.5 text-sm">
            {cur.q.map((q, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary">·</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2"><ShieldCheck size={18} className="text-primary"/><h4 className="font-bold text-sm">Правила эффективной супервизии</h4></div>
          <ul className="text-xs space-y-1">
            <li>· Конфиденциальность</li>
            <li>· Уважение и безопасность</li>
            <li>· Открытость и честность</li>
            <li>· Фокус на клиенте и профессиональном росте</li>
            <li>· Конструктивная обратная связь</li>
          </ul>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2"><Target size={18} className="text-primary"/><h4 className="font-bold text-sm">Формула GROW для супервизии</h4></div>
          <div className="grid grid-cols-4 gap-1 text-center text-xs">
            <div className="p-2 rounded-lg bg-emerald-500/10"><div className="font-bold text-emerald-700">G</div><div>Какова цель клиента?</div></div>
            <div className="p-2 rounded-lg bg-sky-500/10"><div className="font-bold text-sky-700">R</div><div>Что происходит сейчас?</div></div>
            <div className="p-2 rounded-lg bg-amber-500/10"><div className="font-bold text-amber-700">O</div><div>Какие есть варианты?</div></div>
            <div className="p-2 rounded-lg bg-violet-500/10"><div className="font-bold text-violet-700">W</div><div>Что будет сделано дальше?</div></div>
          </div>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2"><Star size={18} className="text-emerald-600"/><h4 className="font-bold text-sm text-emerald-700">ИТОГ</h4></div>
          <p className="text-xs">Ясность в действиях, уверенность в решениях, рост профессионализма и результат для клиента.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- SOS Karpman ---------- */
const ROLES = [
  { name: "Спасатель", color: "border-sky-500/40 bg-sky-500/10", signs: ["Хочу помочь, даже когда не просят", "Беру ответственность за чужое", "Чувствую вину, если не вмешался"], antidote: "Спроси разрешения помочь. Предложи ресурс, а не решение.", q: ["Меня просили об этом?", "Что клиент сам может сделать?", "Чьи это чувства — мои или его?"] },
  { name: "Жертва", color: "border-amber-500/40 bg-amber-500/10", signs: ["Бессилие, «у меня ничего не получится»", "Поиск виноватых", "Жалоба без запроса на изменения"], antidote: "Верни ответственность через выбор: «Что ты выбираешь делать?»", q: ["Где здесь твой выбор?", "Что зависит от тебя?", "Чего ты хочешь вместо этого?"] },
  { name: "Преследователь", color: "border-rose-500/40 bg-rose-500/10", signs: ["Критика, давление, обвинение", "«Ты должен...»", "Сравнения не в пользу клиента"], antidote: "Замени оценку на любопытство. Вопрос вместо суждения.", q: ["Что я сейчас защищаю?", "Это про клиента или про меня?", "Как сказать это с уважением?"] },
];
function Sos() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <SectionHead title="SOS · Треугольник Карпмана" subtitle="Шпаргалка-предохранитель для растождествления" />

      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
        <p className="text-xs text-center text-muted-foreground mb-3">
          Нажмите на роль, чтобы увидеть признаки, антидот и SOS-вопросы. В центре — точка растождествления.
        </p>
        <KarpmanTriangleSvg active={active} onSelect={(r) => setActive(active === r ? null : r)} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {ROLES.map((r) => {
          const isActive = active === r.name;
          return (
            <div
              key={r.name}
              onClick={() => setActive(isActive ? null : r.name)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${r.color} ${isActive ? "ring-2 ring-primary scale-[1.02]" : ""}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} />
                <h3 className="font-semibold">{r.name}</h3>
              </div>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Признаки</div>
              <ul className="text-sm space-y-1 mb-4">{r.signs.map((s, i) => <li key={i}>· {s}</li>)}</ul>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Антидот</div>
              <p className="text-sm mb-4 font-medium">{r.antidote}</p>
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">SOS-вопросы</div>
              <ul className="text-sm space-y-1">{r.q.map((s, i) => <li key={i}>→ {s}</li>)}</ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}


/* ---------- Rapport ---------- */
function Rapport() {
  const steps = [
    { t: "1. Калибровка", d: "Замечай позу, темп речи, дыхание, ключевые слова. Без оценки." },
    { t: "2. Подстройка", d: "Мягко отзеркаль темп, громкость, ритм. Используй слова клиента." },
    { t: "3. Ведение", d: "Когда контакт установлен — задай новый темп / ракурс / вопрос." },
    { t: "4. Проверка", d: "Калибруй реакцию. Если ушёл контакт — вернись к подстройке." },
  ];

  // 4SS questions checklist
  const ssQuestions = [
    "Что для вас является самым важным критерием при выборе новой работы или проекта?",
    "Если вам предстоит принять сложное решение, на что вы будете опираться в первую очередь?",
    "Опишите свою идеальную рабочую среду. Что делает её комфортной для вас?",
    "Что приносит вам наибольшее удовлетворение от достигнутой цели?",
  ];
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const toggle = (i: number) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  const styles4SS = [
    {
      key: "Рулевой",
      sub: "статус · престиж",
      icon: Crown,
      tone: "from-rose-500 to-red-600",
      ring: "border-rose-300/60 bg-rose-50",
      text: "text-rose-700",
      d: "Стремление к лидерству, достижению видимых результатов, карьерному росту, авторитету и признанию заслуг.",
    },
    {
      key: "Экспрессивный",
      sub: "креативность · интерес",
      icon: Palette,
      tone: "from-amber-400 to-orange-600",
      ring: "border-amber-300/60 bg-amber-50",
      text: "text-amber-700",
      d: "Важна свобода действий, отсутствие рутины, создание нового, драйв и вдохновение.",
    },
    {
      key: "Аналитик",
      sub: "выгода · стабильность · безопасность",
      icon: Calculator,
      tone: "from-sky-500 to-indigo-700",
      ring: "border-sky-300/60 bg-sky-50",
      text: "text-sky-700",
      d: "Фокус на минимизации рисков, предсказуемости, чётких правилах, логике, цифрах и понятной выгоде.",
    },
    {
      key: "Дружелюбный",
      sub: "отношения · атмосфера",
      icon: Smile,
      tone: "from-emerald-400 to-teal-600",
      ring: "border-emerald-300/60 bg-emerald-50",
      text: "text-emerald-700",
      d: "Важность хорошего коллектива, взаимопомощи, отсутствия конфликтов и тёплой атмосферы общения.",
    },
  ];

  // ВАИД calibration questions
  const vaikQuestions = [
    "Представьте, что ваша главная цель уже достигнута. Опишите этот момент максимально подробно. Что там происходит?",
    "Вспомните свой самый успешный день (или отпуск). Как это было?",
    "Как вы понимаете, что приняли правильное решение? Как вы это ощущаете?",
    "Что ты чувствуешь, когда думаешь об этой цели? (по Дж. Уитмору)",
    "В какой части тела ты чувствуешь напряжение (или расслабление)?",
  ];

  const vaikSystems = [
    {
      key: "В",
      title: "Визуал",
      icon: Eye,
      color: "indigo",
      tone: "from-indigo-500 to-violet-600",
      ring: "border-indigo-300/60 bg-indigo-50",
      text: "text-indigo-700",
      preds: ["Я прямо вижу эту картину", "Это яркий момент", "Ясная перспектива", "В фокусе", "Тёмная ситуация"],
    },
    {
      key: "А",
      title: "Аудиал",
      icon: Ear,
      color: "sky",
      tone: "from-sky-500 to-cyan-600",
      ring: "border-sky-300/60 bg-sky-50",
      text: "text-sky-700",
      preds: ["Звучит отлично", "Шумный успех", "Общались гармонично", "Слова скрежетали", "Громкая победа"],
    },
    {
      key: "К",
      title: "Кинестетик",
      icon: Hand,
      color: "emerald",
      tone: "from-emerald-500 to-teal-600",
      ring: "border-emerald-300/60 bg-emerald-50",
      text: "text-emerald-700",
      preds: ["Чувствую опору", "Тёплые (мягкие) отношения", "Очень удобно", "Был зажат", "Проблема давит", "Дело пошло гладко"],
    },
    {
      key: "И/Д",
      title: "Запах / Вкус",
      icon: Wind,
      color: "rose",
      tone: "from-rose-500 to-pink-600",
      ring: "border-rose-300/60 bg-rose-50",
      text: "text-rose-700",
      preds: ["Почувствовал вкус победы", "Горькая ошибка", "Свежий взгляд", "Сладкий момент", "Ситуация стала кислой"],
    },
  ];

  const [activeVaik, setActiveVaik] = useState<string>("В");

  return (
    <div className="space-y-6">
      <SectionHead title="Раппорт и Коммуникация" subtitle="Контакт · типология · сенсорные системы" />

      {/* 4 шага */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2 mb-3">
          <Heart size={18} className="text-primary" /> Раппорт · 4 шага
        </h3>
        <ol className="grid sm:grid-cols-2 gap-2">
          {steps.map((s, i) => (
            <li key={i} className="p-3 rounded-lg bg-secondary/60 border border-border/60">
              <div className="font-medium text-sm">{s.t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>
            </li>
          ))}
        </ol>
      </div>

      {/* Блок А: 4SS */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center shadow">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">Определение типа личности · 4SS</h3>
            <p className="text-xs text-muted-foreground">
              Каждый из 4-х социальных стилей ориентирован на разные базовые ценности. Задайте 2–3 открытых вопроса о приоритетах.
            </p>
          </div>
        </div>

        {/* checklist questions */}
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {ssQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`text-left p-3 rounded-lg border text-sm flex gap-2 items-start transition ${
                checked[i]
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-secondary/40 hover:bg-secondary"
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-md grid place-items-center shrink-0 border ${
                  checked[i] ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground/40"
                }`}
              >
                {checked[i] && <CheckCircle2 size={14} />}
              </span>
              <span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">Q{i + 1}</span>
                {q}
              </span>
            </button>
          ))}
        </div>

        {/* 2x2 grid analysis */}
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Анализ ответов · сетка стилей</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {styles4SS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.key} className={`relative p-3 rounded-xl border ${s.ring} overflow-hidden`}>
                <Icon className={`absolute -right-3 -bottom-3 ${s.text} opacity-10`} size={88} />
                <div className="flex items-center gap-2 mb-1 relative">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.tone} text-white grid place-items-center shadow`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${s.text}`}>{s.key}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.sub}</div>
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-snug relative">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Блок Б: ВАИД / ВАК */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white grid place-items-center shadow">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">Репрезентативная система · ВАИД / ВАК</h3>
            <p className="text-xs text-muted-foreground">
              Слушайте слова-предикаты клиента. Задайте открытые вопросы на описание опыта.
            </p>
          </div>
        </div>

        {/* calibration questions */}
        <div className="rounded-xl border border-border bg-secondary/40 p-3 mb-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
            <HelpCircle size={12} /> Вопросы для калибровки
          </div>
          <ul className="space-y-1.5">
            {vaikQuestions.map((q, i) => (
              <li key={i} className="text-sm flex gap-2 items-start">
                <span className="text-[10px] mt-1 font-bold text-primary shrink-0">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* tabs */}
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Калибровочный справочник предикатов
        </div>
        <div className="flex gap-1 mb-3 flex-wrap">
          {vaikSystems.map((v) => {
            const Icon = v.icon;
            const active = activeVaik === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setActiveVaik(v.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  active
                    ? `bg-gradient-to-br ${v.tone} text-white border-transparent shadow`
                    : `${v.text} ${v.ring} hover:opacity-80`
                }`}
              >
                <Icon size={14} />
                <span className="font-bold">{v.key}</span>
                <span className="opacity-80">· {v.title}</span>
              </button>
            );
          })}
        </div>

        {vaikSystems
          .filter((v) => v.key === activeVaik)
          .map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.key} className={`rounded-xl border ${v.ring} p-3 relative overflow-hidden`}>
                <Icon className={`absolute -right-4 -bottom-4 ${v.text} opacity-10`} size={120} />
                <div className="flex items-center gap-2 mb-2 relative">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${v.tone} text-white grid place-items-center shadow`}>
                    <Icon size={16} />
                  </div>
                  <div className={`font-bold ${v.text}`}>
                    {v.key} · {v.title}
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-1.5 relative">
                  {v.preds.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm bg-card/70 border border-border/60 rounded-md px-2 py-1.5"
                    >
                      <Icon size={14} className={`${v.text} mt-0.5 shrink-0`} />
                      <span>«{p}»</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

        {/* all-at-glance accordion fallback */}
        <details className="mt-3 group">
          <summary className="cursor-pointer text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
            <ChevronDown size={12} className="group-open:rotate-180 transition" />
            Показать все системы одновременно
          </summary>
          <div className="grid sm:grid-cols-2 gap-2 mt-3">
            {vaikSystems.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.key} className={`rounded-lg border ${v.ring} p-2.5`}>
                  <div className={`flex items-center gap-1.5 font-bold text-sm ${v.text} mb-1`}>
                    <Icon size={14} /> {v.key} · {v.title}
                  </div>
                  <ul className="text-xs space-y-0.5">
                    {v.preds.map((p, i) => (
                      <li key={i} className="flex gap-1.5">
                        <Icon size={10} className={`${v.text} mt-1 shrink-0`} />
                        <span>«{p}»</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}

/* ---------- Гамбургер (ОСВК) ---------- */
function Burger() {
  const burger = [
    { img: burgerTop, t: "Верхняя булка — Признание", d: "Что конкретно сработало хорошо. Фактами, без лести." },
    { img: burgerPatty, t: "Котлета — Развивающая часть", d: "Что можно усилить. На поведении, не на личности. С конкретным примером." },
    { img: burgerBottom, t: "Нижняя булка — Поддержка", d: "Вера в способности. Следующий шаг, ресурс или предложение." },
  ];
  return (
    <div className="space-y-6">
      <SectionHead title="Гамбургер" subtitle="ОСВК · правило развивающей обратной связи" />
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl">
        {burger.map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5 flex flex-col items-center text-center">
            <img
              src={s.img}
              alt={s.t}
              loading="lazy"
              width={512}
              height={512}
              className="w-32 h-32 object-contain mb-3"
            />
            <div className="font-semibold mb-1">{s.t}</div>
            <div className="text-sm text-muted-foreground">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="bg-secondary/60 rounded-xl p-4 max-w-2xl text-sm text-muted-foreground">
        <MessageCircle size={16} className="inline mr-2 text-primary" />
        Структура «гамбургера» помогает давать обратную связь так, чтобы человек её услышал и смог использовать.
      </div>
    </div>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

/* ---------- Feedback ---------- */
const FEEDBACK_EMAIL = "sharapieva@gmail.com";

function Feedback() {
  const [liked, setLiked] = useState("");
  const [disliked, setDisliked] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const canSend = liked.trim().length > 0 || disliked.trim().length > 0;

  const send = () => {
    const subject = `Coach Space — обратная связь${name ? ` от ${name}` : ""}`;
    const body =
`От: ${name || "Аноним"}
Дата: ${new Date().toLocaleString()}

Что нравится:
${liked || "—"}

Что не нравится / что улучшить:
${disliked || "—"}
`;
    const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setSent(true);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHead
        title="Обратная связь по приложению"
        subtitle="Поделитесь впечатлениями — это поможет сделать Coach Space лучше."
      />
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <label className="text-sm font-medium">Ваше имя (необязательно)</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <ThumbsUp size={16} className="text-primary" /> Что нравится
          </label>
          <textarea
            value={liked}
            onChange={(e) => setLiked(e.target.value)}
            rows={4}
            placeholder="Что работает хорошо, что удобно, что радует…"
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <ThumbsDown size={16} className="text-destructive" /> Что не нравится / что улучшить
          </label>
          <textarea
            value={disliked}
            onChange={(e) => setDisliked(e.target.value)}
            rows={4}
            placeholder="Что мешает, чего не хватает, что добавить…"
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-y"
          />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={send}
            disabled={!canSend}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} /> Отправить
          </button>
          <p className="text-xs text-muted-foreground">
            Откроется ваш почтовый клиент с готовым письмом на {FEEDBACK_EMAIL}.
          </p>
        </div>
        {sent && (
          <p className="text-sm text-primary">Спасибо! Письмо подготовлено — отправьте его из почты ✉️</p>
        )}
      </div>
    </div>
  );
}
