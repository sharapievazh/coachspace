import { useState } from "react";

/* ============================================================
   GROW — 4 уникальные SVG-иконки (G / R / O / W)
   ============================================================ */

export function GrowIcon({
  step,
  size = 56,
  className = "",
}: {
  step: "G" | "R" | "O" | "W";
  size?: number;
  className?: string;
}) {
  if (step === "G") {
    // GOAL — мишень с тремя стрелами
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="g-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="26" fill="url(#g-grad)" opacity="0.15" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="#10b981" strokeWidth="2" />
        <circle cx="32" cy="32" r="14" fill="none" stroke="#10b981" strokeWidth="2" />
        <circle cx="32" cy="32" r="6" fill="url(#g-grad)" />
        {/* 3 arrows converging into bullseye */}
        {[
          { x: 4, y: 10 },
          { x: 60, y: 14 },
          { x: 56, y: 58 },
        ].map((p, i) => (
          <g key={i}>
            <line x1={p.x} y1={p.y} x2="32" y2="32" stroke="#065f46" strokeWidth="1.6" strokeLinecap="round" />
            <polygon
              points={`${p.x},${p.y} ${p.x + (p.x < 32 ? 4 : -4)},${p.y - 1} ${p.x + (p.x < 32 ? 1 : -1)},${p.y + (p.y < 32 ? 4 : -4)}`}
              fill="#065f46"
            />
          </g>
        ))}
        <circle cx="32" cy="32" r="2.5" fill="#fef3c7" />
      </svg>
    );
  }
  if (step === "R") {
    // REALITY — сбалансированные весы
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
        <defs>
          <linearGradient id="r-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
        </defs>
        {/* central post */}
        <rect x="30" y="14" width="4" height="38" rx="1.5" fill="url(#r-grad)" />
        <circle cx="32" cy="12" r="3.5" fill="#0369a1" />
        {/* base */}
        <rect x="20" y="52" width="24" height="4" rx="2" fill="#0369a1" />
        {/* beam */}
        <line x1="10" y1="18" x2="54" y2="18" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" />
        {/* strings */}
        <line x1="12" y1="18" x2="12" y2="28" stroke="#0369a1" strokeWidth="1.2" />
        <line x1="52" y1="18" x2="52" y2="28" stroke="#0369a1" strokeWidth="1.2" />
        {/* pans */}
        <path d="M4 28 Q12 38 20 28 Z" fill="url(#r-grad)" stroke="#0369a1" strokeWidth="1.2" />
        <path d="M44 28 Q52 38 60 28 Z" fill="url(#r-grad)" stroke="#0369a1" strokeWidth="1.2" />
      </svg>
    );
  }
  if (step === "O") {
    // OPTIONS — три светящиеся лампочки, соединённые
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
        <defs>
          <radialGradient id="o-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="60%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </radialGradient>
        </defs>
        {/* connecting lines */}
        <line x1="16" y1="40" x2="32" y2="20" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="2 2" />
        <line x1="32" y1="20" x2="48" y2="40" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="2 2" />
        <line x1="16" y1="40" x2="48" y2="40" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="2 2" />
        {/* bulb helper */}
        {[
          { cx: 32, cy: 20 },
          { cx: 16, cy: 40 },
          { cx: 48, cy: 40 },
        ].map((b, i) => (
          <g key={i}>
            <circle cx={b.cx} cy={b.cy} r="9" fill="url(#o-glow)" opacity="0.35" />
            <path
              d={`M${b.cx - 5} ${b.cy + 2} Q${b.cx} ${b.cy - 10} ${b.cx + 5} ${b.cy + 2} L${b.cx + 3} ${b.cy + 6} L${b.cx - 3} ${b.cy + 6} Z`}
              fill="url(#o-glow)"
              stroke="#b45309"
              strokeWidth="0.8"
            />
            <line x1={b.cx - 2.5} y1={b.cy + 7.5} x2={b.cx + 2.5} y2={b.cy + 7.5} stroke="#7c2d12" strokeWidth="1" />
            <line x1={b.cx - 1.8} y1={b.cy + 9} x2={b.cx + 1.8} y2={b.cy + 9} stroke="#7c2d12" strokeWidth="1" />
          </g>
        ))}
      </svg>
    );
  }
  // W — WILL: кулак с флагом + стрелка пути
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
      <defs>
        <linearGradient id="w-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      {/* path arrow */}
      <path
        d="M6 56 Q18 52 22 44 T34 30"
        fill="none"
        stroke="#6d28d9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 3"
      />
      <polygon points="32,26 38,30 32,34" fill="#6d28d9" />
      {/* flag pole */}
      <line x1="44" y1="8" x2="44" y2="44" stroke="#4c1d95" strokeWidth="2.2" strokeLinecap="round" />
      {/* flag */}
      <path d="M44 10 L60 16 L44 22 Z" fill="url(#w-grad)" stroke="#4c1d95" strokeWidth="1" />
      {/* star on flag */}
      <polygon
        points="50,13 51.2,15.6 54,16 52,18 52.5,21 50,19.5 47.5,21 48,18 46,16 48.8,15.6"
        fill="#fef3c7"
      />
      {/* fist (stylised) */}
      <rect x="34" y="40" width="18" height="12" rx="3" fill="url(#w-grad)" stroke="#4c1d95" strokeWidth="1" />
      <line x1="38" y1="40" x2="38" y2="52" stroke="#4c1d95" strokeWidth="0.8" />
      <line x1="42" y1="40" x2="42" y2="52" stroke="#4c1d95" strokeWidth="0.8" />
      <line x1="46" y1="40" x2="46" y2="52" stroke="#4c1d95" strokeWidth="0.8" />
      <rect x="32" y="44" width="4" height="6" rx="1.5" fill="#6d28d9" />
    </svg>
  );
}

