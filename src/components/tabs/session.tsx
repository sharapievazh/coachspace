import React from "react";
import { Bell, Download, Pause, Play, RotateCcw, Sandwich, Sparkles } from "lucide-react";
import { OSVK_TEMPLATE } from "./_shared";

function SessionPanel(p: any) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-full overflow-hidden">
      <section className="md:col-span-1 bg-card rounded-2xl border border-border p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Sparkles size={18} className="text-primary" /> Таймер сессии</h2>
        <div className="text-center py-6 rounded-xl bg-secondary">
          <div className="font-mono text-7xl tabular-nums text-foreground">{p.mmss}</div>
          <div className="text-xs text-muted-foreground mt-1">из {Math.floor(p.duration/60)} мин</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => p.setRunning(!p.running)} className="flex-1 inline-flex items-center justify-center gap-2 px-4 min-h-11 rounded-lg bg-primary text-primary-foreground hover:opacity-90">
            {p.running ? <Pause size={16}/> : <Play size={16}/>} {p.running ? "Пауза" : "Старт"}
          </button>
          <button onClick={p.reset} className="inline-flex items-center justify-center gap-2 px-4 min-h-11 min-w-11 rounded-lg bg-secondary hover:bg-muted">
            <RotateCcw size={16}/> Сброс
          </button>
        </div>
        <button
          onClick={p.testSound}
          className="w-full inline-flex items-center justify-center gap-2 px-4 min-h-11 rounded-lg border border-border bg-background hover:bg-secondary text-sm"
        >
          <Bell size={16} className="text-primary" /> Тест звука
        </button>
        <div className="flex gap-2 flex-wrap">
          {[20, 30, 45, 60, 90].map((m) => (
            <button key={m} onClick={() => p.setDuration(m*60)}
              className={`px-3 min-h-11 min-w-11 text-xs rounded-md border ${p.duration===m*60 ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
              {m} мин
            </button>
          ))}
        </div>
      </section>

      <section className="md:col-span-2 bg-card rounded-2xl border border-border p-5 space-y-4">

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Клиент">
            <input value={p.clientName} onChange={(e)=>p.setClientName(e.target.value)}
              placeholder="Имя клиента"
              autoComplete="off" autoCorrect="off" autoCapitalize="words" spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
          <Field label="Запрос сессии">
            <input value={p.topic} onChange={(e)=>p.setTopic(e.target.value)}
              placeholder="Тема / цель"
              autoComplete="off" autoCorrect="off" spellCheck={false}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"/>
          </Field>
        </div>
        <Field label="Потоковый блокнот · ценностные слова, инсайты, цитаты клиента">
          <textarea value={p.notes} onChange={(e)=>p.setNotes(e.target.value)}
            rows={14}
            placeholder="Веди заметки прямо во время сессии..."
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-y"/>
        </Field>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <button
            onClick={() => p.setNotes((p.notes || "") + OSVK_TEMPLATE)}
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

/* ---------- Visual helpers for rich block cards ---------- */

export default SessionPanel;
