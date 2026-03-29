import type { Metadata } from "next";
import Script from "next/script";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import CookieBanner from "@/components/common/CookieBanner";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "L'art Peyzaj Mimarlık | Konya",
  description:
    "L'art Peyzaj Mimarlık — Konya merkezli, doğayı ve modern mimariyi birleştiren premium peyzaj tasarım firması.",
  keywords: ["peyzaj", "mimarlık", "konya", "bahçe tasarımı", "peyzaj mimarlık", "peyzaj tasarım", "L'art"],
  metadataBase: new URL("https://lartpeyzaj.com"),
  openGraph: {
    title: "L'art Peyzaj Mimarlık | Konya",
    description: "Doğayı ve modern mimariyi birleştiren premium peyzaj tasarım firması.",
    url: "https://lartpeyzaj.com",
    siteName: "L'art Peyzaj Mimarlık",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "L'art Peyzaj Mimarlık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'art Peyzaj Mimarlık | Konya",
    description: "Doğayı ve modern mimariyi birleştiren premium peyzaj tasarım firması.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LandscapeDesign",
              name: "L'art Peyzaj Mimarlık",
              image: "https://lartpeyzaj.com/og-image.png",
              "@id": "https://lartpeyzaj.com",
              url: "https://lartpeyzaj.com",
              telephone: "+905313436612",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nişantaş, İkra Sk. Nasip Sit. No:1/c B Blok",
                addressLocality: "Selçuklu",
                addressRegion: "Konya",
                postalCode: "42090",
                addressCountry: "TR"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.876,
                longitude: 32.482
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "09:00",
                  closes: "18:30"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Saturday"],
                  opens: "09:00",
                  closes: "14:00"
                }
              ]
            })
          }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2WXWYHZFBY"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2WXWYHZFBY');
        `}
      </Script>
      <body
        className={`${outfit.variable} ${dmSans.variable}`}
        style={{ cursor: "none", fontFamily: "var(--font-body), sans-serif" }}
      >
        <SmoothScroller>
          <CustomCursor />
          <Navigation />
          {children}
        </SmoothScroller>
        <CookieBanner />
      </body>
    </html>
  );
}

