export type SearchEntry = { id: string; category: "Модули" | "Инструменты" | "Глоссарий" | "Заметки"; title: string; excerpt: string; tab: string; anchor?: string; module?: number };
export function searchContent(entries: SearchEntry[], query: string) {
  const words = query.toLocaleLowerCase("ru").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return entries.filter(entry => words.every(word => `${entry.title} ${entry.excerpt}`.toLocaleLowerCase("ru").includes(word)));
}