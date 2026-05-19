"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] text-[var(--nav-foreground-strong)] shadow-[0_16px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--nav-border-strong)] hover:bg-[var(--nav-pill)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {isDark ? (
            <SunMedium className="h-5 w-5" strokeWidth={1.9} />
          ) : (
            <Moon className="h-5 w-5" strokeWidth={1.9} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
