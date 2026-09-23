import { useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, RotateCcw, XCircle, GraduationCap, Award } from "lucide-react";
import { SectionHead } from "./_shared";
import { QUESTIONS, TOPICS, type Question } from "@/lib/quiz-questions";

const SESSION_SIZE = 20;
type Mode = "study" | "exam";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function pickSession(): Question[] {
  return shuffle(QUESTIONS).slice(0, Math.min(SESSION_SIZE, QUESTIONS.length));
}

function Quiz() {
  const [mode, setMode] = useState<Mode>("study");
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => pickSession(), [seed]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const correctCount = questions.reduce((n, q, i) => (answers[i] === q.c ? n + 1 : n), 0);
  const answeredCount = Object.keys(answers).length;

  const restart = (m: Mode = mode) => {
    setMode(m);
    setSeed((s) => s + 1);
    setIdx(0);
    setAnswers({});
    setDone(false);
  };

  const current = questions[idx];
  const picked = answers[idx];
  const showFeedback = mode === "study" && picked !== undefined;

  const choose = (i: number) => {
    if (picked !== undefined) return;
    setAnswers((a) => ({ ...a, [idx]: i }));
    if (mode === "exam") {
      if (idx + 1 >= total) setDone(true);
      else setTimeout(() => setIdx((v) => v + 1), 150);
    }
  };

  const next = () => {
    if (idx + 1 >= total) setDone(true);
    else setIdx((v) => v + 1);
  };

  const pct = total ? Math.round((correctCount / total) * 100) : 0;

  if (!current && !done) {
    return (
      <div className="space-y-6">
        <SectionHead title="Тест" subtitle="Подготовка к экзамену ICU" />
        <div className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          Банк вопросов пока пуст.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Тест" subtitle={`Подготовка к экзамену ICU · ${QUESTIONS.length} вопросов в базе`} />

      {/* Режимы */}
      <div className="flex items-center gap-2 rounded-xl bg-secondary p-1">
        {([
          { k: "study", label: "Учёба", icon: GraduationCap },
          { k: "exam", label: "Экзамен", icon: Award },
        ] as const).map((m) => {
          const MI = m.icon;
          const active = mode === m.k;
          return (
            <button
              key={m.k}
              onClick={() => restart(m.k)}
              className={`flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 min-h-10 text-sm font-medium transition ${
                active ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
              }`}
            >
              <MI size={16} /> {m.label}
            </button>
          );
        })}
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">
        {mode === "study" ? "Объяснения появляются сразу после ответа." : "Объяснения показываются только в конце теста."}
      </p>

      {!done && current ? (
        <>
          {/* Шапка прогресса */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">Вопрос {idx + 1} из {total}</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold">
                <CheckCircle2 size={16} /> {correctCount}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((idx + (picked !== undefined ? 1 : 0)) / total) * 100}%` }}
              />
            </div>
          </div>

          {/* Карточка вопроса */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-emerald-500/5 to-violet-500/10 p-5">
            <div className="text-xs uppercase tracking-wide text-primary font-bold">
              {TOPICS[current.t] ?? "Коучинг"}
            </div>
            <h3 className="mt-2 text-base sm:text-lg font-semibold leading-snug text-foreground">{current.q}</h3>
          </div>

          {/* Варианты */}
          <div className="space-y-2">
            {current.a.map((opt, i) => {
              let cls = "border-border bg-card hover:bg-muted";
              let mark: React.ReactNode = null;
              if (picked !== undefined && mode === "study") {
                if (i === current.c) {
                  cls = "border-emerald-500/60 bg-emerald-500/10";
                  mark = <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />;
                } else if (i === picked) {
                  cls = "border-red-500/60 bg-red-500/10";
                  mark = <XCircle size={18} className="text-red-600 shrink-0" />;
                } else {
                  cls = "border-border bg-card opacity-60";
                }
              } else if (picked === i) {
                cls = "border-primary/60 bg-primary/10";
              }
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={picked !== undefined}
                  className={`w-full text-left rounded-xl border px-4 py-3 min-h-12 text-sm flex items-center gap-3 transition active:scale-[0.99] ${cls}`}
                >
                  <span className="w-6 h-6 shrink-0 grid place-items-center rounded-lg bg-secondary text-xs font-bold">
                    {"АБВГ"[i]}
                  </span>
                  <span className="flex-1 min-w-0">{opt}</span>
                  {mark}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div
              className={`rounded-2xl border p-4 text-sm ${
                picked === current.c ? "border-emerald-500/40 bg-emerald-500/10" : "border-red-500/40 bg-red-500/10"
              }`}
            >
              <div className="font-bold mb-1">{picked === current.c ? "Верно!" : "Неверно"}</div>
              <div className="text-foreground/90">{current.e}</div>
            </div>
          )}

          {(mode === "study" && picked !== undefined) && (
            <button
              onClick={next}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 min-h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
            >
              {idx + 1 >= total ? "Показать результат" : "Следующий вопрос"}
            </button>
          )}
        </>
      ) : (
        <>
          {/* Итоги */}
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-emerald-500/10 to-violet-500/15 p-6 text-center">
            <ClipboardCheck className="mx-auto text-primary" size={30} />
            <div className="mt-3 text-3xl font-bold">
              {correctCount} / {total}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">Правильных ответов: {pct}%</div>
            <div className="mt-3 text-sm font-medium">
              {pct >= 80 ? "Отличный результат — вы готовы к экзамену." : pct >= 60 ? "Хорошо, но стоит повторить слабые темы." : "Пройдите материал ещё раз и повторите тест."}
            </div>
            <button
              onClick={() => restart()}
              className="mt-4 inline-flex items-center gap-2 px-5 py-3 min-h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
            >
              <RotateCcw size={16} /> Пройти ещё раз
            </button>
          </div>

          {/* Разбор */}
          <div className="space-y-2">
            {questions.map((q, i) => {
              const ok = answers[i] === q.c;
              return (
                <div key={i} className={`rounded-2xl border p-4 ${ok ? "border-emerald-500/40 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"}`}>
                  <div className="flex items-start gap-2">
                    {ok ? <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 shrink-0" /> : <XCircle size={18} className="text-red-600 mt-0.5 shrink-0" />}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{i + 1}. {q.q}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{TOPICS[q.t]}</div>
                      {!ok && answers[i] !== undefined && (
                        <div className="mt-1 text-sm text-red-600">Ваш ответ: {q.a[answers[i]!]}</div>
                      )}
                      <div className="mt-1 text-sm text-emerald-700 dark:text-emerald-400">Верно: {q.a[q.c]}</div>
                      <div className="mt-1 text-sm text-foreground/85">{q.e}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-xs text-muted-foreground">Отвечено вопросов: {answeredCount} / {total}</div>
        </>
      )}
    </div>
  );
}

export default Quiz;
