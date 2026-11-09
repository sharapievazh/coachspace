import { useState } from "react";
import { Wand2, ChevronRight, Lightbulb, Layers, Feather, BookOpen, ArrowRight } from "lucide-react";
import { SectionHead } from "./_shared";

const SOURCES = [
  {
    title: "Заимствованные",
    icon: BookOpen,
    desc: "Готовые метафоры из культуры: «Стрельба из лука», «Капитан корабля», «Выпуск АА»",
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Из своего опыта",
    icon: Feather,
    desc: "Личные истории и примеры из жизни тренера или коуча — самые живые и убедительные",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Подсказаны клиентом",
    icon: Lightbulb,
    desc: "Клиент сам использует образ или слово — подхватываем и развиваем его метафору",
    color: "from-amber-500 to-yellow-500",
  },
  {
    title: "Конструируются",
    icon: Wand2,
    desc: "Создаются специально под запрос клиента на основе 6 шагов построения метафоры",
    color: "from-violet-500 to-indigo-600",
  },
];

const STRUCTURE = [
  { label: "НАЧАЛО", desc: "Введение в мир истории: герой, обстоятельства, стартовая ситуация" },
  { label: "КРИЗИСНЫЙ МОМЕНТ", desc: "Ключевое препятствие или поворотная точка — зеркало запроса клиента" },
  { label: "НЕОЖИДАННЫЙ ВЫВОД", desc: "Открытие, инсайт или нестандартное решение — трансформация изнутри" },
];

const STEPS = [
  { n: 1, text: "Определите задачу." },
  { n: 2, text: "Определите структурные составляющие проблемы и основных действующих лиц." },
  { n: 3, text: "Найдите параллельные ситуации — мир, далёкий от контекста клиента." },
  { n: 4, text: "Укажите логическое разрешение: чему нужно научиться, в каких контекстах это очевидно." },
  { n: 5, text: "Введите кризис и элемент трансформации, эмоциональную динамику переживаний главного персонажа." },
  { n: 6, text: "Облеките структуру в историю — занимательную, близкую клиенту, через его профессию или мир." },
];

const RULES = [
  "История идентична запросу по структуре, но сходство косвенное — не прямое совпадение, а касание по касательной.",
  "Предлагает замещающий опыт: клиент пропускает историю через другой ряд фильтров и видит новые выборы.",
  "Предлагает решение ряда сходных по структуре ситуаций — ведёт к соответствующему выбору.",
  "Вводит внутренний диалог персонажа, его изменение на уровне убеждений и эмоций, внутреннее разрешение.",
];

const SPIRAL_METAPHORS = [
  { level: "Бежевый / Фиолетовый", ex: "Анекдоты на тему пищи, родовые ритуалы, мифы" },
  { level: "Красный", ex: "Армейские истории, культ силы, революционные манифесты" },
  { level: "Синий", ex: "Религиозные и национальные притчи, истории долга и порядка" },
  { level: "Оранжевый", ex: "Истории о миллионерах, успехе, результате" },
  { level: "Зелёный", ex: "Постмодернистский юмор, игра слов (Эко, Мураками)" },
  { level: "Жёлтый / Бирюзовый", ex: "Коаны, дзен-притчи, хасидские истории, притчи Христа" },
];

const RESOURCES = [
  "Позволяет обойти сопротивление",
  "Многозначна — клиент вычерпывает те смыслы, которые ему нужны сейчас",
  "Соединяет решение клиента с его внутренним состоянием действовать",
  "Направлена на Я2 клиента (истинное Я, а не внутренний критик)",
  "«Долгоиграющая» — срабатывает через некоторое время",
  "Работает с заиканием, подростками и детьми",
];

