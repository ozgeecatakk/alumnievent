import type { MealAnalysis } from "./types";

const KEY = "calorie-analyzer:history";

function read(): MealAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function listAnalyses(): MealAnalysis[] {
  return read();
}

export function getAnalysis(id: string): MealAnalysis | undefined {
  return read().find((a) => a.id === id);
}

export function saveAnalysis(analysis: MealAnalysis) {
  if (typeof window === "undefined") return;
  // Only the 20 newest are kept: photos are stored as data URLs and localStorage caps out around 5 MB.
  const next = [analysis, ...read().filter((a) => a.id !== analysis.id)].slice(0, 20);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    window.localStorage.setItem(KEY, JSON.stringify([analysis]));
  }
}
