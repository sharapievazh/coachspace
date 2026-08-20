import { useState } from "react";
import {
  Scale, FileText, Heart, Lightbulb, FileCheck,
  Search, Users, Layers, Eye, Sparkles, CheckCircle,
  Edit, Rocket, Handshake, Gavel, PenTool, Compass,
  BarChart3, Star, ChevronRight, HelpCircle,
} from "lucide-react";
import { SectionHead } from "./_shared";

type Block = {
  title: string;
  icon: any;
  tone: string;
  questions: string[];
};

type Stage = {
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

const STAGES: Stage[] = [
  {
    id: "description",
    n: 1,
    short: "ОПИСАНИЕ",
    title: "ЭТАП 1 — ОПИСАНИЕ",
    icon: FileText,
    tone: "from-sky-500 to-blue-600",
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    desc: "Медиатор помогает прояснить, в чём стороны согласны, а в чём расходятся. Цель — найти зоны возможного сотрудничества.",
    blocks: [
      {
        title: "ПРОЯСНЕНИЕ СИТУАЦИИ",
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
        title: "УСТАНОВЛЕНИЕ КОНТАКТА",
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
    id: "motives",
    n: 2,
    short: "МОТИВЫ",
    title: "ЭТАП 2 — МОТИВЫ",
    icon: Heart,
    tone: "from-rose-500 to-pink-500",
    accent: "from-rose-500/15 to-rose-500/5 border-rose-500/30",
    desc: "За позицией всегда стоят потребности, интересы и ценности. Медиатор помогает перейти от позиций к глубинным интересам.",
    blocks: [
      {
        title: "ЗА ПОЗИЦИЕЙ",
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
        title: "ИНТЕРЕСЫ ДРУГОЙ СТОРОНЫ",
        icon: Eye,
        tone: "from-pink-500 to-rose-500",
        questions: [
          "Как вы думаете, что важно для другой стороны?",
          "Что, по-вашему, движет их позицией?",
          "Есть ли интересы, которые у вас общие?",
        ],
      },
    ],
  },
  {
    id: "options",
    n: 3,
    short: "ВАРИАНТЫ",
    title: "ЭТАП 3 — ВАРИАНТЫ",
    icon: Lightbulb,
    tone: "from-amber-500 to-yellow-500",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    desc: "Стороны генерируют варианты без немедленной оценки. Цель — решения с дополнительной ценностью для обеих сторон.",
    blocks: [
      {
        title: "ГЕНЕРАЦИЯ ВАРИАНТОВ",
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
        title: "ОЦЕНКА И ОТВЕТСТВЕННОСТЬ",
        icon: CheckCircle,
        tone: "from-orange-500 to-amber-500",
        questions: [
          "По каким критериям вы будете оценивать варианты?",
          "Какие последствия у каждого варианта для обеих сторон?",
          "Кто за что берёт ответственность?",
          "Как вы проверите, что решение работает?",
        ],
      },
    ],
  },
  {
    id: "agreement",
    n: 4,
    short: "СОГЛАШЕНИЕ",
    title: "ЭТАП 4 — СОГЛАШЕНИЕ",
    icon: FileCheck,
    tone: "from-emerald-500 to-teal-500",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    desc: "Нет правых и виноватых — только взаимные обязательства. Может быть устным или письменным.",
    blocks: [
      {
        title: "ФИКСАЦИЯ ДОГОВОРЁННОСТЕЙ",
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
        title: "НОВОЕ БУДУЩЕЕ",
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
  {
    title: "Председатель",
    desc: "Регулирует процедуру, не влияет на содержание",
    icon: Gavel,
    tone: "from-slate-500 to-slate-600",
  },
  {
    title: "Формулировщик",
    desc: "Расширяет информационную базу участников",
    icon: PenTool,
    tone: "from-sky-500 to-blue-600",
  },
  {
    title: "Подсказчик",
    desc: "Направляет процесс и координирует содержание",
    icon: Compass,
    tone: "from-violet-500 to-indigo-600",
  },
  {
    title: "Оценщик",
    desc: "Вскрывает нереалистичные ожидания сторон",
    icon: BarChart3,
    tone: "from-amber-500 to-orange-500",
  },
  {
    title: "Лидер",
    desc: "Вносит предложения по решению вопроса",
    icon: Star,
    tone: "from-emerald-500 to-teal-500",
  },
];

function Mediation() {
  const [active, setActive] = useState("description");
  const d = STAGES.find((x) => x.id === active)!;
  const I = d.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Медиация в коучинге" subtitle="Альтернативный способ разрешения конфликтов · 4 этапа" />

      {/* Баннер */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-blue-500/20 p-5">
        <Scale className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Описание → Мотивы → Варианты → Соглашение</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Медиатор не решает за стороны — он помогает им решить самим
        </p>
      </div>

      {/* Принципы медиации */}
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
          <span className="text-sm">🤝</span>
          <span>Добровольность</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
          <span className="text-sm">⚖️</span>
          <span>Нейтральность</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium">
          <span className="text-sm">🔒</span>
          <span>Конфиденциальность</span>
        </div>
      </div>

      {/* Селектор 4 этапов */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {STAGES.map((s) => {
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
                {s.short}
              </div>
              {act && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/90" />
              )}
            </button>
          );
        })}
      </div>

      {/* Активный этап */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${d.accent}`}>
        <I size={180} strokeWidth={1} className="absolute -right-6 -top-6 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${d.tone} text-white`}>
            <I size={28} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">Этап {d.n}</div>
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
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Все 4 этапа медиации</div>
        <div className="grid grid-cols-1 gap-2">
          {STAGES.map((s) => {
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
                <ChevronRight size={16} className={`shrink-0 ${act ? "text-primary-foreground/80" : "text-muted-foreground"}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Роли коуча в медиации */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Роли коуча в медиации</div>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border border-border bg-background ${idx === ROLES.length - 1 ? "col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.tone} text-white grid place-items-center shrink-0`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-foreground">{role.title}</div>
                    <div className="text-xs text-muted-foreground leading-snug">{role.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tip block */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Суть медиации</div>
          <div className="text-sm font-medium text-foreground/90">
            Медиатор не решает — он создаёт условия. Нейтральность, конфиденциальность и добровольность — три кита медиации. Результат: стороны сами приходят к взаимовыгодному соглашению, сохраняя отношения и контроль над решением.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mediation;
