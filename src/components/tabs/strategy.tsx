import { Binoculars, CheckCircle2, Compass, Flag, Map, Mountain, Route, Target } from "lucide-react";
import { SectionHead } from "./_shared";

const STAGES = [
  { n: 1, icon: Binoculars, t: "ВИДЕНИЕ", d: "Куда клиент хочет прийти через 3–5 лет? Образ будущего без ограничений «как сейчас устроено».", q: "Опишите идеальный результат через 5 лет — чем вы занимаетесь, что вокруг?" },
  { n: 2, icon: Compass, t: "АНАЛИЗ ТЕКУЩЕГО", d: "Где точка А? Ресурсы, ограничения, среда, ключевые навыки.", q: "Где вы сейчас относительно этого образа? Что у вас уже есть?" },
  { n: 3, icon: Flag, t: "СТРАТЕГИЧЕСКИЕ ЦЕЛИ", d: "3–4 крупные цели на год-два, которые двигают к видению.", q: "Какие 3 цели за ближайший год дают наибольший сдвиг к видению?" },
  { n: 4, icon: Route, t: "СТРАТЕГИЯ И ВЫБОР", d: "Какими путями достижимо? Сравниваем варианты, выбираем фокус.", q: "Какие есть пути? Какой даёт максимум при ваших ресурсах?" },
  { n: 5, icon: Map, t: "ПЛАН ДЕЙСТВИЙ", d: "Декомпозиция до кварталов и конкретных шагов первого месяца.", q: "Что сделаете в первые 30 дней? Кто и что вам нужно?" },
  { n: 6, icon: Mountain, t: "КОНТРОЛЬ И КОРРЕКЦИЯ", d: "Точки сверки: метрики, регулярный обзор, готовность менять курс.", q: "По каким признакам поймёте, что стратегия работает? Когда пересмотрите?" },
];

const TOOLS = [
  { t: "GAPS-анализ", d: "Goals (цели) — Abilities (способности) — Perceptions (восприятие других) — Standards (стандарты успеха). Карта разрыва между точкой А и точкой Б." },
  { t: "Сценарное планирование", d: "Проработка 2–3 вариантов будущего: «оптимистичный / базовый / кризисный» — и план на каждый." },
  { t: "Колесо баланса сферы", d: "Оценка 6–8 направлений стратегии: рынок, продукт, команда, финансы, личная энергия." },
  { t: "Матрица Эйзенхауэра", d: "Приоритизация ежедневных действий относительно стратегических целей." },
];

function Strategy() {
  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Стратегический коучинг" subtitle="От видения к действию — работа с целями на год и дальше" />

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2"><Target size={18} className="text-primary" /><h3 className="font-extrabold text-sm tracking-wide uppercase">Чем отличается от операционного</h3></div>
        <div className="grid sm:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="font-bold mb-1">Операционный коучинг</div>
            <p className="text-muted-foreground">Конкретная задача, неделя-месяц, «как сделать то, что уже понятно на 80%».</p>
          </div>
          <div className="rounded-xl bg-primary/10 p-3 border border-primary/30">
            <div className="font-bold mb-1">Стратегический коучинг</div>
            <p className="text-muted-foreground">Направление и выбор, год и больше, «что делать и от чего отказаться, чтобы прийти в новую точку».</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-center text-sm font-extrabold tracking-widest uppercase text-muted-foreground">6 этапов стратегической сессии</h3>
        <div className="space-y-2">
          {STAGES.map((s, i) => {
            const I = s.icon;
            return (
              <div key={s.n} className="flex gap-3 items-start bg-card border border-border rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0"><I size={20} /></div>
                <div className="min-w-0">
                  <div className="font-extrabold text-sm tracking-wide">{s.n}. {s.t}</div>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.d}</p>
                  <p className="text-xs mt-1.5 italic text-primary">«{s.q}»</p>
                </div>
                {i < STAGES.length - 1 && <span className="hidden sm:block text-muted-foreground/40 self-center shrink-0">↓</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {TOOLS.map((t) => (
          <div key={t.t} className="rounded-2xl border border-border bg-card p-4">
            <div className="font-extrabold text-sm mb-1">{t.t}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.d}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <div className="flex items-center gap-2 mb-2"><CheckCircle2 size={18} className="text-emerald-600" /><div className="font-extrabold text-sm tracking-wide uppercase text-emerald-700 dark:text-emerald-300">Итог</div></div>
        <p className="text-sm leading-relaxed">
          Стратегический коучинг отвечает на три вопроса: КУДА (видение и цели), КАК (стратегия и план) и ЧТО МЕНЯЕТСЯ СЕГОДНЯ (первый шаг и контроль). Роль коуча — держать клиента в режиме выбора и ответственности, а не планировать за него.
        </p>
      </div>
    </div>
  );
}

export default Strategy;
