import { useState } from "react";
import { BookOpen, Star, Flag, Users, Brain, Network, Search, Compass, MessageSquare, Globe, Layers, ChevronRight, ArrowRight, HelpCircle } from "lucide-react";
import { SectionHead } from "./_shared";

type Block = {
  title: string;
  icon: any;
  tone: string;
  questions: string[];
};

type Discipline = {
  id: string;
  n: number;
  short: string;
  title: string;
  icon: any;
  tone: string;
  accent: string;
  desc: string;
  blocks: Block[];
};

const DISCIPLINES: Discipline[] = [
  {
    id: "mastery",
    n: 1,
    short: "ЛИЧНОЕ МАСТЕРСТВО",
    title: "ДИСЦИПЛИНА 1 — ЛИЧНОЕ МАСТЕРСТВО",
    icon: Star,
    tone: "from-amber-500 to-yellow-500",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    desc: "Организации обучаются только через обучающихся людей. Личное мастерство — способность непрерывно прояснять своё видение и объективно оценивать реальность.",
    blocks: [
      {
        title: "САМОСОЗНАНИЕ",
        icon: Search,
        tone: "from-amber-500 to-yellow-500",
        questions: [
          "Какова моя история? Как я оказался там, где нахожусь сейчас?",
          "Почему я выбрал именно эту профессию или роль?",
          "Что в моей жизни дало мне особое преимущество?",
        ],
      },
      {
        title: "ВИДЕНИЕ И ЦЕННОСТИ",
        icon: Compass,
        tone: "from-orange-500 to-amber-500",
        questions: [
          "Каковы мои ценности? Что для меня важнее всего?",
          "Что движет мной на самом деле?",
          "Как совместить профессиональные и личные аспекты жизни?",
        ],
      },
    ],
  },
  {
    id: "vision",
    n: 2,
    short: "ОБЩЕЕ ВИДЕНИЕ",
    title: "ДИСЦИПЛИНА 2 — ОБЩЕЕ ВИДЕНИЕ",
    icon: Flag,
    tone: "from-sky-500 to-blue-600",
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    desc: "Общее видение создаёт связь людей с организацией. Это не лозунг сверху — живая цель, которую люди хотят достичь вместе.",
    blocks: [
      {
        title: "НАМЕРЕНИЕ И ВИДЕНИЕ",
        icon: Flag,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Что ты любишь делать? Чем занимаешься с удовольствием?",
          "Как будет выглядеть ваш мир после достижения цели?",
          "Что уникального в том, что именно вы можете сделать?",
        ],
      },
      {
        title: "ОБЩАЯ ЦЕЛЬ И РОЛЬ",
        icon: Star,
        tone: "from-blue-500 to-indigo-600",
        questions: [
          "Что конкретно вы добьётесь вместе?",
          "Кто я в этом будущем? Какова моя роль?",
          "Что мы создадим такого, чего не существовало раньше?",
        ],
      },
    ],
  },
  {
    id: "learning",
    n: 3,
    short: "ГРУППОВОЕ ОБУЧЕНИЕ",
    title: "ДИСЦИПЛИНА 3 — ГРУППОВОЕ ОБУЧЕНИЕ",
    icon: Users,
    tone: "from-emerald-500 to-teal-500",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    desc: "Диалог — основной инструмент группового обучения. Команда исследует сложные вопросы вместе, приостанавливая суждения.",
    blocks: [
      {
        title: "ДИАЛОГ В КОМАНДЕ",
        icon: MessageSquare,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Кто те люди, которые меня поддерживают и вдохновляют?",
          "Как мы принимаем решения, когда у нас разные точки зрения?",
          "Когда команда работала лучше всего — что этому способствовало?",
          "Как мы создаём безопасное пространство для честного разговора?",
        ],
      },
    ],
  },
  {
    id: "models",
    n: 4,
    short: "МЕНТАЛЬНЫЕ МОДЕЛИ",
    title: "ДИСЦИПЛИНА 4 — ИНТЕЛЛЕКТУАЛЬНЫЕ МОДЕЛИ",
    icon: Brain,
    tone: "from-rose-500 to-pink-600",
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    desc: "Внутренние образы мира, определяющие наши действия. Часто неосознаны, но именно они мешают или помогают изменениям.",
    blocks: [
      {
        title: "ОСОЗНАНИЕ МОДЕЛЕЙ",
        icon: Brain,
        tone: "from-rose-500 to-pink-600",
        questions: [
          "Какие убеждения управляют моими решениями прямо сейчас?",
          "Что я считаю «само собой разумеющимся» в этой ситуации?",
          "Как изменилось бы моё поведение, если бы я думал иначе?",
          "Какое убеждение мешает мне двигаться вперёд?",
        ],
      },
    ],
  },
  {
    id: "systems",
    n: 5,
    short: "СИСТЕМНОЕ МЫШЛЕНИЕ",
    title: "ДИСЦИПЛИНА 5 — СИСТЕМНОЕ МЫШЛЕНИЕ",
    icon: Network,
    tone: "from-violet-500 to-indigo-600",
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    desc: "Пятая и объединяющая дисциплина. Видеть взаимосвязи, а не цепочки причин и следствий.",
    blocks: [
      {
        title: "ВИДЕНИЕ СИСТЕМЫ",
        icon: Globe,
        tone: "from-violet-500 to-indigo-600",
        questions: [
          "Какие элементы системы взаимодействуют в этой ситуации?",
          "Где находится точка наибольшего рычага для изменения?",
          "Что кажется очевидным решением, но в долгосрочной перспективе усугубит ситуацию?",
        ],
      },
      {
        title: "ГЛУБИННЫЕ ПРИЧИНЫ",
        icon: Layers,
        tone: "from-indigo-500 to-blue-600",
        questions: [
          "Что на самом деле поддерживает эту проблему?",
          "Какие скрытые структуры создают повторяющиеся паттерны?",
          "Если устранить симптом — что произойдёт с системой?",
        ],
      },
    ],
  },
];

