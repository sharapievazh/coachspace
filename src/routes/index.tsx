import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Play, Pause, RotateCcw, Download, Target, Search, Lightbulb, Rocket,
  AlertTriangle, Heart, Triangle, Layers, MessageCircle, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: CoachSpace,
});

type TabId = "grow" | "swot" | "nlu" | "sos" | "rapport" | "session";

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: "session", label: "Сессия", icon: Sparkles },
  { id: "grow", label: "GROW", icon: Target },
  { id: "swot", label: "SWOT", icon: Layers },
  { id: "nlu", label: "Пирамида НЛУ", icon: Triangle },
  { id: "sos", label: "SOS Карпман", icon: AlertTriangle },
  { id: "rapport", label: "Раппорт / ОСВК", icon: MessageCircle },
];

function CoachSpace() {
  const [tab, setTab] = useState<TabId>("session");

  // Session timer state (lives in parent so it persists between tabs)
  const [duration, setDuration] = useState(45 * 60);
  const [remaining, setRemaining] = useState(45 * 60);
  const [running, setRunning] = useState(false);
  const [clientName, setClientName] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mmss = useMemo(() => {
    const m = Math.floor(remaining / 60).toString().padStart(2, "0");
    const s = (remaining % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, [remaining]);

  const exportSession = () => {
    const txt = `Coach Space — Протокол сессии
Дата: ${new Date().toLocaleString()}
Клиент: ${clientName || "—"}
Запрос: ${topic || "—"}
Остаток времени: ${mmss}

Заметки коуча:
${notes || "—"}
`;
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${clientName || "client"}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold">CS</div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Coach Space</h1>
              <p className="text-xs text-muted-foreground">Рабочее пространство коуча</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary">
            <div className="font-mono text-xl tabular-nums">{mmss}</div>
            <button
              onClick={() => setRunning((r) => !r)}
              className="p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
              aria-label="toggle"
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>
        <nav className="max-w-6xl mx-auto px-2 sm:px-4 flex gap-1 overflow-x-auto pb-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {tab === "session" && (
          <SessionPanel
            duration={duration}
            setDuration={(d: number) => { setDuration(d); setRemaining(d); }}
            remaining={remaining}
            running={running}
            setRunning={setRunning}
            reset={() => { setRunning(false); setRemaining(duration); }}
            mmss={mmss}
            clientName={clientName}
            setClientName={setClientName}
            topic={topic}
            setTopic={setTopic}
            notes={notes}
            setNotes={setNotes}
            exportSession={exportSession}
          />
        )}
        {tab === "grow" && <Grow />}
        {tab === "swot" && <Swot />}
        {tab === "nlu" && <Nlu />}
        {tab === "sos" && <Sos />}
        {tab === "rapport" && <Rapport />}
      </main>
    </div>
  );
}

