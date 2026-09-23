import { useState } from "react";
import {
  ChevronRight, Grid2x2, HelpCircle, Lightbulb,
  Sparkles, XCircle, CheckCircle, Search, AlertTriangle,
} from "lucide-react";
import { SectionHead } from "./_shared";

const QUADRANTS = [
  {
    id: "pp",
    row: "ЧТО БУДЕТ",
    col: "ЕСЛИ ЭТО ПРОИЗОЙДЁТ",
    question: "Что будет, если это произойдёт?",
    shortQ: "Что будет, если ДА?",
    icon: CheckCircle,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    tone: "from-emerald-500 to-teal-500",
    hint: "Выгоды и позитивные последствия достижения цели",
    prompts: [
      "Что хорошего появится в моей жизни, если это произойдёт?",
      "Какие возможности откроются?",
      "Как это повлияет на мои отношения и окружение?",
      "Что станет доступно, чего сейчас нет?",
    ],
  },
  {
    id: "np",
    row: "ЧТО БУДЕТ",
    col: "ЕСЛИ ЭТО НЕ ПРОИЗОЙДЁТ",
    question: "Что будет, если это НЕ произойдёт?",
    shortQ: "Что будет, если НЕТ?",
    icon: AlertTriangle,
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    labelColor: "text-rose-700 dark:text-rose-400",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    tone: "from-rose-500 to-pink-600",
    hint: "Цена бездействия — что теряется, если ничего не менять",
    prompts: [
      "Что останется в моей жизни, если это так и не произойдёт?",
      "Какие проблемы сохранятся или усилятся?",
      "Что я потеряю, если откажусь от этого?",
      "Как через год будет выглядеть ситуация без изменений?",
    ],
  },
  {
    id: "pn",
    row: "ЧЕГО НЕ БУДЕТ",
    col: "ЕСЛИ ЭТО ПРОИЗОЙДЁТ",
    question: "Чего НЕ будет, если это произойдёт?",
    shortQ: "Чего НЕ будет при ДА?",
    icon: Search,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    tone: "from-amber-500 to-orange-500",
    hint: "Вторичные выгоды — что придётся отдать или потерять при достижении цели",
    prompts: [
      "От чего мне придётся отказаться, если цель будет достигнута?",
      "Что я потеряю из того, что сейчас имею?",
      "Какие привычные паттерны или отношения изменятся?",
      "Чего в моей жизни больше не будет, если всё получится?",
    ],
  },
  {
    id: "nn",
    row: "ЧЕГО НЕ БУДЕТ",
    col: "ЕСЛИ ЭТО НЕ ПРОИЗОЙДЁТ",
    question: "Чего НЕ будет, если это НЕ произойдёт?",
    shortQ: "Чего НЕ будет при НЕТ?",
    icon: XCircle,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    labelColor: "text-violet-700 dark:text-violet-400",
    gradientFrom: "from-violet-500",
    gradientTo: "to-indigo-600",
    tone: "from-violet-500 to-indigo-600",
    hint: "Что НЕ случится из нежелательного, если оставить всё как есть",
    prompts: [
      "Каких рисков или неудобств я избегу, если ничего не изменю?",
      "Что меня защищает текущая ситуация?",
      "Какая «боль» не появится, если остаться там, где я есть?",
      "Что пугает в изменениях — и чего поэтому не будет, если их не делать?",
    ],
  },
];

