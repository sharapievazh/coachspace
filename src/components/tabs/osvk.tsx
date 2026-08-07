import { useState } from "react";
import {
  Award, BadgePlus, ChevronDown, ChevronRight, Eye, Handshake, Heart,
  Hourglass, MessageCircle, Minus, Plus, Rocket, ShieldCheck, Smile,
  ThumbsUp, Wrench,
} from "lucide-react";
import { SectionHead } from "./_shared";

/* ─── Гамбургер ─── */
const BURGER_LAYERS = [
  {
    id: "top",
    title: "Верхняя булочка",
    subtitle: "Что получилось особенно хорошо!",
    rule: "Сначала всегда описывается то, что было сделано хорошо и удачно.",
    gradient: "from-amber-300 via-orange-400 to-amber-600",
    glow: "shadow-[0_10px_40px_-10px_rgba(251,146,60,0.6)]",
    ring: "ring-amber-400/60",
    accent: "text-amber-100",
    shape: "rounded-t-[120px] rounded-b-2xl",
    icon: ThumbsUp,
    phrases: [
      "Что у тебя получилось особенно хорошо в этот раз?",
      "Конкретно мне понравилось, как ты…",
      "Самым удачным моментом в твоей работе было…",
    ],
  },
  {
    id: "patty",
    title: "Мясо · начинка",
    subtitle: "Что стоило изменить?",
    rule: "Пожелания — в позитивной форме и в будущем времени. Обсуждаем поведение, а не личность.",
    gradient: "from-amber-900 via-stone-800 to-amber-950",
    glow: "shadow-[0_10px_40px_-10px_rgba(120,53,15,0.7)]",
    ring: "ring-amber-900/60",
    accent: "text-amber-50",
    shape: "rounded-xl",
    icon: Wrench,
    phrases: [
      "Что стоило бы изменить?",
      "Как стоило сделать по-другому в следующий раз?",
      "В будущем я бы порекомендовал добавить…",
      "Что можно улучшить, чтобы достичь ещё большего результата?",
    ],
  },
  {
    id: "bottom",
    title: "Нижняя булочка",
    subtitle: "Общая позитивная оценка",
    rule: "Закрепляем позитивным завершением и благодарностью.",
    gradient: "from-amber-600 via-orange-400 to-amber-300",
    glow: "shadow-[0_10px_40px_-10px_rgba(251,146,60,0.6)]",
    ring: "ring-amber-400/60",
    accent: "text-amber-100",
    shape: "rounded-b-[120px] rounded-t-2xl",
    icon: Heart,
    phrases: [
      "В целом, это отличная работа, спасибо тебе за…",
      "Подводя итог: твой прогресс очевиден, продолжай в том же духе!",
    ],
  },
];

