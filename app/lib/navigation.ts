"use client";

export const navigateTo = (path: string) => {
  // For Next.js with standard routing (not static export)
  window.location.href = path;
};
