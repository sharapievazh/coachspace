import React, { memo, useRef, useState, useCallback, useMemo, useEffect, MutableRefObject } from "react";
import {
  Bell, Download, Pause, Play, RotateCcw, Sparkles,
  FileText, BarChart2, CircleDot, Triangle, LayoutGrid, Plus, X,
  GitBranch, Target, ChevronDown, ChevronUp, ArrowRight,
} from "lucide-react";
// OSVK_TEMPLATE kept for potential future use but supervision now uses interactive checklist
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
  coachNameRef?: MutableRefObject<string>;
  topicRef: MutableRefObject<string>;
  notesRef: MutableRefObject<string>;
  exportSession: () => void;
  testSound: () => void;
};

// ─── helpers ────────────────────────────────────────────────────────────────
const DEPTH_COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#0ea5e9"];
const depthColor = (depth: number) => DEPTH_COLORS[Math.min(depth, DEPTH_COLORS.length - 1)];

// ─── Шкала 1-10 ─────────────────────────────────────────────────────────────
const SCALE_COLORS = ["#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#3b82f6", "#0ea5e9"];

function ScaleTool({ onExport }: { onExport: (text: string) => void }) {
  const [marks, setMarks] = useState<{ value: number; label: string; color: string }[]>([]);
  const [pendingLabel, setPendingLabel] = useState("");
  const [pendingColor, setPendingColor] = useState(SCALE_COLORS[0]);
  const [hovered, setHovered] = useState<number | null>(null);

  const addMark = (value: number) => {
    const label = pendingLabel.trim() || `Отметка ${marks.length + 1}`;
    const color = pendingColor;
    setMarks((p) => [...p, { value, label, color }]);
    setPendingLabel("");
    setPendingColor(SCALE_COLORS[(marks.length + 1) % SCALE_COLORS.length]);
  };

  const exportText = () => {
    if (!marks.length) return;
    const lines = [`\n── Шкала 1-10 ──`, ...marks.map((m) => `${m.label}: ${m.value}/10`), ""];
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 items-center flex-wrap">
        <input value={pendingLabel} onChange={(e) => setPendingLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && hovered !== null && addMark(hovered)}
          placeholder='Название метки, напр. «Сейчас», «Цель»'
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
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
                {here.map((m, i) => <span key={i} title={m.label} className="w-3 h-3 rounded-full block" style={{ backgroundColor: m.color }} />)}
                <span className="text-sm font-medium">{n}</span>
              </button>
            );
          })}
        </div>
        <div className="h-1 mt-1 rounded-full" style={{ background: "linear-gradient(to right,#ef4444,#f59e0b,#10b981)" }} />
      </div>
      {marks.length > 0 ? (
        <div className="flex flex-wrap gap-2 items-center">
          {marks.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-border bg-secondary">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
              <span className="font-medium">{m.label}</span>
              <span className="text-muted-foreground">= {m.value}</span>
              <button onClick={() => setMarks((p) => p.filter((_, j) => j !== i))} className="ml-0.5 hover:text-destructive"><X size={10}/></button>
            </span>
          ))}
          <button onClick={() => setMarks([])} className="text-xs text-muted-foreground hover:text-destructive px-2">Очистить</button>
          <button onClick={exportText} className="ml-auto inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
            <ArrowRight size={12}/> В заметки
          </button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center">Нажми на цифру — поставь метку на шкале</p>
      )}
    </div>
  );
}

// ─── Колесо баланса ─────────────────────────────────────────────────────────
const DEFAULT_BALANCE_AREAS = [
  "Семья", "Отношения", "Дети", "Карьера", "Финансы", "Здоровье", "Самореализация", "Отдых",
];
const BALANCE_COLORS = ["#10b981","#f43f5e","#f97316","#3b82f6","#d97706","#ef4444","#a855f7","#0ea5e9"];

