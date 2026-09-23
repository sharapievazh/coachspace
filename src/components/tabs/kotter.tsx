import { useState } from "react";
import {
  AlertTriangle, ArrowRight, BarChart, Building, ChevronRight,
  Eye, Flag, HelpCircle, Layers, Megaphone, Scissors,
  Star, TrendingUp, Users, Zap,
} from "lucide-react";
import { SectionHead } from "./_shared";

const KOTTER_STEPS = [
  {
    num: "1",
    label: "СРОЧНОСТЬ",
    subtitle: "Ощущение острой необходимости перемен",
    icon: AlertTriangle,
    accent: "from-red-500/15 to-red-500/5 border-red-500/30",
    labelColor: "text-red-700 dark:text-red-400",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    desc: "Только ~20-25% участников чувствуют настоящую срочность. Без этого ощущения изменения не начнутся. Задача — создать эмоциональную и рациональную готовность к переменам.",
    blocks: [
      {
        head: "ДИАГНОСТИКА СРОЧНОСТИ",
        icon: AlertTriangle,
        tone: "from-red-500 to-rose-600",
        questions: [
          "Что произойдёт, если мы ничего не изменим?",
          "Насколько остро сотрудники ощущают необходимость перемен?",
          "Какие угрозы и возможности заставляют действовать прямо сейчас?",
          "Что заставляет думать, что изменения неизбежны?",
        ],
      },
    ],
  },
  {
    num: "2",
    label: "КОАЛИЦИЯ",
    subtitle: "Группа поддержки изменений — 20–50%",
    icon: Users,
    accent: "from-orange-500/15 to-orange-500/5 border-orange-500/30",
    labelColor: "text-orange-700 dark:text-orange-400",
    gradientFrom: "from-orange-500",
    gradientTo: "to-amber-600",
    desc: "Уполномоченная коалиция реформаторов — 20–50% ключевых людей. Не просто сторонники, а лидеры с авторитетом, экспертизой и ресурсами для проведения изменений.",
    blocks: [
      {
        head: "ФОРМИРОВАНИЕ КОАЛИЦИИ",
        icon: Users,
        tone: "from-orange-500 to-amber-600",
        questions: [
          "Кто обладает достаточным авторитетом, чтобы поддержать изменения?",
          "Кого нужно привлечь, чтобы коалиция стала реальной силой?",
          "Что мотивирует каждого участника коалиции?",
          "Кто станет ключевым союзником, а кто — противником?",
        ],
      },
    ],
  },
  {
    num: "3",
    label: "ВИДЕНИЕ",
    subtitle: "Создание общего видения — стратсессия",
    icon: Eye,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-500",
    desc: "Если образ желаемого будущего нельзя объяснить за 5 минут — оно слишком сложное. Видение даёт смысл и направление каждому шагу трансформации.",
    blocks: [
      {
        head: "ВИДЕНИЕ БУДУЩЕГО",
        icon: Eye,
        tone: "from-amber-500 to-yellow-500",
        questions: [
          "Как выглядит организация после успешной трансформации?",
          "Что конкретно изменится в жизни каждого сотрудника?",
          "В чём уникальность этого будущего именно для вашей компании?",
          "Чем это видение вдохновляет лично вас?",
        ],
      },
    ],
  },
  {
    num: "4",
    label: "ПРОПАГАНДА",
    subtitle: "Распространение видения по организации",
    icon: Megaphone,
    accent: "from-yellow-500/15 to-yellow-500/5 border-yellow-500/30",
    labelColor: "text-yellow-700 dark:text-yellow-500",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-lime-500",
    desc: "Лидер изменений должен говорить о видении во всех коммуникациях — совещания, письма, решения. Каждое действие должно быть согласовано с новым видением.",
    blocks: [
      {
        head: "КОММУНИКАЦИЯ ИЗМЕНЕНИЙ",
        icon: Megaphone,
        tone: "from-yellow-500 to-lime-500",
        questions: [
          "Как вы сейчас доносите видение до команды?",
          "Что мешает людям услышать и принять это видение?",
          "Как вы действуете, когда кажется, что другие не слышат?",
          "Что вы сделаете завтра, чтобы усилить сигнал?",
        ],
      },
    ],
  },
  {
    num: "5",
    label: "ДЕЙСТВИЕ",
    subtitle: "Реализация плана — устранение барьеров",
    icon: Scissors,
    accent: "from-lime-500/15 to-lime-500/5 border-lime-500/30",
    labelColor: "text-lime-700 dark:text-lime-400",
    gradientFrom: "from-lime-500",
    gradientTo: "to-emerald-500",
    desc: "25–30% вовлечённых — критический порог для запуска изменений. Нужно убрать структурные, психологические и процессные барьеры на пути первопроходцев.",
    blocks: [
      {
        head: "УСТРАНЕНИЕ БАРЬЕРОВ",
        icon: Scissors,
        tone: "from-lime-500 to-emerald-500",
        questions: [
          "Что конкретно мешает людям действовать по-новому?",
          "Какие структуры или процессы блокируют изменения?",
          "Кого нужно поддержать, чтобы они начали действовать смелее?",
          "Что в вашей власти устранить прямо сейчас?",
        ],
      },
    ],
  },
  {
    num: "6",
    label: "ПОБЕДЫ",
    subtitle: "«Быстрые победы» — видимые результаты",
    icon: Zap,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    desc: "Быстрые победы (quick wins) — видимые результаты в первые 6–18 месяцев. Они дают топливо для продолжения трансформации и нейтрализуют скептиков.",
    blocks: [
      {
        head: "БЫСТРЫЕ ПОБЕДЫ",
        icon: Zap,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Какие изменения уже принесли ощутимый результат?",
          "Кого стоит публично отметить за вклад в изменения?",
          "Что можно достичь в ближайшие 30 / 60 / 90 дней?",
          "Как вы будете распространять истории успеха?",
        ],
      },
    ],
  },
  {
    num: "7",
    label: "ЗАКРЕПЛЕНИЕ",
    subtitle: "Расширение преобразований",
    icon: Layers,
    accent: "from-teal-500/15 to-teal-500/5 border-teal-500/30",
    labelColor: "text-teal-700 dark:text-teal-400",
    gradientFrom: "from-teal-500",
    gradientTo: "to-cyan-500",
    desc: "Опираясь на доверие из быстрых побед — расширяем трансформацию. Заменяем структуры, системы и политики, не соответствующие новому видению.",
    blocks: [
      {
        head: "РАСШИРЕНИЕ ТРАНСФОРМАЦИИ",
        icon: Layers,
        tone: "from-teal-500 to-cyan-500",
        questions: [
          "Что уже работает хорошо и служит основой для следующего шага?",
          "Какие системы или правила нужно обновить для поддержки изменений?",
          "Кто из новых союзников может усилить трансформацию?",
          "Что мешает масштабированию изменений?",
        ],
      },
    ],
  },
  {
    num: "8",
    label: "КУЛЬТУРА",
    subtitle: "Новое поведение — в ДНК компании",
    icon: Building,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    desc: "Изменения закреплены только тогда, когда они стали «так принято у нас». Новые подходы должны войти в найм, обучение, оценку и продвижение людей.",
    blocks: [
      {
        head: "УКОРЕНЕНИЕ В КУЛЬТУРЕ",
        icon: Building,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Как новые способы работы стали частью ежедневной жизни?",
          "Что в корпоративной культуре поддерживает, а что тормозит изменения?",
          "Как нанимать людей, которые воплощают новые ценности?",
          "Что нужно, чтобы следующее поколение лидеров продолжило трансформацию?",
        ],
      },
    ],
  },
];

