import { useState } from "react";
import {
  ArrowRight, ChevronRight, Compass, HelpCircle,
  Lightbulb, Network, Rocket, Search, Sparkles, Target, Zap,
} from "lucide-react";
import { SectionHead } from "./_shared";

const SOAR_STEPS = [
  {
    id: "S",
    letter: "S",
    label: "STATE",
    labelRu: "СОСТОЯНИЕ",
    subtitle: "Определяем пространство проблемы",
    time: "15 мин",
    icon: Search,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    labelColor: "text-sky-700 dark:text-sky-400",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    desc: "Определение элементов системы, их взаимодействия и границ. В каком состоянии находится система?",
    blocks: [
      {
        head: "КАРТА СИСТЕМЫ",
        icon: Network,
        tone: "from-sky-500 to-blue-600",
        questions: [
          "Каковы на твой взгляд существенные элементы той среды, в которой ты стремишься достичь свою цель?",
          "Как происходит взаимодействие элементов?",
          "Что является рычагом?",
        ],
      },
      {
        head: "ГРАНИЦЫ СИСТЕМЫ",
        icon: Compass,
        tone: "from-cyan-500 to-sky-600",
        questions: [
          "Где заканчивается твоя система?",
          "Кто и что оказывает влияние на систему снаружи?",
          "Что находится под твоим контролем?",
        ],
      },
    ],
  },
  {
    id: "O",
    letter: "O",
    label: "OPERATOR",
    labelRu: "ОПЕРАТОР",
    subtitle: "Планирование и реализация действий",
    time: "20 мин",
    icon: Zap,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    labelColor: "text-amber-700 dark:text-amber-400",
    gradientFrom: "from-amber-500",
    gradientTo: "to-orange-500",
    desc: "Действия, которые изменяют состояние системы. Стимулирует новое состояние путём изменения параметров прежнего.",
    blocks: [
      {
        head: "ПОИСК РЫЧАГА",
        icon: Target,
        tone: "from-amber-500 to-orange-500",
        questions: [
          "Какие возможности достижения цели тебе известны?",
          "Какими ресурсами ты располагаешь?",
          "Какой у тебя есть выбор?",
          "Какое воздействие даст максимальный эффект при минимальных усилиях?",
        ],
      },
      {
        head: "ПЛАНИРОВАНИЕ ДЕЙСТВИЙ",
        icon: Lightbulb,
        tone: "from-orange-500 to-red-500",
        questions: [
          "Как можно воздействовать на систему через рычаг?",
          "Какова цепочка передачи информационного воздействия?",
          "Каково оптимальное время для воздействия?",
          "Если рычаг не найден — как расширить систему, ввести новый элемент?",
        ],
      },
    ],
  },
  {
    id: "A",
    letter: "A",
    label: "AND",
    labelRu: "И",
    subtitle: "Связующий элемент — объединение S и R",
    time: "—",
    icon: Sparkles,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    labelColor: "text-emerald-700 dark:text-emerald-400",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-teal-500",
    desc: "«A» — связка «и». Модель описывает переход из текущего состояния (S) через оператора (O) к результату (R): [SO] → R",
    blocks: [
      {
        head: "ФОРМУЛА МОДЕЛИ",
        icon: Sparkles,
        tone: "from-emerald-500 to-teal-500",
        questions: [
          "Текущее состояние [S] + Оператор [O] → Результат [R]",
          "Если результат не достигнут — повторяем цикл SO с новыми параметрами",
          "Каждый цикл приближает систему к желаемому состоянию",
        ],
      },
    ],
  },
  {
    id: "R",
    letter: "R",
    label: "RESULT",
    labelRu: "РЕЗУЛЬТАТ",
    subtitle: "Цель и анализ полученного",
    time: "10 мин",
    icon: Rocket,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    labelColor: "text-violet-700 dark:text-violet-400",
    gradientFrom: "from-violet-500",
    gradientTo: "to-purple-600",
    desc: "Цель, к которой мы стремимся. Анализ полученных результатов. Если результат не достигнут — повторение цикла SO.",
    blocks: [
      {
        head: "ЖЕЛАЕМЫЙ РЕЗУЛЬТАТ · R=S2",
        icon: Rocket,
        tone: "from-violet-500 to-purple-600",
        questions: [
          "Какой результат в критериях системы вы хотите получить?",
          "Как вы поймёте, что система пришла в новое состояние?",
          "Что изменится в системе после достижения результата?",
        ],
      },
      {
        head: "АНАЛИЗ РЕАКЦИИ СИСТЕМЫ",
        icon: Search,
        tone: "from-indigo-500 to-violet-600",
        questions: [
          "Как система отреагировала на оператора?",
          "Что изменилось в поведении элементов?",
          "Какой результат получен?",
          "Если результат не достигнут — что нужно изменить в следующем цикле SO?",
        ],
      },
    ],
  },
];

