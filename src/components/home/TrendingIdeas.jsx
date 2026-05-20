"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import IdeaCard from "@/components/ideas/IdeaCard";

export default function TrendingIdeas() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTrendingIdeas = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axiosInstance.get("/api/ideas", {
          params: { page: 1, limit: 6 },
        });
        setIdeas(res.data.ideas || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingIdeas();
  }, []);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Label row */}
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 rounded bg-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Trending Now
            </span>
          </div>

          {/* Title + subtitle row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
                Ideas the Community is{" "}
                <span className="bg-[linear-gradient(135deg,#8b76ff,#6e56ff)] bg-clip-text text-transparent">
                  Buzzing About
                </span>
              </h2>
              <p className="mt-2 text-base text-[var(--nav-foreground-muted)]">
                Explore the most engaging startup concepts shared by innovators worldwide.
              </p>
            </div>

            {/* "View All Ideas" link */}
            <Link
              href="/ideas"
              className="self-start inline-flex shrink-0 items-center gap-2 rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--nav-foreground-strong)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--nav-border-strong)] hover:bg-[var(--nav-pill)] md:self-auto"
            >
              View All Ideas
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 h-[220px] flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 h-5 w-20 rounded-full bg-[var(--nav-surface-soft)]"></div>
                  <div className="mb-3 h-6 w-3/4 rounded-xl bg-[var(--nav-surface-soft)]"></div>
                  <div className="h-4 w-full rounded-lg bg-[var(--nav-surface-soft)]"></div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-7 w-7 rounded-full bg-[var(--nav-surface-soft)]"></div>
                  <div className="h-4 w-24 rounded-lg bg-[var(--nav-surface-soft)]"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="flex justify-center py-12">
            <span className="text-sm text-[var(--nav-foreground-muted)]">
              Failed to load ideas. Please try again.
            </span>
          </div>
        )}

        {/* IDEAS GRID */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea, index) => (
              <IdeaCard key={idea._id} idea={idea} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
