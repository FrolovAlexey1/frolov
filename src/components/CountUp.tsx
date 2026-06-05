"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Counts up to a number when scrolled into view. Keeps any prefix/suffix
 * (e.g. "9 млрд ₽", "250+", "90%+") intact around the animated digits.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 22, mass: 0.8 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    return spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
  }, [spring, prefix, suffix, value, reduce]);

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>;
}