function Senge() {
  const [active, setActive] = useState("mastery");
  const d = DISCIPLINES.find((x) => x.id === active)!;
  const I = d.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Обучающаяся организация" subtitle="Питер Сенге · 5 дисциплин · Пятая дисциплина" />

      {/* Баннер */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-blue-500/20 p-5">
        <BookOpen className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">5 дисциплин · Личное мастерство → Системное мышление</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Системное мышление — пятая и объединяющая дисциплина
        </p>
      </div>

      {/* Селектор 5 дисциплин */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {DISCIPLINES.map((s) => {
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
              <div className={`text-[8px] sm:text-[10px] font-bold leading-tight ${act ? "" : "text-foreground"}`}>
                {s.short.split(" ").slice(0, 2).join(" ")}
              </div>
              {act && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>

      {/* Активная дисциплина */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${d.accent}`}>
        <I size={180} strokeWidth={1} className="absolute -right-6 -top-6 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${d.tone} text-white`}>
            <I size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">Дисциплина {d.n}</div>
            <h3 className="text-lg sm:text-[clamp(22px,5vw,34px)] font-extrabold tracking-tight leading-tight">{d.title}</h3>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <p className="text-sm text-foreground/90 leading-relaxed">{d.desc}</p>
        </div>

        {d.blocks.map((block, idx) => (
          <div key={idx} className="relative mt-3 bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${block.tone} text-white grid place-items-center`}>
                <block.icon size={16} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">{block.title}</div>
            </div>
            <ul className="space-y-2">
              {block.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Обзорный список */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Все 5 дисциплин Сенге</div>
        <div className="grid grid-cols-1 gap-2">
          {DISCIPLINES.map((s) => {
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
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Пятая дисциплина</div>
          <div className="text-sm font-medium text-foreground/90">
            Пятая дисциплина интегрирует все остальные. Без системного мышления личное мастерство и общее видение остаются изолированными практиками. Вместе они создают организацию, способную непрерывно обучаться.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Senge;
