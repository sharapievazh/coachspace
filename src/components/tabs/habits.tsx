import { Bell, Calendar, CheckCircle2, Repeat, Sparkles, Target, TrendingDown, Zap } from "lucide-react";
import { SectionHead } from "./_shared";

const LOOP = [
  { icon: Bell, t: "ТРИГГЕР", d: "Сигнал, запускающий привычку: время, место, эмоция, preceding действие.", tone: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300" },
  { icon: Repeat, t: "ДЕЙСТВИЕ", d: "Сама привычка — автоматический ритуал, который экономит энергию.", tone: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300" },
  { icon: Sparkles, t: "НАГРАДА", d: "Быстрое удовольствие или облегчение — закрепляет петлю.", tone: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300" },
];

const LAWS = [
  { n: 1, t: "СДЕЛАЙ ОЧЕВИДНЫМ", d: "Триггер на виду: кроссовки у двери, книга на подушке, напоминание в календаре." },
  { n: 2, t: "СДЕЛАЙ ПРИВЛЕКАТЕЛЬНЫМ", d: "Свяжи с удовольствием: «спорт + любимый подкаст», приятный ритуал перед сложным." },
  { n: 3, t: "СДЕЛАЙ ЛЁГКИМ", d: "Правило 2 минут: начни с микро-версии. Читаешь — одна страница, медитируешь — одна минута." },
  { n: 4, t: "СДЕЛАЙ ПРИЯТНЫМ", d: "Немедленное вознаграждение и видимый прогресс: трекер, галочки, маленький праздник." },
];

const QUESTIONS = [
  "Какую привычку вы хотите приобрести? Каким человеком вы станете с ней?",
  "Что сейчас мешает — чего не хватает: времени, энергии, триггера, награды?",
  "Какую микро-версию привычки вы сможете делать даже в худший день?",
  "Когда и где точно произойдёт действие? («После кофе — 5 минут растяжки»)",
  "Как вы отследите прогресс? Что будет наградой?",
  "От какой старой привычки придётся отказаться? Как пережить первые 3 дня?",
];

function Habits() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Работа с привычками" subtitle="Петля привычки · 4 закона изменения · микро-шаги" />

      <div className="grid sm:grid-cols-3 gap-3">
        {LOOP.map((x, i) => {
          const I = x.icon;
          return (
            <div key={x.t} className={`rounded-2xl border p-4 ${x.tone}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl bg-background/70 grid place-items-center shrink-0"><I size={18} /></div>
                <div className="font-extrabold text-sm tracking-wide">{x.t}</div>
              </div>
              <p className="text-xs leading-relaxed">{x.d}</p>
              {i < 2 && <div className="text-center mt-2 text-muted-foreground" aria-hidden>↓</div>}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><Zap size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">4 закона изменения привычки</h3></div>
        <div className="grid sm:grid-cols-2 gap-2">
          {LAWS.map((l) => (
            <div key={l.n} className="rounded-xl bg-secondary/60 p-3">
              <div className="font-bold text-xs mb-1"><span className="text-primary">{l.n}.</span> {l.t}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{l.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3"><Target size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Формула новой привычки</h3></div>
          <div className="rounded-xl bg-primary/10 border border-primary/30 p-3 text-center text-sm font-semibold mb-3">
            После [текущая привычка / событие] я сделаю [микро-действие 2 минуты]
          </div>
          <ul className="text-xs space-y-1.5">
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /><span>После утреннего кофе — 2 минуты дневника</span></li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /><span>Пришёл домой — сразу переоделся в форму для тренировки</span></li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" /><span>Лёг в постель — открыл книгу на одной странице</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">
          <div className="flex items-center gap-2 mb-3"><TrendingDown size={18} className="text-rose-600" /><h3 className="font-extrabold text-sm tracking-wide uppercase text-rose-700 dark:text-rose-300">Чтобы избавиться от привычки</h3></div>
          <ul className="text-xs space-y-1.5">
            <li className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">1.</span><span>Убери триггер — сделай плохую привычку незаметной</span></li>
            <li className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">2.</span><span>Подсвети издержки — посчитай реальную цену (деньги, время, энергия)</span></li>
            <li className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">3.</span><span>Добавь трение — усложни действие (удалить приложение, убрать из дома)</span></li>
            <li className="flex gap-2"><span className="text-rose-600 font-bold shrink-0">4.</span><span>Замени награду — чем именно вы теперь наградите себя?</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3"><Calendar size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Коучинговые вопросы</h3></div>
        <ul className="space-y-2 text-sm">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-2"><span className="text-primary font-bold shrink-0">{i + 1}.</span><span>{q}</span></li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          Привычка — не про силу воли, а про систему: триггер, лёгкое действие, награда. Начинайте с 2 минут, фиксируйте прогресс и помните: пропущенный день не рушит привычку, рушит решение бросить.
        </p>
      </div>
    </div>
  );
}

export default Habits;
