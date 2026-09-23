import { useState } from "react";
import {
  Brain, Check, Clock, Copy, Footprints, HeartHandshake, HelpCircle, ListChecks, Mic,
  Moon, Puzzle, Sparkles, Timer, Users, Wind,
} from "lucide-react";
import { SectionHead } from "./_shared";

type Block = { kind: "speech" | "pause" | "dir"; text?: string };

type Accent = "violet" | "teal" | "sky" | "rose" | "amber";

const ACCENTS: Record<Accent, {
  ring: string; badge: string; box: string; done: string; btn: string; icon: string;
}> = {
  violet: {
    ring: "border-violet-400/40 bg-violet-500/10",
    badge: "text-violet-700 dark:text-violet-300",
    box: "border-violet-400/60 bg-violet-500/10",
    done: "bg-violet-500 border-violet-500",
    btn: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-400/40 hover:bg-violet-500/20",
    icon: "text-violet-600 dark:text-violet-400",
  },
  teal: {
    ring: "border-teal-400/40 bg-teal-500/10",
    badge: "text-teal-700 dark:text-teal-300",
    box: "border-teal-400/60 bg-teal-500/10",
    done: "bg-teal-500 border-teal-500",
    btn: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-400/40 hover:bg-teal-500/20",
    icon: "text-teal-600 dark:text-teal-400",
  },
  sky: {
    ring: "border-sky-400/40 bg-sky-500/10",
    badge: "text-sky-700 dark:text-sky-300",
    box: "border-sky-400/60 bg-sky-500/10",
    done: "bg-sky-500 border-sky-500",
    btn: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-400/40 hover:bg-sky-500/20",
    icon: "text-sky-600 dark:text-sky-400",
  },
  rose: {
    ring: "border-rose-400/40 bg-rose-500/10",
    badge: "text-rose-700 dark:text-rose-300",
    box: "border-rose-400/60 bg-rose-500/10",
    done: "bg-rose-500 border-rose-500",
    btn: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-400/40 hover:bg-rose-500/20",
    icon: "text-rose-600 dark:text-rose-400",
  },
  amber: {
    ring: "border-amber-400/40 bg-amber-500/10",
    badge: "text-amber-700 dark:text-amber-300",
    box: "border-amber-400/60 bg-amber-500/10",
    done: "bg-amber-500 border-amber-500",
    btn: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400/40 hover:bg-amber-500/20",
    icon: "text-amber-600 dark:text-amber-400",
  },
};

// ============= Медитация № 1 · Расслабление =============
const MEDITATION_1: Block[] = [
  { kind: "dir", text: "Голос — мягкий, медленный, тихий" },
  { kind: "speech", text: "«Позвольте себе несколько минут — только для себя." },
  { kind: "speech", text: "Если вам комфортно — прикройте глаза." },
  { kind: "speech", text: "Сделайте глубокий вдох... и плавный, медленный выдох..." },
  { kind: "speech", text: "И как будто бы с каждым выдохом вы откладываете всё, что занимало ваш ум сегодня." },
  { kind: "speech", text: "Ещё один глубокий вдох... и плавный выдох..." },
  { kind: "speech", text: "Каждый раз возвращаясь к себе — говорите внутри: \"Я здесь\"." },
  { kind: "pause" },
  { kind: "speech", text: "Скользя вниманием по своему телу — просто ощутите, как вы располагаетесь здесь, в этом месте, в этом пространстве." },
  { kind: "speech", text: "Ваше тело — это единственный дом, который вы не купите и не продадите. Это форма, в которой вы пришли в этот мир — с такой мудростью, с таким потенциалом." },
  { kind: "pause" },
  { kind: "speech", text: "Сфокусируйте внимание на правой стопе. Пятка... пальцы... Как будто бы они тёплые, расслабленные." },
  { kind: "speech", text: "Поднимаясь выше — голень, бедро правой ноги. Расслабленное. Тёплое." },
  { kind: "speech", text: "Теперь внимание на левую ногу. Пальцы, пятка, колено, бедро. Вся левая нога — расслабленная, тёплая." },
  { kind: "pause" },
  { kind: "speech", text: "Правая рука — пальцы, ладонь, запястье, предплечье, плечо. Тёплая. Расслабленная." },
  { kind: "speech", text: "Левая рука — пальцы, ладонь, запястье, предплечье, плечо. Расслабленная. Тёплая." },
  { kind: "pause" },
  { kind: "speech", text: "Ваша грудная клетка. Сделайте вдох — и позвольте себе быть здесь. Просто быть." },
  { kind: "speech", text: "Ваш живот — с каждым выдохом становится мягче, спокойнее. Снимается контроль. Внутри — хорошо и спокойно." },
  { kind: "pause" },
  { kind: "speech", text: "Ваши плечи. Разрешите себе — хотя бы на время — снять с них всё, что на них лежит. Снять ответственность. Снять погоны. И почувствовать эту лёгкость." },
  { kind: "pause" },
  { kind: "speech", text: "Ваш позвоночник — от копчика до макушки. Живой, сильный, направленный. И одновременно — расслабленный." },
  { kind: "pause" },
  { kind: "speech", text: "И представьте, что в какой-то момент вы становитесь наблюдателем. Вы делаете шаг внутри себя и смотрите на всё это — со стороны." },
  { kind: "speech", text: "С этой позиции наблюдателя — посмотрите на свои цели, свои задачи. Что является для вас самым важным? Зачем вы здесь? Что вы хотели взять, принять, получить или отдать?" },
  { kind: "pause" },
  { kind: "dir", text: "пауза 30–60 секунд" },
  { kind: "speech", text: "Из этого намерения — сделайте глубокий вдох. Плавный медленный выдох." },
  { kind: "speech", text: "И потихоньку возвращайтесь — к ощущениям в теле, в это пространство, в эту комнату." },
  { kind: "speech", text: "Вдох — я здесь. Откройте глаза, когда будете готовы»." },
];

