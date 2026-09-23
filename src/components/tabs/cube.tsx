import { Box, CheckCircle2, Flag, Handshake, MessageSquareHeart, Play, Target } from "lucide-react";
import { SectionHead } from "./_shared";

const FACES = [
  {
    n: 1, icon: Handshake, t: "КОНТАКТ", tone: "from-sky-500/15 to-sky-500/5 border-sky-500/40 text-sky-600",
    d: "Разминка, самопрезентация, комплимент группе, договор о правилах. Создаём безопасность и включаем каждого.",
    q: "С каким настроением вы пришли? Что хотите забрать с собой?",
  },
  {
    n: 2, icon: Flag, t: "ЦЕЛЬ", tone: "from-amber-500/15 to-amber-500/5 border-amber-500/40 text-amber-600",
    d: "Общая цель тренинга и личные цели участников. Контракт: что будет на выходе, как измерим результат.",
    q: "Каким должен быть результат, чтобы вы сказали: «Время потрачено не зря»?",
  },
  {
    n: 3, icon: Target, t: "РЕАЛЬНОСТЬ", tone: "from-rose-500/15 to-rose-500/5 border-rose-500/40 text-rose-500",
    d: "Мини-теория + диагностика текущего уровня. Где команда сейчас? Что уже умеет, где разрыв?",
    q: "Где мы сейчас? Что уже работает хорошо?",
  },
  {
    n: 4, icon: Play, t: "ПРАКТИКА", tone: "from-violet-500/15 to-violet-500/5 border-violet-500/40 text-violet-500",
    d: "Отработка в парах/тройках: моделирование реальных ситуаций. 70% времени тренинга — именно практика.",
    q: "Попробуйте на реальном кейсе. Кто готов быть клиентом?",
  },
  {
    n: 5, icon: MessageSquareHeart, t: "ОБРАТНАЯ СВЯЗЬ", tone: "from-indigo-500/15 to-indigo-500/5 border-indigo-500/40 text-indigo-500",
    d: "Разбор по ОСВК / «Гамбургеру»: что сработало, что усилить. Баланс поддержки и фрустрации.",
    q: "Что сработало? Что попробуете иначе в следующий раз?",
  },
  {
    n: 6, icon: Box, t: "ДЕЙСТВИЕ", tone: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/40 text-emerald-600",
    d: "«Протяжка»: каждый формулирует конкретный шаг до следующей встречи. Итоги и фиксация инсайтов.",
    q: "Какой конкретный шаг вы сделаете до следующей встречи?",
  },
];

function Cube() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Коучинг-тренинг «Кубик»" subtitle="Формат коучинг-тренинга: обучение + практика + коучинговое сопровождение" />

      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Коучинг-тренинг сочетает мини-лекции с коучингом: участники не просто узнают модель, а применяют её к своим задачам здесь и на сессии. Структура «Кубика» — 6 граней, через которые проходит каждый блок тренинга. Одна грань — 15–30 минут.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {FACES.map((f) => {
          const I = f.icon;
          return (
            <div key={f.n} className={`rounded-2xl border bg-gradient-to-br p-4 ${f.tone}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-background/70 grid place-items-center shrink-0"><I size={20} /></div>
                <div>
                  <div className="text-[10px] font-bold opacity-70">ГРАНЬ {f.n}</div>
                  <div className="font-extrabold tracking-wide text-sm">{f.t}</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed mb-2">{f.d}</p>
              <p className="text-xs italic text-muted-foreground">«{f.q}»</p>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="font-extrabold text-sm tracking-wide uppercase mb-2">Пропорции формата</div>
          <ul className="text-xs space-y-1.5">
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>Теория — 20% времени, максимум 15 минут подряд</span></li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>Практика в парах — 50–60%</span></li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>Обратная связь и разбор — 20%</span></li>
            <li className="flex gap-2"><CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" /><span>Рефлексия и действия — каждый блок, не только в конце</span></li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="font-extrabold text-sm tracking-wide uppercase mb-2">Роль ведущего-коуча</div>
          <ul className="text-xs space-y-1.5">
            <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Управление группой: контакт, ритм, энергия, вовлечение каждого</span></li>
            <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Коучинговые вопросы вместо готовых ответов</span></li>
            <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Баланс поддержки и фрустрации — развивать, а не хвалить</span></li>
            <li className="flex gap-2"><span className="text-primary shrink-0">·</span><span>Ответственность за результат — у участников</span></li>
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          «Кубик» — это цикл: контакт → цель → реальность → практика → обратная связь → действие. Прокручивайте его для каждой темы тренинга, и участники уходят не с конспектами, а с опытом и конкретными шагами.
        </p>
      </div>
    </div>
  );
}

export default Cube;
