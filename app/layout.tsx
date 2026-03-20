import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/Layout";

export const metadata: Metadata = {
  title: "CoCAHM - College of Culinary Arts and Hospitality Management",
  description: "Empowering the next generation of culinary leaders.",
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
      </body>
    </html>
  );
}
