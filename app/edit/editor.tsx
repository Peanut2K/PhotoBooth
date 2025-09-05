"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFiltersStore } from "@/providers/filters-store-provider";
import { useImagesStore } from "@/providers/images-store-provider";
import Link from "next/link";
import { Filters } from "./filters";
import { toPng } from "html-to-image";
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
    if (!elementRef.current) {
      console.error("Element ref is not available");
      return;
    }
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    try {
      await document.fonts.ready;
      const images = elementRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(async (img) => {
          if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
          if (!img.crossOrigin) img.crossOrigin = "anonymous";
          return new Promise<void>((resolve) => {
            const handleLoad = () => setTimeout(resolve, 100);
            img.onload = handleLoad;
            img.onerror = () => resolve();
            if (img.complete && img.naturalHeight !== 0) handleLoad();
            setTimeout(resolve, 2000);
          });
        }),
      );
      if (isMobile) {
        elementRef.current.style.transform = "scale(1.001)";
        void elementRef.current.offsetHeight;
        elementRef.current.style.transform = "";
        await new Promise((resolve) => setTimeout(resolve, 1200));
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
      if (isMobile) {
        const stickersEl = elementRef.current.querySelector('[style*="opacity"]');
        let stickerAttempts = 0;
        while (
          stickersEl &&
          window.getComputedStyle(stickersEl).opacity !== "1" &&
          stickerAttempts < 10
        ) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          stickerAttempts++;
        }
      }
      if (isMobile) {
        elementRef.current.style.transform = "scale(1.0001)";
        void elementRef.current.offsetHeight;
        elementRef.current.style.transform = "";
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      const options = {
        cacheBust: true,
        backgroundColor: background,
        pixelRatio: isMobile ? 1.5 : 2,
        quality: 0.95,
        useCORS: true,
        allowTaint: false,
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
        style: {
          visibility: "visible",
          position: "relative",
          transform: "none",
        },
      };
      const dataUrl = await toPng(elementRef.current, options);
      const link = document.createElement("a");
      link.download = "Happy-Birthday!!!.png";
      link.href = dataUrl;
      if (isMobile) {
        try {
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(
              `<img src="${dataUrl}" style="max-width:100%;height:auto;" />`,
            );
            newWindow.document.title = "Long press to save image";
          } else {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      alert("Failed to generate image. Please try again.");
      console.error("Error generating image:", e);
    }
  };

  const getInsetShadow = (backgroundColor: string) => {
    return `0px 0px 10px 0px ${backgroundColor}`;
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

  // Safety checks (must be after all hooks)
  if (!photostrip || !background || !filter || images === undefined) {
    console.warn("Store values not properly initialized:", {
      photostrip,
      background,
      filter,
      images,
    });

    return (
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <p className="text-yellow-800">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className={cn("order-2 self-center md:order-1 md:-rotate-2")}>
        <div
          key={`${background}-${photostrip}`}
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
              <div
                key={index}
                className="relative h-[180px] w-[240px] overflow-hidden rounded"
              >
                {/* Using regular img tag for better html-to-image compatibility */}
                <img
                  src={image}
                  alt=""
                  className={cn("h-full w-full object-cover", filter)}
                  crossOrigin="anonymous"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    display: "block",
                  }}
                  onLoad={() => console.log(`Image ${index + 1} loaded`)}
                  onError={(e) => {
                    console.error(`Image ${index + 1} failed to load:`, e);
                    // Try to fix CORS issues by removing crossOrigin
                    e.currentTarget.crossOrigin = "";
                  }}
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
