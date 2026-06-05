"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, TelegramLogo } from "@phosphor-icons/react";
import Image from "next/image";
import { DataField } from "./DataField";
import { CountUp } from "./CountUp";
import { asset } from "@/lib/asset";
import { HERO_STATS, TRUST, CONTACTS } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 0.55], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.55], [0.86, 1.02]);
  const translateY = useTransform(scrollYProgress, [0, 0.55], [40, -10]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="approach" className="relative bg-ink text-white">
      <span id="top-sentinel" className="absolute top-0 h-px w-px" />
      <DataField className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      <div ref={wrap} className="relative">
        {/* First viewport: the message */}
        <div className="mx-auto flex min-h-[100dvh] max-w-[1240px] flex-col justify-center px-5 pt-24 pb-10 lg:px-8">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mb-6 text-[13px] font-500 uppercase tracking-[0.2em] text-flame-soft"
          >
            Технологическое развитие бизнеса
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.06, ease: EASE }}
            className="font-display max-w-[15ch] text-[2.6rem] font-700 leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.2rem]"
          >
            Видим, где теряются деньги, и спокойно возвращаем их{" "}
            <span className="text-flame">обратно</span>.
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.16, ease: EASE }}
            className="mt-7 max-w-[58ch] text-[17px] leading-relaxed text-white/72 lg:text-lg"
          >
            Смотрим на компанию целиком: где рождается прибыль, где она утекает,
            что мешает людям работать. Соединяем стратегию, технологии и
            процессы — и доводим изменения до результата, а не до отчёта. Если
            задачу можно решить без новой системы и без ИИ, мы так и скажем.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.26, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => go("contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 text-[15px] font-600 text-white transition-all duration-200 hover:bg-flame-deep active:scale-[0.98]"
            >
              Обсудить вашу задачу
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[15px] font-600 text-white transition-colors duration-200 hover:bg-white/8"
            >
              <TelegramLogo size={18} weight="fill" />
              Написать Алексею
            </a>
          </motion.div>

          {/* Stats — quiet inline row, not a banner */}
          <motion.dl
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/12 pt-7"
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-700 text-white sm:text-3xl">
                  <CountUp value={s.n} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-[12.5px] leading-snug text-white/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Container Scroll: the framed diagnostic view stands upright on scroll */}
        <div className="mx-auto max-w-[1240px] px-5 pb-24 lg:px-8" style={{ perspective: 1200 }}>
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX: rotate, scale, y: translateY, transformStyle: "preserve-3d" }
            }
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-ink-2 shadow-[0_40px_120px_-30px_rgba(255,103,3,0.25)]"
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={asset("/photos/alexey-stairs.jpg")}
                alt="Алексей Фролов"
                fill
                sizes="(max-width: 1240px) 100vw, 1200px"
                className="object-cover object-[center_30%] grayscale-[0.35]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-9">
                <div>
                  <div className="font-display text-lg font-700 text-white sm:text-2xl">
                    Алексей Фролов
                  </div>
                  <div className="mt-1 text-[12.5px] text-white/55">
                    основатель Biometric Labs · председатель совета АЛРИИ
                  </div>
                </div>
                <span className="hidden rounded-full bg-flame/90 px-3 py-1 text-[11.5px] font-600 text-white sm:inline">
                  10 лет в промышленном ИИ
                </span>
              </div>
            </div>
          </motion.div>

          {/* Trust strip — under the hero message, as a refined credibility line */}
          <div className="edge-fade mt-10 overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-white/45">
              {TRUST.map((t, i) => (
                <span key={t} className="flex items-center gap-6">
                  {i > 0 && <span className="h-1 w-1 rounded-full bg-white/25" />}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
