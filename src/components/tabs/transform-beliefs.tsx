import { useEffect, useState } from "react";
import {
  Bug, ChevronRight, Eraser, HelpCircle, Plus, RefreshCw, Shield, Sparkles, Trash2,
} from "lucide-react";
import { SectionHead } from "./_shared";

const VIRUSES = [
  {
    t: "Безнадёжность",
    d: "«Это невозможно — цель недостижима в принципе.»",
    fix: "Найти исключения: где и у кого это всё-таки получалось?",
    tone: "from-slate-500 to-slate-700",
  },
  {
    t: "Беспомощность",
    d: "«Это возможно, но не для меня — я не смогу.»",
    fix: "Найти ресурсы: навыки, опыт, люди, время, поддержка.",
    tone: "from-amber-500 to-orange-600",
  },
  {
    t: "Никчёмность",
    d: "«Я не достоин этого — даже если получится, я не имею права.»",
    fix: "Построить видение будущего и вернуть ценность себе.",
    tone: "from-rose-500 to-red-600",
  },
];

const COMBOS = [
  { f: "1 + 2", r: "Страх", d: "Безнадёжность + беспомощность", tone: "border-amber-500/40 bg-amber-500/10 text-amber-700" },
  { f: "2 + 3", r: "Невроз", d: "Беспомощность + никчёмность", tone: "border-violet-500/40 bg-violet-500/10 text-violet-700" },
  { f: "1 + 3", r: "Депрессия", d: "Безнадёжность + никчёмность", tone: "border-rose-500/40 bg-rose-500/10 text-rose-700" },
];

const STEPS_8 = [
  "Выявить установку в речи клиента (слова-маркеры: всегда, никогда, невозможно, должен).",
  "Сформулировать убеждение одной фразой и получить согласие клиента.",
  "Определить источник: чей это голос и когда он появился.",
  "Проверить экологию: какую пользу приносила установка раньше.",
  "Найти исключения и контрпримеры из опыта клиента.",
  "Сформулировать новое поддерживающее убеждение.",
  "Проверить телом: как отзывается новая формулировка.",
  "Закрепить действием — конкретный шаг в течение 48 часов.",
];

const REPLACE = [
  { t: "Осознать", d: "Назвать ограничивающее убеждение точной формулировкой клиента." },
  { t: "Оспорить", d: "Найти факты и опыт, которые ему противоречат." },
  { t: "Переформулировать", d: "Создать новое убеждение — утвердительно и в настоящем времени." },
  { t: "Закрепить", d: "Действие + повторение новой формулировки 21 день." },
];

const MEM = [
  { t: "Определение МЕМ", d: "Найти чужеродную идею, которая живёт в клиенте как своя: «в нашей семье все так живут»." },
  { t: "Открепление", d: "Отделить МЕМ от себя: чей это голос, где он был усвоен, кому он служит." },
  { t: "Восстановление", d: "Вернуть собственное решение и наполнить освободившееся место своей ценностью." },
];

const PSYCHK_AREAS = [
  "Самооценка", "Отношения", "Деньги и изобилие", "Здоровье и тело",
  "Духовность", "Работа и карьера", "Горе и утраты", "Спорт и результативность",
];

type Smer = { id: string; sit: string; th: string; em: string; body: string; beh: string; at: number };
const SMER_KEY = "coach-space-smer-diary";

