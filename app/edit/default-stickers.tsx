"use client";

import { useEffect } from "react";
// import { useImagesStore } from "@/providers/images-store-provider";
import cake2 from "@/public/default/Cake2.png";
import chat1 from "@/public/default/chat1.png";
import oat1 from "@/public/default/oat1.png";
import cake3 from "@/public/default/Cake3.png";
import HBD from "@/public/default/HBD.png";

export const DefaultStickers = () => {
  // const { images } = useImagesStore((store) => store);

  // const isLessThanTwoImages = images.length < 2;
  // const isLessThanThreeImages = images.length < 3;

  const getSrc = (importedAsset: string | { src: string }) => {
    return typeof importedAsset === "string"
      ? importedAsset
      : importedAsset.src;
  };

  // Preload PNG images when component mounts
  useEffect(() => {
    const imagesToPreload = [chat1, oat1, cake2, cake3, HBD];

    const preloadPromises = imagesToPreload.map((img) => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = getSrc(img);
        image.onload = () => {
          console.log(`Preloaded: ${image.src}`);
          resolve();
        };
        image.onerror = (e) => {
          console.error(`Failed to preload: ${image.src}`, e);
          resolve(); // Still resolve to not block other images
        };

        // Fallback timeout
        setTimeout(resolve, 3000);
      });
    });

    // Wait for all images to preload
    Promise.all(preloadPromises).then(() => {
      console.log("All default stickers preloaded");
    });
  }, []);

  console.log("Default stickers rendering with:", {
    chat1: getSrc(chat1),
    oat1: getSrc(oat1),
    cake2: getSrc(cake2),
    cake3: getSrc(cake3),
    HBD: getSrc(HBD),
  });

  return (
    <div>
      <img
        src={getSrc(chat1)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute top-20 right-1 w-40"
        onLoad={() => console.log("chat1 loaded")}
        onError={(e) => console.error("chat1 failed to load:", e)}
      />
      <img
        src={getSrc(oat1)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute top-40 left-0 w-40"
        onLoad={() => console.log("oat1 loaded")}
        onError={(e) => console.error("oat1 failed to load:", e)}
      />
      <img
        src={getSrc(cake2)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute bottom-8 left-6 w-12"
        onLoad={() => console.log("cake2 loaded")}
        onError={(e) => console.error("cake2 failed to load:", e)}
      />
      <img
        src={getSrc(cake3)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute right-6 bottom-8 w-12"
        onLoad={() => console.log("cake3 loaded")}
        onError={(e) => console.error("cake3 failed to load:", e)}
      />
      <img
        src={getSrc(HBD)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute right-10 bottom-32 w-60"
        onLoad={() => console.log("HBD loaded")}
        onError={(e) => console.error("HBD failed to load:", e)}
      />
    </div>
  );
};
