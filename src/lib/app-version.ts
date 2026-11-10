// Update this with every App Store release
export const APP_VERSION = "2.5";

export const BUNDLE_ID = "com.sharapieva.coachspace";

export function parseVersion(v: string): number[] {
  return v.split(".").map((n) => parseInt(n, 10) || 0);
}

export function isNewerVersion(storeVer: string, currentVer: string): boolean {
  const store = parseVersion(storeVer);
  const current = parseVersion(currentVer);
  for (let i = 0; i < Math.max(store.length, current.length); i++) {
    const s = store[i] ?? 0;
    const c = current[i] ?? 0;
    if (s > c) return true;
    if (s < c) return false;
  }
  return false;
}
