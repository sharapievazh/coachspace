import { AlertOctagon, AlertTriangle, Compass, Eye, HelpCircle, Lightbulb, ShieldCheck } from "lucide-react";
import { SectionHead } from "./_shared";

function Swot() {
  const cells = [
    { k: "S", title: "Strengths · Сильные стороны", Icon: ShieldCheck, grad: "from-emerald-500 to-teal-500", ring: "border-emerald-500/30 bg-emerald-500/5", ic: "text-emerald-600",
      q: ["В чём ты силён?", "Какие ресурсы у тебя уже есть?", "Что говорят другие о твоих сильных сторонах?"] },
    { k: "W", title: "Weaknesses · Слабые стороны", Icon: AlertOctagon, grad: "from-amber-500 to-orange-500", ring: "border-amber-500/30 bg-amber-500/5", ic: "text-amber-600",
      q: ["Что тебя ограничивает?", "Чего тебе не хватает?", "Где ты чаще всего спотыкаешься?"] },
    { k: "O", title: "Opportunities · Возможности", Icon: Lightbulb, grad: "from-sky-500 to-cyan-500", ring: "border-sky-500/30 bg-sky-500/5", ic: "text-sky-600",
      q: ["Какие тренды тебе на руку?", "Кто может стать союзником?", "Какие двери открыты прямо сейчас?"] },
    { k: "T", title: "Threats · Угрозы", Icon: AlertTriangle, grad: "from-rose-500 to-red-500", ring: "border-rose-500/30 bg-rose-500/5", ic: "text-rose-600",
      q: ["Что может пойти не так?", "Кто или что мешает?", "Какие риски ты избегаешь замечать?"] },
  ];
  const qIcons = [HelpCircle, Compass, Eye];
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Матрица SWOT" subtitle="Внутренняя и внешняя среда клиента" />
      <div className="grid sm:grid-cols-2 gap-4">
        {cells.map((c) => {
          const C = c.Icon;
          return (
            <div key={c.k} className={`relative overflow-hidden p-5 rounded-2xl border ${c.ring} max-w-full`}>
              {/* huge faded letter */}
              <div className={`absolute -right-4 -bottom-10 text-[clamp(60px,20vw,180px)] font-black leading-none bg-gradient-to-br ${c.grad} bg-clip-text text-transparent opacity-[0.12] pointer-events-none select-none`}>
                {c.k}
              </div>
              <div className="relative flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.grad} text-white grid place-items-center shadow-lg`}>
                  <C size={22} />
                </div>
                <div>
                  <div className={`text-2xl font-black bg-gradient-to-br ${c.grad} bg-clip-text text-transparent leading-none`}>{c.k}</div>
                  <h3 className="font-semibold text-foreground text-sm">{c.title}</h3>
                </div>
              </div>
              <ul className="relative space-y-2 text-sm text-foreground/85">
                {c.q.map((x, i) => {
                  const QI = qIcons[i % qIcons.length];
                  return (
                    <li key={i} className="flex items-start gap-2">
                      <QI size={14} className={`mt-0.5 shrink-0 ${c.ic}`} />
                      <span>{x}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-semibold flex items-center gap-2"><Lightbulb size={18} className="text-primary"/> Мосты SWOT — от Реальности к Возможностям</h3>
        <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
          <Bridge title="S × O — Усиление" text="Как сильные стороны помогут поймать возможности?" />
          <Bridge title="S × T — Защита" text="Как сильные стороны нейтрализуют угрозы?" />
          <Bridge title="W × O — Развитие" text="Какие возможности помогут преодолеть слабости?" />
          <Bridge title="W × T — Минимизация" text="Как защититься, где слабости встречаются с угрозами?" />
        </div>
      </div>
    </div>
  );
}
function Bridge({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-3 rounded-lg bg-secondary/60">
      <div className="font-medium text-primary text-xs mb-1">{title}</div>
      <div>{text}</div>
    </div>
  );
}

/* ---------- Пирамида Дилтса ---------- */

export default Swot;
