import {
  TelegramLogo,
  FacebookLogo,
  EnvelopeSimple,
  Phone,
  ArrowUpRight,
} from "@phosphor-icons/react/dist/ssr";
import { CONTACTS } from "@/lib/content";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ink py-20 text-white sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-[2rem] font-700 leading-tight tracking-tight sm:text-4xl lg:text-[2.9rem]">
              Давайте познакомимся
            </h2>
            <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-white/70">
              Первый разговор — это всегда просто разговор, без обязательств и без
              давления. За полчаса посмотрим на вашу ситуацию, и вы уйдёте как
              минимум с трезвым взглядом на то, куда компании стоит вкладываться, а
              куда — точно нет. Если поймём, что не сможем помочь, — скажем прямо.
            </p>

            <a
              href={CONTACTS.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-flame px-7 py-4 text-[16px] font-600 text-white transition-colors hover:bg-flame-deep"
            >
              <TelegramLogo size={20} weight="fill" />
              Написать Алексею в Telegram
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-4 text-[13.5px] text-white/45">
              Отвечаю лично. Можно сразу написать о задаче в двух словах.
            </p>
          </div>

          {/* Контакты */}
          <div className="space-y-3">
            <ContactRow
              icon={<TelegramLogo size={20} weight="fill" />}
              label={CONTACTS.telegram.label}
              sub="Личные сообщения — t.me/forensicsman"
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
      </div>
    </section>
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
