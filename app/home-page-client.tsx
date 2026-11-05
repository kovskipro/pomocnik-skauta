"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { countSkills, type FunctionRecord } from "@/lib/functions";
import { getAllFunctions } from "@/lib/functions";
import { getIconComponent } from "@/lib/icons";
import { NAVBAR_SCROLL_OFFSET_PX, scrollToPosition } from "@/lib/navigation";
import { Progress } from "@/components/ui/progress-loading";

const loadFooterModule = () => import("@/components/footer");
const LazyFooter = lazy(loadFooterModule);

const heroItemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const iconGridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const iconItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const cardGridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function waitForWindowLoad(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();

  return new Promise((resolve) => {
    const handleLoad = () => {
      window.removeEventListener("load", handleLoad);
      resolve();
    };

    window.addEventListener("load", handleLoad);
  });
}

function preloadImage(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  return new Promise((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = src;
  });
}

async function waitForCriticalAssets(): Promise<void> {
  const tasks: Promise<unknown>[] = [
    waitForWindowLoad(),
    preloadImage("/croix-agse.png"),
    loadFooterModule(),
  ];

  const fontsReady =
    typeof document !== "undefined" && "fonts" in document
      ? document.fonts?.ready
      : undefined;

  if (fontsReady) {
    tasks.push(fontsReady.catch(() => undefined));
  }

  await Promise.all(tasks);
}

type HomePageClientProps = {
  initialFunctions: FunctionRecord[];
};

