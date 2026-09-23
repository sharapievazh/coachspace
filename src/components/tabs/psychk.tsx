import { BrainCircuit, CheckCircle2, FlaskConical, KeyRound, Repeat } from "lucide-react";
import { SectionHead } from "./_shared";

const PSYCHK_STEPS = [
  { n: 1, t: "Определение убеждения", d: "Формулируем текущее ограничивающее убеждение и желаемое («Я недостоин успеха» → «Я достоин успеха»). Проверка на языке подсознания: коротко, лично, позитивно." },
  { n: 2, t: "Коммуникация с двумя полушариями", d: "Специальные позы и тесты (контраст-тест) показывают, поддерживает ли подсознание желаемое убеждение сейчас." },
  { n: 3, t: "Баланс — процесс смены", d: "Через визуализацию, движение глаз и работу с «перекрёстным» состоянием мозга старая программа заменяется новой. Длится минуты, не требует погружения в травму." },
  { n: 4, t: "Подтверждение изменения", d: "Повторный тест: подсознание подтверждает новое убеждение. Фиксируем результат и наблюдаем изменения в жизни." },
];

const LAB = [
  { t: "Мотивация: К / От", d: "К — «достичь, получить» · От — «избежать, чтобы не было хуже». Слушать первые слова о работе и целях." },
  { t: "Направление: Варианты / Процедуры", d: "Варианты — новизна и выбор · Процедуры — проверенный порядок." },
  { t: "Критерий: Внутренняя / Внешняя референция", d: "Внутренняя — сам судит · Внешняя — нужно мнение окружения." },
  { t: "Работа: Сам / Другие", d: "Сам — «я сам сделаю» · Другие — «мы / с командой»." },
  { t: "Темп: Согласие / Несогласие", d: "Соглашатель принимает · Несоглашатель проверяет через спор." },
  { t: "Убеждение: Возможность / Необходимость", d: "Возможность — «что я могу попробовать» · Необходимость — «как правильно / как положено»." },
];

function PsychK() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="PSYCH-K / Lab-профиль" subtitle="Работа с подсознательными убеждениями и метапрограммный профайлинг" />

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><KeyRound size={20} /></div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">PSYCH-K (Роберт Уильямс)</span> — метод быстрой смены подсознательных убеждений через достижение «целостного» состояния мозга (обоих полушарий). Идея: пока подсознание не поддерживает цель, сознательные усилия дают лишь 5% результата. Метод работает через тело и образы, без длительной проработки прошлого.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">Как проходит процесс PSYCH-K</h3>
        <div className="space-y-2">
          {PSYCHK_STEPS.map((s) => (
            <div key={s.n} className="flex gap-3 items-start bg-card border border-border rounded-2xl p-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center font-black shrink-0">{s.n}</div>
              <div>
                <div className="font-extrabold text-sm tracking-wide">{s.t}</div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300 mb-2">8 областей работы с убеждениями</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {["Самооценка", "Отношения", "Процветание", "Здоровье и тело", "Карьера и призвание", "Творчество", "Духовность", "Личный потенциал"].map((a) => (
            <div key={a} className="rounded-lg bg-background/70 px-2.5 py-2 text-center font-semibold">{a}</div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 grid place-items-center shrink-0"><FlaskConical size={20} /></div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-bold text-foreground">LAB-профиль (Language and Behavior Profile)</span> — определение метапрограмм человека по его речи для конкретного контекста (работа, продажи, обучение). Позволяет подобрать «точный язык» мотивации: одни и те же слова на разных профилях действуют противоположно.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {LAB.map((l) => (
          <div key={l.t} className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
            <div className="flex items-center gap-2 mb-1.5"><BrainCircuit size={15} className="text-violet-600 shrink-0" /><div className="font-extrabold text-sm">{l.t}</div></div>
            <p className="text-xs text-muted-foreground leading-relaxed">{l.d}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><Repeat size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Границы применения</h3></div>
        <ul className="text-xs space-y-1.5">
          {[
            "PSYCH-K — не психотерапия: клинические состояния ведут профильные специалисты",
            "Изменение убеждения не заменяет навыка: новое убеждение + практика = результат",
            "LAB-профиль контекстен: профиль в работе ≠ профиль в отношениях",
            "Этика: работа с подсознанием — только с явного согласия клиента",
          ].map((x, i) => (
            <li key={i} className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>{x}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          PSYCH-K обновляет подсознательную программу, LAB-профиль даёт язык, на котором этот человек мотивируется. Вместе — быстрый вход в устойчивые изменения: убеждение поддерживает цель, а коммуникация её усиливает.
        </p>
      </div>
    </div>
  );
}

export default PsychK;
