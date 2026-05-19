"use client";

import { motion } from "framer-motion";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.243 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691 12.88 19.51C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.167 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.222 0-9.619-3.317-11.287-7.946l-6.523 5.025C9.5 39.556 16.227 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.06 12.06 0 0 1-4.085 5.57l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"
      />
    </svg>
  );
}

export default function SocialLoginButton({
  label = "Continue with Google",
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-[var(--auth-social-border)] bg-[var(--auth-social-bg)] px-4 text-base font-semibold text-[var(--auth-foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:border-[var(--auth-social-border-hover)] hover:bg-[var(--auth-social-bg-hover)]"
    >
      <GoogleIcon />
      <span>{label}</span>
    </motion.button>
  );
}
