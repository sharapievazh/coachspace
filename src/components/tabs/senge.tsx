import { useState } from "react";
import {
  ArrowRight, BookOpen, Brain, ChevronRight, Compass,
  Flag, Globe, HelpCircle, Layers, MessageSquare,
  Network, Search, Star, Users,
} from "lucide-react";
import { SectionHead } from "./_shared";

const DISCIPLINES = [
  {
    id: "1",
    label: "ЛИЧНОЕ\nМАСТЕРСТВО",
    labelShort: "ЛИЧНОЕ",
    subtitle: "Непрерывный личностный рост и развитие",
    icon: Star,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-500",
    desc: "Организации обучаются только через обучающихся людей. Личное мастерство — способность непрерывно прояснять своё видение и объективно оценивать реальность.",
    blocks: [
      {
        head: "САМОСОЗНАНИЕ",
        icon: Search,
        tone: "from-amber-500 to-yellow-500",
        questions: [
          "Какова моя история? Как я оказался там, где нахожусь сейчас?",
          "Почему я выбрал именно эту профессию или роль?",
          "Что в моей жизни дало мне особое преимущество?",
        ],
      },
      {
        head: "ВИДЕНИЕ И ЦЕННОСТИ",
        icon: Compass,
        tone: "from-orange-500 to-amber-600",
        questions: [
          "Каковы мои ценности? Что для меня важнее всего?",
          "Что движет мной на самом деле?",
          "Как совместить профессиональные и личные аспекты жизни?",
        ],
      },
    ],
  },
  {
    id: "2",
    label: "ОБЩЕЕ\nВИДЕНИЕ",
    labelShort: "ВИДЕНИЕ",
    subtitle: "Единый образ желаемого будущего команды",
    icon: Flag,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    desc: "Общее видение создаёт связь людей с организацией. Это не лозунг сверху — это живая цель, которую люди хотят достичь вместе.",
    blocks: [
      {
        head: "НАМЕРЕНИЕ И ВИДЕНИЕ",
        icon: Flag,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Что ты любишь делать? Чем занимаешься с удовольствием?",
          "Как будет выглядеть ваш мир после достижения цели?",
          "Что уникального в том, что именно вы можете сделать?",
        ],
      },
      {
        head: "ОБЩАЯ ЦЕЛЬ И РОЛЬ",
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
    id: "3",
    label: "ГРУППОВОЕ\nОБУЧЕНИЕ",
    labelShort: "КОМАНДА",
    subtitle: "Команда умнее суммы её участников",
    icon: Users,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    desc: "Диалог — основной инструмент группового обучения. Команда исследует сложные вопросы вместе, приостанавливая суждения и защитные реакции.",
    blocks: [
      {
        head: "ДИАЛОГ В КОМАНДЕ",
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
    id: "4",
    label: "ИНТЕЛЛЕКТ.\nМОДЕЛИ",
    labelShort: "МОДЕЛИ",
    subtitle: "Глубинные убеждения, формирующие восприятие",
    icon: Brain,
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    labelColor: "text-rose-700 dark:text-rose-400",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    desc: "Интеллектуальные модели — внутренние образы мира, определяющие наши действия. Они часто неосознаны, но именно они мешают или помогают изменениям.",
    blocks: [
      {
        head: "ОСОЗНАНИЕ МОДЕЛЕЙ",
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
    id: "5",
    label: "СИСТЕМНОЕ\nМЫШЛЕНИЕ",
    labelShort: "СИСТЕМЫ",
    subtitle: "Пятая дисциплина — объединяющая все остальные",
    icon: Network,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    labelColor: "text-violet-700 dark:text-violet-400",
    gradientFrom: "from-violet-500",
    gradientTo: "to-indigo-600",
    desc: "Системное мышление — способность видеть взаимосвязи, а не только цепочки причин и следствий. Видеть процессы изменений, а не мгновенные снимки.",
    blocks: [
      {
        head: "ВИДЕНИЕ СИСТЕМЫ",
        icon: Globe,
        tone: "from-violet-500 to-indigo-600",
        questions: [
          "Какие элементы системы взаимодействуют в этой ситуации?",
          "Где находится точка наибольшего рычага для изменения?",
          "Что кажется очевидным решением, но в долгосрочной перспективе усугубит ситуацию?",
        ],
      },
      {
        head: "ГЛУБИННЫЕ ПРИЧИНЫ",
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

function Senge() {
  const [active, setActive] = useState("1");
  const disc = DISCIPLINES.find((d) => d.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Модель Сенге"
        subtitle="Обучающаяся организация · 5 дисциплин"
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-violet-500/10 to-sky-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Объединяющая дисциплина</div>
        <div className="font-bold text-base tracking-wide">
          Системное мышление · Пятая дисциплина
        </div>
        <div className="text-xs text-muted-foreground mt-1">Без неё остальные 4 остаются изолированными практиками</div>
      </div>

      {/* Discipline tabs */}
      <div className="grid grid-cols-5 gap-1">
        {DISCIPLINES.map((d) => {
          const act = active === d.id;
          const I = d.icon;
          return (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`p-2 rounded-xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <I size={16} className="mx-auto mb-1" />
              <div className="font-extrabold text-base leading-none">{d.id}</div>
              <div className={`text-[8px] leading-tight mt-0.5 ${act ? "opacity-90" : "text-muted-foreground"}`}>
                {d.labelShort}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active discipline */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${disc.accent}`}>
        <disc.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${disc.gradientFrom} ${disc.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <span className="text-3xl font-extrabold">{disc.id}</span>
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${disc.labelColor}`}>
              ДИСЦИПЛИНА {disc.id}
            </div>
            <div className="text-lg font-bold text-foreground mt-0.5">{disc.subtitle}</div>
          </div>
        </div>

        <p className="relative text-sm text-foreground/75 mb-4 leading-relaxed">{disc.desc}</p>

        <div className="relative grid sm:grid-cols-2 gap-3">
          {disc.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Все 5 дисциплин</h3>
        </div>
        <div className="space-y-2">
          {DISCIPLINES.map((d) => {
            const I = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setActive(d.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  active === d.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border hover:border-primary/30 bg-secondary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${d.gradientFrom} ${d.gradientTo} text-white grid place-items-center shrink-0`}>
                  <span className="font-extrabold text-sm">{d.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{d.labelShort}</div>
                  <div className="text-xs text-muted-foreground truncate">{d.subtitle}</div>
                </div>
                <ArrowRight size={14} className={active === d.id ? "text-primary" : "text-muted-foreground"} />
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
            Пятая дисциплина интегрирует все остальные. Без системного мышления личное мастерство и общее видение остаются изолированными практиками. Вместе они создают организацию, способную непрерывно обучаться и адаптироваться.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Senge;
