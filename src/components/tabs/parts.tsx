import { Baby, CheckCircle2, Merge, Puzzle, Shield, User } from "lucide-react";
import { SectionHead } from "./_shared";

const SIGNALS = [
  "«Часть меня хочет, а часть — боится»",
  "Саботаж собственных решений: цель ясна, действий нет",
  "Качели: мотивация → упадок → вина → новая мотивация",
  "Внутренний критик громче внутреннего союзника",
  "Разные «я» в разных контекстах: работа / семья / уединение",
];

const STEPS = [
  { n: 1, t: "ОБНАРУЖЕНИЕ", d: "«Сколько в вас мнений по этому вопросу? Дайте каждому название и образ».", icon: Puzzle },
  { n: 2, t: "ЗНАКОМСТВО", d: "Где живёт часть? Как выглядит, звучит? Какого она возраста? Когда появилась?", icon: User },
  { n: 3, t: "НАМЕРЕНИЕ", d: "«Чего эта часть хочет ДЛЯ вас?» За любым, даже разрушительным поведением — позитивное намерение (защита, безопасность).", icon: Shield },
  { n: 4, t: "ПРИЗНАНИЕ", d: "Поблагодарить часть за годы службы. Признание снимает сопротивление — часть перестаёт «воевать».", icon: CheckCircle2 },
  { n: 5, t: "ДИАЛОГ ЧАСТЕЙ", d: "Развести конфликтующие части по разным стульям/позициям и дать каждой высказаться без перебивания.", icon: Baby },
  { n: 6, t: "ВЗРОСЛЕНИЕ ЧАСТИ", d: "Части, «замороженные» в детском возрасте, получают опыт взрослого: «Что ты знаешь теперь, чего не знала тогда? Как ты позаботишься о себе по-новому?»", icon: Merge },
  { n: 7, t: "ИНТЕГРАЦИЯ", d: "Части соединяются вокруг общей цели: «Как вам действовать вместе — как одна команда?» Фиксируем новый образ себя.", icon: Merge },
];

const QUESTIONS = [
  "Опишите эту часть: где она в теле, какая у неё поза, что она говорит?",
  "Сколько ей лет? Когда она появилась в вашей жизни?",
  "Чего она для вас хочет — какова её забота о вас?",
  "Что случится, если вы её полностью проигнорируете?",
  "Чего ей не хватает, чтобы выполнять свою роль по-новому?",
  "Что бы ей сказала ваша взрослая мудрая часть?",
  "Как будут распределяться роли между частями после этой работы?",
];

function Parts() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Части личности" subtitle="Внутренние части · конфликт · взросление · интеграция" />

      <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><Puzzle size={20} /></div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Внутри каждого из нас живёт несколько «частей» — субличностей со своими мотивами, страхами и стратегиями. Внутренний конфликт — это не поломка, а две части, защищающие клиента разными способами. Коуч не «удаляет» часть, а помогает ей обновить стратегию и встроиться в целостную личность.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
        <div className="font-extrabold text-sm tracking-wide uppercase text-amber-700 dark:text-amber-300 mb-2">Признаки конфликта частей</div>
        <ul className="text-xs space-y-1.5">
          {SIGNALS.map((s, i) => <li key={i} className="flex gap-2"><span className="text-amber-600 font-bold shrink-0">!</span><span>{s}</span></li>)}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">7 шагов работы с частью личности</h3>
        <div className="space-y-2">
          {STEPS.map((s) => {
            const I = s.icon;
            return (
              <div key={s.n} className="flex gap-3 items-start bg-card border border-border rounded-2xl p-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0"><I size={17} /></div>
                <div>
                  <div className="font-extrabold text-sm tracking-wide">{s.n}. {s.t}</div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="font-extrabold text-sm tracking-wide uppercase mb-3">Вопросы для диалога с частью</div>
          <ul className="space-y-2 text-sm">
            {QUESTIONS.map((q, i) => (
              <li key={i} className="flex gap-2"><span className="text-primary font-bold shrink-0">{i + 1}.</span><span>{q}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
          <div className="font-extrabold text-sm tracking-wide uppercase text-rose-700 dark:text-rose-300 mb-2">Чего не делать</div>
          <ul className="text-xs space-y-1.5">
            {[
              "Не объявлять часть «врагом» или «слабостью»",
              "Не подавлять сильную часть силой воли другой части",
              "Не разбирать травматичный материал без подготовки клиента",
              "Не застревать в анализе — двигаться к намерению и новой роли",
              "Не интерпретировать за клиента: образы даёт сам клиент",
            ].map((x, i) => (
              <li key={i} className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">!</span><span>{x}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          Каждая часть когда-то помогла выжить. Работа с частями — это уважительный диалог, в котором часть получает признание, взрослеет и находит новую полезную роль. Итог — не борьба с собой, а внутренняя команда.
        </p>
      </div>
    </div>
  );
}

export default Parts;
