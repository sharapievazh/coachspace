import { useState } from "react";
import {
  Activity, Brain, ChevronRight, Eye, HelpCircle, Repeat, Sparkles, Waves, Wind,
} from "lucide-react";
import { SectionHead } from "./_shared";

const CONTEXTS = [
  { t: "Тупик", d: "Клиент не видит выхода: все привычные решения перепробованы и не работают." },
  { t: "Запрос клиента", d: "Клиент прямо просит глубоких изменений, а не тактического плана." },
  { t: "Противоречие ценностей", d: "Цель конфликтует с внутренними ценностями — движение блокируется изнутри." },
  { t: "Несколько сессий без результата", d: "Инструментальный коучинг не даёт сдвига — работаем на уровне идентичности." },
];

const WAVES = [
  { r: "Гамма (γ)", f: ">30 Гц", s: "Максимальная концентрация", tone: "from-violet-500 to-purple-600" },
  { r: "Бета (β)", f: "14–40 Гц", s: "Бодрствование, решение задач", tone: "from-blue-500 to-indigo-600" },
  { r: "Альфа (α)", f: "8–13 Гц", s: "Расслабление, покой", tone: "from-emerald-500 to-teal-600" },
  { r: "Тета (θ)", f: "4–8 Гц", s: "Изменённые состояния сознания", tone: "from-amber-500 to-orange-600" },
  { r: "Дельта (δ)", f: "1–4 Гц", s: "Глубокий сон, восстановление", tone: "from-slate-500 to-slate-700" },
];

const RELAX = [
  {
    t: "Аутотренинг по Шульцу",
    d: "Последовательные формулы самовнушения: тяжесть, тепло, ровное дыхание, спокойное сердце, тепло в солнечном сплетении, прохлада во лбу.",
    icon: Wind,
    tone: "from-emerald-500 to-teal-600",
  },
  {
    t: "Прогрессивная мышечная релаксация по Джекобсону",
    d: "Поочерёдное напряжение мышечной группы на 5–7 секунд и последующее полное расслабление — от кистей к лицу и стопам.",
    icon: Activity,
    tone: "from-blue-500 to-indigo-600",
  },
  {
    t: "Нерелигиозная медитация",
    d: "Наблюдение дыхания и телесных ощущений без оценки. 10–20 минут ежедневно, внимание мягко возвращается к якорю.",
    icon: Brain,
    tone: "from-violet-500 to-purple-600",
  },
];

const RELAX_SIGNS = [
  "Тяжесть в теле", "Тепло в конечностях", "Ровное медленное дыхание",
  "Замедление пульса", "Расслабление лица и челюсти", "Ощущение «растворения» границ тела",
  "Снижение внутреннего диалога", "Изменение восприятия времени", "Спонтанные образы",
  "Лёгкое подёргивание мышц", "Слюноотделение", "Нежелание двигаться",
];

const KUE = [
  { t: "Утвердительно", d: "Формулируем без частицы «не»: «я спокоен», а не «я не волнуюсь»." },
  { t: "Настоящее время", d: "Как будто это уже так: «я здоров», а не «я буду здоров»." },
  { t: "Без напряжения", d: "Никакого волевого усилия — установка произносится легко и безразлично." },
  { t: "Короткие паузы", d: "Между повторениями делаем небольшие паузы, не превращая в скороговорку." },
  { t: "Повторение до 30 раз", d: "Классика Куэ: 20–30 повторений утром при просыпании и вечером перед сном." },
];

const RAUCH = [
  { t: "Яркая", d: "Насыщенные цвета, свет, контраст — образ должен «светиться»." },
  { t: "Динамичная", d: "В картинке есть движение: вы действуете, а не смотрите фотографию." },
  { t: "Объёмная", d: "Есть глубина, звуки, запахи, телесные ощущения — образ трёхмерный." },
];

