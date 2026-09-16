import { ArrowDown, Clock, History, Map, RotateCcw, Sparkles } from "lucide-react";
import { SectionHead } from "./_shared";

const TYPES = [
  {
    t: "IN TIME («во времени»)", tone: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300",
    d: "Линия времени проходит через «здесь и сейчас». Полное погружение в момент, живость переживаний.",
    plus: ["Живёт настоящим", "Сильное погружение в опыт", "Гибкость в планировании"],
    minus: ["Может опаздывать", "Трудно «отстраниться» от текущих эмоций"],
  },
  {
    t: "THROUGH TIME («сквозь время»)", tone: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
    d: "Видит свою линию времени со стороны — прошлое, настоящее и будущее как карта перед глазами.",
    plus: ["Сильное планирование", "Пунктуальность", "Легко хранит записи и цели"],
    minus: ["Может «выпадать» из настоящего", "Меньше спонтанности и эмоций"],
  },
];

const STEPS = [
  { n: 1, t: "Калибровка линии", d: "«Представьте своё прошлое — где оно? Будущее — где?» Определяем направление и форму линии клиента." },
  { n: 2, t: "Ресурс из прошлого", d: "Найти момент силы/успеха и перенести его ресурс в настоящую точку линии." },
  { n: 3, t: "Точка настоящего", d: "Осознать, где клиент сейчас: что уже пройдено, что чувствует, чего не хватает." },
  { n: 4, t: "Точка будущего", d: "Поместить цель на линию: конкретная дата, картина результата, ощущения в теле." },
  { n: 5, t: "Взгляд из будущего", d: "Клиент «встаёт» в точку цели и оглядывается: «Как я сюда пришёл? Что было ключевым?»" },
  { n: 6, t: "Протяжка в действие", d: "Вернуться в настоящее и зафиксировать первый шаг. Что изменится уже на этой неделе?" },
];

const QUESTIONS = [
  "Где находится ваше прошлое? А будущее? (определение формы линии)",
  "В какой момент прошлого вы были на пике своей силы? Что вы чувствовали?",
  "Если взять этот ресурс с собой — как меняется сегодняшняя ситуация?",
  "Где на вашей линии времени стоит ваша цель? Когда именно?",
  "Вы уже достигли цели. Оглядываясь назад — как вы к этому пришли?",
  "Какие качества вы приобрели на этом пути?",
  "Что было самым трудным и как вы это преодолели?",
  "Каким был первый шаг? Что вы сделаете такого же рода уже сейчас?",
];

function Timeline() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Линия времени" subtitle="Как клиент хранит время — и как использовать это в трансформации" />

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><Clock size={20} /></div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Линия времени — внутреннее представление того, как человек упорядочивает события прошлого, настоящего и будущего. Изменив восприятие линии (позиции, яркость, расстояние до целей), мы меняем мотивацию и отношение к своему пути.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {TYPES.map((t) => (
          <div key={t.t} className={`rounded-2xl border p-4 ${t.tone}`}>
            <div className="font-extrabold text-sm tracking-wide mb-2">{t.t}</div>
            <p className="text-xs leading-relaxed mb-3">{t.d}</p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div><div className="font-bold mb-1">Сильные стороны</div><ul className="space-y-0.5">{t.plus.map((x, i) => <li key={i}>· {x}</li>)}</ul></div>
              <div><div className="font-bold mb-1">Особенности</div><ul className="space-y-0.5">{t.minus.map((x, i) => <li key={i}>· {x}</li>)}</ul></div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <Map size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed">
          <span className="font-bold text-foreground">Визуализация:</span> попросите клиента представить свою линию — она может быть прямой лентой, спиралью, дорогой, рекой. Уточните направление, яркость прошлого и будущего, расстояние до целей. «Растянутое» далёкое будущее часто означает отложенную мотивацию — приблизьте цель на линии.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">Работа с линией: 6 шагов</h3>
        <div className="space-y-2">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex gap-3 items-start bg-card border border-border rounded-2xl p-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center font-black shrink-0">{s.n}</div>
              <div>
                <div className="font-extrabold text-sm tracking-wide">{s.t}</div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.d}</p>
              </div>
              {i < 5 && <ArrowDown size={14} className="hidden sm:block self-center text-muted-foreground/40 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 mb-2"><History size={18} className="text-emerald-600" /><h4 className="font-extrabold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Ресурс из прошлого</h4></div>
          <p className="text-xs leading-relaxed">Успех, который уже был, — доказательство возможности. Возвращаемся к яркому воспоминанию, усиливаем образ, звуки, ощущения — и «приносим» это состояние в текущую задачу.</p>
        </div>
        <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
          <div className="flex items-center gap-2 mb-2"><Sparkles size={18} className="text-violet-600" /><h4 className="font-extrabold text-sm uppercase tracking-wide text-violet-700 dark:text-violet-300">Ресурс из будущего</h4></div>
          <p className="text-xs leading-relaxed">Клиент входит в образ достигнутой цели и оглядывается назад: «каким я был в момент решения?» Это состояние уверенности — самый сильный мотиватор для действий сегодня.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><RotateCcw size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Вопросы для работы</h3></div>
        <ul className="space-y-2 text-sm">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-2"><span className="text-primary font-bold shrink-0">{i + 1}.</span><span>{q}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300 mb-2">Итог</div>
        <p className="text-sm leading-relaxed">
          Линия времени превращает «когда-нибудь» в конкретную точку на пути. Ресурс из прошлого даёт доказательство «я могу», взгляд из будущего — «это неизбежно». Первый шаг в настоящем связывает обе опоры.
        </p>
      </div>
    </div>
  );
}

export default Timeline;
