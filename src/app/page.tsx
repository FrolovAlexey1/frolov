import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Cases } from "@/components/Cases";
import { LogoCloud } from "@/components/LogoCloud";
import { LiveMarquee } from "@/components/LiveMarquee";
import { ContactSection } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Section, Heading, Lead } from "@/components/ui";
import {
  Obstacles,
  Approach,
  Theory,
  Start,
  Data,
  Processes,
  AI,
  People,
  Team,
  About,
  Compare,
} from "@/components/StaticSections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Obstacles />
        <Approach />
        <Theory />
        <Start />
        <Data />
        <Processes />
        <AI />
        <People />

        {/* §10 — Кейсы */}
        <Section id="cases" tone="light">
          <Heading>Что мы уже сделали для бизнеса</Heading>
          <Lead className="mt-6 mb-2">
            За каждым числом — живая история компании, её людей и их задачи. Вот
            несколько. Нажмите на карточку, чтобы прочитать подробнее.
          </Lead>
          <div className="mt-10">
            <Cases />
          </div>
        </Section>

        {/* §11 — Клиенты */}
        <Section id="clients" tone="muted">
          <Heading>Нам доверяли</Heading>
          <Lead className="mt-6">
            С кем мы работали — в проектах Biometric Labs, в Ростелекоме, «Бери
            заряд!» и консалтинговых задачах. Логотипы сгруппированы по сферам.
          </Lead>
          <LogoCloud />
        </Section>

        {/* Алексей на площадках — живые фото */}
        <section className="scroll-mt-20 bg-ink py-16 text-white sm:py-20">
          <div className="mx-auto mb-9 max-w-[1240px] px-5 lg:px-8">
            <h2 className="font-display text-[1.7rem] font-700 leading-tight tracking-tight sm:text-3xl">
              Алексей — на форумах, сценах и площадках
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-white/60">
              ВЭФ и ПМЭФ, Forbes, отраслевые форумы, демонстрации диагностики
              Biometric Labs и корпоративные программы — вживую, без постановки.
            </p>
          </div>
          <LiveMarquee />
        </section>

        <Team />
        <About />
        <Compare />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
