import { useState } from "react";
import { Award, BadgePlus, ChevronDown, Eye, Handshake, Heart, Hourglass, Plus, Rocket, ShieldCheck, Wrench } from "lucide-react";
import { SectionHead } from "./_shared";

const OSVK_RULES = [
  { icon: Handshake,   emoji: "🤝", title: "Раппорт",                  text: "Перед началом убедитесь, что между вами установлен и поддерживается контакт.", color: "from-rose-500/20 to-rose-500/5",    border: "border-rose-500/40",   tint: "text-rose-300" },
  { icon: Eye,          emoji: "👁",  title: "Позиция наблюдателя",      text: "Давайте обратную связь с позиции стороннего наблюдателя — «взгляд со стороны».", color: "from-sky-500/20 to-sky-500/5",       border: "border-sky-500/40",    tint: "text-sky-300" },
  { icon: Wrench,       emoji: "🛠",  title: "Уровень поведения",        text: "Описывайте только поведение — что человек делал. Не затрагивайте личность и способности.", color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/40", tint: "text-indigo-300" },
  { icon: Hourglass,    emoji: "⏳",  title: "Прошедшее время для фактов", text: "Разговор о сделанном — и хорошее, и зоны роста — строится в прошедшем времени.", color: "from-amber-500/20 to-amber-500/5",   border: "border-amber-500/40",  tint: "text-amber-300" },
  { icon: Plus,         emoji: "➕",  title: "Сначала плюсы",            text: "В первую очередь описывайте только то, что было сделано удачно.", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/40", tint: "text-emerald-300" },
  { icon: Rocket,       emoji: "🚀",  title: "Позитив и будущее",         text: "Все пожелания и зоны роста — только в позитивном ключе и направлены в будущее.", color: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/40",  tint: "text-violet-300" },
  { icon: BadgePlus,    emoji: "📊",  title: "Демонстрация",              text: "Каждое дополнение или предложение предметно демонстрируйте на фактах.", color: "from-cyan-500/20 to-cyan-500/5",    border: "border-cyan-500/40",   tint: "text-cyan-300" },
  { icon: Heart,        emoji: "❤️",  title: "Благодарность в конце",     text: "Всегда закрепляйте финал общей позитивной оценкой и благодарностью.", color: "from-pink-500/20 to-pink-500/5",    border: "border-pink-500/40",   tint: "text-pink-300" },
];

function BurgerRules() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-5 max-w-4xl max-w-full overflow-hidden">
      <SectionHead title="8 Золотых Правил ОСВК" subtitle="Чек-лист развивающей обратной связи высокого качества" />

      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 grid place-items-center shadow-lg shrink-0">
          <Award size={28} className="text-white" />
        </div>
        <div>
          <div className="font-semibold">Кодекс коуча</div>
          <div className="text-sm text-muted-foreground">Восемь принципов, которые превращают замечания в развитие.</div>
        </div>
      </div>

      <div className="space-y-2">
        {OSVK_RULES.map((r, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(prev => prev === i ? null : i)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left min-h-11"
              >
                <div className={`w-1.5 self-stretch rounded-full ${r.tint.replace("text-", "bg-").replace("-300", "-500")}`} />
                <span className={`text-xs font-mono font-bold ${r.tint}`}>0{i + 1}</span>
                <span className="text-base leading-none">{r.emoji}</span>
                <span className="font-semibold text-sm sm:text-base flex-1">{r.title}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-200 ease-out ${isOpen ? "max-h-60" : "max-h-0"}`}
              >
                <div className={`px-4 pb-3.5 pt-2 text-sm text-muted-foreground leading-relaxed border-t ${r.border} bg-gradient-to-br ${r.color}`}>
                  {r.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-secondary/60 border border-border p-4 text-sm text-muted-foreground flex gap-3">
        <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
        <div>Совет: перед тем как давать ОСВК, мысленно пройдись по этим 8 пунктам — это занимает 10 секунд и сохраняет раппорт.</div>
      </div>
    </div>
  );
}

export default BurgerRules;
