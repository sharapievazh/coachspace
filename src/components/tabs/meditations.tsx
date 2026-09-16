import { useState } from "react";
import {
  Brain, Check, Copy, HeartHandshake, ListChecks, Mic,
  Moon, Sparkles, Timer, Wind,
} from "lucide-react";
import { SectionHead } from "./_shared";

type Block = { kind: "speech" | "pause" | "dir"; text?: string };

const MEDITATION_1: Block[] = [
  { kind: "dir", text: "Голос — мягкий, медленный, тихий" },
  { kind: "speech", text: "«Позвольте себе несколько минут — только для себя." },
  { kind: "speech", text: "Если вам комфортно — прикройте глаза." },
  { kind: "speech", text: "Сделайте глубокий вдох... и плавный, медленный выдох..." },
  { kind: "speech", text: "И как будто бы с каждым выдохом вы откладываете всё, что занимало ваш ум сегодня." },
  { kind: "speech", text: "Ещё один глубокий вдох... и плавный выдох..." },
  { kind: "speech", text: "Каждый раз возвращаясь к себе — говорите внутри: \"Я здесь\"." },
  { kind: "pause" },
  { kind: "speech", text: "Скользя вниманием по своему телу — просто ощутите, как вы располагаетесь здесь, в этом месте, в этом пространстве." },
  { kind: "speech", text: "Ваше тело — это единственный дом, который вы не купите и не продадите. Это форма, в которой вы пришли в этот мир — с такой мудростью, с таким потенциалом." },
  { kind: "pause" },
  { kind: "speech", text: "Сфокусируйте внимание на правой стопе. Пятка... пальцы... Как будто бы они тёплые, расслабленные." },
  { kind: "speech", text: "Поднимаясь выше — голень, бедро правой ноги. Расслабленное. Тёплое." },
  { kind: "speech", text: "Теперь внимание на левую ногу. Пальцы, пятка, колено, бедро. Вся левая нога — расслабленная, тёплая." },
  { kind: "pause" },
  { kind: "speech", text: "Правая рука — пальцы, ладонь, запястье, предплечье, плечо. Тёплая. Расслабленная." },
  { kind: "speech", text: "Левая рука — пальцы, ладонь, запястье, предплечье, плечо. Расслабленная. Тёплая." },
  { kind: "pause" },
  { kind: "speech", text: "Ваша грудная клетка. Сделайте вдох — и позвольте себе быть здесь. Просто быть." },
  { kind: "speech", text: "Ваш живот — с каждым выдохом становится мягче, спокойнее. Снимается контроль. Внутри — хорошо и спокойно." },
  { kind: "pause" },
  { kind: "speech", text: "Ваши плечи. Разрешите себе — хотя бы на время — снять с них всё, что на них лежит. Снять ответственность. Снять погоны. И почувствовать эту лёгкость." },
  { kind: "pause" },
  { kind: "speech", text: "Ваш позвоночник — от копчика до макушки. Живой, сильный, направленный. И одновременно — расслабленный." },
  { kind: "pause" },
  { kind: "speech", text: "И представьте, что в какой-то момент вы становитесь наблюдателем. Вы делаете шаг внутри себя и смотрите на всё это — со стороны." },
  { kind: "speech", text: "С этой позиции наблюдателя — посмотрите на свои цели, свои задачи. Что является для вас самым важным? Зачем вы здесь? Что вы хотели взять, принять, получить или отдать?" },
  { kind: "pause" },
  { kind: "dir", text: "пауза 30–60 секунд" },
  { kind: "speech", text: "Из этого намерения — сделайте глубокий вдох. Плавный медленный выдох." },
  { kind: "speech", text: "И потихоньку возвращайтесь — к ощущениям в теле, в это пространство, в эту комнату." },
  { kind: "speech", text: "Вдох — я здесь. Откройте глаза, когда будете готовы»." },
];

