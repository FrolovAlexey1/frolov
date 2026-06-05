import {
  Brain,
  ChartLineUp,
  Eye,
  Waveform,
  Robot,
  FileArrowDown,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { Section, Heading, Lead, Kicker } from "./ui";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";
import { TheoryViz } from "./TheoryViz";
import { SelfCheck } from "./SelfCheck";
import { Photo } from "./Photo";
import { CountUp } from "./CountUp";
import { DataSplitViz } from "./DataSplitViz";
import { DriveInPortrait } from "./DriveInPortrait";
import {
  OBSTACLES,
  PILLARS,
  TASK_TYPES,
  TOC_STEPS,
  START_CHECKS,
  AI_USES,
  TEAM,
  NETWORK,
  COMPARE,
  ABOUT_TAGS,
} from "@/lib/content";

/* ───────────────────────── §5 — С чего начинаем ───────────────────────── */
export function Start() {
  return (
    <Section id="start" tone="light">
      <Heading>Сначала смотрим на бизнес целиком — и идём туда, где деньги</Heading>
      <Lead className="mt-6">
        Большинство подрядчиков спрашивают: «какой процесс автоматизировать?» — и
        берут тот, на который укажут. Мы идём от обратного. Сначала разбираем
        компанию целиком, а уже потом решаем, за что браться в первую очередь — не за
        то, что технически проще, а за то, что важнее для результата.
      </Lead>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <h3 className="text-[13px] font-700 uppercase tracking-[0.14em] text-[#a3a39d]">
            Что именно мы смотрим
          </h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {START_CHECKS.map((c, i) => (
              <Reveal key={i} as="li" delay={i * 0.03}>
                <div className="flex gap-4 py-4">
                  <span className="font-display text-[13px] font-700 text-flame">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug text-ink/85">{c}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-7 max-w-[58ch] text-[16px] leading-relaxed text-muted">
            Только увидев эту картину, можно понять, какие изменения дадут наибольшую
            отдачу. Это и есть разница между «внедрили технологию» и «заработали на
            ней».
          </p>
        </div>

        <Reveal delay={0.08}>
          <SelfCheck />
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────────────────────── §2 — Что обычно мешает ───────────────────────── */
export function Obstacles() {
  return (
    <Section tone="light">
      <Heading>Почему технологические проекты часто буксуют</Heading>
      <Lead className="mt-6">
        Дело почти никогда не в технологиях — модели и системы, как правило,
        работают. Сложности возникают раньше, на уровне подхода. Мы видим это
        снова и снова.
      </Lead>

      <div className="mt-14 divide-y divide-line border-y border-line">
        {OBSTACLES.map((o) => (
          <Reveal key={o.n} as="div">
            <div className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-10">
              <div className="font-display text-3xl font-700 text-flame">{o.n}</div>
              <div>
                <h3 className="font-display text-xl font-700 text-ink">{o.title}</h3>
                <p className="mt-2 max-w-[68ch] text-[15.5px] leading-relaxed text-muted">
                  {o.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[60ch] text-[17px] leading-relaxed text-ink">
          Поэтому мы начинаем не с внедрения, а с того, чтобы вместе спокойно
          разобраться, где на самом деле теряются деньги и силы.
        </p>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── §3 — Три опоры ───────────────────────── */
export function Approach() {
  return (
    <Section tone="muted">
      <Heading>Мы соединяем три вещи, которые обычно живут порознь</Heading>
      <Lead className="mt-6">
        Большие консультанты дают стратегию, но не остаются внедрять. Интеграторы
        внедряют технологию, не вникая в бизнес. Мы держим все три уровня сразу —
        иначе результат не складывается.
      </Lead>

      <div className="mt-12 grid gap-3 lg:grid-cols-12">
        <PillarCard p={PILLARS[0]} idx="1" className="lg:col-span-7" />
        <PillarCard p={PILLARS[1]} idx="2" className="lg:col-span-5" />
        <PillarCard p={PILLARS[2]} idx="3" className="lg:col-span-12" dark />
      </div>

      {/* Sub-block — what's even worth changing */}
      <div className="mt-12 rounded-2xl border border-line bg-paper p-6 sm:p-10">
        <h3 className="font-display max-w-[28ch] text-xl font-700 text-ink sm:text-2xl">
          Прежде чем что-то менять — смотрим, что вообще стоит менять
        </h3>
        <p className="mt-3 max-w-[64ch] text-[15.5px] leading-relaxed text-muted">
          Не каждую задачу нужно решать кодом. Прежде чем предлагать модель или
          систему, мы относим задачу к одному из четырёх типов:
        </p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {TASK_TYPES.map((t) => (
            <div key={t.k} className="bg-paper p-6">
              <div className="font-display text-[15px] font-700 text-flame">{t.k}</div>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{t.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[64ch] text-[16px] leading-relaxed text-ink">
          На практике <span className="font-700 text-flame">30–40%</span> задач из
          типичного списка решаются вообще без ИИ. Этот разбор на входе экономит
          компании десятки миллионов, которые иначе ушли бы на пилоты впустую.
        </p>
      </div>
    </Section>
  );
}

function PillarCard({
  p,
  idx,
  className = "",
  dark = false,
}: {
  p: { k: string; body: string };
  idx: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal as="div" className={className}>
      <div
        className={`flex h-full flex-col rounded-2xl border p-7 sm:p-8 ${
          dark ? "border-line-dark bg-ink text-white" : "border-line bg-paper"
        }`}
      >
        <span className={`font-display text-sm font-700 ${dark ? "text-flame-soft" : "text-flame"}`}>
          0{idx}
        </span>
        <h3 className={`font-display mt-3 text-xl font-700 ${dark ? "text-white" : "text-ink"}`}>
          {p.k}
        </h3>
        <p className={`mt-3 max-w-[64ch] text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-muted"}`}>
          {p.body}
        </p>
      </div>
    </Reveal>
  );
}

/* ───────────────────────── §4 — Теория ограничений ───────────────────────── */
export function Theory() {
  return (
    <Section tone="dark">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <Heading tone="dark">В основе подхода — теория ограничений Голдратта</Heading>
          <Lead tone="dark" className="mt-6">
            Любой бизнес — это цепочка процессов, и его скорость определяет самое
            узкое звено. Укреплять всё подряд бессмысленно: пока узкое место не
            расшито, вложения в остальные участки не дают прироста. Поэтому мы
            действуем последовательно.
          </Lead>

          <ol className="mt-10 space-y-1">
            {TOC_STEPS.map((s, i) => (
              <Reveal key={s.t} as="li" delay={i * 0.05}>
                <div className="flex gap-4 border-t border-line-dark py-4">
                  <span className="font-display text-sm font-700 text-flame-soft">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="text-[15.5px] font-600 text-white">{s.t}</div>
                    <div className="mt-0.5 text-[14px] text-white/50">{s.d}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="flex items-center">
          <Reveal className="w-full">
            <div className="rounded-2xl border border-line-dark bg-ink-2 p-6 sm:p-8">
              <TheoryViz />
              <p className="mt-6 text-[14px] leading-relaxed text-white/55">
                Образ мышления дополняем методами исследования операций: моделируем
                процессы, анализируем очереди и загрузку. На производстве чаще
                выручает не модель, а наведённый порядок в процессе и учёте.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── §6 — Данные как поток ───────────────────────── */
export function Data() {
  return (
    <Section id="data" tone="dark">
      <Heading tone="dark">
        Иногда самый большой эффект приносит не нейросеть, а порядок в данных
      </Heading>
      <Lead tone="dark" className="mt-6">
        ИИ — это всегда надстройка над данными. Если данные не приведены в порядок,
        даже самая дорогая модель работает вполсилы. Поэтому мы смотрим на компанию
        как на живой поток: где данные рождаются, где искажаются, где теряются и где
        на них действительно можно зарабатывать.
      </Lead>
      <Lead tone="dark" className="mt-5">
        Часто половина всей работы — именно в этом: понять, какие данные есть и где
        они лежат, оценить и починить их качество, выстроить управление данными,
        подготовить инфраструктуру к работе с ИИ. Инструмент подбираем под задачу, а
        не задачу под модное слово.
      </Lead>

      <Reveal delay={0.08}>
        <div className="mt-12 rounded-2xl border border-line-dark bg-ink-2 p-7 sm:p-10">
          <DataSplitViz />
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <figure className="mt-4 overflow-hidden rounded-2xl border border-line-dark bg-ink-2">
          <div className="grid gap-0 sm:grid-cols-[1fr_auto]">
            <blockquote className="p-7 sm:p-10">
              <p className="text-[17px] leading-relaxed text-white/80">
                Так было с крупным интернет-магазином: данные о покупателях
                собирались, но не использовались, и часть выручки утекала вместе с
                брошенными корзинами. Мы навели порядок в данных, добавили ассистента
                покупателя и модель прогноза спроса — доля брошенных корзин снизилась,
                продажи начали расти.
              </p>
            </blockquote>
            <div className="flex flex-col justify-center border-t border-line-dark bg-flame/8 p-7 sm:border-l sm:border-t-0 sm:p-10">
              <div className="font-display text-4xl font-800 text-flame-soft sm:text-5xl">
                <CountUp value={6} suffix=" млрд ₽" />
              </div>
              <div className="mt-2 text-[13.5px] text-white/55">
                суммарный эффект для клиента
              </div>
            </div>
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── §7 — Процессы и системы (BPMS) ───────────────────────── */
export function Processes() {
  return (
    <Section tone="light">
      <Heading>Часто дело не в нехватке систем, а в их избытке без связи</Heading>
      <Lead className="mt-6">
        Во многих компаниях систем уже больше, чем нужно, — просто они не связаны
        между собой, и люди вручную переносят данные из одной в другую. Мы собираем
        это в единую архитектуру и выстраиваем управление бизнес-процессами (BPMS):
        процессы становятся прозрачными, исполняемыми и измеримыми.
      </Lead>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <Reveal as="div">
          <div className="h-full rounded-2xl border border-line bg-paper-2 p-7 sm:p-8">
            <div className="text-[12.5px] font-700 uppercase tracking-[0.14em] text-[#a3a39d]">
              Как есть
            </div>
            <div className="font-display mt-4 text-4xl font-800 text-ink">~60%</div>
            <div className="mt-1 text-[14px] text-muted">процессов автоматизировано</div>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              Десятки несвязанных систем, ручной перенос данных, дубли и разрывы.
              Данным сложно доверять.
            </p>
          </div>
        </Reveal>
        <Reveal as="div" delay={0.08}>
          <div className="h-full rounded-2xl border border-flame/30 bg-ink p-7 text-white sm:p-8">
            <div className="text-[12.5px] font-700 uppercase tracking-[0.14em] text-flame-soft">
              Как должно быть
            </div>
            <div className="font-display mt-4 text-4xl font-800 text-flame-soft">90%+</div>
            <div className="mt-1 text-[14px] text-white/55">процессов автоматизировано</div>
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/65">
              Единый источник правды, поэтапное внедрение с пилотных участков, без
              остановки производства. Бережная адаптация российского ПО.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[64ch] text-[16px] leading-relaxed text-ink">
          Большая часть экономии приходит не от самой автоматизации, а от того, что
          мы сначала упорядочили процессы — иначе технология лишь добавляет
          «цифрового беспорядка».
        </p>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── §8 — ИИ ───────────────────────── */
const AI_ICONS = [Brain, ChartLineUp, Eye, Waveform, Robot];

export function AI() {
  return (
    <Section id="ai" tone="dark">
      <Heading tone="dark">ИИ — там, где он действительно помогает</Heading>
      <Lead tone="dark" className="mt-6">
        Мы работаем с ИИ десять лет и именно поэтому относимся к нему спокойно: это
        инструмент, а не магия. Беремся за него тогда, когда он окупается, и честно
        говорим, когда достаточно управленческого решения.
      </Lead>

      <div className="mt-12 divide-y divide-line-dark border-y border-line-dark">
        {AI_USES.map((u, i) => {
          const Icon = AI_ICONS[i];
          return (
            <Reveal key={u.k} as="div" delay={i * 0.04}>
              <div className="grid items-baseline gap-3 py-6 sm:grid-cols-[auto_0.9fr_1.4fr] sm:gap-8">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-flame/12 text-flame-soft">
                  <Icon size={20} weight="regular" />
                </span>
                <h3 className="font-display text-[17px] font-700 text-white">{u.k}</h3>
                <p className="text-[15px] leading-relaxed text-white/60">{u.d}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-[64ch] text-[16px] leading-relaxed text-white/80">
          Помогаем выстраивать технологическое развитие системно: находим точки
          роста, превращаем R&D в продукты, выводим их на рынок — и приоритизируем
          по тому, как это отразится на прибыли.
        </p>
      </Reveal>
    </Section>
  );
}

/* ───────────────────────── §9 — Люди и культура ───────────────────────── */
export function People() {
  return (
    <Section tone="muted">
      <Reveal>
        <figure className="relative mb-14 aspect-[16/7] overflow-hidden rounded-2xl border border-line">
          <Photo
            src="/photos/alexey-teach.jpg"
            alt="Алексей читает лекцию по ИИ и технологиям"
            tone="gray"
            className="h-full w-full"
            sizes="(max-width: 1240px) 100vw, 1200px"
            position="center 35%"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          <figcaption className="absolute bottom-5 left-6 text-[13px] font-500 text-white/85">
            Программа «Инновационное мышление и ИИ на практике» — под отрасль и уровень команды
          </figcaption>
        </figure>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <Heading>Технологию можно купить за месяц. Готовность людей — нет</Heading>
          <Lead className="mt-6">
            Чаще всего проект тихо угасает не из-за кода, а из-за людей: внизу не
            понимают, зачем что-то менять, наверху — что вообще происходит. Это
            нормальная человеческая реакция, и с ней нужно работать бережно, а не
            «продавливать».
          </Lead>
          <Lead className="mt-5">
            Мы обучаем под реальный уровень и задачи конкретной команды — даём людям
            решать новыми инструментами их собственные задачи. И выстраиваем понятную
            систему управления проектами, в которой видно, кто за что отвечает.
          </Lead>
        </div>

        <Reveal className="flex items-start">
          <div className="rounded-2xl border border-line bg-paper p-7 sm:p-8">
            <div className="font-display text-[15px] font-700 text-flame">
              «Инновационное мышление и ИИ на практике»
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Программа собирается под отрасль и уровень слушателей. Первый день — про
              мышление и поиск узких мест, второй — про ИИ на практике, дальше — месяц
              сопровождения, чтобы новые привычки закрепились.
            </p>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[15px] leading-relaxed text-ink">
                В одной компании с выручкой больше 15 млрд ₽ такая работа с данными и
                культурой помогла{" "}
                <span className="font-700 text-flame">удвоить маржинальность</span>.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ───────────────────────── §12 — Команда ───────────────────────── */
export function Team() {
  return (
    <Section id="team" tone="light">
      <Heading>Над задачами работает команда, а под нестандартные — вся сеть рынка</Heading>
      <Lead className="mt-6">
        Стратегические проекты партнёры ведут лично. А когда задача требует редких
        компетенций, мы подключаем специалистов из партнёрской сети — и рекомендуем
        чужие решения не вслепую, потому что изнутри знаем, кто на рынке что умеет.
      </Lead>

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
        {/* Ядро — Director AI */}
        {TEAM.map((m) => (
          <Reveal as="div" key={m.name}>
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-line bg-paper-2 p-6 sm:flex-row sm:items-center sm:p-7">
              <TeamPortrait photo={m.photo} initials={m.initials} />
              <div>
                <span className="text-[12px] font-700 uppercase tracking-[0.14em] text-[#a3a39d]">
                  Ядро команды
                </span>
                <h3 className="font-display mt-2 text-xl font-700 text-ink">{m.name}</h3>
                <p className="mt-1 text-[13.5px] font-600 text-flame">{m.role}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{m.body}</p>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Доступ к сети */}
        <Reveal as="div" delay={0.08}>
          <div className="flex h-full flex-col justify-center rounded-2xl border border-line-dark bg-ink p-7 text-white sm:p-9">
            <p className="max-w-[44ch] text-[15.5px] leading-relaxed text-white/75">
              Стратегию и работу с первыми лицами Алексей ведёт лично. Под
              нестандартные задачи через АЛРИИ — крупнейшее в СНГ объединение в сфере
              ИИ — подключаем разработчиков, научные коллективы и вузовские лаборатории.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-6 border-t border-line-dark pt-7">
              {NETWORK.map((n) => (
                <div key={n.label}>
                  <div className="font-display text-3xl font-800 text-flame-soft">
                    <CountUp value={n.n} suffix={n.suffix} />
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-white/55">{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function TeamPortrait({ photo, initials }: { photo?: string; initials: string }) {
  // Renders the real photo when present; otherwise a styled monogram slot.
  return (
    <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-ink to-ink-3 sm:w-40">
      {photo ? (
        <Image
          src={asset(photo)}
          alt={initials}
          fill
          sizes="180px"
          className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-800 text-white/85">
          {initials}
        </span>
      )}
    </div>
  );
}

/* ───────────────────────── §13 — Об Алексее ───────────────────────── */
export function About() {
  return (
    <Section tone="dark">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <DriveInPortrait />

        <div className="flex flex-col justify-center">
          <Kicker tone="dark">Несколько слов об Алексее</Kicker>
          <Reveal>
            <p className="text-[17px] leading-relaxed text-white/80 lg:text-lg">
              Алексей создал Biometric Labs с нуля и вывел её в число заметных
              российских компаний в области промышленного ИИ — резидент «Сколково»,
              проект НТИ, особо значимый проект РФ. До этого прошёл путь от
              инвестиционных фондов с капиталом свыше 10 млрд рублей до позиции
              директора по развитию цифровых продуктов в Ростелекоме, где его портфель
              принёс больше миллиарда рублей выручки за год. Он соучредитель и
              председатель совета АЛРИИ, участвует в комитете по стандартизации
              технологий ИИ (ТК 164) и был среди авторов первой в России Этической
              хартии развития ИИ. Выступает на ВЭФ и ПМЭФ, пишет для Forbes и РБК. Но
              за всеми регалиями — простое: ему действительно интересно разбираться,
              как устроен бизнес, и помогать ему работать лучше.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-7 flex flex-wrap gap-2">
              {ABOUT_TAGS.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line-dark px-3.5 py-1.5 text-[13px] text-white/65"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#"
              className="mt-7 inline-flex items-center gap-2 text-[14.5px] font-600 text-flame-soft hover:text-flame"
            >
              <FileArrowDown size={18} weight="regular" /> Полное резюме (PDF)
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ───────────────────────── §14 — Чем отличаемся ───────────────────────── */
export function Compare() {
  return (
    <Section tone="muted">
      <Heading>
        Почему к нам приходят, когда уже пробовали и консультантов, и интеграторов
      </Heading>
      <Lead className="mt-6">
        Большие консалтинговые компании хорошо думают, но после отчёта уходят, и за
        результат никто не отвечает. ИТ-интеграторы умеют внедрять, но не считают,
        окупится ли это. Мы намеренно держим оба конца: придумываем — и сами доводим
        до результата. И берём на себя ответственность за цифру.
      </Lead>

      {/* Desktop: comparison table */}
      <Reveal delay={0.08}>
        <div className="mt-12 hidden overflow-hidden rounded-2xl border border-line bg-paper sm:block">
          <div className="grid grid-cols-4 border-b border-line bg-paper-2">
            <div className="p-4" />
            {COMPARE.cols.map((c, i) => (
              <div
                key={c}
                className={`p-4 text-[13px] font-700 ${
                  i === 2 ? "bg-flame/8 text-flame" : "text-ink"
                }`}
              >
                {c}
              </div>
            ))}
          </div>
          {COMPARE.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-4 border-b border-line last:border-0">
              <div className="p-4 text-[13.5px] font-600 text-ink">{row.label}</div>
              {row.values.map((v, i) => (
                <div
                  key={i}
                  className={`p-4 text-[14px] leading-snug ${
                    i === 2 ? "bg-flame/5 font-600 text-ink" : "text-muted"
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mobile: one card per column, "Мы" highlighted */}
      <div className="mt-10 grid gap-3 sm:hidden">
        {COMPARE.cols.map((col, ci) => {
          const us = ci === 2;
          return (
            <Reveal as="div" key={col} delay={ci * 0.05}>
              <div
                className={`rounded-2xl border p-5 ${
                  us ? "border-flame/40 bg-flame/5" : "border-line bg-paper"
                }`}
              >
                <div className={`font-display text-[15px] font-700 ${us ? "text-flame" : "text-ink"}`}>
                  {col}
                </div>
                <dl className="mt-4 divide-y divide-line">
                  {COMPARE.rows.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-[12.5px] text-[#a3a39d]">{row.label}</dt>
                      <dd
                        className={`text-right text-[13.5px] leading-snug ${
                          us ? "font-600 text-ink" : "text-muted"
                        }`}
                      >
                        {row.values[ci]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
