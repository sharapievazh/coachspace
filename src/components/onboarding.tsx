import { useState } from "react";

const SUPABASE_URL = "https://gkhfifuggxhwdsdecglg.supabase.co";
const SUPABASE_KEY = "sb_publishable_hRqmnds9YnMIV9YzXnX2hA_efQlrIEn";

const STORAGE_KEY = "coach-space-onboarded";

export function saveOnboardingDone() {
  try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
}

export function isOnboardingDone(): boolean {
  try { return !!localStorage.getItem(STORAGE_KEY); } catch { return true; }
}

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      if ((name.trim() || email.trim()) && SUPABASE_URL.includes("supabase.co")) {
        await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal",
          },
          body: JSON.stringify({ name: name.trim() || null, email: email.trim() || null }),
        });
      }
    } catch {}
    setLoading(false);
    saveOnboardingDone();
    onFinish();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center px-6"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="w-full max-w-sm flex flex-col items-center gap-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-violet-500 to-indigo-600 grid place-items-center shadow-xl shadow-primary/30">
            <span className="text-white text-4xl font-bold tracking-tight">CS</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Coach Space</h1>
            <p className="text-muted-foreground text-sm mt-1">Рабочее пространство профессионального коуча</p>
          </div>
        </div>

        {/* Form */}
        <div className="w-full bg-card rounded-2xl border border-border p-5 space-y-3">
          <p className="text-xs text-muted-foreground text-center">
            Необязательно — поможет нам улучшать приложение
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            autoComplete="given-name"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* CTA */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={submit}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold hover:opacity-90 disabled:opacity-60 transition-opacity shadow-lg shadow-primary/25"
          >
            {loading ? "Загружаем…" : "Начать →"}
          </button>
          <button
            onClick={() => { saveOnboardingDone(); onFinish(); }}
            className="text-sm text-muted-foreground hover:text-foreground text-center py-1"
          >
            Пропустить
          </button>
        </div>

      </div>
    </div>
  );
}
