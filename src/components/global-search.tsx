import { useEffect, useRef, useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchContent, type SearchEntry } from "@/lib/content-search";
export default function GlobalSearch({ entries, onClose, onSelect }: { entries: SearchEntry[]; onClose: () => void; onSelect: (entry: SearchEntry) => void }) {
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const start = useRef<{x: number; y: number} | null>(null);
  const results = searchContent(entries, query);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    root.current?.querySelector("input")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const controls = root.current?.querySelectorAll<HTMLElement>('input, button');
      if (!controls?.length) return;
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = overflow; document.removeEventListener("keydown", keydown); if (previous instanceof HTMLElement) previous.focus(); };
  }, [onClose]);
  return <div ref={root} role="dialog" aria-modal="true" aria-label="Поиск" className="fixed inset-0 z-50 bg-background flex flex-col pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]">
    <div className="border-b border-border p-4" onTouchStart={event => { const touch = event.touches[0]; if (touch) start.current = {x: touch.clientX, y: touch.clientY}; }} onTouchEnd={event => { const touch = event.changedTouches[0]; if (touch && start.current && touch.clientY - start.current.y > 80 && Math.abs(touch.clientX - start.current.x) < 60) onClose(); start.current = null; }}>
      <div className="max-w-3xl mx-auto flex gap-3 items-center"><Search className="text-session shrink-0" /><input aria-label="Поиск по приложению" placeholder="Поиск" value={query} onChange={event => setQuery(event.target.value)} className="min-w-0 flex-1 bg-card border border-border rounded-lg p-3 text-lg outline-none focus:ring-2 focus:ring-session" /><Button variant="ghost" size="icon" onClick={onClose} aria-label="Закрыть поиск"><X /></Button></div>
    </div>
    <div className="flex-1 overflow-y-auto p-4"><div className="max-w-3xl mx-auto">
      {(["Модули", "Инструменты", "Глоссарий", "Заметки"] as const).map(category => {
        const group = results.filter(entry => entry.category === category);
        return group.length > 0 && <section key={category} className="mb-7"><h3 className="text-sm font-bold text-muted-foreground mb-2">{category}</h3>{group.map(entry => <Button key={entry.id} variant="ghost" onClick={() => onSelect(entry)} className="w-full h-auto whitespace-normal text-left px-1 py-3 border-b border-border rounded-none justify-start"><span className="min-w-0 flex-1"><span className="block font-semibold">{entry.title}</span><span className="block text-sm text-muted-foreground line-clamp-2 mt-1">{entry.excerpt}</span></span><ChevronRight className="shrink-0 text-muted-foreground" /></Button>)}</section>;
      })}
      {query.trim() && !results.length && <p className="text-muted-foreground py-6 text-center">Ничего не найдено</p>}
    </div></div>
  </div>;
}