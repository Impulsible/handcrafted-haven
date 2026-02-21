import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  // Simple string concatenation - no template literals
  const fontClass = inter.variable + " " + dancingScript.variable;

  return (
    <html lang="en" className={fontClass}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}