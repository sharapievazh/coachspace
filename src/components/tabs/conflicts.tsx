import { useState } from "react";
import {
  AlertOctagon, Shield, Zap, Clock, Scale,
  Flame, MessageSquare, AlertTriangle, BookOpen,
  CheckCircle, RefreshCw, ChevronRight,
} from "lucide-react";
import { SectionHead } from "./_shared";

type Block = {
  title: string;
  icon: any;
  tone: string;
  questions: string[];
};

type Strategy = {
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

const STRATEGIES: Strategy[] = [
  {
    id: "prevention",
    n: 1,
    short: "ПРЕДУПРЕЖДЕНИЕ",
    title: "СТРАТЕГИЯ 1 — ПРЕДУПРЕЖДЕНИЕ",
    icon: Shield,
    tone: "from-sky-500 to-blue-600",
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    desc: "Предупреждение работает через правила (контракт), арбитраж (авторитетная третья сторона), или когда одна из сторон добровольно уступает в пользу другой.",
    blocks: [
      {
        title: "ПРОФИЛАКТИКА КОНФЛИКТА",
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
    id: "suppression",
    n: 2,
    short: "ПОДАВЛЕНИЕ",
    title: "СТРАТЕГИЯ 2 — ПОДАВЛЕНИЕ",
    icon: Zap,
    tone: "from-red-500 to-rose-600",
    accent: "from-red-500/15 to-red-500/5 border-red-500/30",
    desc: "Форсированное завершение конфликта: увольнение, санкции, принуждение. Конфликт \"закрыт\", но предмет остался нетронутым.",
    blocks: [
      {
        title: "АНАЛИЗ ПОДАВЛЕНИЯ",
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
    id: "postponement",
    n: 3,
    short: "ОТСРОЧКА",
    title: "СТРАТЕГИЯ 3 — ОТСРОЧКА",
    icon: Clock,
    tone: "from-amber-500 to-orange-500",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    desc: "Временное снятие напряжения без решения коренной причины. Инструменты: рефрейминг, изменение отношения сторон, апелляция к репутации.",
    blocks: [
      {
        title: "ИНСТРУМЕНТЫ ОТСРОЧКИ",
        icon: Clock,
        tone: "from-amber-500 to-orange-500",
        questions: [
          "Что можно изменить в отношениях сторон друг к другу?",
          "Предмет конфликта можно сделать менее значимым или недостижимым?",
          "Что нужно сторонам, чтобы «охладиться» и вернуться к диалогу?",
        ],
      },
      {
        title: "РЕФРЕЙМИНГ",
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
    id: "settlement",
    n: 4,
    short: "УЛАЖИВАНИЕ",
    title: "СТРАТЕГИЯ 4 — УЛАЖИВАНИЕ",
    icon: Scale,
    tone: "from-emerald-500 to-teal-500",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    desc: "Поиск взаимовыгодного решения через уступки: контрпредложение, параллельное предложение, компромисс.",
    blocks: [
      {
        title: "ФОРМАТЫ УЛАЖИВАНИЯ",
        icon: Scale,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Что вы готовы предложить взамен на уступку другой стороны?",
          "Есть ли возможность выйти за рамки спора и найти третий вариант?",
          "На какую частичную уступку вы готовы, если другая сторона сделает то же?",
        ],
      },
      {
        title: "ПЕРЕГОВОРНАЯ ПОЗИЦИЯ",
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

const DIFFICULT_TYPES = [
  {
    title: "Агрессивные",
    note: "танки, снайперы, взрывники",
    icon: Flame,
    tone: "from-red-500 to-rose-600",
  },
  {
    title: "Жалобщики",
    note: "постоянные обвинители",
    icon: MessageSquare,
    tone: "from-orange-500 to-amber-500",
  },
  {
    title: "Нерешительные",
    note: "избегают конфликта",
    icon: AlertOctagon,
    tone: "from-amber-500 to-yellow-500",
  },
  {
    title: "Тревожные личности",
    note: "ищут безопасности",
    icon: AlertTriangle,
    tone: "from-sky-500 to-blue-500",
  },
  {
    title: "Всезнайки",
    note: "экспертная позиция",
    icon: BookOpen,
    tone: "from-violet-500 to-indigo-500",
  },
];

function Conflicts() {
  const [active, setActive] = useState("prevention");
  const s = STRATEGIES.find((x) => x.id === active)!;
  const I = s.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Коучинг в разрешении конфликтов" subtitle="Конфликт = Предмет + Инцидент · Стратегии управления" />

      {/* Баннер */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-amber-500/20 p-5">
        <AlertOctagon className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Предмет конфликта ≠ Инцидент</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Инцидент — триггер. Предмет — истинная причина. Работа только с инцидентом даёт лишь отсрочку.
        </p>
      </div>

      {/* Селектор 4 стратегий */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {STRATEGIES.map((strat) => {
          const act = active === strat.id;
          const Icon = strat.icon;
          return (
            <button
              key={strat.id}
              onClick={() => setActive(strat.id)}
              className={`relative overflow-hidden p-2 sm:p-3 rounded-2xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl mx-auto mb-1.5 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${strat.tone} text-white`}`}>
                <Icon size={18} />
              </div>
              <div className={`text-[10px] sm:text-xs font-bold leading-tight ${act ? "opacity-95" : "text-muted-foreground"}`}>
                {strat.n}
              </div>
              <div className={`text-[8px] sm:text-[10px] font-bold leading-tight ${act ? "" : "text-foreground"}`}>
                {strat.short}
              </div>
              {act && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>

      {/* Активная стратегия */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${s.accent}`}>
        <I size={180} strokeWidth={1} className="absolute -right-6 -top-6 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${s.tone} text-white`}>
            <I size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">Стратегия {s.n}</div>
            <h3 className="text-lg sm:text-[clamp(22px,5vw,34px)] font-extrabold tracking-tight leading-tight">{s.title}</h3>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <p className="text-sm text-foreground/90 leading-relaxed">{s.desc}</p>
        </div>

        {s.blocks.map((block, idx) => (
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
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">4 стратегии разрешения конфликтов</div>
        <div className="grid grid-cols-1 gap-2">
          {STRATEGIES.map((strat) => {
            const act = active === strat.id;
            const Icon = strat.icon;
            return (
              <button
                key={strat.id}
                onClick={() => setActive(strat.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  act
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg grid place-items-center text-white shrink-0 ${act ? "bg-white/20" : `bg-gradient-to-br ${strat.tone}`}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${act ? "" : "text-foreground"}`}>
                    {strat.n}. {strat.short}
                  </div>
                </div>
                <ChevronRight size={16} className={`shrink-0 ${act ? "text-primary-foreground/80" : "text-muted-foreground"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 типов сложных собеседников по Брамсону */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">5 типов сложных собеседников по Брамсону</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DIFFICULT_TYPES.map((t, i) => {
            const Icon = t.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background">
                <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center bg-gradient-to-br ${t.tone} text-white`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{t.note}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip block */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <AlertOctagon size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Ключ к разрешению</div>
          <div className="text-sm font-medium text-foreground/90">
            Ключ к разрешению конфликта — разделить предмет (истинную причину) и инцидент (триггер). Работа только с инцидентом даёт временное облегчение. Настоящее разрешение — только через осознание и проработку предмета конфликта.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conflicts;
