export const NAVBAR_HEIGHT_PX = 80
export const NAVBAR_SCROLL_OFFSET_PX = NAVBAR_HEIGHT_PX + 10

type LenisScrollTarget = number | string | HTMLElement
type LenisInstance = {
  scrollTo: (target: LenisScrollTarget, options?: { immediate?: boolean }) => void
}

export function getScrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") {
    return "auto"
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  return prefersReducedMotion ? "auto" : "smooth"
}

export function scrollToPosition(top: number) {
  if (typeof window === "undefined") {
    return
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches

  const lenis = (window as typeof window & { __lenis?: LenisInstance }).__lenis

  if (lenis) {
    lenis.scrollTo(top, { immediate: prefersReducedMotion })
    return
  }

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  })
}
