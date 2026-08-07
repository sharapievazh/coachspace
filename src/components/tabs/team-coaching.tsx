import { useState } from "react";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { SectionHead } from "./_shared";

// ─── Роли ведущего ───────────────────────────────────────────────────────────
const ROLES = [
  {
    emoji: "🔮", name: "Волшебник", task: "Презентация темы",
    color: "border-purple-500/40 bg-purple-500/10", dot: "#8b5cf6",
    signs: ["Лицо сконцентрировано, но позитивно", "Брови приподняты", "Палец вытянут вверх", "Голос сказочный, мягкий, с паузами"],
    when: "Открытие темы, создание интереса и магии момента",
  },
  {
    emoji: "🧠", name: "Интеллектуал", task: "Изложение теории",
    color: "border-blue-500/40 bg-blue-500/10", dot: "#3b82f6",
    signs: ["Быстрая чёткая речь", "Специальная интонация и паузы", "Маркирование", "Работа со слайдами"],
    when: "Подача теоретического материала, объяснение моделей",
  },
  {
    emoji: "👑", name: "Мудрец", task: "Подведение итогов",
    color: "border-amber-500/40 bg-amber-500/10", dot: "#f59e0b",
    signs: ["Медленная глубокая речь", "Паузы для осмысления", "Обилие метафор", "Внешние атрибуты, подчёркивающие статус"],
    when: "Обсуждение результатов, рефлексия, завершение блока",
  },
  {
    emoji: "🤝", name: "Друг", task: "Инструктаж к упражнению",
    color: "border-emerald-500/40 bg-emerald-500/10", dot: "#10b981",
    signs: ["Тёплый доверительный тон", "Близость, эмпатия", "Сопереживание", "Простой язык"],
    when: "Объяснение правил упражнения, создание безопасности",
  },
  {
    emoji: "⚡", name: "Лидер", task: "Призыв к действию",
    color: "border-rose-500/40 bg-rose-500/10", dot: "#ef4444",
    signs: ["Уверенный громкий голос", "Активная физическая энергия", "Чёткая речь", "Прямые призывы"],
    when: "Запуск упражнения, мотивация группы, старт активности",
  },
];

// ─── Психогеография ──────────────────────────────────────────────────────────
const PSYCH_POSITIONS = [
  { code: "П",  name: "Поддержка",      color: "#10b981", desc: "Поддерживает тренера, кивает, соглашается. Сядьте к нему ближе для энергетической подпитки." },
  { code: "Л",  name: "Лидер",          color: "#8b5cf6", desc: "Максимально проявляется в аудитории, берёт на себя роль. Используйте его для демонстраций." },
  { code: "КЛ", name: "Контрлидер",     color: "#ef4444", desc: "Конкурирует с лидером, может спорить. Вовлекайте в задания, давайте особую роль." },
  { code: "МП", name: "Мета-позиция",   color: "#f59e0b", desc: "Эксперт, наблюдает, не включается. Задайте прямой вопрос, попросите экспертную оценку." },
  { code: "З",  name: "Зеркало",        color: "#94a3b8", desc: "Пассивная позиция, лидер видит себя в нём. Лидер обращает на него много внимания — используйте это." },
];

const COACH_POSITIONS = [
  { pos: "Напротив",         tip: "Большой эмоциональный заряд. Используй для акцентов и вызовов." },
  { pos: "Угол 45–90°",      tip: "«Мы вместе». Партнёрская позиция, снижает напряжение." },
  { pos: "Слева от человека", tip: "«Я в твоём прошлом». Повышает доверие, используй для работы с опытом." },
  { pos: "Справа от человека", tip: "«Я в твоём будущем». Человек будет думать о тебе при планировании." },
  { pos: "Около двери (спиной)", tip: "Нет защиты сзади — больше волнения. Так стоять НЕ рекомендуется." },
  { pos: "У стены (сзади)",  tip: "Защищённость и поддержка. Хорошая позиция для спокойной работы." },
];

// ─── Фазы Такмана ────────────────────────────────────────────────────────────
const TUCKMAN_PHASES = [
  {
    n: 1, en: "Forming", ru: "Формирование",
    color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-400/40",
    desc: "Группа только собралась. Люди вежливы, осторожны, ищут своё место. Высокая зависимость от лидера.",
    signs: ["Вежливость и осторожность", "Вопросы о правилах", "Поверхностное общение", "Ориентация на ведущего"],
    coach: ["Чёткие правила и структура", "Самопрезентация и знакомство", "Создание безопасного пространства"],
  },
  {
    n: 2, en: "Storming", ru: "Конфликт",
    color: "#ef4444", bg: "bg-rose-500/10", border: "border-rose-400/40",
    desc: "Конкуренция, конфликты, борьба за роли. Самая сложная фаза для коуча.",
    signs: ["Споры и разногласия", "Сопротивление лидеру", "Борьба за роли", "Снижение продуктивности"],
    coach: ["Диссоциация (взгляд со стороны)", "Создание общих правил", "Юмор и разрядка", "Возврат к общей цели", "Перерыв или медиация", "Интерактив — совместные задания", "Выйти на высший логический уровень"],
  },
  {
    n: 3, en: "Norming", ru: "Нормирование",
    color: "#f59e0b", bg: "bg-amber-500/10", border: "border-amber-400/40",
    desc: "Группа выработала правила и роли. Растёт доверие, появляется сотрудничество.",
    signs: ["Принятие различий", "Совместные решения", "Открытый обмен идеями", "Растущая продуктивность"],
    coach: ["Поддерживать нормы", "Делегировать больше группе", "Укреплять доверие"],
  },
  {
    n: 4, en: "Performing", ru: "Результат",
    color: "#10b981", bg: "bg-emerald-500/10", border: "border-emerald-400/40",
    desc: "Команда работает эффективно. Минимальная зависимость от ведущего. Синергия.",
    signs: ["Высокая продуктивность", "Взаимоподдержка", "Гибкость ролей", "Самоуправление"],
    coach: ["Минимальное вмешательство", "Поддерживать самостоятельность", "Фиксировать достижения"],
  },
];

