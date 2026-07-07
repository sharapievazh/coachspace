import { useRef, useState } from "react";
import { Send, ThumbsDown, ThumbsUp } from "lucide-react";
import { SectionHead } from "./_shared";

const FEEDBACK_EMAIL = "sharapieva@gmail.com";

function Feedback() {
  const likedRef = useRef("");
  const dislikedRef = useRef("");
  const nameRef = useRef("");
  const hasContentRef = useRef(false);
  const [hasContent, setHasContent] = useState(false);
  const [sent, setSent] = useState(false);

  const updateHasContent = () => {
    const next = likedRef.current.trim().length > 0 || dislikedRef.current.trim().length > 0;
    if (hasContentRef.current !== next) {
      hasContentRef.current = next;
      setHasContent(next);
    }
  };

  const send = async () => {
    const name = nameRef.current;
    const liked = likedRef.current;
    const disliked = dislikedRef.current;
    const subject = `Coach Space — обратная связь${name ? ` от ${name}` : ""}`;
    const body =
`От: ${name || "Аноним"}
Дата: ${new Date().toLocaleString()}

Что нравится:
${liked || "—"}

Что не нравится / что улучшить:
${disliked || "—"}
`;
    const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Fallback plan: copy the message to clipboard so the user always has it,
    // then attempt to open the mail client. On iOS/Capacitor without a
    // configured mail account the mailto: navigation fails silently.
    const clipboardText = `Кому: ${FEEDBACK_EMAIL}\nТема: ${subject}\n\n${body}`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(clipboardText);
      }
    } catch {
      // ignore — clipboard may be blocked
    }

    let mailOpened = false;
    try {
      const before = Date.now();
      const blurHandler = () => { mailOpened = true; };
      window.addEventListener("blur", blurHandler, { once: true });
      window.location.href = url;
      // If the page didn't blur within 800ms we assume no mail client picked it up.
      setTimeout(() => {
        window.removeEventListener("blur", blurHandler);
        if (!mailOpened && Date.now() - before >= 700) {
          // silent fallback — success message already shown below
        }
      }, 800);
    } catch {
      // navigation blocked — clipboard fallback still applies
    }

    setSent(true);
  };


  return (
    <div className="space-y-6 max-w-3xl max-w-full">
      <SectionHead
        title="Обратная связь по приложению"
        subtitle="Поделитесь впечатлениями — это поможет сделать Coach Space лучше."
      />
      <div className="bg-card rounded-2xl border border-border p-5 space-y-4">
        <div>
          <label className="text-sm font-medium">Ваше имя (необязательно)</label>
          <input
            defaultValue=""
            onInput={(e) => { nameRef.current = e.currentTarget.value; }}
            placeholder="Как к вам обращаться"
            inputMode="text"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <ThumbsUp size={16} className="text-primary" /> Что нравится
          </label>
          <textarea
            defaultValue=""
            onInput={(e) => { likedRef.current = e.currentTarget.value; updateHasContent(); }}
            rows={4}
            placeholder="Что работает хорошо, что удобно, что радует…"
            inputMode="text"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2">
            <ThumbsDown size={16} className="text-destructive" /> Что не нравится / что улучшить
          </label>
          <textarea
            defaultValue=""
            onInput={(e) => { dislikedRef.current = e.currentTarget.value; updateHasContent(); }}
            rows={4}
            placeholder="Что мешает, чего не хватает, что добавить…"
            inputMode="text"
            autoComplete="off" autoCorrect="off" spellCheck={false}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={send}
            disabled={!hasContent}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} /> Отправить
          </button>
          <p className="text-xs text-muted-foreground">
            Откроется ваш почтовый клиент с готовым письмом на {FEEDBACK_EMAIL}.
          </p>
        </div>
        {sent && (
          <p className="text-sm text-primary">Спасибо за отзыв! Текст скопирован в буфер обмена — если почтовый клиент не открылся, вставьте его в письмо на {FEEDBACK_EMAIL} ✉️</p>
        )}
      </div>
    </div>
  );
}

/* ---------- Звезда Эриксона ---------- */

export default Feedback;
