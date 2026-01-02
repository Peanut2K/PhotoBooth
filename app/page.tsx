"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyRound, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";
import { MusicPlayerWrapper } from "@/components/music-player-wrapper";
import DrawerButton from "@/components/drawer-button";
import { PinInput } from "@/components/pin-input";
import { useState } from "react";
// import { navigateTo } from "./lib/navigation";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
    <main className="w-full max-w-md mx-auto flex flex-col space-y-5 place-self-center px-4 md:px-0">
      <MusicPlayerWrapper />
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-vintage-green px-8 py-6 text-xl font-bold text-white uppercase">
            <Mail /> Letter - Oat
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-[#F6F0F0] md:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Yoooo!! เป็นไงบ้าง โครตไวเลยเนอะตั้งแต่ให้ของขวัญปีที่แล้ว 525252
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 text-center text-md/relaxed sm:text-left">
            <p>
              ก้ขอเกริ่นอะไรนิดหน่อยว่าปีนี้มีแรงบันดาลใจอะไรยังไงบ้าง ซึ่งปีนี้มี Theme ด้วย ก็คือ 'AlwaysUs'
              นั้นเอง โครตจะ Youth นอย แต่นั้นแหละ เป็นฟีลว่าเราอาจจะไม่ได้เจอกันบ่อยขนาดนั้น แต่ก็ยังเป็น AlwaysUs เหมือนเดิม คนเดิม
              ที่ถึงเพื่อนจะแยกย้ายไปใช้ชีวิตไปมีแฟนใดๆ ก้อยากจะบอกว่าการที่เราแยกย้ายกันไม่ได้ทำให้กุรู้สึกสนิทกับพวกมึงน้อยลงเลย ยังเป็นเพื่อนคนเดิมคนที่กุไว้ใจที่โครตจะสนิทและพร้อมจะรับฟังพวกมึงทุกอย่างทุกเรื่องเสมอนะเว้ย 
            </p>
            <p>
              แน่นอนว่าปีนี้ไม่น้อยหน้ากว่าปีที่แล้วแน่นอน 525252 จะบอกว่าอันนี้เตรียมตั้งแต่ 5 เดือนที่แล้ว
               อิอิ เอนจอยฮับพรี่ๆ เหมือนเดิมอย่าลืมกดเปิดเพลงด้วยละ !!!
            </p>
          </div>
          <DialogFooter className="gap-3">
            <div>Always here to capture your best moments!</div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PIN Input / Success Message */}
      <div className="bg-[#f7e7cc] backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-gray-800">
        {!isUnlocked ? (
          <>
            <h3 className="text-center text-lg font-bold mb-4 flex items-center justify-center gap-2">
              <KeyRound className="w-5 h-5" /> Enter Secret Code
            </h3>
            <PinInput onCorrect={() => setIsUnlocked(true)} correctPin="0124" />
          </>
        ) : (
          <div className="text-center space-y-3 py-2">
            <div className="text-4xl">💩</div>
            <h3 className="text-xl font-bold">
              ถูกครั้งแรกไหมไม่รู้แต่สุดยอดมากฮับพรี่
            </h3>
            <p className="text-gray-700">
              เอาไปเลย 2 นิ้วโป้ง
            </p>
          </div>
        )}
      </div>

      {/* Drawer Button */}
      <DrawerButton disabled={!isUnlocked} />
    </main>
    </>
  );
}