// ============= Медитация № 2 · Работа со старой установкой =============
const MEDITATION_2: Block[] = [
  { kind: "dir", text: "Клиент уже расслаблен после медитации № 1 ИЛИ сделайте 3 глубоких вдоха вместе" },
  { kind: "speech", text: "«Вспомните ту установку, которую вы назвали. Озвучьте её внутри себя — тихо, про себя." },
  { kind: "pause" },
  { kind: "speech", text: "Слушая эту установку — почувствуйте, где в теле она живёт. Может быть — грудь, живот, горло, плечи. Найдите это место." },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите на эту установку. Как она выглядит? Какого она размера, цвета, формы? Большая или маленькая? Тёмная или светлая?" },
  { kind: "pause" },
  { kind: "speech", text: "Представьте, что вы прокручиваете календарь назад. И вы находите момент — когда эта установка впервые появилась в вашей жизни." },
  { kind: "speech", text: "Сколько ей лет? Кто был рядом, когда она сформировалась? Кто-то вам её дал — или вы сами её создали?" },
  { kind: "pause" },
  { kind: "speech", text: "Изучая эту установку — спросите себя: Какое БЛАГО она мне несла? От чего она меня оберегала? Что она мне позволяла — или от чего спасала? Какие потребности она закрывала?" },
  { kind: "speech", text: "Посмотрите на её позитивное намерение. Отнеситесь к ней с уважением." },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — посмотрите на эту установку и скажите ей внутри себя:" },
  { kind: "speech", text: "\"Я благодарю тебя за всё, что ты сделала. За преданность. За то, что шла со мной столько лет. Но наши отношения подошли к завершению. Ты свободна. Я отправляю тебя в самое лучшее место для тебя. Туда, где ты сможешь отдохнуть. Ты сделала свою работу\"." },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите, с кем эта установка была связана. И скажите внутри: \"Я могу любить тебя — и без этой программы. Мне не обязательно следовать ей\"." },
  { kind: "pause" },
  { kind: "speech", text: "Представьте, как эта установка собирает вещи в чемоданчик. И уходит. Куда-то туда, где её дом. И машет вам рукой. И вы машете в ответ." },
  { kind: "pause" },
  { kind: "speech", text: "И внутри появляется пространство. Свет. Объём. Новое место." },
  { kind: "speech", text: "Возьмите большой веник — как хорошая хозяйка — и вымете всё старое, что уже не нужно. \"Всё, да. Всё, да\"." },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — позвольте себе произнести внутри ту новую установку, которую вы подготовили." },
  { kind: "dir", text: "пауза — дайте клиенту произнести её внутри 2–3 раза" },
  { kind: "speech", text: "Как она звучит? Где внутри тела вы её чувствуете?" },
  { kind: "speech", text: "Представьте, что вы готовите для неё лучшую комнату. С любовью и теплом. \"Заходи. Заходи и оставайся\"." },
  { kind: "pause" },
  { kind: "speech", text: "И новая установка находит своё место внутри вас. Располагается. Пускает корни. Даёт внутреннюю веру. Внутреннюю опору. Внутреннюю силу." },
  { kind: "pause" },
  { kind: "speech", text: "Скажите ей: \"Я буду за тобой приглядывать. Сколько тебе нужно времени, чтобы вырасти — я даю тебе всё это время. С любовью\"." },
  { kind: "pause" },
  { kind: "speech", text: "Что теперь становится возможным? Если вы начинаете жить из этой новой установки?" },
  { kind: "dir", text: "пауза" },
  { kind: "speech", text: "Сделайте глубокий вдох. Плавный медленный выдох." },
  { kind: "speech", text: "И потихоньку возвращайтесь — в это пространство, в это время, в свои руки, в своё тело." },
  { kind: "speech", text: "Сделайте глубокий, спокойный и благодарный выдох." },
  { kind: "speech", text: "Откройте глаза, когда будете готовы»." },
];

