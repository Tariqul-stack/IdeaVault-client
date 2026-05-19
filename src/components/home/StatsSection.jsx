"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2.4K+", label: "Ideas Shared" },
  { value: "890", label: "Innovators" },
  { value: "14K", label: "Comments" },
  { value: "98%", label: "Satisfaction" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function StatsSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--stats-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--stats-grid)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(124,92,255,0.18),rgba(124,92,255,0))]" />

          <div className="relative grid gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                whileHover={{
                  y: -4,
                  scale: 1.015,
                  boxShadow: "0 18px 40px rgba(124,92,255,0.12)",
                }}
                className={[
                  "group relative flex min-h-[168px] flex-col items-center justify-center px-6 py-10 text-center transition-all duration-300",
                  "before:absolute before:right-0 before:top-1/2 before:hidden before:h-20 before:w-px before:-translate-y-1/2 before:bg-[var(--stats-divider)] lg:before:block",
                  index === stats.length - 1 ? "before:content-none" : "before:content-['']",
                ].join(" ")}
              >
                <div className="absolute inset-4 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <p className="font-display text-4xl font-black tracking-[-0.05em] text-[var(--stats-value)] sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm font-medium tracking-[0.04em] text-[var(--stats-label)] sm:text-[0.95rem]">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