function QuestionCard({
  head, icon: Icon, tone, questions,
}: {
  head: string; icon: any; tone: string; questions: string[];
}) {
  return (
    <div className="relative overflow-hidden bg-card rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors">
      <Icon size={140} className="absolute -right-6 -bottom-8 text-foreground/[0.04] pointer-events-none" strokeWidth={1.2} />
      <div className="relative flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tone} text-white grid place-items-center shadow-md shadow-primary/20 shrink-0`}>
          <Icon size={20} />
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80 leading-tight">{head}</div>
      </div>
      <ul className="relative space-y-1.5 text-sm">
        {questions.map((q, i) => (
          <li key={i} className="flex items-start gap-2">
            <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
            <span className="text-foreground/90">{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Soar() {
  const [active, setActive] = useState("S");
  const step = SOAR_STEPS.find((s) => s.id === active)!;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Модель SOAR"
        subtitle="Системный коучинг · А. Невел, Г. Саймон, К. Шоу"
      />

      {/* Formula banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-500/20 via-amber-500/10 to-violet-500/20 border border-primary/20 p-4 text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Формула модели</div>
        <div className="font-mono text-xl font-extrabold tracking-wide">
          [S <span className="text-primary">·</span> O] <ArrowRight className="inline" size={20} /> R
        </div>
        <div className="text-xs text-muted-foreground mt-1">State + Operator → Result</div>
      </div>

      {/* Step tabs */}
      <div className="grid grid-cols-4 gap-2">
        {SOAR_STEPS.map((s) => {
          const act = active === s.id;
          const I = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`p-3 rounded-xl border text-center transition-all ${
                act
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <I size={20} className="mx-auto mb-1" />
              <div className="font-extrabold text-xl leading-none">{s.letter}</div>
              <div className={`text-[9px] leading-tight mt-0.5 ${act ? "opacity-90" : "text-muted-foreground"}`}>
                {s.labelRu}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active step */}
      <div className={`relative overflow-hidden rounded-2xl border p-5 bg-gradient-to-br ${step.accent}`}>
        <step.icon size={200} className="absolute -right-10 -top-10 opacity-[0.04] pointer-events-none" strokeWidth={1} />

        {/* Header */}
        <div className="relative flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} text-white grid place-items-center shadow-lg shrink-0`}>
            <span className="text-3xl font-extrabold">{step.letter}</span>
          </div>
          <div>
            <div className={`text-[10px] uppercase tracking-widest font-bold ${step.labelColor}`}>
              {step.label} · {step.labelRu}
            </div>
            <div className="text-lg font-bold text-foreground mt-0.5">{step.subtitle}</div>
            {step.time !== "—" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold mt-1">
                ⏱ {step.time}
              </span>
            )}
          </div>
        </div>

        <p className="relative text-sm text-foreground/75 mb-4 leading-relaxed">{step.desc}</p>

        <div className="relative grid sm:grid-cols-2 gap-3">
          {step.blocks.map((b, i) => (
            <QuestionCard key={i} head={b.head} icon={b.icon} tone={b.tone} questions={b.questions} />
          ))}
        </div>
      </div>

      {/* Overview list */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Network size={20} className="text-primary shrink-0" />
          <h3 className="font-semibold">Все шаги SOAR</h3>
        </div>
        <div className="space-y-2">
          {SOAR_STEPS.map((s) => {
            const I = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                  active === s.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border hover:border-primary/30 bg-secondary/40"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradientFrom} ${s.gradientTo} text-white grid place-items-center shrink-0`}>
                  <span className="font-extrabold text-sm">{s.letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{s.labelRu}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.subtitle}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {s.time !== "—" && <span className="text-xs text-muted-foreground">{s.time}</span>}
                  <ArrowRight size={14} className={active === s.id ? "text-primary" : "text-muted-foreground"} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Ключевая идея</div>
          <div className="text-sm font-medium">
            SOAR — системная модель: коуч помогает клиенту осознать элементы своей системы, найти рычаг воздействия (Operator) и проанализировать результат. Если цель не достигнута — цикл [SO] повторяется с новыми параметрами.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Soar;
