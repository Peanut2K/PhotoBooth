"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Camera, Minus, Plus, Lock } from "lucide-react";
import { useState } from "react";
import Letter from "./letter";
import Link from "next/link";
import { LoadingProgress } from "./loading-progress";
import Image from "next/image";

interface DrawerButtonProps {
  disabled?: boolean;
}

export const DrawerButton = ({ disabled = false }: DrawerButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleStartLoading = () => {
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  const handlePhotoClick = () => {
    if (isLoadingComplete) {
      window.location.href = "/camera";
    }
  };

  return (
        <Drawer>
        <DrawerTrigger asChild>
          <Button 
            size="lg" 
            className={`text-xl px-8 py-6 transition-all ${
              disabled 
                ? "bg-gray-400 cursor-not-allowed opacity-60" 
                : "bg-vintage-green hover:bg-vintage-green/90"
            }`}
            disabled={disabled}
          >
            {disabled && "Locked"} {disabled && <Lock />} {!disabled && "Enjoyyyy!!!"}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[96vh] bg-[#f7e7cc]">
          <div className="w-full max-w-2xl mx-auto space-y-8 py-8 overflow-y-auto h-full touch-pan-y flex flex-col items-center">
            <div className="mt-[250px]">
            <Letter compact />
            </div>
            
            {!isLoading ? (
              <Button
                onClick={handleStartLoading}
                className="bg-vintage-gold px-8 py-6 text-xl font-bold uppercase"
              >
                Start Loading
              </Button>
            ) : (
              <>
                <LoadingProgress onComplete={handleLoadingComplete} />
                
                <Button
                  onClick={handlePhotoClick}
                  className={`px-8 py-6 text-xl font-bold uppercase transition-all ${
                    isLoadingComplete
                      ? "bg-vintage-gold hover:bg-vintage-gold/90"
                      : "bg-gray-400 cursor-not-allowed opacity-60"
                  }`}
                  disabled={!isLoadingComplete}
                >
                  {isLoadingComplete ? (
                    <>
                      Let&apos;s Take some Photos 😖
                    </>
                  ) : (
                    <>
                      <Lock />
                      Secret
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    )
}

export default DrawerButton