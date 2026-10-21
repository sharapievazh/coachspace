export type NavigationFrame<T extends string> = { tab: T; scroll: number };

export function pushNavigation<T extends string>(history: NavigationFrame<T>[], current: T, next: T, scroll: number) {
  return current === next ? history : [...history, { tab: current, scroll }];
}

export function popNavigation<T extends string>(history: NavigationFrame<T>[]) {
  return { previous: history.at(-1), history: history.slice(0, -1) };
}