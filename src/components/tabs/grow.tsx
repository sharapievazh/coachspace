import { useState } from "react";
import { Activity, AlertOctagon, Brain, Calendar, CheckCircle2, ChevronRight, Circle, ClipboardList, Coins, Compass, Flag, Heart, HelpCircle, Hourglass, Layers, Lightbulb, ListChecks, Mountain, Rocket, RotateCcw, Search, ShieldCheck, Sparkles, Star, Sun, Target, Telescope, ThumbsUp, Timer, TrendingUp, Zap } from "lucide-react";
import { GrowIcon } from "@/components/coach/CoachVisuals";
import { SectionHead } from "./_shared";

const BLOCK_ICON_MAP: Array<{ match: RegExp; icon: any; tone: string }> = [
  { match: /цель сессии/i,                 icon: Target,      tone: "from-emerald-500 to-teal-500" },
  { match: /долгосрочн/i,                  icon: Mountain,    tone: "from-emerald-600 to-green-500" },
  { match: /smart/i,                       icon: ListChecks,  tone: "from-lime-500 to-emerald-500" },
  { match: /колесо баланса/i,              icon: Circle,      tone: "from-amber-500 to-orange-500" },
  { match: /шкалирован/i,                  icon: TrendingUp,  tone: "from-cyan-500 to-sky-500" },
  { match: /идеальн/i,                     icon: Sun,         tone: "from-yellow-400 to-amber-500" },
  { match: /путешеств/i,                   icon: Telescope,   tone: "from-indigo-500 to-violet-500" },
  { match: /коучинговые вопросы/i,         icon: HelpCircle,  tone: "from-sky-500 to-blue-500" },
  { match: /что происходит/i,              icon: ClipboardList, tone: "from-blue-500 to-sky-500" },
  { match: /что уже работает/i,            icon: ThumbsUp,    tone: "from-emerald-500 to-sky-500" },
  { match: /что мешает/i,                  icon: AlertOctagon, tone: "from-rose-500 to-orange-500" },
  { match: /swot/i,                        icon: Layers,      tone: "from-indigo-500 to-blue-600" },
  { match: /5 почему/i,                    icon: HelpCircle,  tone: "from-violet-500 to-fuchsia-500" },
  { match: /линия времени/i,               icon: Hourglass,   tone: "from-sky-500 to-cyan-500" },
  { match: /ресурс/i,                      icon: Coins,       tone: "from-amber-500 to-yellow-500" },
  { match: /мозгов|штурм|генерац/i,        icon: Zap,         tone: "from-amber-500 to-orange-500" },
  { match: /дисне/i,                       icon: Sparkles,    tone: "from-pink-500 to-rose-500" },
  { match: /шляп/i,                        icon: Brain,       tone: "from-violet-500 to-indigo-500" },
  { match: /реверсивн/i,                   icon: RotateCcw,   tone: "from-fuchsia-500 to-purple-500" },
  { match: /а что ещё|ещe/i,               icon: Sparkles,    tone: "from-amber-500 to-orange-500" },
  { match: /план действ|smart-шаги/i,      icon: ListChecks,  tone: "from-violet-500 to-indigo-500" },
  { match: /90 дн/i,                       icon: Calendar,    tone: "from-violet-500 to-purple-500" },
  { match: /30.60.90/i,                    icon: Calendar,    tone: "from-indigo-500 to-violet-500" },
  { match: /accountab|ответствен/i,        icon: ShieldCheck, tone: "from-emerald-500 to-teal-500" },
  { match: /препятств/i,                   icon: AlertOctagon, tone: "from-rose-500 to-red-500" },
  { match: /план б/i,                      icon: Compass,     tone: "from-sky-500 to-indigo-500" },
];

function pickBlockIcon(head: string) {
  return BLOCK_ICON_MAP.find((m) => m.match.test(head)) ?? { icon: Sparkles, tone: "from-primary to-primary/60" };
}

