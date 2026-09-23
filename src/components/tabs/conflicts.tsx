import { useState } from "react";
import {
  AlertOctagon, AlertTriangle, ArrowRight, BookOpen,
  CheckCircle, ChevronRight, Clock, Flame, HandMetal,
  HelpCircle, MessageSquare, RefreshCw, Scale, Shield, Zap,
} from "lucide-react";
import { SectionHead } from "./_shared";

const STRATEGIES = [
  {
    id: "1",
    label: "ПРЕДУПРЕЖДЕНИЕ",
    labelShort: "ПРЕДУПР.",
    subtitle: "Профилактика до возникновения конфликта",
    icon: Shield,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    desc: "Предупреждение работает через правила (контракт), арбитраж (авторитетная третья сторона — например, суд), или когда одна из сторон добровольно уступает в пользу другой.",
    blocks: [
      {
        head: "ПРОФИЛАКТИКА КОНФЛИКТА",
        icon: Shield,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Какие правила и договорённости есть между сторонами?",
          "Что можно сделать сейчас, чтобы конфликт не разгорелся?",
          "Готова ли одна из сторон уступить ради сохранения отношений?",
          "Нужен ли нейтральный арбитр — и кто им может стать?",
        ],
      },
    ],
  },
  {
    id: "2",
    label: "ПОДАВЛЕНИЕ",
    labelShort: "ПОДАВЛ.",
    subtitle: "Активные действия против другой стороны",
    icon: Zap,
    accent: "from-red-500/15 to-red-500/5 border-red-500/30",
    labelColor: "text-red-700 dark:text-red-400",
    gradientFrom: "from-red-500",
    gradientTo: "to-rose-600",
    desc: "Подавление — форсированное завершение конфликта через активные действия: увольнение, санкции, принуждение. Конфликт «закрыт», но предмет остался нетронутым.",
    blocks: [
      {
        head: "АНАЛИЗ ПОДАВЛЕНИЯ",
        icon: AlertTriangle,
        tone: "from-red-500 to-rose-600",
        questions: [
          "Что вы уже пробовали и к чему это привело?",
          "Какова цена этого способа для отношений и команды?",
          "Что будет, если действовать так и дальше?",
          "Какие последствия для вас лично несёт этот выбор?",
        ],
      },
    ],
  },
  {
    id: "3",
    label: "ОТСРОЧКА",
    labelShort: "ОТСРОЧКА",
    subtitle: "Устранение инцидента без устранения предмета",
    icon: Clock,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    desc: "Отсрочка — временное снятие напряжения без решения коренной причины. Инструменты: изменение отношения сторон, рефрейминг, демонстрация силы или апелляция к репутации.",
    blocks: [
      {
        head: "ИНСТРУМЕНТЫ ОТСРОЧКИ",
        icon: Clock,
        tone: "from-amber-500 to-orange-500",
        questions: [
          "Что можно изменить в отношениях сторон друг к другу?",
          "Предмет конфликта можно сделать менее значимым или недостижимым?",
          "Что нужно сторонам, чтобы «охладиться» и вернуться к диалогу?",
        ],
      },
      {
        head: "РЕФРЕЙМИНГ",
        icon: RefreshCw,
        tone: "from-orange-500 to-red-500",
        questions: [
          "Как иначе можно взглянуть на предмет конфликта?",
          "Что важнее — победить или сохранить отношения?",
          "Какие более выгодные варианты существуют вместо борьбы?",
        ],
      },
    ],
  },
  {
    id: "4",
    label: "УЛАЖИВАНИЕ",
    labelShort: "УЛАЖИВ.",
    subtitle: "Взаимные уступки и поиск соглашения",
    icon: Scale,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    desc: "Улаживание — поиск взаимовыгодного решения через уступки. Форматы: контрпредложение (пакетное соглашение), параллельное предложение (выход за рамки спора), компромисс.",
    blocks: [
      {
        head: "ФОРМАТЫ УЛАЖИВАНИЯ",
        icon: Scale,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Что вы готовы предложить взамен на уступку другой стороны?",
          "Есть ли возможность выйти за рамки спора и найти третий вариант?",
          "На какую частичную уступку вы готовы, если другая сторона сделает то же?",
        ],
      },
      {
        head: "ПЕРЕГОВОРНАЯ ПОЗИЦИЯ",
        icon: CheckCircle,
        tone: "from-teal-500 to-cyan-500",
        questions: [
          "Каков ваш лучший альтернативный вариант, если соглашения не будет?",
          "Что важно другой стороне — и как это использовать конструктивно?",
          "Какие интересы объединяют обе стороны?",
          "Что является «красной линией», которую нельзя пересекать?",
        ],
      },
    ],
  },
];

