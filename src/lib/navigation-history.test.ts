import { describe, expect, test } from "bun:test";
import { popNavigation, pushNavigation } from "./navigation-history";

describe("in-app back navigation", () => {
  test("returns a tool to the actual parent rather than browser history", () => {
    const history = pushNavigation([], "tools", "meditations", 240);
    expect(popNavigation(history).previous).toEqual({ tab: "tools", scroll: 240 });
    expect(popNavigation(history).history).toEqual([]);
  });
  test("returns through modules to home in order", () => {
    const history = pushNavigation(pushNavigation([], "home", "modules", 0), "modules", "grow", 120);
    const back = popNavigation(history);
    expect(back.previous?.tab).toBe("modules");
    expect(popNavigation(back.history).previous?.tab).toBe("home");
  });
  test("opening the current screen does not add a duplicate return step", () => {
    expect(pushNavigation([], "home", "home", 0)).toEqual([]);
  });
});