// ============= Техника № 3 · Линия времени — Вариант А =============
const TIMELINE_A: Block[] = [
  { kind: "speech", text: "«Представьте, что перед вами — ваша линия времени." },
  { kind: "speech", text: "Это может быть дорога, река, луч света." },
  { kind: "speech", text: "Где для вас находится прошлое? А где — будущее?" },
  { kind: "pause" },
  { kind: "speech", text: "Представьте, что вы начинаете подниматься." },
  { kind: "speech", text: "Выше и выше — над этой линией." },
  { kind: "speech", text: "Как птица, которая видит всё сразу с высоты." },
  { kind: "speech", text: "Вам хорошо и безопасно здесь, сверху." },
  { kind: "pause" },
  { kind: "speech", text: "Оставаясь на этой высоте, найдите на линии прошлого то событие, которое связано с [называете эмоцию]." },
  { kind: "speech", text: "Не заходите в него — просто смотрите сверху." },
  { kind: "speech", text: "Что вы видите? Сколько вам лет в этой точке?" },
  { kind: "pause" },
  { kind: "speech", text: "Оставаясь выше события — выше линии — посмотрите: что эта эмоция хотела вам сказать?" },
  { kind: "speech", text: "Зачем она появилась? Какую задачу выполняла?" },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — представьте, что вы берёте эту эмоцию." },
  { kind: "speech", text: "Как облако, как туман." },
  { kind: "speech", text: "И с высоты — отпускаете её." },
  { kind: "speech", text: "Она растворяется в воздухе." },
  { kind: "speech", text: "Ей больше не нужно держаться." },
  { kind: "speech", text: "Посмотрите на это событие снова — сверху. Как теперь выглядит эта точка?" },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — полетите в будущее." },
  { kind: "speech", text: "Туда, где этой эмоции уже нет. Туда, где вы — свободны." },
  { kind: "speech", text: "Как вы себя чувствуете там?" },
  { kind: "speech", text: "Как вы выглядите?" },
  { kind: "speech", text: "Что стало возможным?" },
  { kind: "pause" },
  { kind: "speech", text: "Возьмите это ощущение свободы — и возвращайтесь." },
  { kind: "speech", text: "По линии времени — обратно к сегодняшнему дню." },
  { kind: "speech", text: "Принося с собой это новое состояние." },
  { kind: "speech", text: "Глубокий вдох. Медленный выдох." },
  { kind: "speech", text: "Откройте глаза, когда готовы»." },
];

// ============= Техника № 3 · Линия времени — Вариант Б =============
const TIMELINE_B: Block[] = [
  { kind: "speech", text: "«Представьте свою линию времени." },
  { kind: "speech", text: "Поднимитесь над ней — выше, выше." },
  { kind: "speech", text: "Вам хорошо и безопасно." },
  { kind: "pause" },
  { kind: "speech", text: "Летите вперёд по линии будущего." },
  { kind: "speech", text: "Туда, где прошло [год / пять лет / десять лет]." },
  { kind: "speech", text: "Туда, где ваша цель уже достигнута." },
  { kind: "speech", text: "Где вы — именно тот человек, которым хотите стать." },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите на этого будущего себя." },
  { kind: "speech", text: "Как вы выглядите? Что изменилось?" },
  { kind: "speech", text: "Какое выражение лица?" },
  { kind: "pause" },
  { kind: "speech", text: "Спуститесь — прямо внутрь этого будущего себя." },
  { kind: "speech", text: "Почувствуйте, как это — быть им." },
  { kind: "speech", text: "Что вы знаете? Что вы чувствуете?" },
  { kind: "pause" },
  { kind: "speech", text: "Ваш будущий себя хочет передать вам послание." },
  { kind: "speech", text: "Что он говорит вам — сегодняшнему?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Возьмите это послание. Возьмите это состояние." },
  { kind: "speech", text: "И возвращайтесь по линии времени — в сегодняшний день." },
  { kind: "speech", text: "Принося ресурс с собой." },
  { kind: "speech", text: "Глубокий вдох. Откройте глаза, когда готовы»." },
];

