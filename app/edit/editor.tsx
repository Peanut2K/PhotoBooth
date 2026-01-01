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
import { MiniHeartSticker } from "./MiniHeart";
import { MotherFuckerSticker } from "./MotherFucker";
import { LoveSticker } from "./Love";
import { FeelGoodSticker } from "./FeelGood";

export const Editor = () => {
  const { photostrip, background, filter, dateEnabled, stickers } =
    useFiltersStore((store) => store);
  const { images } = useImagesStore((store) => store);
  const elementRef = useRef<HTMLDivElement>(null);

  // Safety checks
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

  const downloadImage = async () => {
    if (!elementRef.current) {
      console.error("Element ref is not available");
      return;
    }

    // Check if default stickers are visible and wait for them to load
    const defaultStickersElement =
      elementRef.current.querySelector('[style*="opacity"]');
    if (defaultStickersElement && stickers === null) {
      const opacity = window.getComputedStyle(defaultStickersElement).opacity;
      if (opacity === "0") {
        console.log("Waiting for default stickers to load...");

        // Wait for stickers to load with timeout
        let attempts = 0;
        const maxAttempts = 30; // 15 seconds max wait

        while (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          const currentOpacity = window.getComputedStyle(
            defaultStickersElement,
          ).opacity;
          if (currentOpacity === "1") {
            console.log("Default stickers loaded successfully!");
            break;
          }
          attempts++;
        }

        if (attempts >= maxAttempts) {
          console.warn(
            "Timeout waiting for default stickers to load, proceeding anyway...",
          );
        }
      }
    }

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

    try {
      document.body.appendChild(loadingIndicator);
    } catch (error) {
      console.error("Failed to add loading indicator:", error);
    }

    // Mobile-specific fixes
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    // Variables for style restoration
    let originalPhotoStripStyle: string | null = null;
    let photoStripElement: HTMLElement | null = null;

    try {
      // Make sure all fonts are loaded
      await document.fonts.ready;

      // Force all images to load completely and handle cross-origin issues
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

      // Temporarily modify styles for better mobile rendering - improved
      photoStripElement = elementRef.current.querySelector(
        '[style*="boxShadow"]',
      ) as HTMLElement;

      if (isMobile && photoStripElement) {
        originalPhotoStripStyle = photoStripElement.style.boxShadow;
        // Instead of removing shadow completely, just reduce it
        photoStripElement.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        // Remove the border that was causing the shadow box effect
        // photoStripElement.style.border = `3px solid ${background}`;
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

      // Reduced mobile delay since loading is now faster
      if (isMobile) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Try multiple times on mobile if needed
      let dataUrl;
      let attempts = 0;
      const maxAttempts = isMobile ? 3 : 1;

      while (attempts < maxAttempts) {
        try {
          dataUrl = await toPng(elementRef.current, options);

          // Check if we got a valid data URL
          if (
            dataUrl &&
            typeof dataUrl === "string" &&
            dataUrl.startsWith("data:")
          ) {
            break;
          }
          throw new Error("Invalid data URL returned");
        } catch (attemptError) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw attemptError;
          }
          // Wait before retry
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }

      // Create download link
      const link = document.createElement("a");
      link.download = "Happy-Birthday!!!.png";
      link.href = dataUrl ? dataUrl : "";

      // Mobile download handling
      if (isMobile) {
        // For mobile, try to open in new window first
        try {
          const newWindow = window.open();
          if (newWindow) {
            newWindow.document.write(
              `<img src="${dataUrl}" style="max-width:100%;height:auto;" />`,
            );
            newWindow.document.title = "Long press to save image";
          } else {
            // Fallback to regular download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } catch (popupError) {
          // Final fallback
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.error("Popup blocked, fallback to download", popupError);
        }
      } else {
        // Desktop download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      console.log("Image download initiated successfully");

      // Restore original styles
      if (isMobile && photoStripElement && originalPhotoStripStyle !== null) {
        photoStripElement.style.boxShadow = originalPhotoStripStyle;
        photoStripElement.style.border = "none";
      }
    } catch (error) {
      console.error("Error generating image:", error);

      // More specific error message
      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const errorMessage = isMobile
        ? "Failed to generate image on mobile. Try taking a screenshot instead, or use a desktop browser for better results."
        : "Failed to generate image. Please refresh your page or try a different browser.";

      alert(errorMessage);

      // Restore original styles in case of error
      if (isMobile && photoStripElement && originalPhotoStripStyle !== null) {
        photoStripElement.style.boxShadow = originalPhotoStripStyle;
        photoStripElement.style.border = "none";
      }
    } finally {
      // Remove loading indicator
      if (document.body.contains(loadingIndicator)) {
        document.body.removeChild(loadingIndicator);
      }
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
          {stickers === "axolotl" && <LoveSticker />}
          {stickers === "feelgood" && <FeelGoodSticker />}
          {stickers === "cat" && <MiniHeartSticker />}
          {stickers === "panda" && <MotherFuckerSticker />}
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
