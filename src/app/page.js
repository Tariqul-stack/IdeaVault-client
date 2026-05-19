import Link from "next/link";
import { ArrowRight, Layers3, Sparkles, Stars } from "lucide-react";
import StatsSection from "../components/home/StatsSection";

export default function Home() {
  return (
    <>
      <section className="relative px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--nav-foreground-muted)] shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
              <Sparkles className="h-4 w-4 text-[var(--nav-accent)]" />
              Turn scattered thoughts into products worth building
            </div>

            <div className="space-y-5">
              <h1 className="font-display max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[var(--nav-brand)] sm:text-6xl lg:text-7xl">
                Where Great Startup Ideas Come to Life
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--nav-foreground-muted)] sm:text-lg">
                Share your vision, discover trending concepts, and collaborate with innovators who share your passion for changing the world.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#7f67ff_0%,#6a4bff_100%)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_36px_rgba(106,75,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_46px_rgba(106,75,255,0.45)]"
              >
                Start Building
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <Link
                href="/ideas"
                className="inline-flex items-center justify-center rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] px-6 py-3.5 text-sm font-semibold text-[var(--nav-foreground-strong)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--nav-border-strong)] hover:bg-[var(--nav-pill)]"
              >
                Explore Ideas
              </Link>
            </div>
          </div>

          <div className="hero-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="absolute inset-x-10 top-0 h-40 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.35),rgba(124,92,255,0))] blur-3xl" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] p-4">
                <div>
                  <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">
                    Idea velocity
                  </p>
                  <p className="font-display mt-2 text-3xl font-black tracking-[-0.05em] text-[var(--nav-brand)]">
                    24 active
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#8b76ff_0%,#6e56ff_100%)] text-white shadow-[0_16px_28px_rgba(110,86,255,0.38)]">
                  <Layers3 className="h-5 w-5" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] p-5">
                  <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">
                    Saved this week
                  </p>
                  <p className="font-display mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--nav-brand)]">
                    18
                  </p>
                </div>
                <div className="rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-surface-soft)] p-5">
                  <p className="text-sm font-medium text-[var(--nav-foreground-muted)]">
                    Collaborators
                  </p>
                  <p className="font-display mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--nav-brand)]">
                    07
                  </p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[var(--nav-border)] bg-[var(--nav-surface-strong)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(124,92,255,0.12)] text-[var(--nav-accent)]">
                    <Stars className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[var(--nav-foreground-strong)]">
                      Featured concept
                    </p>
                    <p className="text-sm leading-7 text-[var(--nav-foreground-muted)]">
                      AI co-pilot for validating startup concepts with instant
                      market signals, positioning notes, and founder-ready next
                      steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
