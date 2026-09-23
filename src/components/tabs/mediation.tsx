import { useState } from "react";
import {
  ArrowRight, BarChart, CheckCircle, ChevronRight,
  Compass, Edit, Eye, FileCheck, FileText, Gavel,
  Heart, HelpCircle, Layers, Lightbulb, PenTool,
  Rocket, Scale, Search, Sparkles, Star, Users,
} from "lucide-react";
import { SectionHead } from "./_shared";

const STAGES = [
  {
    id: "1",
    label: "ОПИСАНИЕ",
    subtitle: "Прояснение проблемы и точек расхождения",
    icon: FileText,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    desc: "Медиатор помогает прояснить, в чём стороны согласны, а в чём расходятся. Цель — найти зоны возможного сотрудничества ещё до обсуждения решений.",
    blocks: [
      {
        head: "ПРОЯСНЕНИЕ СИТУАЦИИ",
        icon: Search,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Расскажите, как вы видите эту ситуацию — что произошло с вашей точки зрения?",
          "В чём вы согласны с другой стороной?",
          "Где именно ваши позиции расходятся?",
          "В чём вы готовы сотрудничать, несмотря на разногласия?",
        ],
      },
      {
        head: "УСТАНОВЛЕНИЕ КОНТАКТА",
        icon: Users,
        tone: "from-blue-500 to-indigo-600",
        questions: [
          "Что для вас важно в этом споре?",
          "Чего вы хотите достичь в результате нашего разговора?",
          "Что будет, если договориться не получится?",
        ],
      },
    ],
  },
  {
    id: "2",
    label: "МОТИВЫ",
    subtitle: "Работа с потребностями и скрытыми интересами",
    icon: Heart,
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    labelColor: "text-rose-700 dark:text-rose-400",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-500",
    desc: "За позицией («я хочу X») всегда стоят потребности, интересы и ценности. Медиатор помогает перейти от позиций к глубинным интересам обеих сторон.",
    blocks: [
      {
        head: "ЗА ПОЗИЦИЕЙ",
        icon: Layers,
        tone: "from-rose-500 to-pink-500",
        questions: [
          "Что для вас важнее всего в этой ситуации?",
          "Какие потребности не удовлетворены прямо сейчас?",
          "Что вы чувствуете в связи с этим конфликтом?",
          "Что произошло бы, если бы вы получили именно то, о чём просите?",
        ],
      },
      {
        head: "ИНТЕРЕСЫ ДРУГОЙ СТОРОНЫ",
        icon: Eye,
        tone: "from-pink-500 to-rose-600",
        questions: [
          "Как вы думаете, что важно для другой стороны?",
          "Что, по-вашему, движет их позицией?",
          "Есть ли интересы, которые у вас общие?",
        ],
      },
    ],
  },
  {
    id: "3",
    label: "ВАРИАНТЫ",
    subtitle: "Мозговой штурм и выработка решений",
    icon: Lightbulb,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-yellow-500",
    desc: "На этом этапе стороны генерируют варианты без немедленной оценки. Цель — найти решения, создающие дополнительную ценность для обеих сторон.",
    blocks: [
      {
        head: "ГЕНЕРАЦИЯ ВАРИАНТОВ",
        icon: Sparkles,
        tone: "from-amber-500 to-yellow-500",
        questions: [
          "Какие варианты решения вы видите?",
          "Что ещё не было предложено, но могло бы сработать?",
          "Если бы у вас была волшебная палочка — какое решение вы бы создали?",
          "Что можно сделать, чтобы обе стороны получили что-то ценное?",
        ],
      },
      {
        head: "ОЦЕНКА И ОТВЕТСТВЕННОСТЬ",
        icon: CheckCircle,
        tone: "from-orange-500 to-amber-600",
        questions: [
          "По каким критериям вы будете оценивать варианты?",
          "Какие последствия у каждого варианта — для обеих сторон?",
          "Кто за что берёт ответственность?",
          "Как вы проверите, что решение работает?",
        ],
      },
    ],
  },
  {
    id: "4",
    label: "СОГЛАШЕНИЕ",
    subtitle: "Заключение взаимной договорённости",
    icon: FileCheck,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    desc: "Соглашение составляется на понятном для обеих сторон языке. Нет правых и виноватых — только взаимные обязательства. Может быть устным или письменным.",
    blocks: [
      {
        head: "ФИКСАЦИЯ ДОГОВОРЁННОСТЕЙ",
        icon: Edit,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Что именно каждая сторона обязуется сделать?",
          "В какие сроки и как будет выполнено каждое обязательство?",
          "Как вы узнаете, что соглашение выполнено?",
          "Что произойдёт, если одна из сторон не выполнит обязательство?",
        ],
      },
      {
        head: "НОВОЕ БУДУЩЕЕ",
        icon: Rocket,
        tone: "from-teal-500 to-cyan-500",
        questions: [
          "Каким вы видите ваше взаимодействие после подписания соглашения?",
          "Что поможет сохранить и развивать достигнутую договорённость?",
          "Чему вас научил этот конфликт?",
        ],
      },
    ],
  },
];

