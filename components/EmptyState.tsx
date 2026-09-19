import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel = "Upload a photo",
  actionHref = "/upload",
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-emerald-900/15 bg-white/60 px-6 py-16 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-xl">🍽️</div>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-emerald-950/50">{description}</p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        {actionLabel}
      </Link>
    </div>
  );
}
