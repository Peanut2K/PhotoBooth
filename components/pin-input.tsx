"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";

interface PinInputProps {
  onCorrect: () => void;
  correctPin?: string;
}

export function PinInput({ onCorrect, correctPin = "0124" }: PinInputProps) {
  const [pins, setPins] = useState(["", "", "", ""]);
  const [showHint, setShowHint] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newPins = [...pins];
    newPins[index] = value;
    setPins(newPins);

    // Auto focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Check if all pins are filled
    if (newPins.every((pin) => pin !== "")) {
      const enteredPin = newPins.join("");
      if (enteredPin === correctPin) {
        onCorrect();
      } else {
        // Wrong pin - show alert and clear
        alert("คือ 2 ปีแล้วยังจำวันเกิดกันไม่ได้ ก้อาจจะแอบเศร้าเล็กๆ");
        setTimeout(() => {
          setPins(["", "", "", ""]);
          inputRefs[0].current?.focus();
        }, 100);
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newPins = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
      setPins(newPins);
      
      const enteredPin = newPins.join("");
      if (enteredPin === correctPin && newPins.every((pin) => pin !== "")) {
        onCorrect();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-2 justify-center">
        {pins.map((pin, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={pin}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-800 rounded-full bg-[#f7e7cc] focus:outline-none focus:ring-2 focus:ring-vintage-gold transition-all"
          />
        ))}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHint(!showHint)}
        className="rounded-full px-4 py-2 text-sm font-bold bg-[#f7e7cc] border-gray-800"
      >
        😏 Hint
      </Button>

      {showHint && (
        <p className="text-sm text-gray-600 text-center animate-in fade-in">
          2 ตัวแรกเดือนเกิด 2 ตัวหลังวันเกิดโอ๊ตฮับพรี่ๆ
        </p>
      )}
    </div>
  );
}
