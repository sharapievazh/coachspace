import { useState } from "react";
import { ChevronDown, Compass, Crown, Ear, Eye, Flag, Flower2, GraduationCap, Handshake, Heart, HelpCircle, Lightbulb, MessageSquare, ShieldCheck, Sparkles, Telescope, TrendingUp, Wrench } from "lucide-react";

type Comp = { n: number; icon: any; title: string; example: string; questions: string };

const LEONARD_COMPS: Comp[] = [
  { n: 1, icon: ShieldCheck, title: "Соответствие этическим нормам и профессиональным стандартам",
    example: "В ходе сессии клиент начинает плакать и говорит о глубокой детской травме. Коуч понимает, что это сфера психотерапии, останавливает работу и мягко рекомендует профильного специалиста.",
    questions: "«Я слышу, что эта тема вызывает у вас сильную боль из прошлого. Будет ли полезным, если я порекомендую специалиста (терапевта)?»" },
  { n: 2, icon: Handshake, title: "Заключение Коучингового Соглашения",
    example: "На первой встрече коуч и клиент четко договариваются о правилах: коуч отвечает за процесс, клиент — за результат. Согласовывают время и формат.",
    questions: "«Какого главного результата вы хотели бы добиться?», «Что даст возможность понять в конце, что мы достигли цели?»" },
  { n: 3, icon: Heart, title: "Установление доверительных отношений с клиентом",
    example: "Клиент боится провала. Коуч демонстрирует искреннюю поддержку, веру в его потенциал и спрашивает разрешения пойти в эту тему.",
    questions: "«Какой ваш прошлый успешный опыт может помочь вам прямо сейчас?», «Могу ли я задать вопрос на эту чувствительную тему?»" },
  { n: 4, icon: Sparkles, title: "Коучинговое присутствие",
    example: "Клиент злится и эмоционально рассказывает о ситуации. Коуч не вовлекается («не спасает»), остается спокойным и гибким в моменте.",
    questions: "«Я не знаю, что делать дальше. А вы как думаете?», «Что вы чувствуете прямо сейчас, когда рассказываете мне это?»" },
  { n: 5, icon: Ear, title: "Активное слушание",
    example: "Клиент говорит о радости, но его плечи опущены, а голос тихий. Коуч замечает несоответствие и возвращает эти наблюдения клиенту.",
    questions: "«Вы говорите, что рады, но я замечаю, что ваш голос звучит грустно. Что на самом деле происходит?»" },
  { n: 6, icon: HelpCircle, title: "Постановка «сильных» вопросов",
    example: "Клиент уверен, что выхода нет из-за нехватки денег. Коуч задает открытый вопрос, сдвигающий фокус на поиск скрытых возможностей.",
    questions: "«Что бы вы сделали, если бы у вас был неограниченный бюджет?», «Какие внешние возможности существуют для реализации цели?»" },
  { n: 7, icon: MessageSquare, title: "Прямое общение",
    example: "Коуч отказывается от сложного жаргона и использует понятную клиенту метафору (рефрейминг) для изменения взгляда на проблему.",
    questions: "«Если представить вашу компанию как корабль в шторм, то кто вы на нем?», «Ясно ли для вас то, о чем мы сейчас договорились?»" },
  { n: 8, icon: Lightbulb, title: "Стимулирование Осознания",
    example: "Клиент жалуется: «Мой партнер меня не уважает». Коуч помогает клиенту отделить реальные факты от личных интерпретаций.",
    questions: "«На каких конкретно фактах основано ваше предположение?», «В чем разница между тем, что он сказал, и тем, как вы это восприняли?»" },
  { n: 9, icon: Wrench, title: "Проектирование действий",
    example: "Коуч предлагает провести мозговой штурм и просит клиента накидать любые, даже самые безумные варианты решений без их критики.",
    questions: "«Какими разными путями можно подойти к решению?», «Что еще вы могли бы сделать? Давай составим перечень альтернатив»." },
  { n: 10, icon: Flag, title: "Планирование и постановка целей",
    example: "Варианты выбраны. Коуч помогает клиенту перевести идеи в измеримый план с четкими дедлайнами по формату SMART.",
    questions: "«Какой именно вариант вы выбираете?», «Когда точно (в какой день и время) вы начнете и завершите каждый шаг?»" },
  { n: 11, icon: TrendingUp, title: "Управление прогрессом и ответственностью",
    example: "В начале новой сессии коуч обращается к плану. Он не ругает за невыполнение, но оставляет ответственность за результат на клиенте.",
    questions: "«Что удалось сделать с прошлой сессии, а что не получилось?», «Оцените по шкале от 1 до 10 свою готовность выполнить этот план»." },
];