const MEDITATION_2: Block[] = [
  { kind: "dir", text: "Клиент уже расслаблен после медитации № 1 ИЛИ сделайте 3 глубоких вдоха вместе" },
  { kind: "speech", text: "«Вспомните ту установку, которую вы назвали. Озвучьте её внутри себя — тихо, про себя." },
  { kind: "pause" },
  { kind: "speech", text: "Слушая эту установку — почувствуйте, где в теле она живёт. Может быть — грудь, живот, горло, плечи. Найдите это место." },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите на эту установку. Как она выглядит? Какого она размера, цвета, формы? Большая или маленькая? Тёмная или светлая?" },
  { kind: "pause" },
  { kind: "speech", text: "Представьте, что вы прокручиваете календарь назад. И вы находите момент — когда эта установка впервые появилась в вашей жизни." },
  { kind: "speech", text: "Сколько ей лет? Кто был рядом, когда она сформировалась? Кто-то вам её дал — или вы сами её создали?" },
  { kind: "pause" },
  { kind: "speech", text: "Изучая эту установку — спросите себя: Какое БЛАГО она мне несла? От чего она меня оберегала? Что она мне позволяла — или от чего спасала? Какие потребности она закрывала?" },
  { kind: "speech", text: "Посмотрите на её позитивное намерение. Отнеситесь к ней с уважением." },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — посмотрите на эту установку и скажите ей внутри себя:" },
  { kind: "speech", text: "\"Я благодарю тебя за всё, что ты сделала. За преданность. За то, что шла со мной столько лет. Но наши отношения подошли к завершению. Ты свободна. Я отправляю тебя в самое лучшее место для тебя. Туда, где ты сможешь отдохнуть. Ты сделала свою работу\"." },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите, с кем эта установка была связана. И скажите внутри: \"Я могу любить тебя — и без этой программы. Мне не обязательно следовать ей\"." },
  { kind: "pause" },
  { kind: "speech", text: "Представьте, как эта установка собирает вещи в чемоданчик. И уходит. Куда-то туда, где её дом. И машет вам рукой. И вы машете в ответ." },
  { kind: "pause" },
  { kind: "speech", text: "И внутри появляется пространство. Свет. Объём. Новое место." },
  { kind: "speech", text: "Возьмите большой веник — как хорошая хозяйка — и вымете всё старое, что уже не нужно. \"Всё, да. Всё, да\"." },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — позвольте себе произнести внутри ту новую установку, которую вы подготовили." },
  { kind: "dir", text: "пауза — дайте клиенту произнести её внутри 2–3 раза" },
  { kind: "speech", text: "Как она звучит? Где внутри тела вы её чувствуете?" },
  { kind: "speech", text: "Представьте, что вы готовите для неё лучшую комнату. С любовью и теплом. \"Заходи. Заходи и оставайся\"." },
  { kind: "pause" },
  { kind: "speech", text: "И новая установка находит своё место внутри вас. Располагается. Пускает корни. Даёт внутреннюю веру. Внутреннюю опору. Внутреннюю силу." },
  { kind: "pause" },
  { kind: "speech", text: "Скажите ей: \"Я буду за тобой приглядывать. Сколько тебе нужно времени, чтобы вырасти — я даю тебе всё это время. С любовью\"." },
  { kind: "pause" },
  { kind: "speech", text: "Что теперь становится возможным? Если вы начинаете жить из этой новой установки?" },
  { kind: "dir", text: "пауза" },
  { kind: "speech", text: "Сделайте глубокий вдох. Плавный медленный выдох." },
  { kind: "speech", text: "И потихоньку возвращайтесь — в это пространство, в это время, в свои руки, в своё тело." },
  { kind: "speech", text: "Сделайте глубокий, спокойный и благодарный выдох." },
  { kind: "speech", text: "Откройте глаза, когда будете готовы»." },
];

const WHEN_1 = [
  "Перед любой трансформационной работой",
  "Перед работой с убеждениями, линией времени, частями личности",
  "Когда клиент тревожен, напряжён, «в голове»",
];

const WHEN_2 = [
  "Когда выявлено конкретное ограничивающее убеждение",
  "Клиент уже назвал старую установку вслух",
  "Новая установка заранее сформулирована (ДО медитации)",
];

const PREP_1 = [
  "Тихое пространство — вас с клиентом не прервут",
  "Клиент удобно сидит или лежит, поза устойчивая",
  "Телефоны в беззвучный режим",
  "Вы сами в спокойном состоянии: дыхание ровное, голос ниже обычного",
];

const PREP_2 = [
  "Клиент называет старую установку вслух: «Я не достоин(на)...»",
  "Клиент формулирует новую установку: «Я способна...», «Я разрешаю себе...»",
  "Запишите обе формулировки — они понадобятся внутри медитации",
];

const POST_1 = [
  "Дайте клиенту 30–60 секунд тишины после выхода",
  "Спросите: «Что вы заметили?», «Где вы сейчас?»",
  "Не интерпретируйте — просто слушайте",
  "Мягко переведите внимание к цели сессии",
];

