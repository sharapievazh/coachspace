import { useState } from "react";
import { AlertOctagon, Scale } from "lucide-react";
import Conflicts from "./conflicts";
import Mediation from "./mediation";

const TABS = [
  { id: "conflicts", label: "Конфликты", icon: AlertOctagon },
  { id: "mediation", label: "Медиация", icon: Scale },
] as const;

type CmTab = (typeof TABS)[number]["id"];

function ConflictMediation() {
  const [t, setT] = useState<CmTab>("conflicts");

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:justify-center">
        {TABS.map((x) => {
          const I = x.icon;
          const act = t === x.id;
          return (
            <button
              key={x.id}
              onClick={() => setT(x.id)}
              className={`shrink-0 flex items-center gap-2 px-4 min-h-11 rounded-xl border text-sm font-semibold transition-colors ${
                act ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              <I size={16} />
              {x.label}
            </button>
          );
        })}
      </div>
      {t === "conflicts" && <Conflicts />}
      {t === "mediation" && <Mediation />}
    </div>
  );
}

export default ConflictMediation;
