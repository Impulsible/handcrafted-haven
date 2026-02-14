﻿import type { Metadata } from "next";
import { Open_Sans, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven | Artisan Marketplace",
  description: "Discover unique handmade crafts from talented artisans worldwide",
  keywords: ["handmade", "artisan", "crafts", "marketplace", "handcrafted"],
  authors: [{ name: "Handcrafted Haven Team" }],
  creator: "BYU-I WDD 430",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://handcrafted-haven.vercel.app",
    title: "Handcrafted Haven | Artisan Marketplace",
    description: "Discover unique handmade crafts from talented artisans worldwide",
    siteName: "Handcrafted Haven",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfair.variable} ${dancing.variable}`}>
      <body className="min-h-screen bg-background paper-texture">
        <CartProvider>
          <div className="relative flex min-h-screen flex-col paper-texture">
            <Header />
            <main className="flex-1 paper-texture">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}