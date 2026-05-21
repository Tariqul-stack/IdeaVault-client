export async function generateMetadata({ params }) {
  try {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ideas/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) throw new Error("Failed");
    const idea = await res.json();
    return {
      title: `${idea.title}`,
      description:
        idea.shortDescription || "View this startup idea on IdeaVault.",
    };
  } catch {
    return {
      title: "Idea Detail",
    };
  }
}

export default function IdeaDetailLayout({ children }) {
  return <>{children}</>;
}