/* ─── 8 правил ─── */
const OSVK_RULES = [
  { icon: Handshake, emoji: "🤝", title: "Раппорт",                   text: "Перед началом убедитесь, что между вами установлен и поддерживается контакт.", color: "from-rose-500/20 to-rose-500/5",    border: "border-rose-500/40",   tint: "text-rose-300" },
  { icon: Eye,        emoji: "👁",  title: "Позиция наблюдателя",       text: "Давайте обратную связь с позиции стороннего наблюдателя — «взгляд со стороны».", color: "from-sky-500/20 to-sky-500/5",       border: "border-sky-500/40",    tint: "text-sky-300" },
  { icon: Wrench,     emoji: "🛠",  title: "Уровень поведения",         text: "Описывайте только поведение — что человек делал. Не затрагивайте личность и способности.", color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/40", tint: "text-indigo-300" },
  { icon: Hourglass,  emoji: "⏳",  title: "Прошедшее время для фактов", text: "Разговор о сделанном — и хорошее, и зоны роста — строится в прошедшем времени.", color: "from-amber-500/20 to-amber-500/5",   border: "border-amber-500/40",  tint: "text-amber-300" },
  { icon: Plus,       emoji: "➕",  title: "Сначала плюсы",             text: "В первую очередь описывайте только то, что было сделано удачно.", color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/40", tint: "text-emerald-300" },
  { icon: Rocket,     emoji: "🚀",  title: "Позитив и будущее",          text: "Все пожелания и зоны роста — только в позитивном ключе и направлены в будущее.", color: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/40",  tint: "text-violet-300" },
  { icon: BadgePlus,  emoji: "📊",  title: "Демонстрация",               text: "Каждое дополнение или предложение предметно демонстрируйте на фактах.", color: "from-cyan-500/20 to-cyan-500/5",    border: "border-cyan-500/40",   tint: "text-cyan-300" },
  { icon: Smile,      emoji: "❤️",  title: "Благодарность в конце",      text: "Всегда закрепляйте финал общей позитивной оценкой и благодарностью.", color: "from-pink-500/20 to-pink-500/5",    border: "border-pink-500/40",   tint: "text-pink-300" },
];

type OsvkSection = "burger" | "rules";

export default function Osvk() {
  const [section, setSection] = useState<OsvkSection>("burger");
  const [activeBurger, setActiveBurger] = useState<string>("top");
  const [openRuleIdx, setOpenRuleIdx] = useState<number | null>(null);

  return (
    <div className="space-y-5 max-w-full overflow-hidden">
      <SectionHead title="ОСВК" subtitle="Обратная связь высокого качества" />

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-xl bg-secondary/60">
        {(["burger", "rules"] as OsvkSection[]).map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              section === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s === "burger" ? "🍔 Гамбургер" : "📋 8 Правил"}
          </button>
        ))}
      </div>

      {/* ── Гамбургер ── */}
      {section === "burger" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-stone-900 rounded-3xl border border-amber-300 p-4 sm:p-6 space-y-3">
            {BURGER_LAYERS.map((layer) => {
              const Icon = layer.icon;
              const isActive = activeBurger === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveBurger(isActive ? "" : layer.id)}
                  className={`w-full text-left bg-gradient-to-br ${layer.gradient} ${layer.shape} ${layer.glow} ${isActive ? `ring-2 ${layer.ring} scale-[1.01]` : "opacity-90 hover:opacity-100"} transition-all duration-300 overflow-hidden`}
                >
                  <div className="px-5 py-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-black/25 grid place-items-center ${layer.accent} shrink-0`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-base sm:text-lg ${layer.accent} drop-shadow`}>{layer.title}</div>
                      <div className={`text-xs sm:text-sm ${layer.accent} opacity-90 truncate`}>{layer.subtitle}</div>
                    </div>
                    {isActive ? <Minus size={18} className={layer.accent} /> : <Plus size={18} className={layer.accent} />}
                  </div>
                  <div className={`grid transition-all duration-300 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 space-y-3">
                        <div className={`text-xs sm:text-sm ${layer.accent} bg-black/30 rounded-lg px-3 py-2 leading-relaxed`}>
                          {layer.rule}
                        </div>
                        <ul className="space-y-1.5">
                          {layer.phrases.map((p, i) => (
                            <li key={i} className={`flex gap-2 text-sm ${layer.accent} bg-black/20 rounded-md px-3 py-2`}>
                              <ChevronRight size={14} className="mt-0.5 shrink-0" />
                              <span>«{p}»</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="bg-secondary/60 rounded-xl p-4 text-sm text-muted-foreground flex gap-3">
            <MessageCircle size={18} className="text-primary shrink-0 mt-0.5" />
            <div>Нажми на слой, чтобы развернуть формулировки. Используй «Маркер Супервизии» в блокноте сессии для быстрой вставки шаблона.</div>
          </div>
        </div>
      )}

      {/* ── 8 правил ── */}
      {section === "rules" && (
        <div className="space-y-4">
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
              const isOpen = openRuleIdx === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenRuleIdx((prev) => (prev === i ? null : i))}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left min-h-11"
                  >
                    <div className={`w-1.5 self-stretch rounded-full ${r.tint.replace("text-", "bg-").replace("-300", "-500")}`} />
                    <span className={`text-xs font-mono font-bold ${r.tint}`}>0{i + 1}</span>
                    <span className="text-base leading-none">{r.emoji}</span>
                    <span className="font-semibold text-sm sm:text-base flex-1">{r.title}</span>
                    <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-200 ease-out ${isOpen ? "max-h-60" : "max-h-0"}`}>
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
      )}
    </div>
  );
}
