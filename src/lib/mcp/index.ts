import { defineMcp } from "@lovable.dev/mcp-js";
import growQuestionsTool from "./tools/grow-questions";
import smartGoalTool from "./tools/smart-goal";
import balanceWheelTool from "./tools/balance-wheel";

export default defineMcp({
  name: "coach-space-mcp",
  title: "Coach Space MCP",
  version: "0.1.0",
  instructions:
    "Инструменты рабочего пространства коуча Coach Space: подборка коучинговых вопросов по GROW, шаблон SMART-цели и анализ колеса баланса. Все инструменты read-only и не требуют аутентификации.",
  tools: [growQuestionsTool, smartGoalTool, balanceWheelTool],
});
