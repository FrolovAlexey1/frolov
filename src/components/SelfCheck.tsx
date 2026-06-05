"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight } from "@phosphor-icons/react";
import { SELF_CHECK } from "@/lib/content";

export function SelfCheck() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const count = checked.size;
  const message =
    count === 0
      ? "Отметьте то, что про вашу компанию."
      : count <= 2
      ? "Так живёт большинство растущих компаний. Это как раз те места, где обычно прячутся деньги."
      : "Узнаёте несколько пунктов — это нормально. Именно здесь обычно и спрятан эффект. Давайте посмотрим вместе.";

  const go = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <h3 className="font-display text-xl font-700 text-ink">Узнаёте свою компанию?</h3>
      <p className="mt-2 text-[14.5px] text-muted">
        Без приговора и без пугающих цифр — просто отметьте, что откликается.
      </p>

      <ul className="mt-6 space-y-2.5">
        {SELF_CHECK.map((item, i) => {
          const on = checked.has(i);
          return (
            <li key={i}>
              <button
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                  on ? "border-flame/40 bg-flame/5" : "border-line bg-paper-2 hover:border-line"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    on ? "border-flame bg-flame text-white" : "border-[#c9c9c4] bg-paper"
                  }`}
                >
                  <AnimatePresence>
                    {on && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={13} weight="bold" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className={`text-[14.5px] leading-snug ${on ? "text-ink" : "text-muted"}`}>
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 rounded-xl bg-ink p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="text-[13px] uppercase tracking-wider text-white/45">Отмечено</span>
          <span className="font-display text-lg font-700 text-flame-soft">
            {count} из {SELF_CHECK.length}
          </span>
        </div>
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-[15px] leading-relaxed text-white/80"
        >
          {message}
        </motion.p>
        <button
          onClick={go}
          className="group mt-4 inline-flex items-center gap-2 rounded-full bg-flame px-5 py-2.5 text-[14px] font-600 text-white transition-colors hover:bg-flame-deep"
        >
          Обсудить вашу задачу
          <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
