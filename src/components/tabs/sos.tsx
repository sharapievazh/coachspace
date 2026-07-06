import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { KarpmanTriangleSvg } from "@/components/coach/CoachVisuals";
import { SectionHead } from "./_shared";

const ROLES = [
  { name: "Спасатель", color: "border-sky-500/40 bg-sky-500/10", signs: ["Хочу помочь, даже когда не просят", "Беру ответственность за чужое", "Чувствую вину, если не вмешался"], antidote: "Спроси разрешения помочь. Предложи ресурс, а не решение.", q: ["Меня просили об этом?", "Что клиент сам может сделать?", "Чьи это чувства — мои или его?"] },
  { name: "Жертва", color: "border-amber-500/40 bg-amber-500/10", signs: ["Бессилие, «у меня ничего не получится»", "Поиск виноватых", "Жалоба без запроса на изменения"], antidote: "Верни ответственность через выбор: «Что ты выбираешь делать?»", q: ["Где здесь твой выбор?", "Что зависит от тебя?", "Чего ты хочешь вместо этого?"] },
  { name: "Преследователь", color: "border-rose-500/40 bg-rose-500/10", signs: ["Критика, давление, обвинение", "«Ты должен...»", "Сравнения не в пользу клиента"], antidote: "Замени оценку на любопытство. Вопрос вместо суждения.", q: ["Что я сейчас защищаю?", "Это про клиента или про меня?", "Как сказать это с уважением?"] },
];

const roleAccent: Record<string, string> = {
  "Спасатель": "#0ea5e9",
  "Жертва": "#f59e0b",
  "Преследователь": "#e11d48",
};

function Sos() {
  const [active, setActive] = useState<string | null>(null);
  const [sosOpen, setSosOpen] = useState(false);
  const activeRole = ROLES.find((r) => r.name === active) || null;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="SOS · Треугольник Карпмана" subtitle="Шпаргалка-предохранитель для растождествления" />

      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
        <p className="text-xs text-center text-muted-foreground mb-3">
          Нажмите на роль или на центр SOS, чтобы увидеть подробности.
        </p>
        <KarpmanTriangleSvg
          active={active}
          onSelect={(r) => { setSosOpen(false); setActive(r); }}
          onSosSelect={() => { setActive(null); setSosOpen(true); }}
        />
      </div>

      {activeRole && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl grid place-items-center shrink-0"
              style={{ background: roleAccent[activeRole.name] }}
            >
              <AlertTriangle size={22} className="text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-extrabold">{activeRole.name}</div>
              <div className="text-sm text-muted-foreground">Роль в треугольнике</div>
            </div>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="text-xs text-muted-foreground px-2 py-1 rounded-md hover:bg-muted"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Признаки</div>
            <ul className="text-sm space-y-1">{activeRole.signs.map((s, i) => <li key={i}>· {s}</li>)}</ul>
          </div>
          <div className="rounded-xl p-3" style={{ background: roleAccent[activeRole.name] + "1A" }}>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Антидот</div>
            <p className="text-sm font-semibold">{activeRole.antidote}</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">SOS-вопросы</div>
            <ul className="text-sm space-y-1">{activeRole.q.map((s, i) => <li key={i}>→ {s}</li>)}</ul>
          </div>
        </div>
      )}

      {sosOpen && (
        <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl grid place-items-center shrink-0 bg-foreground text-background font-black">
              SOS
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-lg font-extrabold">Растождествление</div>
              <div className="text-sm text-muted-foreground">Точка выхода из треугольника</div>
            </div>
            <button
              type="button"
              onClick={() => setSosOpen(false)}
              className="text-xs text-muted-foreground px-2 py-1 rounded-md hover:bg-muted"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
          <p className="text-[15px] leading-relaxed text-foreground/90">
            Растождествление — это способность заметить: «я сейчас в роли», сделать шаг в сторону и увидеть ситуацию со стороны. Не роль управляет тобой, а ты выбираешь ответ.
          </p>
          <div className="rounded-xl p-3 bg-muted">
            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Коуч-вопросы</div>
            <ul className="text-sm space-y-1.5">
              <li>→ В какой роли я сейчас нахожусь?</li>
              <li>→ Что я выбираю вместо этой роли?</li>
              <li>→ Какой мой следующий взрослый шаг?</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sos;
