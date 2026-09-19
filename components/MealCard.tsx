import Link from "next/link";
import { totalCalories, type MealAnalysis } from "@/lib/types";

export default function MealCard({ analysis }: { analysis: MealAnalysis }) {
  return (
    <Link
      href={`/result/${analysis.id}`}
      className="group overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-emerald-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={analysis.photo}
          alt={analysis.mealName}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 p-4">
        <h3 className="truncate font-medium">{analysis.mealName}</h3>
        <div className="flex items-baseline justify-between text-sm text-emerald-950/50">
          <time dateTime={analysis.createdAt}>
            {new Date(analysis.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </time>
          <span className="font-semibold tabular-nums text-emerald-700">
            {totalCalories(analysis)} kcal
          </span>
        </div>
      </div>
    </Link>
  );
}