export default function HomePageClient({
  initialFunctions,
}: HomePageClientProps) {
  const hasInitialFunctions =
    Array.isArray(initialFunctions) && initialFunctions.length > 0;
  const [functions, setFunctions] = useState<FunctionRecord[]>(
    hasInitialFunctions ? initialFunctions : [],
  );
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);
  const hasFetchedFallback = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const shouldAnimateProgress = process.env.NODE_ENV !== "test";
    const shouldWaitForAssets = process.env.NODE_ENV !== "test";
    const minLoaderMs = shouldAnimateProgress ? 700 : 0;
    const startedAt = Date.now();
    const shouldFetchFallback = !hasInitialFunctions;

    if (shouldAnimateProgress) {
      setLoadingProgress(10);
    }

    const progressInterval = shouldAnimateProgress
      ? setInterval(() => {
          if (!isMounted) return;
          setLoadingProgress((prev) => {
            if (prev >= 90) return prev;
            return Math.min(90, prev + Math.random() * 15);
          });
        }, 100)
      : undefined;

    async function fetchFallbackFunctions() {
      if (!shouldFetchFallback || hasFetchedFallback.current) {
        return;
      }

      hasFetchedFallback.current = true;

      try {
        const data = await getAllFunctions();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setFunctions(data);
        }
      } catch (error) {
        console.error("Error loading functions:", error);
      }
    }

    async function finalizeLoading() {
      try {
        const tasks: Promise<unknown>[] = [];

        if (isMounted && shouldWaitForAssets) {
          tasks.push(waitForCriticalAssets());
        }

        if (shouldFetchFallback) {
          tasks.push(fetchFallbackFunctions());
        }

        if (tasks.length > 0) {
          await Promise.all(tasks);
        }
      } finally {
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, minLoaderMs - elapsed);

        if (isMounted) {
          setLoadingProgress((prev) => Math.max(prev, 95));
        }

        if (remaining > 0) {
          await new Promise((resolve) => setTimeout(resolve, remaining));
        }

        if (isMounted) {
          setLoadingProgress(100);
          setLoading(false);
        }

        if (progressInterval) {
          clearInterval(progressInterval);
        }
      }
    }

    finalizeLoading();

    return () => {
      isMounted = false;
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash === "#functions-section") {
      setTimeout(() => {
        const functionsSection = document.getElementById("functions-section");
        if (functionsSection) {
          const elementPosition =
            functionsSection.offsetTop - NAVBAR_SCROLL_OFFSET_PX;
          scrollToPosition(elementPosition);
        }
      }, 100);
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-black">
      {loading && (
        <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <div className="bg-neutral-950 rounded-3xl p-8 text-center">
              <Image
                src="/croix-agse.png"
                alt="Logo Skautów Europy"
                width={64}
                height={64}
                className="h-16 w-16 mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-white mb-2">
                Pomocnik Skauta
              </h2>
              <p className="text-neutral-400 mb-6">Ładowanie funkcji...</p>
              <div className="w-full max-w-sm mx-auto">
                <Progress
                  value={loadingProgress}
                  size="md"
                  color="success"
                  showValueLabel={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <div className="max-w-6xl mx-auto px-4">
        <div className="relative flex min-h-screen items-center justify-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={heroItemVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <Image
                  src="/croix-agse.png"
                  alt="Logo Skautów Europy"
                  width={32}
                  height={32}
                  className="h-8 w-8 select-none"
                  draggable={false}
                />
                <p className="text-2xl text-neutral-400">Pomocnik Skauta</p>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight lg:leading-[1.05] font-bold text-white mb-4">
                Zostań mistrzem
                <br className="hidden sm:block" />w każdej funkcji.
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl lg:max-w-none mb-8">
                Wybierz funkcję, aby poznać wymagania i umiejętności potrzebne
                do jej pełnienia w zastępie
              </p>
            </motion.div>

            <motion.div
              className="hidden md:flex justify-center lg:justify-end"
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              variants={heroItemVariants}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <motion.div
                className="flex flex-wrap justify-center gap-5 max-w-sm"
                variants={iconGridVariants}
              >
                {functions.length > 0 ? (
                  functions.map((func) => {
                    const IconComponent = getIconComponent(
                      func.icon || undefined,
                    );
                    const colorBackground =
                      func.color_background || "bg-neutral-800";
                    const colorText = func.color_text || "text-neutral-300";
                    const isTooltipActive = activeTooltipId === func.id;
                    return (
                      <motion.div
                        key={func.id}
                        variants={iconItemVariants}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <Link
                          href={`/${func.id}`}
                          className="relative group block"
                          aria-label={`Przejdź do funkcji ${func.name}`}
                          onPointerDown={() => setActiveTooltipId(func.id)}
                          onPointerUp={() => setActiveTooltipId(null)}
                          onPointerLeave={() => setActiveTooltipId(null)}
                          onBlur={() => setActiveTooltipId(null)}
                        >
                          <div className="relative">
                            <div
                              className={`p-5 rounded-full ${colorBackground} hover:opacity-80 transition-opacity cursor-pointer select-none`}
                            >
                              <IconComponent
                                className={`h-10 w-10 ${colorText} select-none`}
                                aria-hidden="true"
                              />
                            </div>
                            <div
                              className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-900 rounded-full text-white text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none z-10 ${
                                isTooltipActive ? "opacity-100" : ""
                              }`}
                              aria-hidden="true"
                            >
                              {func.name}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 px-6 py-5 text-center">
                    <p className="text-base text-neutral-300 font-medium">
                      Brak funkcji do wyświetlenia.
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      Spróbuj odświeżyć stronę za chwilę.
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div id="functions-section" className="py-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            variants={cardGridVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {functions.length > 0 ? (
              functions.map((func) => {
                const IconComponent = getIconComponent(func.icon || undefined);
                const colorBackground =
                  func.color_background || "bg-neutral-800";
                const colorText = func.color_text || "text-neutral-300";
                const skillCount = countSkills(func.skills);
                return (
                  <motion.div
                    key={func.id}
                    variants={cardItemVariants}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      href={`/${func.id}`}
                      className="block h-full rounded-[29.095px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      aria-label={`Przejdź do funkcji ${func.name}`}
                      title={`Pomocnik Skauta ${func.name}`}
                    >
                      <Card
                        className="bg-neutral-950 border-0 hover:bg-neutral-900 transition-colors duration-300 cursor-pointer group h-full flex flex-col"
                        style={{ borderRadius: "29.095px" }}
                      >
                        <CardHeader className="pb-4 flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <div className={`p-3 rounded-full ${colorBackground}`}>
                              <IconComponent className={`h-6 w-6 ${colorText}`} />
                            </div>
                            <Badge
                              variant="secondary"
                              className="text-neutral-300 bg-neutral-900 border-0"
                            >
                              {skillCount} umiejętności
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-white">
                            {func.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col flex-grow">
                          <CardDescription className="text-neutral-400 flex-grow">
                            {func.description}
                          </CardDescription>
                          <div className="rounded-2xl text-sm font-medium px-4 py-1.5 h-auto mt-4 w-full bg-neutral-800 text-white inline-flex items-center justify-center">
                            Wybierz <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full">
                <div className="rounded-3xl border border-neutral-900 bg-neutral-950 px-8 py-10 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    Brak funkcji do wyświetlenia.
                  </h3>
                  <p className="mt-2 text-sm text-neutral-400">
                    Nie udało się pobrać danych. Spróbuj odświeżyć stronę.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="bg-black border-t border-neutral-800 mt-16" aria-hidden="true">
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 h-32 rounded-2xl bg-neutral-900/70 animate-pulse" />
                <div className="h-32 rounded-2xl bg-neutral-900/70 animate-pulse" />
                <div className="h-32 rounded-2xl bg-neutral-900/70 animate-pulse" />
              </div>
            </div>
          </div>
        }
      >
        <LazyFooter functions={functions} />
      </Suspense>
    </div>
  );
}
