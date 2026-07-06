import { useState, useMemo, useRef } from "react";
import { Lightbulb, Share2 } from "lucide-react";
import { BalanceRadar } from "@/components/coach/CoachVisuals";
import { SectionHead, BALANCE_AREAS } from "./_shared";

const BALANCE_COLORS = ["#10b981", "#f43f5e", "#f97316", "#3b82f6", "#d97706", "#ef4444", "#a855f7", "#0ea5e9"];

function RadarWithTooltip({ scores, compareValues }: { scores: Record<number, number>; compareValues?: number[] }) {
  const [active, setActive] = useState<number | null>(null);
  const area = active != null ? BALANCE_AREAS[active] : null;
  const I = area?.icon;
  const values = useMemo(() => BALANCE_AREAS.map((a) => scores[a.n]), [scores]);
  const labels = useMemo(() => BALANCE_AREAS.map((a) => a.name), []);
  return (
    <div className="relative w-full max-w-md">
      <BalanceRadar
        values={values}
        labels={labels}
        colors={BALANCE_COLORS}
        active={active}
        onSelect={setActive}
        compareValues={compareValues}
      />
      {area && I && (
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-2 sm:bottom-2 w-[88%] max-w-sm rounded-xl border bg-card/95 backdrop-blur shadow-xl p-3 animate-in fade-in zoom-in-95 duration-200"
          style={{ borderColor: BALANCE_COLORS[active!] + "66" }}
        >
          <div className="flex items-start gap-2">
            <div
              className="w-8 h-8 rounded-lg grid place-items-center text-white shrink-0"
              style={{ background: BALANCE_COLORS[active!] }}
            >
              <I size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-bold text-sm leading-tight">
                  {area.n}. {area.name}
                </div>
                <span className="font-mono text-xs font-bold" style={{ color: BALANCE_COLORS[active!] }}>
                  {scores[area.n]} / 10
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {area.tips.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-1.5 py-0.5 rounded-full border"
                    style={{
                      borderColor: BALANCE_COLORS[active!] + "55",
                      color: BALANCE_COLORS[active!],
                      background: BALANCE_COLORS[active!] + "14",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-[11px] italic text-muted-foreground mt-1.5">{area.q}</p>
            </div>
            <button
              onClick={() => setActive(null)}
              className="text-muted-foreground hover:text-foreground text-xs leading-none p-1"
              aria-label="закрыть"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const BALANCE_SNAPSHOTS_KEY = "balance_snapshots";
type BalanceSnapshot = { date: string; scores: Record<number, number> };

function loadSnapshots(): BalanceSnapshot[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(BALANCE_SNAPSHOTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatSnapshotDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}.${mm}.${yy}`;
}

function Balance({ scores, onChange }: { scores: Record<number, number>; onChange: (s: Record<number, number>) => void }) {
  const average = (
    BALANCE_AREAS.reduce((s, a) => s + scores[a.n], 0) / BALANCE_AREAS.length
  ).toFixed(1);

  const [snapshots, setSnapshots] = useState<BalanceSnapshot[]>(() => loadSnapshots());
  const [showHistory, setShowHistory] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const lastSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
  const compareValues = showHistory && lastSnapshot
    ? BALANCE_AREAS.map((a) => lastSnapshot.scores[a.n] ?? 0)
    : undefined;

  const saveSnapshot = () => {
    const snap: BalanceSnapshot = { date: new Date().toISOString(), scores: { ...scores } };
    const next = [...snapshots, snap].slice(-5);
    setSnapshots(next);
    try { window.localStorage.setItem(BALANCE_SNAPSHOTS_KEY, JSON.stringify(next)); } catch {}
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 1500);
  };

  const shareWheel = async () => {
    if (!wheelRef.current) return;
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(wheelRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (!blob) return;
      const file = new File([blob], `balance-wheel-${formatSnapshotDate(new Date().toISOString())}.png`, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({ files: [file], title: "Колесо баланса", text: `Средний балл: ${average}/10` });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead
        title="Колесо баланса жизни"
        subtitle="Оцените каждую сферу вашей жизни по шкале от 1 до 10 и создайте свою гармоничную и наполненную жизнь"
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {BALANCE_AREAS.map((a) => {
          const I = a.icon;
          const v = scores[a.n];
          return (
            <div key={a.n} className={`rounded-2xl border p-4 ${a.color}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-card grid place-items-center shrink-0"><I size={20}/></div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground text-sm">{a.n}. {a.name}</div>
                  <p className="text-xs text-foreground/70 mt-1">{a.desc}</p>
                  <p className="text-xs italic mt-2">{a.q}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Оценка</span>
                  <span className="font-mono font-bold text-foreground">{v} / 10</span>
                </div>
                <input
                  type="range" min={1} max={10} value={v}
                  onChange={(e) => onChange({ ...scores, [a.n]: Number(e.target.value) })}
                  className="w-full accent-primary"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div ref={wheelRef} className="bg-card rounded-2xl border border-border p-4 sm:p-6 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-2 gap-2">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Ваше колесо баланса</div>
          {lastSnapshot && (
            <button
              onClick={() => setShowHistory((v) => !v)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                showHistory
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:text-foreground"
              }`}
              aria-pressed={showHistory}
            >
              История {showHistory ? "✓" : ""}
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-3 text-center max-w-md">
          Оранжевый полигон — ваши текущие оценки. Серый пунктирный круг — идеальный баланс.
          Чем «круглее» полигон — тем гармоничнее жизнь. Средний балл:{" "}
          <span className="font-bold text-foreground">{average} / 10</span>.
        </p>
        <RadarWithTooltip scores={scores} compareValues={compareValues} />
        {showHistory && lastSnapshot && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-4 h-0.5 border-t-2 border-dashed border-slate-500" />
              <span className="text-muted-foreground">До: {formatSnapshotDate(lastSnapshot.date)}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#c2410c" }} />
              <span className="text-muted-foreground">После: сегодня</span>
            </span>
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            onClick={saveSnapshot}
            className="px-3 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold active:scale-95 transition-transform"
          >
            📸 {saveFlash ? "Сохранено!" : "Сохранить результат"}
          </button>
          <button
            onClick={shareWheel}
            className="px-3 py-2 rounded-full border border-border text-sm font-semibold text-foreground active:scale-95 transition-transform inline-flex items-center gap-1.5"
          >
            <Share2 size={16} /> Поделиться
          </button>
        </div>
        {snapshots.length > 0 && (
          <div className="mt-3 text-[11px] text-muted-foreground">
            Сохранено снимков: {snapshots.length} / 5
          </div>
        )}
      </div>




      <div className="bg-card rounded-2xl border border-border p-5">
        <h3 className="font-semibold flex items-center gap-2 mb-3"><Lightbulb size={18} className="text-primary"/> Как работать с колесом</h3>
        <ol className="space-y-1.5 text-sm list-decimal pl-5">
          <li>Оцените каждую сферу от 1 (совсем не удовлетворены) до 10 (полностью удовлетворены).</li>
          <li>Отметьте баллы на шкале и соедините точки по кругу.</li>
          <li>Посмотрите, какие сферы «проседают» и требуют внимания.</li>
          <li>Определите конкретные шаги для улучшения баланса в жизни.</li>
        </ol>
      </div>

      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="text-xs uppercase tracking-wide text-emerald-700 font-bold mb-1">Гармоничная жизнь — это баланс</div>
        <p className="text-sm">Когда все сферы развиваются вместе, вы чувствуете радость, лёгкость и наполненность.</p>
        <p className="text-sm mt-3 italic text-foreground/70">♥ Баланс — это не совершенство, а осознанный выбор каждый день. ♥</p>
      </div>
    </div>
  );
}

/* ---------- Ценности ---------- */

export default Balance;
