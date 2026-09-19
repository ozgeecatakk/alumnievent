"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MealCard from "@/components/MealCard";
import { listAnalyses } from "@/lib/store";
import type { MealAnalysis } from "@/lib/types";

const STEPS = [
  { title: "Snap a photo", body: "Take a picture of your plate or pick one from your device." },
  { title: "AI recognizes foods", body: "Every item on the plate is detected and its portion estimated." },
  { title: "Get the numbers", body: "Calories and macros, broken down item by item." },
];

export default function HomePage() {
  const [recent, setRecent] = useState<MealAnalysis[]>([]);

  useEffect(() => {
    setRecent(listAnalyses().slice(0, 3));
  }, []);

  return (
    <div className="space-y-16">
      <section className="text-center">
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Photo to calories in seconds
        </span>
        <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Know what is on your plate.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-emerald-950/55">
          Upload a picture of your meal and the analyzer identifies each food, estimates portion
          sizes and adds up the calories and macros for you.
        </p>
        <Link
          href="/upload"
          className="mt-8 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          Analyze a photo
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title} className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-700">
              {i + 1}
            </span>
            <h3 className="mt-4 font-medium">{step.title}</h3>
            <p className="mt-1 text-sm text-emerald-950/55">{step.body}</p>
          </div>
        ))}
      </section>

      {recent.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-medium">Recent meals</h2>
            <Link href="/history" className="text-sm text-emerald-700 hover:underline">
              View all
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {recent.map((analysis) => (
              <MealCard key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
