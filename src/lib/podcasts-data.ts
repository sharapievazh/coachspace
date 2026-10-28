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
];
