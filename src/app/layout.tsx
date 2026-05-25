import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/layout/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://biyerkahini.online";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "বিয়ের কাহিনী | BiyerKahini — Real Wedding Costs in Bangladesh",
    template: "%s | BiyerKahini",
  },
  description:
    "Anonymous real wedding cost breakdowns, stories, and confessions from Bangladesh. Find out how much weddings actually cost in Dhaka, Chittagong, and beyond.",
  keywords: [
    "wedding cost bangladesh",
    "biye khoroch",
    "bangladesh wedding budget",
    "dhaka wedding cost",
    "chittagong wedding",
    "sylhet wedding budget",
    "bangladesh biye",
    "wedding expenses",
    "wedding planning bangladesh",
  ],
  authors: [{ name: "BiyerKahini" }],
  creator: "BiyerKahini",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BiyerKahini",
    title: "BiyerKahini — Real Wedding Costs in Bangladesh",
    description:
      "Anonymous real wedding cost breakdowns, stories, and confessions from Bangladesh.",
    url: BASE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BiyerKahini — Real Wedding Costs in Bangladesh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BiyerKahini — Real Wedding Costs in Bangladesh",
    description:
      "Anonymous real wedding cost breakdowns, stories, and confessions from Bangladesh.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
