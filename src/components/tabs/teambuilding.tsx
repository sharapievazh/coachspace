import { CheckCircle2, Flag, HeartHandshake, Sparkles, TrendingUp, Users, Waves } from "lucide-react";
import { SectionHead } from "./_shared";

const STAGES = [
  {
    n: 1, t: "ФОРМИРОВАНИЕ", tone: "bg-sky-500/10 border-sky-500/30", ic: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
    signs: ["Вежливость, осторожность", "Люди ждут указаний", "Знакомство и границы", "Тревога «а как тут принято?»"],
    coach: "Ясная цель, роли и правила. Много структуры: кто, что, к чему. Фасилитация знакомства, создание безопасности.",
  },
  {
    n: 2, t: "ШТОРМ", tone: "bg-rose-500/10 border-rose-500/30", ic: "bg-rose-500/20 text-rose-700 dark:text-rose-300",
    signs: ["Споры о целях и ролях", "Коалиции и конфликты", "Проверка лидера на прочность", "Сопротивление задачам"],
    coach: "Не глушить конфликт, а вывести в открытую работу: правила обсуждения, фокус на интересах. Признать эмоции, вернуть к общей цели.",
  },
  {
    n: 3, t: "НОРМИРОВАНИЕ", tone: "bg-amber-500/10 border-amber-500/30", ic: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
    signs: ["Свои правила взаимодействия", "Компромиссы и договорённости", "Роли устаканились", "Растёт доверие"],
    coach: "Закрепить нормы явно: регламент, ценности команды, формат обратной связи. Отмечать успехи следования нормам.",
  },
  {
    n: 4, t: "ДЕЙСТВИЕ", tone: "bg-emerald-500/10 border-emerald-500/30", ic: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    signs: ["Высокая автономия", "Фокус на результате", "Взаимовыручка", "Конфликты решаются конструктивно"],
    coach: "Дать свободу и амбициозные цели. Коучинг отдельных участников на рост, поддержка лидерства внутри команды.",
  },
  {
    n: 5, t: "ЗАВЕРШЕНИЕ", tone: "bg-violet-500/10 border-violet-500/30", ic: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    signs: ["Проект закончен / расформирование", "Итоги и признание вклада", "Грусть, прощание"],
    coach: "Рефлексия достижений, признание вклада каждого, передача опыта. Завершить красиво — это тоже навык команды.",
  },
];

const MARKERS = [
  "Общая цель, понятная каждому — «зачем мы вместе»",
  "Роли и зоны ответственности без дыр и дублей",
  "Безопасная прямая обратная связь внутри команды",
  "Решения принимаются быстро и не пересматриваются без причин",
  "Ошибки разбираются без поиска виноватых",
  "Команда отдыхает и празднует вместе",
];

function Teambuilding() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Командообразование" subtitle="Модель Такмана · коучинговые интервенции по стадиям команды" />

      <div className="space-y-3">
        {STAGES.map((s, i) => (
          <div key={s.n} className={`rounded-2xl border p-4 ${s.tone}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-xl grid place-items-center font-black shrink-0 ${s.ic}`}>{s.n}</div>
              <div className="font-extrabold tracking-wide text-sm">{s.t}</div>
              {i === 1 && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-500/10 border border-rose-500/30 rounded-full px-2 py-0.5">самая уязвимая стадия</span>}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-80 mb-1">Признаки</div>
                <ul className="text-xs space-y-0.5">{s.signs.map((x, j) => <li key={j}>· {x}</li>)}</ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">Работа коуча</div>
                <p className="text-xs leading-relaxed">{s.coach}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><Sparkles size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Маркеры здоровой команды</h3></div>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {MARKERS.map((m, i) => (
            <div key={i} className="flex gap-2 items-start bg-secondary/60 rounded-lg px-3 py-2"><CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" /><span>{m}</span></div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2"><Users size={18} className="text-primary" /><h4 className="font-extrabold text-sm uppercase tracking-wide">Командные вопросы</h4></div>
          <ul className="text-xs space-y-1.5">
            {["Куда мы идём и зачем нам это вместе?", "Какие правила взаимодействия мы выбираем?", "Что каждый из нас делает лучше всех?", "Что мешает работать быстрее?"].map((q, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary shrink-0">·</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2"><Waves size={18} className="text-primary" /><h4 className="font-extrabold text-sm uppercase tracking-wide">Инструменты</h4></div>
          <ul className="text-xs space-y-1.5">
            {["Командный GROW", "Круг обратной связи", "Матрица ролей команды", "Карта доверия", "Ретроспектива спринта"].map((q, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary shrink-0">·</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 mb-2"><HeartHandshake size={18} className="text-emerald-600" /><h4 className="font-extrabold text-sm uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Итог</h4></div>
          <p className="text-xs leading-relaxed">
            Команда не «собирается» — она взрослеет через стадии. Задача коуча — диагностировать стадию и дать ровно ту интервенцию, которая нужна сейчас: структуру, контейнер для конфликта, норму или свободу.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Teambuilding;