function TransformTech() {
  const [wave, setWave] = useState(2);
  const [relax, setRelax] = useState(0);
  const w = WAVES[wave];
  const R = RELAX[relax];
  const RIcon = R.icon;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Технологии трансформации" subtitle="Модуль 5 · Трансформационный коучинг" />

      {/* Что такое трансформация */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-amber-500/10 to-violet-500/15 p-5">
        <Sparkles className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Что такое трансформация</h3>
        <p className="mt-1 text-sm text-foreground/85">
          Трансформация — это переход в новую форму. Меняется не поведение на поверхности, а уровень
          убеждений и идентичности: клиент выходит из системы, в которой проблема была неразрешима.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-3">Когда применяется · 4 контекста</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {CONTEXTS.map((c, i) => (
            <div key={i} className="p-3 rounded-xl bg-secondary/60">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
                <div className="font-medium text-sm">{c.t}</div>
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{c.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Трансформационное состояние */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Waves size={18} className="text-primary" /> Трансформационное состояние</h3>
        <p className="text-sm text-muted-foreground mt-1">Возникает только при сочетании двух компонентов.</p>
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
            <div className="text-xs uppercase tracking-wide font-bold text-emerald-600">1 · Технология</div>
            <p className="text-sm text-foreground/90 mt-1">Точная последовательность шагов: релаксация, работа с убеждением, визуализация, закрепление.</p>
          </div>
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
            <div className="text-xs uppercase tracking-wide font-bold text-amber-600">2 · Среда</div>
            <p className="text-sm text-foreground/90 mt-1">Безопасность, тишина, отсутствие спешки, принимающая позиция коуча, доверие и раппорт.</p>
          </div>
        </div>
      </div>

      {/* Мозговые волны */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Brain size={18} className="text-primary" /> Мозговые волны</h3>
        <p className="text-sm text-muted-foreground mt-1">Нажмите на ритм, чтобы увидеть состояние.</p>
        <div className="mt-4 space-y-1.5">
          {WAVES.map((x, i) => {
            const act = i === wave;
            return (
              <button
                key={x.r}
                onClick={() => setWave(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  act ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary/60 hover:bg-secondary"
                }`}
              >
                <span className="text-sm font-semibold w-24 shrink-0">{x.r}</span>
                <span className={`text-xs font-mono w-20 shrink-0 ${act ? "opacity-90" : "text-muted-foreground"}`}>{x.f}</span>
                <span className="text-sm min-w-0 truncate">{x.s}</span>
              </button>
            );
          })}
        </div>
        <div className={`mt-4 p-4 rounded-2xl text-white bg-gradient-to-br ${w.tone}`}>
          <div className="text-xs uppercase tracking-wide opacity-90 font-bold">{w.r} · {w.f}</div>
          <div className="text-lg font-extrabold leading-tight mt-1">{w.s}</div>
          <p className="text-sm opacity-95 mt-1.5">
            Трансформационная работа идёт в альфа- и тета-диапазоне: критичность снижена, доступ к
            бессознательному материалу открыт.
          </p>
        </div>
      </div>

      {/* Релаксация */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Wind size={18} className="text-primary" /> Релаксация · 3 метода</h3>
        <div className="grid sm:grid-cols-3 gap-2 mt-4">
          {RELAX.map((m, i) => {
            const act = i === relax;
            const MI = m.icon;
            return (
              <button
                key={m.t}
                onClick={() => setRelax(i)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  act ? "bg-primary text-primary-foreground border-primary shadow-lg" : "bg-card border-border hover:border-primary/40"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl mb-2 grid place-items-center ${act ? "bg-white/20 text-white" : `bg-gradient-to-br ${m.tone} text-white`}`}>
                  <MI size={18} />
                </div>
                <div className="text-xs font-bold leading-tight">{m.t}</div>
              </button>
            );
          })}
        </div>
        <div className="mt-3 p-4 rounded-2xl bg-secondary/60 flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center bg-gradient-to-br ${R.tone} text-white`}>
            <RIcon size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm">{R.t}</div>
            <p className="text-sm text-foreground/85 mt-1">{R.d}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-2">12 признаков релаксации</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {RELAX_SIGNS.map((s, i) => (
              <div key={i} className="flex items-start gap-1.5 text-xs p-2 rounded-lg bg-secondary/50">
                <span className="text-primary font-bold shrink-0">{i + 1}</span>
                <span className="text-foreground/90">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Куэ */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Repeat size={18} className="text-primary" /> Самовнушение и аффирмации Эмиля Куэ</h3>
        <p className="text-sm text-muted-foreground mt-1">«Каждый день мне становится всё лучше и лучше во всех отношениях.»</p>
        <ol className="mt-4 space-y-2">
          {KUE.map((k, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
              <span className="pt-0.5"><span className="font-medium">{k.t}.</span> <span className="text-foreground/85">{k.d}</span></span>
            </li>
          ))}
        </ol>
      </div>

      {/* Раух */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2"><Eye size={18} className="text-primary" /> Визуализация по методу доктора Рауха</h3>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {RAUCH.map((r) => (
            <div key={r.t} className="p-4 rounded-xl border border-primary/25 bg-primary/5">
              <div className="text-sm font-bold text-primary">{r.t}</div>
              <p className="text-sm text-foreground/85 mt-1">{r.d}</p>
            </div>
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {[
            "Расслабиться до альфа-состояния.",
            "Войти в образ от первого лица, а не наблюдать со стороны.",
            "Удерживать картинку 2–3 минуты, добавляя детали всех модальностей.",
            "Завершить телесным ощущением результата и благодарностью.",
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
              <span className="text-foreground/90">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка коучу</div>
          <div className="text-sm font-medium text-foreground/90">
            Без релаксации трансформационная техника превращается в разговор о технике. Сначала состояние — потом содержание.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformTech;
