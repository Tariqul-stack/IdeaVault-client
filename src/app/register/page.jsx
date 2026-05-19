import { Sparkles } from "lucide-react";

export default function RegisterPage() {
  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="hero-panel flex w-full max-w-3xl flex-col items-center justify-center gap-5 rounded-[2rem] px-8 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--nav-foreground-muted)]">
          <Sparkles className="h-4 w-4 text-[var(--nav-accent)]" />
          Create your space for bold ideas
        </div>
        <h1 className="text-4xl font-black tracking-[-0.05em] text-[var(--nav-brand)] sm:text-6xl">
          Register Page
        </h1>
      </div>
    </section>
  );
}
