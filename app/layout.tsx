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

const websiteUrl = "https://bubblybooth.vercel.app";
const imageUrl = "./public/bubblybooth.png";

export const metadata: Metadata = {
  title: "Happy Birthday !!!",
  description:
    "Step into a world of vintage charm and playful memories! ✨ Bubbly Booth is your go-to photobooth experience, where every snapshot is filled with joy, laughter, and a touch of retro magic. Whether you're celebrating a special occasion or just capturing fun moments with friends, our customizable and aesthetic filters bring your photos to life with a nostalgic yet modern twist. 📷 Snap. Smile. Sparkle. Let's make memories that last forever—one bubbly click at a time!",
  metadataBase: new URL(websiteUrl),
  openGraph: {
    type: "website",
    url: websiteUrl,
    title: "BubblyBooth - Vintage Photobooth Experience",
    siteName: "BubblyBooth",
    description:
      "Step into a world of vintage charm and playful memories! ✨ Bubbly Booth is your go-to photobooth experience, where every snapshot is filled with joy, laughter, and a touch of retro magic. Whether you're celebrating a special occasion or just capturing fun moments with friends, our customizable and aesthetic filters bring your photos to life with a nostalgic yet modern twist. 📷 Snap. Smile. Sparkle. Let's make memories that last forever—one bubbly click at a time!",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "BubblyBooth - Vintage Photobooth Experience",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BubblyBooth - Vintage Photobooth Experience",
    description:
      "Step into a world of vintage charm and playful memories! ✨ Bubbly Booth is your go-to photobooth experience, where every snapshot is filled with joy, laughter, and a touch of retro magic. Whether you're celebrating a special occasion or just capturing fun moments with friends, our customizable and aesthetic filters bring your photos to life with a nostalgic yet modern twist. 📷 Snap. Smile. Sparkle. Let's make memories that last forever—one bubbly click at a time!",
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
      name: "Briuwu",
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
        className={`${sail.variable} ${misoRegular.variable} ${believeHeart.variable} font-miso bg-vintage-gold/25 grid min-h-dvh grid-rows-[auto_1fr_auto] antialiased`}
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
