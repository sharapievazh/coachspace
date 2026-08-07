import React, { memo, useRef, useState, useCallback, useMemo, MutableRefObject } from "react";
import {
  Bell, Download, Pause, Play, RotateCcw, Sparkles,
  FileText, BarChart2, CircleDot, Triangle, LayoutGrid, Plus, X,
} from "lucide-react";
import { OSVK_TEMPLATE, BALANCE_AREAS } from "./_shared";
import { BalanceRadar } from "@/components/coach/CoachVisuals";

type Props = {
  duration: number;
  setDuration: (v: number) => void;
  remaining?: number;
  running: boolean;
  setRunning: (v: boolean) => void;
  reset: () => void;
  mmss: string;
  clientNameRef: MutableRefObject<string>;
  topicRef: MutableRefObject<string>;
  notesRef: MutableRefObject<string>;
  exportSession: () => void;
  testSound: () => void;
};

// ─── Шкала 1-10 ─────────────────────────────────────────────────────────────
type ScaleMark = { value: number; label: string; color: string };
const SCALE_COLORS = ["#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#3b82f6"];

function ScaleTool() {
  const [marks, setMarks] = useState<ScaleMark[]>([]);
  const [pendingLabel, setPendingLabel] = useState("");
  const [pendingColor, setPendingColor] = useState(SCALE_COLORS[0]);
  const [hovered, setHovered] = useState<number | null>(null);

  const addMark = (value: number) => {
    const label = pendingLabel.trim() || `Отметка ${marks.length + 1}`;
    setMarks((prev) => [...prev, { value, label, color: pendingColor }]);
    setPendingLabel("");
    setPendingColor(SCALE_COLORS[(marks.length + 1) % SCALE_COLORS.length]);
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 items-center flex-wrap">
        <input
          value={pendingLabel}
          onChange={(e) => setPendingLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && hovered !== null && addMark(hovered)}
          placeholder='Название метки, напр. «Сейчас», «Цель»'
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex gap-1 shrink-0">
          {SCALE_COLORS.map((c) => (
            <button key={c} onClick={() => setPendingColor(c)}
              className="w-6 h-6 rounded-full border-2 transition-transform"
              style={{ backgroundColor: c, borderColor: pendingColor === c ? "var(--foreground)" : "transparent", transform: pendingColor === c ? "scale(1.25)" : "scale(1)" }} />
          ))}
        </div>
      </div>

      <div className="relative select-none">
        <div className="flex rounded-xl overflow-hidden border border-border">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const here = marks.filter((m) => m.value === n);
            return (
              <button key={n}
                onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(null)}
                onClick={() => addMark(n)}
                className="flex-1 flex flex-col items-center justify-end py-3 gap-1 transition-colors"
                style={{ background: hovered === n ? "var(--secondary)" : "var(--card)" }}>
                {here.map((m, i) => (
                  <span key={i} title={m.label} className="w-3 h-3 rounded-full block" style={{ backgroundColor: m.color }} />
                ))}
                <span className="text-sm font-medium">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="h-1 mt-1 rounded-full" style={{ background: "linear-gradient(to right,#ef4444,#f59e0b,#10b981)" }} />
      </div>

      {marks.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {marks.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-border bg-secondary">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
              <span className="font-medium">{m.label}</span>
              <span className="text-muted-foreground">= {m.value}</span>
              <button onClick={() => setMarks((p) => p.filter((_, j) => j !== i))} className="ml-0.5 hover:text-destructive"><X size={10}/></button>
            </span>
          ))}
          <button onClick={() => setMarks([])} className="text-xs text-muted-foreground hover:text-destructive px-2">Очистить</button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center">Нажми на цифру — поставь метку на шкале</p>
      )}
    </div>
  );
}

// ─── Колесо баланса (компактное) ─────────────────────────────────────────────
const BALANCE_COLORS = ["#10b981","#f43f5e","#f97316","#3b82f6","#d97706","#ef4444","#a855f7","#0ea5e9"];

