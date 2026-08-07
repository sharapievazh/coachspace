import React, { memo, useRef, useState, MutableRefObject } from "react";
import { Bell, Download, Pause, Play, RotateCcw, Sandwich, Sparkles } from "lucide-react";
import { OSVK_TEMPLATE } from "./_shared";

type Props = {
  duration: number;
  setDuration: (v: number) => void;
  remaining?: number;
  running: boolean;
  setRunning: (v: boolean) => void;
  reset: () => void;
  mmss: string;
  clientNameRef: MutableRefObject<string>;
  topicRef: MutableRefObject<string>;
  notesRef: MutableRefObject<string>;
  exportSession: () => void;
  testSound: () => void;
};

function SessionPanel(p: Props) {
  // Uncontrolled fields: typing updates DOM + refs only, with no React render
  // per keystroke. This avoids WKWebView keyboard deadlocks on iOS simulator/device.
  const notesElRef = useRef<HTMLTextAreaElement | null>(null);
  const [minutesInput, setMinutesInput] = useState(() => String(Math.floor(p.duration / 60)));

  const appendOsvkTemplate = () => {
    const el = notesElRef.current;
    if (!el) {
      p.notesRef.current = `${p.notesRef.current || ""}${OSVK_TEMPLATE}`;
      return;
    }

    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const next = `${el.value.slice(0, start)}${OSVK_TEMPLATE}${el.value.slice(end)}`;
    const caret = start + OSVK_TEMPLATE.length;
    el.value = next;
    p.notesRef.current = next;

    requestAnimationFrame(() => {
      try {
        el.focus({ preventScroll: true });
        el.setSelectionRange(caret, caret);
      } catch {
        el.focus();
      }
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-full">
      {/* Compact timer bar */}
      <div className="bg-card rounded-xl border border-border px-4 py-2.5 flex items-center gap-3 flex-wrap">
        <Sparkles size={14} className="text-primary shrink-0" />
        <span className="font-mono text-lg tabular-nums text-foreground font-medium">{p.mmss}</span>
        <div className="flex items-center gap-1.5">
          <button onClick={() => p.setRunning(!p.running)}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-primary-foreground hover:opacity-90 text-xs font-medium">
            {p.running ? <Pause size={12}/> : <Play size={12}/>} {p.running ? "Пауза" : "Старт"}
          </button>
          <button onClick={() => { p.reset(); setMinutesInput(String(Math.floor(p.duration / 60))); }}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-secondary hover:bg-muted">
            <RotateCcw size={12}/>
          </button>
          <button onClick={p.testSound}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-border bg-background hover:bg-secondary">
            <Bell size={12} className="text-primary"/>
          </button>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <input
            type="number" min="1" max="480" disabled={p.running}
            value={minutesInput}
            onChange={(e) => {
              setMinutesInput(e.target.value);
              const mins = parseInt(e.target.value, 10);
              if (!isNaN(mins) && mins > 0) p.setDuration(mins * 60);
            }}
            className="w-14 px-2 py-1 rounded-md border border-border bg-background text-center focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-40 text-xs"
          />
          <span className="text-xs text-muted-foreground">мин</span>
        </div>
      </div>

      {/* Main workspace */}
      <section className="bg-card rounded-2xl border border-border p-5 space-y-4">

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Клиент">
            <input defaultValue={p.clientNameRef.current} onInput={(e) => { p.clientNameRef.current = e.currentTarget.value; }}
              placeholder="Имя клиента"
              inputMode="text"
              autoComplete="off" autoCorrect="off" autoCapitalize="words" spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
          <Field label="Запрос сессии">
            <input defaultValue={p.topicRef.current} onInput={(e) => { p.topicRef.current = e.currentTarget.value; }}
              placeholder="Тема / цель"
              inputMode="text"
              autoComplete="off" autoCorrect="off" spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
        </div>
        <Field label="Потоковый блокнот · ценностные слова, инсайты, цитаты клиента">
          <textarea ref={notesElRef} defaultValue={p.notesRef.current} onInput={(e) => { p.notesRef.current = e.currentTarget.value; }}
            rows={20}
            placeholder="Веди заметки прямо во время сессии..."
            inputMode="text"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"/>
        </Field>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={appendOsvkTemplate}
            className="inline-flex items-center gap-2 px-4 min-h-11 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-500/15 to-orange-500/10 hover:from-amber-500/25 hover:to-orange-500/20 text-sm text-amber-700 dark:text-amber-300"
          >
            <Sandwich size={16}/> Маркер ОСВК
          </button>
          <button onClick={p.exportSession} className="inline-flex items-center gap-2 px-4 min-h-11 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            <Download size={16}/> Экспорт .txt
          </button>

        </div>
      </section>
    </div>
  );

}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      {children}
    </label>
  );
}

export default memo(SessionPanel);
