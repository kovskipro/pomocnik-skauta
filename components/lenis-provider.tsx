"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

type LenisProviderProps = {
  children: ReactNode;
};

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const lenis = new Lenis({
      smoothWheel: !prefersReducedMotion.matches,
      lerp: 0.08,
    });

    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
