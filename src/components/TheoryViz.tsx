"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Theory of Constraints — a process chain where one node (the bottleneck)
 * glows orange and work visibly queues before it. SVG + Motion, static under
 * reduced motion.
 */
export function TheoryViz() {
  const reduce = useReducedMotion();
  const nodes = [0, 1, 2, 3, 4];
  const bottleneck = 2;
  const xs = [60, 175, 290, 405, 520];
  const cy = 90;

  return (
    <svg viewBox="0 0 580 180" className="h-auto w-full" role="img" aria-label="Цепочка процессов с подсвеченным узким местом">
      {/* connecting line */}
      <line x1="60" y1={cy} x2="520" y2={cy} stroke="#232327" strokeWidth="2" />
      {/* flowing dash overlay up to bottleneck */}
      <motion.line
        x1="60"
        y1={cy}
        x2={xs[bottleneck]}
        y2={cy}
        stroke="#ff6703"
        strokeWidth="2"
        strokeDasharray="2 8"
        initial={false}
        animate={reduce ? {} : { strokeDashoffset: [0, -40] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        opacity="0.7"
      />

      {/* queue dots piling before the bottleneck */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={xs[bottleneck] - 26 - i * 12}
            cy={cy}
            r="3.5"
            fill="#ff8a3d"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

      {nodes.map((n) => {
        const isBn = n === bottleneck;
        return (
          <g key={n}>
            {isBn && (
              <circle
                cx={xs[n]}
                cy={cy}
                r="26"
                fill="#ff6703"
                opacity="0.14"
                className={reduce ? "" : "animate-node"}
                style={{ transformOrigin: `${xs[n]}px ${cy}px` }}
              />
            )}
            <circle
              cx={xs[n]}
              cy={cy}
              r={isBn ? 15 : 11}
              fill={isBn ? "#ff6703" : "#101012"}
              stroke={isBn ? "#ff8a3d" : "#34343a"}
              strokeWidth="2"
            />
            <text
              x={xs[n]}
              y={cy + 44}
              textAnchor="middle"
              fontSize="12"
              fill={isBn ? "#ff8a3d" : "#8d8d8a"}
              fontWeight={isBn ? 700 : 500}
            >
              {n + 1}
            </text>
          </g>
        );
      })}
      <text x={xs[bottleneck]} y={cy - 34} textAnchor="middle" fontSize="11.5" fill="#ff8a3d" fontWeight="600">
        узкое место
      </text>
    </svg>
  );
}