const ITEM_BULLETS = [CheckCircle2, Zap, Star, ChevronRight, Sparkles];
function getItemIcon(i: number) { return ITEM_BULLETS[i % ITEM_BULLETS.length]; }

function BlockCard({ head, items }: { head: string; items: string[] }) {
  const meta = pickBlockIcon(head);
  const I = meta.icon;
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-4 group hover:border-primary/40 transition-colors">
      {/* glow watermark */}
      <I
        size={140}
        className={`absolute -right-6 -bottom-8 text-foreground/[0.04] pointer-events-none`}
        strokeWidth={1.2}
      />
      <div className="relative flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.tone} text-white grid place-items-center shadow-md shadow-primary/20`}>
          <I size={20} />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 leading-tight">{head}</div>
      </div>
      <ul className="relative space-y-1.5 text-sm">
        {items.map((it, j) => {
          const B = getItemIcon(j);
          return (
            <li key={j} className="flex items-start gap-2">
              <B size={14} className="text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/90">{it}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- GROW (Полная модель из материалов обучения) ---------- */
const GROW_STEPS = [
  {
    id: "G", label: "GOAL", title: "ЦЕЛЬ",
    subtitle: "Что вы хотите получить?",
    icon: Target, time: "10 мин",
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30 text-emerald-700",
    blocks: [
      {
        head: "ЦЕЛЬ СЕССИИ",
        items: [
          "Что хотите получить по итогам встречи?",
          "Какой результат будет идеальным?",
          "Что должно измениться?",
        ],
      },
      {
        head: "ЦЕЛЬ В ДОЛГОСРОЧНОЙ ПЕРСПЕКТИВЕ",
        items: ["Через 3 месяца", "Через 6 месяцев", "Через 1 год", "Через 5 лет"],
      },
      {
        head: "ИНСТРУМЕНТЫ · SMART",
        items: ["Specific", "Measurable", "Achievable", "Relevant", "Time-bound"],
      },
      {
        head: "КОЛЕСО БАЛАНСА",
        items: ["Семья", "Отношения", "Дети", "Карьера", "Финансы", "Здоровье", "Самореализация", "Отдых"],
      },
      {
        head: "ШКАЛИРОВАНИЕ",
        items: ["Где вы сейчас от 1 до 10?", "Где хотите быть?"],
      },
      {
        head: "ИДЕАЛЬНЫЙ ДЕНЬ",
        items: [
          "Представьте результат достигнутым",
          "Что изменилось?",
          "Что вы чувствуете?",
        ],
      },
      {
        head: "ПУТЕШЕСТВИЕ В БУДУЩЕЕ",
        items: ["Визуализация результата", "Образ успешного будущего"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Чего вы хотите?",
          "Что для вас важно?",
          "Как выглядит успех?",
          "Почему это важно сейчас?",
          "Что произойдёт после достижения цели?",
        ],
      },
    ],
  },
  {
    id: "R", label: "REALITY", title: "РЕАЛЬНОСТЬ",
    subtitle: "Где вы находитесь сейчас?",
    icon: Search, time: "15 мин",
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30 text-sky-700",
    blocks: [
      {
        head: "ЧТО ПРОИСХОДИТ СЕЙЧАС?",
        items: ["Факты", "События", "Результаты"],
      },
      {
        head: "ЧТО УЖЕ РАБОТАЕТ?",
        items: ["Успешный опыт", "Достижения", "Сильные стороны"],
      },
      {
        head: "ЧТО МЕШАЕТ?",
        items: ["Ограничения", "Страхи", "Убеждения", "Внешние факторы"],
      },
      {
        head: "ИНСТРУМЕНТЫ · SWOT-АНАЛИЗ",
        items: [
          "S — Сильные стороны",
          "W — Слабые стороны",
          "O — Возможности",
          "T — Угрозы",
        ],
      },
      {
        head: "МЕТОД 5 ПОЧЕМУ",
        items: ["Почему?", "Почему?", "Почему?", "Почему?", "Почему?"],
      },
      {
        head: "ЛИНИЯ ВРЕМЕНИ",
        items: ["Прошлое", "Настоящее", "Будущее"],
      },
      {
        head: "АНАЛИЗ РЕСУРСОВ",
        items: ["Деньги", "Время", "Энергия", "Связи", "Знания"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Где вы сейчас?",
          "Что уже сделано?",
          "Что помогает?",
          "Что препятствует?",
          "Какие ресурсы доступны?",
          "Что находится под вашим контролем?",
        ],
      },
    ],
  },
  {
    id: "O", label: "OPTIONS", title: "ВОЗМОЖНОСТИ",
    subtitle: "Какие варианты у вас есть?",
    icon: Lightbulb, time: "20 мин",
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30 text-amber-700",
    blocks: [
      {
        head: "ГЕНЕРАЦИЯ ВАРИАНТОВ · МОЗГОВОЙ ШТУРМ",
        items: [
          "Правила: не критиковать идеи",
          "Количество важнее качества",
        ],
      },
      {
        head: "МЕТОД ДИСНЕЯ",
        items: [
          "Мечтатель — что возможно?",
          "Реалист — как реализовать?",
          "Критик — какие риски?",
        ],
      },
      {
        head: "ШЕСТЬ ШЛЯП МЫШЛЕНИЯ",
        items: [
          "Белая — факты",
          "Красная — эмоции",
          "Чёрная — риски",
          "Жёлтая — плюсы",
          "Зелёная — креатив",
          "Синяя — управление процессом",
        ],
      },
      {
        head: "РЕВЕРСИВНОЕ МЫШЛЕНИЕ",
        items: ["Как гарантированно провалиться?", "Что нужно исключить?"],
      },
      {
        head: "А ЧТО ЕЩЁ?",
        items: ["Задаётся минимум 5–7 раз подряд"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Какие варианты вы видите?",
          "Что ещё возможно?",
          "Если бы не было ограничений?",
          "Что сделал бы ваш наставник?",
          "Какое решение кажется самым сильным?",
          "Что вы ещё не рассматривали?",
        ],
      },
    ],
  },
  {
    id: "W", label: "WILL / WAY FORWARD", title: "ДЕЙСТВИЕ",
    subtitle: "Что вы будете делать?",
    icon: Rocket, time: "15 мин",
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30 text-violet-700",
    blocks: [
      {
        head: "ПЛАН ДЕЙСТВИЙ · SMART-ШАГИ",
        items: ["Каждый шаг: конкретный, измеримый, реалистичный"],
      },
      {
        head: "ПЛАН 90 ДНЕЙ",
        items: ["Цель", "30 дней", "60 дней", "90 дней"],
      },
      {
        head: "ПЛАН 30–60–90",
        items: ["Что сделать за неделю", "За месяц", "За квартал"],
      },
      {
        head: "ACCOUNTABILITY · Ответственность",
        items: ["Кто поддержит?", "Кто проконтролирует?", "Как отслеживать прогресс?"],
      },
      {
        head: "АНАЛИЗ ПРЕПЯТСТВИЙ · Что может помешать?",
        items: ["Время", "Страх", "Лень", "Деньги", "Отсутствие поддержки"],
      },
      {
        head: "ПЛАН Б",
        items: ["Что будете делать, если возникнет препятствие?"],
      },
      {
        head: "КОУЧИНГОВЫЕ ВОПРОСЫ",
        items: [
          "Что конкретно сделаете?",
          "Когда?",
          "Где?",
          "С кем?",
          "Какой первый шаг?",
          "Что может помешать?",
          "Как преодолеете препятствия?",
          "Насколько готовы действовать от 1 до 10?",
        ],
      },
    ],
  },
];

const GROW_STRUCTURE = [
  { n: 1, code: "G — GOAL", time: "10 мин", text: "Формулируем цель встречи" },
  { n: 2, code: "R — REALITY", time: "15 мин", text: "Анализируем текущую ситуацию" },
  { n: 3, code: "O — OPTIONS", time: "20 мин", text: "Генерируем варианты решений" },
  { n: 4, code: "W — WILL", time: "15 мин", text: "Создаём план действий" },
];

const GROW_CLOSE = [
  { t: "ИНСАЙТЫ", d: "Что стало главным открытием? Что удивило?", icon: Lightbulb },
  { t: "РЕЗУЛЬТАТ", d: "Что берёте с собой?", icon: Sparkles },
  { t: "ОБЯЗАТЕЛЬСТВО", d: "Что сделаете в течение 24 часов?", icon: Target },
  { t: "МОТИВАЦИЯ", d: "Почему это важно для вас?", icon: Heart },
  { t: "УВЕРЕННОСТЬ", d: "Насколько уверены в успехе от 1 до 10?", icon: Activity },
  { t: "ДОМАШНЕЕ ЗАДАНИЕ", d: "Конкретное действие до следующей встречи.", icon: ClipboardList },
];

function Grow() {
  const [active, setActive] = useState("G");
  const step = GROW_STEPS.find((s) => s.id === active)!;
  void step.icon;
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Модель GROW" subtitle="Структура эффективной коуч-сессии (60 мин)" />

      {/* верхняя дублирующая панель убрана — структура встроена в каждую карточку шага */}


      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GROW_STEPS.map((s) => {
          const act = active === s.id;
          return (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`p-4 rounded-xl border text-left transition-all ${act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"}`}>
              <GrowIcon step={s.id as "G" | "R" | "O" | "W"} size={44} className="mb-2" />
              <div className="font-bold text-2xl">{s.id}</div>
              <div className={`text-xs ${act ? "opacity-90" : "text-muted-foreground"}`}>{s.label}</div>
            </button>
          );
        })}
      </div>

      <div className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${step.accent}`}>
        {/* giant decorative watermark */}
        <div className="absolute -right-10 -top-10 opacity-[0.07] pointer-events-none">
          <GrowIcon step={step.id as "G" | "R" | "O" | "W"} size={320} />
        </div>
        {/* sparkles */}
        <Sparkles className="absolute right-10 top-6 text-primary/30 animate-pulse" size={24} />
        <Star className="absolute right-32 top-20 text-amber-400/40 animate-pulse" size={16} />
        <Sparkles className="absolute right-20 bottom-10 text-primary/20 animate-pulse" size={18} />

        {(() => {
          const meta = GROW_STRUCTURE.find((g) => g.code.startsWith(step.id));
          return (
            <div className="relative flex items-stretch gap-4 flex-wrap sm:flex-nowrap">
              {/* Big G/R/O/W tile with time + phase label inside */}
              <div className="flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4 min-w-0 flex-1">
                <div className="w-20 h-20 rounded-2xl bg-background/60 grid place-items-center shrink-0">
                  <GrowIcon step={step.id as "G" | "R" | "O" | "W"} size={64} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">{step.label}</div>
                  <h3 className="text-[clamp(28px,8vw,56px)] font-extrabold text-foreground tracking-tight leading-none">{step.title}</h3>
                  {meta && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                        <Timer size={12} /> {meta.time}
                      </span>
                      <span className="text-sm font-semibold text-foreground/90 leading-tight">
                        {meta.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}



        <div className="relative mt-4 grid sm:grid-cols-2 gap-3">
          {step.blocks.map((b, i) => (
            <BlockCard key={i} head={b.head} items={b.items} />
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Flag size={18} className="text-primary"/> Завершение сессии</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {GROW_CLOSE.map((c, i) => {
            const I = c.icon;
            return (
              <div key={i} className="p-3 rounded-xl bg-secondary/60">
                <I size={18} className="text-primary mb-1"/>
                <div className="font-semibold text-xs">{c.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <Star size={20} className="text-primary mt-0.5"/>
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Финальный вопрос коуча</div>
          <div className="font-medium">Если бы вы начали действовать уже сегодня, что стало бы первым шагом?</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SWOT ---------- */

export default Grow;
