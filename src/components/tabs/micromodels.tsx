import { useState } from "react";
import { Target, Search, Lightbulb, Map, ChevronRight, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { SectionHead } from "./_shared";

// ─── Data ────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: "G", label: "Goals", ru: "Цели",         icon: Target,    color: "from-emerald-500 to-teal-500" },
  { id: "R", label: "Reality", ru: "Реальность",  icon: Search,    color: "from-sky-500 to-blue-600" },
  { id: "O", label: "Options", ru: "Возможности", icon: Lightbulb, color: "from-amber-500 to-orange-500" },
  { id: "W", label: "Ways",    ru: "Пути",         icon: Map,       color: "from-violet-500 to-indigo-600" },
];

// ── G: Goals ─────────────────────────────────────────────────────────────────

const SMART = [
  { letter: "S", word: "Specific",    ru: "Конкретная",    desc: "Цель сформулирована конкретно: что именно, где, когда, с кем?" },
  { letter: "M", word: "Measurable",  ru: "Измеримая",     desc: "Как поймём, что цель достигнута? Числа, факты, критерии." },
  { letter: "A", word: "Achievable",  ru: "Достижимая",    desc: "Цель амбициозна, но реалистична с учётом ресурсов клиента." },
  { letter: "R", word: "Relevant",    ru: "Актуальная",    desc: "Эта цель важна для клиента именно сейчас? Соответствует его ценностям?" },
  { letter: "T", word: "Time-bound",  ru: "Ограниченная по времени", desc: "Есть дедлайн: к какой дате, через сколько?" },
];

const PURE = [
  { letter: "P", word: "Positive",   ru: "Позитивная",    desc: "Цель сформулирована «к чему-то», а не «от чего-то». Не «перестать бояться», а «быть уверенным»." },
  { letter: "U", word: "Understood", ru: "Понятная",      desc: "Цель ясна и однозначна — и для клиента, и для коуча. Нет двусмысленности." },
  { letter: "R", word: "Relevant",   ru: "Актуальная",    desc: "Цель значима для клиента, связана с его жизнью и ценностями." },
  { letter: "E", word: "Ethical",    ru: "Этичная",       desc: "Цель не причиняет вреда другим. Соответствует этическим принципам." },
];

const CLEAR = [
  { letter: "C", word: "Challenging",          ru: "Вызывающая",    desc: "Цель амбициозна, развивает клиента, выводит из зоны комфорта." },
  { letter: "L", word: "Legal",                ru: "Законная",       desc: "Достижение цели не нарушает законодательство." },
  { letter: "E", word: "Environmentally sound",ru: "Экологичная",    desc: "Цель учитывает влияние на окружение клиента — семью, коллег, среду." },
  { letter: "A", word: "Appropriate",          ru: "Уместная",       desc: "Цель соответствует контексту и роли клиента." },
  { letter: "R", word: "Recorded",             ru: "Зафиксированная",desc: "Цель записана — это повышает ответственность и помогает отслеживать прогресс." },
];

// ── R: Reality ───────────────────────────────────────────────────────────────

const LOOPS_4 = [
  { n: 1, title: "Поведение ↔ Окружение",         desc: "Что клиент делает и в каком контексте. Что происходит снаружи?" },
  { n: 2, title: "Способности ↔ Убеждения",        desc: "Как клиент думает и что умеет. Какие убеждения влияют на его выборы?" },
  { n: 3, title: "Ценности ↔ Идентичность",        desc: "Что для клиента важно? Кем он себя считает? Что соответствует его «Я»?" },
  { n: 4, title: "Миссия ↔ Система",               desc: "Ради чего это всё? Как клиент связан с чем-то большим, чем он сам?" },
];

const POSITIONS_4 = [
  { n: "1", label: "Я",          desc: "Собственная точка зрения. Мои ощущения, мои чувства, моя реальность." },
  { n: "2", label: "Другой",     desc: "Позиция другого человека. «Как это видит он?» Развивает эмпатию." },
  { n: "3", label: "Наблюдатель",desc: "Нейтральный взгляд извне. «Что видит посторонний?» Выход из эмоций." },
  { n: "4", label: "Система",    desc: "Взгляд с позиции всей системы. «Что происходит в целом?» Масштаб." },
];

