import { Button } from "@/components/ui/button";
import { GLOSSARY } from "@/lib/glossary-data";
const letters = [...new Set(GLOSSARY.map(term => term.letter))];
export default function Glossary() {
  return <div className="relative pr-9">
    <h2 className="text-2xl font-semibold mb-5">Глоссарий</h2>
    {letters.map(letter => <section key={letter} id={`letter-${letter}`} className="glossary-anchor mb-7">
      <h3 className="text-session font-bold py-2 border-b border-border">{letter}</h3>
      {GLOSSARY.filter(term => term.letter === letter).map(term => <article id={term.id} key={term.id} className="glossary-anchor py-4 border-b border-border">
        <h4 className="font-bold mb-1">{term.term}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{term.definition}</p>
      </article>)}
    </section>)}
    <nav aria-label="Алфавит глоссария" className="fixed right-1 sm:right-4 top-[var(--app-header-height,150px)] bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] flex flex-col justify-center z-20">
      {letters.map(letter => <Button key={letter} variant="ghost" aria-label={`Буква ${letter}`} className="h-auto min-h-6 w-7 px-0 py-0 text-[12px] text-session" onClick={() => document.getElementById(`letter-${letter}`)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>{letter}</Button>)}
    </nav>
  </div>;
}