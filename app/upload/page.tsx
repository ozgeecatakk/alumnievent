"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import AnalyzingOverlay from "@/components/AnalyzingOverlay";
import { analyzeImage } from "@/lib/analyze";

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function pick(next: File | undefined) {
    if (!next) return;
    if (!next.type.startsWith("image/")) {
      setError("That file is not an image. Pick a JPG or PNG photo of your meal.");
      return;
    }
    setError(null);
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  async function run() {
    if (!file) return;
    setAnalyzing(true);
    const analysis = await analyzeImage(file);
    router.push(`/result/${analysis.id}`);
  }

  if (analyzing && preview) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight">Analyzing your meal</h1>
        <AnalyzingOverlay photo={preview} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-semibold tracking-tight">Upload a meal photo</h1>
      <p className="mt-1 text-sm text-emerald-950/55">
        A clear shot of the whole plate gives the most accurate estimate.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`mt-6 cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition ${
          dragging ? "border-emerald-500 bg-emerald-50" : "border-emerald-900/15 bg-white hover:border-emerald-400"
        }`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Selected meal" className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-xl">
              📷
            </div>
            <p className="font-medium">Drop a photo here</p>
            <p className="mt-1 text-sm text-emerald-950/50">or click to browse — JPG or PNG</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0])}
      />

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      <div className="mt-6 flex gap-3">
        <button
          onClick={run}
          disabled={!file}
          className="flex-1 rounded-xl bg-emerald-600 px-5 py-3 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-900/15 disabled:text-emerald-950/40"
        >
          Analyze
        </button>
        {preview && (
          <button
            onClick={() => {
              setFile(null);
              setPreview(null);
            }}
            className="rounded-xl border border-emerald-900/15 px-5 py-3 text-sm font-medium transition hover:bg-white"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
