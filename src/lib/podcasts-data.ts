export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  color: string;
  emoji: string;
  category?: "podcast" | "session-demo";
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
  {
    id: "podcast-06",
    title: "Как отключить внутреннего критика под давлением",
    description: "Что делать, когда внутренний критик активизируется в стрессовых ситуациях и мешает действовать",
    duration: "~40 мин",
    file: "/audio/podcast-06.m4a",
    color: "#8b5cf6",
    emoji: "🎙️",
  },
  {
    id: "podcast-07",
    title: "Как выйти из треугольника Карпмана",
    description: "Разбираем роли Жертвы, Преследователя и Спасателя — и как коуч помогает клиенту выйти из этого цикла",
    duration: "~33 мин",
    file: "/audio/podcast-07.m4a",
    color: "#ef4444",
    emoji: "🔺",
  },
  {
    id: "podcast-08",
    title: "Коучинг против синдрома самозванца у руководителей",
    description: "Разбор реальной коучинговой сессии: как помочь руководителю справиться с синдромом самозванца",
    duration: "~35 мин",
    file: "/audio/podcast-08.m4a",
    color: "#f59e0b",
    emoji: "🎬",
    category: "session-demo",
  },
  {
    id: "podcast-09",
    title: "Механика раппорта через калибровку и сенсорные системы",
    description: "Как устанавливать глубокий контакт с клиентом через наблюдение и подстройку к его сенсорным каналам",
    duration: "~28 мин",
    file: "/audio/podcast-09.m4a",
    color: "#06b6d4",
    emoji: "🔗",
  },
  {
    id: "podcast-10",
    title: "Как пирамида Дилтса помогает решать конфликты",
    description: "Применяем нейрологические уровни Дилтса для анализа конфликтов и поиска точек изменений",
    duration: "~24 мин",
    file: "/audio/podcast-10.m4a",
    color: "#10b981",
    emoji: "🔷",
  },
  {
    id: "podcast-11",
    title: "Как управлять задачами вместо времени",
    description: "Коучинговый взгляд на продуктивность: почему управление задачами эффективнее тайм-менеджмента",
    duration: "~17 мин",
    file: "/audio/podcast-11.m4a",
    color: "#64748b",
    emoji: "✅",
  },
];
