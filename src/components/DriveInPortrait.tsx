"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { asset } from "@/lib/asset";

/**
 * Alexey's portrait "drives in" from the side and settles as the section
 * scrolls through view. Parallax via useScroll; static under reduced motion.
 */
export function DriveInPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={reduce ? undefined : { x, opacity }}
        className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line-dark"
      >
        <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
          <Image
            src={asset("/photos/alexey-portrait.jpg")}
            alt="Алексей Фролов"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top grayscale-[0.3]"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5">
          <div className="font-display text-lg font-700 text-white">Алексей Фролов</div>
          <div className="mt-0.5 text-[12.5px] text-white/60">основатель Biometric Labs</div>
        </div>
      </motion.div>

      {/* accent frame element */}
      <div className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-tr-2xl border-r-2 border-t-2 border-flame/60" />
    </div>
  );
}
