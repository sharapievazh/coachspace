import React, { memo, useRef, useState, useCallback, MutableRefObject } from "react";
import { Bell, Download, Pause, Play, RotateCcw, Sparkles, FileText, BarChart2, Lightbulb, GitBranch, Plus, X, CheckSquare, Square } from "lucide-react";
import { OSVK_TEMPLATE } from "./_shared";

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

// ─── Scale 1-10 tool ────────────────────────────────────────────────────────
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
    setPendingColor(SCALE_COLORS[marks.length % SCALE_COLORS.length]);
  };

  const removeMark = (idx: number) => setMarks((prev) => prev.filter((_, i) => i !== idx));

  return (
    <div className="space-y-5">
      {/* Label input */}
      <div className="flex gap-2 items-center flex-wrap">
        <input
          value={pendingLabel}
          onChange={(e) => setPendingLabel(e.target.value)}
          placeholder="Название отметки (напр. «Сейчас», «Хочу»)"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="flex gap-1">
          {SCALE_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setPendingColor(c)}
              className="w-6 h-6 rounded-full border-2 transition-transform"
              style={{ backgroundColor: c, borderColor: pendingColor === c ? "#1e1e2e" : "transparent", transform: pendingColor === c ? "scale(1.2)" : "scale(1)" }}
            />
          ))}
        </div>
      </div>

      {/* Scale */}
      <div className="relative select-none">
        <div className="flex rounded-xl overflow-hidden border border-border">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const marksHere = marks.filter((m) => m.value === n);
            return (
              <button
                key={n}
                onMouseEnter={() => setHovered(n)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => addMark(n)}
                className="flex-1 flex flex-col items-center justify-end py-3 gap-1 transition-colors relative"
                style={{ background: hovered === n ? "var(--secondary)" : "var(--card)" }}
              >
                {marksHere.map((m, i) => (
                  <span key={i} title={m.label}
                    className="w-3 h-3 rounded-full block"
                    style={{ backgroundColor: m.color }} />
                ))}
                <span className="text-sm font-medium text-foreground">{n}</span>
              </button>
            );
          })}
        </div>
        {/* Gradient underline */}
        <div className="h-1 mt-1 rounded-full" style={{ background: "linear-gradient(to right, #ef4444, #f59e0b, #10b981)" }} />
      </div>

      {/* Legend */}
      {marks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {marks.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border border-border bg-secondary">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
              <span className="font-medium">{m.label}</span>
              <span className="text-muted-foreground">= {m.value}</span>
              <button onClick={() => removeMark(i)} className="ml-0.5 hover:text-destructive"><X size={10}/></button>
            </span>
          ))}
        </div>
      )}
      {marks.length === 0 && (
        <p className="text-xs text-muted-foreground text-center">Нажми на цифру — поставь отметку на шкале</p>
      )}
    </div>
  );
}

// ─── Insights tool ───────────────────────────────────────────────────────────
type Insight = { text: string; done: boolean };

