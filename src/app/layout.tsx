import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://biyerkhoroch.com"
  ),
  title: {
    default: "বিয়ের খরচ | BiyerKhoroch — Real Wedding Costs in Bangladesh",
    template: "%s | BiyerKhoroch",
  },
  description:
    "Anonymous real wedding cost breakdowns, stories, and confessions from Bangladesh. Find out how much weddings actually cost in Dhaka, Chittagong, and beyond.",
  keywords: [
    "wedding cost bangladesh",
    "biye khoroch",
    "dhaka wedding budget",
    "bangladesh wedding",
    "wedding expenses",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BiyerKhoroch",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
