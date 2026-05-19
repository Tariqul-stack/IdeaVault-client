import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function MyIdeasPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <section className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="hero-panel rounded-[2rem] px-8 py-16">
        <h1 className="font-display text-4xl font-black tracking-[-0.05em] text-[var(--nav-brand)] sm:text-6xl">
          My Ideas
        </h1>
        <p className="mt-4 text-lg text-[var(--nav-muted)]">
          Welcome back, {session.user.name}!
        </p>
      </div>
    </section>
  );
}
