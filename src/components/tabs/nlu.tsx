import { useState } from "react";
import { CheckCircle2, Flag, Flower2, Footprints, Gem, Home, Lightbulb, Mountain, Target, TrendingUp, User, Wrench } from "lucide-react";
import { SectionHead } from "./_shared";

type DiltsLevel = {
  n: number;
  name: string;
  q: string;
  icon: typeof Flag;
  hex: string;       // pyramid fill
  textColor: string; // accent text color (left column)
  desc: string;
  focus: string;
};

const DILTS: DiltsLevel[] = [
  { n: 6, name: "МИССИЯ", q: "Ради чего?", icon: Mountain,
    hex: "#a78bfa", textColor: "text-violet-400",
    desc: "Ваш вклад в мир. Высшая цель и смысл существования.",
    focus: "Ради чего я живу? Какой след я хочу оставить?" },
  { n: 5, name: "ИДЕНТИЧНОСТЬ", q: "Кто я?", icon: User,
    hex: "#60a5fa", textColor: "text-blue-400",
    desc: "Кем вы себя видите. Ценности, убеждения, самоощущение.",
    focus: "Кто я? Во что верю? Что для меня важно?" },
  { n: 4, name: "УБЕЖДЕНИЯ И ЦЕННОСТИ", q: "Почему?", icon: Gem,
    hex: "#2dd4bf", textColor: "text-teal-400",
    desc: "Ваши убеждения, принципы и ценности, которые управляют поведением.",
    focus: "Почему я это делаю? Что для меня важно?" },
  { n: 3, name: "СПОСОБНОСТИ", q: "Как?", icon: Wrench,
    hex: "#86efac", textColor: "text-green-400",
    desc: "Ваши навыки, умения, таланты. То, что вы умеете делать.",
    focus: "Как я могу это сделать? Какие навыки мне нужны?" },
  { n: 2, name: "ПОВЕДЕНИЕ", q: "Что делаю?", icon: Footprints,
    hex: "#fbbf24", textColor: "text-yellow-400",
    desc: "Ваши действия и поступки. Конкретные шаги и поведение.",
    focus: "Что я делаю? Что я могу изменить в своих действиях?" },
  { n: 1, name: "ОКРУЖЕНИЕ", q: "Где? Когда? С кем?", icon: Home,
    hex: "#fb923c", textColor: "text-orange-400",
    desc: "Ваше окружение и контекст. Место, время, люди, ресурсы.",
    focus: "Где я? С кем я? Какие ресурсы у меня есть?" },
];

const DILTS_HOW: {
  n: number; t: string; d: string;
  icon: typeof Target;
  hex: string; ring: string; text: string;
}[] = [
  { n: 1, t: "Определите уровень", d: "На каком уровне находится ваш запрос сейчас?",
    icon: Target,    hex: "#6D28D9", ring: "ring-violet-500/40", text: "text-violet-400" },
  { n: 2, t: "Идите снизу вверх", d: "Начинайте изменения с нижних уровней и поднимайтесь вверх.",
    icon: TrendingUp, hex: "#2563EB", ring: "ring-blue-500/40",   text: "text-blue-400" },
  { n: 3, t: "Проверяйте согласованность", d: "Все уровни должны быть согласованы между собой.",
    icon: CheckCircle2, hex: "#0D9488", ring: "ring-teal-500/40", text: "text-teal-300" },
  { n: 4, t: "Меняйте глубинные уровни", d: "Устойчивые изменения происходят при работе с верхними уровнями.",
    icon: Flower2,   hex: "#EA580C", ring: "ring-orange-500/40", text: "text-orange-400" },
];