const ICU_COMPS: Comp[] = [
  { n: 12, icon: Eye, title: "Интегральная осознанность",
    example: "Коуч работает целостно: обращает внимание не только на мысли (когнитивный уровень), но и на эмоции и тело (соматический уровень).",
    questions: "«В какой части тела вы чувствуете напряжение?», «Что говорят ваши эмоции по поводу этого решения?»" },
  { n: 13, icon: Flower2, title: "Осознанность развития и трансформации",
    example: "Клиент переживает кризис личностного роста (переход из найма в бизнес). Коуч не торопит его, а помогает прожить трансформацию.",
    questions: "«Чему этот жизненный этап пытается вас научить?», «Кем вы становитесь в результате этих изменений?»" },
  { n: 14, icon: Telescope, title: "Визионерское (стратегическое) мышление",
    example: "Клиент увяз в рутине. Коуч выводит его на уровень долгосрочных перспектив и больших целей за рамками текущих ограничений.",
    questions: "«Какой вы видите свою идеальную жизнь через год?», «Ради чего большего вы это делаете? Какова ваша сверхцель?»" },
  { n: 15, icon: Crown, title: "Культурная компетентность",
    example: "Коуч работает с клиентом из другой культуры. Он не навязывает ему чужие шаблоны успеха, если для клиента важно сохранить традиции.",
    questions: "«Какие культурные или семейные ценности для вас важно сохранить?», «Как в вашей среде принято относиться к переменам?»" },
  { n: 16, icon: Compass, title: "Системное мышление",
    example: "Клиент хочет резко уволиться. Коуч помогает ему осознать себя частью больших систем (семьи, команды) и исследовать последствия.",
    questions: "«Как ваше решение повлияет на ваших близких и коллег?», «Если посмотреть на проблему глазами всей вашей компании, к чему она стремится?»" },
];

function CompetencyItem({ c, open, onToggle }: { c: Comp; open: boolean; onToggle: () => void }) {
  const Icon = c.icon;
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-secondary/60 transition-colors"
      >
        <span className="shrink-0 w-7 h-7 rounded-md bg-primary text-primary-foreground grid place-items-center text-xs font-bold tabular-nums">
          {c.n}
        </span>
        <Icon size={16} className="shrink-0 text-primary" />
        <span className="flex-1 text-sm font-semibold leading-snug text-foreground">{c.title}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-3 pt-1 space-y-2">
            <div className="rounded-md bg-secondary border border-border p-2.5">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                <Lightbulb size={11} /> Пример
              </div>
              <p className="text-xs leading-relaxed text-foreground">{c.example}</p>
            </div>
            <div className="rounded-md bg-primary/10 border border-primary/40 p-2.5">
              <div className="text-[10px] uppercase tracking-wider font-semibold text-primary mb-1 flex items-center gap-1">
                <HelpCircle size={11} /> Сильные вопросы
              </div>
              <p className="text-xs leading-relaxed text-foreground">{c.questions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Competencies() {
  const [tab, setTab] = useState<"leonard" | "icu">("leonard");
  const [open, setOpen] = useState<number | null>(1);
  const list = tab === "leonard" ? LEONARD_COMPS : ICU_COMPS;

  return (
    <div className="max-w-3xl mx-auto space-y-3 max-w-full overflow-hidden">
      <div className="flex items-center gap-2 px-1">
        <GraduationCap size={20} className="text-primary" />
        <h2 className="text-lg font-bold">16 Компетенций Коуча</h2>
      </div>

      <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-secondary border border-border">
        <button
          onClick={() => { setTab("leonard"); setOpen(null); }}
          className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            tab === "leonard" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-background/40"
          }`}
        >
          11 Компетенций<br className="sm:hidden" /><span className="opacity-80"> Т. Леонарда</span>
        </button>
        <button
          onClick={() => { setTab("icu"); setOpen(null); }}
          className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            tab === "icu" ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-background/40"
          }`}
        >
          5 Компетенций<br className="sm:hidden" /><span className="opacity-80"> ICU</span>
        </button>
      </div>

      <div className="space-y-1.5">
        {list.map((c) => (
          <CompetencyItem
            key={c.n}
            c={c}
            open={open === c.n}
            onToggle={() => setOpen(open === c.n ? null : c.n)}
          />
        ))}
      </div>
    </div>
  );
}

// Memoized tab components — prevents re-renders during timer ticks.

export default Competencies;
