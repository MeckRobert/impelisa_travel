const STYLES: Record<string, string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-rose-100 text-rose-700",
  completed: "bg-sky-100 text-sky-700",
  active: "bg-emerald-100 text-emerald-700",
  inactive: "bg-slate-100 text-slate-600",
  unread: "bg-amber-100 text-amber-700",
  read: "bg-slate-100 text-slate-600",
};

export default function StatusBadge({ status }: { status: string | null | undefined }) {
  const key = (status || "pending").toLowerCase();
  const label = key.charAt(0).toUpperCase() + key.slice(1);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STYLES[key] ?? "bg-slate-100 text-slate-600"}`}>
      {label}
    </span>
  );
}