const TROUBLEMAKERS = [
  { label: "Агрессивные", sub: "танки, снайперы, взрывники", icon: Flame, color: "from-red-500 to-rose-600" },
  { label: "Жалобщики", sub: "постоянные обвинители", icon: MessageSquare, color: "from-orange-500 to-amber-500" },
  { label: "Нерешительные", sub: "избегают конфликта", icon: AlertOctagon, color: "from-amber-500 to-yellow-500" },
  { label: "Тревожные", sub: "личности, ищущие безопасности", icon: AlertTriangle, color: "from-sky-500 to-blue-500" },
  { label: "Всезнайки", sub: "экспертная позиция", icon: BookOpen, color: "from-violet-500 to-indigo-500" },
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

function Conflicts() {
  const [active, setActive] = useState("1");
  const strat = STRATEGIES.find((s) => s.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Коучинг в конфликтах"
        subtitle="Стратегии управления конфликтом · Брамсон"
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500/20 via-orange-500/10 to-amber-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Ключевое различие</div>
        <div className="font-bold text-base">
          Предмет конфликта ≠ Инцидент
        </div>
        <div className="text-xs text-muted-foreground mt-1">Инцидент — триггер. Предмет — истинная причина. Работа только с инцидентом даёт лишь отсрочку.</div>
      </div>

      {/* Strategy tabs */}
      <div className="grid grid-cols-4 gap-1.5">
        {STRATEGIES.map((s) => {
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
              <I size={16} className="mx-auto mb-1" />
              <div className="font-extrabold text-lg leading-none">{s.id}</div>
              <div className={`text-[8px] leading-tight mt-0.5 ${act ? "opacity-90" : "text-muted-foreground"}`}>
                {s.labelShort}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active strategy */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${strat.accent}`}>
        <strat.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${strat.gradientFrom} ${strat.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <strat.icon size={28} />
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${strat.labelColor}`}>{strat.label}</div>
            <div className="text-lg font-bold text-foreground mt-0.5">{strat.subtitle}</div>
          </div>
        </div>

        <p className="relative text-sm text-foreground/75 mb-4 leading-relaxed">{strat.desc}</p>

        <div className="relative grid sm:grid-cols-2 gap-3">
          {strat.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertOctagon size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">4 базовые стратегии</h3>
        </div>
        <div className="space-y-2">
          {STRATEGIES.map((s) => {
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
                  <I size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.subtitle}</div>
                </div>
                <ArrowRight size={14} className={active === s.id ? "text-primary" : "text-muted-foreground"} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Troublemakers */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <HandMetal size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">5 типов сложных собеседников</h3>
          <span className="ml-auto text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">по Брамсону</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {TROUBLEMAKERS.map((t, i) => {
            const I = t.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-secondary/30">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${t.color} text-white grid place-items-center shrink-0`}>
                  <I size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.label}</div>
                  <div className="text-xs text-muted-foreground">{t.sub}</div>
                </div>
              </div>
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
            Ключ к разрешению конфликта — разделить предмет (истинную причину) и инцидент (триггер). Работа только с инцидентом даёт временное облегчение. Настоящее разрешение — только через осознание и проработку предмета конфликта.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conflicts;
