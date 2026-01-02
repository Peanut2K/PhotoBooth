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

const websiteUrl = "https://bubblybooth.vercel.app";
const imageUrl = "./public/bubblybooth.png";

export const metadata: Metadata = {
  title: "Happy Birthday !!!",
  description:
    "",
  metadataBase: new URL(websiteUrl),
  openGraph: {
    type: "website",
    url: websiteUrl,
    title: "",
    siteName: "AlwaysUs",
    description:
      "",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "AlwaysUs",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlwaysUs",
    description:
      "",
    images: [imageUrl],
  },
  keywords: [
    "photobooth",
    "vintage",
    "retro",
    "filters",
    "memories",
    "nostalgia",
    "fun",
    "photography",
    "camera",
    "photos",
    "pictures",
    "snapshots",
    "celebration",
    "special occasion",
    "friends",
    "family",
    "joy",
    "laughter",
    "magic",
    "customizable",
    "aesthetic",
    "modern",
    "twist",
    "snap",
    "smile",
    "sparkle",
    "memories",
    "forever",
    "click",
    "time",
  ],
  authors: [
    {
      name: "Oat",
      url: "https://brianmillonte.vercel.app/",
    },
  ],
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
