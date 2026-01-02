"use client";
import Letter from '@/components/letter';
import { LoadingProgress } from '@/components/loading-progress';

export default function LetterDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50">
      <Letter />
      <LoadingProgress onComplete={() => console.log("Loading complete")} />
    </div>
  );
}
