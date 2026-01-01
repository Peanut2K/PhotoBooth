"use client";

import dynamic from "next/dynamic";

const MusicPlayer = dynamic(
  () => import("@/components/music-player").then((mod) => ({ default: mod.MusicPlayer })),
  { ssr: false }
);

export function MusicPlayerWrapper() {
  return <MusicPlayer />;
}