function InsightsTool() {
  const [items, setItems] = useState<Insight[]>([]);
  const [input, setInput] = useState("");

  const add = () => {
    const t = input.trim();
    if (!t) return;
    setItems((prev) => [...prev, { text: t, done: false }]);
    setInput("");
  };

  const toggle = (i: number) => setItems((prev) => prev.map((x, idx) => idx === i ? { ...x, done: !x.done } : x));
  const remove = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Инсайт, ценностное слово, цитата клиента…"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button onClick={add}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90">
          <Plus size={14}/> Добавить
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4">Фиксируй инсайты и ценности клиента в реальном времени</p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-secondary group">
            <button onClick={() => toggle(i)} className="mt-0.5 shrink-0 text-primary">
              {item.done ? <CheckSquare size={16}/> : <Square size={16}/>}
            </button>
            <span className={`flex-1 text-sm ${item.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{item.text}</span>
            <button onClick={() => remove(i)} className="shrink-0 opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity">
              <X size={14}/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Mind map tool ───────────────────────────────────────────────────────────
type MindNode = { id: number; text: string; children: number[] };

function MindMapTool() {
  const [nodes, setNodes] = useState<MindNode[]>([{ id: 0, text: "Главная тема", children: [] }]);
  const [editing, setEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const nextId = useRef(1);

  const addChild = (parentId: number) => {
    const id = nextId.current++;
    setNodes((prev) => {
      const updated = prev.map((n) => n.id === parentId ? { ...n, children: [...n.children, id] } : n);
      return [...updated, { id, text: "Новая ветка", children: [] }];
    });
    setEditing(id);
    setEditText("Новая ветка");
  };

  const startEdit = (id: number, text: string) => { setEditing(id); setEditText(text); };
  const commitEdit = () => {
    if (editing === null) return;
    const t = editText.trim() || "…";
    setNodes((prev) => prev.map((n) => n.id === editing ? { ...n, text: t } : n));
    setEditing(null);
  };
  const removeNode = (id: number) => {
    if (id === 0) return;
    setNodes((prev) => prev
      .filter((n) => n.id !== id)
      .map((n) => ({ ...n, children: n.children.filter((c) => c !== id) }))
    );
  };

  const renderNode = (id: number, depth = 0): React.ReactNode => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return null;
    const isRoot = id === 0;
    return (
      <div key={id} className={`flex flex-col ${depth > 0 ? "ml-6 pl-4 border-l-2 border-border" : ""}`}>
        <div className={`group flex items-center gap-1.5 py-1`}>
          {editing === id ? (
            <input autoFocus value={editText} onChange={(e) => setEditText(e.target.value)}
              onBlur={commitEdit} onKeyDown={(e) => e.key === "Enter" && commitEdit()}
              className="px-2 py-0.5 rounded border border-primary bg-background text-sm focus:outline-none w-full max-w-xs" />
          ) : (
            <span
              onDoubleClick={() => startEdit(id, node.text)}
              className={`px-2.5 py-1 rounded-lg text-sm cursor-pointer select-none transition-colors hover:bg-secondary ${isRoot ? "bg-primary text-primary-foreground font-semibold" : "bg-secondary text-foreground"}`}
            >
              {node.text}
            </span>
          )}
          <button onClick={() => addChild(id)} title="Добавить ветку"
            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center w-5 h-5 rounded bg-muted hover:bg-primary hover:text-primary-foreground text-muted-foreground">
            <Plus size={11}/>
          </button>
          {!isRoot && (
            <button onClick={() => removeNode(id)} title="Удалить"
              className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center w-5 h-5 rounded hover:text-destructive text-muted-foreground">
              <X size={11}/>
            </button>
          )}
        </div>
        {node.children.map((cid) => renderNode(cid, depth + 1))}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">Двойной клик — редактировать · «+» — добавить ветку</p>
      <div className="rounded-xl border border-border bg-secondary/40 p-4 min-h-[200px] overflow-auto">
        {renderNode(0)}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
type Tab = "notes" | "scale" | "insights" | "mindmap";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "notes",    label: "Заметки",    icon: <FileText size={14}/> },
  { id: "scale",    label: "Шкала 1-10", icon: <BarChart2 size={14}/> },
  { id: "insights", label: "Инсайты",    icon: <Lightbulb size={14}/> },
  { id: "mindmap",  label: "Майнд-мап",  icon: <GitBranch size={14}/> },
];

function SessionPanel(p: Props) {
  const notesElRef = useRef<HTMLTextAreaElement | null>(null);
  const [minutesInput, setMinutesInput] = useState(() => String(Math.floor(p.duration / 60)));
  const [activeTab, setActiveTab] = useState<Tab>("notes");

  const appendOsvkTemplate = useCallback(() => {
    const el = notesElRef.current;
    if (!el) {
      p.notesRef.current = `${p.notesRef.current || ""}${OSVK_TEMPLATE}`;
      return;
    }
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
      {/* Compact timer bar */}
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
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="flex gap-2 items-center">
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
          </div>
          <input
            type="number" min="1" max="480" disabled={p.running}
            value={minutesInput}
            onChange={(e) => {
              setMinutesInput(e.target.value);
              const mins = parseInt(e.target.value, 10);
              if (!isNaN(mins) && mins > 0) p.setDuration(mins * 60);
            }}
            className="w-14 px-2 py-1 rounded-md border border-border bg-background text-center focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 text-xs"
          />
          <span className="text-xs text-muted-foreground">мин</span>
        </div>
      </div>

      {/* Workspace */}
      <section className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-border">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-5">
          {activeTab === "notes" && (
            <div className="space-y-3">
              <textarea ref={notesElRef} defaultValue={p.notesRef.current}
                onInput={(e) => { p.notesRef.current = e.currentTarget.value; }}
                rows={20}
                placeholder="Веди заметки прямо во время сессии — ценностные слова, цитаты, наблюдения…"
                inputMode="text"
                autoComplete="off" autoCorrect="off" spellCheck={false}
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

          {activeTab === "scale" && <ScaleTool />}
          {activeTab === "insights" && <InsightsTool />}
          {activeTab === "mindmap" && <MindMapTool />}
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
void Field;

export default memo(SessionPanel);
