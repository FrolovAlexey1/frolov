"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Company-as-a-river infographic: raw data enters left, splits into a glowing
 * orange "доход" current and a cool-grey "расход" current. Animated flow via
 * stroke-dashoffset; static under reduced motion.
 */
export function DataSplitViz() {
  const reduce = useReducedMotion();
  const flow = (delay = 0) =>
    reduce
      ? {}
      : {
          strokeDashoffset: [0, -60],
          transition: { duration: 2, repeat: Infinity, ease: "linear" as const, delay },
        };

  return (
    <svg viewBox="0 0 600 280" className="h-auto w-full" role="img" aria-label="Поток данных, разделяющийся на доход и расход">
      {/* base channels */}
      <path d="M40 140 H300" stroke="#232327" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M300 140 C360 140 380 70 560 70" stroke="#232327" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M300 140 C360 140 380 210 560 210" stroke="#232327" strokeWidth="9" fill="none" strokeLinecap="round" />

      {/* incoming raw data */}
      <motion.path
        d="M40 140 H300"
        stroke="#8d8d8a"
        strokeWidth="3"
        fill="none"
        strokeDasharray="3 9"
        strokeLinecap="round"
        animate={flow(0)}
      />
      {/* revenue — orange, glowing */}
      <motion.path
        d="M300 140 C360 140 380 70 560 70"
        stroke="#ff6703"
        strokeWidth="3.5"
        fill="none"
        strokeDasharray="3 9"
        strokeLinecap="round"
        animate={flow(0.2)}
        style={{ filter: "drop-shadow(0 0 4px rgba(255,103,3,0.7))" }}
      />
      {/* cost — cool grey */}
      <motion.path
        d="M300 140 C360 140 380 210 560 210"
        stroke="#c9c9c4"
        strokeWidth="3"
        fill="none"
        strokeDasharray="3 9"
        strokeLinecap="round"
        animate={flow(0.4)}
      />

      {/* split node */}
      <circle cx="300" cy="140" r="8" fill="#101012" stroke="#ff8a3d" strokeWidth="2" className={reduce ? "" : "animate-node"} style={{ transformOrigin: "300px 140px" }} />

      <text x="36" y="120" fontSize="13" fill="#8d8d8a" fontWeight="500">данные</text>
      <text x="566" y="64" fontSize="14" fill="#ff8a3d" fontWeight="700" textAnchor="end">доход</text>
      <text x="566" y="234" fontSize="13" fill="#c9c9c4" fontWeight="600" textAnchor="end">расход</text>
    </svg>
  );
}
