"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function CarouselSlide({
  badge,
  heading,
  subtitle,
  buttonText,
  buttonHref,
  bgFrom,
  bgVia,
  isActive,
  direction,
}) {
  return (
    <div
      className={[
        "relative h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br to-[#0B0B12] md:h-[460px]",
        bgFrom,
        bgVia,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute right-[-100px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-white/5 opacity-20 blur-3xl" />

      <div className="relative h-full p-10 md:p-16">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key={heading}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-2xl"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-sm">
                {badge}
              </div>

              <h2 className="mb-4 max-w-xl font-display text-3xl font-bold leading-tight text-white md:text-5xl">
                {heading}
              </h2>

              <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
                {subtitle}
              </p>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={buttonHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-600 hover:to-purple-700"
                >
                  {buttonText}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