export default function Metaphors() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [tab, setTab] = useState<"sources" | "structure" | "steps" | "rules" | "spiral" | "resource">("sources");

  const tabs = [
    { id: "sources", label: "Источники" },
    { id: "structure", label: "Структура" },
    { id: "steps", label: "6 шагов" },
    { id: "rules", label: "4 правила" },
    { id: "spiral", label: "По уровням" },
    { id: "resource", label: "Ресурсные" },
  ] as const;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Метафоры в коучинге" subtitle="Структура · Источники · Шаги создания" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-sky-500/20 p-5">
        <Wand2 className="absolute right-5 top-4 text-primary/20" size={28} />
        <h3 className="text-base font-semibold text-foreground">Я1 → Я2: цель метафоры</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Метафора направлена на Я2 — истинный потенциал клиента. Она обходит Я1 (внутренний критик) и открывает новые возможности выбора через образ, а не через анализ.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 font-medium">Добро и зло</span>
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 font-medium">Бабочка</span>
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 font-medium">Лук и стрелы</span>
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 font-medium">Капитан корабля</span>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              tab === t.id ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sources */}
      {tab === "sources" && (
        <div className="grid grid-cols-1 gap-3">
          {SOURCES.map((s) => {
            const I = s.icon;
            return (
              <div key={s.title} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white grid place-items-center shrink-0`}>
                  <I size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{s.title}</div>
                  <div className="text-sm text-foreground/75 mt-0.5">{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Structure */}
      {tab === "structure" && (
        <div className="space-y-3">
          {STRUCTURE.map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
              <div className="w-8 h-8 rounded-xl bg-primary text-primary-foreground grid place-items-center text-sm font-bold shrink-0">{i + 1}</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary">{s.label}</div>
                <div className="text-sm text-foreground/85 mt-0.5">{s.desc}</div>
              </div>
            </div>
          ))}
          <div className="bg-card border border-border rounded-2xl p-4 mt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">Примеры для практики</div>
            <div className="flex flex-wrap gap-2">
              {["Добро и зло", "Бабочка", "Выпуск АА", "Лук и стрелы", "Капитан корабля"].map((ex) => (
                <span key={ex} className="text-xs bg-primary/10 text-primary rounded-lg px-2 py-1 font-medium">{ex}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      {tab === "steps" && (
        <div className="space-y-2">
          {STEPS.map((s) => (
            <button
              key={s.n}
              onClick={() => setOpenStep(openStep === s.n ? null : s.n)}
              className="w-full flex items-start gap-3 bg-card border border-border rounded-2xl p-4 text-left transition-all hover:border-primary/40"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white grid place-items-center text-sm font-bold shrink-0">{s.n}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground leading-snug">{s.text}</div>
              </div>
              <ChevronRight size={16} className={`shrink-0 mt-0.5 text-muted-foreground transition-transform ${openStep === s.n ? "rotate-90" : ""}`} />
            </button>
          ))}
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 mt-2">
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Упражнение</div>
            <div className="text-sm text-foreground/85">25 минут на написание метафоры-истории по 6 шагам. Тема — любой актуальный запрос клиента.</div>
          </div>
        </div>
      )}

      {/* Rules */}
      {tab === "rules" && (
        <div className="space-y-3">
          {RULES.map((r, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 text-white grid place-items-center text-xs font-bold shrink-0">{i + 1}</div>
              <div className="text-sm text-foreground/85 leading-relaxed">{r}</div>
            </div>
          ))}
        </div>
      )}

      {/* Spiral levels */}
      {tab === "spiral" && (
        <div className="space-y-2">
          <div className="bg-card border border-border rounded-2xl p-4 mb-3">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1">Принцип</div>
            <div className="text-sm text-foreground/85">Метафора работает, только если она на том же уровне спирали, что и клиент. Юмор красного уровня не работает с бирюзовым клиентом.</div>
          </div>
          {SPIRAL_METAPHORS.map((s) => (
            <div key={s.level} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
              <ArrowRight size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-bold text-foreground">{s.level}</div>
                <div className="text-sm text-foreground/75">{s.ex}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resource metaphors */}
      {tab === "resource" && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-2">Ресурсная метафора — что это</div>
            <div className="text-sm text-foreground/85 leading-relaxed">Клиент становится главным действующим лицом метафоры. Коуч сопровождает его через завязку → кризис → нахождение внутреннего ресурса → развязку.</div>
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1 mt-4 mb-2">Преимущества</div>
          {RESOURCES.map((r, i) => (
            <div key={i} className="flex items-start gap-2 bg-card border border-border rounded-xl p-3">
              <ChevronRight size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <div className="text-sm text-foreground/85">{r}</div>
            </div>
          ))}
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 mt-2">
            <div className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Порядок работы</div>
            <div className="text-sm text-foreground/85">Цель → Препятствия и ресурсы → Контракт → Трансформационное состояние → Введение в метафору → Сопровождение → Возвращение → Обсуждение → Действия</div>
          </div>
        </div>
      )}
    </div>
  );
}
