import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Как настроить Supabase (бесплатно, без лимитов):
// 1. Зайди на https://supabase.com → создай аккаунт → New Project
// 2. В проекте: Settings → API → скопируй Project URL и anon public key
// 3. В Table Editor → New Table → название "registrations", добавь колонки:
//    id (int8, primary key, auto), name (text), email (text), created_at (timestamptz, default now())
// 4. Вставь свои данные ниже
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://gkhfifuggxhwdsdecglg.supabase.co";
const SUPABASE_KEY = "sb_publishable_hRqmnds9YnMIV9YzXnX2hA_efQlrIEn";

const STORAGE_KEY = "coach-space-onboarded";

export function saveOnboardingDone() {
  try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
}

export function isOnboardingDone(): boolean {
  try { return !!localStorage.getItem(STORAGE_KEY); } catch { return false; }
}

type Step = "welcome" | "form" | "done";

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const skip = () => {
    saveOnboardingDone();
    onFinish();
  };

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      if (SUPABASE_URL.includes("supabase.co")) {
        await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({
            name: name.trim() || null,
            email: email.trim() || null,
          }),
        });
      }
    } catch {
      // не блокируем пользователя если нет сети
    }
    setLoading(false);
    setStep("done");
  };

  const finish = () => {
    saveOnboardingDone();
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6 py-10"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>

      {/* Логотип */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-violet-500 to-indigo-600 grid place-items-center shadow-xl shadow-primary/30 mb-5">
          <span className="text-white text-4xl font-bold tracking-tight">CS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Coach Space</h1>
        <p className="text-muted-foreground text-sm mt-1 text-center max-w-xs">
          Рабочее пространство профессионального коуча
        </p>
      </div>

      {/* ── Экран 1: Приветствие ── */}
      {step === "welcome" && (
        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="bg-card rounded-2xl border border-border p-5 space-y-3">
            {[
              { icon: "🎯", text: "Инструменты GROW, SMART, SWOT, 6 шляп и другие" },
              { icon: "⏱", text: "Умный таймер и блокнот прямо во время сессии" },
              { icon: "🌸", text: "Mind Map, Колесо баланса, Пирамида Дилтса" },
              { icon: "📋", text: "Маркер Супервизии для анализа своей работы" },
            ].map((f) => (
              <div key={f.icon} className="flex items-center gap-3">
                <span className="text-xl shrink-0 w-7 text-center">{f.icon}</span>
                <span className="text-sm text-foreground/85 leading-snug">{f.text}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setStep("form")}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold hover:opacity-90 shadow-lg shadow-primary/25 transition-opacity">
            Начать →
          </button>
          <button onClick={skip}
            className="text-sm text-muted-foreground hover:text-foreground text-center py-2">
            Пропустить
          </button>
        </div>
      )}

      {/* ── Экран 2: Форма ── */}
      {step === "form" && (
        <div className="w-full max-w-sm flex flex-col gap-4">
          <div className="text-center mb-2">
            <h2 className="text-xl font-bold text-foreground">Расскажите о себе</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Необязательно — но поможет нам делать приложение лучше для вас
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Имя</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                autoComplete="given-name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" type="email"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          {error && <p className="text-xs text-destructive text-center">{error}</p>}

          <button onClick={submit} disabled={loading}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold hover:opacity-90 disabled:opacity-60 transition-opacity shadow-lg shadow-primary/25">
            {loading ? "Отправляем…" : "Продолжить →"}
          </button>
          <button onClick={skip}
            className="text-sm text-muted-foreground hover:text-foreground text-center py-2">
            Пропустить
          </button>

          <p className="text-[11px] text-muted-foreground/60 text-center leading-relaxed">
            Мы не передаём ваши данные третьим лицам и не будем спамить.
          </p>
        </div>
      )}

      {/* ── Экран 3: Спасибо ── */}
      {step === "done" && (
        <div className="w-full max-w-sm flex flex-col items-center gap-6 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-500/15 grid place-items-center">
            <span className="text-4xl">🎉</span>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-foreground">
              {name.trim() ? `Привет, ${name.trim().split(" ")[0]}!` : "Добро пожаловать!"}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs">
              Coach Space готов к работе. Удачных сессий!
            </p>
          </div>
          <button onClick={finish}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold hover:opacity-90 shadow-lg shadow-primary/25 transition-opacity">
            Открыть приложение →
          </button>
        </div>
      )}
    </div>
  );
}
