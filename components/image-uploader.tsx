"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { X, Send, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui/card";
import { useImagesStore } from "@/providers/images-store-provider";
import { useRouter } from "next/navigation";

export default function ImageUploader() {
  const router = useRouter();
  const { addImages } = useImagesStore((store) => store);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create an array of refs for each file input
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  // Clean up object URLs when component unmounts or images change
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) return;

    // Create a new image object
    const newImage = {
      file,
      preview: URL.createObjectURL(file),
    };

    // Update the images array
    setImages((prev) => {
      const newImages = [...prev];

      // If we're replacing an existing image, revoke its URL
      if (index < newImages.length) {
        URL.revokeObjectURL(newImages[index].preview);
        newImages[index] = newImage;
      } else {
        // Otherwise add to the end
        newImages.push(newImage);
      }

      return newImages.slice(0, 3); // Ensure max 3 images
    });

    // Reset the file input
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the box click

    setImages((prev) => {
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setIsDragging(index);
  };

  const handleDragLeave = () => {
    setIsDragging(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setIsDragging(null);

    if (e.dataTransfer.files?.length) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith("image/")) return;

      // Create a new image object
      const newImage = {
        file,
        preview: URL.createObjectURL(file),
      };

      // Update the images array
      setImages((prev) => {
        const newImages = [...prev];

        // If we're replacing an existing image, revoke its URL
        if (index < newImages.length) {
          URL.revokeObjectURL(newImages[index].preview);
          newImages[index] = newImage;
        } else {
          // Otherwise add to the end
          newImages.push(newImage);
        }

        return newImages.slice(0, 3); // Ensure max 3 images
      });
    }
  };

  const handleBoxClick = (index: number) => {
    // Trigger file input click for this specific box
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]?.click();
    }
  };

  // Function to convert a File to a data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to data URL"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;

    try {
      setIsSubmitting(true);

      // Convert all files to data URLs
      const dataUrls = await Promise.all(
        images.map((image) => fileToDataUrl(image.file)),
      );

      // Pass the data URLs to the onSubmit callback
      addImages(dataUrls);

      // Optional: Clear images after successful submission
      // images.forEach(image => URL.revokeObjectURL(image.preview))
      // setImages([])

      // Redirect to the edit page
      router.push("/edit");
    } catch (error) {
      console.error("Error converting or submitting images:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full p-4">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => {
          const image = images[index];
          const isRequired = index === 0 && images.length === 0;

          return (
            <Card
              key={index}
              className={`relative flex aspect-square w-[290px] items-center justify-center border-2 bg-[#F6F0F0] ${isDragging === index ? "border-primary border-dashed" : "border-border"} ${isRequired ? "border-primary/50" : ""} hover:border-primary/70 cursor-pointer overflow-hidden rounded-lg transition-all hover:shadow-sm`}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onClick={() => handleBoxClick(index)}
            >
              {image ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.preview || "/placeholder.svg"}
                    alt={`Uploaded image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                    onClick={(e) => removeImage(index, e)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </>
              ) : (
                <div className="text-muted-foreground group flex flex-col items-center justify-center p-4">
                  <ImageIcon className="group-hover:text-primary mb-2 h-10 w-10 transition-colors" />
                </div>
              )}
              <input
                type="file"
                ref={(el) => {
                  fileInputRefs.current[index] = el;
                }}
                onChange={(e) => handleFileChange(e, index)}
                accept="image/*"
                className="hidden"
              />
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={images.length === 0 || isSubmitting}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit Images"}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          {images.length === 0
            ? "Upload at least 1 image to submit"
            : `${images.length} of 3 images uploaded (ready to submit)`}
        </p>
      </div>
    </div>
  );
}