function QuestionCard({ head, icon: Icon, tone, questions }: {
  head: string; icon: any; tone: string; questions: string[];
}) {
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors">
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

function Kotter() {
  const [active, setActive] = useState("1");
  const step = KOTTER_STEPS.find((s) => s.num === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Модель Коттера"
        subtitle="8 шагов управления изменениями · Джон Коттер"
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500/20 via-amber-500/10 to-sky-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Ключевой принцип</div>
        <div className="font-bold text-base tracking-wide">
          Последовательность критична
        </div>
        <div className="text-xs text-muted-foreground mt-1">70% трансформаций проваливается из-за пропуска первых шагов</div>
      </div>

      {/* Step tabs — 4+4 grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {KOTTER_STEPS.map((s) => {
          const act = active === s.num;
          const I = s.icon;
          return (
            <button
              key={s.num}
              onClick={() => setActive(s.num)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <I size={16} className="mx-auto mb-1" />
              <div className="font-extrabold text-lg leading-none">{s.num}</div>
              <div className={`text-[8px] leading-tight mt-0.5 ${act ? "opacity-90" : "text-muted-foreground"}`}>
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active step */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${step.accent}`}>
        <step.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <span className="text-3xl font-extrabold">{step.num}</span>
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${step.labelColor}`}>{step.label}</div>
            <div className="text-lg font-bold text-foreground mt-0.5">{step.subtitle}</div>
          </div>
        </div>

        <p className="relative text-sm text-foreground/75 mb-4 leading-relaxed">{step.desc}</p>

        <div className="relative grid sm:grid-cols-2 gap-3">
          {step.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">8 шагов Коттера</h3>
        </div>
        <div className="space-y-2">
          {KOTTER_STEPS.map((s) => {
            const I = s.icon;
            return (
              <button
                key={s.num}
                onClick={() => setActive(s.num)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  active === s.num
                    ? "border-primary/50 bg-primary/10"
                    : "border-border hover:border-primary/30 bg-secondary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradientFrom} ${s.gradientTo} text-white grid place-items-center shrink-0`}>
                  <span className="font-extrabold text-sm">{s.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.subtitle}</div>
                </div>
                <ArrowRight size={14} className={active === s.num ? "text-primary" : "text-muted-foreground"} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Ключевая идея</div>
          <div className="text-sm font-medium">
            Коттер: последовательность критична. Ощущение срочности и сильная коалиция — фундамент, без которого здание трансформации не строится. Без первых шагов всё остальное разрушается.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kotter;
