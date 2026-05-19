"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CarouselControls from "./CarouselControls";
import CarouselSlide from "./CarouselSlide";

const slides = [
  {
    id: 1,
    badge: "🚀 INNOVATION HUB",
    heading: "Turn Your Wildest Ideas into Next Big Startup",
    subtitle:
      "IdeaVault connects dreamers with doers. Share your concept, get community validation, and refine it into something extraordinary.",
    buttonText: "Explore Ideas",
    buttonHref: "/ideas",
    bgFrom: "from-[#1a1040]",
    bgVia: "via-[#0f1a3d]",
  },
  {
    id: 2,
    badge: "🌱 COMMUNITY DRIVEN",
    heading: "Collaborate, Validate, and Build Together",
    subtitle:
      "Real feedback from real entrepreneurs. Our community helps you stress-test your ideas before you invest time and money.",
    buttonText: "Join the Community",
    buttonHref: "/community",
    bgFrom: "from-[#0a2018]",
    bgVia: "via-[#0d2d1a]",
  },
  {
    id: 3,
    badge: "🔥 TRENDING NOW",
    heading: "Discover What's Hot in the Startup World",
    subtitle:
      "Browse trending ideas across AI, Health, FinTech, and more. Find inspiration or contribute to the ideas reshaping industries.",
    buttonText: "Browse Categories",
    buttonHref: "/ideas?filter=trending",
    bgFrom: "from-[#2a1200]",
    bgVia: "via-[#1f0e00]",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback(
    (index) => {
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex],
  );

  useEffect(() => {
    if (isPaused) {
      return undefined;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 md:px-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <CarouselSlide
            key={slides[currentIndex].id}
            {...slides[currentIndex]}
            isActive={true}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      <CarouselControls
        currentIndex={currentIndex}
        total={slides.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onGoTo={goToSlide}
      />
    </div>
  );
}
