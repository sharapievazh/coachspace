export type SearchEntry = { id: string; category: "Модули" | "Инструменты" | "Глоссарий" | "Заметки"; title: string; excerpt: string; keywords?: string; tab: string; anchor?: string; module?: number };

export function searchContent(entries: SearchEntry[], query: string) {
  const q = query.toLocaleLowerCase("ru").trim();
  if (q.length < 2) return [];
  const words = q.split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  const scored = entries.map(entry => {
    const titleLow = entry.title.toLocaleLowerCase("ru");
    const kwLow = (entry.keywords ?? "").toLocaleLowerCase("ru");
    const excerptLow = entry.excerpt.toLocaleLowerCase("ru");
    let score = 0;
    for (const word of words) {
      if (titleLow.includes(word)) score += 10;
      else if (kwLow.includes(word)) score += 5;
      else if (excerptLow.includes(word)) score += 1;
    }
    return { entry, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}