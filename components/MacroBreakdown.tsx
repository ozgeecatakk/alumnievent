const MACROS = [
  { key: "protein", label: "Protein", color: "bg-emerald-500", kcalPerGram: 4 },
  { key: "carbs", label: "Carbs", color: "bg-amber-500", kcalPerGram: 4 },
  { key: "fat", label: "Fat", color: "bg-rose-500", kcalPerGram: 9 },
] as const;

export default function MacroBreakdown({
  macros,
}: {
  macros: { protein: number; carbs: number; fat: number };
}) {
  const totalKcal = MACROS.reduce((sum, m) => sum + macros[m.key] * m.kcalPerGram, 0) || 1;

  return (
    <div className="space-y-3">
      {MACROS.map((macro) => {
        const grams = macros[macro.key];
        const share = ((grams * macro.kcalPerGram) / totalKcal) * 100;
        return (
          <div key={macro.key}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="text-emerald-950/70">{macro.label}</span>
              <span className="font-medium tabular-nums">
                {grams.toFixed(1)} g
                <span className="ml-2 text-xs font-normal text-emerald-950/40">{share.toFixed(0)}%</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-emerald-900/8">
              <div className={`h-full rounded-full ${macro.color}`} style={{ width: `${share}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