const SIX_P = [
  { p: "Product",   ru: "Продукт",    desc: "Что именно предлагает клиент? Какова ценность?" },
  { p: "Price",     ru: "Цена",       desc: "Сколько это стоит и почему?" },
  { p: "Place",     ru: "Место",      desc: "Где и как клиент работает с людьми?" },
  { p: "Promotion", ru: "Продвижение",desc: "Как люди узнают о клиенте?" },
  { p: "People",    ru: "Люди",       desc: "Кто вовлечён — клиенты, партнёры, команда?" },
  { p: "Process",   ru: "Процесс",    desc: "Как именно устроена работа?" },
];

const BSC_4 = [
  { n: "1", label: "Финансы",             desc: "Какие финансовые результаты важны? Выручка, прибыль, ROI." },
  { n: "2", label: "Клиенты",             desc: "Кто наши клиенты? Что для них ценно? Как мы их удовлетворяем?" },
  { n: "3", label: "Внутренние процессы", desc: "В чём мы должны быть превосходны? Что улучшать внутри?" },
  { n: "4", label: "Обучение и рост",     desc: "Как развиваемся? Компетенции, знания, культура." },
];

// ── O: Opportunities ──────────────────────────────────────────────────────────

const THREE_PATHS = [
  { n: 1, title: "Мозговой штурм",        desc: "Генерация всех идей без цензуры. Количество важнее качества на первом этапе." },
  { n: 2, title: "Анализ ресурсов",       desc: "«Что у вас уже есть?» — знания, связи, опыт, сильные стороны, которые можно использовать." },
  { n: 3, title: "Работа с ограничениями",desc: "Переформулировать ограничения в возможности: «Что стало бы возможным, если бы этого препятствия не было?»" },
];

const CREATIVE_STEPS = [
  { n: 1, label: "Подготовка",   desc: "Сбор информации, погружение в задачу, изучение контекста." },
  { n: 2, label: "Инкубация",    desc: "Время на осмысление. Мозг работает неосознанно — важно дать паузу." },
  { n: 3, label: "Инсайт",       desc: "Озарение, идея. Часто приходит неожиданно — в покое, на прогулке." },
  { n: 4, label: "Верификация",  desc: "Проверка и оформление идеи: реалистична ли она? Как воплотить?" },
];

const THREE_GROUPINGS = [
  { n: 1, title: "По энергии",           desc: "Что вдохновляет больше всего? Начинаем с того, что даёт силы." },
  { n: 2, title: "По ресурсам",          desc: "Что легче реализовать прямо сейчас? Где меньше всего препятствий?" },
  { n: 3, title: "По приоритетам",       desc: "Что даст наибольший эффект? Соответствие целям и ценностям клиента." },
];

// ── W: Ways ───────────────────────────────────────────────────────────────────

const WAYS_PLAN = [
  { n: 1, label: "Первые конкретные шаги",  q: "Какой первый шаг вы сделаете? Что именно? Когда?" },
  { n: 2, label: "Необходимые ресурсы",     q: "Что вам понадобится? Знания, люди, время, деньги?" },
  { n: 3, label: "Возможные препятствия",   q: "Что может помешать? Как вы с этим справитесь?" },
  { n: 4, label: "Поддержка",               q: "Кто и как может вас поддержать на этом пути?" },
  { n: 5, label: "Ответственность",         q: "Как вы будете держать себя в ответственности? Перед кем отчитаетесь?" },
  { n: 6, label: "Контрольные точки",       q: "Когда проверим прогресс? Что будет маркером успеха через 30 дней?" },
];

// ─── Components ───────────────────────────────────────────────────────────────

