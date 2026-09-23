import { useState } from "react";
import { AlertTriangle, CheckCircle, ChevronRight, Grid2x2, HelpCircle, Search, XCircle, Star } from "lucide-react";
import { SectionHead } from "./_shared";

type Quadrant = {
  id: string;
  top: string;
  bottom: string;
  title: string;
  question: string;
  hint: string;
  icon: any;
  tone: string;
  accent: string;
  questions: string[];
};

const DECART_QUADRANTS: Quadrant[] = [
  {
    id: "Q1",
    top: "ЧТО БУДЕТ",
    bottom: "ПРОИЗОЙДЁТ",
    title: "Q1 — Выгоды",
    question: "Что будет, если это произойдёт?",
    hint: "Выгоды и позитивные последствия достижения цели",
    icon: CheckCircle,
    tone: "from-emerald-500 to-teal-600",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    questions: [
      "Что хорошего появится в моей жизни, если это произойдёт?",
      "Какие возможности откроются?",
      "Как это повлияет на мои отношения и окружение?",
      "Что станет доступно, чего сейчас нет?",
    ],
  },
  {
    id: "Q2",
    top: "ЧТО БУДЕТ",
    bottom: "НЕ ПРОИЗОЙДЁТ",
    title: "Q2 — Цена бездействия",
    question: "Что будет, если это НЕ произойдёт?",
    hint: "Цена бездействия — что теряется, если ничего не менять",
    icon: AlertTriangle,
    tone: "from-rose-500 to-pink-600",
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    questions: [
      "Что останется в моей жизни, если это так и не произойдёт?",
      "Какие проблемы сохранятся или усилятся?",
      "Что я потеряю, если откажусь от этого?",
      "Как через год выглядит ситуация без изменений?",
    ],
  },
  {
    id: "Q3",
    top: "ЧЕГО НЕ БУДЕТ",
    bottom: "ПРОИЗОЙДЁТ",
    title: "Q3 — Вторичные выгоды",
    question: "Чего НЕ будет, если это произойдёт?",
    hint: "Вторичные выгоды — что придётся отдать при достижении цели",
    icon: Search,
    tone: "from-amber-500 to-orange-600",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    questions: [
      "От чего мне придётся отказаться, если цель будет достигнута?",
      "Что я потеряю из того, что сейчас имею?",
      "Какие привычные паттерны или отношения изменятся?",
      "Чего в моей жизни больше не будет, если всё получится?",
    ],
  },
  {
    id: "Q4",
    top: "ЧЕГО НЕ БУДЕТ",
    bottom: "НЕ ПРОИЗОЙДЁТ",
    title: "Q4 — Защита от рисков",
    question: "Чего НЕ будет, если это НЕ произойдёт?",
    hint: "Что НЕ случится из нежелательного, если оставить всё как есть",
    icon: XCircle,
    tone: "from-violet-500 to-indigo-600",
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    questions: [
      "Каких рисков или неудобств я избегу, если ничего не изменю?",
      "Что меня защищает текущая ситуация?",
      "Какая «боль» не появится, если остаться там, где я есть?",
      "Что пугает в изменениях — и чего поэтому не будет, если их не делать?",
    ],
  },
];

const STEPS = [
  "Сформулировать цель одним предложением.",
  "Последовательно ответить на все 4 вопроса письменно.",
  "Уделить каждому квадрату 3–5 минут.",
  "Уделить особое внимание 3-му и 4-му квадратам — там скрыты вторичные выгоды.",
  "Принять взвешенное решение.",
];

function Decart() {
  const [active, setActive] = useState("Q1");
  const q = DECART_QUADRANTS.find((x) => x.id === active)!;
  const I = q.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Квадрат Декарта" subtitle="Проверка экологии решения · 4 вопроса · НЛП" />

      {/* Баннер */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-emerald-500/20 via-amber-500/10 to-violet-500/20 p-5">
        <Grid2x2 className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">4 угла одного решения</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Каждый квадрат открывает новый слой: выгоды, цену бездействия и скрытые вторичные выгоды.
        </p>
      </div>

      {/* Сетка 2×2 */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {DECART_QUADRANTS.map((item) => {
          const act = active === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`relative overflow-hidden p-3 sm:p-4 rounded-2xl border text-left transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${item.tone} text-white`}`}>
                <Icon size={18} />
              </div>
              <div className={`text-[11px] sm:text-xs font-bold leading-tight ${act ? "opacity-95" : "text-muted-foreground"}`}>
                {item.top}
              </div>
              <div className={`text-xs sm:text-sm font-bold leading-tight ${act ? "" : "text-foreground"}`}>
                {item.bottom}
              </div>
              {act && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>

      {/* Активный квадрант */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${q.accent}`}>
        <I size={180} strokeWidth={1} className="absolute -right-6 -top-6 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${q.tone} text-white`}>
            <I size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">{q.title}</div>
            <h3 className="text-lg sm:text-[clamp(22px,5vw,34px)] font-extrabold tracking-tight leading-tight">{q.question}</h3>
            <p className="text-sm text-muted-foreground mt-1">{q.hint}</p>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${q.tone} text-white grid place-items-center`}>
              <Star size={16} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Коучинговые вопросы</div>
          </div>
          <ul className="space-y-2">
            {q.questions.map((question, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/90">{question}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Как работать с техникой */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Как работать с техникой</div>
        <ol className="space-y-2">
          {STEPS.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-foreground/90 pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Tip block */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка</div>
          <div className="text-sm font-medium text-foreground/90">
            Квадрат Декарта вскрывает вторичные выгоды — скрытые причины, по которым человек не двигается к цели. 3-й и 4-й квадраты особенно ценны: именно там живут неосознанные страхи и сопротивление изменениям.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Decart;
