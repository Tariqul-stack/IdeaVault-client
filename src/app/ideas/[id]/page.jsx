"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { ArrowLeft } from "lucide-react";

export default function IdeaDetailsPage() {
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await axiosInstance.get(`/api/ideas/${id}`);
        setIdea(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIdea();
  }, [id]);

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--nav-foreground-muted)] transition-colors duration-200 hover:text-[var(--nav-foreground-strong)]"
        >
          <ArrowLeft size={16} />
          Back to Ideas
        </button>

        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-1/3 rounded-xl bg-[var(--nav-surface-soft)]" />
            <div className="h-12 w-2/3 rounded-xl bg-[var(--nav-surface-soft)]" />
          </div>
        )}

        {!loading && idea && (
          <h1 className="text-4xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
            {idea.title}
          </h1>
        )}

        {!loading && !idea && (
          <p className="text-[var(--nav-foreground-muted)]">Idea not found.</p>
        )}
      </div>
    </div>
  );
}
