import { Brain, CheckCircle2, ScanSearch } from "lucide-react";
import { SectionHead } from "./_shared";

const MPS = [
  {
    t: "Соглашатель / Несоглашатель", tone: "border-sky-500/30 bg-sky-500/10", ic: "text-sky-600",
    a: "Соглашатель: «Да, точно!», «Конечно» — легко принимает чужую точку зрения.",
    b: "Несоглашатель: «Да, но…» — спорит даже с очевидным, ищет расхождения.",
    use: "Несоглашателю давайте варианты на выбор — он определится через несогласие с частью. Соглашателю проверяйте собственное мнение: «А что думаете ВЫ?»",
  },
  {
    t: "Глобальный / Специфический", tone: "border-violet-500/30 bg-violet-500/10", ic: "text-violet-600",
    a: "Глобальный: «в целом», «в принципе» — видит картину целиком, крупными блоками.",
    b: "Специфический: детали, порядок, «а конкретно как?»",
    use: "Глобальному — смыслы, видение, «зачем». Специфическому — пошаговый план, сроки, критерии. Смешение уровней = потеря контакта.",
  },
  {
    t: "Лидер / Одиночка / Командный", tone: "border-amber-500/30 bg-amber-500/10", ic: "text-amber-600",
    a: "Лидер — берёт управление, направляет. Одиночка — делает сам, лучше один. Командный — раскрывается в группе.",
    b: "Определяется по тому, как человек говорит о работе: «я решу», «я сам», «мы сделаем».",
    use: "Одиночке не навязывайте «командность». Командному дайте группу поддержки. Лидеру — зону ответственности.",
  },
  {
    t: "Сам / Другой", tone: "border-rose-500/30 bg-rose-500/10", ic: "text-rose-600",
    a: "«Сам»: ориентируется на свои ощущения и критерии — «я так чувствую», «я решаю».",
    b: "«Другой»: сверяется с окружением — «что скажут?», «как принято?»",
    use: "«Другому» важна поддержка значимых людей — введите её в план. «Саму» мотивирует собственный выбор — не давите извне.",
  },
  {
    t: "Цель / Процесс", tone: "border-emerald-500/30 bg-emerald-500/10", ic: "text-emerald-600",
    a: "Цель: речь о результате и сроках — «когда сделаю».",
    b: "Процесс: удовольствие от самого занятия — «как интересно идти».",
    use: "«Цели» показывайте результат и его картинку. «Процессу» — качество пути. Человек, говорящий «хочу пробежать марафон, это же кайф», — процесс.",
  },
  {
    t: "К движению / От движения", tone: "border-indigo-500/30 bg-indigo-500/10", ic: "text-indigo-600",
    a: "«К»: мотивация достижением — «хочу получить, стать, достичь».",
    b: "«От»: мотивация избеганием — «чтобы не потерять, чтобы не было хуже».",
    use: "«К» — рисуйте яркую картину будущего. «От» — честно покажите цену бездействия. Формулировка цели в «неправильном» стиле обессиливает.",
  },
  {
    t: "Варианты / Процедуры", tone: "border-teal-500/30 bg-teal-500/10", ic: "text-teal-600",
    a: "Варианты: нужен выбор и новизна — «а есть ли другой способ?»",
    b: "Процедуры: важен проверенный порядок — «как правильно делать?»",
    use: "Вариантам давайте альтернативы. Процедурам — алгоритм и повторяемость. Внезапная смена процедур выбивает их из колеи.",
  },
  {
    t: "Внутренняя / Внешняя референция", tone: "border-orange-500/30 bg-orange-500/10", ic: "text-orange-600",
    a: "Внутренняя: судит сам — «мне ясно, что хорошо».",
    b: "Внешняя: нужна обратная связь — «ну как, нормально вышло?»",
    use: "Внешней референции давайте регулярную обратную связь. Внутренней — не засоряйте оценками, спросите: «Вы сами как оцениваете?»",
  },
];

function Metaprograms() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Метапрограммы" subtitle="Внутренние фильтры восприятия — как слышать и адаптироваться" />

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><Brain size={20} /></div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Метапрограммы — устойчивые фильтры, через которые человек воспринимает и упорядочивает информацию. Они слышны в речи за 2–3 минуты. Коуч, определивший метапрограммы клиента, формулирует вопросы и цели «на языке клиента» — и сопротивление падает почти до нуля.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {MPS.map((m) => (
          <div key={m.t} className={`rounded-2xl border p-4 ${m.tone}`}>
            <div className="font-extrabold text-sm tracking-wide mb-2 flex items-center gap-2">
              <ScanSearch size={16} className={m.ic} />
              {m.t}
            </div>
            <div className="text-xs space-y-1 mb-2">
              <p><span className="font-bold">A:</span> {m.a}</p>
              <p><span className="font-bold">B:</span> {m.b}</p>
            </div>
            <div className="rounded-xl bg-background/70 p-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-0.5">Применение</div>
              <p className="text-xs leading-relaxed">{m.use}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase mb-3">Как определять: слушайте 3 вещи</div>
        <ul className="space-y-2 text-sm">
          {[
            "Предикаты и слова: «достичь / избежать», «в целом / именно», «я / мы», «должен / выбираю»",
            "Реакцию на вопросы: «да, но…» = несоглашатель; «а можно по-другому?» = варианты",
            "Структуру рассказа: сначала смысл или сначала детали? результат или путь?",
          ].map((x, i) => (
            <li key={i} className="flex gap-2"><span className="text-primary font-bold shrink-0">{i + 1}.</span><span>{x}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          Метапрограммы — не диагноз, а контекст. Один человек может быть «Цель» в работе и «Процесс» в спорте. Диагностируйте в конкретной теме и адаптируйте язык: тот же вопрос, сказанный «не тем» фильтром, может обесценить всю работу.
        </p>
      </div>
    </div>
  );
}

export default Metaprograms;
