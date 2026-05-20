"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import { Clock, MessageSquare, ArrowRight } from "lucide-react";

export default function MyInteractionsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/api/ideas/user/my-comments");
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [session]);

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

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-[2px] w-6 rounded bg-violet-500"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
            MY INTERACTIONS
          </span>
        </div>
        <h1 className="mb-2 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
          Ideas I've Commented On
        </h1>
        <p className="mb-10 text-sm text-[var(--nav-foreground-muted)]">
          All the startup ideas you've engaged with.
        </p>

        {/* --- LOADING STATE --- */}
        {(loading || isPending) && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-5"
              >
                <div className="mb-2 h-5 w-1/3 rounded-lg bg-[var(--nav-surface-soft)]"></div>
                <div className="h-4 w-2/3 rounded-lg bg-[var(--nav-surface-soft)]"></div>
              </div>
            ))}
          </div>
        )}

        {/* --- COMMENTS LIST --- */}
        {!loading && !isPending && comments.length > 0 && (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-5 transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_4px_20px_rgba(139,118,255,0.08)]"
              >
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-bold text-[var(--nav-foreground-strong)]">
                    {comment.ideaTitle || "Untitled Idea"}
                  </h3>
                  <p className="text-sm text-[var(--nav-foreground-muted)]">
                    Your comment:{" "}
                    <span className="font-medium italic text-[var(--nav-foreground-strong)]">
                      "{comment.text.length > 60
                        ? comment.text.substring(0, 60) + "..."
                        : comment.text}"
                    </span>
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Clock size={12} className="text-[var(--nav-foreground-muted)]" />
                    <span className="text-xs text-[var(--nav-foreground-muted)]">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/ideas/${comment.ideaId}`)}
                  className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-violet-400"
                >
                  <ArrowRight size={14} />
                  View Idea
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- EMPTY STATE --- */}
        {!loading && !isPending && comments.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-5xl">💬</div>
            <h3 className="mb-2 text-xl font-bold text-[var(--nav-foreground-strong)]">
              No interactions yet
            </h3>
            <p className="mb-6 text-[var(--nav-foreground-muted)]">
              Start exploring ideas and share your thoughts!
            </p>
            <button
              onClick={() => router.push("/ideas")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(112,86,255,0.4)]"
            >
              Browse Ideas →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
