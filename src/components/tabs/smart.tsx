import { useState } from "react";
import { CheckCircle2, ChevronDown, ShieldCheck } from "lucide-react";

const SMART_CRITERIA: {
  letter: string;
  title: string;
  subtitle: string;
  color: string;
  ring: string;
  textColor: string;
  questions: string[];
}[] = [
  {
    letter: "S",
    title: "Specific",
    subtitle: "Конкретная",
    color: "bg-rose-500",
    ring: "ring-rose-400/50",
    textColor: "text-rose-600",
    questions: [
      "Каких именно результатов необходимо достичь?",
      "Опиши характеристики результата конкретно и однозначно.",
      "Что именно будет по-другому, когда цель достигнута?",
      "Кто конкретно вовлечён в достижение цели?",
      "Где и в каком контексте происходит работа над целью?",
    ],
  },
  {
    letter: "M",
    title: "Measurable",
    subtitle: "Измеримая",
    color: "bg-amber-500",
    ring: "ring-amber-400/50",
    textColor: "text-amber-600",
    questions: [
      "Что даст возможность судить о достижении цели?",
      "Какие критерии, метрики или признаки готовности используем?",
      "Как мы поймём, что цель достигнута на 50%, 80%, 100%?",
      "Какое количественное или качественное подтверждение нужно?",
      "Как будем отслеживать прогресс?",
    ],
  },
  {
    letter: "A",
    title: "Achievable",
    subtitle: "Достижимая",
    color: "bg-emerald-500",
    ring: "ring-emerald-400/50",
    textColor: "text-emerald-600",
    questions: [
      "За счёт чего цель будет достигнута?",
      "Какие ресурсы, навыки и инструменты уже есть?",
      "Что нужно дополнительно освоить или привлечь?",
      "Есть ли у клиента контроль над этой целью?",
      "Какие внутренние и внешние препятствия возможны?",
    ],
  },
  {
    letter: "R",
    title: "Relevant",
    subtitle: "Актуальная",
    color: "bg-sky-500",
    ring: "ring-sky-400/50",
    textColor: "text-sky-600",
    questions: [
      "Почему цель важна для успеха именно сейчас?",
      "Как эта цель связана с ценностями клиента?",
      "Какие последствия будут, если цель не достигнута?",
      "Какие выгоды принесёт достижение цели?",
      "Эта цель соответствует текущей ситуации и приоритетам?",
    ],
  },
  {
    letter: "T",
    title: "Time-framed",
    subtitle: "Определена во времени",
    color: "bg-violet-500",
    ring: "ring-violet-400/50",
    textColor: "text-violet-600",
    questions: [
      "Когда и к какому моменту цель должна быть достигнута?",
      "Какой точный дедлайн или конечная дата?",
      "Какие промежуточные вехи и контрольные точки?",
      "Что клиент готов делать уже сегодня/на этой неделе?",
      "Как часто будем проверять прогресс?",
    ],
  },
];

function SmartGoal() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="rounded-3xl bg-surface-1 text-foreground border border-border p-4 sm:p-5 shadow-sm max-w-full overflow-hidden">
      <div className="mb-5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CheckCircle2 className="text-accent" size={22} />
          SMART — справочник для коуча
        </h2>
        <p className="text-sm text-secondary-foreground mt-1">
          Тапните по критерию, чтобы увидеть наводящие вопросы для сессии.
        </p>
      </div>

      <div className="grid gap-2">
        {SMART_CRITERIA.map((item) => {
          const isOpen = openKey === item.letter;
          return (
            <div
              key={item.letter}
              className={"rounded-2xl border transition-all overflow-hidden " + (isOpen ? "border-border bg-surface-0 shadow-sm" : "border-border/50 bg-surface-0/60")}
            >
              <button
                onClick={() => toggle(item.letter)}
                className="w-full flex items-center gap-3 p-3 sm:p-4 text-left active:scale-[0.98] transition-transform"
                aria-expanded={isOpen}
              >
                <div
                  className={"shrink-0 w-10 h-10 rounded-xl " + item.color + " text-white font-black text-lg grid place-items-center shadow-sm " + (isOpen ? "ring-2 " + item.ring : "")}
                >
                  {item.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold leading-tight">
                    {item.title}{" "}
                    <span className="font-normal text-secondary-foreground">
                      — {item.subtitle}
                    </span>
                  </div>
                </div>
                <div
                  className={"shrink-0 text-muted-foreground transition-transform duration-200 " + (isOpen ? "rotate-180" : "")}
                >
                  <ChevronDown size={18} />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 animate-in fade-in slide-in-from-top-1">
                  <div className="border-t border-border/40 pt-3">
                    <div className="text-xs font-semibold text-secondary-foreground uppercase tracking-wider mb-2">
                      Наводящие вопросы
                    </div>
                    <ul className="space-y-2">
                      {item.questions.map((q, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-foreground leading-relaxed"
                        >
                          <span
                            className={"shrink-0 mt-1 w-1.5 h-1.5 rounded-full " + item.color}
                          />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Whitmore rules */}
      <div className="mt-5 rounded-2xl border border-border bg-surface-0/60 p-4">
        <div className="text-xs font-semibold text-secondary-foreground mb-3 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-accent" /> Правила Джона Уитмора
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl p-3 border border-border bg-surface-0">
            <div className="text-sm font-semibold">Позитивная формулировка</div>
            <div className="text-xs text-secondary-foreground mt-1 leading-relaxed">
              Без частицы «НЕ». Направлена на достижение, а не на избегание.
            </div>
          </div>
          <div className="rounded-xl p-3 border border-border bg-surface-0">
            <div className="text-sm font-semibold">Баланс вызова и реальности</div>
            <div className="text-xs text-secondary-foreground mt-1 leading-relaxed">
              Мотивирует (бросает вызов), но остаётся выполнимой.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ---------- 16 Компетенций Коуча ---------- */

export default SmartGoal;
