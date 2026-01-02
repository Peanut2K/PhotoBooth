"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type LetterState = "closed" | "opened" | "pulled";

interface LetterProps {
  message?: string;
  signature?: string;
  compact?: boolean;
}

export default function Letter({
  message = "You're never too old for a little magic. Wishing you a day filled with love, laughter, and unforgettable moments. Happy Birthday!",
  signature = "Oat",
  compact = false,
}: LetterProps) {
  const [state, setState] = useState<LetterState>("closed");

  const handleClick = () => {
    if (state === "closed") {
      setState("opened");
    } else if (state === "opened") {
      setState("pulled");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${compact ? 'min-h-0' : 'min-h-screen'}`}>

      {/* Envelope container - slightly tilted */}
      <div
        className="relative cursor-pointer select-none"
        style={{ transform: "rotate(-3deg)", width: 320, height: 210 }}
        onClick={handleClick}
      >
        {/* ===== LAYER 0: Back of envelope (behind everything) ===== */}
        <svg
          width="320"
          height="210"
          viewBox="0 0 320 210"
          className="absolute inset-0"
          style={{ zIndex: 0 }}
        >
          {/* Rectangle body of envelope only */}
          <rect
            x="2"
            y="2"
            width="316"
            height="206"
            rx="3"
            ry="3"
            fill="#D4CFC8"
            stroke="#4A3728"
            strokeWidth="3"
          />
        </svg>

        {/* ===== LAYER 1: Back flap (opens backward when envelope is opened) ===== */}
        <div
          className="absolute"
          style={{
            zIndex: 1,
            transformOrigin: "top center",
            transform: state !== "closed" ? "rotateX(180deg)" : "rotateX(0deg)",
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          <svg width="320" height="110" viewBox="0 2     320 110" style={{ display: "block" }}>
            {/* Triangle flap - no bottom edge */}
            <polygon
              points="2,0 160,106 318,0"
              fill="#D4CFC8"
              stroke="none"
            />
            {/* Draw only the two side edges */}
            <line x1="2" y1="0" x2="160" y2="106" stroke="#4A3728" strokeWidth="3" />
            <line x1="318" y1="0" x2="160" y2="106" stroke="#4A3728" strokeWidth="3" />
          </svg>
        </div>

        {/* ===== LAYER 2: Letter paper (slides up when pulled) ===== */}
        <div
          className="absolute left-3 right-3 overflow-hidden"
          style={{
            zIndex: 2,
            top: state === "pulled" ? -180 : state === "opened" ? -70 : 200,
            opacity: state === "closed" ? 0 : 1,
            transition: state === "pulled" ? "top 0.3s ease-out" : state === "opened" ? "opacity 0s 0.05s, top 0s 0.05s" : "none",
          }}
        >
          <div
            className="w-full relative overflow-hidden"
            style={{
              backgroundColor: "#FAFAFA",
              border: "2px solid #D0D0D0",
              borderRadius: "4px 4px 0 0",
              height: "280px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* Letter text content */}
            <div className="relative z-10 p-5 pt-6">
              <p
                className="text-gray-700 text-sm leading-relaxed"
                style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
              >
                {message}
              </p>
              <p
                className="text-gray-600 text-sm mt-3 text-right"
                style={{ fontFamily: "Georgia, serif" }}
              >
                —{signature}
              </p>
            </div>
          </div>
        </div>

        {/* ===== LAYER 3: Envelope front (covers bottom part of letter) ===== */}
        <svg
          width="320"
          height="210"
          viewBox="0 0 320 210"
          className="absolute inset-0"
          style={{ zIndex: 3 }}
        >
          {/* Main envelope body */}
          {/* <rect
            x="2"
            y="2"
            width="316"
            height="206"
            rx="3"
            ry="3"
            fill="none"
            stroke="#4A3728"
            strokeWidth="3"
          /> */}

          {/* Left triangle flap */}
          <polygon
            points="2,2 2,208 160,105"
            fill="#D4CFC8"
            stroke="#4A3728"
            strokeWidth="2"
          />

          {/* Right triangle flap */}
          <polygon
            points="318,2 318,208 160,105"
            fill="#D4CFC8"
            stroke="#4A3728"
            strokeWidth="2"
          />

          {/* Bottom triangle flap */}
          <polygon
            points="2,208 318,208 160,105"
            fill="#E0DBD5"
            stroke="#4A3728"
            strokeWidth="2"
          />

          {/* Diagonal lines */}
          <line x1="2" y1="208" x2="160" y2="105" stroke="#4A3728" strokeWidth="2.5" />
          <line x1="318" y1="208" x2="160" y2="105" stroke="#4A3728" strokeWidth="2.5" />
        </svg>

        {/* ===== LAYER 4: Top flap (covers everything when closed) ===== */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            zIndex: state === "closed" ? 10 : 0,
            transformOrigin: "top center",
            transform: state !== "closed" ? "rotateX(180deg)" : "rotateX(0deg)",
            opacity: state === "closed" ? 1 : 0,
          }}
        >
          <svg width="320" height="110" viewBox="0 0 320 110">
            <polygon
              points="2,2 160,108 318,2"
              fill="#E0DBD5"
              stroke="#4A3728"
              strokeWidth="3"
            />
            {/* Top edge line */}
            <line x1="2" y1="2" x2="318" y2="2" stroke="#4A3728" strokeWidth="3" />
          </svg>
        </div>

        {/* Heart seal - always on top */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 15,
          }}
        >
          <Image 
            src="/shared/heartNew.png" 
            alt="Heart seal" 
            width={44} 
            height={40}
            className="drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}