const POST_2 = [
  "Дайте клиенту тишину 1–2 минуты после выхода",
  "Спросите: «Что вы заметили?», «Что произошло?»",
  "НЕ интерпретируйте — просто слушайте",
  "Запишите новую установку — клиент произносит её вслух",
  "Договоритесь: клиент повторяет новую установку 2–3 раза в день",
];

const VOICE_TIPS = [
  "Темп: в 2 раза медленнее обычного",
  "Тон: ниже обычного, тёплый, ровный",
  "Паузы: после каждого образа — 5–10 секунд",
  "Дыхание: дышите вместе с клиентом",
  "Если клиент плачет: не останавливайте, держите пространство",
  "Если клиент молчит: это работа, не нарушайте её",
];

const SCHEME = [
  { n: 1, t: "GOAL (G в GROW)", d: "Что хочет изменить клиент?" },
  { n: 2, t: "Называем старую установку вслух", d: "" },
  { n: 3, t: "Формулируем новую установку", d: "Позитивно, настоящее время" },
  { n: 4, t: "Медитация № 1 → Расслабление", d: "7 мин" },
  { n: 5, t: "Медитация № 2 → Работа со старой установкой", d: "15–20 мин" },
  { n: 6, t: "Выход → Тишина → Вопросы", d: "" },
  { n: 7, t: "WAY FORWARD (W в GROW)", d: "Конкретные шаги" },
];

const CHECKS_KEY = "coach-space-meditation-checks";

function loadChecks(scope: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKS_KEY);
    if (raw) return (JSON.parse(raw)?.[scope] as Record<string, boolean>) || {};
  } catch {}
  return {};
}

function saveCheck(scope: string, idx: number, v: boolean) {
  try {
    const raw = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    raw[scope] = { ...(raw[scope] || {}), [idx]: v };
    localStorage.setItem(CHECKS_KEY, JSON.stringify(raw));
  } catch {}
}