// ============= Техника № 4 · Части личности =============
const PARTS: Block[] = [
  { kind: "speech", text: "«Обратите внимание на конфликт, который вы описали." },
  { kind: "speech", text: "Одна часть — [первая часть]." },
  { kind: "speech", text: "Другая часть — [вторая часть]." },
  { kind: "pause" },
  { kind: "speech", text: "Позвольте первой части появиться перед вами." },
  { kind: "speech", text: "Как она выглядит? Какого она возраста?" },
  { kind: "speech", text: "Как двигается? Как говорит?" },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите на неё с любопытством." },
  { kind: "speech", text: "Спросите её: \"Чего ты хочешь для меня?\"" },
  { kind: "dir", text: "пауза — клиент слушает" },
  { kind: "speech", text: "А за этим желанием — что стоит?" },
  { kind: "speech", text: "\"Если ты получишь это — что тогда станет возможным?\"" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Теперь позвольте появиться второй части." },
  { kind: "speech", text: "Как она выглядит? Каков её возраст?" },
  { kind: "pause" },
  { kind: "speech", text: "Спросите её: \"Чего ты хочешь для меня?\"" },
  { kind: "dir", text: "пауза" },
  { kind: "speech", text: "И снова — за чем стоит это желание?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Посмотрите на обе части перед собой." },
  { kind: "speech", text: "Обе хотят для вас что-то хорошее." },
  { kind: "speech", text: "У обеих — позитивное намерение." },
  { kind: "speech", text: "Спросите первую: \"Знаешь ли ты о намерении второй?\"" },
  { kind: "speech", text: "Спросите вторую: \"Знаешь ли ты о намерении первой?\"" },
  { kind: "pause" },
  { kind: "speech", text: "Найдите место, где их намерения совпадают." },
  { kind: "speech", text: "Где они обе хотят одного — просто разными путями." },
  { kind: "speech", text: "Что это за общая ценность?" },
  { kind: "speech", text: "Безопасность? Любовь? Свобода? Признание?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Представьте — обе части поворачиваются друг к другу." },
  { kind: "speech", text: "Видят в друг друге союзника, а не врага." },
  { kind: "speech", text: "Они делают шаг навстречу." },
  { kind: "speech", text: "И в момент встречи — что-то внутри вас объединяется." },
  { kind: "pause" },
  { kind: "speech", text: "Ощутите эту новую целостность." },
  { kind: "speech", text: "Как чувствует себя это объединённое \"я\"?" },
  { kind: "speech", text: "Что теперь становится возможным?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Глубокий вдох. Возвращайтесь." },
  { kind: "speech", text: "Откройте глаза, когда готовы»." },
];

// ============= Техника № 5 · Метапрограммы =============
const METAPROGRAMS: Block[] = [
  { kind: "speech", text: "«Сейчас мы будем наблюдать — просто наблюдать." },
  { kind: "speech", text: "Без оценок. Без \"хорошо\" или \"плохо\"." },
  { kind: "speech", text: "Как исследователи изучают интересное явление." },
  { kind: "pause" },
  { kind: "speech", text: "Представьте себя в ситуации [называете контекст]." },
  { kind: "speech", text: "Это может быть совещание, разговор, момент решения." },
  { kind: "speech", text: "Войдите в эту сцену — вы там, внутри." },
  { kind: "speech", text: "Посмотрите на себя — как вы действуете?" },
  { kind: "pause" },
  { kind: "speech", text: "ПЕРВЫЙ ВОПРОС — К чему или ОТ чего?" },
  { kind: "speech", text: "Что больше занимает ваш ум — что вы ХОТИТЕ получить?" },
  { kind: "speech", text: "ИЛИ — чего хотите избежать?" },
  { kind: "speech", text: "Просто наблюдайте, что появляется первым." },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "ВТОРОЙ ВОПРОС — Картина или детали?" },
  { kind: "speech", text: "Заходя в ситуацию — вы сначала видите большую картину целиком?" },
  { kind: "speech", text: "Или ваш взгляд сразу цепляется за детали, факты, цифры?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "ТРЕТИЙ ВОПРОС — Изнутри или снаружи?" },
  { kind: "speech", text: "Оценивая свой результат — вы слышите голос внутри: \"Я знаю, что хорошо\"?" },
  { kind: "speech", text: "ИЛИ вам важно услышать от другого: \"Ты молодец\"?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Теперь — сделайте шаг назад." },
  { kind: "speech", text: "Посмотрите на себя как на человека с уникальными фильтрами." },
  { kind: "speech", text: "Ваши паттерны — не ошибки. Это ваши стратегии." },
  { kind: "speech", text: "Они сформировались по причине." },
  { kind: "speech", text: "И их можно осознанно менять там, где нужно." },
  { kind: "pause" },
  { kind: "speech", text: "В каких ситуациях ваши паттерны служат вам хорошо?" },
  { kind: "speech", text: "А в каких — мешают?" },
  { kind: "speech", text: "Какую гибкость вы хотели бы добавить?" },
  { kind: "dir", text: "пауза" },
  { kind: "pause" },
  { kind: "speech", text: "Глубокий вдох. Возвращайтесь." },
  { kind: "speech", text: "Откройте глаза, когда готовы»." },
];

// ============= Метаданные вкладок =============
const WHEN_1 = [
  "Перед любой трансформационной работой",
  "Перед работой с убеждениями, линией времени, частями личности",
  "Когда клиент тревожен, напряжён, «в голове»",
];

const WHEN_2 = [
  "Когда выявлено конкретное ограничивающее убеждение",
  "Клиент уже назвал старую установку вслух",
  "Новая установка заранее сформулирована (ДО медитации)",
];

const WHEN_3 = [
  "Освободить негативную эмоцию из прошлого (страх, обида, вина)",
  "Убрать ограничивающее решение, принятое в прошлом",
  "Получить ресурс из будущего — каким стану через 5 лет?",
];

const WHEN_4 = [
  "Клиент «разрывается» между двумя желаниями",
  "Самосаботаж: одна часть движется к цели, другая тормозит",
  "Внутренний критик мешает действовать",
  "Хочу изменений, но боюсь — одновременно",
];

const WHEN_5 = [
  "Клиент хочет понять свои автоматические паттерны",
  "«Почему я всегда реагирую одинаково?»",
  "Работа над гибкостью поведения",
];

const PREP_1 = [
  "Тихое пространство — вас с клиентом не прервут",
  "Клиент удобно сидит или лежит, поза устойчивая",
  "Телефоны в беззвучный режим",
  "Вы сами в спокойном состоянии: дыхание ровное, голос ниже обычного",
];

const PREP_2 = [
  "Клиент называет старую установку вслух: «Я не достоин(на)...»",
  "Клиент формулирует новую установку: «Я способна...», «Я разрешаю себе...»",
  "Запишите обе формулировки — они понадобятся внутри медитации",
];

const PREP_3 = [
  "Определите цель: работаем с эмоцией прошлого ИЛИ ресурсом будущего?",
  "Клиент называет конкретную эмоцию или ситуацию",
  "Шкала интенсивности 0–10 (запишите ДО начала)",
];

const PREP_4 = [
  "Клиент формулирует конфликт: «Одна часть меня хочет ____, другая ____»",
  "Дайте имя каждой части (или пусть клиент назовёт сам)",
];

const PREP_5 = [
  "Выберите 2–3 метапрограммы (не все пять сразу)",
  "Определите контекст: работа / отношения / принятие решений",
];

const POST_1 = [
  "Дайте клиенту 30–60 секунд тишины после выхода",
  "Спросите: «Что вы заметили?», «Где вы сейчас?»",
  "Не интерпретируйте — просто слушайте",
  "Мягко переведите внимание к цели сессии",
];

const POST_2 = [
  "Дайте клиенту тишину 1–2 минуты после выхода",
  "Спросите: «Что вы заметили?», «Что произошло?»",
  "НЕ интерпретируйте — просто слушайте",
  "Запишите новую установку — клиент произносит её вслух",
  "Договоритесь: клиент повторяет новую установку 2–3 раза в день",
];

const POST_3 = [
  "Проверьте шкалу 0–10 — изменилась ли интенсивность?",
  "«Что произошло внутри?»",
  "«Что вы принесли с собой?»",
  "Зафиксируйте послание / ресурс письменно",
];

const POST_4 = [
  "«Какая из частей была для вас неожиданной?»",
  "«Что вы поняли о себе?»",
  "«Как теперь будете работать с этими частями?»",
];

const POST_5 = [
  "«Что вы заметили о себе?»",
  "«Какой паттерн был неожиданным?»",
  "Практика на неделю: замечать свои паттерны в реальных ситуациях",
];

const META_CHEATSHEET = [
  { pair: "К / ОТ", q: "движется к желаемому ИЛИ от нежелательного?" },
  { pair: "ГЛОБАЛЬНО / ДЕТАЛЬНО", q: "видит картину целиком ИЛИ детали?" },
  { pair: "ВНУТРЕННИЙ / ВНЕШНИЙ", q: "оценивает себя изнутри ИЛИ ждёт оценки снаружи?" },
  { pair: "ПРОЦЕДУРЫ / ВОЗМОЖНОСТИ", q: "следует правилам ИЛИ ищет варианты?" },
  { pair: "СХОДСТВО / РАЗЛИЧИЕ", q: "замечает что общего ИЛИ что отличается?" },
];

const VOICE_TIPS = [
  "Темп: в 2 раза медленнее обычного",
  "Тон: ниже обычного, тёплый, ровный",
  "Паузы: после каждого образа — 5–10 секунд",
  "Дыхание: дышите вместе с клиентом",
  "Если клиент плачет: не останавливайте, держите пространство",
  "Если клиент молчит: это работа, не нарушайте её",
];

const SCHEME = [
  { n: 1, t: "GOAL (G в GROW)", d: "Что хочет изменить клиент?" },
  { n: 2, t: "Называем старую установку вслух", d: "" },
  { n: 3, t: "Формулируем новую установку", d: "Позитивно, настоящее время" },
  { n: 4, t: "Медитация № 1 → Расслабление", d: "7 мин" },
  { n: 5, t: "Медитация № 2 → Работа со старой установкой", d: "15–20 мин" },
  { n: 6, t: "Выход → Тишина → Вопросы", d: "" },
  { n: 7, t: "WAY FORWARD (W в GROW)", d: "Конкретные шаги" },
];

// Схема выбора техники: фраза клиента → вкладка (и вариант линии времени)
const CHOICE: { say: string; tab: TabId; variant?: "a" | "b" }[] = [
  { say: "«Убеждение мешает мне двигаться»", tab: "beliefs" },
  { say: "«Эмоция из прошлого держит меня»", tab: "timeline", variant: "a" },
  { say: "«Хочу увидеть себя в будущем»", tab: "timeline", variant: "b" },
  { say: "«Я разрываюсь между двумя желаниями»", tab: "parts" },
  { say: "«Я хочу понять свои паттерны»", tab: "metaprograms" },
];

const TABS: { id: TabId; label: string }[] = [
  { id: "relax", label: "Расслабление" },
  { id: "beliefs", label: "Убеждения" },
  { id: "timeline", label: "Линия времени" },
  { id: "parts", label: "Части личности" },
  { id: "metaprograms", label: "Метапрограммы" },
];

type TabId = "relax" | "beliefs" | "timeline" | "parts" | "metaprograms";

const CHECKS_KEY = "coach-space-meditation-checks";

function loadChecks(scope: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKS_KEY);
    if (raw) return (JSON.parse(raw)?.[scope] as Record<string, boolean>) || {};
  } catch {}
  return {};
}

