import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import HolyLoader from "holy-loader";
import { Suspense } from "react";
import { RouteChangeSpinner } from "@/components/RouteChangeSpinner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({ 
  subsets: ["latin"],
  variable: "--font-dancing",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover authentic handmade crafts from talented artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = inter.variable + " " + dancingScript.variable;

  return (
    <html lang="en" className={fontClass}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        {/* Top loading bar for all navigation */}
        <HolyLoader 
          color="linear-gradient(to right, #f59e0b, #d97706, #b45309)"
          height={3}
          speed={200}
        />
        
        {/* Full-screen spinner for slow transitions (only on client) */}
        <Suspense fallback={null}>
          <RouteChangeSpinner />
        </Suspense>

        <CartProvider>
          <Header />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}