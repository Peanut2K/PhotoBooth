"use client";

import { useImagesStore } from "@/providers/images-store-provider";
import cat1 from "@/public/cat-stickers/angry.svg";
import cat2 from "@/public/cat-stickers/eat.svg";
import cat3 from "@/public/cat-stickers/full.svg";
import cat4 from "@/public/cat-stickers/love.svg";
import cat5 from "@/public/cat-stickers/mocking.svg";
import cat6 from "@/public/cat-stickers/no.svg";
import cat7 from "@/public/cat-stickers/run.svg";
import cat8 from "@/public/cat-stickers/sad.svg";
import cat9 from "@/public/cat-stickers/sing.svg";
import cat10 from "@/public/cat-stickers/yes.svg";

export const CatStickers = () => {
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
        <img src={getSrc(cat1)} alt="" className="absolute top-4 w-12" />
      )}
      {images.length > 0 && (
        <img
          src={getSrc(cat2)}
          alt=""
          className="absolute top-20 right-6 w-12"
        />
      )}
      {images.length > 0 && (
        <img
          src={getSrc(cat3)}
          alt=""
          className="absolute top-40 left-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(cat4)}
          alt=""
          className="absolute top-60 right-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(cat5)}
          alt=""
          className="absolute top-80 left-6 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(cat6)}
          alt=""
          className="absolute top-96 left-32 w-12"
        />
      )}
      {!isLessThanThreeImages && (
        <img
          src={getSrc(cat7)}
          alt=""
          className="absolute right-6 bottom-56 w-12"
        />
      )}
      {!isLessThanThreeImages && (
        <img
          src={getSrc(cat8)}
          alt=""
          className="absolute bottom-36 left-6 w-12"
        />
      )}
      {images.length > 0 && (
        <img
          src={getSrc(cat9)}
          alt=""
          className="absolute right-6 bottom-18 w-12"
        />
      )}
      {!isLessThanTwoImages && (
        <img
          src={getSrc(cat10)}
          alt=""
          className="absolute bottom-8 left-6 w-12"
        />
      )}
    </div>
  );
};
