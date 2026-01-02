"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MorphingText } from "@/components/animate-ui/primitives/texts/morphing";
import Image from "next/image";

interface LoadingProgressProps {
  onComplete: () => void;
}

const messages = [
  "Happy Birthday !!!",
  "In Progress...",
  "Best Wishes",
  "Capture your smile",
  "In Progress...",
  "Done!"
];

export function LoadingProgress({ onComplete }: LoadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation - 15 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + (100 / 150); // 150 steps for smooth animation (15 seconds / 0.1 second intervals)
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 py-8">
      {/* Morphing Text */}
      <div className="text-center h-20 flex items-center justify-center overflow-hidden relative">
        <MorphingText
          className="text-3xl font-bold text-gray-800"
          text={messages}
          loop={false}
          holdDelay={3000}
        />
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-lg border-2 border-gray-800">
          <motion.div
            className="h-full bg-gray-800 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
        <div className="text-center">
          <motion.span
            key={Math.floor(progress)}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            className="text-gray-800 font-bold text-xl"
          >
            {Math.floor(progress)}%
          </motion.span>
        </div>
      </div>

      {/* Loading Animation or Check Icon */}
      <div className="flex justify-center">
        {progress >= 100 ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Image 
              src="/shared/Check.png" 
              alt="Complete" 
              width={48} 
              height={48}
            />
          </motion.div>
        ) : (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-vintage-gold rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
