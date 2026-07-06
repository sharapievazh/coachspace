import { useState } from "react";
import { Brain, Calculator, CheckCircle2, ChevronDown, Crown, Ear, Eye, Hand, Heart, HelpCircle, Palette, Smile, Users, Wind } from "lucide-react";
import { SectionHead } from "./_shared";

function Rapport() {
  const steps = [
    { t: "1. Калибровка", d: "Замечай позу, темп речи, дыхание, ключевые слова. Без оценки." },
    { t: "2. Подстройка", d: "Мягко отзеркаль темп, громкость, ритм. Используй слова клиента." },
    { t: "3. Ведение", d: "Когда контакт установлен — задай новый темп / ракурс / вопрос." },
    { t: "4. Проверка", d: "Калибруй реакцию. Если ушёл контакт — вернись к подстройке." },
  ];

  // 4SS questions checklist
  const ssQuestions = [
    "Что для вас является самым важным критерием при выборе новой работы или проекта?",
    "Если вам предстоит принять сложное решение, на что вы будете опираться в первую очередь?",
    "Опишите свою идеальную рабочую среду. Что делает её комфортной для вас?",
    "Что приносит вам наибольшее удовлетворение от достигнутой цели?",
  ];
  const [checked, setChecked] = useState<boolean[]>([false, false, false, false]);
  const toggle = (i: number) =>
    setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)));

  const styles4SS = [
    {
      key: "Рулевой",
      sub: "статус · престиж",
      icon: Crown,
      tone: "from-rose-500 to-red-600",
      ring: "border-rose-300/60 bg-rose-50",
      text: "text-rose-700",
      d: "Стремление к лидерству, достижению видимых результатов, карьерному росту, авторитету и признанию заслуг.",
    },
    {
      key: "Экспрессивный",
      sub: "креативность · интерес",
      icon: Palette,
      tone: "from-amber-400 to-orange-600",
      ring: "border-amber-300/60 bg-amber-50",
      text: "text-amber-700",
      d: "Важна свобода действий, отсутствие рутины, создание нового, драйв и вдохновение.",
    },
    {
      key: "Аналитик",
      sub: "выгода · стабильность · безопасность",
      icon: Calculator,
      tone: "from-sky-500 to-indigo-700",
      ring: "border-sky-300/60 bg-sky-50",
      text: "text-sky-700",
      d: "Фокус на минимизации рисков, предсказуемости, чётких правилах, логике, цифрах и понятной выгоде.",
    },
    {
      key: "Дружелюбный",
      sub: "отношения · атмосфера",
      icon: Smile,
      tone: "from-emerald-400 to-teal-600",
      ring: "border-emerald-300/60 bg-emerald-50",
      text: "text-emerald-700",
      d: "Важность хорошего коллектива, взаимопомощи, отсутствия конфликтов и тёплой атмосферы общения.",
    },
  ];

  // ВАИД calibration questions
  const vaikQuestions = [
    "Представьте, что ваша главная цель уже достигнута. Опишите этот момент максимально подробно. Что там происходит?",
    "Вспомните свой самый успешный день (или отпуск). Как это было?",
    "Как вы понимаете, что приняли правильное решение? Как вы это ощущаете?",
    "Что ты чувствуешь, когда думаешь об этой цели? (по Дж. Уитмору)",
    "В какой части тела ты чувствуешь напряжение (или расслабление)?",
  ];

  const vaikSystems = [
    {
      key: "В",
      title: "Визуал",
      icon: Eye,
      color: "indigo",
      tone: "from-indigo-500 to-violet-600",
      ring: "border-indigo-300/60 bg-indigo-50",
      text: "text-indigo-700",
      preds: ["Я прямо вижу эту картину", "Это яркий момент", "Ясная перспектива", "В фокусе", "Тёмная ситуация"],
    },
    {
      key: "А",
      title: "Аудиал",
      icon: Ear,
      color: "sky",
      tone: "from-sky-500 to-cyan-600",
      ring: "border-sky-300/60 bg-sky-50",
      text: "text-sky-700",
      preds: ["Звучит отлично", "Шумный успех", "Общались гармонично", "Слова скрежетали", "Громкая победа"],
    },
    {
      key: "К",
      title: "Кинестетик",
      icon: Hand,
      color: "emerald",
      tone: "from-emerald-500 to-teal-600",
      ring: "border-emerald-300/60 bg-emerald-50",
      text: "text-emerald-700",
      preds: ["Чувствую опору", "Тёплые (мягкие) отношения", "Очень удобно", "Был зажат", "Проблема давит", "Дело пошло гладко"],
    },
    {
      key: "И/Д",
      title: "Запах / Вкус",
      icon: Wind,
      color: "rose",
      tone: "from-rose-500 to-pink-600",
      ring: "border-rose-300/60 bg-rose-50",
      text: "text-rose-700",
      preds: ["Почувствовал вкус победы", "Горькая ошибка", "Свежий взгляд", "Сладкий момент", "Ситуация стала кислой"],
    },
  ];

  const [activeVaik, setActiveVaik] = useState<string>("В");

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Раппорт и Коммуникация" subtitle="Контакт · типология · сенсорные системы" />

      {/* 4 шага */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2 mb-3">
          <Heart size={18} className="text-primary" /> Раппорт · 4 шага
        </h3>
        <ol className="grid sm:grid-cols-2 gap-2">
          {steps.map((s, i) => (
            <li key={i} className="p-3 rounded-lg bg-secondary/60 border border-border/60">
              <div className="font-medium text-sm">{s.t}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>
            </li>
          ))}
        </ol>
      </div>

      {/* Блок А: 4SS */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white grid place-items-center shadow">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">Определение типа личности · 4SS</h3>
            <p className="text-xs text-muted-foreground">
              Каждый из 4-х социальных стилей ориентирован на разные базовые ценности. Задайте 2–3 открытых вопроса о приоритетах.
            </p>
          </div>
        </div>

        {/* checklist questions */}
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {ssQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`text-left p-3 rounded-lg border text-sm flex gap-2 items-start transition ${
                checked[i]
                  ? "border-primary/60 bg-primary/5"
                  : "border-border bg-secondary/40 hover:bg-secondary"
              }`}
            >
              <span
                className={`mt-0.5 w-5 h-5 rounded-md grid place-items-center shrink-0 border ${
                  checked[i] ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground/40"
                }`}
              >
                {checked[i] && <CheckCircle2 size={14} />}
              </span>
              <span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">Q{i + 1}</span>
                {q}
              </span>
            </button>
          ))}
        </div>

        {/* 2x2 grid analysis */}
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Анализ ответов · сетка стилей</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {styles4SS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.key} className={`relative p-3 rounded-xl border ${s.ring} overflow-hidden`}>
                <Icon className={`absolute -right-3 -bottom-3 ${s.text} opacity-10`} size={88} />
                <div className="flex items-center gap-2 mb-1 relative">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.tone} text-white grid place-items-center shadow`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${s.text}`}>{s.key}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.sub}</div>
                  </div>
                </div>
                <p className="text-xs text-foreground/80 leading-snug relative">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Блок Б: ВАИД / ВАК */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white grid place-items-center shadow">
            <Brain size={20} />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">Репрезентативная система · ВАИД / ВАК</h3>
            <p className="text-xs text-muted-foreground">
              Слушайте слова-предикаты клиента. Задайте открытые вопросы на описание опыта.
            </p>
          </div>
        </div>

        {/* calibration questions */}
        <div className="rounded-xl border border-border bg-secondary/40 p-3 mb-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
            <HelpCircle size={12} /> Вопросы для калибровки
          </div>
          <ul className="space-y-1.5">
            {vaikQuestions.map((q, i) => (
              <li key={i} className="text-sm flex gap-2 items-start">
                <span className="text-[10px] mt-1 font-bold text-primary shrink-0">{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* tabs */}
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Калибровочный справочник предикатов
        </div>
        <div className="flex gap-1 mb-3 flex-wrap">
          {vaikSystems.map((v) => {
            const Icon = v.icon;
            const active = activeVaik === v.key;
            return (
              <button
                key={v.key}
                onClick={() => setActiveVaik(v.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  active
                    ? `bg-gradient-to-br ${v.tone} text-white border-transparent shadow`
                    : `${v.text} ${v.ring} hover:opacity-80`
                }`}
              >
                <Icon size={14} />
                <span className="font-bold">{v.key}</span>
                <span className="opacity-80">· {v.title}</span>
              </button>
            );
          })}
        </div>

        {vaikSystems
          .filter((v) => v.key === activeVaik)
          .map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.key} className={`rounded-xl border ${v.ring} p-3 relative overflow-hidden`}>
                <Icon className={`absolute -right-4 -bottom-4 ${v.text} opacity-10`} size={120} />
                <div className="flex items-center gap-2 mb-2 relative">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${v.tone} text-white grid place-items-center shadow`}>
                    <Icon size={16} />
                  </div>
                  <div className={`font-bold ${v.text}`}>
                    {v.key} · {v.title}
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-1.5 relative">
                  {v.preds.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm bg-card/70 border border-border/60 rounded-md px-2 py-1.5"
                    >
                      <Icon size={14} className={`${v.text} mt-0.5 shrink-0`} />
                      <span>«{p}»</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

        {/* all-at-glance accordion fallback */}
        <details className="mt-3 group">
          <summary className="cursor-pointer text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground">
            <ChevronDown size={12} className="group-open:rotate-180 transition" />
            Показать все системы одновременно
          </summary>
          <div className="grid sm:grid-cols-2 gap-2 mt-3">
            {vaikSystems.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.key} className={`rounded-lg border ${v.ring} p-2.5`}>
                  <div className={`flex items-center gap-1.5 font-bold text-sm ${v.text} mb-1`}>
                    <Icon size={14} /> {v.key} · {v.title}
                  </div>
                  <ul className="text-xs space-y-0.5">
                    {v.preds.map((p, i) => (
                      <li key={i} className="flex gap-1.5">
                        <Icon size={10} className={`${v.text} mt-1 shrink-0`} />
                        <span>«{p}»</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}

/* ---------- Гамбургер (ОСВК) ---------- */

export default Rapport;