// ─── 6 инструментов модерации/фасилитации ────────────────────────────────────
const FACILITATION_TOOLS = [
  {
    name: "Парковка идей",
    color: "#8b5cf6", bg: "bg-purple-500/10", border: "border-purple-400/40",
    desc: "Лист или зона на доске, куда выписываются вопросы «не по теме» — чтобы обсудить их позже, не нарушая фокус.",
    use: "Когда группа уходит в сторону от темы",
  },
  {
    name: "Рефрейминг",
    color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-400/40",
    desc: "Переформулирование агрессивного или непонятного высказывания в конструктивное и рабочее.",
    use: "При конфликтах, обвинениях, эмоциональных выпадах",
  },
  {
    name: "Активное слушание",
    color: "#10b981", bg: "bg-emerald-500/10", border: "border-emerald-400/40",
    desc: "«Правильно ли я понимаю, что...» — для резюмирования (модератор) или уточнения идеи (фасилитатор).",
    use: "Постоянно, чтобы убедиться в правильном понимании",
  },
  {
    name: "Check-in",
    color: "#f59e0b", bg: "bg-amber-500/10", border: "border-amber-400/40",
    desc: "Короткий вопрос в начале встречи: «Одно слово/фраза — как вы сейчас?» Настраивает группу на работу.",
    use: "В начале каждой сессии или встречи",
  },
  {
    name: "Check-out",
    color: "#0ea5e9", bg: "bg-sky-500/10", border: "border-sky-400/40",
    desc: "Короткий вопрос в конце: «Что берёте с собой?» или «Одно слово о сегодняшней работе».",
    use: "В конце сессии для фиксации результатов и обратной связи",
  },
  {
    name: "6-3-5 (Брейнрайтинг)",
    color: "#ef4444", bg: "bg-rose-500/10", border: "border-rose-400/40",
    desc: "6 человек пишут по 3 идеи за 5 минут, затем передают лист соседу — тот дополняет. Итого: до 108 идей за 30 минут.",
    use: "Поиск большого количества идей без давления группы",
  },
];

// ─── Уровни контрактов ───────────────────────────────────────────────────────
const CONTRACTS = [
  {
    level: "Административный", color: "#94a3b8", bg: "bg-slate-500/10", border: "border-slate-400/40",
    items: ["Место и время встреч", "Стоимость и оплата", "Конфиденциальность", "Формат онлайн/офлайн"],
  },
  {
    level: "Профессиональный", color: "#3b82f6", bg: "bg-blue-500/10", border: "border-blue-400/40",
    items: ["Формат работы (коучинг / менторинг / консультирование)", "Ожидаемые результаты", "Роли участников", "Критерии успеха"],
  },
  {
    level: "Коучинговый", color: "#8b5cf6", bg: "bg-purple-500/10", border: "border-purple-400/40",
    items: ["Цель коучинга (что хочет команда)", "Запрос на каждую сессию", "Контракт на сессию (GROW)", "Критерии достижения цели"],
  },
];