function BalanceTool() {
  const [scores, setScores] = useState<Record<number, number>>(() =>
    Object.fromEntries(BALANCE_AREAS.map((a) => [a.n, 5]))
  );
  const values = useMemo(() => BALANCE_AREAS.map((a) => scores[a.n]), [scores]);
  const labels = useMemo(() => BALANCE_AREAS.map((a) => a.name), []);
  const avg = (values.reduce((s, v) => s + v, 0) / values.length).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {BALANCE_AREAS.map((a, i) => (
          <div key={a.n} className="flex items-center gap-2">
            <span className="text-xs w-24 shrink-0 text-foreground truncate">{a.name}</span>
            <input type="range" min={1} max={10} value={scores[a.n]}
              onChange={(e) => setScores((p) => ({ ...p, [a.n]: Number(e.target.value) }))}
              className="flex-1 accent-primary" />
            <span className="text-xs font-mono w-5 text-right" style={{ color: BALANCE_COLORS[i] }}>{scores[a.n]}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center bg-secondary/40 rounded-xl py-4">
        <p className="text-xs text-muted-foreground mb-2">Средний балл: <span className="font-bold text-foreground">{avg} / 10</span></p>
        <BalanceRadar values={values} labels={labels} colors={BALANCE_COLORS} size={300} />
      </div>
    </div>
  );
}

// ─── Пирамида Дилтса ─────────────────────────────────────────────────────────
const DILTS_LEVELS = [
  { key: "mission",   label: "Миссия / Духовность",  color: "#8b5cf6", hint: "Ради чего? Моё предназначение…" },
  { key: "identity",  label: "Идентичность",          color: "#6366f1", hint: "Кто я? Я — человек, который…" },
  { key: "beliefs",   label: "Убеждения / Ценности",  color: "#3b82f6", hint: "Почему? Я верю, что…" },
  { key: "skills",    label: "Способности",           color: "#10b981", hint: "Как? Я умею…" },
  { key: "behavior",  label: "Поведение",             color: "#f59e0b", hint: "Что делаю? Мои действия…" },
  { key: "env",       label: "Окружение",             color: "#ef4444", hint: "Где? Когда? С кем?…" },
];

function DiltsTool() {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(DILTS_LEVELS.map((l) => [l.key, ""]))
  );

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">Заполняй сверху вниз — от глубинного к внешнему</p>
      {DILTS_LEVELS.map((level, i) => {
        const widthPct = 40 + i * 10; // 40% вверху → 90% внизу
        return (
          <div key={level.key} className="flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div
                className="rounded-lg px-3 py-2 transition-all"
                style={{ width: `${widthPct}%`, minWidth: 240, backgroundColor: level.color + "22", borderLeft: `3px solid ${level.color}` }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: level.color }}>{level.label}</div>
                <textarea
                  value={values[level.key]}
                  onChange={(e) => setValues((p) => ({ ...p, [level.key]: e.target.value }))}
                  placeholder={level.hint}
                  rows={2}
                  autoComplete="off" autoCorrect="off" spellCheck={false}
                  className="w-full bg-transparent text-sm resize-none focus:outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Матрица Эйзенхауэра ─────────────────────────────────────────────────────
const MATRIX_QUADRANTS = [
  { key: "do",       label: "Важно + Срочно",     sub: "Сделай сейчас",   bg: "bg-rose-500/10",    border: "border-rose-400/40",   dot: "#ef4444" },
  { key: "schedule", label: "Важно + Несрочно",   sub: "Запланируй",      bg: "bg-emerald-500/10", border: "border-emerald-400/40", dot: "#10b981" },
  { key: "delegate", label: "Неважно + Срочно",   sub: "Делегируй",       bg: "bg-sky-500/10",     border: "border-sky-400/40",     dot: "#3b82f6" },
  { key: "delete",   label: "Неважно + Несрочно", sub: "Убери / минимум", bg: "bg-slate-500/10",   border: "border-slate-400/40",   dot: "#94a3b8" },
];

function EisenhowerTool() {
  const [tasks, setTasks] = useState<Record<string, string[]>>(() =>
    Object.fromEntries(MATRIX_QUADRANTS.map((q) => [q.key, []]))
  );
  const [inputs, setInputs] = useState<Record<string, string>>(() =>
    Object.fromEntries(MATRIX_QUADRANTS.map((q) => [q.key, ""]))
  );

  const addTask = (key: string) => {
    const t = inputs[key].trim();
    if (!t) return;
    setTasks((p) => ({ ...p, [key]: [...p[key], t] }));
    setInputs((p) => ({ ...p, [key]: "" }));
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {MATRIX_QUADRANTS.map((q) => (
        <div key={q.key} className={`rounded-xl border ${q.border} ${q.bg} p-3 flex flex-col gap-2`}>
          <div>
            <div className="text-xs font-bold text-foreground">{q.label}</div>
            <div className="text-[10px] text-muted-foreground">{q.sub}</div>
          </div>
          <ul className="space-y-1 flex-1">
            {tasks[q.key].map((t, i) => (
              <li key={i} className="flex items-start gap-1 text-xs group">
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: q.dot }} />
                <span className="flex-1">{t}</span>
                <button onClick={() => setTasks((p) => ({ ...p, [q.key]: p[q.key].filter((_, j) => j !== i) }))}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0">
                  <X size={10}/>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex gap-1">
            <input
              value={inputs[q.key]}
              onChange={(e) => setInputs((p) => ({ ...p, [q.key]: e.target.value }))}
              onKeyDown={(e) => e.key === "Enter" && addTask(q.key)}
              placeholder="Добавить задачу…"
              className="flex-1 min-w-0 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button onClick={() => addTask(q.key)}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground hover:opacity-90">
              <Plus size={12}/>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
type Tab = "notes" | "scale" | "balance" | "dilts" | "matrix";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "notes",   label: "Заметки",      icon: <FileText size={13}/> },
  { id: "scale",   label: "Шкала 1-10",   icon: <BarChart2 size={13}/> },
  { id: "balance", label: "Колесо",       icon: <CircleDot size={13}/> },
  { id: "dilts",   label: "Пирамида",     icon: <Triangle size={13}/> },
  { id: "matrix",  label: "Матрица",      icon: <LayoutGrid size={13}/> },
];

function SessionPanel(p: Props) {
  const notesElRef = useRef<HTMLTextAreaElement | null>(null);
  const [minutesInput, setMinutesInput] = useState(() => String(Math.floor(p.duration / 60)));
  const [activeTab, setActiveTab] = useState<Tab>("notes");

  const appendOsvkTemplate = useCallback(() => {
    const el = notesElRef.current;
    if (!el) { p.notesRef.current = `${p.notesRef.current || ""}${OSVK_TEMPLATE}`; return; }
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = `${el.value.slice(0, start)}${OSVK_TEMPLATE}${el.value.slice(end)}`;
    const caret = start + OSVK_TEMPLATE.length;
    el.value = next;
    p.notesRef.current = next;
    requestAnimationFrame(() => {
      try { el.focus({ preventScroll: true }); el.setSelectionRange(caret, caret); }
      catch { el.focus(); }
    });
  }, [p.notesRef]);

  return (
    <div className="flex flex-col gap-4 max-w-full">
      {/* ── Компактная шапка-таймер ── */}
      <div className="bg-card rounded-xl border border-border px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <Sparkles size={14} className="text-primary shrink-0" />
        <span className="font-mono text-lg tabular-nums text-foreground font-medium">{p.mmss}</span>
        <div className="flex items-center gap-1.5">
          <button onClick={() => p.setRunning(!p.running)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-xs font-medium">
            {p.running ? <Pause size={12}/> : <Play size={12}/>} {p.running ? "Пауза" : "Старт"}
          </button>
          <button onClick={() => { p.reset(); setMinutesInput(String(Math.floor(p.duration / 60))); }}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-secondary hover:bg-muted">
            <RotateCcw size={12}/>
          </button>
          <button onClick={p.testSound}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border bg-background hover:bg-secondary">
            <Bell size={12} className="text-primary"/>
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <input defaultValue={p.clientNameRef.current}
            onInput={(e) => { p.clientNameRef.current = e.currentTarget.value; }}
            placeholder="Клиент"
            autoComplete="off" autoCorrect="off" autoCapitalize="words" spellCheck={false}
            className="w-28 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
          <input defaultValue={p.topicRef.current}
            onInput={(e) => { p.topicRef.current = e.currentTarget.value; }}
            placeholder="Тема сессии"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="w-36 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring hidden sm:block" />
          <div className="flex items-center gap-1">
            <input type="number" min="1" max="480" disabled={p.running}
              value={minutesInput}
              onChange={(e) => {
                setMinutesInput(e.target.value);
                const m = parseInt(e.target.value, 10);
                if (!isNaN(m) && m > 0) p.setDuration(m * 60);
              }}
              className="w-14 px-2 py-1 rounded-md border border-border bg-background text-center focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 text-xs" />
            <span className="text-xs text-muted-foreground">мин</span>
          </div>
        </div>
      </div>

      {/* ── Рабочее пространство ── */}
      <section className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Вкладки */}
        <div className="flex border-b border-border overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px shrink-0 ${
                activeTab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Контент вкладки */}
        <div className="p-5">
          {activeTab === "notes" && (
            <div className="space-y-3">
              <textarea ref={notesElRef} defaultValue={p.notesRef.current}
                onInput={(e) => { p.notesRef.current = e.currentTarget.value; }}
                rows={20}
                placeholder="Ценностные слова, инсайты, цитаты клиента…"
                inputMode="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <button onClick={appendOsvkTemplate}
                  className="inline-flex items-center gap-2 px-4 min-h-10 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-orange-500/10 hover:from-amber-500/25 hover:to-orange-500/20 text-sm text-amber-700 dark:text-amber-300">
                  Маркер Супервизии
                </button>
                <button onClick={p.exportSession}
                  className="inline-flex items-center gap-2 px-4 min-h-10 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm">
                  <Download size={15}/> Экспорт .txt
                </button>
              </div>
            </div>
          )}
          {activeTab === "scale"   && <ScaleTool />}
          {activeTab === "balance" && <BalanceTool />}
          {activeTab === "dilts"   && <DiltsTool />}
          {activeTab === "matrix"  && <EisenhowerTool />}
        </div>
      </section>
    </div>
  );
}

export default memo(SessionPanel);
