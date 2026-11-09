import { useState } from "react";
import { Eye, ChevronRight, ChevronDown, ArrowRight, Flower2, Users, TreePine, Zap, Gem } from "lucide-react";
import { SectionHead } from "./_shared";

type Technique = {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  accent: string;
  steps: { label?: string; text: string }[];
  tip?: string;
};

const TECHNIQUES: Technique[] = [
  {
    id: "flower",
    title: "Цветок",
    subtitle: "Проективная методика · Эпистемологическая метафора",
    icon: Flower2,
    color: "from-pink-500 to-rose-500",
    accent: "from-pink-500/15 to-rose-500/5 border-pink-500/30",
    steps: [
      { label: "Введение", text: "«Представьте себе какой-либо цветок, который вы уже когда-либо видели или который рисует вам ваше воображение. Всё, что вы представите — хорошо, мы можем работать с любым образом. Что вы представили?»" },
      { label: "Окружение", text: "«Опишите, что вокруг цветка — время года, время суток»" },
      { label: "Описание", text: "«Опишите сам цветок — какой он? Назовите несколько прилагательных»" },
      { label: "Чувства", text: "«Если бы он что-то мог чувствовать, как бы он себя ощущал?»" },
      { label: "Желания", text: "«Если бы он мог что-то желать — какие бы у него были мечты, цели, стремления?»" },
      { label: "Нравится / не нравится", text: "«Что он любит? Что ему не нравится? Чего он боится?»" },
    ],
    tip: "Используется для: исследования личности, прояснения запроса, работы с ресурсным состоянием.",
  },
  {
    id: "mentors",
    title: "Встреча с менторами",
    subtitle: "Работа с целями и ресурсами через воображаемый диалог",
    icon: Users,
    color: "from-sky-500 to-blue-600",
    accent: "from-sky-500/15 to-blue-500/5 border-sky-500/30",
    steps: [
      { label: "Шаг 1 — Подготовка", text: "Сформулировать цель. Определить вопрос (или несколько), ответы на которые клиент хотел бы получить." },
      { label: "Шаг 2 — Список менторов", text: "Выбрать 5 экспертов-менторов — живых или исторических, реальных или вымышленных персонажей. Клиент должен знать их историю жизни или структуру взглядов. Не близкие люди." },
      { label: "Шаг 3 — Пространство", text: "«Представьте место, где вы чувствуете себя хорошо и спокойно. Опишите, как там появляются менторы. Поздоровайтесь и поблагодарите их.»" },
      { label: "Шаг 4 — Диалог", text: "Клиент задаёт вопрос ментору → перемещается в образ ментора → от его лица отвечает себе вслух. Возвращается в себя → задаёт следующий вопрос. Повторяется с каждым ментором." },
      { label: "Шаг 5 — Подарок", text: "Менторы покидают место встречи и оставляют символический подарок. Клиент описывает его и интерпретирует значение." },
      { label: "Шаг 6 — Завершение", text: "Воспроизвести записанный диалог. Прояснить выводы. Спросить: как клиент собирается реализовывать советы менторов в жизни?" },
    ],
    tip: "Применяется для: целеполагания, принятия сложных решений, работы с неопределённостью.",
  },
  {
    id: "forest",
    title: "Опушка леса",
    subtitle: "Работа с конфликтами и неприязнью к другому человеку",
    icon: TreePine,
    color: "from-emerald-500 to-teal-600",
    accent: "from-emerald-500/15 to-teal-500/5 border-emerald-500/30",
    steps: [
      { label: "GROW-анализ", text: "G: Цель клиента. R: Анализ ситуации — конфликт или неприязнь к конкретному человеку. Контракт на трансформационное изменение восприятия." },
      { label: "Вход в состояние", text: "«Амортизация» и подготовка клиента к трансформационной работе. Достижение трансформационного состояния." },
      { label: "Образ", text: "«Представьте опушку леса и себя там. Из чащи леса появляется какое-то существо. Опишите его — какое оно, как относится к вам?»" },
      { label: "Ключ", text: "Объяснить клиенту: «Это существо такое, потому что оно голодное». Спросить: «Что любит кушать это существо?»" },
      { label: "Трансформация", text: "Предложить клиенту найти угощение на опушке. Покормить существо в воображаемом мире. Наблюдать его трансформацию." },
      { label: "Новые отношения", text: "Коммуникация с изменившимся существом. Выстраивание новых взаимоотношений. Возвращение и интерпретация. Определение ближайших действий." },
    ],
    tip: "Применяется для: снятия неприязни, изменения восприятия сложного человека, работы с конфликтом.",
  },
  {
    id: "directive",
    title: "Директивная метафора",
    subtitle: "Трансформация внутреннего препятствия через образ",
    icon: Zap,
    color: "from-violet-500 to-indigo-600",
    accent: "from-violet-500/15 to-indigo-500/5 border-violet-500/30",
    steps: [
      { label: "Шаг 1 — Цель и препятствие", text: "Определите цель клиента. Выявите внутренние препятствия. Контракт: трансформация препятствия в то, что будет помогать." },
      { label: "Шаг 2 — Образ препятствия", text: "«Где находится препятствие? На что похоже? Какого цвета, запаха, веса, объёма, температуры? Какие звуки издаёт?»" },
      { label: "Шаг 3 — Изменения", text: "Диссоциировать препятствие от контекста и от себя. Произвести изменения образа с постоянными экологическими проверками — до тех пор, пока образ не станет устраивающим." },
      { label: "Шаг 4 — Возврат", text: "Вернуть метафору в тело (или на прежнее место). Экологическая проверка: хорошо ли телу с изменённым образом?" },
      { label: "Шаг 5 — Интеграция", text: "Представить, как новая метафора изменяет во всём теле старые энергии на новые. Словесная коммуникация с новой метафорой: «Согласна ли она помогать в будущем?»" },
      { label: "Шаг 6 — Будущее", text: "Проверить, как изменится будущее в воображении. Определить ближайшие действия клиента." },
    ],
    tip: "Применяется для: работы с ограничивающими убеждениями, страхами, внутренними блоками.",
  },
];

