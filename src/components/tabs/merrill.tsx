import { Compass, Crosshair, Handshake, ShieldCheck, Users } from "lucide-react";
import { SectionHead } from "./_shared";

const AXES = [
  { a: "Напористость", b: "Внимательность", d: "Как человек проявляет себя: прямо и быстро берёт пространство — или уступает и приспосабливается." },
  { a: "Задача", b: "Отношения", d: "На чём фокус внимания: результат, факты и логика — или люди, чувства и атмосфера." },
];

const STYLES = [
  {
    name: "АНАЛИТИК", icon: ShieldCheck,
    tone: "bg-sky-500/10 border-sky-500/30", ic: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
    traits: ["Факты, цифры, логика", "Планирует, взвешивает риски", "Сдержан в эмоциях", "Любит точность и порядок"],
    speech: "«Докажите», «Какие данные?», «Сколько времени это займёт?»",
    coach: "Давайте структуру, время на обдумывание, опирайтесь на факты и критерии. Не давите на эмоции — спросите: «Какие данные подтвердят, что решение верное?»",
    avoid: "Спешка, давление, голословные утверждения, прыжки между темами.",
  },
  {
    name: "ВОДИТЕЛЬ", icon: Compass,
    tone: "bg-rose-500/10 border-rose-500/30", ic: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
    traits: ["Быстро принимает решения", "Ориентирован на результат", "Берёт контроль", "Не любит деталей без цели"],
    speech: "«Что в итоге?», «Сколько шагов?», «Сразу к делу».",
    coach: "Работайте с целями и результатом, коротко и по существу. Дайте выбор и контроль: «Какой вариант вы выбираете и почему он лучший?»",
    avoid: "Долгие лирические отступления, лишние детали, вопросы без цели.",
  },
  {
    name: "ДРУЖЕЛЮБНЫЙ", icon: Handshake,
    tone: "bg-emerald-500/10 border-emerald-500/30", ic: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    traits: ["Ценит отношения и поддержку", "Избегает конфликта", "Слушает, сочувствует", "Медленно принимает решения"],
    speech: "«Как команда?», «Что подумают коллеги?», «Нам всем спокойно?»",
    coach: "Создавайте безопасность, начинайте с отношений. Спрашивайте о его собственных желаниях: «А чего хотите ВЫ, независимо от мнения других?»",
    avoid: "Резкость, конфронтация, игнорирование чувств, давление темпом.",
  },
  {
    name: "ЭКСПРЕССИВ", icon: Users,
    tone: "bg-amber-500/10 border-amber-500/30", ic: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    traits: ["Эмоционален, харизматичен", "Генерирует идеи", "Любит признание", "Легко отвлекается"],
    speech: "«Представляешь!», «Это будет грандиозно!», «Слушай, а ещё идея…»",
    coach: "Поддерживайте энтузиазм, хвалите идеи, помогайте довести до конкретики: «Отличная идея — какой первый шаг и когда?»",
    avoid: "Сухость, занудные таблицы, обесценивание идей, монотонность.",
  },
];

function Merrill() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Типология MERRILL" subtitle="Социальные стили Меррилл-Рид — как распознать тип клиента и адаптировать коучинг" />

      <div className="grid sm:grid-cols-2 gap-3">
        {AXES.map((x) => (
          <div key={x.a} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wide text-primary">{x.a}</span>
              <span className="text-[10px] font-bold text-muted-foreground">— осям —</span>
              <span className="text-xs font-extrabold uppercase tracking-wide text-primary">{x.b}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{x.d}</p>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {STYLES.map((s) => {
          const I = s.icon;
          return (
            <div key={s.name} className={`rounded-2xl border p-4 ${s.tone}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 ${s.ic}`}><I size={20} /></div>
                <div className="font-extrabold tracking-wide text-sm">{s.name}</div>
              </div>
              <ul className="text-xs space-y-1 mb-3">
                {s.traits.map((t, i) => <li key={i} className="flex gap-1.5"><span className="opacity-60">·</span><span>{t}</span></li>)}
              </ul>
              <div className="text-[11px] mb-1"><span className="font-bold uppercase tracking-wider opacity-80">Речь-маркер:</span> <span className="italic">{s.speech}</span></div>
              <div className="mt-3 p-3 rounded-xl bg-background/70">
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">Как коучить</div>
                <p className="text-xs leading-relaxed">{s.coach}</p>
              </div>
              <div className="mt-2 text-[11px] text-muted-foreground"><span className="font-bold uppercase tracking-wider">Избегать:</span> {s.avoid}</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300 mb-2">Итог</div>
        <p className="text-sm leading-relaxed">
          Типология — не ярлык, а гипотеза. Определив стиль клиента по речи и поведению, коуч подстраивает темп, глубину и формат вопросов. Контракт остаётся у клиента — адаптируется только способ взаимодействия.
        </p>
      </div>
    </div>
  );
}

export default Merrill;
