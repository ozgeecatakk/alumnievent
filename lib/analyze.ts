import { getMockAnalysis } from "./mockData";
import { saveAnalysis } from "./store";
import type { MealAnalysis } from "./types";

export const ANALYSIS_DURATION_MS = 5000;

export const STAGES = [
  "Uploading photo…",
  "Recognizing foods…",
  "Estimating portions…",
  "Calculating calories…",
] as const;

function toDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Replace the body of this function with a real API call to swap mock data for a live model.
export async function analyzeImage(file: File): Promise<MealAnalysis> {
  const [photo] = await Promise.all([
    toDataUrl(file),
    new Promise((resolve) => setTimeout(resolve, ANALYSIS_DURATION_MS)),
  ]);

  const fixture = getMockAnalysis(file.size + file.name.length);
  const analysis: MealAnalysis = {
    id: Math.random().toString(36).slice(2, 10),
    createdAt: new Date().toISOString(),
    photo,
    ...fixture,
  };

  saveAnalysis(analysis);
  return analysis;
}
