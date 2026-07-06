import { useState } from "react";
import { Star } from "lucide-react";
import { SectionHead } from "./_shared";

const ERICKSON_PRINCIPLES = [
  {
    short: "Со всеми всё ОК",
    full: "С человеком всё в порядке, он не нуждается в лечении или исправлении. Коучинг не «чинит сломанное», а открывает таланты и пути использования способностей.",
    color: "#fcd34d",
  },
  {
    short: "Есть все ресурсы",
    full: "Клиент обладает огромным внутренним потенциалом. Задача коуча — не давать советы, а помочь найти решения внутри себя.",
    color: "#fbbf24",
  },
  {
    short: "Позитивное намерение",
    full: "В основе каждого поступка лежит стремление достичь чего-то хорошего или полезного, даже если внешне действие кажется нелогичным.",
    color: "#f59e0b",
  },
  {
    short: "Изменения неизбежны",
    full: "Развитие и трансформация — это естественный процесс. Перемены обязательно произойдут.",
    color: "#fbbf24",
  },
  {
    short: "Наилучший выбор",
    full: "Человек всегда принимает самое оптимальное решение из всех доступных для него вариантов в конкретный момент времени.",
    color: "#fcd34d",
  },
];

function EricksonStar() {
  const [active, setActive] = useState<number>(0);
  const cx = 200, cy = 210, R = 160, r = 62;
  const points: { x: number; y: number; lx: number; ly: number }[] = [];
  const pathParts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (-Math.PI / 2) + (i * Math.PI) / 5;
    const rad = i % 2 === 0 ? R : r;
    const x = cx + rad * Math.cos(angle);
    const y = cy + rad * Math.sin(angle);
    pathParts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
    if (i % 2 === 0) {
      const lr = R + 36;
      points.push({
        x, y,
        lx: cx + lr * Math.cos(angle),
        ly: cy + lr * Math.sin(angle),
      });
    }
  }
  pathParts.push("Z");
  const starPath = pathParts.join(" ");
  const principle = ERICKSON_PRINCIPLES[active];

  return (
    <div className="space-y-5 max-w-4xl mx-auto max-w-full overflow-hidden">
      <SectionHead title="Звезда Принципов Эриксона" subtitle="Философский фундамент коучинга · 5 опор" />

      <div className="relative rounded-3xl border border-amber-500/40 bg-gradient-to-br from-indigo-950 via-violet-900 to-slate-800 p-4 sm:p-8 overflow-hidden">
        {/* constellation dots */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          {Array.from({ length: 30 }).map((_, i) => {
            const t = (i * 9301 + 49297) % 233280;
            const x = (t % 100);
            const y = ((t / 100) | 0) % 100;
            return (
              <span
                key={i}
                className="absolute w-[2px] h-[2px] rounded-full bg-amber-200/60 animate-pulse"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 7) * 0.4}s` }}
              />
            );
          })}
        </div>

        <div className="relative flex flex-col gap-5 items-center">
          <div className="relative aspect-square w-full max-w-sm mx-auto">
            <svg viewBox="0 0 400 420" className="w-full h-full">
              <defs>
                <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <radialGradient id="starGlow">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
                  <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <filter id="starShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <circle cx={cx} cy={cy} r={R + 40} fill="url(#starGlow)" />

              {/* constellation lines connecting tips */}
              {points.map((p, i) => {
                const n = points[(i + 2) % 5];
                return (
                  <line
                    key={`l${i}`}
                    x1={p.x} y1={p.y} x2={n.x} y2={n.y}
                    stroke="#fbbf24" strokeOpacity={active === i || active === (i + 2) % 5 ? 0.5 : 0.18}
                    strokeWidth="1"
                  />
                );
              })}

              <path
                d={starPath}
                fill="url(#starGold)"
                stroke="#fef3c7"
                strokeWidth="1.5"
                strokeLinejoin="round"
                filter="url(#starShadow)"
              />

              {/* clickable tip hotspots with large number badge */}
              {points.map((p, i) => (
                <g key={i} onClick={() => setActive(i)} className="cursor-pointer">
                  {active === i && (
                    <circle cx={p.x} cy={p.y} r="34" fill={principle.color} opacity="0.35">
                      <animate attributeName="r" values="28;42;28" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.45;0.15;0.45" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={p.x} cy={p.y}
                    r={active === i ? 24 : 20}
                    fill={active === i ? "#fff" : "#fde68a"}
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x} y={p.y + 7}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill="#7c2d12"
                  >
                    {i + 1}
                  </text>
                  <circle cx={p.x} cy={p.y} r="34" fill="transparent" />
                </g>
              ))}
            </svg>
          </div>

          <div className="w-full space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-300/80">Принцип {active + 1} из 5</div>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl grid place-items-center shrink-0 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${principle.color}, #b45309)` }}
              >
                <Star size={22} className="text-amber-50" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-100">{principle.short}</h3>
            </div>
            <p className="text-sm sm:text-base text-amber-50/85 leading-relaxed bg-black/30 rounded-xl p-4 border border-amber-500/20">
              {principle.full}
            </p>

            <div className="grid grid-cols-5 gap-1.5 pt-1">
              {ERICKSON_PRINCIPLES.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${active === i ? "bg-amber-300" : "bg-amber-500/25 hover:bg-amber-400/50"}`}
                  aria-label={p.short}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-6 pt-5 border-t border-amber-500/20 text-center">
          <p className="text-amber-200/90 italic text-sm sm:text-base">
            «Принципы Милтона Эриксона — фундамент коучинга»
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-5 gap-2">
        {ERICKSON_PRINCIPLES.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg p-2.5 text-left text-xs border transition-colors ${
              active === i
                ? "bg-amber-500/15 border-amber-500/60 text-amber-100"
                : "bg-card border-border text-muted-foreground hover:border-amber-500/40"
            }`}
          >
            <div className="font-mono text-[10px] opacity-70 mb-0.5">0{i + 1}</div>
            <div className="font-semibold leading-tight">{p.short}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ EISENHOWER MATRIX ============

export default EricksonStar;