const ROLES = [
  { label: "Председатель", sub: "регулирует процедуру, не влияет на содержание", icon: Gavel, color: "from-slate-500 to-slate-600" },
  { label: "Формулировщик", sub: "расширяет информационную базу участников", icon: PenTool, color: "from-sky-500 to-blue-600" },
  { label: "Подсказчик", sub: "направляет процесс и координирует содержание", icon: Compass, color: "from-violet-500 to-indigo-600" },
  { label: "Оценщик", sub: "вскрывает нереалистичные ожидания сторон", icon: BarChart, color: "from-amber-500 to-orange-500" },
  { label: "Лидер", sub: "вносит предложения по решению вопроса", icon: Star, color: "from-emerald-500 to-teal-500" },
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

function Mediation() {
  const [active, setActive] = useState("1");
  const stage = STAGES.find((s) => s.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Медиация в коучинге"
        subtitle="Альтернативный способ разрешения конфликтов · 4 этапа"
      />

      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-500/20 via-cyan-500/10 to-blue-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Задача медиатора</div>
        <div className="font-bold text-base">
          Описание → Мотивы → Варианты → Соглашение
        </div>
        <div className="text-xs text-muted-foreground mt-1">Медиатор не решает за стороны — он помогает им решить самим</div>
      </div>

      {/* Principles */}
      <div className="flex gap-2 flex-wrap">
        {["🤝 Добровольность", "⚖️ Нейтральность", "🔒 Конфиденциальность"].map((p) => (
          <span key={p} className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
            {p}
          </span>
        ))}
      </div>

      {/* Stage tabs */}
      <div className="grid grid-cols-4 gap-1.5">
        {STAGES.map((s) => {
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
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active stage */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${stage.accent}`}>
        <stage.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.gradientFrom} ${stage.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <span className="text-3xl font-extrabold">{stage.id}</span>
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${stage.labelColor}`}>ЭТАП {stage.id} · {stage.label}</div>
            <div className="text-lg font-bold text-foreground mt-0.5">{stage.subtitle}</div>
          </div>
        </div>

        <p className="relative text-sm text-foreground/75 mb-4 leading-relaxed">{stage.desc}</p>

        <div className="relative grid sm:grid-cols-2 gap-3">
          {stage.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Scale size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">4 этапа медиации</h3>
        </div>
        <div className="space-y-2">
          {STAGES.map((s) => {
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
                  <span className="font-extrabold text-sm">{s.id}</span>
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

      {/* Roles */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Роли коуча в медиации</h3>
        </div>
        <div className="space-y-2">
          {ROLES.map((r, i) => {
            const I = r.icon;
            return (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-secondary/30">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${r.color} text-white grid place-items-center shrink-0`}>
                  <I size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.label}</div>
                  <div className="text-xs text-muted-foreground">{r.sub}</div>
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
            Медиатор не решает — он создаёт условия. Нейтральность, конфиденциальность и добровольность — три кита медиации. Результат: стороны сами приходят к взаимовыгодному соглашению, сохраняя отношения и контроль над решением.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mediation;