function CheckList({ scope, items, accent }: { scope: string; items: string[]; accent: "violet" | "teal" }) {
  const [checks, setChecks] = useState<Record<string, boolean>>(() => loadChecks(scope));
  const toggle = (i: number) => {
    setChecks((c) => {
      const next = { ...c, [i]: !c[i] };
      saveCheck(scope, i, next[i]);
      return next;
    });
  };
  const box = accent === "violet"
    ? "border-violet-400/60 bg-violet-500/10"
    : "border-teal-400/60 bg-teal-500/10";
  const done = accent === "violet"
    ? "bg-violet-500 border-violet-500"
    : "bg-teal-500 border-teal-500";
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => {
        const on = !!checks[i];
        return (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 text-left rounded-xl border px-3 py-2.5 min-h-11 transition-colors ${
              on ? "border-border bg-muted/40" : "border-border/60 bg-background hover:bg-secondary/50"
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center shrink-0 transition-colors ${
                on ? done : box
              }`}
              aria-hidden
            >
              {on && <Check size={13} className="text-primary-foreground" strokeWidth={3} />}
            </span>
            <span className={`text-sm leading-snug ${on ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PauseMark() {
  return (
    <div className="flex items-center gap-3 py-2.5" aria-hidden>
      <div className="h-px flex-1 bg-border" />
      <span className="text-muted-foreground/40 text-xs tracking-[0.5em]">···</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function scriptToText(blocks: Block[]): string {
  return blocks
    .map((b) => (b.kind === "pause" ? "..." : b.kind === "dir" ? `[${b.text}]` : b.text || ""))
    .join("\n");
}

function CopyButton({ blocks, accent }: { blocks: Block[]; accent: "violet" | "teal" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(scriptToText(blocks)).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      },
      () => {}
    );
  };
  const cls = accent === "violet"
    ? "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-400/40 hover:bg-violet-500/20"
    : "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-400/40 hover:bg-teal-500/20";
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl border text-sm font-semibold transition-colors ${cls}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Скопировано" : "Копировать скрипт"}
    </button>
  );
}

function WhenCard({ items, icon, title }: { items: string[]; icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2.5">
        {icon}
        <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((w) => (
          <li key={w} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VoiceMemo() {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Mic size={17} className="text-amber-600 dark:text-amber-400" />
        <h3 className="text-xs font-extrabold tracking-widest uppercase text-amber-700 dark:text-amber-300">
          Памятка голоса коуча
        </h3>
      </div>
      <ul className="space-y-1.5">
        {VOICE_TIPS.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
            <Check size={14} className="mt-1 text-amber-600 dark:text-amber-400 shrink-0" strokeWidth={3} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MeditationView({
  badge, title, description, duration, when, prep, post, blocks, accent, prepTitle,
}: {
  badge: string; title: string; description: string; duration: string;
  when: string[]; prep: string[]; post: string[]; blocks: Block[];
  accent: "violet" | "teal"; prepTitle: string;
}) {
  const ring = accent === "violet"
    ? "border-violet-400/40 bg-violet-500/10"
    : "border-teal-400/40 bg-teal-500/10";
  const badgeText = accent === "violet" ? "text-violet-700 dark:text-violet-300" : "text-teal-700 dark:text-teal-300";
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl border p-4 sm:p-5 ${ring}`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-[11px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-background/70 ${badgeText}`}>
            {badge}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-muted-foreground">
            <Timer size={13} /> {duration}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
      </div>

      {/* When to use */}
      <WhenCard
        title="Когда использовать"
        icon={accent === "violet" ? <Moon size={16} className="text-violet-600 dark:text-violet-400" /> : <Brain size={16} className="text-teal-600 dark:text-teal-400" />}
        items={when}
      />

      {/* Prep checklist */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <ListChecks size={16} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">{prepTitle}</h3>
        </div>
        <CheckList scope={badge + "-prep"} items={prep} accent={accent} />
      </div>

      {/* Script */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-extrabold text-sm tracking-wide uppercase">Скрипт</h3>
          <CopyButton blocks={blocks} accent={accent} />
        </div>
        <div className="max-w-prose">
          {blocks.map((b, i) => {
            if (b.kind === "pause") return <PauseMark key={i} />;
            if (b.kind === "dir")
              return (
                <p key={i} className="italic text-xs text-muted-foreground/80 py-1 select-none">
                  [{b.text}]
                </p>
              );
            return (
              <p key={i} className="text-[15px] leading-8 text-foreground/90 py-1.5">
                {b.text}
              </p>
            );
          })}
        </div>
      </div>

      {/* Post-meditation */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <HeartHandshake size={16} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">После медитации</h3>
        </div>
        <CheckList scope={badge + "-post"} items={post} accent={accent} />
      </div>

      <VoiceMemo />
    </div>
  );
}

function Meditations() {
  const [view, setView] = useState<"relax" | "beliefs">("relax");

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Медитации" subtitle="Скрипты для трансформационных сессий" />

      {/* Segmented switcher */}
      <div className="inline-flex w-full max-w-md rounded-xl bg-secondary p-1">
        {([
          { id: "relax", label: "Расслабление" },
          { id: "beliefs", label: "Работа с убеждениями" },
        ] as const).map((s) => (
          <button
            key={s.id}
            onClick={() => setView(s.id)}
            className={`flex-1 min-h-11 px-3 rounded-lg text-sm font-semibold transition-all ${
              view === s.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {view === "relax" ? (
        <MeditationView
          badge="Медитация № 1"
          title="Расслабление и возврат к себе"
          description="Входная медитация. Используется в начале трансформационной сессии для введения клиента в альфа-состояние."
          duration="7–10 минут"
          when={WHEN_1}
          prep={PREP_1}
          prepTitle="Подготовка (до начала)"
          post={POST_1}
          blocks={MEDITATION_1}
          accent="violet"
        />
      ) : (
        <MeditationView
          badge="Медитация № 2"
          title="Работа со старой установкой"
          description="Трансформационная медитация. Используется для замены ограничивающих убеждений. Проводить после медитации № 1."
          duration="15–20 минут"
          when={WHEN_2}
          prep={PREP_2}
          prepTitle="Подготовка (до начала медитации)"
          post={POST_2}
          blocks={MEDITATION_2}
          accent="teal"
        />
      )}

      {/* Session scheme */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Wind size={18} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">
            Схема трансформационной сессии
          </h3>
        </div>
        <div className="space-y-2">
          {SCHEME.map((s) => (
            <div key={s.n} className="flex gap-3 items-start bg-background/60 border border-border/60 rounded-xl px-3 py-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-black shrink-0">
                {s.n}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold leading-snug">{s.t}</div>
                {s.d && <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center pb-2">
        <Sparkles size={13} className="text-primary/60 shrink-0" />
        Отметки в чек-листах сохраняются — можно вести сессию прямо с телефона.
      </p>
    </div>
  );
}

export default Meditations;
