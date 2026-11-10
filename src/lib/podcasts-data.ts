export interface Podcast {
  id: string;
  title: string;
  description: string;
  duration: string;
  file: string;
  color: string;
  emoji: string;
  group: string;
}

export const PODCAST_GROUPS = [
  { id: "chess",     emoji: "♟️", label: "Поддержка юного шахматиста" },
  { id: "books",     emoji: "📚", label: "Разборы книг и концепций коучинга" },
  { id: "tools",     emoji: "🛠️", label: "Инструменты, модели и психология" },
  { id: "transform", emoji: "🌟", label: "Трансформация и метафоры" },
  { id: "demo",      emoji: "🎙️", label: "Практическая демонстрация" },
];

export const PODCASTS: Podcast[] = [
  // ♟️ Поддержка юного шахматиста
  {
    id: "podcast-12",
    group: "chess",
    title: "Как поддержать юного шахматиста на турнире",
    description: "Мягкий родительский коучинг, снятие усталости на экваторе турнира и работа с недооценкой соперников",
    duration: "~17 мин",
    file: "/audio/podcast-12.m4a",
    color: "#7c3aed",
    emoji: "♟️",
  },
  {
    id: "podcast-15",
    group: "chess",
    title: "Как победить страх перед сильным соперником",
    description: "Работа со страхом рейтинга, отключение «внутреннего критика» (Я-1), метафоры и фразы-настройки перед игрой",
    duration: "~20 мин",
    file: "/audio/podcast-15.m4a",
    color: "#7c3aed",
    emoji: "♟️",
  },

  // 📚 Разборы книг и концепций коучинга
  {
    id: "podcast-14",
    group: "books",
    title: "Пирамида Дилтса и фокусы языка переписывают убеждения",
    description: "Подробный разбор книги Роберта Дилтса, логические уровни и паттерны рефрейминга",
    duration: "~15 мин",
    file: "/audio/podcast-14.m4a",
    color: "#0369a1",
    emoji: "🗣️",
  },
  {
    id: "podcast-13",
    group: "books",
    title: "Как переиграть своего внутреннего критика",
    description: "Разбор книги Тимоти Голви «Внутренняя игра в теннис» — Я-1 и Я-2, безоценочное наблюдение",
    duration: "~18 мин",
    file: "/audio/podcast-13.m4a",
    color: "#be185d",
    emoji: "💭",
  },

  // 🛠️ Инструменты, модели и психология
  {
    id: "podcast-04",
    group: "tools",
    title: "Модель SCORE вместо тушения симптомов",
    description: "Глубокая диагностика причин и поиск скрытых ресурсов клиента",
    duration: "~25 мин",
    file: "/audio/podcast-04.m4a",
    color: "#f59e0b",
    emoji: "🎯",
  },
  {
    id: "podcast-07",
    group: "tools",
    title: "Как выйти из треугольника Карпмана",
    description: "Роли Жертвы, Спасателя и Преследователя, вторичные выгоды и выход в позицию Создателя",
    duration: "~33 мин",
    file: "/audio/podcast-07.m4a",
    color: "#ef4444",
    emoji: "🔺",
  },
  {
    id: "podcast-10",
    group: "tools",
    title: "Как пирамида Дилтса помогает решать конфликты",
    description: "4 позиции восприятия и работа с конфликтами через логические уровни",
    duration: "~24 мин",
    file: "/audio/podcast-10.m4a",
    color: "#10b981",
    emoji: "🔷",
  },
  {
    id: "podcast-09",
    group: "tools",
    title: "Механика раппорта через калибровку и сенсорные системы",
    description: "4 социальных стиля и сенсорные предикаты (ВАИД) для глубокого контакта с клиентом",
    duration: "~28 мин",
    file: "/audio/podcast-09.m4a",
    color: "#06b6d4",
    emoji: "🔗",
  },
  {
    id: "podcast-11",
    group: "tools",
    title: "Как управлять задачами вместо времени",
    description: "SMART-цели, матрица Эйзенхауэра и SWOT-анализ — коучинговый взгляд на продуктивность",
    duration: "~17 мин",
    file: "/audio/podcast-11.m4a",
    color: "#64748b",
    emoji: "✅",
  },
  {
    id: "podcast-03",
    group: "tools",
    title: "Как превратить толпу талантов в единую команду",
    description: "Командный коучинг, фасилитация, матрица SOAR и групповая динамика",
    duration: "~40 мин",
    file: "/audio/podcast-03.m4a",
    color: "#10b981",
    emoji: "🤝",
  },
  {
    id: "podcast-02",
    group: "tools",
    title: "Механика коучинга и критика без разрушения",
    description: "Форматы супервизии (In Vitro / In Vivo), обратная связь высокого качества (ОСВК / модель «гамбургера»)",
    duration: "~36 мин",
    file: "/audio/podcast-02.m4a",
    color: "#0ea5e9",
    emoji: "🔧",
  },

  // 🌟 Трансформация и метафоры
  {
    id: "podcast-16",
    group: "transform",
    title: "Как метафоры взламывают психологическое сопротивление",
    description: "Атмосферный медитативный разбор притч — О. Генри «Дары волхвов», стоицизм Сенеки, эпистемологические метафоры",
    duration: "~30 мин",
    file: "/audio/podcast-16.m4a",
    color: "#f59e0b",
    emoji: "🌟",
  },

  // 🎙️ Практическая демонстрация
  {
    id: "podcast-08",
    group: "demo",
    title: "Коучинг против синдрома самозванца у руководителей",
    description: "Демо-сессия коуча с клиентом по модели GROW с детальным разбором от супервизора",
    duration: "~35 мин",
    file: "/audio/podcast-08.m4a",
    color: "#f59e0b",
    emoji: "🎬",
  },
];