function saveCheck(scope: string, idx: number, v: boolean) {
  try {
    const raw = JSON.parse(localStorage.getItem(CHECKS_KEY) || "{}");
    raw[scope] = { ...(raw[scope] || {}), [idx]: v };
    localStorage.setItem(CHECKS_KEY, JSON.stringify(raw));
  } catch {}
}

function CheckList({ scope, items, accent }: { scope: string; items: string[]; accent: Accent }) {
  const [checks, setChecks] = useState<Record<string, boolean>>(() => loadChecks(scope));
  const toggle = (i: number) => {
    setChecks((c) => {
      const next: Record<string, boolean> = { ...c, [i]: !c[i] };
      saveCheck(scope, i, next[i]);
      return next;
    });
  };
  const a = ACCENTS[accent];
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => {
        const on = !!checks[i];
        return (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 text-left rounded-xl border px-3 py-2.5 min-h-11 transition-colors ${
              on ? "border-border bg-muted/40" : "border-border/60 bg-background hover:bg-secondary/50"
            }`}
          >
            <span
              className={`mt-0.5 w-5 h-5 rounded-md border grid place-items-center shrink-0 transition-colors ${
                on ? a.done : a.box
              }`}
              aria-hidden
            >
              {on && <Check size={13} className="text-primary-foreground" strokeWidth={3} />}
            </span>
            <span className={`text-sm leading-snug ${on ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PauseMark() {
  return (
    <div className="flex items-center gap-3 py-2.5" aria-hidden>
      <div className="h-px flex-1 bg-border" />
      <span className="text-muted-foreground/40 text-xs tracking-[0.5em]">···</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function scriptToText(blocks: Block[]): string {
  return blocks
    .map((b) => (b.kind === "pause" ? "..." : b.kind === "dir" ? `[${b.text}]` : b.text || ""))
    .join("\n");
}

function CopyButton({ blocks, accent }: { blocks: Block[]; accent: Accent }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(scriptToText(blocks)).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      },
      () => {}
    );
  };
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl border text-sm font-semibold transition-colors ${ACCENTS[accent].btn}`}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Скопировано" : "Копировать скрипт"}
    </button>
  );
}

function WhenCard({ items, icon, title }: { items: string[]; icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2.5">
        {icon}
        <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {items.map((w) => (
          <li key={w} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}

function VoiceMemo() {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Mic size={17} className="text-amber-600 dark:text-amber-400" />
        <h3 className="text-xs font-extrabold tracking-widest uppercase text-amber-700 dark:text-amber-300">
          Памятка голоса коуча
        </h3>
      </div>
      <ul className="space-y-1.5">
        {VOICE_TIPS.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-foreground/90 leading-snug">
            <Check size={14} className="mt-1 text-amber-600 dark:text-amber-400 shrink-0" strokeWidth={3} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechniqueView({
  badge, title, description, duration, when, whenIcon, prep, post, blocks, accent,
  prepTitle, postTitle, cheatsheet, scriptSwitcher,
}: {
  badge: string; title: string; description: string; duration: string;
  when: string[]; whenIcon: React.ReactNode; prep: string[]; post: string[]; blocks: Block[];
  accent: Accent; prepTitle: string; postTitle: string;
  cheatsheet?: { pair: string; q: string }[];
  scriptSwitcher?: React.ReactNode;
}) {
  const a = ACCENTS[accent];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-2xl border p-4 sm:p-5 ${a.ring}`}>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-[11px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-background/70 ${a.badge}`}>
            {badge}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase text-muted-foreground">
            <Timer size={13} /> {duration}
          </span>
        </div>
        <h3 className="text-lg font-bold leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
      </div>

      {/* When to use */}
      <WhenCard title="Когда использовать" icon={whenIcon} items={when} />

      {/* Optional cheatsheet (metaprograms) */}
      {cheatsheet && (
        <div className={`rounded-2xl border p-4 ${a.ring}`}>
          <div className="flex items-center gap-2 mb-2.5">
            <Brain size={16} className={a.icon} />
            <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">
              Метапрограммы — краткая шпаргалка
            </h3>
          </div>
          <ul className="space-y-2">
            {cheatsheet.map((m) => (
              <li key={m.pair} className="text-sm leading-snug">
                <span className={`font-extrabold ${a.badge}`}>{m.pair}</span>
                <span className="text-foreground/80"> — {m.q}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prep checklist */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <ListChecks size={16} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">{prepTitle}</h3>
        </div>
        <CheckList scope={badge + "-prep"} items={prep} accent={accent} />
      </div>

      {/* Script */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-extrabold text-sm tracking-wide uppercase">Скрипт</h3>
          <CopyButton blocks={blocks} accent={accent} />
        </div>
        {scriptSwitcher && <div className="mb-4">{scriptSwitcher}</div>}
        <div className="max-w-prose">
          {blocks.map((b, i) => {
            if (b.kind === "pause") return <PauseMark key={i} />;
            if (b.kind === "dir")
              return (
                <p key={i} className="italic text-xs text-muted-foreground/80 py-1 select-none">
                  [{b.text}]
                </p>
              );
            return (
              <p key={i} className="text-[15px] leading-8 text-foreground/90 py-1.5">
                {b.text}
              </p>
            );
          })}
        </div>
      </div>

      {/* Post-session checklist */}
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <HeartHandshake size={16} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">{postTitle}</h3>
        </div>
        <CheckList scope={badge + "-post"} items={post} accent={accent} />
      </div>

      <VoiceMemo />
    </div>
  );
}

function Meditations() {
  const [view, setView] = useState<TabId>("relax");
  const [tlVariant, setTlVariant] = useState<"a" | "b">("a");

  const go = (tab: TabId, variant?: "a" | "b") => {
    if (variant) setTlVariant(variant);
    setView(tab);
  };

  const tlSwitcher = (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
      {([
        { id: "a", label: "А · Освобождение эмоции" },
        { id: "b", label: "Б · Ресурс из будущего" },
      ] as const).map((v) => (
        <button
          key={v.id}
          onClick={() => setTlVariant(v.id)}
          className={`min-h-11 px-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
            tlVariant === v.id
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 max-w-full overflow-hidden">
      <SectionHead title="Медитации" subtitle="Скрипты для трансформационных сессий" />

      {/* Схема выбора техники */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle size={18} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">
            Какую технику выбрать?
          </h3>
        </div>
        <div className="space-y-1.5">
          {CHOICE.map((c) => (
            <button
              key={c.say}
              onClick={() => go(c.tab, c.variant)}
              className="w-full flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left rounded-xl border border-border/60 bg-background px-3 py-2.5 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm text-foreground/90 flex-1 min-w-0">{c.say}</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary shrink-0 sm:justify-end">
                <span aria-hidden>→</span>
                {TABS.find((t) => t.id === c.tab)?.label}
                {c.tab === "timeline" && (c.variant === "b" ? " (Б)" : " (А)")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Segmented switcher — горизонтальная прокрутка на мобильных */}
      <div className="-mx-1 px-1">
        <div className="inline-flex max-w-full overflow-x-auto rounded-xl bg-secondary p-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((s) => (
            <button
              key={s.id}
              onClick={() => setView(s.id)}
              className={`shrink-0 min-h-11 px-3.5 rounded-lg text-sm font-semibold transition-all ${
                view === s.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {view === "relax" && (
        <TechniqueView
          badge="Медитация № 1"
          title="Расслабление и возврат к себе"
          description="Входная медитация. Используется в начале трансформационной сессии для введения клиента в альфа-состояние."
          duration="7–10 минут"
          when={WHEN_1}
          whenIcon={<Moon size={16} className="text-violet-600 dark:text-violet-400" />}
          prep={PREP_1}
          prepTitle="Подготовка (до начала)"
          post={POST_1}
          postTitle="После медитации"
          blocks={MEDITATION_1}
          accent="violet"
        />
      )}

      {view === "beliefs" && (
        <TechniqueView
          badge="Медитация № 2"
          title="Работа со старой установкой"
          description="Трансформационная медитация. Используется для замены ограничивающих убеждений. Проводить после медитации № 1."
          duration="15–20 минут"
          when={WHEN_2}
          whenIcon={<Brain size={16} className="text-teal-600 dark:text-teal-400" />}
          prep={PREP_2}
          prepTitle="Подготовка (до начала медитации)"
          post={POST_2}
          postTitle="После медитации"
          blocks={MEDITATION_2}
          accent="teal"
        />
      )}

      {view === "timeline" && (
        <TechniqueView
          badge="Техника № 3"
          title="Путешествие по линии времени"
          description="Техника NLP (Timeline Therapy, Тэд Джеймс). Проводить после медитации «Расслабление»."
          duration="20–30 минут"
          when={WHEN_3}
          whenIcon={<Clock size={16} className="text-sky-600 dark:text-sky-400" />}
          prep={PREP_3}
          prepTitle="Подготовка"
          post={POST_3}
          postTitle="После техники"
          blocks={tlVariant === "a" ? TIMELINE_A : TIMELINE_B}
          accent="sky"
          scriptSwitcher={tlSwitcher}
        />
      )}

      {view === "parts" && (
        <TechniqueView
          badge="Техника № 4"
          title="Интеграция частей личности"
          description="Техника Parts Integration (NLP / IFS). Проводить после медитации «Расслабление»."
          duration="25–35 минут"
          when={WHEN_4}
          whenIcon={<Users size={16} className="text-rose-600 dark:text-rose-400" />}
          prep={PREP_4}
          prepTitle="Подготовка"
          post={POST_4}
          postTitle="После техники"
          blocks={PARTS}
          accent="rose"
        />
      )}

      {view === "metaprograms" && (
        <TechniqueView
          badge="Техника № 5"
          title="Наблюдение метапрограмм"
          description="Осознание автоматических фильтров восприятия (NLP Metaprograms). Проводить после медитации «Расслабление»."
          duration="15–20 минут"
          when={WHEN_5}
          whenIcon={<Puzzle size={16} className="text-amber-600 dark:text-amber-400" />}
          prep={PREP_5}
          prepTitle="Подготовка"
          post={POST_5}
          postTitle="После техники"
          blocks={METAPROGRAMS}
          accent="amber"
          cheatsheet={META_CHEATSHEET}
        />
      )}

      {/* Session scheme */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Wind size={18} className="text-primary" />
          <h3 className="text-xs font-extrabold tracking-widest uppercase text-muted-foreground">
            Схема трансформационной сессии
          </h3>
        </div>
        <div className="space-y-2">
          {SCHEME.map((s) => (
            <div key={s.n} className="flex gap-3 items-start bg-background/60 border border-border/60 rounded-xl px-3 py-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-black shrink-0">
                {s.n}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold leading-snug">{s.t}</div>
                {s.d && <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center pb-2">
        <Sparkles size={13} className="text-primary/60 shrink-0" />
        Отметки в чек-листах сохраняются — можно вести сессию прямо с телефона.
      </p>
    </div>
  );
}

// Footprints imported for potential future use; keep tree-shaking simple.
void Footprints;

export default Meditations;
