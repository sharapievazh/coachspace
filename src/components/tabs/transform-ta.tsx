import { useState } from "react";
import { Baby, ChevronRight, HelpCircle, User, Users } from "lucide-react";
import { SectionHead } from "./_shared";

type Ego = {
  id: string;
  name: string;
  short: string;
  icon: any;
  tone: string;
  sub: { t: string; d: string; phrases: string[] }[];
};

const EGOS: Ego[] = [
  {
    id: "P",
    name: "Родитель",
    short: "Р",
    icon: Users,
    tone: "from-violet-500 to-purple-600",
    sub: [
      {
        t: "Контролирующий Родитель",
        d: "Оценивает, требует, ставит рамки, критикует.",
        phrases: ["«Ты должен», «сколько раз повторять»", "«Так не делают»", "«Я же говорил(а)»"],
      },
      {
        t: "Заботливый Родитель",
        d: "Поддерживает, опекает, иногда чрезмерно.",
        phrases: ["«Не волнуйся, я всё сделаю»", "«Бедный ты мой»", "«Давай я тебе помогу»"],
      },
    ],
  },
  {
    id: "A",
    name: "Взрослый",
    short: "В",
    icon: User,
    tone: "from-emerald-500 to-teal-600",
    sub: [
      {
        t: "Рациональный",
        d: "Работает с фактами, оценивает вероятности, принимает решения здесь и сейчас.",
        phrases: ["«Какие у нас данные?»", "«Что я могу сделать?»", "«Какие варианты есть?»"],
      },
      {
        t: "Адаптивный",
        d: "Гибко подстраивается под реальность, сохраняя свои границы и ответственность.",
        phrases: ["«Давай договоримся»", "«Мне это не подходит, предлагаю иначе»", "«Я беру это на себя»"],
      },
    ],
  },
  {
    id: "C",
    name: "Ребёнок",
    short: "Д",
    icon: Baby,
    tone: "from-amber-500 to-orange-600",
    sub: [
      {
        t: "Естественный Ребёнок",
        d: "Спонтанность, любопытство, творчество, живые эмоции.",
        phrases: ["«Хочу!»", "«Как здорово!»", "«А давай попробуем»"],
      },
      {
        t: "Адаптированный Ребёнок",
        d: "Послушный, угождающий, боится оценки и отвержения.",
        phrases: ["«Извините», «как скажете»", "«А я правильно сделал(а)?»", "«Только не сердитесь»"],
      },
      {
        t: "Бунтующий Ребёнок",
        d: "Протест против правил ради самого протеста.",
        phrases: ["«Не буду!»", "«Почему я?»", "«Вы мне не указывайте»"],
      },
    ],
  },
];

const SCENARIOS = [
  { t: "Конструктивный", d: "Победитель: цели ставятся и достигаются, ошибки становятся опытом.", tone: "border-emerald-500/40 bg-emerald-500/10" },
  { t: "Деструктивный", d: "Проигрывающий: сценарий ведёт к потерям, повторяющимся кризисам, саморазрушению.", tone: "border-rose-500/40 bg-rose-500/10" },
  { t: "Непродуктивный", d: "Не-победитель: жизнь «в серединке», без падений, но и без результата.", tone: "border-amber-500/40 bg-amber-500/10" },
];

const HEALTHY = [
  "Говорить о факте, а не о личности.",
  "Брать ответственность за свою часть и не брать чужую.",
  "Не спасать, не обвинять и не оправдываться.",
  "Проверять договорённости словами, а не догадками.",
  "Разрешать другому иметь своё мнение.",
  "Возвращать разговор в «здесь и сейчас», когда включается Родитель или Ребёнок.",
];

const PARTS_7 = [
  "Определить часть личности, которая отвечает за проблемное поведение.",
  "Установить с ней контакт и поблагодарить за работу.",
  "Выяснить её позитивное намерение — от чего она защищает.",
  "Определить её возраст: в каком году она «застряла».",
  "Дать ей ресурсы, которых не хватило тогда.",
  "Провести взросление части до текущего возраста клиента.",
  "Интегрировать часть и проверить экологию: новое поведение в трёх ситуациях будущего.",
];

function TransformTa() {
  const [ego, setEgo] = useState("A");
  const e = EGOS.find((x) => x.id === ego)!;
  const EI = e.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Трансактный анализ" subtitle="Эрик Берн · РВД · сценарий · части личности" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-violet-500/15 via-primary/15 to-amber-500/15 p-5">
        <Users className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Трансактный анализ Берна</h3>
        <p className="mt-1 text-sm text-foreground/85">
          Модель, описывающая поведение через три эго-состояния — Родитель, Взрослый, Ребёнок. Любое
          общение — это трансакция между состояниями. Проблемы возникают там, где состояния не совпадают.
        </p>
      </div>

      {/* РВД */}
      <div className="grid grid-cols-3 gap-2">
        {EGOS.map((x) => {
          const act = x.id === ego;
          const XI = x.icon;
          return (
            <button
              key={x.id}
              onClick={() => setEgo(x.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${x.tone} text-white`}`}>
                <XI size={20} />
              </div>
              <div className="text-sm font-bold leading-tight">{x.name}</div>
              <div className={`text-xs ${act ? "opacity-90" : "text-muted-foreground"}`}>состояние «{x.short}»</div>
            </button>
          );
        })}
      </div>

      <div className={`rounded-2xl border border-border p-5 bg-card`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${e.tone} text-white`}>
            <EI size={24} />
          </div>
          <h3 className="text-lg font-extrabold">{e.name}</h3>
        </div>
        <div className="mt-4 space-y-3">
          {e.sub.map((s) => (
            <div key={s.t} className="p-4 rounded-xl bg-secondary/60">
              <div className="text-sm font-bold text-primary">{s.t}</div>
              <p className="text-sm text-foreground/85 mt-1">{s.d}</p>
              <div className="mt-2 space-y-1">
                {s.phrases.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Сценарий */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold">Жизненный сценарий</h3>
        <p className="text-sm text-muted-foreground mt-1">Неосознанный план жизни, сформированный в детстве.</p>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {SCENARIOS.map((s) => (
            <div key={s.t} className={`p-4 rounded-xl border ${s.tone}`}>
              <div className="text-sm font-bold">{s.t}</div>
              <p className="text-sm text-foreground/85 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Взрослый-Взрослый */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold">Здоровое взаимодействие: Взрослый — Взрослый</h3>
        <p className="text-sm text-muted-foreground mt-1">Коуч всегда работает из позиции Взрослого и возвращает туда клиента.</p>
        <ol className="mt-4 space-y-2">
          {HEALTHY.map((h, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="text-foreground/90 pt-0.5">{h}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Части личности */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold">Работа с частями личности · 7 шагов</h3>
        <ol className="mt-4 space-y-2">
          {PARTS_7.map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="text-foreground/90 pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка коучу</div>
          <div className="text-sm font-medium text-foreground/90">
            Услышали «должен», «бедный я», «не буду» — клиент вышел из Взрослого. Вопрос «что ты можешь сделать сейчас?» возвращает его обратно.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformTa;
