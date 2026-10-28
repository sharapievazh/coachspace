export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  color: string;
  emoji: string;
}

export const PODCASTS: Podcast[] = [
  {
    id: "podcast-01",
    title: "Как коучинг помогает победить внутреннего соперника",
    description: "О природе внутреннего критика, принципах Голви и о том, как раскрыть потенциал без самосаботажа",
    duration: "~45 мин",
    file: "/audio/podcast-01.m4a",
    color: "#6366f1",
    emoji: "🎙️",
  },
  {
    id: "podcast-02",
    title: "Механика коучинга и критика без разрушения",
    description: "Как давать обратную связь, которая развивает, а не ранит — инструменты конструктивной критики",
    duration: "~36 мин",
    file: "/audio/podcast-02.m4a",
    color: "#0ea5e9",
    emoji: "🔧",
  },
  {
    id: "podcast-03",
    title: "Как превратить толпу талантов в единую команду",
    description: "О динамике командного коучинга, ролях участников и создании общего фокуса на результат",
    duration: "~40 мин",
    file: "/audio/podcast-03.m4a",
    color: "#10b981",
    emoji: "🤝",
  },
  {
    id: "podcast-04",
    title: "Модель SCORE вместо тушения симптомов",
    description: "Разбираем модель SCORE: как выйти за рамки симптомов и найти настоящую причину ситуации клиента",
    duration: "~25 мин",
    file: "/audio/podcast-04.m4a",
    color: "#f59e0b",
    emoji: "🎯",
  },
  {
    id: "podcast-05",
    title: "Как отключить внутреннего критика и переписать убеждения",
    description: "Техники работы с ограничивающими убеждениями и внутренним диалогом через инструменты НЛП",
    duration: "~22 мин",
    file: "/audio/podcast-05.m4a",
    color: "#ec4899",
    emoji: "🧠",
  },
];