/* ---------- Session ---------- */
function SessionPanel(p: any) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-1 bg-card rounded-2xl border border-border p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Sparkles size={18} className="text-primary" /> Таймер сессии</h2>
        <div className="text-center py-6 rounded-xl bg-secondary">
          <div className="font-mono text-5xl tabular-nums text-foreground">{p.mmss}</div>
          <div className="text-xs text-muted-foreground mt-1">из {Math.floor(p.duration/60)} мин</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => p.setRunning(!p.running)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            {p.running ? <Pause size={16}/> : <Play size={16}/>} {p.running ? "Пауза" : "Старт"}
          </button>
          <button onClick={p.reset} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-muted">
            <RotateCcw size={16}/> Сброс
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {[15, 30, 45, 60, 90].map((m) => (
            <button key={m} onClick={() => p.setDuration(m*60)}
              className={`px-3 py-1.5 text-xs rounded-md border ${p.duration===m*60 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
              {m} мин
            </button>
          ))}
        </div>
      </section>

      <section className="lg:col-span-2 bg-card rounded-2xl border border-border p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Клиент">
            <input value={p.clientName} onChange={(e)=>p.setClientName(e.target.value)}
              placeholder="Имя клиента"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
          <Field label="Запрос сессии">
            <input value={p.topic} onChange={(e)=>p.setTopic(e.target.value)}
              placeholder="Тема / цель"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
        </div>
        <Field label="Потоковый блокнот · ценностные слова, инсайты, цитаты клиента">
          <textarea value={p.notes} onChange={(e)=>p.setNotes(e.target.value)}
            rows={14}
            placeholder="Веди заметки прямо во время сессии..."
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"/>
        </Field>
        <div className="flex justify-end">
          <button onClick={p.exportSession} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            <Download size={16}/> Экспорт .txt
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}

/* ---------- GROW ---------- */
const GROW_STEPS = [
  {
    id: "G", label: "Goal", title: "Цель",
    icon: Target, time: "5–10 мин", focus: "Конкретика, измеримость, экологичность",
    questions: [
      "Какой результат сессии будет для тебя ценным?",
      "Как ты поймёшь, что цель достигнута?",
      "Зачем тебе это сейчас?",
      "Что изменится в твоей жизни, когда цель будет достигнута?",
      "Эта цель — твоя или чья-то ещё?",
    ],
  },
  {
    id: "R", label: "Reality", title: "Реальность",
    icon: Search, time: "10–15 мин", focus: "Факты без оценки, ресурсы и ограничения",
    questions: [
      "Что происходит сейчас? Опиши фактами.",
      "Что ты уже пробовал? Что сработало, что нет?",
      "Какие ресурсы у тебя есть?",
      "Что тебя останавливает на самом деле?",
      "Кто ещё вовлечён в ситуацию?",
    ],
  },
  {
    id: "O", label: "Options", title: "Возможности",
    icon: Lightbulb, time: "10–15 мин", focus: "Расширение поля выбора, креатив",
    questions: [
      "Какие варианты у тебя есть? Назови минимум 5.",
      "А если бы не было ограничений — что бы ты сделал?",
      "Что бы посоветовал в этой ситуации мудрый человек?",
      "Что ты ещё не пробовал?",
      "Какие у каждого варианта плюсы и минусы?",
    ],
  },
  {
    id: "W", label: "Will", title: "Действия",
    icon: Rocket, time: "5–10 мин", focus: "Обязательство, первый шаг, сроки",
    questions: [
      "Что ты выбираешь сделать?",
      "Какой будет первый конкретный шаг? Когда?",
      "По шкале от 1 до 10 — насколько ты привержен этому?",
      "Что может помешать и как ты с этим справишься?",
      "Кому ты расскажешь о своём решении?",
    ],
  },
];

function Grow() {
  const [active, setActive] = useState("G");
  const step = GROW_STEPS.find((s) => s.id === active)!;
  const Icon = step.icon;
  return (
    <div className="space-y-6">
      <SectionHead title="Модель GROW" subtitle="Структура коучинговой сессии по Джону Уитмору" />
      <div className="grid grid-cols-4 gap-2">
        {GROW_STEPS.map((s) => {
          const I = s.icon; const act = active===s.id;
          return (
            <button key={s.id} onClick={()=>setActive(s.id)}
              className={`p-4 rounded-xl border text-left transition-all ${act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"}`}>
              <I size={20} className="mb-2"/>
              <div className="font-bold text-2xl">{s.id}</div>
              <div className={`text-xs ${act ? "opacity-90" : "text-muted-foreground"}`}>{s.label}</div>
            </button>
          );
        })}
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon size={24}/></div>
            <div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.focus}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">⏱ {step.time}</span>
        </div>
        <ul className="mt-6 space-y-2">
          {step.questions.map((q,i)=>(
            <li key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/60 hover:bg-secondary transition-colors">
              <span className="font-mono text-primary font-bold">{i+1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- SWOT ---------- */
function Swot() {
  const cells = [
    { k: "S", title: "Strengths · Сильные стороны", color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30", q: ["В чём ты силён?", "Какие ресурсы у тебя уже есть?", "Что говорят другие о твоих сильных сторонах?"] },
    { k: "W", title: "Weaknesses · Слабые стороны", color: "bg-amber-500/10 text-amber-700 border-amber-500/30", q: ["Что тебя ограничивает?", "Чего тебе не хватает?", "Где ты чаще всего спотыкаешься?"] },
    { k: "O", title: "Opportunities · Возможности", color: "bg-sky-500/10 text-sky-700 border-sky-500/30", q: ["Какие тренды тебе на руку?", "Кто может стать союзником?", "Какие двери открыты прямо сейчас?"] },
    { k: "T", title: "Threats · Угрозы", color: "bg-rose-500/10 text-rose-700 border-rose-500/30", q: ["Что может пойти не так?", "Кто или что мешает?", "Какие риски ты избегаешь замечать?"] },
  ];
  return (
    <div className="space-y-6">
      <SectionHead title="Матрица SWOT" subtitle="Внутренняя и внешняя среда клиента" />
      <div className="grid sm:grid-cols-2 gap-4">
        {cells.map((c) => (
          <div key={c.k} className={`p-5 rounded-2xl border ${c.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-card grid place-items-center font-bold">{c.k}</span>
              <h3 className="font-semibold text-foreground">{c.title}</h3>
            </div>
            <ul className="space-y-1.5 text-sm text-foreground/80">
              {c.q.map((x,i)=><li key={i}>· {x}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold flex items-center gap-2"><Lightbulb size={18} className="text-primary"/> Мосты SWOT — от Реальности к Возможностям</h3>
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <Bridge title="S × O — Усиление" text="Как сильные стороны помогут поймать возможности?" />
          <Bridge title="S × T — Защита" text="Как сильные стороны нейтрализуют угрозы?" />
          <Bridge title="W × O — Развитие" text="Какие возможности помогут преодолеть слабости?" />
          <Bridge title="W × T — Минимизация" text="Как защититься, где слабости встречаются с угрозами?" />
        </div>
      </div>
    </div>
  );
}
function Bridge({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-3 rounded-lg bg-secondary/60">
      <div className="font-medium text-primary text-xs mb-1">{title}</div>
      <div>{text}</div>
    </div>
  );
}

/* ---------- NLU ---------- */
const NLU = [
  { name: "Окружение", desc: "Где? Когда? С кем? — контекст и условия.", q: ["Где и когда это происходит?", "Кто рядом с тобой?", "Что в твоём окружении влияет на ситуацию?"] },
  { name: "Поведение", desc: "Что я делаю? — конкретные действия.", q: ["Что именно ты делаешь?", "Как ты действуешь в этой ситуации?", "Что ты делаешь иначе, когда получается?"] },
  { name: "Способности", desc: "Как? — навыки, стратегии, состояния.", q: ["Какие навыки тебе нужны?", "Как ты это делаешь?", "Чему тебе нужно научиться?"] },
  { name: "Ценности и убеждения", desc: "Почему? — что важно и во что верю.", q: ["Почему это важно для тебя?", "Во что ты веришь относительно этой ситуации?", "Что для тебя по-настоящему ценно?"] },
  { name: "Идентичность", desc: "Кто я? — самоопределение.", q: ["Кто ты в этой роли?", "Какой человек так поступает?", "Каким ты хочешь быть?"] },
  { name: "Миссия", desc: "Ради чего? Ради кого? — смысл за пределами себя.", q: ["Ради чего большего ты это делаешь?", "Какой вклад ты вносишь?", "Что останется после тебя?"] },
];
function Nlu() {
  const [open, setOpen] = useState<number | null>(5);
  return (
    <div className="space-y-6">
      <SectionHead title="Пирамида логических уровней" subtitle="Роберт Дилтс · от окружения к миссии" />
      <div className="space-y-2">
        {NLU.slice().reverse().map((lv, idx) => {
          const realIdx = NLU.length - 1 - idx;
          const width = 40 + realIdx * 10; // narrow at top
          const isOpen = open === realIdx;
          return (
            <div key={realIdx} className="flex flex-col items-center">
              <button
                onClick={() => setOpen(isOpen ? null : realIdx)}
                style={{ width: `${width}%` }}
                className={`min-w-[60%] px-4 py-3 rounded-lg border transition-all ${isOpen ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}
              >
                <div className="font-semibold">{lv.name}</div>
                <div className={`text-xs ${isOpen ? "opacity-90" : "text-muted-foreground"}`}>{lv.desc}</div>
              </button>
              {isOpen && (
                <div className="mt-2 w-full max-w-2xl bg-card rounded-xl border border-border p-4">
                  <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Системные вопросы</div>
                  <ul className="space-y-1.5 text-sm">
                    {lv.q.map((q,i)=><li key={i}>· {q}</li>)}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- SOS Karpman ---------- */
const ROLES = [
  { name: "Спасатель", color: "border-sky-500/40 bg-sky-500/10", signs: ["Хочу помочь, даже когда не просят", "Беру ответственность за чужое", "Чувствую вину, если не вмешался"], antidote: "Спроси разрешения помочь. Предложи ресурс, а не решение.", q: ["Меня просили об этом?", "Что клиент сам может сделать?", "Чьи это чувства — мои или его?"] },
  { name: "Жертва", color: "border-amber-500/40 bg-amber-500/10", signs: ["Бессилие, «у меня ничего не получится»", "Поиск виноватых", "Жалоба без запроса на изменения"], antidote: "Верни ответственность через выбор: «Что ты выбираешь делать?»", q: ["Где здесь твой выбор?", "Что зависит от тебя?", "Чего ты хочешь вместо этого?"] },
  { name: "Преследователь", color: "border-rose-500/40 bg-rose-500/10", signs: ["Критика, давление, обвинение", "«Ты должен...»", "Сравнения не в пользу клиента"], antidote: "Замени оценку на любопытство. Вопрос вместо суждения.", q: ["Что я сейчас защищаю?", "Это про клиента или про меня?", "Как сказать это с уважением?"] },
];
function Sos() {
  return (
    <div className="space-y-6">
      <SectionHead title="SOS · Треугольник Карпмана" subtitle="Шпаргалка-предохранитель для растождествления" />
      <div className="grid md:grid-cols-3 gap-4">
        {ROLES.map((r)=>(
          <div key={r.name} className={`p-5 rounded-2xl border-2 ${r.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={18}/>
              <h3 className="font-semibold">{r.name}</h3>
            </div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Признаки</div>
            <ul className="text-sm space-y-1 mb-4">{r.signs.map((s,i)=><li key={i}>· {s}</li>)}</ul>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Антидот</div>
            <p className="text-sm mb-4 font-medium">{r.antidote}</p>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Вопросы коучу к себе</div>
            <ul className="text-sm space-y-1">{r.q.map((s,i)=><li key={i}>→ {s}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Rapport / OSVK ---------- */
function Rapport() {
  const steps = [
    { t: "1. Калибровка", d: "Замечай позу, темп речи, дыхание, ключевые слова. Без оценки." },
    { t: "2. Подстройка", d: "Мягко отзеркаль темп, громкость, ритм. Используй слова клиента." },
    { t: "3. Ведение", d: "Когда контакт установлен — задай новый темп / ракурс / вопрос." },
    { t: "4. Проверка", d: "Калибруй реакцию. Если ушёл контакт — вернись к подстройке." },
  ];
  const burger = [
    { t: "🍞 Хлеб сверху — Признание", d: "Что конкретно сработало хорошо. Фактами, без лести." },
    { t: "🥩 Начинка — Развивающая часть", d: "Что можно усилить. На поведении, не на личности. С конкретным примером." },
    { t: "🍞 Хлеб снизу — Поддержка", d: "Вера в способности. Следующий шаг, ресурс или предложение." },
  ];
  return (
    <div className="space-y-6">
      <SectionHead title="Раппорт и ОСВК" subtitle="Контакт с клиентом и развивающая обратная связь" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Heart size={18} className="text-primary"/> Раппорт · 4 шага</h3>
          <ol className="space-y-3">
            {steps.map((s,i)=>(
              <li key={i} className="p-3 rounded-lg bg-secondary/60">
                <div className="font-medium">{s.t}</div>
                <div className="text-sm text-muted-foreground">{s.d}</div>
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><MessageCircle size={18} className="text-primary"/> ОСВК · Правило гамбургера</h3>
          <ol className="space-y-3">
            {burger.map((s,i)=>(
              <li key={i} className="p-3 rounded-lg bg-secondary/60">
                <div className="font-medium">{s.t}</div>
                <div className="text-sm text-muted-foreground">{s.d}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}
