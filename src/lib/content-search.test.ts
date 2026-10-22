/// <reference types="bun" />
import { expect, test } from "bun:test";
import { searchContent, type SearchEntry } from "./content-search";
const entries: SearchEntry[] = [
  { id: "module", category: "Модули", title: "Модуль 5", excerpt: "Трансформационный коучинг", tab: "modules", module: 5 },
  { id: "tool", category: "Инструменты", title: "Гамбургер", excerpt: "Обратная связь", tab: "hamburger" },
  { id: "term", category: "Глоссарий", title: "GROW", excerpt: "Цели и реальность", tab: "glossary", anchor: "glossary-6" },
  { id: "note", category: "Заметки", title: "Запись", excerpt: "Клиент выбирает новую цель", tab: "notes", anchor: "note-123" },
];
test("search finds module titles and preserves the module destination", () => expect(searchContent(entries, "модуль 5")[0]?.module).toBe(5));
test("search includes tool names case insensitively", () => expect(searchContent(entries, "ГАМБУРГЕР")[0]?.tab).toBe("hamburger"));
test("search finds glossary definitions and the exact term", () => expect(searchContent(entries, "реальность")[0]?.anchor).toBe("glossary-6"));
test("search includes saved note text and the exact note", () => expect(searchContent(entries, "новую цель")[0]?.anchor).toBe("note-123"));
test("blank search has no results", () => expect(searchContent(entries, " ")).toEqual([]));