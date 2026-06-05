"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  TelegramLogo,
  FacebookLogo,
  EnvelopeSimple,
  Phone,
  ArrowUpRight,
  Check,
} from "@phosphor-icons/react";
import { CONTACTS } from "@/lib/content";

const CHANNELS = ["Telegram", "Телефон", "Почта"] as const;

export function ContactSection() {
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>("Telegram");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot — bots fill this hidden field.
    if (data.get("company_url")) return;
    if (!data.get("name") || !data.get("contact")) {
      setError("Заполните, пожалуйста, имя и способ связи.");
      return;
    }
    if (!data.get("consent")) {
      setError("Нужно согласие на обработку данных.");
      return;
    }
    setSending(true);
    try {
      // Wire to /api/lead (email + Telegram + Bitrix24) on deploy.
      await new Promise((r) => setTimeout(r, 900));
      setSent(true);
      form.reset();
    } catch {
      setError("Не получилось отправить. Напишите Алексею в Telegram — это быстрее всего.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[2rem] font-700 leading-tight tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Давайте познакомимся
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/70">
              Первый разговор — это всегда просто разговор, без обязательств и без
              давления. За полчаса посмотрим на вашу ситуацию, и вы уйдёте как
              минимум с трезвым взглядом на то, куда компании стоит вкладываться, а
              куда — точно нет. Если поймём, что не сможем помочь, — скажем прямо.
            </p>

            <div className="mt-10 space-y-3">
              <ContactRow
                icon={<TelegramLogo size={20} weight="fill" />}
                label={CONTACTS.telegram.label}
                sub="Написать Алексею лично"
                href={CONTACTS.telegram.href}
              />
              <ContactRow
                icon={<TelegramLogo size={20} weight="regular" />}
                label={CONTACTS.channel.label}
                sub="Заметки и кейсы — t.me/frolovtech"
                href={CONTACTS.channel.href}
              />
              <ContactRow
                icon={<FacebookLogo size={20} weight="fill" />}
                label={CONTACTS.facebook.label}
                sub="facebook.com/af.forensic"
                href={CONTACTS.facebook.href}
              />
              <ContactRow
                icon={<Phone size={20} weight="fill" />}
                label={CONTACTS.phone.label}
                sub="Звонок или мессенджеры"
                href={CONTACTS.phone.href}
              />
              <ContactRow
                icon={<EnvelopeSimple size={20} weight="fill" />}
                label={CONTACTS.mail1.label}
                sub="Почта для писем и материалов"
                href={CONTACTS.mail1.href}
              />
            </div>
          </div>

          {/* Form card */}
          <div className="rounded-2xl border border-line-dark bg-ink-2 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[420px] flex-col items-start justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-flame text-white">
                    <Check size={24} weight="bold" />
                  </span>
                  <h3 className="font-display mt-5 text-2xl font-700">Спасибо.</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-white/70">
                    Скоро напишу вам лично.
                    <br />— Алексей
                  </p>
                  <a
                    href={CONTACTS.telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-[14px] font-600 text-flame-soft hover:text-flame"
                  >
                    <TelegramLogo size={18} weight="fill" /> Или напишите сразу в Telegram
                  </a>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                  noValidate
                >
                  <h3 className="font-display text-xl font-700">Расскажите о вашей задаче</h3>

                  <Field label="Имя" name="name" placeholder="Как к вам обращаться" required />
                  <Field label="Компания" name="org" placeholder="Необязательно" />

                  <div>
                    <span className="mb-2 block text-[13.5px] font-600 text-white/80">
                      Как удобно связаться
                    </span>
                    <div className="mb-2.5 flex gap-1.5">
                      {CHANNELS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setChannel(c)}
                          className={`flex-1 rounded-lg border py-2 text-[13.5px] font-500 transition-colors ${
                            channel === c
                              ? "border-flame bg-flame/15 text-white"
                              : "border-line-dark text-white/55 hover:text-white/80"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                    <input
                      name="contact"
                      required
                      placeholder={
                        channel === "Telegram"
                          ? "@username"
                          : channel === "Телефон"
                          ? "+7 ..."
                          : "you@company.ru"
                      }
                      className="w-full rounded-lg border border-line-dark bg-ink px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-flame focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="task" className="mb-2 block text-[13.5px] font-600 text-white/80">
                      В двух словах о задаче{" "}
                      <span className="font-400 text-white/40">— необязательно</span>
                    </label>
                    <textarea
                      id="task"
                      name="task"
                      rows={3}
                      placeholder="Что сейчас беспокоит или что хотелось бы понять"
                      className="w-full resize-none rounded-lg border border-line-dark bg-ink px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-flame focus:outline-none"
                    />
                  </div>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="company_url"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0"
                  />

                  <label className="flex items-start gap-2.5 text-[13px] leading-snug text-white/55">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff6703]"
                    />
                    Согласен на обработку персональных данных в соответствии с политикой
                    конфиденциальности.
                  </label>

                  {error && (
                    <p className="text-[13.5px] text-flame-soft" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-full bg-flame px-6 py-3.5 text-[15px] font-600 text-white transition-colors hover:bg-flame-deep active:scale-[0.99] disabled:opacity-60"
                  >
                    {sending ? "Отправляю…" : "Отправить"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[13.5px] font-600 text-white/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line-dark bg-ink px-4 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-flame focus:outline-none"
      />
    </div>
  );
}

function ContactRow({
  icon,
  label,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-line-dark bg-ink-2 p-4 transition-colors hover:border-flame/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-flame/12 text-flame-soft">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-600 text-white">{label}</span>
        <span className="block truncate text-[13px] text-white/45">{sub}</span>
      </span>
      <ArrowUpRight
        size={18}
        className="text-white/30 transition-colors group-hover:text-flame-soft"
      />
    </a>
  );
}
