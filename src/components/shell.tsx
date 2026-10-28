import { useEffect, useMemo, useRef, useState } from "react";
import {
  Home, Play, BookOpen, Wrench, NotebookPen, Search, ChevronRight, Gem, GraduationCap, Trash2, Plus, Lock, Pencil, Target, Moon, PieChart, MessageSquarePlus, BookA, Timer, Circle, MessageCircleQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export type ShellTab = { id: string; label: string; icon: any };
export type ModuleInfo = { n: number; title: string; desc: string; color: string; items: ShellTab[] };

export const NOTES_KEY = "coach-space-notes";
export const LAST_TAB_KEY = "coach-space-last-tab";
export const VISITED_KEY = "coach-space-visited";
const NAME_KEY = "coach-space-user-name";

export type Note = { id: string; text: string; date: number; kind: "session" | "personal" };

export function loadNotes(): Note[] {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]"); } catch { return []; }
}
function saveNotes(n: Note[]) { localStorage.setItem(NOTES_KEY, JSON.stringify(n)); }
export function loadVisited(): string[] {
  try { return JSON.parse(localStorage.getItem(VISITED_KEY) || "[]"); } catch { return []; }
}

const QUOTES = [
  "Клиент — эксперт в своей жизни. Коуч — партнёр в его поиске.",
  "Присутствие важнее техники: слушайте, чтобы понять, а не чтобы ответить.",
  "Сильный вопрос открывает возможности, которых клиент раньше не видел.",
  "Каждый человек творческий, ресурсный и целостный.",
  "Доверие и безопасность — основа любого изменения.",
  "Цель сессии рождается у клиента, а не у коуча.",
  "Любопытство коуча — лучший инструмент осознанности клиента.",
  "Маленький шаг, выбранный клиентом, может стать началом большого изменения.",
  "Пауза даёт пространство для новых смыслов.",
  "Осознанность начинается с честного внимания к себе.",
];

/* ---------------- Bottom tab bar (mobile) ---------------- */
export type Section = "home" | "session" | "modules" | "tools" | "notes";

