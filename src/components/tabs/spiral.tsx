import React, { useState } from "react";
import {
  ArrowRight, Check, Dna, Flame, Gem, Globe,
  Heart, KeyRound, Layers, Quote, Scale,
  Sparkles, Target, Users, Zap,
} from "lucide-react";

/* ---------- shared bits ---------- */

const CHECKS_KEY = "coach-space-spiral-checks";

function loadChecks(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}"); } catch { return {}; }
}

function CheckList({ scope, items }: { scope: string; items: string[] }) {
  const [checks, setChecks] = useState<Record<string, boolean>>(loadChecks);
  const toggle = (i: number) => {
    const key = `${scope}-${i}`;
    const next = { ...checks, [key]: !checks[key] };
    setChecks(next);
    try { localStorage.setItem(CHECKS_KEY, JSON.stringify(next)); } catch { /* noop */ }
  };
  return (
    <ul className="space-y-2">
      {items.map((item, i) => {
        const on = !!checks[`${scope}-${i}`];
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 text-left rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:bg-muted/50"
            >
              <span className={`mt-0.5 w-5 h-5 rounded-md border-2 grid place-items-center shrink-0 transition-colors ${on ? "bg-teal-600 border-teal-600 text-white" : "border-muted-foreground/40"}`}>
                {on && <Check size={13} strokeWidth={3} />}
              </span>
              <span className={`text-sm leading-snug ${on ? "line-through text-muted-foreground" : ""}`}>{item}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Head({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-border bg-card p-4 ${className}`}>{children}</div>;
}

function ArrowList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2 text-sm leading-snug">
          <ArrowRight size={14} className="mt-1 shrink-0 text-teal-600" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- TAB 1: Спираль ---------- */

const LEVELS = [
  { n: 1, name: "ПРИНАДЛЕЖНОСТЬ", color: "#8b5cf6", icon: Users,
    slogan: "«Мы — одна семья»",
    atm: "Тёплая, семейная, держится на традициях",
    leader: "Отец/Мать — хранитель традиций",
    needs: "Стабильность, принадлежность, безопасность",
    eff: "Сохранение ритуалов и традиций" },
  { n: 2, name: "СИЛА", color: "#ef4444", icon: Flame,
    slogan: "«Я сильнее — я прав»",
    atm: "Жёсткая, держится на страхе и авторитете",
    leader: "Комиссар — сильная личность, решает всё",
    needs: "Защита, власть, признание силы",
    eff: "Чёткое силовое лидерство" },
  { n: 3, name: "ПРАВИЛА", color: "#3b82f6", icon: Scale,
    slogan: "«Есть правильный порядок»",
    atm: "Рациональная, формальная, иерархичная",
    leader: "Функционер — следует правилам и требует того же",
    needs: "Ясные правила, стабильная структура",
    eff: "Чёткие процедуры и регламенты" },
  { n: 4, name: "УСПЕХ", color: "#f97316", icon: Target,
    slogan: "«Побеждает лучший»",
    atm: "Драйвовая, ориентированная на достижения и результат",
    leader: "Достижанец — ставит амбициозные цели, вдохновляет",
    needs: "Свершения, признание результатов, карьерный рост",
    eff: "KPI, меритократия, конкуренция" },
  { n: 5, name: "ВОЗМОЖНОСТИ", color: "#22c55e", icon: Sparkles,
    slogan: "«Все голоса важны»",
    atm: "Творческая, матричная, горизонтальная",
    leader: "Фасилитатор — создаёт пространство для всех",
    needs: "Смысл, любопытство, развитие, равенство",
    eff: "Доверие, участие, коллаборация" },
  { n: 6, name: "БИРЮЗА", color: "#14b8a6", icon: Globe,
    slogan: "«Жизнь как путешествие»",
    atm: "Творческое самовыражение, самоуправление, целостность",
    leader: "Служащий гений — вдохновляет через смысл и призвание",
    needs: "Интеграция, призвание, эволюция",
    eff: "Самоуправление, целостность, эволюционная цель" },
];

function SpiralTab() {
  return (
    <div className="space-y-5">
      <Head title="Спиральная динамика" subtitle="Модель развития сознания (Бек и Кован)" />
      <Card>
        <p className="text-sm leading-relaxed">
          Спиральная динамика — модель уровней развития личности и организаций. Каждый уровень — это определённый способ видеть мир, принимать решения и строить отношения. Уровни не лучше и не хуже друг друга — каждый возникает как ответ на жизненные условия.
        </p>
      </Card>
      <Card className="border-teal-500/30 bg-teal-500/5">
        <div className="text-xs uppercase tracking-widest font-extrabold text-teal-700 dark:text-teal-300 mb-2">Ключевой принцип</div>
        <ArrowList items={[
          "Ни один уровень нельзя пропустить — развитие только последовательное",
          "Ценности предыдущих уровней не исчезают — они становятся фундаментом",
          "В одной организации/человеке могут сосуществовать несколько уровней",
        ]} />
      </Card>

      <div className="space-y-3">
        {LEVELS.map((l) => {
          const I = l.icon;
          return (
            <div key={l.n} className="rounded-2xl border border-border bg-card overflow-hidden flex">
              <div className="w-1.5 shrink-0" style={{ backgroundColor: l.color }} />
              <div className="p-4 flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="w-9 h-9 rounded-full grid place-items-center shrink-0" style={{ backgroundColor: `${l.color}1a` }}>
                    <I size={18} style={{ color: l.color }} />
                  </span>
                  <div>
                    <div className="font-extrabold text-sm tracking-wide">Уровень {l.n} — {l.name}</div>
                    <div className="text-sm font-semibold" style={{ color: l.color }}>{l.slogan}</div>
                  </div>
                </div>
                <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                  <div><dt className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Атмосфера</dt><dd>{l.atm}</dd></div>
                  <div><dt className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Лидер</dt><dd>{l.leader}</dd></div>
                  <div><dt className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Потребности</dt><dd>{l.needs}</dd></div>
                  <div><dt className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Эффективность</dt><dd>{l.eff}</dd></div>
                </dl>
              </div>
            </div>
          );
        })}
      </div>

      <Card className="border-violet-500/30 bg-violet-500/5">
        <div className="text-xs uppercase tracking-widest font-extrabold text-violet-700 dark:text-violet-300 mb-2">Вопросы для коуча</div>
        <ArrowList items={[
          "На каком уровне сейчас находится клиент?",
          "Какой уровень доминирует в его окружении/компании?",
          "Есть ли конфликт между уровнями?",
          "К какому уровню стремится движение?",
        ]} />
      </Card>
    </div>
  );
}

/* ---------- TAB 2: Бирюзовые компании ---------- */

const TEAL_PRINCIPLES = [
  { n: 1, name: "САМОУПРАВЛЕНИЕ", icon: Users, points: [
    "Самоуправляющиеся команды без традиционной иерархии",
    "В случае необходимости — помощь наставника",
    "Координация и собрания только по необходимости",
    "Люди сами выдвигаются для ведения проекта",
  ]},
  { n: 2, name: "ЦЕЛОСТНОСТЬ", icon: Heart, points: [
    "Человек приходит на работу целиком — с умом, телом, душой",
    "Обучение навыкам межличностного общения и культуре компании",
    "Открытое обсуждение ошибок, трудностей и идей — это норма",
    "Оценка деятельности — разговор о саморазвитии в направлении призвания",
  ]},
  { n: 3, name: "ЭВОЛЮЦИОННАЯ ЦЕЛЬ", icon: Dna, points: [
    "Организация живёт и развивается как живой организм",
    "Нет фиксированной стратегии — есть чуткость к тому, что нужно сейчас",
    "Команда осмысляет предназначение компании и учитывает его в решениях",
  ]},
];

const COMPARE: [string, string, string][] = [
  ["Структура", "Иерархическая пирамида", "Самоуправляющиеся команды"],
  ["Координация", "Совещания по плану", "Только по необходимости"],
  ["Найм", "HR проверяет навыки", "Коллеги проверяют соответствие духу компании"],
  ["Обучение", "HR выстраивает программу", "Индивидуальный выбор + культурные тренинги"],
  ["Зарплата", "Решает руководитель, бонусы", "Сотрудники назначают сами, равное распределение прибыли"],
  ["График", "Мало гибкости", "Высокая гибкость при соблюдении обязательств"],
  ["Личная цель", "Не в зоне ответственности компании", "Помощь найти призвание — часть работы"],
];

const TEAL_COMPANIES = ["Buurtzorg (Нидерланды)", "Zappos", "ВкусВилл", "Patagonia", "Точка", "Буквоед", "Morning Star", "Haier"];

const SERMON = [
  "Ищите возможности, а не разрабатывайте стратегию",
  "Будьте гибкими, а не планомерными",
  "Дайте людям выбирать рабочие роли",
  "Сделайте ответственность общей",
  "Предложите всем полномочия",
  "Пусть сотрудник поставит себе цели сам",
  "Платите по справедливости — или позвольте назначать зарплату самостоятельно",
  "Положите на бумагу ценности, а не правила",
  "Иерархия больше не нужна",
];

function TealTab() {
  return (
    <div className="space-y-5">
      <Head title="Бирюзовые организации" subtitle="Структуры, практики, процессы (Ф. Лалу)" />

      <div className="grid md:grid-cols-3 gap-3">
        {TEAL_PRINCIPLES.map((p) => {
          const I = p.icon;
          return (
            <Card key={p.n} className="border-teal-500/30 bg-teal-500/5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-9 h-9 rounded-full bg-teal-500/15 grid place-items-center shrink-0">
                  <I size={18} className="text-teal-600" />
                </span>
                <div className="font-extrabold text-sm text-teal-700 dark:text-teal-300">{p.n}. {p.name}</div>
              </div>
              <ul className="space-y-1.5">
                {p.points.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-snug">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Оранжевые vs Бирюзовые</div>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left">
                <th className="py-2 pr-3 font-bold text-muted-foreground">Параметр</th>
                <th className="py-2 pr-3 font-bold text-orange-600">Оранжевые</th>
                <th className="py-2 font-bold text-teal-600">Бирюзовые</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([param, orange, teal]) => (
                <tr key={param} className="border-t border-border align-top">
                  <td className="py-2 pr-3 font-semibold">{param}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{orange}</td>
                  <td className="py-2">{teal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Примеры бирюзовых компаний</div>
        <div className="flex flex-wrap gap-2">
          {TEAL_COMPANIES.map((c) => (
            <span key={c} className="rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-semibold px-3 py-1.5">{c}</span>
          ))}
        </div>
      </Card>

      <Card className="border-teal-500/30 bg-teal-500/5">
        <div className="text-xs uppercase tracking-widest font-extrabold text-teal-700 dark:text-teal-300 mb-2">Законы эволюции организации</div>
        <ArrowList items={[
          "Развитие только последовательное — ни один этап нельзя пропустить",
          "Ценности предыдущих этапов не исчезают — уходят в фундамент",
          "Развитие происходит через внутренние кризисы",
          "Оптимальное время в одной культуре: 3–10 лет (в среднем 5 лет)",
          "В одной организации могут сосуществовать несколько культур",
          "Каждому типу нужен свой тип лидерства и управленческие практики",
        ]} />
      </Card>

      <div className="grid md:grid-cols-2 gap-3">
        <Card>
          <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Мировой контекст</div>
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-extrabold text-orange-600 mb-1">VUCA</div>
              <p>Volatility (Изменчивость) · Uncertainty (Неопределённость) · Complexity (Сложность) · Ambiguity (Неоднозначность)</p>
            </div>
            <div>
              <div className="font-extrabold text-teal-600 mb-1">BANI</div>
              <p>Brittle (Хрупкий) · Anxious (Тревожный) · Nonlinear (Нелинейный) · Incomprehensible (Непостижимый)</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">«Бирюзовая проповедь» (М. Розин)</div>
          <ol className="space-y-1.5 text-sm">
            {SERMON.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-[11px] font-extrabold grid place-items-center shrink-0">{i + 1}</span>
                <span className="leading-snug">{s}</span>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}

/* ---------- TAB 3: Убеждения ---------- */

const BELIEF_TYPES: [string, string][] = [
  ["«Сейчас кризис, не время для обучения»", "«Кризис — время новых возможностей»"],
  ["«Я недостаточно...»", "«Мне всё можно»"],
  ["«Это невозможно»", "«Это только вопрос времени»"],
];

const BELIEF_STEPS = [
  "Определить актуальный контекст: «Что именно в жизни хотите изменить?»",
  "Прояснение желаемого: «Что делали бы, если были уверены, что можете?»",
  "Подтверждение: «То есть вы хотите этого?»",
  "Определение желаемого убеждения: «В чём нужно быть уверенным, чтобы это сделать?»",
  "Подтверждение: «Если были бы уверены — сделали бы?»",
  "Выявление ограничивающего: «Что может помешать?», «Почему не прийти к цели?»",
  "Проверка: «То есть вы сейчас уверены в этом?»",
];

const BELIEF_CYCLE = ["Выявить", "Осознать", "Усомниться", "Сформировать желаемое", "Заменить", "Поверить", "Опыт"];

function BeliefsTab() {
  return (
    <div className="space-y-5">
      <Head title="Убеждения" subtitle="Фильтры восприятия и как с ними работать" />

      <Card>
        <p className="text-sm leading-relaxed mb-3">
          Убеждение — это то, что мы считаем правдой о себе, мире и наших отношениях с большим целым. Убеждение = обобщение о мире (других), о себе, о жизни. Функция убеждений — стимулировать непрерывный поиск их подтверждения.
        </p>
        <div className="rounded-xl bg-violet-500/10 border border-violet-500/30 p-3 flex items-start gap-2">
          <Quote size={16} className="text-violet-600 mt-0.5 shrink-0" />
          <p className="text-sm italic">«Каждый из нас заключён в тюрьму своих собственных убеждений» — А. Эйнштейн</p>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Убеждения</div>
        <ArrowList items={[
          "Определяют вашу реакцию",
          "Структурируют переживания и определяют поведение",
          "Заполняют пробелы в знаниях",
          "Придают смысл поступкам",
        ]} />
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Типы убеждений</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
            <div className="font-extrabold text-sm text-rose-600 mb-2">Ограничивающие / Сдерживающие</div>
            <ul className="space-y-1.5 text-sm">{BELIEF_TYPES.map(([l]) => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
            <div className="font-extrabold text-sm text-emerald-600 mb-2">Поддерживающие / Помогающие</div>
            <ul className="space-y-1.5 text-sm">{BELIEF_TYPES.map(([, r]) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Как образуются убеждения</div>
        <ArrowList items={[
          "Причина — Следствие: «Если... то...»",
          "Комплексный эквивалент: A = B",
          "Очевидное сверхобобщение: «все», «всегда», «должны», «обязаны»",
        ]} />
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Симптомы «выниривания» убеждений</div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <div className="font-bold mb-1.5">Лингвистические</div>
            <ul className="space-y-1.5">
              {["Модальные операторы: «могу/не могу», «должен/не должен», «необходимо/не желательно»",
                "Высококонтекстуальные слова: «быть», «есть», «значить», «следовательно»",
                "Универсальные квантификаторы: «всегда», «никто», «никогда», «все»",
                "Структуры «если..., то...»"].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-bold mb-1.5">Психофизические</div>
            <ul className="space-y-1.5">
              {["Вовлечённость нервной системы — «зацикленность»",
                "Чрезмерная эмоциональность — отстаивание «с пеной у рта»",
                "Иррациональные ответы: «Всё равно это так!»"].map((t) => (
                <li key={t} className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Как выявить ограничивающее убеждение — 7 шагов</div>
        <ol className="space-y-2">
          {BELIEF_STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 text-xs font-extrabold grid place-items-center shrink-0">{i + 1}</span>
              <span className="leading-snug pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="border-violet-500/30 bg-violet-500/5">
        <div className="text-xs uppercase tracking-widest font-extrabold text-violet-700 dark:text-violet-300 mb-3">Цикл смены убеждений</div>
        <div className="flex flex-wrap items-center gap-1.5">
          {BELIEF_CYCLE.map((s, i) => (
            <React.Fragment key={s}>
              <span className="rounded-full bg-card border border-violet-500/30 text-xs font-semibold px-3 py-1.5">{s}</span>
              {i < BELIEF_CYCLE.length - 1 && <ArrowRight size={13} className="text-violet-500 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------- TAB 4: Ценности ---------- */

const VALUE_SOURCES = [
  "Семья — каков был фундамент ценностей?",
  "Школа — как относились учителя?",
  "Друзья — какие фундаментальные ценности были в вашем кругу?",
  "География — какая страна, культура?",
  "Экономика — вашей семьи и времени рождения",
  "Среда — какие непроговариваемые ценности присутствовали?",
  "Время истории — вам было 10 лет в 60-е, 70-е, 80-е или 90-е?",
];

const VALUE_EXERCISE = [
  "Спросите об иерархии ценностей партнёра",
  "Начните с самой значимой ценности. Спросите: «Что Вам даст...?»",
  "Слушайте К... («даст мне») или ОТ... («избежать», «не будет»)",
  "Если ОТ... — запишите и предложите подумать об изменении",
  "Продолжайте со всеми ценностями",
];

const FRAMES: [string, string][] = [
  ["В чём проблема?", "Что ты хочешь вместо?"],
  ["Почему это проблема?", "Как этого достичь?"],
  ["Что её вызвало?", "Что для этого необходимо?"],
  ["Кто виноват?", "Кто это может изменить?"],
];

const DILTS = ["Миссия", "Идентичность", "Убеждения / Ценности", "Способности", "Поведение", "Окружение"];

function ValuesTab() {
  return (
    <div className="space-y-5">
      <Head title="Ценности" subtitle="Мотиваторы поведения" />

      <Card>
        <p className="text-sm leading-relaxed mb-2">
          Ценность — это то, для достижения чего человек использует свои ресурсы: энергию, время, деньги.
        </p>
        <ArrowList items={[
          "Ценности формируются на основании убеждений",
          "Ценности обладают более высокой степенью обобщения, чем убеждения",
          "Ценности — более значимый регулятор (мотиватор) поведения",
        ]} />
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Источники ценностей</div>
        <ArrowList items={VALUE_SOURCES} />
      </Card>

      <div className="grid sm:grid-cols-2 gap-3">
        <Card className="border-emerald-500/30 bg-emerald-500/5">
          <div className="font-extrabold text-sm text-emerald-600 mb-1">Ценности стремления (К...)</div>
          <p className="text-sm">Движется к желаемому: «Я буду богат»</p>
        </Card>
        <Card className="border-rose-500/30 bg-rose-500/5">
          <div className="font-extrabold text-sm text-rose-600 mb-1">Ценности избегания (ОТ...)</div>
          <p className="text-sm">Движется прочь от нежелательного: «Я не буду бедным»</p>
        </Card>
      </div>

      <Card className="border-amber-500/30 bg-amber-500/5">
        <p className="text-sm leading-relaxed">
          Оба вида могут быть очень мотивирующими. <span className="font-semibold">НО:</span> мозг не понимает отрицаний — создаёт образы того, чего мы желаем. Слово «бедным» создаст образы бедности. → Мы можем создать «жизнь по направлению к».
        </p>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Упражнение по выявлению ценностей</div>
        <ol className="space-y-2">
          {VALUE_EXERCISE.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-extrabold grid place-items-center shrink-0">{i + 1}</span>
              <span className="leading-snug pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Фрейм проблемы vs Фрейм результата</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
            <div className="font-extrabold text-sm text-rose-600 mb-2">Фрейм проблемы</div>
            <ul className="space-y-1.5 text-sm">{FRAMES.map(([l]) => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
            <div className="font-extrabold text-sm text-emerald-600 mb-2">Фрейм результата</div>
            <ul className="space-y-1.5 text-sm">{FRAMES.map(([, r]) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-3">Пирамида Дилтса (уровни логики)</div>
        <div className="max-w-sm mx-auto space-y-1.5">
          {DILTS.map((d, i) => (
            <div
              key={d}
              className="rounded-xl border border-violet-500/30 bg-violet-500/5 text-center py-2 text-sm font-semibold"
              style={{ marginLeft: `${i * 6}%`, marginRight: `${i * 6}%` }}
            >
              {d}
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Изменения на более высоком уровне влияют на все нижние. Коуч работает на уровне убеждений, идентичности и выше.
        </p>
      </Card>
    </div>
  );
}

/* ---------- TAB 5: Техники ---------- */

const SLEIGHT = [
  "Намерения (префрейминг) — «Зачем на самом деле это убеждение?»",
  "Переопределения — «Что значит это слово для вас?»",
  "Последствия — «Что будет, если вы оставите это убеждение?»",
  "Разделения — «А в каких случаях это НЕ так?»",
  "Объединения — «Как это связано с чем-то большим?»",
  "Аналоговый фрейм — метафора, аналогия",
  "Изменение размеров фрейма — «А через 10 лет это будет важно?»",
  "Другой результат — «Посмотрим с другого угла...»",
  "Модель мира — «С чьей точки зрения это так?»",
  "Стратегия реальности — «Как именно это стало для вас правдой?»",
  "Противоположный пример — «Есть ли исключение из правила?»",
  "Применение к себе — «А сам живёшь по этим принципам?»",
  "Иерархия критериев — «Что для вас важнее?»",
  "Метафрейм — «Что вы думаете о самом этом убеждении?»",
];

const COACH_CHECKLIST = [
  "Что вам мешает сделать это прямо сейчас?",
  "Что случится, если вы достигнете этой цели?",
  "Что случится, если вы НЕ достигнете?",
  "Что НЕ случится, если достигнете?",
  "Что НЕ случится, если НЕ достигнете?",
  "В чём вам необходимо быть уверенным, чтобы двигаться?",
  "Кем вам нужно быть, чтобы это реализовать?",
];

const META_YES_NO = [
  "Определить новое поддерживающее убеждение, которое хотите иметь. Пример: «Стать востребованным коучем — это просто»",
  "Выявите конкурирующее старое убеждение: «Мне трудно стать востребованным коучем»",
  "Войдите в состояние сильного «НЕТ!» — вспомните что-то, на что никогда не согласитесь. Повторяйте «нет!», пока не почувствуете это всем телом. Поза, жесты, тон голоса.",
  "Уничтожьте старое убеждение с помощью мета «НЕТ!». Говорите «нет!», думая о старом убеждении. До тех пор, пока оно не сотрётся.",
  "Войдите в состояние мощного «ДА!» — вспомните что-то, что принимаете безоговорочно. Повторяйте «да!», пока не почувствуете всем телом.",
  "Укрепите новое убеждение с помощью мета «ДА!»",
  "Представьте, как новое убеждение изменит вашу жизнь",
];

const MUSEUM_CHAIN = ["Нынешнее убеждение", "Сомнение", "Готовность поверить", "Желаемое убеждение", "Абсолютная вера"];

function TechniqueCard({ n, title, author, when, children }: { n: number; title: string; author?: string; when: string; children: React.ReactNode }) {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-1">
        <span className="w-7 h-7 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-xs font-extrabold grid place-items-center shrink-0">{n}</span>
        <div className="font-extrabold">{title}{author && <span className="text-muted-foreground font-semibold"> ({author})</span>}</div>
      </div>
      <p className="text-sm text-muted-foreground mb-3"><span className="font-semibold text-foreground">Когда использовать:</span> {when}</p>
      {children}
    </Card>
  );
}

function TechniquesTab() {
  return (
    <div className="space-y-5">
      <Head title="Техники изменения убеждений" subtitle="Пошаговые инструменты коуча" />

      <TechniqueCard n={1} title="Метод «Мета ДА и НЕТ»" author="М. Холл" when="Когда нужно заменить конкретное ограничивающее убеждение.">
        <ol className="space-y-2">
          {META_YES_NO.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-xs font-extrabold grid place-items-center shrink-0">{i + 1}</span>
              <span className="leading-snug pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </TechniqueCard>

      <TechniqueCard n={2} title="Музей старых убеждений" when="Для мягкого выхода из ограничивающего убеждения без конфронтации.">
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Модель перехода</div>
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {MUSEUM_CHAIN.map((s, i) => (
            <React.Fragment key={s}>
              <span className="rounded-full bg-teal-500/10 border border-teal-500/30 text-xs font-semibold px-3 py-1.5">{s}</span>
              {i < MUSEUM_CHAIN.length - 1 && <ArrowRight size={13} className="text-teal-500 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-3">(Метапозиция — взгляд со стороны)</p>
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">Вопросы для работы</div>
        <ArrowList items={[
          "«Какова цена этого убеждения для вашей жизни?»",
          "«Есть ли исключения из этого правила?»",
          "«Что было бы возможным, если бы это убеждение не было правдой?»",
          "«Куда бы вы отнесли его в музей?»",
        ]} />
      </TechniqueCard>

      <TechniqueCard n={3} title="Фокусы языка" author="Р. Дилтс" when="Изменение ограничивающего убеждения через вопросы.">
        <div className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground mb-2">14 фокусов — краткая шпаргалка</div>
        <ol className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
          {SLEIGHT.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-300 text-[10px] font-extrabold grid place-items-center shrink-0">{i + 1}</span>
              <span className="leading-snug">{s}</span>
            </li>
          ))}
        </ol>
      </TechniqueCard>

      <TechniqueCard n={4} title="Вопросы для выявления убеждений в сессии" when="Чек-лист коуча во время сессии.">
        <CheckList scope="spiral-coach" items={COACH_CHECKLIST} />
      </TechniqueCard>
    </div>
  );
}

/* ---------- Root with sub-tabs ---------- */

type SubId = "spiral" | "teal" | "beliefs" | "values" | "techniques";

const SUBS: { id: SubId; label: string; icon: React.ElementType }[] = [
  { id: "spiral", label: "Спираль", icon: Layers },
  { id: "teal", label: "Бирюзовые компании", icon: Globe },
  { id: "beliefs", label: "Убеждения", icon: KeyRound },
  { id: "values", label: "Ценности", icon: Gem },
  { id: "techniques", label: "Техники работы", icon: Zap },
];

export default function SpiralDynamics() {
  const [sub, setSub] = useState<SubId>("spiral");
  return (
    <div className="space-y-5 max-w-full overflow-hidden">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Спиральная динамика</h2>
        <p className="text-sm text-muted-foreground">Уровни развития, убеждения и ценности</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
        {SUBS.map((s) => {
          const I = s.icon;
          const active = sub === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSub(s.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap border transition-colors shrink-0 ${
                active
                  ? "bg-teal-600 border-teal-600 text-white"
                  : "bg-card border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <I size={15} />
              {s.label}
            </button>
          );
        })}
      </div>

      {sub === "spiral" && <SpiralTab />}
      {sub === "teal" && <TealTab />}
      {sub === "beliefs" && <BeliefsTab />}
      {sub === "values" && <ValuesTab />}
      {sub === "techniques" && <TechniquesTab />}
    </div>
  );
}