function BalanceTool({ onExport }: { onExport: (text: string) => void }) {
  const [areas, setAreas] = useState<string[]>(DEFAULT_BALANCE_AREAS);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>(() => new Array(8).fill(5));

  const values = useMemo(() => scores, [scores]);
  const labels = useMemo(() => areas, [areas]);
  const avg = (scores.reduce((s, v) => s + v, 0) / scores.length).toFixed(1);

  const commitEdit = (idx: number, val: string) => {
    const next = [...areas];
    next[idx] = val.trim() || areas[idx];
    setAreas(next);
    setEditingIdx(null);
  };

  const exportText = () => {
    const lines = ["\n── Колесо баланса ──", ...areas.map((a, i) => `${a}: ${scores[i]}/10`), `Средний балл: ${avg}/10`, ""];
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">Нажми на название категории чтобы переименовать</p>
      <div className="flex flex-col gap-2">
        {areas.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            {editingIdx === i ? (
              <input defaultValue={name}
                ref={(el) => { if (el) el.focus(); }}
                onBlur={(e) => commitEdit(i, e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") commitEdit(i, e.currentTarget.value); }}
                className="w-28 shrink-0 px-1.5 py-0.5 rounded border border-primary bg-background text-xs focus:outline-none" />
            ) : (
              <button onClick={() => setEditingIdx(i)}
                className="w-28 shrink-0 text-xs text-foreground text-left truncate hover:text-primary transition-colors cursor-text"
                title="Нажми чтобы переименовать">
                {name}
              </button>
            )}
            <input type="range" min={1} max={10} value={scores[i]}
              onChange={(e) => { const n = [...scores]; n[i] = Number(e.target.value); setScores(n); }}
              className="flex-1 min-w-0 accent-primary" />
            <span className="text-xs font-mono w-5 text-right shrink-0" style={{ color: BALANCE_COLORS[i] }}>{scores[i]}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center bg-secondary/40 rounded-xl py-4">
        <p className="text-xs text-muted-foreground mb-2">Средний балл: <span className="font-bold text-foreground">{avg} / 10</span></p>
        <BalanceRadar values={values} labels={labels} colors={BALANCE_COLORS} size={300} />
      </div>
      <div className="flex justify-end">
        <button onClick={exportText} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
          <ArrowRight size={12}/> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── Пирамида Дилтса ─────────────────────────────────────────────────────────
const DILTS_LEVELS = [
  { key: "mission",  label: "Миссия / Духовность", color: "#8b5cf6", hint: "Ради чего? Моё предназначение…" },
  { key: "identity", label: "Идентичность",         color: "#6366f1", hint: "Кто я? Я — человек, который…" },
  { key: "beliefs",  label: "Убеждения / Ценности", color: "#3b82f6", hint: "Почему? Я верю, что…" },
  { key: "skills",   label: "Способности",          color: "#10b981", hint: "Как? Я умею…" },
  { key: "behavior", label: "Поведение",            color: "#f59e0b", hint: "Что делаю? Мои действия…" },
  { key: "env",      label: "Окружение",            color: "#ef4444", hint: "Где? Когда? С кем?…" },
];

function DiltsTool({ onExport }: { onExport: (text: string) => void }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(DILTS_LEVELS.map((l) => [l.key, ""]))
  );

  const exportText = () => {
    const filled = DILTS_LEVELS.filter((l) => values[l.key].trim());
    if (!filled.length) return;
    const lines = ["\n── Пирамида Дилтса ──", ...filled.map((l) => `${l.label}: ${values[l.key].trim()}`), ""];
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">Заполняй сверху вниз — от глубинного к внешнему</p>
      {DILTS_LEVELS.map((level, i) => {
        const widthPct = 44 + i * 9;
        return (
          <div key={level.key} className="flex flex-col items-center">
            <div className="rounded-lg px-3 py-2" style={{ width: `${widthPct}%`, minWidth: 220, backgroundColor: level.color + "22", borderLeft: `3px solid ${level.color}` }}>
              <div className="text-xs font-semibold mb-1" style={{ color: level.color }}>{level.label}</div>
              <textarea value={values[level.key]}
                onChange={(e) => setValues((p) => ({ ...p, [level.key]: e.target.value }))}
                placeholder={level.hint} rows={2}
                autoComplete="off" autoCorrect="off" spellCheck={false}
                className="w-full bg-transparent text-sm resize-none focus:outline-none placeholder:text-muted-foreground/60" />
            </div>
          </div>
        );
      })}
      <div className="flex justify-end mt-2">
        <button onClick={exportText} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
          <ArrowRight size={12}/> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── Матрица Эйзенхауэра ─────────────────────────────────────────────────────
const MATRIX_Q = [
  { key: "do",       label: "Важно + Срочно",     sub: "Сделай сейчас",   bg: "bg-rose-500/10",    border: "border-rose-400/40",   dot: "#ef4444" },
  { key: "schedule", label: "Важно + Несрочно",   sub: "Запланируй",      bg: "bg-emerald-500/10", border: "border-emerald-400/40", dot: "#10b981" },
  { key: "delegate", label: "Неважно + Срочно",   sub: "Делегируй",       bg: "bg-sky-500/10",     border: "border-sky-400/40",     dot: "#3b82f6" },
  { key: "delete",   label: "Неважно + Несрочно", sub: "Убери / минимум", bg: "bg-slate-500/10",   border: "border-slate-400/40",   dot: "#94a3b8" },
];

function EisenhowerTool({ onExport }: { onExport: (text: string) => void }) {
  const [tasks, setTasks] = useState<Record<string, string[]>>(() => Object.fromEntries(MATRIX_Q.map((q) => [q.key, []])));
  const [inputs, setInputs] = useState<Record<string, string>>(() => Object.fromEntries(MATRIX_Q.map((q) => [q.key, ""])));

  const addTask = (key: string) => {
    const t = inputs[key].trim(); if (!t) return;
    setTasks((p) => ({ ...p, [key]: [...p[key], t] }));
    setInputs((p) => ({ ...p, [key]: "" }));
  };

  const exportText = () => {
    const hasTasks = MATRIX_Q.some((q) => tasks[q.key].length > 0);
    if (!hasTasks) return;
    const lines = ["\n── Матрица Эйзенхауэра ──"];
    MATRIX_Q.forEach((q) => {
      if (tasks[q.key].length) lines.push(`\n${q.label} (${q.sub}):`, ...tasks[q.key].map((t) => `  • ${t}`));
    });
    lines.push("");
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {MATRIX_Q.map((q) => (
          <div key={q.key} className={`rounded-xl border ${q.border} ${q.bg} p-3 flex flex-col gap-2`}>
            <div>
              <div className="text-xs font-bold text-foreground">{q.label}</div>
              <div className="text-[10px] text-muted-foreground">{q.sub}</div>
            </div>
            <ul className="space-y-1 flex-1 min-h-[40px]">
              {tasks[q.key].map((t, i) => (
                <li key={i} className="flex items-start gap-1 text-xs group">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: q.dot }} />
                  <span className="flex-1">{t}</span>
                  <button onClick={() => setTasks((p) => ({ ...p, [q.key]: p[q.key].filter((_, j) => j !== i) }))}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0"><X size={10}/></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-1">
              <input value={inputs[q.key]} onChange={(e) => setInputs((p) => ({ ...p, [q.key]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && addTask(q.key)}
                placeholder="Добавить…"
                className="flex-1 min-w-0 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
              <button onClick={() => addTask(q.key)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-primary-foreground hover:opacity-90">
                <Plus size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <button onClick={exportText} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
          <ArrowRight size={12}/> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── Майнд-мап ───────────────────────────────────────────────────────────────
type MindNode = { id: number; text: string; children: number[]; depth: number; color: string };
type MindView = "list" | "radial";

const MAP_W = 580;
const MAP_H = 420;
const CX = 290;
const CY = 210;
const RING_R = [0, 160, 265] as const;

function buildRadialLayout(nodes: MindNode[]): Map<number, { x: number; y: number }> {
  const pos = new Map<number, { x: number; y: number }>();
  pos.set(0, { x: CX, y: CY });

  const placeChildren = (parentId: number, parentAngle: number, spread: number) => {
    const parent = nodes.find((n) => n.id === parentId);
    if (!parent?.children.length) return;
    const n = parent.children.length;
    parent.children.forEach((childId, i) => {
      const child = nodes.find((nd) => nd.id === childId);
      if (!child) return;
      // Root children: evenly around full circle from top; sub-children: fan in parent direction
      const angleDeg =
        parent.depth === 0
          ? -90 + (360 / n) * i
          : parentAngle - spread / 2 + (n === 1 ? spread / 2 : (spread / (n - 1)) * i);
      const r = RING_R[Math.min(child.depth, RING_R.length - 1)];
      const rad = (angleDeg * Math.PI) / 180;
      pos.set(childId, { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) });
      placeChildren(childId, angleDeg, Math.min(80, 35 + n * 15));
    });
  };

  placeChildren(0, 0, 360);
  return pos;
}

function MindMapTool({ onExport }: { onExport: (text: string) => void }) {
  const [nodes, setNodes] = useState<MindNode[]>([
    { id: 0, text: "Главная тема", children: [], depth: 0, color: depthColor(0) },
  ]);
  const [editingId, setEditingIdState] = useState<number | null>(null);
  const [editText, setEditTextState] = useState("");
  const [viewMode, setViewMode] = useState<MindView>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const nextId = useRef(1);
  const pendingEditId = useRef<number | null>(null);
  const editingIdRef = useRef<number | null>(null);
  const editTextRef = useRef("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const listEditInputRef = useRef<HTMLInputElement>(null);

  const setEditingId = (id: number | null) => {
    editingIdRef.current = id;
    setEditingIdState(id);
  };
  const setEditText = (t: string) => {
    editTextRef.current = t;
    setEditTextState(t);
  };

  // Focus input when editing starts (avoids autoFocus issues on iOS WebView)
  useEffect(() => {
    if (editingId !== null) {
      const ref = viewMode === "radial" ? editInputRef : listEditInputRef;
      ref.current?.focus();
    }
  }, [editingId, viewMode]);

  // Trigger edit after node is added (replaces unsafe setTimeout)
  useEffect(() => {
    if (pendingEditId.current !== null) {
      const id = pendingEditId.current;
      pendingEditId.current = null;
      setEditingId(id);
      setEditText("Новая ветка");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes]);

  const addChild = (parentId: number, parentDepth: number) => {
    const id = nextId.current++;
    pendingEditId.current = id;
    const childDepth = parentDepth + 1;
    setNodes((prev) => {
      const updated = prev.map((n) =>
        n.id === parentId ? { ...n, children: [...n.children, id] } : n
      );
      return [
        ...updated,
        { id, text: "Новая ветка", children: [], depth: childDepth, color: depthColor(childDepth) },
      ];
    });
    setSelectedId(null);
  };

  const commitEdit = () => {
    const id = editingIdRef.current;
    if (id === null) return;
    editingIdRef.current = null; // prevent double-call
    const t = editTextRef.current.trim() || "…";
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, text: t } : n)));
    setEditingIdState(null);
  };

  const removeNode = (id: number) => {
    if (id === 0) return;
    const toRemove = new Set<number>();
    const collect = (nid: number) => {
      toRemove.add(nid);
      nodes.find((n) => n.id === nid)?.children.forEach(collect);
    };
    collect(id);
    setNodes((prev) =>
      prev
        .filter((n) => !toRemove.has(n.id))
        .map((n) => ({ ...n, children: n.children.filter((c) => !toRemove.has(c)) }))
    );
    setSelectedId(null);
  };

  const exportText = () => {
    const lines: string[] = ["\n── Mind Map ──"];
    const walk = (id: number, depth: number) => {
      const node = nodes.find((n) => n.id === id);
      if (!node) return;
      lines.push("  ".repeat(depth) + (depth === 0 ? node.text : `• ${node.text}`));
      node.children.forEach((c) => walk(c, depth + 1));
    };
    walk(0, 0);
    lines.push("");
    onExport(lines.join("\n"));
  };

  // ── List view ────────────────────────────────────────────
  const renderListNode = (id: number): React.ReactNode => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return null;
    const isRoot = id === 0;
    const c = node.color;
    return (
      <div key={id} className={node.depth > 0 ? "ml-5 pl-3 border-l-2" : ""} style={node.depth > 0 ? { borderColor: c + "66" } : {}}>
        <div className="group flex items-center gap-1.5 py-0.5">
          {editingId === id ? (
            <input
              ref={listEditInputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => e.key === "Enter" && commitEdit()}
              className="px-2 py-0.5 rounded border text-sm focus:outline-none w-full max-w-xs bg-background"
              style={{ borderColor: c }}
            />
          ) : (
            <span
              onDoubleClick={() => { setEditingId(id); setEditText(node.text); }}
              className="px-2.5 py-1 rounded-lg text-sm cursor-pointer select-none transition-colors font-medium"
              style={{ backgroundColor: c + (isRoot ? "33" : "22"), color: c, border: `1px solid ${c}55` }}
            >
              {node.text}
            </span>
          )}
          <button
            onClick={() => addChild(id, node.depth)}
            title="Добавить ветку"
            className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded flex items-center justify-center text-white text-xs"
            style={{ backgroundColor: c }}
          >
            <Plus size={11} />
          </button>
          {!isRoot && (
            <button
              onClick={() => removeNode(id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded flex items-center justify-center hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
            >
              <X size={11} />
            </button>
          )}
        </div>
        {node.children.map((cid) => renderListNode(cid))}
      </div>
    );
  };

  // ── MindMap (radial) view — div-based so text is fully editable ──────────
  const radialPos = useMemo(() => buildRadialLayout(nodes), [nodes]);

  const renderMindMap = () => {
    const connections: React.ReactNode[] = [];
    const nodeEls: React.ReactNode[] = [];

    // Approximate half-sizes per depth to start/end lines at node edges
    const halfW = [56, 44, 36];
    const halfH = [18, 14, 12];

    nodes.forEach((node) => {
      const from = radialPos.get(node.id);
      if (!from) return;
      node.children.forEach((childId) => {
        const to = radialPos.get(childId);
        const child = nodes.find((n) => n.id === childId);
        if (!to || !child) return;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) return;
        const ux = dx / dist;
        const uy = dy / dist;

        // Shrink line endpoints to node edges (ellipse approximation)
        const pd = node.depth;
        const cd = child.depth;
        const pW = halfW[Math.min(pd, halfW.length - 1)];
        const pH = halfH[Math.min(pd, halfH.length - 1)];
        const cW = halfW[Math.min(cd, halfW.length - 1)];
        const cH = halfH[Math.min(cd, halfH.length - 1)];
        // Distance from center to ellipse edge in the direction of the line
        const pEdge = Math.min(pW, pH) + (Math.abs(ux) * (pW - Math.min(pW, pH)) + Math.abs(uy) * (pH - Math.min(pW, pH)));
        const cEdge = Math.min(cW, cH) + (Math.abs(ux) * (cW - Math.min(cW, cH)) + Math.abs(uy) * (cH - Math.min(cW, cH)));

        const x1 = from.x + ux * (pEdge + 4);
        const y1 = from.y + uy * (pEdge + 4);
        const x2 = to.x - ux * (cEdge + 4);
        const y2 = to.y - uy * (cEdge + 4);

        const seg = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const t = seg * 0.38;
        const vx = (x2 - x1) / Math.max(seg, 1);
        const vy = (y2 - y1) / Math.max(seg, 1);

        connections.push(
          <path
            key={`conn-${node.id}-${childId}`}
            d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + vx * t).toFixed(1)} ${(y1 + vy * t).toFixed(1)} ${(x2 - vx * t).toFixed(1)} ${(y2 - vy * t).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
            stroke={child.color}
            strokeWidth={child.depth === 1 ? 2.2 : 1.6}
            strokeOpacity="0.6"
            fill="none"
            strokeLinecap="round"
          />
        );
      });
    });

    nodes.forEach((node) => {
      const p = radialPos.get(node.id);
      if (!p) return;
      const isRoot = node.id === 0;
      const isSel = selectedId === node.id;
      const isEdit = editingId === node.id;
      const c = node.color;

      nodeEls.push(
        <div
          key={node.id}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)",
            zIndex: isEdit || isSel ? 10 : 1,
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (editingId !== null && editingId !== node.id) { commitEdit(); return; }
            if (editingId === node.id) return;
            setSelectedId(node.id === selectedId ? null : node.id);
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setSelectedId(null);
            setEditingId(node.id);
            setEditText(node.text);
          }}
        >
          <div
            style={{
              border: `${isSel ? 2 : 1.5}px solid ${c}${isSel ? "cc" : "77"}`,
              borderRadius: isRoot ? 14 : 9,
              background: c + (isRoot ? "26" : "18"),
              padding: isRoot ? "8px 18px" : "6px 12px",
              minWidth: isRoot ? 110 : 70,
              maxWidth: isRoot ? 175 : 145,
              cursor: "pointer",
            }}
          >
            {isEdit ? (
              <input
                ref={editInputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => { if (e.key === "Enter") commitEdit(); }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: c,
                  fontWeight: isRoot ? "bold" : "600",
                  fontSize: isRoot ? 13 : 11,
                  width: "100%",
                  fontFamily: "inherit",
                  textAlign: "center",
                  minWidth: 60,
                }}
              />
            ) : (
              <span
                style={{
                  color: c,
                  fontWeight: isRoot ? "bold" : "600",
                  fontSize: isRoot ? 13 : 11,
                  display: "block",
                  textAlign: "center",
                  wordBreak: "break-word",
                  lineHeight: 1.3,
                }}
              >
                {node.text}
              </span>
            )}
          </div>

          {isSel && !isEdit && (
            <>
              <button
                title="Добавить ветку"
                onClick={(e) => { e.stopPropagation(); addChild(node.id, node.depth); }}
                style={{
                  position: "absolute", top: -10, right: -10,
                  width: 22, height: 22, borderRadius: 11,
                  background: c, border: "2px solid white",
                  color: "white", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: "bold",
                  boxShadow: "0 1px 5px rgba(0,0,0,0.35)", zIndex: 20,
                }}
              >+</button>
              {!isRoot && (
                <button
                  title="Удалить"
                  onClick={(e) => { e.stopPropagation(); removeNode(node.id); }}
                  style={{
                    position: "absolute", top: -10, left: -10,
                    width: 22, height: 22, borderRadius: 11,
                    background: "#ef4444", border: "2px solid white",
                    color: "white", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: "bold",
                    boxShadow: "0 1px 5px rgba(0,0,0,0.35)", zIndex: 20,
                  }}
                >×</button>
              )}
            </>
          )}
        </div>
      );
    });

    return (
      <div
        style={{ position: "relative", width: MAP_W, height: MAP_H }}
        onClick={() => { if (selectedId !== null) setSelectedId(null); if (editingId !== null) commitEdit(); }}
      >
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        >
          {connections}
        </svg>
        {nodeEls}
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          {viewMode === "list"
            ? "2× клик — изменить · «+» при наведении — добавить"
            : "Клик — выбрать · 2× — изменить текст · «+» — ветка"}
        </p>
        <div className="flex gap-0.5 p-0.5 rounded-lg bg-secondary/70 shrink-0">
          <button
            onClick={() => setViewMode("list")}
            className={`px-2.5 py-1 rounded-md text-xs transition-colors ${viewMode === "list" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
          >
            Список
          </button>
          <button
            onClick={() => setViewMode("radial")}
            className={`px-2.5 py-1 rounded-md text-xs transition-colors ${viewMode === "radial" ? "bg-card shadow text-foreground" : "text-muted-foreground"}`}
          >
            🌸 MindMap
          </button>
        </div>
      </div>

      {viewMode === "list" && (
        <div className="rounded-xl border border-border bg-secondary/30 p-4 min-h-[200px] overflow-auto">
          {renderListNode(0)}
        </div>
      )}

      {viewMode === "radial" && (
        <div className="rounded-xl border border-border bg-secondary/20 overflow-auto">
          <div style={{ minWidth: MAP_W }}>
            {renderMindMap()}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={exportText}
          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary"
        >
          <ArrowRight size={12} /> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── GROW ────────────────────────────────────────────────────────────────────
const GROW_SECTIONS = [
  {
    key: "goal", letter: "G", title: "Goal — Цель",
    color: "#8b5cf6", hint: "Чего хочет достичь клиент?",
    questions: [
      "Чего вы хотите достичь?",
      "Как вы поймёте, что достигли цели?",
      "К какому сроку?",
      "Почему эта цель важна для вас?",
      "Что изменится в вашей жизни, когда вы её достигнете?",
    ],
  },
  {
    key: "reality", letter: "R", title: "Reality — Реальность",
    color: "#3b82f6", hint: "Где клиент находится сейчас?",
    questions: [
      "Где вы находитесь сейчас относительно цели?",
      "Что уже сделано?",
      "Что мешает двигаться вперёд?",
      "Какие ресурсы уже есть?",
      "Что происходит, когда вы пробуете что-то менять?",
    ],
  },
  {
    key: "options", letter: "O", title: "Options — Варианты",
    color: "#10b981", hint: "Какие есть пути?",
    questions: [
      "Какие варианты у вас есть?",
      "Что ещё можно сделать?",
      "Что бы вы сделали, если бы не было ограничений?",
      "Что делали другие в похожей ситуации?",
      "Что вас вдохновляет из перечисленного?",
    ],
  },
  {
    key: "will", letter: "W", title: "Will — Действие",
    color: "#f59e0b", hint: "Что конкретно сделает клиент?",
    questions: [
      "Что конкретно вы сделаете?",
      "Когда именно?",
      "Что может помешать и как вы с этим справитесь?",
      "Какая поддержка вам нужна?",
      "По шкале 1-10 насколько вы готовы это сделать?",
    ],
  },
];

function GrowTool({ onExport }: { onExport: (text: string) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(GROW_SECTIONS.map((s) => [s.key, ""]))
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(GROW_SECTIONS.map((s) => [s.key, false]))
  );

  const exportText = () => {
    const filled = GROW_SECTIONS.filter((s) => answers[s.key].trim());
    if (!filled.length) return;
    const lines = ["\n── GROW-сессия ──", ...filled.map((s) => `\n${s.title}:\n${answers[s.key].trim()}`), ""];
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-3">
      {GROW_SECTIONS.map((s) => (
        <div key={s.key} className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 bg-secondary/40">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: s.color }}>{s.letter}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.hint}</div>
            </div>
            <button onClick={() => setExpanded((p) => ({ ...p, [s.key]: !p[s.key] }))}
              className="text-muted-foreground hover:text-foreground shrink-0">
              {expanded[s.key] ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
          </div>

          {expanded[s.key] && (
            <div className="px-4 py-3 space-y-2 border-t border-border">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Вопросы для клиента</div>
              <ul className="space-y-1.5">
                {s.questions.map((q, i) => (
                  <li key={i} className="text-xs text-foreground flex gap-2">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: s.color }} />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="px-4 py-3 border-t border-border">
            <textarea value={answers[s.key]}
              onChange={(e) => setAnswers((p) => ({ ...p, [s.key]: e.target.value }))}
              rows={3} placeholder="Записывай ответы клиента…"
              autoComplete="off" autoCorrect="off" spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button onClick={exportText} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
          <ArrowRight size={12}/> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── 6 шляп Де Боно ─────────────────────────────────────────────────────────
const SIX_HATS = [
  { color: "Белая",   emoji: "⬜", hex: "#94a3b8", focus: "Факты и информация",   desc: "Только объективные данные. Что мы знаем? Какие факты есть? Чего не хватает?",      example: "Какие данные у нас есть по этой теме?" },
  { color: "Красная", emoji: "🟥", hex: "#ef4444", focus: "Эмоции и интуиция",    desc: "Чувства без объяснений. Какова ваша реакция? Что чувствуете прямо сейчас?",       example: "Какое у вас ощущение от этой идеи?" },
  { color: "Чёрная",  emoji: "⬛", hex: "#374151", focus: "Риски и критика",       desc: "Осторожность. Что может пойти не так? Какие риски и слабые стороны?",             example: "Какие препятствия мы видим?" },
  { color: "Жёлтая",  emoji: "🟨", hex: "#eab308", focus: "Плюсы и возможности",  desc: "Оптимизм. Что хорошего в этой идее? Какие выгоды и преимущества?",               example: "Почему это может сработать?" },
  { color: "Зелёная", emoji: "🟩", hex: "#10b981", focus: "Творчество и идеи",    desc: "Генерация. Новые идеи, альтернативы, нестандартные решения. Без оценки!",        example: "Какие ещё варианты существуют?" },
  { color: "Синяя",   emoji: "🟦", hex: "#3b82f6", focus: "Процесс и управление", desc: "Организация мышления. Что мы делаем сейчас? Какой следующий шаг? Итоги.",        example: "Как мы организуем дальнейшую работу?" },
];

function SixHatsTool({ onExport }: { onExport: (text: string) => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    Object.fromEntries(SIX_HATS.map((h) => [h.color, ""]))
  );
  const [active, setActive] = useState<string | null>(null);

  const exportText = () => {
    const filled = SIX_HATS.filter((h) => answers[h.color].trim());
    if (!filled.length) return;
    const lines = ["\n── 6 шляп Де Боно ──", ...filled.map((h) => `\n${h.emoji} ${h.color} (${h.focus}):\n${answers[h.color].trim()}`), ""];
    onExport(lines.join("\n"));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">Нажми на шляпу — раскроется фокус и поле для ответов команды</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {SIX_HATS.map((hat) => {
          const isOpen = active === hat.color;
          return (
            <div key={hat.color} className="rounded-xl border border-border overflow-hidden">
              <button onClick={() => setActive(isOpen ? null : hat.color)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40">
                <span className="text-xl shrink-0">{hat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold" style={{ color: hat.hex }}>{hat.color} шляпа</div>
                  <div className="text-xs text-muted-foreground truncate">{hat.focus}</div>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-muted-foreground shrink-0"/> : <ChevronDown size={14} className="text-muted-foreground shrink-0"/>}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 space-y-2 border-t border-border">
                  <p className="text-xs text-muted-foreground pt-3 leading-relaxed">{hat.desc}</p>
                  <p className="text-xs italic" style={{ color: hat.hex }}>💬 {hat.example}</p>
                  <textarea
                    value={answers[hat.color]}
                    onChange={(e) => setAnswers((p) => ({ ...p, [hat.color]: e.target.value }))}
                    rows={3} placeholder="Ответы и идеи команды…"
                    autoComplete="off" autoCorrect="off" spellCheck={false}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-end">
        <button onClick={exportText} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-border hover:bg-secondary">
          <ArrowRight size={12}/> В заметки
        </button>
      </div>
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
type Tab = "notes" | "scale" | "balance" | "dilts" | "matrix" | "mindmap" | "grow" | "hats";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "notes",   label: "Заметки",    icon: <FileText size={13}/> },
  { id: "scale",   label: "Шкала 1-10", icon: <BarChart2 size={13}/> },
  { id: "balance", label: "Колесо",     icon: <CircleDot size={13}/> },
  { id: "dilts",   label: "Пирамида",   icon: <Triangle size={13}/> },
  { id: "matrix",  label: "Матрица",    icon: <LayoutGrid size={13}/> },
  { id: "mindmap", label: "Mind Map",   icon: <GitBranch size={13}/> },
  { id: "grow",    label: "GROW",       icon: <Target size={13}/> },
  { id: "hats",    label: "6 шляп",     icon: <span className="text-[11px]">🎩</span> },
];

// ─── Маркер Супервизии (интерактивный) ───────────────────────────────────────
const IND_ITEMS = [
  "Раппорт (был или нет)",
  "Прояснение ситуации",
  "Речевые инструменты",
  "Ответственность на Клиенте",
  "Баланс поддержки и фрустрации",
  "Постановка цели коучинга и сессии (контракт на сессию)",
  "Прояснение реальности",
  "Найдены новые возможности",
  "Составлен план действий. Мотивация. Есть «протяжка» на следующую сессию",
];

const TEAM_ITEMS = [
  "Базовые навыки классического коуча",
  "Установление контакта (улыбка, самопрезентация, комплимент группе, поддержка, ритм, эмоции, ценности, согласие)",
  "Навыки вербального и невербального управления группой",
  "Владение риторическими приёмами",
  "Владение приёмами управления фазами динамики группы",
  "Навыки организации поиска креативных решений",
];

type MarkerSection = "ind" | "team";

function SupervisionMarker({ onClose, onExport }: { onClose: () => void; onExport: (text: string) => void }) {
  const [section, setSection] = useState<MarkerSection>("ind");
  const [indChecked, setIndChecked] = useState<boolean[]>(() => new Array(IND_ITEMS.length).fill(false));
  const [teamChecked, setTeamChecked] = useState<boolean[]>(() => new Array(TEAM_ITEMS.length).fill(false));
  const [indNotes, setIndNotes] = useState<string[]>(() => new Array(IND_ITEMS.length).fill(""));
  const [teamNotes, setTeamNotes] = useState<string[]>(() => new Array(TEAM_ITEMS.length).fill(""));

  const items = section === "ind" ? IND_ITEMS : TEAM_ITEMS;
  const checked = section === "ind" ? indChecked : teamChecked;
  const notes = section === "ind" ? indNotes : teamNotes;
  const setChecked = section === "ind" ? setIndChecked : setTeamChecked;
  const setNotes = section === "ind" ? setIndNotes : setTeamNotes;

  const toggle = (i: number) => setChecked((p) => p.map((v, idx) => (idx === i ? !v : v)));
  const setNote = (i: number, val: string) => setNotes((p) => p.map((v, idx) => (idx === i ? val : v)));

  const doExport = () => {
    const lines: string[] = [];
    const renderSection = (title: string, its: string[], ch: boolean[], ns: string[]) => {
      const checkedItems = its.filter((_, i) => ch[i]);
      if (checkedItems.length === 0) return;
      lines.push(`\n── ${title} ──`);
      its.forEach((item, i) => {
        if (!ch[i]) return;
        const note = ns[i].trim();
        lines.push(`✓ ${item}${note ? ": " + note : ""}`);
      });
    };
    renderSection("Маркер Супервизии — Индивидуальный коучинг", IND_ITEMS, indChecked, indNotes);
    renderSection("Маркер Супервизии — Командный коучинг", TEAM_ITEMS, teamChecked, teamNotes);
    if (lines.length === 0) return;
    lines.push("");
    onExport(lines.join("\n"));
    onClose();
  };

  const doneCount = checked.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: "rgba(0,0,0,0.55)" }} onClick={onClose}>
      <div className="w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-card border border-border shadow-2xl flex flex-col"
        style={{ maxHeight: "88vh" }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center shadow shrink-0">
            <span className="text-white text-base">✦</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground text-sm">Маркер Супервизии</div>
            <div className="text-xs text-muted-foreground">{doneCount} / {items.length} выполнено</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground">
            <X size={16} />
          </button>
        </div>

        {/* Section toggle */}
        <div className="flex gap-1.5 px-5 pt-4 pb-3 shrink-0">
          {(["ind", "team"] as MarkerSection[]).map((s) => (
            <button key={s} onClick={() => setSection(s)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                section === s
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>
              {s === "ind" ? "Индивидуальный" : "Командный"}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-3 shrink-0">
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
              style={{ width: `${(doneCount / items.length) * 100}%` }} />
          </div>
        </div>

        {/* Checklist */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-2">
          {items.map((item, i) => (
            <div key={`${section}-${i}`}
              className={`rounded-xl border transition-colors ${
                checked[i]
                  ? "border-emerald-500/40 bg-emerald-500/8"
                  : "border-border bg-background"
              }`}>
              <button onClick={() => toggle(i)}
                className="w-full flex items-start gap-3 px-4 py-3 text-left">
                <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  checked[i] ? "bg-emerald-500 border-emerald-500" : "border-border"
                }`}>
                  {checked[i] && <span className="text-white text-xs font-bold">✓</span>}
                </div>
                <span className={`text-sm leading-snug ${checked[i] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {section === "team" && <span className="font-semibold text-muted-foreground mr-1">{i + 1}.</span>}
                  {item}
                </span>
              </button>
              {checked[i] && (
                <div className="px-4 pb-3">
                  <input value={notes[i]} onChange={(e) => setNote(i, e.target.value)}
                    placeholder="Заметка…"
                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-card text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-border shrink-0">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-secondary">
            Закрыть
          </button>
          <button onClick={doExport}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-1.5">
            <ArrowRight size={14} /> В заметки
          </button>
        </div>
      </div>
    </div>
  );
}

class ToolErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() {
    if (this.state.error) {
      return (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive space-y-2">
          <p className="font-semibold">Что-то пошло не так</p>
          <p className="text-xs opacity-70">{this.state.error}</p>
          <button
            onClick={() => this.setState({ error: null })}
            className="px-3 py-1 rounded-md bg-destructive text-destructive-foreground text-xs"
          >Восстановить</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function SessionPanel(p: Props) {
  const notesElRef = useRef<HTMLTextAreaElement | null>(null);
  const mmssElRef = useRef<HTMLSpanElement | null>(null);
  const [minutesInput, setMinutesInput] = useState(() => String(Math.floor(p.duration / 60)));
  const [activeTab, setActiveTab] = useState<Tab>("notes");
  const [markerOpen, setMarkerOpen] = useState(false);

  // Update timer display directly in DOM — no React re-render on every tick
  useEffect(() => {
    if (mmssElRef.current) mmssElRef.current.textContent = p.mmss;
  }, [p.mmss]);

  const appendToNotes = useCallback((text: string) => {
    const el = notesElRef.current;
    const current = el ? el.value : p.notesRef.current;
    const next = current + text;
    if (el) el.value = next;
    p.notesRef.current = next;
    setActiveTab("notes");
    requestAnimationFrame(() => {
      if (el) { el.focus(); el.scrollTop = el.scrollHeight; }
    });
  }, [p.notesRef]);


  return (
    <div className="flex flex-col gap-4 max-w-full">
      {/* ── Компактная шапка-таймер ── */}
      <div className="bg-card rounded-xl border border-border px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <Sparkles size={14} className="text-primary shrink-0" />
        <span ref={mmssElRef} className="font-mono text-lg tabular-nums text-foreground font-medium">{p.mmss}</span>
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
            placeholder="Клиент" autoComplete="off" autoCorrect="off" autoCapitalize="words" spellCheck={false}
            className="w-28 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
          <input defaultValue={p.coachNameRef?.current ?? ""}
            onInput={(e) => { if (p.coachNameRef) p.coachNameRef.current = e.currentTarget.value; }}
            placeholder="Коуч" autoComplete="off" autoCorrect="off" autoCapitalize="words" spellCheck={false}
            className="w-28 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring" />
          <input defaultValue={p.topicRef.current}
            onInput={(e) => { p.topicRef.current = e.currentTarget.value; }}
            placeholder="Тема сессии" autoComplete="off" autoCorrect="off" spellCheck={false}
            className="w-36 px-2 py-1 rounded-md border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-ring hidden sm:block" />
          <div className="flex items-center gap-1">
            <input type="number" min="1" max="480" disabled={p.running} value={minutesInput}
              onChange={(e) => { setMinutesInput(e.target.value); const m = parseInt(e.target.value, 10); if (!isNaN(m) && m > 0) p.setDuration(m * 60); }}
              className="w-14 px-2 py-1 rounded-md border border-border bg-background text-center focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 text-xs" />
            <span className="text-xs text-muted-foreground">мин</span>
          </div>
        </div>
      </div>

      {/* ── Рабочее пространство ── */}
      <section className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Вкладки (скролл на малых экранах) */}
        <div className="flex border-b border-border overflow-x-auto scrollbar-none" style={{ touchAction: "pan-x" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px shrink-0 ${
                activeTab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Все панели всегда смонтированы — данные не теряются при переключении */}
        <div className="p-5">
          <div className={activeTab === "notes" ? "" : "hidden"}>
            <div className="space-y-3">
              <textarea ref={notesElRef} defaultValue={p.notesRef.current}
                onInput={(e) => { p.notesRef.current = e.currentTarget.value; }}
                rows={20} placeholder="Ценностные слова, инсайты, цитаты клиента…"
                inputMode="text" autoComplete="off" autoCorrect="off" spellCheck={false}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none text-sm" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <button onClick={() => setMarkerOpen(true)}
                  className="inline-flex items-center gap-2 px-4 min-h-10 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-orange-500/10 hover:from-amber-500/25 hover:to-orange-500/20 text-sm text-amber-700 dark:text-amber-300 font-medium">
                  ✦ Маркер Супервизии
                </button>
                <button onClick={p.exportSession}
                  className="inline-flex items-center gap-2 px-4 min-h-10 rounded-lg bg-primary text-primary-foreground hover:opacity-90 text-sm">
                  <Download size={15}/> Экспорт
                </button>
              </div>
            </div>
          </div>
          <div className={activeTab === "scale"   ? "" : "hidden"}><ScaleTool      onExport={appendToNotes} /></div>
          <div className={activeTab === "balance" ? "" : "hidden"}><BalanceTool    onExport={appendToNotes} /></div>
          <div className={activeTab === "dilts"   ? "" : "hidden"}><DiltsTool      onExport={appendToNotes} /></div>
          <div className={activeTab === "matrix"  ? "" : "hidden"}><EisenhowerTool onExport={appendToNotes} /></div>
          <div className={activeTab === "mindmap" ? "" : "hidden"}><ToolErrorBoundary><MindMapTool onExport={appendToNotes} /></ToolErrorBoundary></div>
          <div className={activeTab === "grow"    ? "" : "hidden"}><GrowTool       onExport={appendToNotes} /></div>
          <div className={activeTab === "hats"    ? "" : "hidden"}><SixHatsTool    onExport={appendToNotes} /></div>
        </div>
      </section>

      {markerOpen && (
        <SupervisionMarker
          onClose={() => setMarkerOpen(false)}
          onExport={appendToNotes}
        />
      )}
    </div>
  );
}

// Custom comparator: skip re-render when only mmss/remaining change (timer ticks).
// The timer display is updated directly via mmssElRef, no React render needed.
export default memo(SessionPanel, (prev, next) => {
  return (
    prev.duration === next.duration &&
    prev.running === next.running &&
    prev.setDuration === next.setDuration &&
    prev.setRunning === next.setRunning &&
    prev.reset === next.reset &&
    prev.exportSession === next.exportSession &&
    prev.testSound === next.testSound &&
    prev.clientNameRef === next.clientNameRef &&
    prev.coachNameRef === next.coachNameRef &&
    prev.topicRef === next.topicRef &&
    prev.notesRef === next.notesRef
    // mmss and remaining intentionally excluded — updated via DOM ref
  );
});
