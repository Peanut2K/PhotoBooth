import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImagesStoreProvider } from "@/providers/images-store-provider";
import { FiltersStoreProvider } from "@/providers/filters-store-provider";

const misoRegular = localFont({
  src: "./fonts/miso-regular.woff",
  variable: "--font-miso",
  display: "swap",
});

const sail = localFont({
  src: "./fonts/sail-regular.otf",
  variable: "--font-sail",
  display: "swap",
});

const believeHeart = localFont({
  src: "./fonts/Believe-Heart.otf",
  variable: "--font-believe-heart",
  display: "swap",
});

const bualoy = localFont({
  src: "./fonts/bualoy.ttf",
  variable: "--font-bualoy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Birthday !!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sail.variable} ${misoRegular.variable} ${believeHeart.variable} ${bualoy.variable} font-miso bg-vintage-gold/25 grid min-h-dvh grid-rows-[auto_1fr_auto] antialiased`}
      >
        <Header />
        <FiltersStoreProvider>
          <ImagesStoreProvider>{children}</ImagesStoreProvider>
        </FiltersStoreProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
