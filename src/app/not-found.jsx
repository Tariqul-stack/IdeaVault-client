"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B12] px-4 dark:bg-[#0B0B12]">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-600/8 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-purple-600/6 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 404 */}
        <div className="mb-2 select-none bg-gradient-to-b from-violet-500/80 to-violet-900/40 bg-clip-text text-[10rem] font-black leading-none text-transparent md:text-[16rem]">
          404
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-2xl font-bold text-white md:text-3xl">
          This Page Got Lost in Idea Space
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-sm text-sm leading-relaxed text-white/50 md:text-base">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or has
          been deleted.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:from-violet-600 hover:to-purple-700 hover:shadow-violet-500/40 hover:-translate-y-0.5"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
