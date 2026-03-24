import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "CoCAHM - College of Culinary Arts and Hospitality Management",
  description: "Ghana's premier culinary school offering professional training in baking, pastry, hospitality, and event management since 1971.",
  keywords: ["culinary school", "Ghana", "hospitality management", "baking", "pastry", "event management", "CoCAHM"],
  openGraph: {
    title: "CoCAHM - College of Culinary Arts and Hospitality Management",
    description: "Ghana's premier culinary school offering professional training in baking, pastry, hospitality, and event management since 1971.",
    url: "https://cocahm.com",
    siteName: "CoCAHM",
    images: [
      {
        url: "/6_556a25cfb5d4c1a0c5fa5912deb0c5f70f622d3b-3975x5963.jpg",
        width: 1200,
        height: 630,
        alt: "CoCAHM Culinary Students",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoCAHM - College of Culinary Arts and Hospitality Management",
    description: "Ghana's premier culinary school offering professional training in baking, pastry, hospitality, and event management since 1971.",
    images: ["/6_556a25cfb5d4c1a0c5fa5912deb0c5f70f622d3b-3975x5963.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-brand-bg text-gray-900 min-h-screen flex flex-col selection:bg-brand-primary selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
