import { useState } from "react";
import { Activity, ChevronRight, Coins, Flag, History, Sparkles, Star, Target, Timer, Waves, Wrench } from "lucide-react";
import { SectionHead } from "./_shared";

type Step = {
  id: string;
  label: string;
  title: string;
  time: string;
  icon: any;
  accent: string;
  tone: string;
  questions: string[];
  tools?: { t: string; d: string }[];
};

const SCORE_STEPS: Step[] = [
  {
    id: "S", label: "SYMPTOMS", title: "СИМПТОМЫ", time: "2 мин",
    icon: Activity,
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    tone: "from-rose-500 to-red-600",
    questions: ["Что у вас сейчас?", "Что вы хотите изменить?", "Что вас беспокоит?"],
  },
  {
    id: "C", label: "CAUSES → РЕЗУЛЬТАТЫ", title: "РЕЗУЛЬТАТЫ", time: "3 мин",
    icon: Target,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    tone: "from-emerald-500 to-teal-600",
    questions: [
      "Что вы хотите получить в дальнейшем?",
      "В чём будет выражен ваш результат?",
      "Как вы поймёте, что достигли результата?",
    ],
    tools: [
      { t: "Визуализация, диссоциация", d: "Взгляд на ситуацию со стороны" },
      { t: "Экология", d: "Как это повлияет на окружение?" },
      { t: "Вторичные выгоды", d: "Что полезного в том, что этого пока нет?" },
      { t: "Ценности, убеждения, смыслы", d: "Почему важно это изменить?" },
    ],
  },
  {
    id: "O", label: "OUTCOMES", title: "ЭФФЕКТЫ", time: "2 мин",
    icon: Waves,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    tone: "from-sky-500 to-blue-600",
    questions: [
      "Что произойдёт после достижения вашей цели?",
      "Что вам даст это изменение?",
      "Как полученные результаты отразятся на вашей жизни и окружении?",
      "Какие более далёкие последствия вы можете предположить?",
    ],
  },
  {
    id: "R", label: "REASONS", title: "ПРИЧИНЫ", time: "2 мин",
    icon: History,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    tone: "from-amber-500 to-orange-600",
    questions: [
      "Когда это случилось первый раз?",
      "Что послужило причиной вашего сегодняшнего положения дел?",
      "Когда вы впервые подумали об этом?",
      "Что поддерживает эту ситуацию?",
    ],
  },
  {
    id: "E", label: "EFFECTS → РЕСУРСЫ", title: "РЕСУРСЫ", time: "3 мин",
    icon: Coins,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    tone: "from-violet-500 to-indigo-600",
    questions: [
      "Что вам нужно для достижения цели?",
      "Что могло бы помочь перейти к быстрым изменениям?",
      "Чего вам не хватало для получения результата раньше?",
      "Какие ресурсы у вас уже есть?",
    ],
  },
];

function Score() {
  const [active, setActive] = useState("S");
  const step = SCORE_STEPS.find((s) => s.id === active)!;
  const I = step.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Модель S.C.O.R.E." subtitle="Сбор информации при работе с клиентом · 12 минут" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-5">
        <Sparkles className="absolute right-6 top-4 text-primary/25" size={22} />
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SCORE_STEPS.map((s) => (
            <span key={s.id} className="px-3 py-1.5 rounded-xl bg-card border border-border font-extrabold text-lg">
              {s.id}
            </span>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Симптомы → Результаты → Эффекты → Причины → Ресурсы
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {SCORE_STEPS.map((s) => {
          const act = active === s.id;
          const Ic = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`p-3 rounded-xl border text-left transition-all ${act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"}`}
            >
              <div className={`w-9 h-9 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${s.tone} text-white`}`}>
                <Ic size={18} />
              </div>
              <div className="font-bold text-xl">{s.id}</div>
              <div className={`text-[11px] leading-tight ${act ? "opacity-90" : "text-muted-foreground"}`}>{s.title}</div>
            </button>
          );
        })}
      </div>

      <div className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${step.accent}`}>
        <I size={220} strokeWidth={1} className="absolute -right-8 -top-8 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-16 h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${step.tone} text-white`}>
            <I size={32} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">{step.label}</div>
            <h3 className="text-[clamp(24px,7vw,40px)] font-extrabold tracking-tight leading-none">{step.title}</h3>
            <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
              <Timer size={12} /> {step.time}
            </span>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.tone} text-white grid place-items-center`}>
              <Star size={16} />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Вопросы</div>
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

        {step.tools && (
          <div className="relative mt-3 bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.tone} text-white grid place-items-center`}>
                <Wrench size={16} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Инструменты</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {step.tools.map((t, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/60">
                  <div className="font-semibold text-xs">{t.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{t.d}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <Flag size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Как работать с моделью</div>
          <div className="text-sm font-medium">
            S.C.O.R.E. используется как экспресс-сбор информации при работе в парах по 12 минут. Каждый шаг — короткая
            остановка для прояснения ключевого аспекта ситуации клиента.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Score;
