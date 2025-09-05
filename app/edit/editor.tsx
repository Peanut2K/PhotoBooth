"use client";

import { useRef, useState, useEffect } from "react";
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
  const [readyImage, setReadyImage] = useState<string | null>(null);
  const [, setIsGenerating] = useState(false);

  // Helper to generate image in background
  const generateImage = async () => {
    if (!elementRef.current) return;
    setIsGenerating(true);
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
          // Set crossOrigin for images
          if (!img.crossOrigin) {
            img.crossOrigin = "anonymous";
          }

          return new Promise<void>((resolve) => {
            const handleLoad = () => {
              // Shorter delay for PNG files since preloading is better
              const isPng = img.src.toLowerCase().includes(".png");
              const delay = isPng ? 100 : 50;
              setTimeout(resolve, delay);
            };

            img.onload = handleLoad;
            img.onerror = () => {
              console.warn("Image failed to load:", img.src);
              resolve();
            };

            // If image is already loaded but we missed the event
            if (img.complete && img.naturalHeight !== 0) {
              handleLoad();
            }

            // Shorter timeout for PNG files since preloading is improved
            const isPng = img.src.toLowerCase().includes(".png");
            const timeout = isPng ? 3000 : 2000;
            setTimeout(resolve, timeout);
          });
        }),
      );

      // Additional delay specifically for PNG stickers - reduced since we improved preloading
      const hasPngStickers = Array.from(images).some((img) =>
        img.src.toLowerCase().includes(".png"),
      );

      if (hasPngStickers) {
        console.log("PNG stickers detected, adding minimal loading time...");
        // Reduced delay since preloading is now better
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Force a repaint/reflow
        elementRef.current.style.transform = "translateZ(0)";
        void elementRef.current.offsetHeight; // Trigger reflow
        elementRef.current.style.transform = "";
      }

      // Extra delay for mobile to ensure stickers are painted (fixes black/empty image on first try)
      if (isMobile) {
        // Force a reflow/repaint
        elementRef.current.style.transform = "scale(1.001)";
        void elementRef.current.offsetHeight;
        elementRef.current.style.transform = "";
        // Wait even longer to ensure rendering is complete
        await new Promise((resolve) => setTimeout(resolve, 1200));
        // Force a full repaint using requestAnimationFrame
        await new Promise((resolve) => requestAnimationFrame(resolve));
        // Wait a bit more
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Wait for stickers to be visible (opacity 1)
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

      // Force another reflow/repaint and longer delay right before generating the image (mobile only)
      if (isMobile) {
        elementRef.current.style.transform = "scale(1.0001)";
        void elementRef.current.offsetHeight;
        elementRef.current.style.transform = "";
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      const options = {
        cacheBust: true,
        backgroundColor: background,
        pixelRatio: isMobile ? 1.5 : 2, // Slightly lower pixel ratio on mobile
        quality: 0.95,
        // Mobile-specific options
        useCORS: true,
        allowTaint: false,
        // Add scaling for better mobile performance
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
        style: {
          // Force visibility and positioning
          visibility: "visible",
          position: "relative",
          // Ensure transforms don't interfere
          transform: "none",
        },
      };

      const dataUrl = await toPng(elementRef.current, options);
      setReadyImage(dataUrl);
    } catch (e) {
      setReadyImage(null);
      console.error("Error generating image:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate image when dependencies change
  useEffect(() => {
    if (images.length > 0) {
      generateImage();
    } else {
      setReadyImage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photostrip, background, filter, dateEnabled, stickers, images]);

  const downloadImage = async () => {
    if (!readyImage) {
      alert("Image is not ready yet. Please wait a moment and try again.");
      return;
    }
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const link = document.createElement("a");
    link.download = "Happy-Birthday!!!.png";
    link.href = readyImage;
    if (isMobile) {
      try {
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(
            `<img src="${readyImage}" style="max-width:100%;height:auto;" />`,
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
  };

  const getInsetShadow = (backgroundColor: string) => {
    // Use a simpler shadow for better mobile compatibility
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