/* ============================================================
   КОЛЕСО БАЛАНСА — радар-чарт
   ============================================================ */

export function BalanceRadar({
  values,
  labels,
  colors,
  size = 360,
  active = null,
  onSelect,
}: {
  values: number[]; // 1..10, length 8
  labels: string[];
  colors?: string[];
  size?: number;
  active?: number | null;
  onSelect?: (i: number | null) => void;
}) {
  const n = values.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.3;
  const pad = 56; // extra room for outer labels

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;

  const point = (i: number, r: number) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r] as const;
  };

  const polygon = values
    .map((v, i) => {
      const [x, y] = point(i, (R * v) / 10);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  // Wedge path for a sector (hit area + active highlight)
  const wedgePath = (i: number, r: number) => {
    const half = Math.PI / n;
    const a1 = angle(i) - half;
    const a2 = angle(i) + half;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const x2 = cx + Math.cos(a2) * r;
    const y2 = cy + Math.sin(a2) * r;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      className="max-w-full"
      onClick={(e) => {
        if (e.target === e.currentTarget) onSelect?.(null);
      }}
    >
      <defs>
        <radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#c2410c" stopOpacity="0.75" />
        </radialGradient>
      </defs>
      {/* concentric rings (1..10) */}
      {Array.from({ length: 10 }, (_, k) => k + 1).map((k) => (
        <circle
          key={k}
          cx={cx}
          cy={cy}
          r={(R * k) / 10}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth={k === 10 ? 1.5 : 0.6}
          strokeDasharray={k === 10 ? "" : "2 3"}
          opacity={k === 10 ? 0.9 : 0.5}
        />
      ))}
      {/* active sector highlight */}
      {active != null && (
        <path
          d={wedgePath(active, R)}
          fill={colors?.[active] ?? "#c2410c"}
          opacity="0.18"
          pointerEvents="none"
        />
      )}
      {/* axes */}
      {Array.from({ length: n }).map((_, i) => {
        const [x, y] = point(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#cbd5e1" strokeWidth="0.6" />;
      })}
      {/* perfect circle reference (ideal wheel) */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.7" />
      {/* user polygon */}
      <polygon points={polygon} fill="url(#radar-fill)" stroke="#c2410c" strokeWidth="2.2" strokeLinejoin="round" pointerEvents="none" />
      {/* invisible wedge hit areas for click/hover */}
      {onSelect &&
        Array.from({ length: n }).map((_, i) => (
          <path
            key={`hit-${i}`}
            d={wedgePath(i, R + 18)}
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onSelect(i)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(active === i ? null : i);
            }}
          >
            <title>{labels[i]}</title>
          </path>
        ))}
      {/* user points */}
      {values.map((v, i) => {
        const [x, y] = point(i, (R * v) / 10);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={active === i ? 6 : 4}
            fill={colors?.[i] ?? "#c2410c"}
            stroke="#fff"
            strokeWidth="1.5"
            pointerEvents="none"
          />
        );
      })}
      {/* axis labels */}
      {labels.map((l, i) => {
        const [x, y] = point(i, R + 22);
        const anchor = x < cx - 4 ? "end" : x > cx + 4 ? "start" : "middle";
        const isActive = active === i;
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="10"
            fontWeight={isActive ? 900 : 700}
            fill={isActive ? (colors?.[i] ?? "#0f172a") : "#334155"}
            style={{ cursor: onSelect ? "pointer" : "default" }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(active === i ? null : i);
            }}
          >
            {i + 1}. {l.length > 18 ? l.slice(0, 17) + "…" : l}
          </text>
        );
      })}
      {/* center */}
      <circle cx={cx} cy={cy} r="3" fill="#0f172a" pointerEvents="none" />
    </svg>
  );
}

/* ============================================================
   ПИРАМИДА ДИЛТСА — кликабельная SVG-схема (6 уровней)
   ============================================================ */

export type DiltsLevel = {
  n: number;
  name: string;
  q: string;
  desc: string;
  focus: string;
  color: string; // hex
};

