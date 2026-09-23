import { useState } from "react";
import {
  AlertCircle, ArrowRight, Brain, ChevronRight, Compass, Eye,
  HelpCircle, Lightbulb, Rocket, Sparkles, Target, TrendingUp,
} from "lucide-react";
import { SectionHead } from "./_shared";

const SCORE_STEPS = [
  {
    id: "S",
    letter: "S",
    label: "СИМПТОМЫ",
    subtitle: "Что у вас сейчас?",
    time: "2 мин",
    icon: AlertCircle,
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    labelColor: "text-rose-700 dark:text-rose-400",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-500",
    blocks: [
      {
        head: "ТЕКУЩАЯ СИТУАЦИЯ",
        icon: AlertCircle,
        tone: "from-rose-500 to-pink-500",
        questions: [
          "Что у вас сейчас?",
          "Что вы хотите изменить?",
          "Что вас беспокоит?",
          "Как вы описываете происходящее?",
        ],
      },
    ],
  },
  {
    id: "C",
    letter: "C",
    label: "РЕЗУЛЬТАТЫ",
    subtitle: "Чего вы хотите достичь?",
    time: "3 мин",
    icon: Target,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    blocks: [
      {
        head: "ЖЕЛАЕМЫЙ РЕЗУЛЬТАТ",
        icon: Target,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Что вы хотите получить в дальнейшем?",
          "В чём будет выражен ваш результат?",
          "Как вы поймёте, что достигли результата?",
        ],
      },
      {
        head: "ИНСТРУМЕНТЫ ПРОЯСНЕНИЯ ЦЕЛИ",
        icon: Compass,
        tone: "from-teal-500 to-cyan-500",
        questions: [
          "Визуализация — представьте результат достигнутым",
          "Диссоциация — взгляд со стороны",
          "Экология — как это повлияет на окружение?",
          "Вторичные выгоды — что полезного в том, что этого пока нет?",
        ],
      },
      {
        head: "ЦЕННОСТНЫЙ КОНТЕКСТ · НЛУ",
        icon: Sparkles,
        tone: "from-violet-500 to-indigo-500",
        questions: [
          "Почему важно это изменить?",
          "Какие ценности и убеждения стоят за этим?",
          "Какой смысл вы вкладываете в этот результат?",
        ],
      },
    ],
  },
  {
    id: "O",
    letter: "O",
    label: "ЭФФЕКТЫ",
    subtitle: "Что произойдёт после достижения цели?",
    time: "2 мин",
    icon: TrendingUp,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    blocks: [
      {
        head: "ДОЛГОСРОЧНЫЕ ПОСЛЕДСТВИЯ",
        icon: TrendingUp,
        tone: "from-amber-500 to-orange-500",
        questions: [
          "Что произойдёт после достижения вашей цели?",
          "Что вам даст это изменение?",
          "Как результаты отразятся на вашей жизни и окружении?",
          "Какие более далёкие последствия вы можете предположить?",
        ],
      },
    ],
  },
  {
    id: "R",
    letter: "R",
    label: "ПРИЧИНЫ",
    subtitle: "Что привело к текущей ситуации?",
    time: "2 мин",
    icon: Eye,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-500",
    blocks: [
      {
        head: "АНАЛИЗ ПРИЧИН",
        icon: Eye,
        tone: "from-sky-500 to-blue-500",
        questions: [
          "Когда это случилось первый раз?",
          "Что послужило причиной вашего сегодняшнего положения дел?",
          "Когда вы впервые подумали об этом?",
          "Что поддерживает эту ситуацию?",
        ],
      },
    ],
  },
  {
    id: "E",
    letter: "E",
    label: "РЕСУРСЫ",
    subtitle: "Что поможет вам измениться?",
    time: "3 мин",
    icon: Rocket,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    labelColor: "text-violet-700 dark:text-violet-400",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-500",
    blocks: [
      {
        head: "РЕСУРСЫ ДЛЯ ИЗМЕНЕНИЙ",
        icon: Rocket,
        tone: "from-violet-500 to-purple-500",
        questions: [
          "Что вам нужно для достижения цели?",
          "Что могло бы помочь перейти к быстрым изменениям?",
          "Чего вам не хватало для получения результата раньше?",
          "Какие ресурсы у вас уже есть?",
        ],
      },
    ],
  },
];

function QuestionCard({
  head, icon: Icon, tone, questions,
}: {
  head: string; icon: any; tone: string; questions: string[];
}) {
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-4 group hover:border-primary/40 transition-colors">
      <Icon size={140} className="absolute -right-6 -bottom-8 text-foreground/[0.04] pointer-events-none" strokeWidth={1.2} />
      <div className="relative flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tone} text-white grid place-items-center shadow-md shadow-primary/20 shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 leading-tight">{head}</div>
      </div>
      <ul className="relative space-y-1.5 text-sm">
        {questions.map((q, i) => (
          <li key={i} className="flex items-start gap-2">
            <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
            <span className="text-foreground/90">{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Score() {
  const [active, setActive] = useState("S");
  const step = SCORE_STEPS.find((s) => s.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Модель S.C.O.R.E."
        subtitle="Сбор информации при работе с клиентом · 12 минут"
      />

      {/* Step selector */}
      <div className="grid grid-cols-5 gap-1.5">
        {SCORE_STEPS.map((s) => {
          const act = active === s.id;
          const I = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <I size={20} className="mx-auto mb-1" />
              <div className="font-extrabold text-lg leading-none">{s.letter}</div>
              <div className={`text-[9px] leading-tight mt-0.5 ${act ? "opacity-90" : "text-muted-foreground"}`}>
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active step card */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${step.accent}`}>
        <step.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        {/* Header */}
        <div className="relative flex items-center gap-4 mb-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <span className="text-3xl font-extrabold">{step.letter}</span>
          </div>
          <div>
            <div className={`text-xs uppercase tracking-widest font-bold ${step.labelColor}`}>{step.label}</div>
            <div className="text-xl font-bold text-foreground mt-0.5">{step.subtitle}</div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold mt-1">
              ⏱ {step.time}
            </span>
          </div>
        </div>

        {/* Question blocks */}
        <div className="relative grid sm:grid-cols-2 gap-3">
          {step.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Full SCORE overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Все шаги S.C.O.R.E.</h3>
          <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">12 мин</span>
        </div>
        <div className="space-y-2">
          {SCORE_STEPS.map((s, i) => {
            const I = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  active === s.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border hover:border-primary/30 bg-secondary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradientFrom} ${s.gradientTo} text-white grid place-items-center shrink-0`}>
                  <span className="font-extrabold text-sm">{s.letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.subtitle}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-muted-foreground">{s.time}</span>
                  <ArrowRight size={14} className={active === s.id ? "text-primary" : "text-muted-foreground"} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Формат работы</div>
          <div className="text-sm font-medium">
            S.C.O.R.E. используется как экспресс-сбор информации при работе в парах по 12 минут. Каждый шаг — короткая остановка для прояснения ключевого аспекта ситуации клиента.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Score;
