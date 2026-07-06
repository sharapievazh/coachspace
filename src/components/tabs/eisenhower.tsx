import { useState } from "react";
import { CalendarCheck, Flame, LayoutGrid, Trash2, UserPlus } from "lucide-react";

const EISENHOWER_DATA = [
  {
    key: "do",
    title: "Важные и срочные",
    action: "Сделай немедленно",
    en: "DO",
    icon: Flame,
    color: "bg-rose-500",
    lightBg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-900",
    desc: "Эти задачи требуют немедленного внимания и имеют серьёзные последствия, если их не выполнить. Обычно возникают из-за срочных проблем, дедлайнов или кризисов. Работа в этом квадранте создаёт стресс, но иногда неизбежна.",
    examples: [
      "Срочный дедлайн по проекту сегодня",
      "Технический сбой, требующий немедленного решения",
      "Звонок клиента с критической проблемой",
      "Предупреждение о возможном увольнении",
    ],
    questions: [
      "Что произойдёт, если это не сделать прямо сейчас?",
      "Это действительно кризис или созданная спешка?",
      "Какие задачи из этого квадранта можно было запланировать заранее?",
    ],
  },
  {
    key: "schedule",
    title: "Важные и несрочные",
    action: "Запланируй",
    en: "SCHEDULE",
    icon: CalendarCheck,
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-900",
    desc: "Здесь лежит стратегическое планирование, профессиональное развитие, отношения и здоровье. Эти задачи не горят, но определяют долгосрочный успех. Именно этот квадрант отличает эффективного профессионала от пожарного.",
    examples: [
      "Планирование квартальных целей",
      "Обучение и повышение квалификации",
      "Нетворкинг и укрепление отношений",
      "Спорт, сон и профилактика выгорания",
    ],
    questions: [
      "Какие задачи из этого квадранта дадут максимальный результат через 3 месяца?",
      "Что мешает вам уделять им время сейчас?",
      "Какие привычки помогут регулярно возвращаться сюда?",
    ],
  },
  {
    key: "delegate",
    title: "Неважные и срочные",
    action: "Делегируй",
    en: "DELEGATE",
    icon: UserPlus,
    color: "bg-sky-500",
    lightBg: "bg-sky-50",
    border: "border-sky-200",
    text: "text-sky-900",
    desc: "Срочные, но не важные для вас лично задачи. Чужие приоритеты, которые вы чувствуете обязанным сделать. Классический источник прокрастинации и отвлечения. Лучшее решение — передать другим или автоматизировать.",
    examples: [
      "Ответы на непрерывные рабочие чаты",
      "Перепроверка работы коллеги",
      "Участие в собрании без чёткой повестки",
      "Срочные просьбы, которые не ваши приоритеты",
    ],
    questions: [
      "Это действительно моя ответственность?",
      "Кто ещё может это сделать?",
      "Какие границы помогут защитить ваше время?",
    ],
  },
  {
    key: "delete",
    title: "Неважные и несрочные",
    action: "Удали / минимизируй",
    en: "DELETE",
    icon: Trash2,
    color: "bg-slate-500",
    lightBg: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-900",
    desc: "Безделье, привычки-вампиры и бессмысленная трата времени. Бесконечный скроллинг, пересмотр сериалов, непродуктивные переживания. Это не отдых — это побег. Настоящий отдых относится к квадранту SCHEDULE.",
    examples: [
      "Бесконечный скроллинг соцсетей",
      "Пересмотр сериалов без радости",
      "Переживания о невозможном контроле",
      "Участие в спорах без смысла",
    ],
    questions: [
      "Что из этого я делаю по привычке, а не по выбору?",
      "Какие активности здесь можно заменить настоящим отдыхом?",
      "Что я теряю, пока трачу время на это?",
    ],
  },
] as const;

function Eisenhower() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const active = openKey ? EISENHOWER_DATA.find((q) => q.key === openKey) : null;

  return (
    <div className="max-w-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <LayoutGrid className="text-accent" size={22} />
          Матрица Эйзенхауэра
        </h2>
        <p className="text-sm text-secondary-foreground mt-1">
          Тапните квадрант, чтобы увидеть описание, примеры и наводящие вопросы.
        </p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-[calc(100vh-280px)] min-h-[360px] max-h-[680px]">
        {EISENHOWER_DATA.map((q) => {
          const Icon = q.icon;
          return (
            <button
              key={q.key}
              onClick={() => setOpenKey(q.key)}
              className={`rounded-2xl border ${q.border} ${q.lightBg} p-4 sm:p-5 text-left flex flex-col gap-2 active:scale-[0.97] transition-transform duration-100 shadow-sm hover:shadow-md cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${q.color} grid place-items-center shadow-sm`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {q.en}
                </div>
              </div>
              <div className={`text-sm font-semibold leading-tight ${q.text}`}>
                {q.title}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {q.action}
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div className={`mt-4 rounded-2xl border ${active.border} ${active.lightBg} p-4 space-y-4`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${active.color} grid place-items-center shadow-sm`}>
              <active.icon size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-base font-bold ${active.text}`}>
                {active.en} — {active.title}
              </div>
              <div className="text-sm font-medium text-foreground">{active.action}</div>
            </div>
            <button
              type="button"
              onClick={() => setOpenKey(null)}
              className="text-xs text-muted-foreground px-2 py-1 rounded-md hover:bg-white/40"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-secondary-foreground leading-relaxed">
            {active.desc}
          </p>
          <div>
            <div className="text-xs font-semibold text-secondary-foreground uppercase tracking-wider mb-2">
              Примеры задач
            </div>
            <ul className="space-y-2">
              {active.examples.map((ex, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                  <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${active.color}`} />
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold text-secondary-foreground uppercase tracking-wider mb-2">
              Наводящие вопросы для клиента
            </div>
            <ul className="space-y-2">
              {active.questions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="shrink-0 mt-1 text-muted-foreground">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SMART-цель — интерактивный тренажёр
   ============================================================ */

export default Eisenhower;
