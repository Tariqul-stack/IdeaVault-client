"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSession, signOut } from "@/lib/auth-client";
import { ArrowRight, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import NavLinks from "./NavLinks";
import ThemeToggle from "../theme/ThemeToggle";
import ProfileModal from "../navbar/ProfileModal";

function AuthLinks({ mobile = false, onNavigate, session, isPending, onAvatarClick }) {
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

      {isPending ? (
        <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--nav-surface-soft)]"></div>
      ) : session?.user ? (
        <div className={mobile ? "flex w-full justify-center" : "flex items-center"}>
          {session.user.image ? (
            <div
              className="relative h-10 w-10 cursor-pointer"
              onClick={() => {
                onAvatarClick();
                if (onNavigate) onNavigate();
              }}
            >
              {/* Initials shown behind image while loading */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#8b76ff] to-[#6e56ff] text-sm font-bold text-white ring-2 ring-[var(--nav-border-strong)]">
                {session.user.name ? session.user.name[0].toUpperCase() : "U"}
              </div>

              {/* Image starts hidden, shows after load */}
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                referrerPolicy="no-referrer"
                onLoad={(e) => (e.target.style.opacity = "1")}
                className="absolute inset-0 h-10 w-10 rounded-full object-cover ring-2 ring-[var(--nav-border-strong)] transition-opacity duration-300 hover:ring-purple-500"
                style={{ opacity: 0 }}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                onAvatarClick();
                if (onNavigate) onNavigate();
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#8b76ff] to-[#6e56ff] text-sm font-bold text-white ring-2 ring-[var(--nav-border-strong)] transition-all duration-300 hover:ring-purple-500"
            >
              {session.user.name ? session.user.name[0].toUpperCase() : "U"}
            </div>
          )}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = useSession();

  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully.", {
            duration: 3000,
            style: {
              borderRadius: "14px",
              background: "#1e1e2a",
              color: "#f0f0ff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
            iconTheme: {
              primary: "#8b76ff",
              secondary: "#fff",
            },
          });
          setTimeout(() => {
            router.push("/login");
            router.refresh();
          }, 800);
        },
      },
    });
  }

  return (
    <>
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
                <div className="font-display flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] text-base font-black tracking-[0.18em] text-white shadow-[0_16px_28px_rgba(110,86,255,0.4)]">
                  IV
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-[1.55rem] font-black tracking-[-0.04em] text-[var(--nav-brand)] sm:text-[1.8rem]">
                    IdeaVault
                  </span>
                </div>
              </Link>

              <NavLinks />
              <AuthLinks
                session={session}
                isPending={isPending}
                onAvatarClick={() => setProfileOpen(true)}
              />

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
                    <AuthLinks
                      mobile
                      onNavigate={() => setMobileOpen(false)}
                      session={session}
                      isPending={isPending}
                      onAvatarClick={() => setProfileOpen(true)}
                    />
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={session?.user}
        onLogout={handleLogout}
      />
    </>
  );
}
