"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/providers/filters-store-provider";
import { useImagesStore } from "@/providers/images-store-provider";
import Image from "next/image";
import Link from "next/link";
import { Filters } from "./filters";
import { toPng } from 'html-to-image';
import { Camera, Download } from "lucide-react";
import { Preview } from "./preview";
import { AxolotlStickers } from "./axolotl-stickers";
import { CatStickers } from "./cat-stickers";
import { PandaStickers } from "./panda-stickers";
import { DefaultStickers } from "./default-stickers";

export const Editor = () => {
  const { photostrip, background, filter, dateEnabled, stickers } =
    useFiltersStore((store) => store);
  const { images } = useImagesStore((store) => store);
  const elementRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!elementRef.current) return;

    // Add loading indicator
    const loadingIndicator = document.createElement("div");
    loadingIndicator.textContent = "Generating image...";
    loadingIndicator.style.position = "fixed";
    loadingIndicator.style.top = "50%";
    loadingIndicator.style.left = "50%";
    loadingIndicator.style.transform = "translate(-50%, -50%)";
    loadingIndicator.style.padding = "10px";
    loadingIndicator.style.backgroundColor = "rgba(0,0,0,0.7)";
    loadingIndicator.style.color = "white";
    loadingIndicator.style.borderRadius = "5px";
    loadingIndicator.style.zIndex = "9999";
    document.body.appendChild(loadingIndicator);

    try {
      // Make sure all fonts are loaded
      await document.fonts.ready;

      // Make sure all images are loaded
      const images = elementRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve; // Continue even if image fails
            // Set a timeout to resolve after 3 seconds regardless
            setTimeout(resolve, 3000);
          });
        }),
      );

      const scale = 2; // Double the size

      // Create options object
      const options = {
        height: elementRef.current.offsetHeight * scale,
        width: elementRef.current.offsetWidth * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${elementRef.current.offsetWidth}px`,
          height: `${elementRef.current.offsetHeight}px`,
        },
      };

      // Race the actual operation against the timeout
      const dataUrl = await toPng(elementRef.current!, {
  cacheBust: true,
  backgroundColor: background,
  pixelRatio: 2,
});
      // Check if we got a valid data URL
      if (
        !dataUrl ||
        typeof dataUrl !== "string" ||
        !dataUrl.startsWith("data:")
      ) {
        throw new Error("Invalid data URL returned");
      }

      // Create download link
      const link = document.createElement("a");
      link.download = "Happy-Birthday!!!.png";
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("Image download initiated successfully");
    } catch (error) {
      console.error("Error generating image:", error);
      alert(
        "Failed to generate image. Please refresh your page or use a different browser.",
      );
    } finally {
      // Remove loading indicator
      document.body.removeChild(loadingIndicator);
    }
  };

  const getInsetShadow = (backgroundColor: string) => {
    return `inset 0px 0px 15px 0px ${backgroundColor}`;
  };

  if (images.length === 0) {
    return (
      <div className="space-y-3 rounded-xl border border-black p-5">
        <p className="md:text-2xl">Take a picture first!</p>
        <Button asChild className="w-full md:text-xl">
          <Link href="/camera">Camera</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className={cn("order-2 self-center md:order-1 md:-rotate-2")}>
        <div
          ref={elementRef}
          className="relative mx-auto w-fit p-6"
          style={{ backgroundColor: background }}
        >
          <div
            className="grid gap-4 rounded p-4"
            style={{
              backgroundColor: photostrip,
              boxShadow: getInsetShadow(background),
            }}
          >
            {images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative h-[180px] w-[240px]">
                <Image
                  src={image}
                  fill
                  alt=""
                  className={cn(
                    "absolute mx-auto h-full w-full rounded object-cover",
                    filter,
                  )}
                />
              </div>
            ))}
            {dateEnabled && (
              <p className="font-believe-heart bg-white text-center">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
          {stickers === "axolotl" && <AxolotlStickers />}
          {stickers === "cat" && <CatStickers />}
          {stickers === "panda" && <PandaStickers />}
          {stickers === null && <DefaultStickers />}
        </div>
      </div>
      <Filters />
      <div className="order-3 flex flex-col gap-3 self-center">
        <Preview
          background={background}
          filter={filter}
          getInsetShadow={getInsetShadow}
          images={images}
          photostrip={photostrip}
          dateEnabled={dateEnabled}
          stickers={stickers}
        />

        <Button
          onClick={downloadImage}
          className="bg-vintage-blue px-8 py-6 text-xl font-bold"
        >
          <Download /> Download Photostrip
        </Button>
        <Button
          asChild
          variant="destructive"
          className="px-8 py-6 text-xl font-bold"
        >
          <Link href="/camera">
            <Camera /> Retake Photo
          </Link>
        </Button>
      </div>
    </div>
  );
};
