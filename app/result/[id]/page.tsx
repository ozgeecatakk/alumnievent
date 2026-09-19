"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import MacroBreakdown from "@/components/MacroBreakdown";
import { getAnalysis } from "@/lib/store";
import { totalCalories, totalMacros, type MealAnalysis } from "@/lib/types";

export default function ResultPage({ params }: PageProps<"/result/[id]">) {
  const { id } = use(params);
  const [analysis, setAnalysis] = useState<MealAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAnalysis(getAnalysis(id) ?? null);
    setLoading(false);
  }, [id]);

  if (loading) return null;

  if (!analysis) {
    return (
      <EmptyState
        title="Analysis not found"
        description="This result is no longer stored in your browser. Upload a photo to run a new analysis."
      />
    );
  }

  const kcal = totalCalories(analysis);
  const macros = totalMacros(analysis);

  return (
    <div className="animate-fade-up space-y-8">
      <div>
        <Link href="/history" className="text-sm text-emerald-700 hover:underline">
          ← Back to history
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{analysis.mealName}</h1>
        <p className="text-sm text-emerald-950/50">
          Analyzed{" "}
          {new Date(analysis.createdAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={analysis.photo} alt={analysis.mealName} className="aspect-[4/3] w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-emerald-950/50">Total calories</p>
            <p className="mt-1 text-5xl font-semibold tabular-nums text-emerald-700">{kcal}</p>
            <p className="text-sm text-emerald-950/50">kcal</p>
          </div>

          <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-medium text-emerald-950/70">Macronutrients</h2>
            <MacroBreakdown macros={macros} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
        <h2 className="border-b border-emerald-900/10 px-6 py-4 text-sm font-medium text-emerald-950/70">
          Detected foods
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-emerald-950/40">
                <th className="px-6 py-3 font-medium">Food</th>
                <th className="px-3 py-3 font-medium">Portion</th>
                <th className="px-3 py-3 text-right font-medium">Calories</th>
                <th className="px-6 py-3 text-right font-medium">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-900/8">
              {analysis.items.map((item) => (
                <tr key={item.name}>
                  <td className="px-6 py-3 font-medium">{item.name}</td>
                  <td className="px-3 py-3 text-emerald-950/55">{item.portion}</td>
                  <td className="px-3 py-3 text-right tabular-nums">{item.calories} kcal</td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.confidence >= 0.85
                          ? "bg-emerald-50 text-emerald-700"
                          : item.confidence >= 0.7
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {Math.round(item.confidence * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/upload"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Analyze another photo
        </Link>
        <Link
          href="/history"
          className="rounded-xl border border-emerald-900/15 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-emerald-50"
        >
          Saved to history
        </Link>
      </div>
    </div>
  );
}
