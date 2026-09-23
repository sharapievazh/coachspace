import { useState } from "react";
import { ChevronDown, Clock, HelpCircle, Layers, Sparkles, Split, Users } from "lucide-react";
import { SectionHead } from "./_shared";

const TIMELINE_10 = [
  "Осознать текущую точку: где я сейчас и что меня не устраивает.",
  "Сформулировать образ желаемого будущего.",
  "Определить качества, убеждения и умения, которых не хватает.",
  "Найти в прошлом опыт, где эти качества уже проявлялись.",
  "Выстроить линию времени и разметить на ней ключевые точки.",
  "Войти в точку будущего и прожить себя из неё.",
  "Взять из будущего ресурс и перенести в настоящее.",
  "Проверить экологию изменения для окружения клиента.",
  "Составить план первых шагов на 7 дней.",
  "Договориться о «протяжке» на следующую сессию.",
];

const GROW_MAP = [
  { k: "G", t: "Цели", d: "Что именно должно измениться и как клиент узнает, что это произошло." },
  { k: "R", t: "Анализ реальности", d: "Каких качеств, убеждений и умений сейчас не хватает." },
  { k: "O", t: "Трансформация", d: "Работа на линии времени: ресурс из прошлого и из будущего." },
  { k: "W", t: "Действия", d: "Конкретные шаги, сроки, поддержка, критерии успеха." },
];

const PARTS_7 = [
  "Диагностировать поведенческий механизм, который включается автоматически.",
  "Выделить часть, отвечающую за это поведение, и установить контакт.",
  "Узнать её позитивное намерение.",
  "Определить возраст части.",
  "Передать ей ресурсы взрослого клиента.",
  "Провести взросление до текущего возраста.",
  "Интегрировать и проверить в трёх будущих ситуациях.",
];

const METAPROGRAMS = [
  { t: "Соглашатель / Несоглашатель", d: "Ищет сходства и согласие — или различия и исключения." },
  { t: "Глобальный / Специфический", d: "Говорит крупными мазками — или деталями и последовательностями." },
  { t: "Лидер / Одиночка / Командный", d: "Организует других, работает сам или включается только в группе." },
  { t: "Сам / Другой", d: "Опирается на внутренние критерии — или на оценку окружающих." },
  { t: "Цель / Процесс", d: "Мотивируется результатом — или самим занятием." },
];

const QUIZ = [
  {
    q: "«Мне важно, чтобы результат был к пятнице, остальное — детали.»",
    opts: ["Цель", "Процесс"],
    right: 0,
    why: "Речь о результате и сроке, а не об удовольствии от занятия — метапрограмма «Цель».",
  },
  {
    q: "«Да, похоже на то, что мы делали раньше, — тот же принцип.»",
    opts: ["Соглашатель", "Несоглашатель"],
    right: 0,
    why: "Клиент ищет сходства и подтверждение — «Соглашатель».",
  },
  {
    q: "«Сначала открываю файл, потом сверяю три поля, потом отправляю письмо.»",
    opts: ["Глобальный", "Специфический"],
    right: 1,
    why: "Пошаговое описание с деталями — «Специфический».",
  },
  {
    q: "«Я сам знаю, хорошо ли я сделал, мне не нужна оценка руководителя.»",
    opts: ["Сам", "Другой"],
    right: 0,
    why: "Критерий внутри — референция «Сам».",
  },
  {
    q: "«Один я быстро выдыхаюсь, а с командой всё получается.»",
    opts: ["Одиночка", "Командный"],
    right: 1,
    why: "Энергия появляется в группе — «Командный».",
  },
];

const POTENTIAL_Q = [
  { t: "Знаю и реализую", d: "Сильные стороны, которые уже работают на меня." },
  { t: "Знаю, но не реализую", d: "Спящий потенциал — что мешает включить его?" },
  { t: "Не знаю, но догадываюсь", d: "Предчувствия и подсказки окружения о моих способностях." },
  { t: "Как реализовать в условиях системы", d: "Конкретные шаги внутри реальных ограничений." },
];

type SessionCard = {
  id: string;
  n: string;
  title: string;
  icon: any;
  tone: string;
  body: React.ReactNode;
};

function NumberedList({ items, tone = "bg-primary text-primary-foreground" }: { items: string[]; tone?: string }) {
  return (
    <ol className="space-y-2">
      {items.map((s, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <span className={`w-6 h-6 rounded-full grid place-items-center text-xs font-bold shrink-0 ${tone}`}>{i + 1}</span>
          <span className="text-foreground/90 pt-0.5">{s}</span>
        </li>
      ))}
    </ol>
  );
}

function Quiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length;
  const correct = QUIZ.filter((q, i) => answers[i] === q.right).length;

  return (
    <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/5 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-bold">Тест «Определи метапрограмму»</div>
        <div className="text-xs text-muted-foreground">{correct}/{QUIZ.length}</div>
      </div>
      <div className="mt-3 space-y-3">
        {QUIZ.map((q, i) => {
          const a = answers[i];
          return (
            <div key={i} className="p-3 rounded-xl bg-card border border-border">
              <div className="text-sm text-foreground/90">{q.q}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {q.opts.map((o, oi) => {
                  const picked = a === oi;
                  const ok = oi === q.right;
                  return (
                    <button
                      key={o}
                      onClick={() => setAnswers((s) => ({ ...s, [i]: oi }))}
                      className={`px-3 py-2 min-h-10 rounded-xl text-sm font-medium border transition-colors ${
                        picked
                          ? ok
                            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-700"
                            : "bg-rose-500/15 border-rose-500/50 text-rose-700"
                          : "bg-secondary border-transparent hover:bg-muted"
                      }`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {a !== undefined && <p className="text-xs text-muted-foreground mt-2">{q.why}</p>}
            </div>
          );
        })}
      </div>
      {done > 0 && (
        <button onClick={() => setAnswers({})} className="mt-3 text-xs font-medium text-primary underline">
          Сбросить ответы
        </button>
      )}
    </div>
  );
}

function TransformSessions() {
  const [open, setOpen] = useState<string | null>("s5");

  const CARDS: SessionCard[] = [
    {
      id: "s5",
      n: "Сессия 5",
      title: "Изменения на линии времени",
      icon: Clock,
      tone: "from-emerald-500 to-teal-600",
      body: (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-secondary/60 text-sm">
            <span className="font-semibold">Для кого: </span>
            у клиента есть цель, но не хватает качеств, убеждений или умений, чтобы её достичь.
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-2">Структура по GROW</div>
            <div className="grid sm:grid-cols-2 gap-2">
              {GROW_MAP.map((g) => (
                <div key={g.k} className="p-3 rounded-xl border border-primary/25 bg-primary/5">
                  <div className="text-sm font-bold text-primary">{g.k} · {g.t}</div>
                  <p className="text-sm text-foreground/85 mt-1">{g.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70 mb-2">Путь к личной трансформации · 10 шагов</div>
            <NumberedList items={TIMELINE_10} />
          </div>
        </div>
      ),
    },
    {
      id: "s6",
      n: "Сессия 6",
      title: "Работа с частями личности (взросление части)",
      icon: Users,
      tone: "from-violet-500 to-purple-600",
      body: (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-secondary/60 text-sm">
            <span className="font-semibold">Диагностика: </span>
            находим автоматический поведенческий механизм — реакцию, которая включается быстрее решения.
          </div>
          <NumberedList items={PARTS_7} tone="bg-gradient-to-br from-violet-500 to-purple-600 text-white" />
        </div>
      ),
    },
    {
      id: "s7",
      n: "Сессия 7",
      title: "Работа с конфликтующими частями",
      icon: Split,
      tone: "from-amber-500 to-orange-600",
      body: (
        <div className="space-y-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">Метапрограммы клиента</div>
          <div className="grid sm:grid-cols-2 gap-2">
            {METAPROGRAMS.map((m) => (
              <div key={m.t} className="p-3 rounded-xl bg-secondary/60">
                <div className="text-sm font-bold">{m.t}</div>
                <p className="text-sm text-foreground/85 mt-0.5">{m.d}</p>
              </div>
            ))}
          </div>
          <Quiz />
        </div>
      ),
    },
    {
      id: "s8",
      n: "Сессия 8",
      title: "Сущностная трансформация",
      icon: Sparkles,
      tone: "from-blue-500 to-indigo-600",
      body: (
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-secondary/60 text-sm">
            Матрица «Мой потенциал» — карта того, что уже работает, что спит и что можно включить
            в реальных условиях системы. Заполнить и сохранить можно в инструменте «Мой потенциал».
          </div>
          <div className="grid grid-cols-2 gap-2">
            {POTENTIAL_Q.map((q, i) => (
              <div key={q.t} className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white grid place-items-center text-xs font-bold mb-2">{i + 1}</div>
                <div className="text-sm font-bold leading-tight">{q.t}</div>
                <p className="text-xs text-foreground/80 mt-1">{q.d}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <SectionHead title="Сессии трансформации" subtitle="Сессии 5–8 · структура и алгоритмы" />

      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-blue-500/10 to-violet-500/15 p-5">
        <Layers className="absolute right-5 top-4 text-primary/25" size={26} />
        <h3 className="text-base font-semibold text-foreground">Четыре трансформационные сессии</h3>
        <p className="mt-1 text-sm text-foreground/85">Нажмите на карточку, чтобы раскрыть структуру сессии.</p>
      </div>

      <div className="space-y-2">
        {CARDS.map((c) => {
          const act = open === c.id;
          const CI = c.icon;
          return (
            <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(act ? null : c.id)}
                className="w-full flex items-center gap-3 p-4 text-left active:scale-[0.99] transition-transform"
              >
                <div className={`w-11 h-11 rounded-xl shrink-0 grid place-items-center bg-gradient-to-br ${c.tone} text-white`}>
                  <CI size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{c.n}</div>
                  <div className="text-sm font-semibold text-foreground">{c.title}</div>
                </div>
                <ChevronDown size={18} className={`shrink-0 text-muted-foreground transition-transform ${act ? "rotate-180" : ""}`} />
              </button>
              {act && <div className="px-4 pb-5 pt-1 border-t border-border">{c.body}</div>}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 flex items-start gap-3">
        <HelpCircle size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <div className="text-xs uppercase tracking-wide text-primary font-bold mb-1">Подсказка коучу</div>
          <div className="text-sm font-medium text-foreground/90">
            Трансформационную сессию всегда закрывайте действием в реальности — иначе состояние уйдёт, а поведение останется прежним.
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformSessions;
