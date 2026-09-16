import { useState } from "react";
import { Compass, Layers, Workflow } from "lucide-react";
import Score from "./score";
import Soar from "./soar";
import { SectionHead } from "./_shared";

const TABS = [
  { id: "score", label: "S.C.O.R.E.", icon: Compass },
  { id: "soar", label: "SOAR", icon: Workflow },
  { id: "abc", label: "ABC", icon: Layers },
] as const;

type ModelTab = (typeof TABS)[number]["id"];

const ABC_STEPS = [
  {
    l: "A", t: "Activating event", ru: "Активирующее событие",
    d: "Объективная ситуация, которая запускает реакцию: «клиент молчит», «не пришёл на сессию», «руководитель дал резкую обратную связь».",
    tone: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300",
  },
  {
    l: "B", t: "Belief", ru: "Убеждение / интерпретация",
    d: "Внутренняя оценка события: «я плохой специалист», «он мне не доверяет». Именно B, а не A, определяет эмоции и поведение.",
    tone: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
  },
  {
    l: "C", t: "Consequence", ru: "Следствие",
    d: "Эмоции и поведение: тревога, защита, избегание, потеря мотивации. Работаем не с событием, а с интерпретацией.",
    tone: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
  },
];

const ABC_QUESTIONS = [
  "Что именно произошло — только факты, без оценок?",
  "Что вы себе сказали, когда это произошло?",
  "Насколько эта мысль подтверждается фактами?",
  "Какая другая интерпретация возможна?",
  "Если выбрать новую интерпретацию — как изменится реакция?",
  "Какое убеждение поможет вам действовать эффективно?",
];

function Abc() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Модель ABC" subtitle="Активирующее событие · Убеждение · Следствие — работаем с интерпретацией" />
      <div className="grid sm:grid-cols-3 gap-3">
        {ABC_STEPS.map((s, i) => (
          <div key={s.l} className={`rounded-2xl border p-4 ${s.tone}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-full bg-background/70 grid place-items-center font-black">{s.l}</div>
              <div>
                <div className="font-extrabold text-sm leading-tight">{s.t}</div>
                <div className="text-[11px] font-semibold opacity-80">{s.ru}</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed">{s.d}</p>
            {i < 2 && <div className="text-center mt-2 text-muted-foreground" aria-hidden>↓</div>}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase mb-2">Ключевая идея</div>
        <p className="text-sm text-muted-foreground">
          Между событием и реакцией всегда есть интерпретация. Коуч помогает клиенту увидеть её, проверить на фактах и осознанно заменить — тогда меняется и эмоциональное состояние, и поведение.
        </p>
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase mb-3">Коучинговые вопросы по ABC</div>
        <ul className="space-y-2 text-sm">
          {ABC_QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary font-bold shrink-0">{i + 1}.</span>
              <span>{q}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Models() {
  const [t, setT] = useState<ModelTab>("score");

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:justify-center">
        {TABS.map((x) => {
          const I = x.icon;
          const act = t === x.id;
          return (
            <button
              key={x.id}
              onClick={() => setT(x.id)}
              className={`shrink-0 flex items-center gap-2 px-4 min-h-11 rounded-xl border text-sm font-semibold transition-colors ${
                act ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              <I size={16} />
              {x.label}
            </button>
          );
        })}
      </div>
      {t === "score" && <Score />}
      {t === "soar" && <Soar />}
      {t === "abc" && <Abc />}
    </div>
  );
}

export default Models;
