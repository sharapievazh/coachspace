import { CheckCircle2, FileText, Handshake, HeartHandshake, Lock, ShieldCheck, UserX } from "lucide-react";
import { SectionHead } from "./_shared";

const PRINCIPLES = [
  {
    icon: ShieldCheck, t: "Профессионализм", tone: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300",
    items: ["Работаю только в рамках своей компетенции", "Постоянно повышаю квалификацию и прохожу супервизию", "Честно представляю свои квалификацию и опыт", "Использую признанные модели и подходы"],
  },
  {
    icon: Lock, t: "Конфиденциальность", tone: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    items: ["Всё, что сказано на сессии, остаётся на сессии", "Согласие клиента — перед любым обсуждением кейса (в т.ч. супервизией)", "Заметки и записи храню безопасно", "Не раскрываю даже факт коучинга без разрешения"],
  },
  {
    icon: Handshake, t: "Договорённость и границы", tone: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
    items: ["До старта фиксируем цели, формат, сроки и правила", "Открыто обсуждаем оплату и условия отмены", "Право клиента завершить работу — в любой момент", "Никаких скрытых обязательств и «доездок»"],
  },
  {
    icon: UserX, t: "Конфликт интересов", tone: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
    items: ["Не совмещаю коучинг с консультированием по тем же вопросам", "Не работаю с близкими и зависимыми от меня людьми", "Не принимаю вознаграждение за рекомендации", "Обнаружил конфликт — открыто объявляю и передаю клиента коллеге"],
  },
];

const RED_FLAGS = [
  "Клиент просит «вылечить» — коуч не лечит, не психотерапевт и не юрист",
  "Тема выходит за рамки компетенции → передача профильному специалисту",
  "Зависимость клиента от коуча вместо роста самостоятельности",
  "Оценки и советы вместо вопросов и ответственности клиента",
  "Использование информации о клиенте в своих интересах",
];

function Ethics() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Этика коуча" subtitle="Кодекс профессиональной практики — стандарты ICF и ICU" />

      <div className="grid sm:grid-cols-2 gap-3">
        {PRINCIPLES.map((p) => {
          const I = p.icon;
          return (
            <div key={p.t} className={`rounded-2xl border p-4 ${p.tone}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-xl bg-background/70 grid place-items-center shrink-0"><I size={18} /></div>
                <div className="font-extrabold text-sm tracking-wide uppercase">{p.t}</div>
              </div>
              <ul className="space-y-1.5 text-xs">
                {p.items.map((x, i) => (
                  <li key={i} className="flex gap-2"><CheckCircle2 size={14} className="shrink-0 mt-0.5 opacity-70" /><span>{x}</span></li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><HeartHandshake size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Договор с клиентом — минимум пунктов</h3></div>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {["Цели и формат коучинга", "Роли и ответственность сторон", "Расписание и длительность сессий", "Стоимость и порядок оплаты", "Правила отмены и переноса", "Конфиденциальность и её границы", "Порядок завершения работы", "Как связываться между сессиями"].map((x, i) => (
            <div key={i} className="flex gap-2 items-start bg-secondary/60 rounded-lg px-3 py-2"><FileText size={13} className="text-primary shrink-0 mt-0.5" /><span>{x}</span></div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-rose-700 dark:text-rose-300 mb-2">Красные флаги — когда коуч нарушает этику</div>
        <ul className="space-y-1.5 text-xs">
          {RED_FLAGS.map((x, i) => (
            <li key={i} className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">!</span><span>{x}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300 mb-2">Итог</div>
        <p className="text-sm leading-relaxed">
          Этика — это безопасность клиента и репутация профессии. Договорённость на берегу, полная конфиденциальность, честность о своих возможностях и передача клиента специалисту, когда вопрос выходит за рамки коучинга.
        </p>
      </div>
    </div>
  );
}

export default Ethics;
