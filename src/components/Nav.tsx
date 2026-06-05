"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { NAV } from "@/lib/content";

export function Nav() {
  const [active, setActive] = useState<string>("approach");
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    // Toggle solid bar once the hero has scrolled away.
    const sentinel = document.getElementById("top-sentinel");
    if (sentinel) {
      const io = new IntersectionObserver(([e]) => setSolid(!e.isIntersecting), {
        threshold: 0,
      });
      io.observe(sentinel);
      return () => io.disconnect();
    }
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid
            ? "bg-paper/85 backdrop-blur-xl border-b border-line text-ink"
            : "bg-transparent text-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button
            onClick={() => go("approach")}
            className="font-display text-[15px] font-700 tracking-tight"
          >
            Алексей&nbsp;Фролов
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`relative rounded-full px-3 py-1.5 text-[13.5px] font-500 transition-colors ${
                  active === n.id
                    ? solid
                      ? "text-ink"
                      : "text-white"
                    : solid
                    ? "text-muted hover:text-ink"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className={`absolute inset-0 -z-10 rounded-full ${
                      solid ? "bg-paper-3" : "bg-white/12"
                    }`}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("contact")}
              className="hidden rounded-full bg-flame px-4 py-2 text-[13.5px] font-600 text-white transition-transform duration-200 hover:bg-flame-deep active:scale-[0.97] sm:block"
            >
              Обсудить задачу
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Меню"
              className="lg:hidden"
            >
              {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-flame"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8">
              {NAV.map((n, i) => (
                <motion.button
                  key={n.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={() => go(n.id)}
                  className="border-b border-line-dark py-4 text-left font-display text-2xl font-600 text-white"
                >
                  {n.label}
                </motion.button>
              ))}
              <button
                onClick={() => go("contact")}
                className="mt-6 rounded-full bg-flame px-6 py-4 text-center font-600 text-white"
              >
                Обсудить задачу
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
