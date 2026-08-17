import { useState } from "react";
import { ArrowRight, ChevronRight, Cog, Flag, Layers, Link2, Sparkles, Star, Target } from "lucide-react";
import { SectionHead } from "./_shared";

type Step = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  icon: any;
  accent: string;
  tone: string;
  desc: string;
  questions: string[];
};

const SOAR_STEPS: Step[] = [
  {
    id: "S", label: "STATE", title: "СОСТОЯНИЕ",
    subtitle: "В каком состоянии находится система?",
    icon: Layers,
    accent: "from-sky-500/15 to-sky-500/5 border-sky-500/30",
    tone: "from-sky-500 to-blue-600",
    desc: "Определение элементов системы, их взаимодействия и границ. В каком состоянии находится система?",
    questions: [
      "Каковы на твой взгляд существенные элементы той среды, в которой ты стремишься достичь свою цель?",
      "Как происходит взаимодействие элементов?",
      "Что является рычагом?",
      "Где заканчивается твоя система? Кто и что влияет на неё снаружи?",
    ],
  },
  {
    id: "O", label: "OPERATOR", title: "ОПЕРАТОР",
    subtitle: "Действия, которые изменяют состояние системы",
    icon: Cog,
    accent: "from-amber-500/15 to-amber-500/5 border-amber-500/30",
    tone: "from-amber-500 to-orange-600",
    desc: "Действия, которые изменяют состояние системы. Стимулирует новое состояние путём изменения параметров прежнего.",
    questions: [
      "Какие возможности достижения цели тебе известны?",
      "Какими ресурсами ты располагаешь?",
      "Какой у тебя есть выбор?",
      "Как воздействовать через рычаг?",
      "Какова цепочка передачи воздействия?",
      "Каково оптимальное время для воздействия?",
      "Если рычаг не найден — как расширить систему, ввести новый элемент?",
    ],
  },
  {
    id: "A", label: "AND", title: "И",
    subtitle: "Связующий элемент модели",
    icon: Link2,
    accent: "from-violet-500/15 to-violet-500/5 border-violet-500/30",
    tone: "from-violet-500 to-indigo-600",
    desc: "Связующий элемент — объединяет S и R. Текущее состояние [S] + Оператор [O] → Результат [R]. Если результат не достигнут — цикл SO повторяется.",
    questions: [],
  },
  {
    id: "R", label: "RESULT", title: "РЕЗУЛЬТАТ",
    subtitle: "Цель, к которой стремимся",
    icon: Target,
    accent: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/30",
    tone: "from-emerald-500 to-teal-600",
    desc: "Цель, к которой стремимся. Анализ полученных результатов. Если не достигнут — повторение SO.",
    questions: [
      "Какой результат в критериях системы вы хотите получить?",
      "Как вы поймёте, что система пришла в новое состояние?",
      "Как система отреагировала на оператора?",
      "Что изменилось в поведении элементов?",
      "Если результат не достигнут — что изменить в следующем цикле SO?",
    ],
  },
];

function Soar() {
  const [active, setActive] = useState("S");
  const step = SOAR_STEPS.find((s) => s.id === active)!;
  const I = step.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Модель SOAR" subtitle="Системный коучинг · А. Невел, Г. Саймон, К. Шоу" />

      {/* Формула */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 p-5">
        <Sparkles className="absolute right-6 top-4 text-primary/25" size={22} />
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="px-4 py-2 rounded-xl bg-card border border-border font-extrabold text-xl">[S · O]</span>
          <ArrowRight size={22} className="text-primary" />
          <span className="px-4 py-2 rounded-xl bg-card border border-border font-extrabold text-xl">R</span>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          State + Operator → Result
        </p>
      </div>

      {/* Кнопки-вкладки */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SOAR_STEPS.map((s) => {
          const act = active === s.id;
          const Ic = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`p-4 rounded-xl border text-left transition-all ${act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"}`}
            >
              <div className={`w-10 h-10 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${s.tone} text-white`}`}>
                <Ic size={20} />
              </div>
              <div className="font-bold text-2xl">{s.id}</div>
              <div className={`text-xs ${act ? "opacity-90" : "text-muted-foreground"}`}>{s.label}</div>
            </button>
          );
        })}
      </div>

      {/* Активный раздел */}
      <div className={`relative overflow-hidden rounded-2xl border p-6 bg-gradient-to-br ${step.accent}`}>
        <I size={220} strokeWidth={1} className="absolute -right-8 -top-8 text-foreground/[0.05] pointer-events-none" />
        <div className="relative flex items-center gap-4 rounded-2xl bg-card shadow-xl ring-2 ring-white/40 p-4">
          <div className={`w-16 h-16 rounded-2xl shrink-0 grid place-items-center bg-gradient-to-br ${step.tone} text-white`}>
            <I size={32} />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide opacity-80 font-semibold">{step.label}</div>
            <h3 className="text-[clamp(24px,7vw,44px)] font-extrabold tracking-tight leading-none">{step.title}</h3>
            <div className="text-sm text-muted-foreground mt-1">{step.subtitle}</div>
          </div>
        </div>

        <div className="relative mt-4 bg-card rounded-2xl border border-border p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-1.5">Описание</div>
          <p className="text-sm text-foreground/90 leading-relaxed">{step.desc}</p>
        </div>

        {step.questions.length > 0 && (
          <div className="relative mt-3 bg-card rounded-2xl border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.tone} text-white grid place-items-center`}>
                <Star size={16} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">Коучинговые вопросы</div>
            </div>
            <ul className="space-y-2">
              {step.questions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <Flag size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Как работать с моделью</div>
          <div className="text-sm font-medium">
            SOAR — системная модель: коуч помогает клиенту осознать элементы своей системы, найти рычаг воздействия
            (Operator) и проанализировать результат. Если цель не достигнута — цикл [SO] повторяется.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Soar;