export function BottomBar({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
  const items: { id: Section; label: string; icon: any }[] = [
    { id: "home", label: "Главная", icon: Home },
    { id: "modules", label: "Модули", icon: BookOpen },
    { id: "tools", label: "Инструменты", icon: Wrench },
    { id: "notes", label: "Заметки", icon: NotebookPen },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-card/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <Button variant="ghost" key={it.id} onClick={() => onSelect(it.id)} aria-current={on ? "page" : undefined} className={`h-auto rounded-none px-0 hover:bg-transparent flex flex-col items-center justify-center gap-0.5 py-2 min-h-14 [&_svg]:size-5 ${on ? "text-session" : "text-muted-foreground"}`}>
              <it.icon size={20} strokeWidth={on ? 2.4 : 1.8} />
              <span className={`text-[10px] ${on ? "font-semibold" : ""}`}>{it.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------------- Home ---------------- */
export function HomeScreen({
  modules, allTabs, onOpen, onSection, sessionPreview,
}: {
  modules: ModuleInfo[]; allTabs: ShellTab[]; onOpen: (id: string) => void; onSection: (s: Section) => void;
  sessionPreview: { client: string; topic: string; notes: string };
}) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [visited, setVisited] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(localStorage.getItem(NAME_KEY) || "");
    setNotes(loadNotes().slice(0, 3));
    setLastTab(localStorage.getItem(LAST_TAB_KEY));
    setVisited(loadVisited());
    setNow(new Date());
  }, []);

  const hour = now?.getHours() ?? 12;
  const greet = hour < 6 ? "Доброй ночи" : hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";
  const dateStr = now ? now.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" }) : "";
  const quote = QUOTES[(now ? Math.floor(now.getTime() / 86400000) : 0) % QUOTES.length];
  const last = allTabs.find((t) => t.id === lastTab);
  const lastModule = modules.find((m) => m.items.some((i) => i.id === lastTab));

  const saveName = () => {
    const v = (inputRef.current?.value || "").trim();
    localStorage.setItem(NAME_KEY, v);
    setName(v);
    setEditing(false);
  };

  const progress = lastModule?.items.length ? Math.round(lastModule.items.filter((item) => visited.includes(item.id)).length / lastModule.items.length * 100) : 0;

  const quick = [
    { label: "Провести сессию", icon: Play, cls: "bg-session text-session-foreground", act: () => onSection("session") },
    { label: "GROW", icon: Target, cls: "bg-card text-foreground border border-border", act: () => onOpen("grow") },
    { label: "Медитации", icon: Moon, cls: "bg-card text-foreground border border-border", act: () => onOpen("meditations") },
    { label: "Модули", icon: BookOpen, cls: "bg-card text-foreground border border-border", act: () => onSection("modules") },
    { label: "Тест", icon: GraduationCap, cls: "bg-card text-foreground border border-border", act: () => onOpen("quiz") },
    { label: "Колесо баланса", icon: PieChart, cls: "bg-card text-foreground border border-border", act: () => onOpen("balance") },
    { label: "Гамбургер", icon: MessageSquarePlus, cls: "bg-feedback-positive/10 text-foreground border border-feedback-positive/50", act: () => onOpen("hamburger") },
    { label: "Глоссарий", icon: BookA, cls: "bg-card text-foreground border border-border", act: () => onOpen("glossary") },
    { label: "Вопросы", icon: MessageCircleQuestion, cls: "bg-primary/10 text-foreground border border-primary/30", act: () => onOpen("questions") },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl p-5 bg-gradient-to-br from-primary/20 via-accent to-session/15 border border-border shadow-sm">
        <p className="text-xs text-muted-foreground capitalize">{dateStr}</p>
        {editing ? (
          <div className="flex gap-2 mt-2">
            <input ref={inputRef} defaultValue={name} placeholder="Ваше имя" className="flex-1 min-w-0 rounded-xl border border-border bg-background px-3 py-2 text-base" />
            <button onClick={saveName} className="px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium">OK</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="mt-1 flex items-center gap-2 text-left">
            <h2 className="text-[26px] font-semibold">{greet}{name ? `, ${name}!` : "!"}</h2>
            <Pencil size={14} className="text-muted-foreground shrink-0" />
          </button>
        )}
        <p className="mt-3 text-sm italic text-muted-foreground leading-relaxed">«{quote}»</p>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Быстрый доступ</h3>
        <div className="grid grid-cols-3 gap-3">
          {quick.map((q) => (
            <Button variant="ghost" key={q.label} onClick={q.act} className={`rounded-[16px] px-1.5 py-3 h-[94px] w-full gap-2 flex flex-col justify-center text-center whitespace-normal shadow-sm active:scale-[0.97] transition-transform motion-reduce:transition-none [&_svg]:size-5 ${q.cls}`}>
              <q.icon size={20} />
              <span className="text-[13px] leading-4 font-bold min-h-8 flex items-center justify-center">{q.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {(sessionPreview.client || sessionPreview.topic || sessionPreview.notes) && (
        <button onClick={() => onSection("session")} className="w-full text-left rounded-2xl border border-session/40 bg-session/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-session">Текущая сессия</p>
          <p className="mt-1 font-semibold">{sessionPreview.client || "Клиент"}{sessionPreview.topic ? ` · ${sessionPreview.topic}` : ""}</p>
          {sessionPreview.notes && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{sessionPreview.notes}</p>}
        </button>
      )}

      {last && (
        <Button variant="ghost" onClick={() => onOpen(last.id)} className="w-full h-auto whitespace-normal flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 p-4 text-left shadow-sm active:scale-[0.97] transition-transform motion-reduce:transition-none [&_svg]:size-5">
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><last.icon size={20} /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] text-muted-foreground">Продолжить{lastModule ? ` · Модуль ${lastModule.n} · ${progress}%` : ""}</span>
            {lastModule && <span className="block text-sm font-medium leading-snug mt-1">{lastModule.title}</span>}
            <span className="block text-sm text-foreground mt-1">{last.label}</span>
            {lastModule && <span role="progressbar" aria-label="Просмотренные темы модуля" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} className="block mt-3 h-1.5 rounded-full bg-primary/15 overflow-hidden"><span className="block h-full bg-primary rounded-full" style={{ width: `${progress}%` }} /></span>}
          </span>
          <ChevronRight size={20} className="text-muted-foreground" />
        </Button>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">Последние заметки</h3>
          <button onClick={() => onSection("notes")} className="text-xs text-primary font-medium">Все</button>
        </div>
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground rounded-2xl bg-muted p-4">Ваши заметки появятся здесь</p>
        ) : (
          <div className="space-y-2">
            {notes.map((n) => (
              <button key={n.id} onClick={() => onSection("notes")} className="w-full text-left rounded-2xl border border-border bg-card p-3 shadow-sm">
                <p className="text-[11px] text-muted-foreground">{new Date(n.date).toLocaleDateString("ru-RU")} · {n.kind === "session" ? "Сессия" : "Личное"}</p>
                <p className="text-sm line-clamp-2">{n.text}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Modules ---------------- */
export function ModulesScreen({ modules, onOpen, expanded, onExpanded }: { modules: ModuleInfo[]; onOpen: (id: string) => void; expanded: number | null; onExpanded: (n: number | null) => void }) {
  const [q, setQ] = useState("");
  const open = expanded;
  const setOpen = onExpanded;
  const [visited, setVisited] = useState<string[]>([]);
  useEffect(() => setVisited(loadVisited()), []);
  const query = q.trim().toLowerCase();
  const list = useMemo(() => modules.map((m) => ({
    ...m,
    shown: query ? m.items.filter((i) => i.label.toLowerCase().includes(query) || m.title.toLowerCase().includes(query)) : m.items,
  })).filter((m) => !query || m.shown.length > 0), [modules, query]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Модули</h2>
        <p className="text-sm text-muted-foreground">Программа обучения коучингу</p>
      </div>
      <label className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5">
        <Search size={16} className="text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск по темам" className="flex-1 bg-transparent outline-none text-base" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((m) => {
          const done = m.items.filter((i) => visited.includes(i.id)).length;
          const pct = m.items.length ? Math.round((done / m.items.length) * 100) : 0;
          const isOpen = open === m.n || !!query;
          const locked = m.items.length === 0;
          return (
            <div key={m.n} className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${locked ? "opacity-60" : ""}`}>
              <span className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: m.color }} />
              <button disabled={locked} onClick={() => setOpen(isOpen ? null : m.n)} className="w-full text-left p-4 pl-5">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold px-2 py-1 rounded-lg shrink-0" style={{ background: `color-mix(in oklab, ${m.color} 15%, transparent)`, color: m.color }}>{m.n}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{m.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                  <Circle size={14} aria-label="Прогресс модуля" className="text-muted-foreground/50 shrink-0 mt-0.5" />
                  {locked ? <Lock size={16} className="text-muted-foreground" /> : <ChevronRight size={20} className={`text-muted-foreground transition ${isOpen ? "rotate-90" : ""}`} />}
                </div>
                {!locked && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: m.color }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground tabular-nums">{done}/{m.items.length}</span>
                  </div>
                )}
              </button>
              {isOpen && !locked && (
                <div className="border-t border-border">
                  {m.shown.map((i) => (
                    <button key={i.id} onClick={() => onOpen(i.id)} className="w-full flex items-center gap-3 px-5 py-3 text-sm text-left hover:bg-secondary">
                      <i.icon size={20} style={{ color: m.color }} className="shrink-0" />
                      <span className="flex-1">{i.label}</span>
                      {visited.includes(i.id) && <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Tools ---------------- */
export function ToolsScreen({ featured, others, onOpen }: { featured: ShellTab[]; others: ShellTab[]; onOpen: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Инструменты</h2>
        <p className="text-sm text-muted-foreground">Быстрый доступ к рабочим инструментам коуча</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {featured.map((t) => (
          <button key={t.id} onClick={() => onOpen(t.id)} className="rounded-2xl border border-border bg-card p-4 min-h-24 flex flex-col justify-between items-start text-left shadow-sm active:scale-[0.97] transition">
            <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><t.icon size={20} /></span>
            <span className="text-sm font-semibold mt-2">{t.label}</span>
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">Другие инструменты</h3>
        <div className="rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden">
          {others.map((t) => (
            <button key={t.id} onClick={() => onOpen(t.id)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-secondary">
              <t.icon size={20} className="text-primary shrink-0" />
              <span className="flex-1">{t.label}</span>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Notes ---------------- */
export function NotesScreen({ getSessionText, onSession, timer }: { getSessionText: () => string; onSession: () => void; timer: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filter, setFilter] = useState<"all" | "session" | "personal">("all");
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => setNotes(loadNotes()), []);

  const add = (text: string, kind: Note["kind"]) => {
    if (!text.trim()) return;
    const next = [{ id: String(Date.now()), text: text.trim(), date: Date.now(), kind }, ...notes];
    setNotes(next); saveNotes(next);
  };
  const remove = (id: string) => { const next = notes.filter((n) => n.id !== id); setNotes(next); saveNotes(next); };
  const shown = notes.filter((n) => filter === "all" || n.kind === filter);
  const sessionText = getSessionText();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Заметки</h2>
        <p className="text-sm text-muted-foreground">Заметки сессий и личные записи</p>
      </div>
      <Button variant="outline" onClick={onSession} className="w-full h-auto py-4 justify-start gap-3 text-session whitespace-normal"><Timer /><span className="flex-1 text-left font-semibold">Таймер сессии</span><span className="font-mono tabular-nums">{timer}</span><ChevronRight /></Button>
      <div className="rounded-2xl border border-border bg-card p-3 shadow-sm space-y-2">
        <textarea ref={ref} rows={4} placeholder="Новая заметка…" className="w-full resize-none bg-transparent outline-none text-base leading-relaxed" />
        <div className="flex flex-wrap gap-2 justify-end">
          {sessionText && (
            <button onClick={() => add(sessionText, "session")} className="px-3 py-2 min-h-10 rounded-xl text-sm bg-session/10 text-session font-medium">
              Сохранить текущую сессию
            </button>
          )}
          <button onClick={() => { add(ref.current?.value || "", "personal"); if (ref.current) ref.current.value = ""; }} className="px-4 py-2 min-h-10 rounded-xl text-sm bg-primary text-primary-foreground font-medium flex items-center gap-1">
            <Plus size={16} /> Сохранить
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {([["all", "Все"], ["session", "Сессии"], ["personal", "Личные"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-full text-sm ${filter === k ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>{l}</button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Здесь пока пусто.</p>
      ) : (
        <div className="space-y-2">
          {shown.map((n) => (
            <div key={n.id} id={`note-${n.id}`} className="note-anchor rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] text-muted-foreground">{new Date(n.date).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} · {n.kind === "session" ? "Сессия" : "Личное"}</p>
                <button onClick={() => remove(n.id)} aria-label="Удалить" className="w-8 h-8 grid place-items-center rounded-lg text-muted-foreground hover:bg-secondary"><Trash2 size={15} /></button>
              </div>
              <p className="text-sm whitespace-pre-wrap mt-1">{n.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
