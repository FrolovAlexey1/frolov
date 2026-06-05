"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { NAV, CONTACTS, TRUST } from "@/lib/content";

export function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-line-dark bg-ink text-white">
      <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="font-display text-xl font-700">Алексей Фролов</div>
            <p className="mt-3 max-w-[40ch] text-[14.5px] leading-relaxed text-white/55">
              Технологическое развитие бизнеса с ответственностью за результат в
              деньгах. Основатель Biometric Labs, председатель совета АЛРИИ.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-[13.5px]">
              <a
                href={CONTACTS.biometric.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-600 text-flame-soft hover:text-flame"
              >
                {CONTACTS.biometric.label}
              </a>
              <span className="text-white/20">·</span>
              <a
                href={CONTACTS.alrii.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-600 text-flame-soft hover:text-flame"
              >
                {CONTACTS.alrii.label}
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-[12.5px] font-600 uppercase tracking-[0.16em] text-white/40">
              Разделы
            </div>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className="text-[14.5px] text-white/65 hover:text-white"
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[12.5px] font-600 uppercase tracking-[0.16em] text-white/40">
              Связаться
            </div>
            <ul className="space-y-2.5 text-[14.5px]">
              <li>
                <a href={CONTACTS.telegram.href} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white">
                  Telegram {CONTACTS.telegram.label}
                </a>
              </li>
              <li>
                <a href={CONTACTS.facebook.href} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href={CONTACTS.phone.href} className="text-white/65 hover:text-white">
                  {CONTACTS.phone.label}
                </a>
              </li>
              <li>
                <a href={CONTACTS.mail1.href} className="text-white/65 hover:text-white">
                  {CONTACTS.mail1.label}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line-dark pt-8 text-[12.5px] text-white/40">
          {TRUST.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-[13px] text-white/45 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {new Date().getFullYear()} Алексей Фролов</span>
            <a href="#" className="hover:text-white/70">
              Политика конфиденциальности
            </a>
            <span className="text-white/25">152-ФЗ</span>
          </div>
          <button
            onClick={top}
            className="inline-flex items-center gap-2 rounded-full border border-line-dark px-4 py-2 font-600 text-white/65 transition-colors hover:border-flame/40 hover:text-white"
          >
            Наверх <ArrowUp size={15} weight="bold" />
          </button>
        </div>
      </div>
    </footer>
  );
}
