"use client";

import { useEffect, useState } from "react";
import { ANALYSIS_DURATION_MS, STAGES } from "@/lib/analyze";

const TICK_MS = 50;

export default function AnalyzingOverlay({ photo }: { photo: string }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      setElapsed(Math.min(Date.now() - started, ANALYSIS_DURATION_MS));
    }, TICK_MS);
    return () => clearInterval(timer);
  }, []);

  const progress = elapsed / ANALYSIS_DURATION_MS;
  const stageIndex = Math.min(Math.floor(progress * STAGES.length), STAGES.length - 1);

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" className="h-full w-full scale-105 object-cover blur-[2px] brightness-75" />
        <div className="absolute inset-x-0 h-24 -translate-y-1/2 animate-scan bg-gradient-to-b from-transparent via-emerald-300/40 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/25 border-t-emerald-300" />
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
          <div
            className="h-full rounded-full bg-emerald-600 transition-[width] duration-100 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <ul className="space-y-2">
          {STAGES.map((stage, i) => {
            const done = i < stageIndex;
            const active = i === stageIndex;
            return (
              <li
                key={stage}
                className={`flex items-center gap-3 text-sm transition-colors ${
                  active ? "font-medium text-emerald-700" : done ? "text-emerald-950/50" : "text-emerald-950/25"
                }`}
              >
                <span
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[10px] ${
                    done
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                        ? "border-emerald-600 text-emerald-600"
                        : "border-emerald-900/15"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                {stage}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
