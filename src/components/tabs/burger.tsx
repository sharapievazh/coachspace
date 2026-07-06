import { useState } from "react";
import { ChevronRight, Heart, MessageCircle, Minus, Plus, ThumbsUp, Wrench } from "lucide-react";
import { SectionHead } from "./_shared";

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
    rule: "Пожелания — в позитивной форме и в будущем времени. Обсуждаем поведение, а не личность. Каждое дополнение демонстрируем на фактах.",
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
    rule: "Закрепляем позитивным завершением и благодарностью — чтобы человек ушёл с уверенностью в своих силах.",
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

function Burger() {
  const [active, setActive] = useState<string>("top");
  return (
    <div className="space-y-5 max-w-3xl max-w-full overflow-hidden">
      <SectionHead title="Гамбургер ОСВК" subtitle="Обратная связь высокого качества · три слоя" />

      <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-stone-900 rounded-3xl border border-amber-300 p-4 sm:p-6 space-y-3">
        {BURGER_LAYERS.map((layer) => {
          const Icon = layer.icon;
          const isActive = active === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActive(isActive ? "" : layer.id)}
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
        <div>Нажми на слой, чтобы развернуть формулировки. Используй кнопку «Маркер ОСВК» в блокноте сессии, чтобы быстро вставить шаблон.</div>
      </div>
    </div>
  );
}

/* ---------- 8 золотых правил ОСВК ---------- */

export default Burger;
