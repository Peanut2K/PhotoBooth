"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useImagesStore } from "@/providers/images-store-provider";
import cake2 from "@/public/default/Cake2.png";
import chat1 from "@/public/default/chat1.png";
import oat1 from "@/public/default/oat1.png";
import cake3 from "@/public/default/Cake3.png";
import HBD from "@/public/default/HBD.png";

export const DefaultStickers = () => {
  const { images } = useImagesStore((store) => store);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [, setLoadedCount] = useState(0);

  // const isLessThanTwoImages = images.length < 2;
  // const isLessThanThreeImages = images.length < 3;

  const getSrc = (importedAsset: string | { src: string }) => {
    return typeof importedAsset === "string"
      ? importedAsset
      : importedAsset.src;
  };

  const handleImageLoad = (imageName: string) => {
    console.log(`${imageName} loaded successfully`);
    setLoadedCount((prev) => {
      const newCount = prev + 1;

      // Check if all 5 images are loaded
      if (newCount === 5) {
        setAllImagesLoaded(true);
        console.log("All default stickers loaded successfully!");
      }

      return newCount;
    });
  };

  const handleImageError = (
    imageName: string,
    e: SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    console.error(`${imageName} failed to load:`, e);
    // Still count as "loaded" to prevent infinite waiting
    handleImageLoad(imageName);
  };

  // Preload PNG images when component mounts
  useEffect(() => {
    const imagesToPreload = [chat1, oat1, cake2, cake3, HBD];
    let loadedImages = 0;

    const preloadPromises = imagesToPreload.map((img, index) => {
      return new Promise<void>((resolve) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = getSrc(img);

        const imageName = ["chat1", "oat1", "cake2", "cake3", "HBD"][index];

        image.onload = () => {
          console.log(`Preloaded: ${imageName}`);
          loadedImages++;

          // If all images are preloaded, set them as loaded immediately
          if (loadedImages === 5) {
            console.log("All images preloaded, setting as loaded");
            setAllImagesLoaded(true);
            setLoadedCount(5);
          }

          resolve();
        };
        image.onerror = (e) => {
          console.error(`Failed to preload: ${imageName}`, e);
          loadedImages++;

          // Still count failed images to prevent infinite waiting
          if (loadedImages === 5) {
            console.log(
              "All images processed (some failed), setting as loaded",
            );
            setAllImagesLoaded(true);
            setLoadedCount(5);
          }

          resolve();
        };

        // Fallback timeout
        setTimeout(() => {
          if (loadedImages < 5) {
            loadedImages++;
            if (loadedImages === 5) {
              console.log("Timeout reached, setting as loaded");
              setAllImagesLoaded(true);
              setLoadedCount(5);
            }
          }
          resolve();
        }, 3000); // Reduced timeout
      });
    });

    // Wait for all images to preload
    Promise.all(preloadPromises).then(() => {
      console.log("All default stickers preload promises resolved");
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
    <div style={{ opacity: allImagesLoaded && images.length > 0 ? 1 : 0 }}>
      <img
        src={getSrc(chat1)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute top-90 right-1 w-40"
        onLoad={() => handleImageLoad("chat1")}
        onError={(e) => handleImageError("chat1", e)}
        style={{ display: "block" }}
      />
      <img
        src={getSrc(oat1)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute top-40 left-0 w-40"
        onLoad={() => handleImageLoad("oat1")}
        onError={(e) => handleImageError("oat1", e)}
        style={{ display: "block" }}
      />
      <img
        src={getSrc(cake2)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute bottom-8 left-6 w-12"
        onLoad={() => handleImageLoad("cake2")}
        onError={(e) => handleImageError("cake2", e)}
        style={{ display: "block" }}
      />
      <img
        src={getSrc(cake3)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute right-6 bottom-8 w-12"
        onLoad={() => handleImageLoad("cake3")}
        onError={(e) => handleImageError("cake3", e)}
        style={{ display: "block" }}
      />
      <img
        src={getSrc(HBD)}
        alt=""
        crossOrigin="anonymous"
        loading="eager"
        className="absolute right-10 bottom-135 w-60"
        onLoad={() => handleImageLoad("HBD")}
        onError={(e) => handleImageError("HBD", e)}
        style={{ display: "block" }}
      />
    </div>
  );
};
