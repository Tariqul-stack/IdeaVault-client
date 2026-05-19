"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import ThemeToggle from "../theme/ThemeToggle";

function AuthLinks({ mobile = false, onNavigate }) {
  const pathname = usePathname();

  const loginActive = pathname === "/login";
  const registerActive = pathname === "/register";

  return (
    <div
      className={
        mobile
          ? "flex flex-col gap-3 pt-3"
          : "hidden items-center gap-3 lg:flex"
      }
    >
      <ThemeToggle />

      <Link
        href="/login"
        onClick={onNavigate}
        className={[
          "inline-flex items-center justify-center rounded-2xl border px-5 py-3 text-sm font-semibold transition-all duration-300",
          loginActive
            ? "border-[var(--nav-border-strong)] bg-[var(--nav-pill-active)] text-[var(--nav-foreground-strong)] shadow-[0_12px_30px_rgba(124,92,255,0.16)]"
            : "border-[var(--nav-border)] bg-[var(--nav-surface-soft)] text-[var(--nav-foreground-strong)] hover:-translate-y-0.5 hover:border-[var(--nav-border-strong)] hover:bg-[var(--nav-pill)]",
        ].join(" ")}
      >
        Login
      </Link>

      <Link
        href="/register"
        onClick={onNavigate}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(112,86,255,0.48)]",
          registerActive
            ? "bg-[linear-gradient(135deg,#8a6bff_0%,#6e56ff_100%)]"
            : "bg-[linear-gradient(135deg,#7f67ff_0%,#6a4bff_100%)]",
        ].join(" ")}
      >
        <span>Register</span>
        <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
      </Link>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[28px] border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-2xl pr-3 transition-transform duration-300 hover:scale-[1.01]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] text-base font-black tracking-[0.18em] text-white shadow-[0_16px_28px_rgba(110,86,255,0.4)]">
                IV
              </div>
              <div className="flex flex-col">
                <span className="text-[1.55rem] font-black tracking-[-0.04em] text-[var(--nav-brand)] sm:text-[1.8rem]">
                  IdeaVault
                </span>
              </div>
            </Link>

            <NavLinks />
            <AuthLinks />

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((open) => !open)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] text-[var(--nav-foreground-strong)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--nav-border-strong)] hover:bg-[var(--nav-pill)]"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" strokeWidth={2.1} />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2.1} />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {mobileOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 border-t border-[var(--nav-shell-divider)] pt-4">
                  <NavLinks mobile onNavigate={() => setMobileOpen(false)} />
                  <AuthLinks mobile onNavigate={() => setMobileOpen(false)} />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
