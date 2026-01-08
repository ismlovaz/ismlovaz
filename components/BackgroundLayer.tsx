"use client";
import React from 'react';

export const BackgroundLayer = () => {
  // Pure CSS transition. No state needed as 'bg-background' responds to global 'dark' class.
  return (
    <div
      className="fixed inset-0 h-screen w-full -z-50 bg-background transition-colors duration-[1250ms] ease-in-out"
    />
  );
};
