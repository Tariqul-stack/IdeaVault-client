"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Image as ImageIcon, ArrowLeft, Save, Loader2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Auth redirect
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Pre-fill from session
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImageUrl(session.user.image || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || null,
      });
      toast.success("Profile updated successfully! ✨");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  if (!session) return null;

  const fieldStyles =
    "w-full rounded-xl border border-[var(--nav-shell-border)] bg-[var(--nav-surface-soft)] px-4 py-3 text-sm text-[var(--nav-foreground-strong)] placeholder:text-[var(--nav-foreground-muted)] focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/60 transition-all duration-200";

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        {/* --- BACK BUTTON --- */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--nav-foreground-muted)] hover:text-[var(--nav-foreground-strong)] transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* --- PAGE HEADER --- */}
        <div className="mb-3 flex items-center gap-3">
          <div className="h-[2px] w-6 rounded bg-violet-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-violet-500">
            ACCOUNT SETTINGS
          </span>
        </div>

        <h1 className="mb-2 text-3xl font-black tracking-tight text-[var(--nav-foreground-strong)]">
          Update Profile
        </h1>

        <p className="mb-10 text-sm text-[var(--nav-foreground-muted)]">
          Update your display name and profile picture.
        </p>

        {/* --- FORM CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-[var(--nav-shell-border)] bg-[var(--nav-shell)] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        >
          {/* --- CURRENT AVATAR PREVIEW --- */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="relative">
              {imageUrl && !previewError ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  referrerPolicy="no-referrer"
                  onError={() => setPreviewError(true)}
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-violet-500/20"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#8b76ff] to-[#6e56ff] text-4xl font-black text-white ring-4 ring-violet-500/20">
                  {name
                    ? name[0].toUpperCase()
                    : session.user.name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <p className="text-xs text-[var(--nav-foreground-muted)]">
              Preview updates as you type
            </p>
          </div>

          {/* --- FORM --- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* --- FIELD 1: NAME --- */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)]">
                <User size={14} className="text-violet-400" />
                Display Name
                <span className="text-red-400"> *</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your display name"
                className={fieldStyles}
                required
              />
            </div>

            {/* --- FIELD 2: IMAGE URL --- */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[var(--nav-foreground-strong)]">
                <ImageIcon size={14} className="text-violet-400" />
                Profile Image URL
                <span className="ml-1 text-xs text-[var(--nav-foreground-muted)]">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewError(false);
                }}
                placeholder="https://example.com/photo.jpg"
                className={fieldStyles}
              />
              <p className="mt-1.5 text-xs text-[var(--nav-foreground-muted)]">
                Enter a direct link to your profile image
              </p>
            </div>

            {/* --- DIVIDER --- */}
            <div className="border-t border-[var(--nav-shell-border)] pt-2" />

            {/* --- SUBMIT BUTTON --- */}
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={!saving ? { y: -1 } : {}}
              whileTap={!saving ? { scale: 0.98 } : {}}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(112,86,255,0.3)] hover:shadow-[0_12px_28px_rgba(112,86,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </motion.button>

            {/* --- CANCEL LINK --- */}
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full rounded-2xl border border-[var(--nav-shell-border)] bg-transparent py-3 text-sm font-semibold text-[var(--nav-foreground-muted)] hover:text-[var(--nav-foreground-strong)] hover:border-[var(--nav-border-strong)] transition-all duration-200"
            >
              Cancel
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
