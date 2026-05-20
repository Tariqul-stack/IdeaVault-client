"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ProfileModal({ isOpen, onClose, user, onLogout }) {
  const router = useRouter();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_32px_80px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl p-2 transition hover:bg-[var(--nav-surface-soft)] text-[var(--nav-foreground-muted)]"
            >
              <X className="h-5 w-5" />
            </button>

            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                referrerPolicy="no-referrer"
                className="mx-auto mb-4 h-20 w-20 rounded-full object-cover ring-4 ring-purple-500/30"
              />
            ) : (
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8b76ff] to-[#6e56ff] text-3xl font-bold text-white ring-4 ring-purple-500/30">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
            )}

            <h2 className="text-center text-2xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
              {user.name || "User"}
            </h2>
            <p className="mt-1 text-center text-sm text-[var(--nav-foreground-muted)]">
              {user.email}
            </p>

            <hr className="my-6 border-[var(--nav-shell-divider)]" />

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  onClose();
                  router.push("/update-profile");
                }}
                className="w-full rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(112,86,255,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(112,86,255,0.48)]"
              >
                Update Profile
              </button>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/50 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
