import { useState } from "react";
import { ArrowRight, Brain, CheckCircle2, ChevronRight, ClipboardList, Eye, Flag, Laptop, Lightbulb, MessageCircle, MessageSquare, Search, ShieldCheck, Star, Target, Timer, User, Users } from "lucide-react";
import { SectionHead, ArrowDownTip } from "./_shared";

const SUP_TYPES = [
  {
    name: "IN VITRO («В ПРОЦЕССЕ»)", icon: Timer, color: "border-amber-500/40 bg-amber-500/10",
    desc: "Обсуждение во время сессии (онлайн или в отдельной комнате).",
    when: ["При сложных ситуациях", "Когда нужно быстрое вмешательство", "Для новичков", "При острых эмоциях"],
  },
  {
    name: "IN VIVO («В ЖИВУЮ»)", icon: Eye, color: "border-emerald-500/40 bg-emerald-500/10",
    desc: "Наблюдение супервизора за работой специалиста с клиентом.",
    when: ["Для развития навыков", "Для объективной оценки", "При обучении новичков", "Для работы с телом, голосом, невербаликой"],
  },
  {
    name: "ОБСУЖДЕНИЕ (DEBRIEFING)", icon: MessageSquare, color: "border-sky-500/40 bg-sky-500/10",
    desc: "Структурированное обсуждение прошедшей работы.",
    when: ["После завершения сессии/проекта", "Для анализа результатов", "Для планирования дальнейших шагов", "Для работы с долгосрочными случаями"],
  },
];

const SUP_PROCESS = [
  { n: 1, t: "ЗАПРОС", icon: Search, q: ["Какой кейс вы хотите разобрать?", "Что вызывает затруднение?", "Какой результат вы ожидаете от супервизии?"] },
  { n: 2, t: "КОНТЕКСТ", icon: User, q: ["С каким запросом пришёл/а клиент?", "Какова цель работы?", "На каком этапе вы сейчас?"] },
  { n: 3, t: "ЧТО ПРОИСХОДИЛО", icon: ClipboardList, q: ["Что происходило на сессии/в работе?", "Какие техники использовали?", "Что сработало хорошо?", "Что вызвало трудности?"] },
  { n: 4, t: "РЕФЛЕКСИЯ СПЕЦИАЛИСТА", icon: Brain, q: ["Что вы чувствовали?", "Что вас зацепило?", "Какие ваши реакции могли повлиять на процесс?"] },
  { n: 5, t: "АНАЛИЗ И ИНСАЙТЫ", icon: Lightbulb, q: ["Что происходит с клиентом глубже?", "Какие потребности и ограничения есть?", "Какие есть ресурсы?", "Что вы не замечаете?"] },
  { n: 6, t: "РЕШЕНИЯ И ПЛАН", icon: Target, q: ["Какие варианты работы возможны?", "Какой следующий шаг будет полезным?", "Что вы сделаете по-другому?"] },
  { n: 7, t: "ЗАВЕРШЕНИЕ", icon: Flag, q: ["Что было самым ценным?", "Какие инсайты вы получили?", "Что возьмёте в работу?", "Какой конкретный шаг сделаете?"] },
];

