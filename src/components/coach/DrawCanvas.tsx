import { useEffect, useRef, useState } from "react";
import { Eraser, Trash2 } from "lucide-react";

const COLORS = ["#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ffffff"];
const WIDTHS: { label: string; w: number }[] = [
  { label: "Тонко", w: 2 },
  { label: "Средне", w: 6 },
  { label: "Толсто", w: 14 },
];

const HEIGHT = 420;

export default function DrawCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const cssSize = useRef<{ w: number; h: number }>({ w: 0, h: HEIGHT });
  const [color, setColor] = useState(COLORS[0]);
  const [width, setWidth] = useState(6);
  const [eraser, setEraser] = useState(false);

  // Размер холста пересчитывается при любом изменении ширины контейнера
  // (в т.ч. когда вкладка была скрыта и ширина была 0), рисунок сохраняется.
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const resize = () => {
      const rect = c.getBoundingClientRect();
      const w = Math.round(rect.width);
      if (!w || w === cssSize.current.w) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // сохраняем текущее содержимое
      let prev: HTMLCanvasElement | null = null;
      if (c.width > 0 && c.height > 0) {
        prev = document.createElement("canvas");
        prev.width = c.width;
        prev.height = c.height;
        prev.getContext("2d")?.drawImage(c, 0, 0);
      }

      c.width = Math.round(w * dpr);
      c.height = Math.round(HEIGHT * dpr);
      c.style.height = `${HEIGHT}px`;
      cssSize.current = { w, h: HEIGHT };

      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, HEIGHT);
      if (prev) ctx.drawImage(prev, 0, 0, prev.width, prev.height, 0, 0, w, HEIGHT);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const sx = r.width ? cssSize.current.w / r.width : 1;
    const sy = r.height ? cssSize.current.h / r.height : 1;
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy };
  };

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = eraser ? "#ffffff" : color;
    ctx.lineWidth = eraser ? Math.max(width * 3, 18) : width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const p = pos(e);
    last.current = p;
    stroke(p, { x: p.x + 0.01, y: p.y + 0.01 });
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const p = pos(e);
    stroke(last.current, p);
    last.current = p;
  };
  const onUp = () => { drawing.current = false; last.current = null; };

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, cssSize.current.w, cssSize.current.h);
  };


  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button key={c} type="button" aria-label={`Цвет ${c}`}
              onClick={() => { setColor(c); setEraser(false); }}
              className={`h-7 w-7 rounded-full border transition-transform ${
                color === c && !eraser ? "ring-2 ring-primary ring-offset-2 ring-offset-card border-border" : "border-border"
              }`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex items-center gap-1">
          {WIDTHS.map((w) => (
            <button key={w.w} type="button" onClick={() => setWidth(w.w)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium border border-border ${
                width === w.w ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
              }`}>
              {w.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setEraser((v) => !v)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border ${
            eraser ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"
          }`}>
          <Eraser size={14}/> Ластик
        </button>
        <button type="button" onClick={clear}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border bg-background text-muted-foreground">
          <Trash2 size={14}/> Очистить
        </button>
      </div>

      <canvas ref={canvasRef}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
        className="w-full rounded-xl border border-border bg-white block"
        style={{ touchAction: "none" }} />
    </div>
  );
}
