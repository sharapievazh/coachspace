import { useState } from "react";
import { AlertTriangle, Users, Eye, Megaphone, Scissors, Zap, Layers, Building, HelpCircle, ChevronRight, TrendingUp, ArrowRight } from "lucide-react";
import { SectionHead } from "./_shared";

type Step = {
  id: string;
  n: number;
  short: string;
  title: string;
  icon: any;
  tone: string;
  accent: string;
  desc: string;
  blockTitle: string;
  blockIcon: any;
  questions: string[];
};

const STEPS: Step[] = [
  {
    id: "urgency",
    n: 1,
    short: "СРОЧНОСТЬ",
    title: "ШАГ 1 — СРОЧНОСТЬ",
    icon: AlertTriangle,
    tone: "from-red-500 to-rose-600",
    accent: "from-red-500/15 to-red-500/5 border-red-500/30",
    desc: "Только ~20-25% участников чувствуют настоящую срочность. Без этого ощущения изменения не начнутся. Задача коуча — создать эмоциональную и рациональную готовность.",
    blockTitle: "ДИАГНОСТИКА СРОЧНОСТИ",
    blockIcon: AlertTriangle,
    questions: [
      "Что произойдёт, если мы ничего не изменим?",
      "Насколько остро сотрудники ощущают необходимость перемен?",
      "Какие угрозы и возможности заставляют действовать прямо сейчас?",
      "Что вас заставляет думать, что изменения неизбежны?",
    ],
  },
  {
    id: "coalition",
    n: 2,
    short: "КОАЛИЦИЯ",
    title: "ШАГ 2 — КОАЛИЦИЯ",
    icon: Users,
    tone: "from-orange-500 to-amber-600",
    accent: "from-orange-500/15 to-orange-500/5 border-orange-500/30",
    desc: "Уполномоченная коалиция реформаторов — 20–50% ключевых людей. Не просто сторонники, а лидеры с авторитетом, экспертизой и ресурсами.",
    blockTitle: "ФОРМИРОВАНИЕ КОАЛИЦИИ",
    blockIcon: Users,
    questions: [
      "Кто обладает достаточным авторитетом, чтобы поддержать изменения?",
      "Кого нужно привлечь, чтобы коалиция стала реальной силой?",
      "Что мотивирует каждого участника коалиции?",
      "Кто может стать ключевым союзником, а кто — противником?",
    ],
  },
  {
    id: "vision",
    n: 3,
    short: "ВИДЕНИЕ",
    title: "ШАГ 3 — ВИДЕНИЕ",
    icon: Eye,
    tone: "from-amber-500 to-yellow-500",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    desc: "Если образ желаемого будущего нельзя объяснить за 5 минут — оно слишком сложное.",
    blockTitle: "ВИДЕНИЕ БУДУЩЕГО",
    blockIcon: Eye,
    questions: [
      "Как выглядит организация после успешной трансформации?",
      "Что конкретно изменится в жизни каждого сотрудника?",
      "В чём уникальность этого будущего именно для вашей компании?",
      "Чем это видение вдохновляет лично вас?",
    ],
  },
  {
    id: "communication",
    n: 4,
    short: "ПРОПАГАНДА",
    title: "ШАГ 4 — ПРОПАГАНДА",
    icon: Megaphone,
    tone: "from-yellow-500 to-lime-500",
    accent: "from-yellow-500/15 to-yellow-500/5 border-yellow-500/30",
    desc: "Лидер изменений должен говорить о видении во всех коммуникациях.",
    blockTitle: "КОММУНИКАЦИЯ ИЗМЕНЕНИЙ",
    blockIcon: Megaphone,
    questions: [
      "Как вы сейчас доносите видение до команды?",
      "Что мешает людям услышать и принять это видение?",
      "Как вы действуете, когда кажется, что другие не слышат?",
      "Что вы сделаете завтра, чтобы усилить сигнал?",
    ],
  },
  {
    id: "action",
    n: 5,
    short: "ДЕЙСТВИЕ",
    title: "ШАГ 5 — ДЕЙСТВИЕ",
    icon: Scissors,
    tone: "from-lime-500 to-emerald-500",
    accent: "from-lime-500/15 to-lime-500/5 border-lime-500/30",
    desc: "25–30% вовлечённых — критический порог. Нужно убрать структурные, психологические и процессные барьеры.",
    blockTitle: "УСТРАНЕНИЕ БАРЬЕРОВ",
    blockIcon: Scissors,
    questions: [
      "Что конкретно мешает людям действовать по-новому?",
      "Какие структуры или процессы блокируют изменения?",
      "Кого нужно поддержать, чтобы они начали действовать смелее?",
      "Что в вашей власти устранить прямо сейчас?",
    ],
  },
  {
    id: "wins",
    n: 6,
    short: "ПОБЕДЫ",
    title: "ШАГ 6 — ПОБЕДЫ",
    icon: Zap,
    tone: "from-emerald-500 to-teal-500",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    desc: "Быстрые победы (quick wins) в первые 6–18 месяцев дают топливо и нейтрализуют скептиков.",
    blockTitle: "БЫСТРЫЕ ПОБЕДЫ",
    blockIcon: Zap,
    questions: [
      "Какие изменения уже принесли ощутимый результат?",
      "Кого стоит публично отметить за вклад в изменения?",
      "Что можно достичь в ближайшие 30/60/90 дней?",
      "Как вы будете праздновать и распространять истории успеха?",
    ],
  },
  {
    id: "consolidation",
    n: 7,
    short: "ЗАКРЕПЛЕНИЕ",
    title: "ШАГ 7 — ЗАКРЕПЛЕНИЕ",
    icon: Layers,
    tone: "from-teal-500 to-cyan-500",
    accent: "from-teal-500/15 to-teal-500/5 border-teal-500/30",
    desc: "Заменяем структуры, системы и политики, не соответствующие новому видению.",
    blockTitle: "РАСШИРЕНИЕ ТРАНСФОРМАЦИИ",
    blockIcon: Layers,
    questions: [
      "Что уже работает хорошо и может служить основой для следующего шага?",
      "Какие системы или правила нужно обновить для поддержки изменений?",
      "Кто из новых союзников может усилить и расширить трансформацию?",
      "Что мешает масштабированию изменений?",
    ],
  },
  {
    id: "culture",
    n: 8,
    short: "КУЛЬТУРА",
    title: "ШАГ 8 — КУЛЬТУРА",
    icon: Building,
    tone: "from-cyan-500 to-sky-500",
    accent: "from-cyan-500/15 to-cyan-500/5 border-cyan-500/30",
    desc: "Изменения закреплены только тогда, когда они стали \"так принято у нас\".",
    blockTitle: "УКОРЕНЕНИЕ В КУЛЬТУРЕ",
    blockIcon: Building,
    questions: [
      "Как новые способы работы стали частью ежедневной жизни?",
      "Что в корпоративной культуре поддерживает, а что тормозит изменения?",
      "Как нанимать людей, которые воплощают новые ценности?",
      "Что нужно, чтобы следующее поколение лидеров продолжило трансформацию?",
    ],
  },
];

