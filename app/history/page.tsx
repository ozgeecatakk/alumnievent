"use client";

import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import MealCard from "@/components/MealCard";
import { listAnalyses } from "@/lib/store";
import { totalCalories, type MealAnalysis } from "@/lib/types";

export default function HistoryPage() {
  const [analyses, setAnalyses] = useState<MealAnalysis[] | null>(null);

  useEffect(() => {
    setAnalyses(listAnalyses());
  }, []);

  if (analyses === null) return null;

  if (analyses.length === 0) {
    return (
      <EmptyState
        title="No meals yet"
        description="Analyzed meals show up here so you can look back at what you ate."
      />
    );
  }

  const total = analyses.reduce((sum, a) => sum + totalCalories(a), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">History</h1>
        <p className="text-sm text-emerald-950/50">
          {analyses.length} {analyses.length === 1 ? "meal" : "meals"} ·{" "}
          <span className="font-medium text-emerald-700 tabular-nums">{total} kcal</span> total
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {analyses.map((analysis) => (
          <MealCard key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </div>
  );
}
