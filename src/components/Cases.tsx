"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Plus, Minus } from "@phosphor-icons/react";
import { asset } from "@/lib/asset";
import { CASES, INDUSTRIES, MORE_PROJECTS } from "@/lib/content";

export function Cases() {
  const [filter, setFilter] = useState<string>("Все");
  const [open, setOpen] = useState<string | null>("himprom");

  const visible = filter === "Все" ? CASES : CASES.filter((c) => c.industry === filter);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind}
            onClick={() => setFilter(ind)}
            className={`rounded-full border px-4 py-2 text-[13.5px] font-500 transition-colors ${
              filter === ind
                ? "border-ink bg-ink text-white"
                : "border-line bg-paper text-muted hover:border-[#c9c9c4]"
            }`}
          >
            {ind}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => {
              const isOpen = open === c.id;
              return (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden rounded-2xl border border-line bg-paper"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : c.id)}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex items-center gap-3">
                        <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-[11.5px] font-600 uppercase tracking-wide text-muted">
                          {c.industry}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-700 text-ink sm:text-xl">
                        {c.title}
                      </h3>
                      <p className="mt-0.5 text-[15px] font-600 text-flame">{c.metric}</p>
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isOpen ? "border-flame bg-flame text-white" : "border-line text-ink"
                      }`}
                    >
                      {isOpen ? <Minus size={16} weight="bold" /> : <Plus size={16} weight="bold" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        {c.img && (
                          <figure className="relative aspect-[16/7] w-full overflow-hidden border-t border-line">
                            <Image
                              src={asset(c.img)}
                              alt={c.imgCaption ?? c.title}
                              fill
                              sizes="(max-width: 1240px) 100vw, 1100px"
                              className="object-cover object-[center_30%] grayscale transition-all duration-700 hover:grayscale-0"
                            />
                            {c.imgCaption && (
                              <>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                                <figcaption className="absolute bottom-3 left-4 text-[12.5px] font-500 text-white/85">
                                  {c.imgCaption}
                                </figcaption>
                              </>
                            )}
                          </figure>
                        )}
                        <div className="grid gap-5 border-t border-line px-5 py-6 sm:grid-cols-3 sm:px-6">
                          <Block label="Что было" text={c.was} />
                          <Block label="Что сделали" text={c.did} />
                          <Block label="Что получилось" text={c.got} accent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <div className="mt-10 rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
        <h3 className="font-display text-lg font-700 text-ink">И многое другое</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {MORE_PROJECTS.map((p) => (
            <li key={p} className="flex gap-3 text-[14.5px] leading-snug text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Block({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={`mb-2 text-[12px] font-700 uppercase tracking-[0.12em] ${
          accent ? "text-flame" : "text-[#a3a39d]"
        }`}
      >
        {label}
      </div>
      <p className="text-[14.5px] leading-relaxed text-ink/80">{text}</p>
    </div>
  );
}
