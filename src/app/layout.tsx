import type { Metadata, Viewport } from "next";
import { Onest, Manrope } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE = "https://frolov.tech";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Алексей Фролов — технологическое развитие бизнеса с расчётом отдачи",
    template: "%s · Алексей Фролов",
  },
  description:
    "Помогаем бизнесу увидеть, где теряются деньги, и вернуть их обратно. Теория ограничений, ABC-анализ, работа с данными, BPMS и ИИ — с ответственностью за результат. Основатель Biometric Labs, председатель совета АЛРИИ.",
  keywords: [
    "технологическое развитие бизнеса",
    "снижение себестоимости",
    "ABC-анализ",
    "теория ограничений",
    "внедрение BPMS",
    "ИИ для бизнеса",
    "операционная эффективность производства",
    "Biometric Labs",
    "Алексей Фролов",
  ],
  authors: [{ name: "Алексей Фролов" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE,
    title: "Алексей Фролов — где теряются деньги, и как их вернуть",
    description:
      "Стратегия, технологии и операционные процессы в одних руках. Больше 60 проектов, свыше 9 млрд ₽ подтверждённого эффекта, доступ к 250+ командам через АЛРИИ.",
    siteName: "Алексей Фролов",
  },
  twitter: {
    card: "summary_large_image",
    title: "Алексей Фролов — технологическое развитие бизнеса",
    description:
      "Видим компанию как поток данных: где рождается прибыль и где она утекает. И помогаем вернуть деньги в бизнес.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Алексей Фролов",
      jobTitle: "Основатель Biometric Labs, председатель совета АЛРИИ",
      url: SITE,
      sameAs: [
        "https://biometriclabs.ru",
        "https://alrii.ru",
        "https://t.me/forensicsman",
        "https://www.facebook.com/af.forensic",
      ],
      worksFor: { "@type": "Organization", name: "Biometric Labs" },
    },
    {
      "@type": "Organization",
      name: "Biometric Labs",
      url: "https://biometriclabs.ru",
      description:
        "Промышленный ИИ, неразрушающий контроль, акустическая диагностика, цифровые двойники. Резидент «Сколково», проект НТИ, особо значимый проект РФ.",
    },
    {
      "@type": "Service",
      name: "Технологическое развитие бизнеса с расчётом отдачи",
      provider: { "@type": "Person", name: "Алексей Фролов" },
      areaServed: "RU",
      description:
        "Диагностика, где теряются деньги; теория ограничений, ABC-анализ, управление данными, BPMS и ИИ — с ответственностью за результат в деньгах.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${onest.variable} ${manrope.variable}`}>
      <body className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
