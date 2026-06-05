import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Tone = "light" | "muted" | "dark";

const toneClass: Record<Tone, string> = {
  light: "bg-paper text-ink",
  muted: "bg-paper-2 text-ink",
  dark: "bg-ink text-white",
};

export function Section({
  id,
  tone = "light",
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} scroll-mt-20 py-20 sm:py-28 lg:py-32 ${className}`}
    >
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">{children}</div>
    </section>
  );
}

export function Kicker({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <p
      className={`mb-5 text-[12.5px] font-600 uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-flame-soft" : "text-flame"
      }`}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Reveal>
      <h2
        className={`font-display max-w-[20ch] text-[2rem] font-700 leading-[1.06] tracking-tight sm:text-4xl lg:text-[2.9rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        } ${className}`}
      >
        {children}
      </h2>
    </Reveal>
  );
}

export function Lead({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Reveal delay={0.05}>
      <p
        className={`max-w-[62ch] text-[17px] leading-relaxed lg:text-lg ${
          tone === "dark" ? "text-white/70" : "text-muted"
        } ${className}`}
      >
        {children}
      </p>
    </Reveal>
  );
}
