import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Shuffle } from "lucide-react";
import { OPEN_QUESTIONS, OPEN_QUESTION_TOPICS, type OpenQuestion } from "@/lib/open-questions-data";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function OpenQuestions({ hideHeader }: { hideHeader?: boolean } = {}) {
  const [topicId, setTopicId] = useState(0);
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [order, setOrder] = useState<number[]>(() =>
    OPEN_QUESTIONS.map((_, i) => i)
  );

  const filtered = useMemo(() => {
    const base = topicId === 0
      ? OPEN_QUESTIONS
      : OPEN_QUESTIONS.filter((q) => q.topic === topicId);
    return order
      .map((i) => OPEN_QUESTIONS[i])
      .filter((q) => topicId === 0 || q.topic === topicId);
  }, [topicId, order]);

  const current: OpenQuestion | undefined = filtered[index];
  const total = filtered.length;

  const go = (delta: number) => {
    setIndex((prev) => {
      const next = prev + delta;
      if (next < 0 || next >= total) return prev;
      return next;
    });
    setUserAnswer("");
    setShowAnswer(false);
  };

  const handleTopicChange = (id: number) => {
    setTopicId(id);
    setIndex(0);
    setUserAnswer("");
    setShowAnswer(false);
  };

  const handleShuffle = () => {
    setOrder(shuffle(OPEN_QUESTIONS.map((_, i) => i)));
    setIndex(0);
    setUserAnswer("");
    setShowAnswer(false);
  };

  if (!current) return null;

  const topic = OPEN_QUESTION_TOPICS.find((t) => t.id === current.topic);
  const accentColor = topic?.color ?? "#6366f1";

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          {!hideHeader && <h2 className="text-2xl font-semibold tracking-tight">Открытые вопросы</h2>}
          <p className="text-sm text-muted-foreground mt-0.5">Напишите ответ, затем сравните с эталоном</p>
        </div>
        <button
          onClick={handleShuffle}
          title="Перемешать вопросы"
          className="shrink-0 w-9 h-9 grid place-items-center rounded-lg bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
        >
          <Shuffle size={16} />
        </button>
      </div>

      {/* Topic pills */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {OPEN_QUESTION_TOPICS.map((t) => {
          const isActive = t.id === topicId;
          return (
            <button
              key={t.id}
              onClick={() => handleTopicChange(t.id)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={
                isActive
                  ? { background: t.color, color: "#fff" }
                  : { background: "var(--secondary)", color: "var(--foreground)" }
              }
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {index + 1} / {total}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%`, background: accentColor }}
          />
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: accentColor + "22", color: accentColor }}
        >
          {current.topicLabel}
        </span>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
        <p className="text-base font-semibold leading-snug">{current.q}</p>

        {/* User answer textarea */}
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Напишите свой ответ здесь…"
          rows={5}
          className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/50"
        />

        {/* Show/hide answer button */}
        <button
          onClick={() => setShowAnswer((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          style={
            showAnswer
              ? { background: accentColor + "22", color: accentColor }
              : { background: "var(--secondary)", color: "var(--foreground)" }
          }
        >
          {showAnswer ? <EyeOff size={15} /> : <Eye size={15} />}
          {showAnswer ? "Скрыть эталонный ответ" : "Показать эталонный ответ"}
        </button>

        {/* Model answer */}
        {showAnswer && (
          <div
            className="rounded-xl border p-4 text-sm leading-relaxed whitespace-pre-line"
            style={{ borderColor: accentColor + "44", background: accentColor + "0d", color: "var(--foreground)" }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: accentColor }}>
              Эталонный ответ
            </p>
            {current.a}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-secondary text-foreground disabled:opacity-30 transition-opacity"
        >
          <ChevronLeft size={16} />
          Назад
        </button>

        <button
          onClick={() => go(1)}
          disabled={index === total - 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white disabled:opacity-30 transition-opacity"
          style={{ background: accentColor }}
        >
          Вперёд
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
