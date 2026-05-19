export default function AuthDivider({ label = "or continue with" }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-[var(--auth-divider)]" />
      <span className="text-sm text-[var(--auth-muted)]">{label}</span>
      <div className="h-px flex-1 bg-[var(--auth-divider)]" />
    </div>
  );
}