// ─── Блок-карточка ───────────────────────────────────────────────────────────
function Card({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/40 transition-colors">
        <div>
          <div className="font-semibold text-foreground">{title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{subtitle}</div>
        </div>
        {open ? <ChevronUp size={16} className="text-muted-foreground shrink-0"/> : <ChevronDown size={16} className="text-muted-foreground shrink-0"/>}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function TeamCoaching() {
  const [activeRole, setActiveRole] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Командный коучинг"
        subtitle="Шпаргалки и инструменты для работы с группой"
      />

      {/* ── 1. Роли ведущего ── */}
      <Card title="Роли ведущего" subtitle="5 ролей — нажми чтобы увидеть признаки и когда применять">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-1">
          {ROLES.map((r, i) => (
            <button key={i} onClick={() => setActiveRole(activeRole === i ? null : i)}
              className={`rounded-xl border ${r.color} p-4 text-left transition-all`}>
              <div className="text-2xl mb-1">{r.emoji}</div>
              <div className="font-bold text-sm text-foreground">{r.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{r.task}</div>
              {activeRole === i && (
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Признаки</div>
                  <ul className="space-y-1">
                    {r.signs.map((s, j) => (
                      <li key={j} className="text-xs text-foreground flex gap-1.5">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: r.dot }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-2">Когда</div>
                  <p className="text-xs text-foreground">{r.when}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* ── 2. Психогеография ── */}
      <Card title="Психогеография" subtitle="Позиции участников и расположение коуча в пространстве">
        <div className="space-y-4 mt-1">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Типы участников</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {PSYCH_POSITIONS.map((p, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-border bg-secondary/30 p-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: p.color }}>{p.code}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-2">Расположение коуча</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {COACH_POSITIONS.map((p, i) => (
              <div key={i} className="rounded-xl border border-border bg-secondary/30 p-3">
                <div className="text-sm font-semibold text-foreground">{p.pos}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{p.tip}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── 3. Фазы Такмана ── */}
      <Card title="Фазы Такмана" subtitle="Стадии развития группы — нажми фазу чтобы увидеть признаки и действия коуча">
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          {TUCKMAN_PHASES.map((ph, i) => (
            <button key={i} onClick={() => setActivePhase(activePhase === i ? null : i)}
              className={`rounded-xl border ${ph.border} ${ph.bg} p-4 text-left transition-all`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: ph.color }}>{ph.n}</span>
                <div>
                  <div className="text-xs font-mono text-muted-foreground">{ph.en}</div>
                  <div className="font-bold text-sm text-foreground">{ph.ru}</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{ph.desc}</p>
              {activePhase === i && (
                <div className="mt-3 space-y-3 border-t border-border pt-3">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Признаки</div>
                    <ul className="space-y-1">
                      {ph.signs.map((s, j) => (
                        <li key={j} className="text-xs text-foreground flex gap-1.5">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ph.color }} />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Действия коуча</div>
                    <ul className="space-y-1">
                      {ph.coach.map((c, j) => (
                        <li key={j} className="text-xs text-foreground flex gap-1.5">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ph.color }} />{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* ── 4. Инструменты фасилитации ── */}
      <Card title="Инструменты фасилитации и модерации" subtitle="Soft-инструменты для работы с группой">
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          {FACILITATION_TOOLS.map((t, i) => (
            <div key={i} className={`rounded-xl border ${t.border} ${t.bg} p-4`}>
              <div className="font-bold text-sm text-foreground mb-1">{t.name}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border"
                style={{ borderColor: t.color + "55", color: t.color, backgroundColor: t.color + "15" }}>
                {t.use}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4 space-y-2">
          <div className="text-xs font-semibold text-foreground uppercase tracking-wide">Золотые правила</div>
          <div className="text-xs text-foreground">🕐 <span className="font-medium">Модератор:</span> «Следи за часами» — все высказались вовремя = победа.</div>
          <div className="text-xs text-foreground">✏️ <span className="font-medium">Фасилитатор:</span> «Следи за маркером» — если маркер не пишет новые идеи группы, вы просто разговариваете.</div>
          <div className="text-xs text-foreground">⚖️ <span className="font-medium">Оба:</span> «Нейтральность» — как только дал оценку, стал участником, а не ведущим.</div>
        </div>
      </Card>

      {/* ── 5. Уровни контрактов ── */}
      <Card title="Уровни контрактов" subtitle="Три уровня договорённостей в командном коучинге">
        <div className="space-y-3 mt-1">
          {CONTRACTS.map((c, i) => (
            <div key={i} className={`rounded-xl border ${c.border} ${c.bg} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <div className="font-bold text-sm text-foreground">{c.level}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {c.items.map((item, j) => (
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full border"
                    style={{ borderColor: c.color + "55", color: c.color, backgroundColor: c.color + "15" }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 6. Контакт с аудиторией ── */}
      <Card title="Контакт с аудиторией" subtitle="Ключевые элементы установления контакта с группой">
        <div className="grid sm:grid-cols-2 gap-3 mt-1">
          {[
            { title: "Раппорт", desc: "Уловить ритм аудитории. Подстроиться под темп, энергию, настроение группы прежде чем вести за собой." },
            { title: "Контакт глазами", desc: "Смотреть на каждого участника, не задерживаясь долго на одном. «Сканирование» — каждые 3–5 секунд." },
            { title: "Ценности аудитории", desc: "Говорить языком их ценностей. Узнай, что важно группе — и используй эти слова." },
            { title: "Шаблон согласия", desc: "Три раза сказать то, с чем все согласятся, — потом четвёртое предложение принимается легче." },
            { title: "Комплименты", desc: "Искренние, конкретные, своевременные. Группе и отдельным участникам за вклад и активность." },
            { title: "Энергетика речи", desc: "Темп, громкость, паузы. Меняй их осознанно — монотонность усыпляет, контраст держит внимание." },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-border bg-secondary/30 p-3">
              <div className="text-sm font-semibold text-foreground mb-0.5">{item.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Нижняя плашка */}
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <div className="font-semibold text-foreground">Командный ≠ Индивидуальный</div>
            <p className="text-sm text-muted-foreground mt-1">
              В командном коучинге навыки НЕ формируются ведущим — участники сами находят возможности. Коуч не обязан быть экспертом в теме: группа создаёт контент сама.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
