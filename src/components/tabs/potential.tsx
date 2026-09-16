import { useEffect, useRef, useState } from "react";
import { Check, Compass, Eye, HelpCircle, Rocket, Save, Sparkles, Trash2 } from "lucide-react";
import { SectionHead } from "./_shared";

const KEY = "coach-space-potential-matrix";

const QUADRANTS = [
  {
    k: "known_used",
    title: "Знаю и реализую",
    hint: "Сильные стороны, которые уже работают на меня",
    ph: "Например: умею выстраивать доверие в команде…",
    icon: Check,
    tone: "from-emerald-500 to-teal-600",
    ring: "border-emerald-500/30 bg-emerald-500/5",
  },
  {
    k: "known_unused",
    title: "Знаю, но не реализую",
    hint: "Спящий потенциал — что мешает его включить?",
    ph: "Например: хорошо пишу, но не публикуюсь…",
    icon: Eye,
    tone: "from-amber-500 to-orange-600",
    ring: "border-amber-500/30 bg-amber-500/5",
  },
  {
    k: "unknown_guess",
    title: "Не знаю, но догадываюсь",
    hint: "Предчувствия и подсказки окружения",
    ph: "Например: мне говорят, что я хороший наставник…",
    icon: Compass,
    tone: "from-violet-500 to-purple-600",
    ring: "border-violet-500/30 bg-violet-500/5",
  },
  {
    k: "how_in_system",
    title: "Как реализовать в условиях системы",
    hint: "Конкретные шаги внутри реальных ограничений",
    ph: "Например: предложить руководителю пилот на 1 месяц…",
    icon: Rocket,
    tone: "from-blue-500 to-indigo-600",
    ring: "border-blue-500/30 bg-blue-500/5",
  },
] as const;

type Data = Record<string, string>;
const EMPTY: Data = { known_used: "", known_unused: "", unknown_guess: "", how_in_system: "" };

function Potential() {
  const [data, setData] = useState<Data>(EMPTY);
  const [saved, setSaved] = useState<number | null>(null);
  const flash = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setData({ ...EMPTY, ...(parsed.data ?? parsed) });
        if (parsed.at) setSaved(parsed.at);
      }
    } catch { /* ignore */ }
    return () => { if (flash.current) clearTimeout(flash.current); };
  }, []);

  const save = () => {
    const at = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify({ data, at })); } catch { /* ignore */ }
    setSaved(at);
  };

  const clear = () => {
    setData(EMPTY);
    setSaved(null);
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  };

  const filled = Object.values(data).filter((v) => v.trim()).length;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Мой потенциал" subtitle="Матрица 2×2 · сущностная трансформация" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-blue-500/10 to-violet-500/15 p-5">
        <Sparkles className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Карта своего потенциала</h3>
        <p className="mt-1 text-sm text-foreground/85">
          Заполните четыре квадранта. Записи сохраняются на этом устройстве — можно вернуться к ним на следующей сессии.
        </p>
        <div className="mt-3 text-xs text-muted-foreground">Заполнено квадрантов: {filled} / 4</div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {QUADRANTS.map((q) => {
          const QI = q.icon;
          return (
            <div key={q.k} className={`rounded-2xl border p-4 ${q.ring}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center bg-gradient-to-br ${q.tone} text-white`}>
                  <QI size={19} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold leading-tight">{q.title}</div>
                  <div className="text-xs text-muted-foreground">{q.hint}</div>
                </div>
              </div>
              <textarea
                rows={5}
                value={data[q.k] ?? ""}
                onChange={(e) => setData((d) => ({ ...d, [q.k]: e.target.value }))}
                placeholder={q.ph}
                className="mt-3 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm resize-y"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={save}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
        >
          <Save size={16} /> Сохранить
        </button>
        <button
          onClick={clear}
          className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-secondary text-sm font-medium hover:bg-muted"
        >
          <Trash2 size={16} /> Очистить
        </button>
        {saved && (
          <span className="text-xs text-muted-foreground">Сохранено: {new Date(saved).toLocaleString("ru-RU")}</span>
        )}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка коучу</div>
          <div className="text-sm font-medium text-foreground/90">
            Самый ценный квадрант — «Знаю, но не реализую»: там живут вторичные выгоды и страхи. Задержитесь в нём дольше остальных.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Potential;
