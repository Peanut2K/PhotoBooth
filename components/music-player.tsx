"use client";

import { useState, useRef, useEffect } from "react";
import { SkipBack, Play, Pause, SkipForward } from "lucide-react";
import Image from "next/image";

interface MusicPlayerProps {
  coverImage?: string;
}

export function MusicPlayer({ coverImage }: MusicPlayerProps) {
  // Music Info - แก้ไขข้อมูลเพลงที่นี่
  const musicTitle = "Our Song";
  const musicArtist = "Taylor Swift";
  const audioPath = "/songs/Yew.mp3";

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("canplay", updateDuration);

    // Load audio immediately
    audio.load();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("canplay", updateDuration);
    };
  }, [mounted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const time = parseFloat(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#8AC6D1] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-4 p-4">
          {/* Album Cover - แสดงเฉพาะเมื่อมีรูป */}
          {coverImage && (
            <div className="flex-shrink-0">
              <Image
                src={coverImage}
                alt={musicTitle}
                width={88}
                height={88}
                className="rounded-lg object-cover"
              />
            </div>
          )}

          {/* Music Info and Controls */}
          <div className="flex-1 min-w-0">
            {/* Title and Artist */}
            <div className={`mb-2 ${!coverImage ? 'text-center' : ''}`}>
              <h3 className="text-white text-lg font-semibold truncate">
                {musicTitle}
              </h3>
              <p className="text-white/80 text-sm truncate">{musicArtist}</p>
            </div>

            {/* Time and Progress Bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/90 text-sm font-medium min-w-[35px]">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                step="0.1"
                className="flex-1 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
              <span className="text-white/70 text-sm min-w-[40px] text-right">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.max(
                      0,
                      audioRef.current.currentTime - 10
                    );
                  }
                }}
                className="text-white hover:scale-110 transition-transform"
                aria-label="Previous"
              >
                <SkipBack size={20} fill="white" />
              </button>

              <button
                onClick={togglePlay}
                className="text-white hover:scale-110 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={24} fill="white" />
                ) : (
                  <Play size={24} fill="white" />
                )}
              </button>

              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Math.min(
                      audioRef.current.duration,
                      audioRef.current.currentTime + 10
                    );
                  }
                }}
                className="text-white hover:scale-110 transition-transform"
                aria-label="Next"
              >
                <SkipForward size={20} fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioPath}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}
