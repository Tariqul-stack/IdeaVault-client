"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | IdeaVault",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F8F8FC] px-4 dark:bg-[#0B0B12]">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/8 blur-3xl opacity-60 dark:opacity-100" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-600/6 blur-3xl opacity-60 dark:opacity-100" />

      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Giant 404 Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <div className="mb-2 select-none bg-gradient-to-b from-violet-400/70 to-violet-200/30 bg-clip-text text-[10rem] font-black leading-none text-transparent dark:from-violet-500/80 dark:to-violet-900/40 md:text-[16rem]">
            404
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl"
        >
          This Page Got Lost in Idea Space
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-white/50 md:text-base"
        >
          The page you're looking for doesn't exist, was moved, or has been
          deleted.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/40"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
