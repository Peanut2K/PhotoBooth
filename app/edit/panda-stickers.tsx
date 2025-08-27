"use client";

import { useImagesStore } from "@/providers/images-store-provider";
import panda1 from "@/public/panda-stickers/angry.svg";
import panda2 from "@/public/panda-stickers/birthday.svg";
import panda3 from "@/public/panda-stickers/eat.svg";
import panda4 from "@/public/panda-stickers/fever.svg";
import panda5 from "@/public/panda-stickers/full.svg";
import panda6 from "@/public/panda-stickers/happy.svg";
import panda7 from "@/public/panda-stickers/hello.svg";
import panda8 from "@/public/panda-stickers/love.svg";
import cake1 from "@/public/default/Cake1.png";
import cake2 from "@/public/default/Cake2.png";

export const PandaStickers = () => {
  const { images } = useImagesStore((store) => store);

  const isLessThanTwoImages = images.length < 2;
  const isLessThanThreeImages = images.length < 3;

  // Helper function to get the correct src
  const getSrc = (importedAsset: string | { src: string }) => {
    return typeof importedAsset === "string"
      ? importedAsset
      : importedAsset.src;
  };

  return (
    <div>
      {images.length > 0 && (
        <img src={getSrc(panda1)} alt="" className="absolute top-4 w-12" />
      )}
      {images.length > 0 && (
        <img
          src={getSrc(panda2)}
          alt=""
          className="absolute top-20 right-6 w-12"
        />
      )}
      {images.length > 0 && (
        <img
          src={getSrc(panda3)}
          alt=""
          className="absolute top-40 left-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(panda4)}
          alt=""
          className="absolute top-60 right-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(panda5)}
          alt=""
          className="absolute top-80 left-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(panda6)}
          alt=""
          className="absolute top-96 left-32 w-12"
        />
      )}
      {!isLessThanThreeImages && (
        <img
          src={getSrc(panda7)}
          alt=""
          className="absolute right-6 bottom-56 w-12"
        />
      )}
      {!isLessThanThreeImages && (
        <img
          src={getSrc(panda8)}
          alt=""
          className="absolute bottom-36 left-6 w-12"
        />
      )}
      <img
        src={getSrc(cake2)}
        alt=""
        className="absolute bottom-8 left-6 w-12"
      />
      <img
        src={getSrc(cake1)}
        alt=""
        className="absolute right-6 bottom-8 w-12"
      />
    </div>
  );
};
