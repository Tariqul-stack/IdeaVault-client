"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import { useSession } from "@/lib/auth-client";
import { Clock, MessageSquare, ArrowRight, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function MyInteractionsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    commentId: null,
    ideaId: null,
    text: "",
  });
  const [deleting, setDeleting] = useState(false);

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

  const getCategoryColor = (cat) => {
    const colors = {
      "Artificial Intelligence": "bg-violet-500/15 text-violet-400 border-violet-500/20",
      "Technology": "bg-blue-500/15 text-blue-400 border-blue-500/20",
      "Health & Wellness": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      "Education": "bg-amber-500/15 text-amber-400 border-amber-500/20",
      "FinTech": "bg-green-500/15 text-green-400 border-green-500/20",
      "Sustainability": "bg-teal-500/15 text-teal-400 border-teal-500/20",
      "Social Impact": "bg-pink-500/15 text-pink-400 border-pink-500/20",
      "E-Commerce": "bg-orange-500/15 text-orange-400 border-orange-500/20",
      "Entertainment": "bg-red-500/15 text-red-400 border-red-500/20",
      "Other": "bg-gray-500/15 text-gray-400 border-gray-500/20",
    };
    return colors[cat] || "bg-purple-500/15 text-purple-400 border-purple-500/20";
  };

  async function handleDelete() {
    setDeleting(true);
    try {
      await axiosInstance.delete(
        `/api/ideas/${deleteModal.ideaId}/comments/${deleteModal.commentId}`
      );
      setComments((prev) =>
        prev.filter((c) => c._id !== deleteModal.commentId)
      );
      setDeleteModal({ open: false, commentId: null, ideaId: null, text: "" });
      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment");
    } finally {
      setDeleting(false);
    }
  }

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

        {/* --- STATS ROW --- */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] px-6 py-4">
            <div className="rounded-xl bg-violet-500/10 p-2">
              <MessageSquare size={18} className="text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
                {comments.length}
              </p>
              <p className="text-xs text-[var(--nav-foreground-muted)]">
                Total Comments
              </p>
            </div>
          </div>
        </div>

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

                <div className="flex flex-col items-end gap-2 shrink-0">
                  {comment.ideaCategory && (
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${getCategoryColor(comment.ideaCategory)}`}>
                      {comment.ideaCategory.length > 12
                        ? comment.ideaCategory.substring(0, 12) + "..."
                        : comment.ideaCategory}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeleteModal({
                        open: true,
                        commentId: comment._id,
                        ideaId: comment.ideaId,
                        text: comment.text.length > 40 ? comment.text.substring(0, 40) + "..." : comment.text
                      })}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs font-semibold text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                    <button
                      onClick={() => router.push(`/ideas/${comment.ideaId}`)}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-xs font-semibold text-[var(--nav-foreground-muted)] transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-violet-400"
                    >
                      <ArrowRight size={14} />
                      View Idea
                    </button>
                  </div>
                </div>
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

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModal.open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deleting && setDeleteModal({ open: false, commentId: null, ideaId: null, text: "" })}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 z-[51] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            >
              <h2 className="mb-3 text-xl font-black text-[var(--nav-foreground-strong)]">
                Delete Comment
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[var(--nav-foreground-muted)]">
                Are you sure you want to delete this comment? "{deleteModal.text}" This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  disabled={deleting}
                  onClick={() => setDeleteModal({ open: false, commentId: null, ideaId: null, text: "" })}
                  className="flex-1 rounded-2xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] py-3 text-sm font-semibold text-[var(--nav-foreground-strong)] transition-all duration-200 hover:bg-[var(--nav-surface-soft)]/80 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  disabled={deleting}
                  onClick={handleDelete}
                  className="flex-1 rounded-2xl border border-red-500/30 bg-red-500/10 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/15 disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
