"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CarouselControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onGoTo,
}) {
  return (
    <div className="mt-4 flex w-full items-center justify-between px-1">
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => onGoTo(index)}
              animate={{
                width: isActive ? 32 : 8,
                height: 8,
                backgroundColor: isActive
                  ? "rgb(139 92 246)"
                  : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="rounded-full"
              aria-label={`Go to slide ${index + 1}`}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onPrev}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet-400 hover:bg-gray-50 hover:text-violet-500 active:border-violet-400 active:bg-violet-50 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:shadow-none dark:hover:border-violet-500/50 dark:hover:bg-white/10 dark:hover:text-white dark:active:border-violet-500/50 dark:active:bg-violet-500/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </motion.button>

        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-violet-400 hover:bg-gray-50 hover:text-violet-500 active:border-violet-400 active:bg-violet-50 dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:shadow-none dark:hover:border-violet-500/50 dark:hover:bg-white/10 dark:hover:text-white dark:active:border-violet-500/50 dark:active:bg-violet-500/10"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
}
