import { CheckCircle2, Lightbulb, XCircle } from "lucide-react";
import { SectionHead } from "./_shared";

const RULES = [
  { t: "Количество важнее качества", d: "Идея №40 может оказаться лучше первой. Не оцениваем и не останавливаемся рано." },
  { t: "Критика запрещена", d: "Никаких «это не сработает» на этапе генерации. Запись — да, обсуждение — потом." },
  { t: "Дикие идеи приветствуются", d: "Легче приручить смелую идею, чем расшевелить скучную." },
  { t: "Развивай чужие идеи", d: "«И…» вместо «но»: достраивайте, комбинируйте, улучшайте." },
];

const FORMATS = [
  { t: "Классический штурм", d: "Группа 4–8 человек, 1 ведущий, 15–30 минут генерации + отбор. Ведущий фиксирует ВСЕ идеи на видном месте." },
  { t: "Брейнрайтинг 6-3-5", d: "6 участников, каждый пишет 3 идеи, лист идёт по кругу 5 раз. Итого 108 идей за 30 минут, без доминирования громких голосов." },
  { t: "Обратный штурм", d: "«Как сделать проблему хуже?» — потом инвертировать ответы в решения. Снимает зажим и отлично находит скрытые риски." },
  { t: "SCAMPER", d: "7 линий-подсказок: Замени, Комбинируй, Адаптируй, Модифицируй, Используй иначе, Убери, Разверни. Идеи по каждой букве." },
  { t: "Штурм в движении", d: "Смена места, ходьба, работа стоя — тело в движении усиливает дивергентное мышление." },
];

const PHASES = [
  { n: 1, t: "ПОДГОТОВКА", d: "Чётко сформулировать задачу («Как нам…?», не «Почему не…?»), выбрать ведущего, установить тайминг и правила." },
  { n: 2, t: "ГЕНЕРАЦИЯ", d: "Только идеи, только «да». Все пишут и говорят, ведущий фиксирует, таймер держит темп. Запрещены оценки даже молчанием." },
  { n: 3, t: "ОТБОР", d: "Группировка похожих, голосование (стикеры/баллы), выбор 3–5 сильных кандидатов." },
  { n: 4, t: "ДЕЙСТВИЕ", d: "Для каждого кандидата: первый шаг, ответственный, срок. Иначе штурм — развлечение, а не инструмент." },
];

const MISTAKES = [
  "Смешивают генерацию и критику — идеи гибнут на взлёте",
  "Размытая задача: «давайте подумаем о маркетинге»",
  "Доминирует начальник или самый громкий — остальные молчат",
  "Штурм без отбора и действий: 50 идей и ни одного шага",
  "Фиксации нет — лучшая идея забыта через 10 минут",
];

function Brainstorm() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Брейнсторминг и креативность" subtitle="Правила · форматы · фазы · типичные ошибки" />

      <div className="grid sm:grid-cols-2 gap-3">
        {RULES.map((r, i) => (
          <div key={i} className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
            <div className="font-extrabold text-sm mb-1"><span className="text-amber-600">{i + 1}.</span> {r.t}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.d}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">4 фазы штурма</h3>
        <div className="space-y-2">
          {PHASES.map((p, i) => (
            <div key={p.n} className="flex gap-3 items-start bg-card border border-border rounded-2xl p-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center font-black shrink-0">{p.n}</div>
              <div>
                <div className="font-extrabold text-sm tracking-wide">{p.t}</div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{p.d}</p>
              </div>
              {i < 3 && <span className="hidden sm:block self-center text-muted-foreground/40 shrink-0">↓</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FORMATS.map((f) => (
          <div key={f.t} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-1.5"><Lightbulb size={15} className="text-primary shrink-0" /><div className="font-extrabold text-sm">{f.t}</div></div>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
        <div className="flex items-center gap-2 mb-3"><XCircle size={18} className="text-rose-600" /><h3 className="font-extrabold text-sm tracking-wide uppercase text-rose-700 dark:text-rose-300">Типичные ошибки</h3></div>
        <ul className="text-xs space-y-1.5">
          {MISTAKES.map((m, i) => <li key={i} className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">!</span><span>{m}</span></li>)}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          Хороший штурм — это процесс с правилами, а не «полёт фантазии». Разделите генерацию и критику, дайте каждому голос, отберите идеи честным голосованием и закончите конкретным первым шагом.
        </p>
      </div>
    </div>
  );
}

export default Brainstorm;