const ALL_MOTIFS = [
  "Луг — исходный мотив сессии",
  "Подъём в гору — панорама ландшафта с вершины",
  "Следование вдоль ручья вверх или вниз по течению",
  "Обследование дома",
  "Встреча с особо значимым лицом (родитель, партнёр, кумир, учитель)",
  "Наблюдение опушки леса и ожидание существа из темноты",
  "Лодка на берегу пруда или озера — путешествие по воде",
  "Путешествие на поезде, корабле, верхом на лошади, полёт на ковре-самолёте",
  "Пещера — наблюдение снаружи и исследование глубин",
  "Наблюдение и контакт с семьёй животных",
  "Надел земли — возделать или построить",
  "Представление себя примерно на 10 лет старше",
  "Собственная машина или мотоцикл",
  "Представление реальной ситуации",
  "Воспоминания из прошлого опыта",
  "Последняя сцена из сновидения — продолжение наяву",
  "Интроспекция внутренностей тела — путешествие вглубь",
  "Стол менторов",
  "Куст розы (для мужчин) / Автостоп · Дискотека · Пляж (для женщин)",
];

export default function Symboldrama() {
  const [active, setActive] = useState("flower");
  const [motifOpen, setMotifOpen] = useState(false);
  const tech = TECHNIQUES.find((t) => t.id === active)!;
  const I = tech.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Символдрама" subtitle="Кататимно-имагинативная психотерапия · Эпистемологические метафоры" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-sky-500/20 p-5">
        <Eye className="absolute right-5 top-4 text-primary/20" size={28} />
        <h3 className="text-base font-semibold text-foreground">Кататимный образ</h3>
        <p className="mt-1 text-sm text-foreground/80">
          Ханскарл Лейнер: «выразительный, колоритный и эмоционально наполненный образ». От греч. <em>kata</em> — согласно, <em>thymos</em> — душа. «Согласно чувствам» или «исходящее из души».
        </p>
      </div>

      {/* Technique selector */}
      <div className="grid grid-cols-2 gap-2">
        {TECHNIQUES.map((t) => {
          const act = active === t.id;
          const TI = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl mb-2 grid place-items-center text-white ${act ? "bg-white/20" : `bg-gradient-to-br ${t.color}`}`}>
                <TI size={18} />
              </div>
              <div className={`text-xs font-bold leading-tight ${act ? "" : "text-foreground"}`}>{t.title}</div>
            </button>
          );
        })}
      </div>

      {/* Active technique */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${tech.accent}`}>
        <I size={120} strokeWidth={1} className="absolute -right-3 -top-3 text-foreground/[0.04] pointer-events-none" />
        <div className="flex items-center gap-3 mb-1">
          <div className={`w-11 h-11 rounded-xl grid place-items-center text-white bg-gradient-to-br ${tech.color}`}>
            <I size={22} />
          </div>
          <div>
            <div className="text-base font-bold text-foreground">{tech.title}</div>
            <div className="text-xs text-foreground/60">{tech.subtitle}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {tech.steps.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            {s.label && (
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1.5">{s.label}</div>
            )}
            <div className="text-sm text-foreground/85 leading-relaxed">{s.text}</div>
          </div>
        ))}
        {tech.tip && (
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-2">
            <ChevronRight size={15} className="text-primary mt-0.5 shrink-0" />
            <div className="text-sm font-medium text-foreground/90">{tech.tip}</div>
          </div>
        )}
      </div>

      {/* All motifs collapsible */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <button
          onClick={() => setMotifOpen(!motifOpen)}
          className="w-full flex items-center justify-between p-4 text-left"
        >
          <div>
            <div className="text-sm font-bold text-foreground">Все 19 мотивов символдрамы</div>
            <div className="text-xs text-muted-foreground mt-0.5">Полный список для работы на сессии</div>
          </div>
          <ChevronDown size={18} className={`text-muted-foreground transition-transform ${motifOpen ? "rotate-180" : ""}`} />
        </button>
        {motifOpen && (
          <div className="border-t border-border px-4 pb-4 pt-3 space-y-2">
            {ALL_MOTIFS.map((m, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-md bg-primary/10 text-primary text-[10px] font-bold grid place-items-center shrink-0 mt-0.5">{i + 1}</div>
                <div className="text-sm text-foreground/85">{m}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GROW mapping */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">Вписывание в GROW</div>
        <div className="space-y-2">
          {[
            { k: "G", v: "Определение цели клиента" },
            { k: "R", v: "Анализ реальной ситуации. Выявление показаний для трансформационной работы. Контракт." },
            { k: "O", v: "Трансформационный процесс с мотивом / образом" },
            { k: "W", v: "Возвращение, интерпретация, выводы. Ближайшие действия клиента." },
          ].map((row) => (
            <div key={row.k} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{row.k}</div>
              <div className="text-sm text-foreground/85 pt-0.5">{row.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
