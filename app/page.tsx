import hero from "@/public/hero.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col space-y-5 place-self-center">
      <h1 className="font-believe-heart text-center text-3xl md:text-5xl">
        BubblyBooth
      </h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button
              className=" bg-vintage-green px-8 py-6 text-xl font-bold uppercase text-white">
            <Mail/> Letter
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#F6F0F0] md:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Yooo!! Happy Birth Day 🎉
            </DialogTitle>
            <DialogDescription>What is bubblybooth?</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 text-center text-xl/relaxed sm:text-left">
            <p>
              Step into a world of vintage charm and playful memories! ✨ Bubbly
              Booth is your go-to photobooth experience, where every snapshot is
              filled with joy, laughter, and a touch of retro magic. Whether
              you&apos;re celebrating a special occasion or just capturing fun
              moments with friends, our customizable and aesthetic filters bring
              your photos to life with a nostalgic yet modern twist.
            </p>
            <p>
              📷 Snap. Smile. Sparkle. Let&apos;s make memories that last forever—one
              bubbly click at a time!
            </p>
          </div>
          <DialogFooter className="gap-3">
            <div>Always here to capture your best moments!</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="self-center">
          <div className="flex flex-col gap-5">
            <Button
              asChild
              className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase"
            >
              <Link href="/camera">
                <Camera />
                Let&apos;s Take some Photos 😖
              </Link>
            </Button>
            {/* <Button
              asChild
              className="bg-vintage-green px-8 py-6 text-xl font-bold uppercase"
            >
              <Link href="/upload">
                <Upload /> Upload Photos
              </Link>
            </Button> */}
          </div>
        </div>
        <div className="mx-auto w-[250px] md:w-[350px]">
          <Image src={hero} alt="" />
        </div>
      </div>
    </main>
  );
}
