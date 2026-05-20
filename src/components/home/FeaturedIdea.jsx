"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Layers, MessageSquare, DollarSign } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import axiosInstance from "@/lib/axios";

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
};

export default function FeaturedIdea() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    const fetchLatestIdea = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/ideas?page=1&limit=1");
        if (res.data?.ideas?.length > 0) {
          setIdea(res.data.ideas[0]);
        }
      } catch (err) {
        console.error("Failed to fetch latest idea", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestIdea();
  }, [session]);

  if (isPending || !session) {
    return null;
  }

  // LOADING SKELETON
  if (loading) {
    return (
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header skeleton */}
          <div className="mb-10 animate-pulse space-y-3">
            <div className="h-4 w-24 rounded bg-[var(--nav-surface-soft)]"></div>
            <div className="h-8 w-64 rounded-xl bg-[var(--nav-surface-soft)]"></div>
            <div className="h-4 w-96 rounded bg-[var(--nav-surface-soft)]"></div>
          </div>

          {/* Two column layout skeleton */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            {/* Left (flex-1) */}
            <div className="flex-1 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 animate-pulse space-y-6">
              <div className="h-6 w-24 rounded-full bg-[var(--nav-surface-soft)]"></div>
              <div className="h-8 w-3/4 rounded-xl bg-[var(--nav-surface-soft)]"></div>
              <div className="h-4 w-1/3 rounded bg-[var(--nav-surface-soft)]"></div>
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-[var(--nav-surface-soft)]"></div>
                <div className="h-4 w-full rounded bg-[var(--nav-surface-soft)]"></div>
                <div className="h-4 w-5/6 rounded bg-[var(--nav-surface-soft)]"></div>
                <div className="h-4 w-2/3 rounded bg-[var(--nav-surface-soft)]"></div>
              </div>
            </div>

            {/* Right (lg:w-[300px]) */}
            <div className="space-y-4 lg:w-[300px] shrink-0">
              <div className="h-48 rounded-3xl bg-[var(--nav-surface-soft)] animate-pulse"></div>
              <div className="h-40 rounded-3xl bg-[var(--nav-surface-soft)] animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!idea) {
    return null;
  }

  const commentsCount = idea.comments?.length || idea.commentsCount || 0;
  const initials = idea.authorName ? idea.authorName.charAt(0).toUpperCase() : "I";

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
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[2px] w-6 rounded bg-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
              Latest Idea
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)] md:text-4xl">
            Just Added to the Vault
          </h2>
          <p className="mt-2 text-base text-[var(--nav-foreground-muted)]">
            The most recently shared startup concept from our community.
          </p>
        </motion.div>

        {/* MAIN CONTENT LAYOUT */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            {/* TAGS ROW */}
            {idea.tags && idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-violet-500/20 bg-violet-500/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* TITLE */}
            <h3
              onClick={() => router.push(`/ideas/${idea._id}`)}
              className="text-2xl md:text-3xl font-black leading-tight tracking-tight text-[var(--nav-foreground-strong)] mb-4 cursor-pointer hover:text-violet-400 transition-colors"
            >
              {idea.title}
            </h3>

            {/* AUTHOR META ROW */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--nav-foreground-muted)] mb-8">
              <div className="flex items-center gap-2">
                {idea.authorImage ? (
                  <img
                    src={idea.authorImage}
                    alt={idea.authorName}
                    className="h-7 w-7 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white">
                    {initials}
                  </div>
                )}
                <span>{idea.authorName}</span>
              </div>
              <span>•</span>
              <span>Posted {timeAgo(idea.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span>{commentsCount} comments</span>
              </div>
              {idea.estimatedBudget && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>Budget: {idea.estimatedBudget}</span>
                  </div>
                </>
              )}
            </div>

            {/* CONTENT SECTIONS */}
            <div className="space-y-5">
              {idea.problemStatement && (
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--nav-foreground-strong)]">
                    Problem Statement
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--nav-foreground-muted)] line-clamp-3">
                    {idea.problemStatement}
                  </p>
                </div>
              )}

              {idea.proposedSolution && (
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--nav-foreground-strong)]">
                    Proposed Solution
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--nav-foreground-muted)] line-clamp-3">
                    {idea.proposedSolution}
                  </p>
                </div>
              )}

              {idea.targetAudience && (
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[var(--nav-foreground-strong)]">
                    Target Audience
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--nav-foreground-muted)] line-clamp-2">
                    {idea.targetAudience}
                  </p>
                </div>
              )}
            </div>

            {/* Read Full Idea BUTTON */}
            <button
              onClick={() => router.push(`/ideas/${idea._id}`)}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(112,86,255,0.4)]"
            >
              Read Full Idea
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-[300px] shrink-0 space-y-4 lg:sticky lg:top-24">
            {/* Card 1 — IDEA STATS */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--nav-foreground-muted)]">
                Idea Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Category</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">
                    {idea.category || "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Budget</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">
                    {idea.estimatedBudget || "—"}
                  </span>
                </div>

                <div className="my-3 border-t border-[var(--nav-shell-border)]" />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Tags</span>
                  <span className="text-sm font-bold text-violet-400 text-right line-clamp-1">
                    {idea.tags && idea.tags.length > 0 ? idea.tags.join(", ") : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--nav-foreground-muted)]">Posted</span>
                  <span className="text-sm font-bold text-[var(--nav-foreground-strong)]">
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 — ABOUT THE AUTHOR */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--nav-foreground-muted)]">
                About The Author
              </h4>
              <div className="flex items-center gap-3">
                {idea.authorImage ? (
                  <img
                    src={idea.authorImage}
                    alt={idea.authorName}
                    className="h-11 w-11 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-lg font-bold text-white">
                    {initials}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-[var(--nav-foreground-strong)]">
                    {idea.authorName}
                  </p>
                  <p className="text-xs text-[var(--nav-foreground-muted)]">Innovator</p>
                </div>
              </div>
            </div>

            {/* Card 3 — ACTION BUTTONS */}
            <div className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-4 backdrop-blur-xl space-y-3">
              <button
                onClick={() => router.push(`/ideas/${idea._id}`)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <Eye size={16} />
                View Full Idea
              </button>

              <button
                onClick={() => router.push("/ideas")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:text-violet-400"
              >
                <Layers size={16} />
                Browse All Ideas
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