function Supervision() {
  const [step, setStep] = useState(1);
  const cur = SUP_PROCESS.find((s) => s.n === step)!;
  const CurI = cur.icon;

  const vitro = SUP_TYPES[0];
  const vivo = SUP_TYPES[1];
  const debrief = SUP_TYPES[2];

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Виды супервизии" subtitle="Система профессиональной поддержки и развития специалиста" />

      {/* ===== HIERARCHY DIAGRAM ===== */}
      <div className="relative">
        {/* Root */}
        <div className="mx-auto max-w-2xl rounded-2xl bg-[#1e3a6e] text-white p-5 flex items-start gap-3 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/10 grid place-items-center shrink-0">
            <Users size={26} />
          </div>
          <div>
            <div className="text-lg font-extrabold tracking-wide">СУПЕРВИЗИЯ</div>
            <p className="text-sm text-white/80 mt-1 leading-snug">
              Профессиональное обсуждение работы специалиста для повышения компетентности и качества помощи клиенту.
            </p>
          </div>
        </div>

        {/* Vertical trunk + horizontal split lines */}
        <div className="relative mx-auto" style={{ height: 36 }}>
          <div className="absolute left-1/2 top-0 w-px h-4 bg-border" />
          <div className="absolute left-[25%] right-[25%] top-4 h-px bg-border" />
          <div className="absolute left-[25%] top-4 w-px h-5 bg-border" />
          <div className="absolute left-[75%] top-4 w-px h-5 bg-border" />
          <ArrowDownTip className="absolute left-[25%] -translate-x-1/2 top-7" />
          <ArrowDownTip className="absolute left-[75%] -translate-x-1/2 top-7" />
        </div>

        {/* Two branches */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT — Непосредственная */}
          <div className="space-y-3">
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/40 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 grid place-items-center shrink-0">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="font-extrabold text-emerald-700 dark:text-emerald-300 tracking-wide text-sm">НЕПОСРЕДСТВЕННАЯ СУПЕРВИЗИЯ</div>
                <p className="text-xs text-muted-foreground mt-1">Проводится в реальном времени или сразу после работы с клиентом.</p>
              </div>
            </div>

            {/* Split into two sub-children */}
            <div className="relative h-7">
              <div className="absolute left-1/2 top-0 w-px h-3 bg-emerald-500/40" />
              <div className="absolute left-[25%] right-[25%] top-3 h-px bg-emerald-500/40" />
              <div className="absolute left-[25%] top-3 w-px h-3 bg-emerald-500/40" />
              <div className="absolute left-[75%] top-3 w-px h-3 bg-emerald-500/40" />
              <ArrowDownTip className="absolute left-[25%] -translate-x-1/2 top-5" color="#10b981" />
              <ArrowDownTip className="absolute left-[75%] -translate-x-1/2 top-5" color="#10b981" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[vitro, vivo].map((s) => {
                const I = s.icon;
                return (
                  <div key={s.name} className={`rounded-xl border p-3 ${s.color}`}>
                    <div className="flex items-center gap-2 mb-1"><I size={16} /><div className="font-bold text-sm">{s.name}</div></div>
                    <p className="text-xs mb-2">{s.desc}</p>
                    <div className="text-[11px] font-semibold mb-1">Когда использовать:</div>
                    <ul className="text-[11px] space-y-0.5">{s.when.map((w, i) => <li key={i}>· {w}</li>)}</ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Удалённая */}
          <div className="space-y-3">
            <div className="rounded-2xl bg-sky-500/10 border border-sky-500/40 p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-700 dark:text-sky-300 grid place-items-center shrink-0">
                <Laptop size={20} />
              </div>
              <div>
                <div className="font-extrabold text-sky-700 dark:text-sky-300 tracking-wide text-sm">УДАЛЁННАЯ СУПЕРВИЗИЯ</div>
                <p className="text-xs text-muted-foreground mt-1">Проводится после завершения работы (сессии, проекта, периода).</p>
              </div>
            </div>

            <div className="relative h-7">
              <div className="absolute left-1/2 top-0 w-px h-5 bg-sky-500/40" />
              <ArrowDownTip className="absolute left-1/2 -translate-x-1/2 top-5" color="#0ea5e9" />
            </div>

            <div className={`rounded-xl border p-3 ${debrief.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare size={16} />
                <div className="font-bold text-sm">{debrief.name}</div>
              </div>
              <p className="text-xs mb-2">{debrief.desc}</p>
              <div className="text-[11px] font-semibold mb-1">Когда использовать:</div>
              <ul className="text-[11px] space-y-0.5">{debrief.when.map((w, i) => <li key={i}>· {w}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      {/* ===== КОГДА КАКОЙ ВИД ВЫБИРАТЬ? ===== */}
      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">
          Когда какой вид выбирать?
        </h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="font-extrabold text-emerald-700 dark:text-emerald-300 mb-2 text-xs tracking-wide">НЕПОСРЕДСТВЕННАЯ (IN VITRO / IN VIVO)</div>
            <ul className="space-y-1 text-xs">
              {["Ситуация сложная и важна поддержка здесь и сейчас","Эмоции мешают работе","Нужна обратная связь в реальном времени","Вы развиваете новые навыки"].map((t,i)=>(
                <li key={i} className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5"/><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30">
            <div className="font-extrabold text-sky-700 dark:text-sky-300 mb-2 text-xs tracking-wide">УДАЛЁННАЯ (ОБСУЖДЕНИЕ)</div>
            <ul className="space-y-1 text-xs">
              {["Ситуация уже завершена","Нужно глубоко проанализировать","Есть время на рефлексию","Нужно увидеть картину целиком"].map((t,i)=>(
                <li key={i} className="flex gap-2"><CheckCircle2 size={14} className="text-sky-600 shrink-0 mt-0.5"/><span>{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/30">
            <div className="font-extrabold text-violet-700 dark:text-violet-300 mb-2 text-xs tracking-wide">ЧТО ДАЁТ СУПЕРВИЗИЯ?</div>
            <ul className="space-y-1 text-xs">
              {["Профессиональный рост специалиста","Повышение качества работы с клиентами","Поддержка и снижение выгорания","Развитие осознанности и уверенности"].map((t,i)=>(
                <li key={i} className="flex gap-2"><CheckCircle2 size={14} className="text-violet-600 shrink-0 mt-0.5"/><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===== 7-STEP PROCESS WITH ARROWS ===== */}
      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">
          Как должна проходить супервизия?
        </h3>

        {/* Step cards with arrows between */}
        <div className="flex items-stretch gap-1 overflow-x-auto pb-2 -mx-1 px-1 sm:overflow-visible">
          {SUP_PROCESS.map((s, idx) => {
            const I = s.icon; const act = step === s.n;
            const tones = [
              "from-orange-500/15 to-orange-500/5 border-orange-500/40 text-orange-600",
              "from-amber-500/15 to-amber-500/5 border-amber-500/40 text-amber-600",
              "from-rose-500/15 to-rose-500/5 border-rose-500/40 text-rose-500",
              "from-violet-500/15 to-violet-500/5 border-violet-500/40 text-violet-500",
              "from-indigo-500/15 to-indigo-500/5 border-indigo-500/40 text-indigo-500",
              "from-emerald-500/15 to-emerald-500/5 border-emerald-500/40 text-emerald-600",
              "from-teal-500/15 to-teal-500/5 border-teal-500/40 text-teal-500",
            ];
            return (
              <div key={s.n} className="flex items-center shrink-0 sm:flex-1 sm:min-w-0">
                <button
                  onClick={() => setStep(s.n)}
                  className={`w-28 sm:w-auto sm:flex-1 rounded-xl border bg-gradient-to-b ${tones[idx]} p-2 text-center transition-all ${act ? "ring-2 ring-primary scale-[1.03]" : "hover:scale-[1.02]"}`}
                >
                  <div className="text-[10px] opacity-80 font-bold">{s.n}.</div>
                  <I size={18} className="mx-auto my-1" />
                  <div className="text-[10px] font-extrabold leading-tight uppercase tracking-tight">{s.t}</div>
                </button>
                {idx < SUP_PROCESS.length - 1 && (
                  <ArrowRight size={14} className="mx-0.5 text-muted-foreground/50 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active step detail */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><CurI size={20} /></div>
            <div className="font-extrabold tracking-wide">{cur.n}. {cur.t}</div>
          </div>
          <ul className="space-y-1.5 text-sm">
            {cur.q.map((q, i) => (
              <li key={i} className="flex gap-2"><ChevronRight size={16} className="text-primary shrink-0 mt-0.5" /><span>{q}</span></li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== FOOTER 3 CARDS ===== */}
      <div className="grid md:grid-cols-3 gap-3">
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3"><ShieldCheck size={18} className="text-primary" /><h4 className="font-extrabold text-sm tracking-wide uppercase">Правила эффективной супервизии</h4></div>
          <ul className="text-xs space-y-1.5">
            {["Конфиденциальность","Уважение и безопасность","Открытость и честность","Фокус на клиенте и профессиональном росте","Конструктивная обратная связь"].map((t,i)=>(
              <li key={i} className="flex gap-2"><span className="text-primary">·</span><span>{t}</span></li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3 justify-center"><h4 className="font-extrabold text-sm tracking-wide uppercase">Формула <span className="text-primary">GROW</span> для супервизии</h4></div>
          <div className="flex items-center justify-between gap-1">
            {[
              { L: "G", t: "Goal",    q: "Какова цель клиента?",      bg: "bg-emerald-500", text: "text-emerald-700" },
              { L: "R", t: "Reality", q: "Что происходит сейчас?",    bg: "bg-sky-500",     text: "text-sky-700" },
              { L: "O", t: "Options", q: "Какие есть варианты?",      bg: "bg-amber-500",   text: "text-amber-700" },
              { L: "W", t: "Will",    q: "Что будет сделано дальше?", bg: "bg-violet-500",  text: "text-violet-700" },
            ].map((g, i, arr) => (
              <div key={g.L} className="flex items-center shrink-0 flex-1">
                <div className="flex flex-col items-center text-center flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-full ${g.bg} text-white grid place-items-center font-black text-sm shadow`}>{g.L}</div>
                  <div className={`text-[10px] font-bold mt-1 ${g.text} dark:opacity-90`}>{g.t}</div>
                  <div className="text-[9px] text-muted-foreground leading-tight mt-0.5">{g.q}</div>
                </div>
                {i < arr.length - 1 && <ArrowRight size={12} className="text-muted-foreground/60 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2"><Star size={18} className="text-emerald-600" /><h4 className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</h4></div>
          <p className="text-xs leading-relaxed">Ясность в действиях, уверенность в решениях, рост профессионализма и результат для клиента.</p>
        </div>
      </div>
    </div>
  );
}

/* Small downward-arrow tip used in hierarchy diagrams */

export default Supervision;
