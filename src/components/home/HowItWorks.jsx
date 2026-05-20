"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description:
      "Sign up with email or Google. Your profile becomes your innovation identity on the platform.",
    gradient:
      "bg-[linear-gradient(135deg,#7c3aed,#6d28d9)] shadow-[0_8px_24px_rgba(124,58,237,0.4)]",
  },
  {
    number: "02",
    title: "Share Your Idea",
    description:
      "Submit your startup concept with details about the problem, solution, target audience, and budget estimate.",
    gradient:
      "bg-[linear-gradient(135deg,#0d9488,#0f766e)] shadow-[0_8px_24px_rgba(13,148,136,0.4)]",
  },
  {
    number: "03",
    title: "Get Feedback",
    description:
      "The community comments, validates, and helps refine your idea through constructive discussion.",
    gradient:
      "bg-[linear-gradient(135deg,#b45309,#92400e)] shadow-[0_8px_24px_rgba(180,83,9,0.4)]",
  },
  {
    number: "04",
    title: "Iterate & Grow",
    description:
      "Update your concept based on insights. Track interactions and build momentum towards launching.",
    gradient:
      "bg-[linear-gradient(135deg,#d97706,#b45309)] shadow-[0_8px_24px_rgba(217,119,6,0.4)]",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 rounded bg-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Platform Guide
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
            How IdeaVault Works
          </h2>
          <p className="mt-2 text-base text-[var(--nav-foreground-muted)]">
            From idea to community validation in four simple steps.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 text-center backdrop-blur-xl transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_8px_32px_rgba(139,118,255,0.10)]"
            >
              {/* Number Box */}
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black tracking-tight text-white shadow-lg ${step.gradient}`}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-base font-bold text-[var(--nav-foreground-strong)]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