function Kotter() {
  const [active, setActive] = useState("urgency");
  const step = STEPS.find((s) => s.id === active)!;
  const I = step.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="8 шагов управления изменениями" subtitle="Джон Коттер · Управление трансформацией организации" />

      {/* Баннер */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-red-500/20 p-5">
        <TrendingUp className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Ощущение срочности → Коалиция → Видение → Действие → Победы → Закрепление</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Последовательность критична — пропуск шага разрушает трансформацию
        </p>
      </div>

      {/* Селектор 8 шагов */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {STEPS.map((s) => {
          const act = active === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`relative overflow-hidden p-2 sm:p-3 rounded-2xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl mx-auto mb-1.5 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${s.tone} text-white`}`}>
                <Icon size={18} />
              </div>
              <div className={`text-[10px] sm:text-xs font-bold leading-tight ${act ? "opacity-95" : "text-muted-foreground"}`}>
                {s.n}
              </div>
              <div className={`text-[9px] sm:text-[11px] font-bold leading-tight ${act ? "" : "text-foreground"}`}>
                {s.short}
              </div>
              {act && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>

      {/* Активный шаг */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${step.accent}`}>
        <I size={180} strokeWidth={1} className="absolute -right-6 -top-6 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${step.tone} text-white`}>
            <I size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">Шаг {step.n}</div>
            <h3 className="text-lg sm:text-[clamp(22px,5vw,34px)] font-extrabold tracking-tight leading-tight">{step.title}</h3>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <p className="text-sm text-foreground/90 leading-relaxed">{step.desc}</p>
        </div>

        <div className="relative mt-3 bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.tone} text-white grid place-items-center`}>
              <step.blockIcon size={16} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">{step.blockTitle}</div>
          </div>
          <ul className="space-y-2">
            {step.questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                <span className="text-foreground/90">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Обзорный список */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Все 8 шагов модели Коттера</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {STEPS.map((s) => {
            const act = active === s.id;
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  act
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg grid place-items-center text-white shrink-0 ${act ? "bg-white/20" : `bg-gradient-to-br ${s.tone}`}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${act ? "" : "text-foreground"}`}>
                    {s.n}. {s.short}
                  </div>
                </div>
                <ArrowRight size={16} className={`shrink-0 ${act ? "text-primary-foreground/80" : "text-muted-foreground"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip block */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Почему порядок важен</div>
          <div className="text-sm font-medium text-foreground/90">
            70% трансформаций проваливается — чаще из-за пропуска первых шагов. Ощущение срочности и сильная коалиция — фундамент, без которого здание не строится.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kotter;