function QuadrantCard({ q, active, onClick }: {
  q: typeof QUADRANTS[0]; active: boolean; onClick: () => void;
}) {
  const I = q.icon;
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border text-left transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-lg"
          : "bg-card border-border hover:border-primary/40"
      }`}
    >
      <I size={18} className="mb-1" />
      <div className="text-[10px] font-bold uppercase leading-tight">{q.row}</div>
      <div className={`text-[9px] leading-tight mt-0.5 ${active ? "opacity-80" : "text-muted-foreground"}`}>
        {q.col}
      </div>
    </button>
  );
}

function Descartes() {
  const [active, setActive] = useState("pp");
  const q = QUADRANTS.find((x) => x.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Квадрат Декарта"
        subtitle="Проверка экологии решения · 4 вопроса · НЛП"
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-500/10 to-violet-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Принцип работы</div>
        <div className="font-bold text-base">
          4 угла одного решения
        </div>
        <div className="text-xs text-muted-foreground mt-1">Каждый квадрат открывает новый слой — выгоды, цену бездействия и скрытые вторичные выгоды</div>
      </div>

      {/* 2x2 grid selector */}
      <div className="grid grid-cols-2 gap-2">
        {QUADRANTS.map((quad) => (
          <QuadrantCard
            key={quad.id}
            q={quad}
            active={active === quad.id}
            onClick={() => setActive(quad.id)}
          />
        ))}
      </div>

      {/* Active quadrant detail */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${q.accent}`}>
        <q.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${q.gradientFrom} ${q.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <q.icon size={30} />
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${q.labelColor}`}>
              {q.shortQ}
            </div>
            <div className="text-lg font-bold text-foreground mt-0.5 leading-snug">{q.question}</div>
          </div>
        </div>

        <p className="relative text-sm text-foreground/70 mb-4 leading-relaxed italic">{q.hint}</p>

        <div className="relative bg-card rounded-2xl border border-border p-4">
          <q.icon size={130} className="absolute -right-4 -bottom-6 text-foreground/[0.04] pointer-events-none" strokeWidth={1.2} />
          <div className="relative flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${q.tone} text-white grid place-items-center shadow-md shrink-0`}>
              <Lightbulb size={20} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">ВОПРОСЫ ДЛЯ ИССЛЕДОВАНИЯ</div>
          </div>
          <ul className="relative space-y-2 text-sm">
            {q.prompts.map((p, i) => (
              <li key={i} className="flex items-start gap-2">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Visual 2x2 overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Grid2x2 size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Матрица Декарта</h3>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-[auto_1fr_1fr] gap-1 text-center text-[9px] font-bold uppercase tracking-wide text-muted-foreground mb-1">
          <div />
          <div className="py-1">ПРОИЗОЙДЁТ</div>
          <div className="py-1 text-rose-500 dark:text-rose-400">НЕ ПРОИЗОЙДЁТ</div>
        </div>

        <div className="grid grid-cols-[auto_1fr_1fr] gap-1">
          {/* Row labels */}
          <div className="grid grid-rows-2 gap-1 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
            <div className="flex items-center justify-center pr-1 py-3 text-center leading-tight">ЧТО БУДЕТ</div>
            <div className="flex items-center justify-center pr-1 py-3 text-center leading-tight text-rose-500 dark:text-rose-400">ЧЕГО НЕ БУДЕТ</div>
          </div>

          {/* Cells */}
          {QUADRANTS.map((quad) => {
            const I = quad.icon;
            const isActive = active === quad.id;
            return (
              <button
                key={quad.id}
                onClick={() => setActive(quad.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-primary/50 bg-primary/10"
                    : "border-border hover:border-primary/30 bg-secondary/30"
                }`}
              >
                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${quad.gradientFrom} ${quad.gradientTo} text-white grid place-items-center mb-1.5`}>
                  <I size={13} />
                </div>
                <div className="text-[9px] font-semibold leading-tight">{quad.shortQ}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* How to use */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Как работать с техникой</h3>
        </div>
        <div className="space-y-2 text-sm text-foreground/80">
          {[
            { n: "1", text: "Сформулируйте цель или решение в одном предложении" },
            { n: "2", text: "Последовательно ответьте на все 4 вопроса письменно" },
            { n: "3", text: "Не торопитесь — уделите каждому квадрату не менее 3–5 минут" },
            { n: "4", text: "Обратите особое внимание на 3-й и 4-й квадраты — там скрываются вторичные выгоды" },
            { n: "5", text: "После заполнения всех квадратов — примите взвешенное решение" },
          ].map((step) => (
            <div key={step.n} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/15 text-primary text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">
                {step.n}
              </div>
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Ключевая идея</div>
          <div className="text-sm font-medium">
            Квадрат Декарта вскрывает вторичные выгоды — скрытые причины, по которым человек не двигается к цели. 3-й и 4-й квадраты («чего НЕ будет») особенно ценны: именно там живут неосознанные страхи и сопротивление изменениям.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Descartes;
