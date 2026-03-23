import type { Metadata } from "next";
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
        url: "/lart-Logo3.png",
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
    images: ["/lart-Logo3.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
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

