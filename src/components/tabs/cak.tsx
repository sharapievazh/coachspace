import { useState } from "react";
import { Image, ChevronRight, AlertTriangle, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { SectionHead } from "./_shared";

const TRIADA = [
  {
    step: "СЮЖЕТ",
    q: "Что вижу?",
    desc: "Описание того, что буквально изображено на карте. Без интерпретаций.",
    color: "from-sky-500 to-blue-600",
  },
  {
    step: "СМЫСЛ",
    q: "Какой образ / метафора?",
    desc: "Что стоит за изображением? Какой символический смысл несёт карта?",
    color: "from-violet-500 to-indigo-600",
  },
  {
    step: "ПЕТЛЯ",
    q: "Как связано с запросом?",
    desc: "Как то, что на карте, соотносится с темой клиента? Запрос: «Как эта карта говорит о моём настроении и состоянии?»",
    color: "from-emerald-500 to-teal-500",
  },
];

const QUESTIONS = [
  "Что здесь изображено? Что за сюжет?",
  "Что происходит на этой карте?",
  "Что ты чувствуешь, когда смотришь на эту карту?",
  "Есть ли на этой картинке ты? Видишь ли ты себя?",
  "Какое основное послание этой карты для тебя?",
  "Как бы ты назвал эту карту?",
  "Что на картинке есть, а ты пока ещё не заметил(а)?",
  "Кто это может быть из твоей реальной жизни?",
  "Какие переживания и чувства это вызывает у тебя?",
  "Как то, что изображено, соотносится с тобой и твоим запросом?",
];

const MISTAKES = [
  "Интерпретация реальности клиента — коуч говорит, что означает карта",
  "Проникновение и нарушение границ взаимодействия клиента с картами",
  "Применение нескольких техник за одну встречу",
  "Чрезмерная эмоциональность и оценочность коуча",
  "Использование карт без анализа проекций клиента",
  "Директивность во взаимодействии",
];

const ADVANTAGES = [
  "Нет противопоказаний",
  "Сочетается с любым коучинговым подходом",
  "Доступно клиенту — нет ограничений",
  "Возможности невербального общения",
  "«Инсайт-ориентированный» характер — атмосфера доверия",
  "Мобилизует творческий потенциал",
];

const TIMELINE_STEPS = [
  "Выложить карты колоды «Будущее» перед клиентом лицом вниз или лицом вверх.",
  "«Представьте, что это пазлы одной картины. Соберите, пожалуйста, эту картину!»",
  "«Всё ли вам нравится? Всё ли вас устраивает? Стоит ли что-то добавить или убрать?»",
  "«Что это за картина? Как называется эта картина?»",
  "«Что есть в картине важное для вас? Какое послание / message несёт вам эта картина?»",
  "«Нравится ли вам это послание?»",
  "Интегрируйте послание и образ в себя.",
  "Предложите клиенту поблагодарить себя за работу.",
];

export default function CAK() {
  const [tab, setTab] = useState<"triada" | "questions" | "mistakes" | "timeline">("triada");

  const tabs = [
    { id: "triada", label: "Триада" },
    { id: "questions", label: "Вопросы" },
    { id: "mistakes", label: "Ошибки" },
    { id: "timeline", label: "Линия времени" },
  ] as const;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Коучинговые ассоциативные карты" subtitle="КАК · Арт-коучинг · Работа с образами" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-rose-500/20 p-5">
        <Image className="absolute right-5 top-4 text-primary/20" size={28} />
        <h3 className="text-base font-semibold text-foreground">Арт-технологии в коучинге</h3>
        <p className="mt-1 text-sm text-foreground/80">
          «Арт-технологии дают практически неограниченные возможности для самовыражения и самореализации в продуктах творчества, утверждением и познанием своего Я» — Карл Роджерс
        </p>
      </div>

      {/* Advantages */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-3">Преимущества арт-коучинга</div>
        <div className="grid grid-cols-2 gap-2">
          {ADVANTAGES.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-xs text-foreground/80">{a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              tab === t.id ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Triada */}
      {tab === "triada" && (
        <div className="space-y-3">
          {TRIADA.map((t, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${t.color} text-white grid place-items-center text-xs font-bold shrink-0`}>{i + 1}</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">{t.step}</div>
                  <div className="text-sm font-semibold text-foreground">{t.q}</div>
                </div>
              </div>
              <div className="text-sm text-foreground/80 ml-11">{t.desc}</div>
            </div>
          ))}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowRight size={14} className="text-primary" />
              <div className="text-xs font-bold uppercase tracking-wider text-foreground/70">Схема работы</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/85">
              <span className="bg-sky-500/15 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-lg font-semibold text-xs">Сюжет</span>
              <ArrowRight size={12} className="text-muted-foreground" />
              <span className="bg-violet-500/15 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-lg font-semibold text-xs">Смысл</span>
              <ArrowRight size={12} className="text-muted-foreground" />
              <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-lg font-semibold text-xs">Петля</span>
            </div>
          </div>
        </div>
      )}

      {/* Questions */}
      {tab === "questions" && (
        <div className="space-y-2">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="flex items-start gap-2 bg-card border border-border rounded-xl p-3">
              <div className="w-5 h-5 rounded bg-primary/10 text-primary text-[10px] font-bold grid place-items-center shrink-0 mt-0.5">{i + 1}</div>
              <div className="text-sm text-foreground/85">{q}</div>
            </div>
          ))}
        </div>
      )}

      {/* Mistakes */}
      {tab === "mistakes" && (
        <div className="space-y-2">
          <div className="bg-card border border-border rounded-2xl p-4 mb-2">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/60">Частые ошибки при работе с КАК</div>
          </div>
          {MISTAKES.map((m, i) => (
            <div key={i} className="flex items-start gap-2 bg-card border border-red-200/50 dark:border-red-900/30 rounded-xl p-3">
              <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/85">{m}</div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline */}
      {tab === "timeline" && (
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-primary" />
              <div className="text-sm font-bold text-foreground">Линия времени · Колода «Будущее»</div>
            </div>
            <div className="text-sm text-foreground/80">Работа с картами на создание образа желаемого будущего. Клиент собирает картину из нескольких карт — как пазл.</div>
          </div>
          {TIMELINE_STEPS.map((s, i) => (
            <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-3">
              <div className="w-6 h-6 rounded bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center shrink-0">{i + 1}</div>
              <div className="text-sm text-foreground/85">{s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
