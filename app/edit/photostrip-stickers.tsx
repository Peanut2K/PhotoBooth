"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import axolotlIcon from "@/public/axolotl-stickers/happy.svg";
import catIcon from "@/public/cat-stickers/eat.svg";
import pandaIcon from "@/public/panda-stickers/happy.svg";
import fist from "@/public/shared/fist.png";
import SmileFace from "@/public/shared/smile-face.png";
import miniHeart from "@/public/shared/mini-icon.png";
import love from "@/public/shared/love-icon.png";
import chad from "@/public/shared/Chad-Icon.png";
import { useFiltersStore } from "@/providers/filters-store-provider";
import { cn } from "@/lib/utils";

export const PhotostripStickers = () => {
  const { stickers, setStickers } = useFiltersStore((store) => store);

  return (
    <div className="grid grid-cols-4">
      <Button
        onClick={() => setStickers("axolotl")}
        variant="ghost"
        className={cn(
          "h-auto",
          stickers === "axolotl" && "border-2 border-[#72b86d]",
        )}
      >
        <Image src={love} alt="" className="w-10" />
        <span className="sr-only">Axolotl stickers</span>
      </Button>
      <Button
        onClick={() => setStickers("feelgood")}
        variant="ghost"
        className={cn(
          "h-auto",
          stickers === "feelgood" && "border-2 border-[#72b86d]",
        )}
      >
        <Image src={chad} alt="" className="w-10" />
        <span className="sr-only">Feel Good stickers</span>
      </Button>
      <Button
        onClick={() => setStickers("cat")}
        variant="ghost"
        className={cn(
          "h-auto",
          stickers === "cat" && "border-2 border-[#72b86d]",
        )}
      >
        <Image src={miniHeart} alt="" className="w-10" />
        <span className="sr-only">Cat stickers</span>
      </Button>
      <Button
        onClick={() => setStickers("panda")}
        variant="ghost"
        className={cn(
          "h-auto",
          stickers === "panda" && "border-2 border-[#72b86d]",
        )}
      >
        <Image src={SmileFace} alt="" className="w-10" />
        <span className="sr-only">Panda stickers</span>
      </Button>
      <Button
        onClick={() => setStickers(null)}
        variant="ghost"
        className={cn(
          "h-full w-full",
          !stickers && "border-2 border-[#72b86d]",
        )}
      >
        <Image src={fist} alt="" className="w-10" />
        <span className="sr-only">Fist Logo</span>
      </Button>
    </div>
  );
};