function TransformBeliefs() {
  const [virus, setVirus] = useState(0);
  const [rows, setRows] = useState<Smer[]>([]);
  const [draft, setDraft] = useState({ sit: "", th: "", em: "", body: "", beh: "" });
  const V = VIRUSES[virus];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SMER_KEY);
      if (raw) setRows(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (next: Smer[]) => {
    setRows(next);
    try { localStorage.setItem(SMER_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const add = () => {
    if (!draft.sit.trim() && !draft.th.trim()) return;
    persist([{ id: String(Date.now()), ...draft, at: Date.now() }, ...rows]);
    setDraft({ sit: "", th: "", em: "", body: "", beh: "" });
  };

  const FIELDS: { k: keyof typeof draft; label: string; ph: string }[] = [
    { k: "sit", label: "Ситуация", ph: "Что произошло — только факты" },
    { k: "th", label: "Мысли", ph: "Что я себе сказал(а)" },
    { k: "em", label: "Эмоции", ph: "Что я почувствовал(а), сила 0–10" },
    { k: "body", label: "Телесные реакции", ph: "Где и как отозвалось тело" },
    { k: "beh", label: "Поведенческая реакция", ph: "Что я сделал(а)" },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Работа с убеждениями" subtitle="Вирусы сознания · ABC · СМЭР · PSYCH-K" />

      {/* Вирусы сознания */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-rose-500/15 via-amber-500/10 to-primary/15 p-5">
        <Bug className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Ограничивающие убеждения — «вирусы сознания»</h3>
        <p className="mt-1 text-sm text-foreground/85">
          Три базовых вируса блокируют любое движение к цели. Их комбинации дают устойчивые состояния.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        {VIRUSES.map((v, i) => {
          const act = i === virus;
          return (
            <button
              key={v.t}
              onClick={() => setVirus(i)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${v.tone} text-white`}`}>
                <span className="text-sm font-black">{i + 1}</span>
              </div>
              <div className="text-sm font-bold leading-tight">{v.t}</div>
            </button>
          );
        })}
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-xs uppercase tracking-wide font-bold text-primary">{V.t}</div>
        <p className="text-base font-semibold mt-1 text-foreground">{V.d}</p>
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-2">
          <Shield size={16} className="text-emerald-600 mt-0.5 shrink-0" />
          <div className="text-sm text-foreground/90"><span className="font-medium">Что делать: </span>{V.fix}</div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Комбинации вирусов</div>
        <div className="grid sm:grid-cols-3 gap-3">
          {COMBOS.map((c) => (
            <div key={c.r} className={`p-4 rounded-xl border ${c.tone}`}>
              <div className="text-xs font-mono font-bold opacity-80">{c.f}</div>
              <div className="text-lg font-extrabold leading-tight">{c.r}</div>
              <div className="text-xs text-foreground/70 mt-1">{c.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABC */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold">Модель ABC (Аарон Бек)</h3>
        <p className="text-sm text-muted-foreground mt-1">Реакцию вызывает не событие, а убеждение о нём.</p>
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          {[
            { k: "A", t: "Активирующее событие", d: "Что произошло объективно, без интерпретаций.", tone: "from-blue-500 to-indigo-600" },
            { k: "B", t: "Убеждение", d: "Как клиент это истолковал — здесь живёт установка.", tone: "from-amber-500 to-orange-600" },
            { k: "C", t: "Последствия", d: "Поведение, эмоции и телесные реакции.", tone: "from-emerald-500 to-teal-600" },
          ].map((x) => (
            <div key={x.k} className="relative overflow-hidden p-4 rounded-2xl border border-border bg-secondary/50">
              <div className={`absolute -right-2 -bottom-6 text-[80px] font-black leading-none bg-gradient-to-br ${x.tone} bg-clip-text text-transparent opacity-20 select-none pointer-events-none`}>{x.k}</div>
              <div className="relative text-sm font-bold">{x.t}</div>
              <p className="relative text-sm text-foreground/85 mt-1">{x.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Дневник СМЭР */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><RefreshCw size={18} className="text-primary" /> Дневник СМЭР</h3>
        <p className="text-sm text-muted-foreground mt-1">Ситуация · Мысли · Эмоции · Тело · Поведение. Записи сохраняются на устройстве.</p>

        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          {FIELDS.map((f) => (
            <label key={f.k} className={`block ${f.k === "beh" ? "sm:col-span-2" : ""}`}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">{f.label}</span>
              <textarea
                rows={2}
                value={draft[f.k]}
                onChange={(e) => setDraft((d) => ({ ...d, [f.k]: e.target.value }))}
                placeholder={f.ph}
                className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm resize-y"
              />
            </label>
          ))}
        </div>
        <button
          onClick={add}
          className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Добавить запись
        </button>

        {rows.length > 0 && (
          <div className="mt-5 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">История записей · {rows.length}</div>
            {rows.map((r) => (
              <div key={r.id} className="p-3 rounded-xl bg-secondary/60">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs text-muted-foreground">{new Date(r.at).toLocaleString("ru-RU")}</div>
                  <button
                    onClick={() => persist(rows.filter((x) => x.id !== r.id))}
                    className="w-8 h-8 grid place-items-center rounded-lg text-muted-foreground hover:bg-muted shrink-0"
                    aria-label="Удалить запись"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <dl className="mt-1.5 space-y-1 text-sm">
                  {FIELDS.map((f) => r[f.k] ? (
                    <div key={f.k} className="flex gap-2">
                      <dt className="text-xs font-semibold text-primary shrink-0 w-24 pt-0.5">{f.label}</dt>
                      <dd className="text-foreground/90 min-w-0">{r[f.k]}</dd>
                    </div>
                  ) : null)}
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 8 шагов */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">8 шагов работы с установкой</div>
        <ol className="space-y-2">
          {STEPS_8.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="text-foreground/90 pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Замена убеждения */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Sparkles size={18} className="text-primary" /> Упражнение «Замена убеждения»</h3>
        <div className="grid sm:grid-cols-4 gap-2 mt-4">
          {REPLACE.map((s, i) => (
            <div key={s.t} className="p-3 rounded-2xl border border-primary/25 bg-primary/5">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center text-xs font-bold mb-2">{i + 1}</div>
              <div className="text-sm font-bold">{s.t}</div>
              <p className="text-xs text-foreground/80 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* МЕМ */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Eraser size={18} className="text-primary" /> Упражнение «Очистка» (МЕМ)</h3>
        <div className="mt-4 space-y-2">
          {MEM.map((m, i) => (
            <div key={m.t} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/60">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold">{m.t}</div>
                <p className="text-sm text-foreground/85 mt-0.5">{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PSYCH-K */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold">PSYCH-K (Сай-Кей)</h3>
        <p className="text-sm text-foreground/85 mt-1">
          Метод Роберта Уильямса: через мышечное тестирование и балансировку полушарий новое убеждение
          записывается на уровне подсознания за считанные минуты, минуя долгую работу с сопротивлением.
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {PSYCHK_AREAS.map((a, i) => (
            <div key={a} className="flex items-start gap-1.5 text-xs p-2 rounded-lg bg-secondary/50">
              <ChevronRight size={12} className="text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/90">{a}</span>
              <span className="sr-only">{i}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка коучу</div>
          <div className="text-sm font-medium text-foreground/90">
            Не спорьте с убеждением клиента — ищите вместе с ним исключения. Убеждение рассыпается от собственного опыта, а не от аргументов коуча.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformBeliefs;
