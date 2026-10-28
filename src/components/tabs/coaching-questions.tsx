import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import { COACHING_QUESTION_CATEGORIES, type QuestionCategory } from "@/lib/coaching-questions-data";

function QuestionCard({ question }: { question: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(question).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
      <p className="flex-1 text-sm leading-relaxed">{question}</p>
      <button
        onClick={copy}
        aria-label="Скопировать вопрос"
        className="shrink-0 mt-0.5 w-8 h-8 grid place-items-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
      >
        {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
      </button>
    </div>
  );
}

export default function CoachingQuestions() {
  const [activeId, setActiveId] = useState(COACHING_QUESTION_CATEGORIES[0].id);
  const pillsRef = useRef<HTMLDivElement>(null);

  const active: QuestionCategory =
    COACHING_QUESTION_CATEGORIES.find((c) => c.id === activeId) ?? COACHING_QUESTION_CATEGORIES[0];

  const handlePill = (id: string) => {
    setActiveId(id);
    // Scroll the pill into view
    const el = pillsRef.current?.querySelector<HTMLButtonElement>(`[data-id="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Коучинговые вопросы</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Нажмите на вопрос, чтобы скопировать его
        </p>
      </div>

      {/* Category pills */}
      <div
        ref={pillsRef}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {COACHING_QUESTION_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              data-id={cat.id}
              onClick={() => handlePill(cat.id)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={
                isActive
                  ? { background: cat.color, color: "#fff" }
                  : { background: "var(--secondary)", color: "var(--foreground)" }
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Section title */}
      <div className="flex items-center gap-3">
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ background: active.color }}
        />
        <h3 className="font-semibold text-base">{active.label}</h3>
        <span className="text-xs text-muted-foreground">{active.questions.length} вопросов</span>
      </div>

      {/* Questions */}
      <div className="space-y-2">
        {active.questions.map((q, i) => (
          <QuestionCard key={i} question={q} />
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pb-2">
        Всего {COACHING_QUESTION_CATEGORIES.reduce((s, c) => s + c.questions.length, 0)} вопросов в{" "}
        {COACHING_QUESTION_CATEGORIES.length} категориях
      </p>
    </div>
  );
}