function Nlu() {
  const [active, setActive] = useState<number | null>(null);
  const rows = DILTS.length; // 6
  const ROW_H = 64; // px per row

  const activeLevel = active != null ? DILTS.find((l) => l.n === active) ?? null : null;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Пирамида Дилтса" subtitle="Неврологические уровни изменений — коснитесь уровня" />

      {/* PYRAMID — SVG trapezoids + HTML icon/tap overlay (reliable on iOS Safari) */}
      <div className="relative mx-auto w-full max-w-[360px]" style={{ height: rows * ROW_H }}>
        <svg viewBox={`0 0 360 ${rows * ROW_H}`} width="100%" height="100%" className="block absolute inset-0" preserveAspectRatio="none">
          {DILTS.map((lv, i) => {
            const isActive = active === lv.n;
            const topHalf = (i / rows) * 50;
            const botHalf = ((i + 1) / rows) * 50;
            const W = 360;
            const leftTop = (50 - topHalf) / 100 * W;
            const rightTop = (50 + topHalf) / 100 * W;
            const leftBottom = (50 - botHalf) / 100 * W;
            const rightBottom = (50 + botHalf) / 100 * W;
            const points = `${leftTop},${i * ROW_H} ${rightTop},${i * ROW_H} ${rightBottom},${(i + 1) * ROW_H} ${leftBottom},${(i + 1) * ROW_H}`;
            return (
              <polygon
                key={lv.n}
                points={points}
                fill={lv.hex}
                style={{
                  filter: isActive
                    ? `brightness(1.15) saturate(1.2) drop-shadow(0 0 24px ${lv.hex})`
                    : "none",
                }}
              />
            );
          })}
        </svg>
        {/* HTML overlay — icons + tap targets */}
        <div className="absolute inset-0">
          {DILTS.map((lv, i) => {
            const Icon = lv.icon;
            const topHalf = (i / rows) * 50;
            const botHalf = ((i + 1) / rows) * 50;
            const bandWidthPct = Math.max(topHalf, botHalf) * 2; // %
            const iconSize = Math.max(18, Math.min(30, Math.floor((bandWidthPct / 100) * 360 / 4)));
            return (
              <button
                key={lv.n}
                type="button"
                onClick={() => setActive(lv.n)}
                aria-label={lv.name}
                className="absolute left-0 right-0 flex items-center justify-center cursor-pointer transition-transform duration-100 active:scale-[0.97]"
                style={{ top: i * ROW_H, height: ROW_H, background: "transparent", border: 0, padding: 0 }}
              >
                <Icon size={iconSize} className="text-white drop-shadow shrink-0" strokeWidth={2.4} />
              </button>
            );
          })}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">
        Коснитесь уровня, чтобы узнать больше
      </p>


      {/* iOS-style bottom sheet */}
      <Drawer open={active != null} onOpenChange={(o) => { if (!o) setActive(null); }}>
        <DrawerContent className="z-[9999]">

          {activeLevel && (
            <>
              <DrawerHeader className="text-left">
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
                    style={{ background: activeLevel.hex }}
                  >
                    <span className="text-white font-black text-lg">{activeLevel.n}</span>
                  </div>
                  <div className="min-w-0">
                    <DrawerTitle className={`text-xl font-extrabold ${activeLevel.textColor}`}>
                      {activeLevel.name}
                    </DrawerTitle>
                    <DrawerDescription className="text-sm">
                      {activeLevel.q}
                    </DrawerDescription>
                  </div>
                </div>
              </DrawerHeader>
              <div className="px-4 pb-8 space-y-3">
                <p className="text-[15px] leading-relaxed text-foreground/90">
                  {activeLevel.desc}
                </p>
                <div
                  className="rounded-xl p-3"
                  style={{ background: activeLevel.hex + "1A" }}
                >
                  <p className={`text-sm font-semibold ${activeLevel.textColor}`}>
                    ▸ {activeLevel.focus}
                  </p>
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>


      {/* HOW-TO — 4 colored cards as in reference */}
      <div className="rounded-2xl border border-border bg-card/80 p-4 sm:p-5">
        <h3 className="text-center text-base sm:text-lg font-extrabold tracking-wide uppercase mb-4">
          Как работать с пирамидой Дилтса
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DILTS_HOW.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className={`rounded-xl bg-background/40 p-3 ring-1 ${s.ring} flex flex-col gap-2`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-7 h-7 rounded-full grid place-items-center text-xs font-black text-white shrink-0"
                    style={{ background: s.hex }}
                  >
                    {s.n}
                  </span>
                  <div className={`text-sm font-extrabold leading-tight ${s.text}`}>{s.t}</div>
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <div
                    className="w-12 h-12 rounded-lg grid place-items-center shrink-0"
                    style={{ background: s.hex + "1A", color: s.hex }}
                  >
                    <Icon size={28} strokeWidth={2.2} />
                  </div>
                  <p className="text-xs leading-snug text-foreground/85">{s.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRINCIPLE — lightbulb + quote + body, как на референсе */}
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
            <Lightbulb size={28} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold mb-2 leading-snug">
              <span className="text-primary font-extrabold uppercase tracking-wide mr-1">Принцип:</span>
              «Чтобы изменить результат, начните с изменения себя»
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Изменение окружения влияет на поведение. Изменение поведения развивает способности.
              Изменение способностей формирует убеждения. Изменение убеждений меняет идентичность.
              Изменение идентичности определяет вашу миссию.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Колесо баланса жизни (8 классических сфер) ---------- */

export default Nlu;
