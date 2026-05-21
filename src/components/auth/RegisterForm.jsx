"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ImagePlus,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import AuthDivider from "./AuthDivider";
import AuthInput from "./AuthInput";
import PasswordRequirements from "./PasswordRequirements";
import SocialLoginButton from "./SocialLoginButton";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isPasswordValid = useMemo(() => {
    return (
      password.length >= 6 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password)
    );
  }, [password]);

  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isPasswordValid) return;
    
    setError("");
    setIsLoading(true);

    const { error: authError } = await signUp.email({
      email,
      password,
      name: fullName,
      image: photoUrl,
    });

    if (authError) {
      const message = authError.message || "Failed to create account.";
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
      toast.success("Account created! Welcome to IdeaVault 🎉", {
        duration: 4000,
        style: {
          borderRadius: "14px",
          background: "var(--nav-shell)",
          color: "var(--nav-foreground-strong)",
          border: "1px solid var(--nav-shell-border)",
        },
        iconTheme: {
          primary: "#14b8a6",
          secondary: "#fff",
        },
      });
      router.push("/");
      router.refresh();
    }
  }

  async function handleGoogleSignUp() {
    setError("");
    setIsLoading(true);
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-[var(--auth-card-border)] bg-[var(--auth-card-bg)] shadow-[0_24px_80px_rgba(5,7,18,0.38)] backdrop-blur-2xl"
    >
      <div className="absolute inset-0 rounded-[2rem] border border-white/5" />
      <div className="absolute -right-12 -top-14 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(74,222,208,0.12),rgba(74,222,208,0.02)_58%,transparent_74%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(59,130,246,0.12),rgba(59,130,246,0.02)_58%,transparent_74%)]" />
      <div className="absolute left-6 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_70%)] blur-3xl" />
      <div className="absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.55),rgba(139,92,246,0.65),transparent)]" />

      <div className="relative px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
        <div className="mb-6 flex flex-col gap-3.5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--auth-accent-soft)]">
            <Sparkles className="h-3.5 w-3.5" />
            IdeaVault Access
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display text-3xl font-black tracking-[-0.05em] text-[var(--auth-heading)] sm:text-4xl">
              Create Account
            </h1>
            <p className="max-w-md text-sm leading-6 text-[var(--auth-muted)] sm:text-base">
              Join thousands of innovators on IdeaVault.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 dark:border-red-500/30 dark:bg-red-500/15">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4.5">
          <div className="grid gap-4 md:grid-cols-2">
            <AuthInput
              id="full-name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
              icon={<UserRound className="h-4 w-4" />}
            />

            <AuthInput
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              icon={<Mail className="h-4 w-4" />}
            />
          </div>

          <AuthInput
            id="photo-url"
            label="Photo URL"
            type="url"
            placeholder="https://..."
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
            autoComplete="url"
            icon={<ImagePlus className="h-4 w-4" />}
          />

          <div className="space-y-1">
            <AuthInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
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

            <PasswordRequirements password={password} />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
            disabled={isLoading || !isPasswordValid}
            className="group relative flex h-[3.25rem] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#14b8a6_0%,#0ea5a4_44%,#7c3aed_100%)] px-4 text-base font-bold text-white shadow-[0_18px_48px_rgba(20,184,166,0.24)] transition-all duration-300 hover:shadow-[0_24px_64px_rgba(20,184,166,0.34)] disabled:cursor-not-allowed disabled:opacity-80 sm:h-14 sm:text-lg"
          >
            <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {isLoading ? (
              <>
                <LoaderCircle className="relative h-5 w-5 animate-spin" />
                <span className="relative">Creating Account...</span>
              </>
            ) : (
              <>
                <span className="relative">Create Account</span>
                <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </motion.button>

          <AuthDivider label="or" />

          <SocialLoginButton label="Sign up with Google" onClick={handleGoogleSignUp} disabled={isLoading} />

          <p className="pt-1 text-center text-sm text-[var(--auth-muted)] sm:text-base">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[var(--auth-accent)] transition-colors duration-300 hover:text-[var(--auth-accent-strong)]"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
