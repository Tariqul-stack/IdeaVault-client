"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  X,
  CheckCircle,
} from "lucide-react";
import AuthDivider from "./AuthDivider";
import AuthInput from "./AuthInput";
import SocialLoginButton from "./SocialLoginButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const { error: authError } = await signIn.email({
      email,
      password,
    });

    if (authError) {
      const message = authError.message || 
        "Failed to sign in. Please check your credentials.";
      setError(message);
      toast.error(message, {
        duration: 4000,
        style: {
          borderRadius: "14px",
          background: "var(--nav-shell)",
          color: "var(--nav-foreground-strong)",
          border: "1px solid var(--nav-shell-border)",
        },
      });
      setIsLoading(false);
    } else {
      toast.success("Welcome back! Signed in successfully.", {
        duration: 3000,
        style: {
          borderRadius: "14px",
          background: "var(--nav-shell)",
          color: "var(--nav-foreground-strong)",
          border: "1px solid var(--nav-shell-border)",
        },
        iconTheme: {
          primary: "#8b76ff",
          secondary: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1000);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setIsLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-[var(--auth-card-border)] bg-[var(--auth-card-bg)] shadow-[0_24px_80px_rgba(5,7,18,0.38)] backdrop-blur-2xl"
      >
        <div className="absolute inset-0 rounded-[2rem] border border-white/5" />
        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(129,93,255,0.22),rgba(129,93,255,0.02)_60%,transparent_72%)] blur-2xl" />
        <div className="absolute left-8 top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.7),transparent)]" />

        <div className="relative px-5 py-7 sm:px-8 sm:py-8 md:px-9 md:py-9">
          <div className="mb-7 flex flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--auth-accent-soft)]">
              <Sparkles className="h-3.5 w-3.5" />
              IdeaVault Access
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-3xl font-black tracking-[-0.05em] text-[var(--auth-heading)] sm:text-4xl">
                Welcome Back
              </h1>
              <p className="max-w-md text-sm leading-7 text-[var(--auth-muted)] sm:text-base">
                Sign in to continue your innovation journey.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 dark:border-red-500/30 dark:bg-red-500/15">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              icon={<Mail className="h-4 w-4" />}
            />

            <AuthInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              rightLabel="Forgot?"
              rightLabelAction={() => setForgotOpen(true)}
              autoComplete="current-password"
              icon={<LockKeyhole className="h-4 w-4" />}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="transition-colors duration-300 hover:text-[var(--auth-foreground)]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-sm text-[var(--auth-muted)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe((value) => !value)}
                  className="h-4 w-4 rounded border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] text-violet-500 focus:ring-2 focus:ring-violet-500/40"
                />
                <span>Remember me</span>
              </label>
            </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
            disabled={isLoading}
            className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#7c3aed_50%,#6d4bff_100%)] px-4 text-lg font-bold text-white shadow-[0_18px_48px_rgba(109,75,255,0.35)] transition-all duration-300 hover:shadow-[0_24px_64px_rgba(109,75,255,0.45)] disabled:cursor-not-allowed disabled:opacity-85"
          >
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">{isLoading ? "Signing In..." : "Sign In"}</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>

          <AuthDivider />

          <SocialLoginButton onClick={handleGoogleSignIn} disabled={isLoading} />

          <p className="text-center text-sm text-[var(--auth-muted)] sm:text-base">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[var(--auth-accent)] transition-colors duration-300 hover:text-[var(--auth-accent-strong)]"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </motion.div>

    {/* Forgot Password Modal */}
    <AnimatePresence>
      {forgotOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setForgotOpen(false);
              setForgotSubmitted(false);
              setForgotEmail("");
            }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--auth-card-border)] bg-[var(--auth-card-bg)] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setForgotOpen(false);
                setForgotSubmitted(false);
                setForgotEmail("");
              }}
              className="absolute right-4 top-4 rounded-xl p-2 text-[var(--auth-muted)] transition-all duration-200 hover:bg-white/5 hover:text-[var(--auth-foreground)]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* STATE A — Email input (forgotSubmitted === false) */}
            {!forgotSubmitted ? (
              <>
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
                  <LockKeyhole className="h-5 w-5 text-violet-400" />
                </div>

                {/* Title */}
                <h2 className="mb-2 text-2xl font-black tracking-tight text-[var(--auth-heading)]">
                  Forgot Password?
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-[var(--auth-muted)]">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                {/* Email input */}
                <div className="mb-4">
                  <label className="mb-1.5 block text-sm font-medium text-[var(--auth-muted)]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--auth-muted)]" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] py-3 pl-10 pr-4 text-sm text-[var(--auth-foreground)] placeholder:text-[var(--auth-muted)] focus:border-violet-500/60 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  onClick={() => {
                    if (forgotEmail.trim()) {
                      setForgotSubmitted(true);
                    }
                  }}
                  className="w-full rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d4bff_100%)] py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(109,75,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(109,75,255,0.4)]"
                >
                  Send Reset Instructions
                </button>

                {/* Cancel */}
                <button
                  onClick={() => {
                    setForgotOpen(false);
                    setForgotEmail("");
                  }}
                  className="mt-3 w-full rounded-2xl border border-[var(--auth-input-border)] bg-transparent py-3 text-sm font-semibold text-[var(--auth-muted)] transition-all duration-200 hover:text-[var(--auth-foreground)]"
                >
                  Cancel
                </button>
              </>
            ) : (
              /* STATE B — Success state (forgotSubmitted === true) */
              <div className="text-center">
                {/* Success icon */}
                <div className="mb-5 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="h-8 w-8 text-emerald-400" />
                </div>

                <h2 className="mb-2 text-2xl font-black tracking-tight text-[var(--auth-heading)]">
                  Check Your Email
                </h2>
                <p className="mb-2 text-sm leading-relaxed text-[var(--auth-muted)]">
                  We've sent password reset instructions to:
                </p>
                <p className="mb-6 text-sm font-bold text-violet-400 break-all">
                  {forgotEmail}
                </p>
                <p className="mb-6 text-xs text-[var(--auth-muted)]">
                  Didn't receive the email? Check your spam folder or try again with a different address.
                </p>

                {/* Back to login */}
                <button
                  onClick={() => {
                    setForgotOpen(false);
                    setForgotSubmitted(false);
                    setForgotEmail("");
                  }}
                  className="w-full rounded-2xl bg-[linear-gradient(135deg,#8b5cf6_0%,#6d4bff_100%)] py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(109,75,255,0.3)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
  );
}
