import React from "react";
import { BookOpen, ClipboardList, Footprints, Gem, Heart, Rocket, ShieldCheck, Star, Target, UserCheck, Users } from "lucide-react";
import { SectionHead, ArrowDownTip } from "./_shared";

const VALUES_PROJECT = [
  { name: "ЗНАНИЕ", icon: BookOpen, d: "Постоянное обучение и развитие, погружение в тему, расширение компетенций." },
  { name: "ЭКСПЕРТНОСТЬ", icon: UserCheck, d: "Глубокое понимание своего дела, опыт и навыки, высокое качество результатов." },
  { name: "ДЕТАЛЬНЫЙ ПЛАН", icon: ClipboardList, d: "Чёткая стратегия, пошаговый план действий, организация и контроль." },
];
const VALUES_SELF = [
  { name: "ОПЫТ", icon: Footprints, d: "Прошитые ситуации, достижения и преодоления, которые создают уверенность и опору на себя." },
  { name: "ОЦЕНКА ЗНАЧИМЫХ ЛЮДЕЙ", icon: Users, d: "Поддержка, признание и обратная связь от людей, чьё мнение важно." },
  { name: "РОЛЕВАЯ МОДЕЛЬ", icon: Star, d: "Пример человека, на которого хочется равняться и у которого можно учиться." },
  { name: "ВЕРА В СВОИ СПОСОБНОСТИ", icon: ShieldCheck, d: "Уверенность в своих силах, вера в то, что могу справиться с любыми задачами." },
];

function Values() {
  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Ценности" subtitle="Опоры, которые двигают вперёд" />

      {/* ===== ROOT NODE ===== */}
      <div className="mx-auto max-w-md rounded-2xl bg-[#0f1b3d] text-white px-5 py-4 flex items-center justify-center gap-3 shadow-lg">
        <Gem size={26} className="text-amber-300" />
        <div className="text-2xl font-extrabold tracking-[0.15em]">ЦЕННОСТИ</div>
      </div>

      {/* trunk + split to two parent branches */}
      <div className="relative mx-auto" style={{ height: 32 }}>
        <div className="absolute left-1/2 top-0 w-px h-3 bg-border" />
        <div className="absolute left-[25%] right-[25%] top-3 h-px bg-border" />
        <div className="absolute left-[25%] top-3 w-px h-4 bg-blue-500/60" />
        <div className="absolute left-[75%] top-3 w-px h-4 bg-emerald-500/60" />
        <ArrowDownTip className="absolute left-[25%] -translate-x-1/2 top-6" color="#3b82f6" />
        <ArrowDownTip className="absolute left-[75%] -translate-x-1/2 top-6" color="#10b981" />
      </div>

      {/* ===== TWO PARENT BRANCHES ===== */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* LEFT — ВЕРА В ПРОЕКТ */}
        <div className="space-y-3">
          <div className="rounded-full bg-blue-500/10 border-2 border-blue-500/40 px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-blue-500/15 border border-blue-500/30 grid place-items-center shrink-0">
              <Rocket size={20} className="text-blue-600" />
            </div>
            <h3 className="font-extrabold text-blue-700 dark:text-blue-300 tracking-wide">ВЕРА В ПРОЕКТ</h3>
          </div>

          {/* split into 3 children */}
          <div className="relative h-7">
            <div className="absolute left-1/2 top-0 w-px h-3 bg-blue-500/40" />
            <div className="absolute left-[16.66%] right-[16.66%] top-3 h-px bg-blue-500/40" />
            <div className="absolute left-[16.66%] top-3 w-px h-3 bg-blue-500/40" />
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-px h-3 bg-blue-500/40" />
            <div className="absolute left-[83.33%] top-3 w-px h-3 bg-blue-500/40" />
            <ArrowDownTip className="absolute left-[16.66%] -translate-x-1/2 top-5" color="#3b82f6" />
            <ArrowDownTip className="absolute left-1/2 -translate-x-1/2 top-5" color="#3b82f6" />
            <ArrowDownTip className="absolute left-[83.33%] -translate-x-1/2 top-5" color="#3b82f6" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {VALUES_PROJECT.map((v) => {
              const I = v.icon;
              return (
                <div key={v.name} className="bg-blue-500/5 rounded-xl border-2 border-blue-500/30 p-3 text-center flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-blue-500/10 grid place-items-center mb-2">
                    <I size={22} className="text-blue-600" />
                  </div>
                  <div className="font-extrabold text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 mb-1 leading-tight">{v.name}</div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — ВЕРА В СЕБЯ */}
        <div className="space-y-3">
          <div className="rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 px-5 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-emerald-500/15 border border-emerald-500/30 grid place-items-center shrink-0">
              <Heart size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-300 tracking-wide">ВЕРА В СЕБЯ</h3>
          </div>

          {/* split into 4 children */}
          <div className="relative h-7">
            <div className="absolute left-1/2 top-0 w-px h-3 bg-emerald-500/40" />
            <div className="absolute left-[12.5%] right-[12.5%] top-3 h-px bg-emerald-500/40" />
            {[12.5, 37.5, 62.5, 87.5].map((p) => (
              <div key={p} className="absolute top-3 w-px h-3 bg-emerald-500/40" style={{ left: `${p}%` }} />
            ))}
            {[12.5, 37.5, 62.5, 87.5].map((p) => (
              <ArrowDownTip key={p} className="absolute -translate-x-1/2 top-5" color="#10b981" style={{ left: `${p}%` } as React.CSSProperties} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VALUES_SELF.map((v) => {
              const I = v.icon;
              return (
                <div key={v.name} className="bg-emerald-500/5 rounded-xl border-2 border-emerald-500/30 p-3 text-center flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-emerald-500/10 grid place-items-center mb-2">
                    <I size={22} className="text-emerald-600" />
                  </div>
                  <div className="font-extrabold text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300 mb-1 leading-tight">{v.name}</div>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-snug">{v.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===== ИТОГ ===== */}
      <div className="rounded-2xl border-2 border-violet-500/30 bg-violet-500/10 p-4 flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-violet-500/15 grid place-items-center shrink-0">
          <Target size={22} className="text-violet-600" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-violet-700 dark:text-violet-300 font-extrabold mb-1">ИТОГ</div>
          <p className="text-sm leading-relaxed">
            Сочетание <span className="text-blue-600 dark:text-blue-300 font-semibold">веры в проект</span> и <span className="text-emerald-600 dark:text-emerald-300 font-semibold">веры в себя</span> создаёт внутреннюю опору, двигает вперёд и помогает достигать больших целей.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Супервизия ---------- */

export default Values;