function AcronymCard({ data, color }: { data: { letter: string; word: string; ru: string; desc: string }[]; color: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {data.map((row) => (
        <button
          key={row.letter}
          onClick={() => setOpen(open === row.letter ? null : row.letter)}
          className="w-full flex items-start gap-3 bg-card border border-border rounded-2xl p-3 text-left hover:border-primary/40 transition-all"
        >
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} text-white grid place-items-center text-sm font-extrabold shrink-0`}>
            {row.letter}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-foreground">{row.word} <span className="text-muted-foreground font-normal">— {row.ru}</span></div>
            {open === row.letter && (
              <div className="text-sm text-foreground/80 mt-1 leading-relaxed">{row.desc}</div>
            )}
          </div>
          <ChevronRight size={15} className={`shrink-0 mt-0.5 text-muted-foreground transition-transform ${open === row.letter ? "rotate-90" : ""}`} />
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Micromodels() {
  const [step, setStep] = useState("G");
  const [gTab, setGTab] = useState<"SMART" | "PURE" | "CLEAR">("SMART");
  const [rTab, setRTab] = useState<"loops" | "positions" | "6p" | "bsc" | "mission">("loops");

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Микромодели коучинга" subtitle="По шагам модели GROW · G · R · O · W" />

      {/* Info banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-5">
        <Info className="absolute right-5 top-4 text-primary/20" size={26} />
        <p className="text-sm text-foreground/85 leading-relaxed">
          Микромодели — инструменты для каждого шага GROW. Они делают каждый шаг глубже и конкретнее. Выберите шаг ниже.
        </p>
      </div>

      {/* Step selector */}
      <div className="grid grid-cols-4 gap-2">
        {STEPS.map((s) => {
          const act = step === s.id;
          const I = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`p-3 rounded-2xl border text-center transition-all ${
                act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl mx-auto mb-1.5 grid place-items-center text-white ${act ? "bg-white/20" : `bg-gradient-to-br ${s.color}`}`}>
                <I size={18} />
              </div>
              <div className={`text-sm font-black ${act ? "" : "text-foreground"}`}>{s.id}</div>
              <div className={`text-[10px] font-semibold mt-0.5 ${act ? "opacity-80" : "text-muted-foreground"}`}>{s.ru}</div>
            </button>
          );
        })}
      </div>

      {/* ── G ── */}
      {step === "G" && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">Микромодели шага «Goals» — постановка цели</div>
          <div className="flex gap-1">
            {(["SMART", "PURE", "CLEAR"] as const).map((t) => (
              <button key={t} onClick={() => setGTab(t)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border ${gTab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`}>
                {t}
              </button>
            ))}
          </div>
          {gTab === "SMART" && (
            <>
              <div className="text-xs text-muted-foreground px-1">Классическая модель постановки цели — самая распространённая</div>
              <AcronymCard data={SMART} color="from-emerald-500 to-teal-500" />
            </>
          )}
          {gTab === "PURE" && (
            <>
              <div className="text-xs text-muted-foreground px-1">Акцент на экологичности и позитивной формулировке цели</div>
              <AcronymCard data={PURE} color="from-sky-500 to-blue-600" />
            </>
          )}
          {gTab === "CLEAR" && (
            <>
              <div className="text-xs text-muted-foreground px-1">Акцент на амбициозности, экологии и фиксации цели</div>
              <AcronymCard data={CLEAR} color="from-violet-500 to-indigo-600" />
            </>
          )}
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-2">
            <ChevronRight size={15} className="text-primary mt-0.5 shrink-0" />
            <div className="text-sm text-foreground/85">
              <span className="font-bold">Как использовать:</span> SMART — универсальный старт. PURE — когда нужна особая экологичность. CLEAR — когда цель должна быть вызовом.
            </div>
          </div>
        </div>
      )}

      {/* ── R ── */}
      {step === "R" && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">Микромодели шага «Reality» — исследование реальности</div>
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-5">
            {([
              { id: "loops", label: "4 петли" },
              { id: "positions", label: "4 позиции" },
              { id: "6p", label: "Маркетинг 6P" },
              { id: "bsc", label: "Scorecard" },
              { id: "mission", label: "Миссия" },
            ] as const).map((t) => (
              <button key={t.id} onClick={() => setRTab(t.id)}
                className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition-all border ${rTab === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {rTab === "loops" && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground px-1">4 петли коучинг-взаимодействия на основе нейрологических уровней Дилтса</div>
              {LOOPS_4.map((l) => (
                <div key={l.n} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white grid place-items-center text-sm font-bold shrink-0">{l.n}</div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{l.title}</div>
                    <div className="text-sm text-foreground/75 mt-0.5">{l.desc}</div>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
                <div className="text-xs font-bold text-sky-700 dark:text-sky-300 mb-1">Связь с НЛУ</div>
                <div className="text-sm text-foreground/85">Каждая петля соответствует паре нейрологических уровней Дилтса. Коуч работает там, где «застрял» клиент.</div>
              </div>
            </div>
          )}

          {rTab === "positions" && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground px-1">4-позиционное описание реальности — взгляд с разных точек</div>
              {POSITIONS_4.map((p) => (
                <div key={p.n} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white grid place-items-center text-sm font-bold shrink-0">{p.n}</div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{p.label}</div>
                    <div className="text-sm text-foreground/75 mt-0.5">{p.desc}</div>
                  </div>
                </div>
              ))}
              <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
                <div className="text-sm text-foreground/85">
                  <span className="font-bold">Вопрос коуча:</span> «Если смотреть на эту ситуацию глазами наблюдателя — что вы видите?»
                </div>
              </div>
            </div>
          )}

          {rTab === "6p" && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground px-1">Маркетинг-микст 6P — анализ реальности в бизнес-контексте</div>
              {SIX_P.map((p) => (
                <div key={p.p} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white grid place-items-center text-xs font-bold shrink-0">P</div>
                  <div>
                    <div className="text-xs font-bold text-foreground">{p.p} — {p.ru}</div>
                    <div className="text-sm text-foreground/75">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {rTab === "bsc" && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground px-1">Balanced Scorecard — 4 перспективы оценки реальности организации</div>
              {BSC_4.map((b) => (
                <div key={b.n} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white grid place-items-center text-sm font-bold shrink-0">{b.n}</div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{b.label}</div>
                    <div className="text-sm text-foreground/75 mt-0.5">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {rTab === "mission" && (
            <div className="space-y-3">
              <div className="text-xs text-muted-foreground px-1">Концепция личной и корпоративной миссии</div>
              {[
                { label: "Личная миссия", desc: "Ради чего я живу и работаю? Что я привношу в мир, просто существуя? Уникальный вклад человека." },
                { label: "Корпоративная миссия", desc: "Зачем существует эта организация? Какую проблему она решает в мире? Смысл за пределами прибыли." },
                { label: "Коучинговые вопросы", desc: "«Что будет потеряно в мире, если вас/компании не станет? За что вы готовы работать бесплатно? Что вы делаете лучше всего и что при этом ощущаете?»" },
              ].map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{m.label}</div>
                  <div className="text-sm text-foreground/85">{m.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── O ── */}
      {step === "O" && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">Микромодели шага «Options» — поиск возможностей</div>

          <div className="text-sm font-bold text-foreground px-1">3 пути поиска новых возможностей</div>
          {THREE_PATHS.map((p) => (
            <div key={p.n} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white grid place-items-center text-sm font-bold shrink-0">{p.n}</div>
              <div>
                <div className="text-sm font-bold text-foreground">{p.title}</div>
                <div className="text-sm text-foreground/75 mt-0.5">{p.desc}</div>
              </div>
            </div>
          ))}

          <div className="text-sm font-bold text-foreground px-1 mt-2">Шаги креативного процесса</div>
          <div className="grid grid-cols-2 gap-2">
            {CREATIVE_STEPS.map((s) => (
              <div key={s.n} className="bg-card border border-border rounded-2xl p-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white grid place-items-center text-xs font-bold mb-2">{s.n}</div>
                <div className="text-xs font-bold text-foreground">{s.label}</div>
                <div className="text-xs text-foreground/70 mt-0.5">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="text-sm font-bold text-foreground px-1 mt-2">3 подхода группировки возможностей</div>
          {THREE_GROUPINGS.map((g) => (
            <div key={g.n} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
              <ArrowRight size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <div className="text-sm font-bold text-foreground">{g.title}</div>
                <div className="text-sm text-foreground/75">{g.desc}</div>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">Метод декартовых координат</div>
            <div className="text-sm text-foreground/85">Работает в разделе «Инструменты → Квадрат Декарта». Анализ возможности через 4 вопроса: что будет / не будет если да / нет.</div>
          </div>
        </div>
      )}

      {/* ── W ── */}
      {step === "W" && (
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">Микромодели шага «Ways» — создание реалистичного плана</div>
          <div className="bg-card border border-border rounded-2xl p-4 mb-2">
            <div className="text-sm text-foreground/85">Задача коуча на этом шаге — помочь клиенту создать конкретный, реалистичный план, а не просто договориться о намерениях. Каждый пункт ниже — отдельный вопрос к клиенту.</div>
          </div>
          {WAYS_PLAN.map((w) => (
            <div key={w.n} className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white grid place-items-center text-sm font-bold shrink-0">{w.n}</div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{w.label}</div>
                <div className="text-sm text-foreground/85 italic">«{w.q}»</div>
              </div>
            </div>
          ))}
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
            <div className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-1">Принцип реалистичного плана</div>
            <div className="text-sm text-foreground/85">Лучше маленький конкретный шаг, который клиент точно сделает, чем большой амбициозный, который он не начнёт. Первый шаг — ключ.</div>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-2">
            <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
            <div className="text-sm text-foreground/85">
              <span className="font-bold">4 стратегии мотивации по Риссу:</span> у каждого клиента своя ведущая мотивация. Спросите: «Что вам даёт это достижение?» — ответ покажет, какая ценность двигает клиентом.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
