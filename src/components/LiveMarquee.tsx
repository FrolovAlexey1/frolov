import { Photo } from "./Photo";

const SHOTS = [
  { src: "/photos/alexey-demo.jpg", cap: "Демонстрация диагностики Biometric Labs" },
  { src: "/photos/alexey-teach.jpg", cap: "Лекция: ИИ и технологии в РФ" },
  { src: "/photos/alexey-trends.jpg", cap: "THE TRENDS" },
  { src: "/photos/alexey-stage.jpg", cap: "О центре компетенций" },
  { src: "/photos/alexey-forbes.jpg", cap: "Forbes · Устойчивое развитие" },
  { src: "/photos/alexey-panel.jpg", cap: "Панель «ИИ — будущее»" },
  { src: "/photos/alexey-process.jpg", cap: "Реинжиниринг процессов" },
  { src: "/photos/alexey-headset.jpg", cap: "Выступление" },
];

/** Auto-scrolling strip of live shots. CSS-driven, pauses on hover, halts under reduced motion. */
export function LiveMarquee() {
  const row = [...SHOTS, ...SHOTS];
  return (
    <div className="edge-fade group/marquee overflow-hidden py-2">
      <div className="flex w-max gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused]">
        {row.map((s, i) => (
          <figure
            key={i}
            className="relative h-[230px] w-[340px] shrink-0 overflow-hidden rounded-xl border border-line-dark"
          >
            <Photo
              src={s.src}
              alt={s.cap}
              tone="gray"
              rounded="rounded-xl"
              className="h-full w-full"
              sizes="340px"
              position="center top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
              <figcaption className="text-[12.5px] font-500 text-white/85">{s.cap}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
