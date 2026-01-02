"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface MorphingTextProps {
  text: string[];
  className?: string;
  loop?: boolean;
  holdDelay?: number;
}

export function MorphingText({
  text,
  className = "",
  loop = true,
  holdDelay = 2000,
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (text.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= text.length) {
          if (loop) {
            return 0;
          } else {
            clearInterval(interval);
            return prevIndex;
          }
        }
        return nextIndex;
      });
    }, holdDelay);

    return () => clearInterval(interval);
  }, [text.length, holdDelay, loop]);

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {text[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
