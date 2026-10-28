import { useRef, useState } from "react";
import { Copy, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadNotes, NOTES_KEY, type Note } from "@/components/shell";
const steps = ["Что конкретно понравилось?", "Что стоило изменить / что можно улучшить?", "Общая позитивная оценка"];
export default function HamburgerFeedback() {
  const values = useRef(["", "", ""]);
  const [status, setStatus] = useState("");
  const text = () => `Обратная связь — Гамбургер\n\n${steps.map((step, i) => `${i + 1}. ${step}\n${values.current[i].trim() || "—"}`).join("\n\n")}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(text()); setStatus("Скопировано"); }
    catch { setStatus("Не удалось скопировать. Попробуйте ещё раз."); }
  };
  const save = () => {
    if (!values.current.some(value => value.trim())) { setStatus("Заполните хотя бы один шаг."); return; }
    const note: Note = { id: crypto.randomUUID(), text: text(), date: Date.now(), kind: "personal" };
    try { localStorage.setItem(NOTES_KEY, JSON.stringify([note, ...loadNotes()])); setStatus("Сохранено в заметки"); }
    catch { setStatus("Не удалось сохранить заметку. Попробуйте ещё раз."); }
  };
  return <div className="space-y-6 max-w-3xl">
    <h2 className="text-2xl font-semibold">Обратная связь — Гамбургер</h2>
    <p className="text-sm text-muted-foreground">Модель обратной связи «Гамбургер»: позитив → улучшение → позитив</p>
    {steps.map((step, i) => <label key={step} className="block">
      <span className="flex gap-2 items-start font-semibold mb-2"><span className={`w-6 h-6 shrink-0 rounded-full grid place-items-center text-[12px] ${i === 1 ? "bg-feedback-neutral/15 text-feedback-neutral" : "bg-feedback-positive/20 text-feedback-positive"}`}>{i + 1}</span>{step}</span>
      <textarea rows={4} aria-label={step} defaultValue="" onInput={event => { values.current[i] = event.currentTarget.value; }} className={`w-full rounded-lg border bg-card p-3 text-base outline-none focus:ring-2 focus:ring-session ${i === 1 ? "border-feedback-neutral/40" : "border-feedback-positive/40"}`} />
    </label>)}
    <div className="flex flex-wrap gap-3"><Button variant="outline" onClick={copy}><Copy />Скопировать</Button><Button onClick={save} className="bg-session text-session-foreground"><NotebookPen />Сохранить в заметки</Button></div>
    <p role="status" className="text-sm text-session">{status}</p>
  </div>;
}