export function DiltsPyramidSvg({
  levels,
  active,
  onSelect,
}: {
  levels: DiltsLevel[]; // ordered top→bottom (6→1)
  active: number;
  onSelect: (n: number) => void;
}) {
  const W = 500;
  const H = 320;
  const apex = { x: 250, y: 10 };
  const base = { left: 120, right: 380, y: H - 10 };
  const rows = levels.length; // 6

  // linear interpolation along left/right edges
  const edge = (t: number) => {
    const lx = apex.x + (base.left - apex.x) * t;
    const rx = apex.x + (base.right - apex.x) * t;
    const y = apex.y + (base.y - apex.y) * t;
    return { lx, rx, y };
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="max-w-md mx-auto">
      {levels.map((lv, i) => {
        const top = edge(i / rows);
        const bot = edge((i + 1) / rows);
        const points = `${top.lx},${top.y} ${top.rx},${top.y} ${bot.rx},${bot.y} ${bot.lx},${bot.y}`;
        const cx = (top.lx + top.rx + bot.lx + bot.rx) / 4;
        const cy = (top.y + bot.y) / 2;
        const isActive = active === lv.n;
        // Top two narrow segments — label outside with leader line
        const labelOutside = i < 2;
        return (
          <g
            key={lv.n}
            onClick={() => onSelect(lv.n)}
            style={{ cursor: "pointer" }}
            opacity={isActive || active === 0 ? 1 : 0.7}
          >
            <polygon
              points={points}
              fill={lv.color}
              stroke={isActive ? "#0f172a" : "#fff"}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            {labelOutside ? (
              <>
                {/* leader line from right edge midpoint outward */}
                <line
                  x1={(top.rx + bot.rx) / 2}
                  y1={cy}
                  x2={420}
                  y2={cy}
                  stroke={isActive ? "#0f172a" : lv.color}
                  strokeWidth="1.2"
                />
                <text
                  x={426}
                  y={cy + 4}
                  fontSize="12"
                  fontWeight="800"
                  fill={isActive ? "#0f172a" : lv.color}
                >
                  {lv.n}. {lv.name}
                </text>
                <text
                  x={426}
                  y={cy + 18}
                  fontSize="9"
                  fill="#64748b"
                >
                  {lv.q}
                </text>
              </>
            ) : (
              <>
                <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                  {lv.n}. {lv.name}
                </text>
                <text x={cx} y={cy + 9} textAnchor="middle" fontSize="9" fill="#fff" opacity="0.9">
                  {lv.q}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ============================================================
   ТРЕУГОЛЬНИК КАРПМАНА — SVG с SOS-центром
   ============================================================ */

export function KarpmanTriangleSvg({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (role: string) => void;
}) {
  const W = 360;
  const H = 320;
  const cx = W / 2;
  // Triangle: Спасатель top, Жертва bottom-left, Преследователь bottom-right
  const A = { x: cx, y: 26, role: "Спасатель", color: "#0ea5e9" };
  const B = { x: 32, y: H - 24, role: "Жертва", color: "#f59e0b" };
  const C = { x: W - 32, y: H - 24, role: "Преследователь", color: "#e11d48" };
  const center = { x: cx, y: (A.y + B.y + C.y) / 3 + 6 };

  const Vertex = ({
    p,
    align,
  }: {
    p: { x: number; y: number; role: string; color: string };
    align: "top" | "bl" | "br";
  }) => {
    const isActive = active === p.role;
    return (
      <g onClick={() => onSelect(p.role)} style={{ cursor: "pointer" }}>
        <circle
          cx={p.x}
          cy={p.y}
          r={isActive ? 30 : 26}
          fill={p.color}
          opacity={isActive ? 1 : 0.92}
          stroke="#fff"
          strokeWidth="3"
        />
        <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
          {p.role}
        </text>
        {/* descriptor label outside */}
        <text
          x={p.x + (align === "bl" ? -32 : align === "br" ? 32 : 0)}
          y={p.y + (align === "top" ? -34 : 44)}
          textAnchor={align === "bl" ? "end" : align === "br" ? "start" : "middle"}
          fontSize="10"
          fontWeight="700"
          fill={p.color}
        >
          {align === "top" ? "помощь без запроса" : align === "bl" ? "бессилие" : "обвинение"}
        </text>
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="max-w-md mx-auto">
      {/* triangle edges with directional arrows */}
      <polygon
        points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {/* SOS center */}
      <circle cx={center.x} cy={center.y} r="48" fill="#fff" stroke="#0f172a" strokeWidth="1.5" />
      <text x={center.x} y={center.y - 6} textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
        SOS
      </text>
      <text x={center.x} y={center.y + 12} textAnchor="middle" fontSize="9" fill="#334155">
        Растождествление
      </text>
      <text x={center.x} y={center.y + 24} textAnchor="middle" fontSize="8" fill="#64748b">
        Где здесь твой выбор?
      </text>
      <Vertex p={A} align="top" />
      <Vertex p={B} align="bl" />
      <Vertex p={C} align="br" />
    </svg>
  );
}

/* small helper hook for active state demos if needed */
export function useToggle(init: number | null = null) {
  return useState<number | null>(init);
}
