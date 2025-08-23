"use client";

import { useImagesStore } from "@/providers/images-store-provider";
import panda1 from "@/public/panda-stickers/angry.svg";
import panda2 from "@/public/panda-stickers/birthday.svg";
import panda3 from "@/public/panda-stickers/eat.svg";
import cake1 from "@/public/default/Cake1.png";
import cake2 from "@/public/default/Cake2.png";

import Image from "next/image";

export const DefaultStickers = () => {
  const { images } = useImagesStore((store) => store);

  const isLessThanTwoImages = images.length < 2;
  const isLessThanThreeImages = images.length < 3;
  return (
    <div>
      <Image src={panda1} alt="" crossOrigin="anonymous" unoptimized className="absolute top-4 w-12" />
      <Image src={panda2} alt="" crossOrigin="anonymous" unoptimized className="absolute top-20 right-6 w-12" />
      <Image src={panda3} alt="" crossOrigin="anonymous" unoptimized className="absolute top-40 left-6 w-12" />
      <Image src={cake2} alt=""  crossOrigin="anonymous" unoptimized className="absolute bottom-8 left-6 w-12" />
      <Image src={cake1} alt=""  crossOrigin="anonymous" unoptimized className="absolute bottom-8 right-6 w-12" />
    </div>
  );
};
