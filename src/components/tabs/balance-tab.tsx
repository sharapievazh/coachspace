import { useEffect, useState } from "react";
import Balance from "./balance";

const STORAGE_KEY = "coach-space-balance-scores";

function loadInitial(): Record<number, number> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const empty: Record<number, number> = {};
  for (let i = 1; i <= 8; i++) empty[i] = 5;
  return empty;
}

function BalanceTab() {
  const [scores, setScores] = useState<Record<number, number>>(loadInitial);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(scores)); } catch {}
  }, [scores]);

  return <Balance scores={scores} onChange={setScores} />;
}

export default BalanceTab;
