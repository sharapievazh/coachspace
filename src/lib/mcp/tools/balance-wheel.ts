import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const DEFAULT_LABELS = [
  "Здоровье",
  "Карьера",
  "Финансы",
  "Отношения",
  "Семья",
  "Развитие",
  "Отдых",
  "Окружение",
];

export default defineTool({
  name: "balance_wheel_analysis",
  title: "Колесо баланса: анализ",
  description:
    "Принимает 8 оценок по 10-балльной шкале и (опционально) названия сфер. Возвращает средний балл, самые сильные и слабые сферы, разрыв и рекомендации по фокусу.",
  inputSchema: {
    scores: z
      .array(z.number().min(0).max(10))
      .length(8)
      .describe("Массив из 8 оценок (0..10) по сферам колеса баланса"),
    labels: z
      .array(z.string())
      .length(8)
      .optional()
      .describe("Опциональные названия 8 сфер. По умолчанию используются стандартные."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ scores, labels }) => {
    const names = labels ?? DEFAULT_LABELS;
    const paired = scores.map((v, i) => ({ name: names[i], score: v }));
    const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
    const sorted = [...paired].sort((a, b) => a.score - b.score);
    const weakest = sorted.slice(0, 2);
    const strongest = sorted.slice(-2).reverse();
    const gap = Math.max(...scores) - Math.min(...scores);

    const lines = [
      `Средний балл: ${avg.toFixed(1)} / 10`,
      `Разрыв между максимумом и минимумом: ${gap} балл(ов)`,
      "",
      "Сильные сферы:",
      ...strongest.map((p) => `• ${p.name} — ${p.score}`),
      "",
      "Проседающие сферы (кандидаты на фокус):",
      ...weakest.map((p) => `• ${p.name} — ${p.score}`),
      "",
      "Вопросы для сессии:",
      `1. Что даёт высокий балл в «${strongest[0].name}»? Как перенести это в «${weakest[0].name}»?`,
      `2. Если поднять «${weakest[0].name}» на 2 балла, что изменится в других сферах?`,
      "3. Какой один шаг на этой неделе сдвинет самую проседающую сферу?",
    ];

    return {
      content: [{ type: "text", text: lines.join("\n") }],
      structuredContent: {
        average: Number(avg.toFixed(2)),
        gap,
        strongest,
        weakest,
        all: paired,
      },
    };
  },
});
