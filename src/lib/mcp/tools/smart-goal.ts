import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "smart_goal",
  title: "SMART-цель: рефрейминг",
  description:
    "Принимает черновик цели клиента и возвращает шаблон SMART-цели с проверочными вопросами по каждому критерию (Specific, Measurable, Achievable, Relevant, Time-bound).",
  inputSchema: {
    draft: z.string().min(1).describe("Черновая формулировка цели клиента"),
    deadline: z
      .string()
      .optional()
      .describe("Опциональный дедлайн (например, '3 месяца' или '01.03.2026')"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ draft, deadline }) => {
    const lines = [
      `Черновик цели: ${draft}`,
      "",
      "Проверь по SMART:",
      "• S — Specific: Что именно? Кто вовлечён? Где? Почему это важно?",
      "• M — Measurable: По каким числам/фактам ты поймёшь, что цель достигнута?",
      "• A — Achievable: Что уже есть у тебя? Каких ресурсов не хватает?",
      "• R — Relevant: Как эта цель связана с твоими ценностями и долгосрочным видением?",
      `• T — Time-bound: К какому сроку? ${deadline ? `(указано: ${deadline})` : "Назови конкретную дату."}`,
      "",
      "Финальная формулировка (шаблон):",
      `«К ${deadline ?? "<дата>"} я <измеримый результат>, чтобы <зачем>, опираясь на <ресурсы>.»`,
    ];
    return {
      content: [{ type: "text", text: lines.join("\n") }],
      structuredContent: { draft, deadline: deadline ?? null },
    };
  },
});
