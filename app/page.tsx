"use client";

import { useState } from "react";
import { ApiKeyBar, authHeaders, useOpenAISettings } from "@/components/ApiKeyBar";

export default function Home() {
  const settings = useOpenAISettings();
  const { apiKey, model } = settings;
  const [text, setText] = useState(
    `LIMITATION OF LIABILITY. EXCEPT FOR FRAUD OR WILLFUL MISCONDUCT, EACH PARTY'S AGGREGATE LIABILITY ARISING OUT OF THIS AGREEMENT SHALL NOT EXCEED THE FEES PAID IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. NEITHER PARTY SHALL BE LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES.`,
  );
  const [context, setContext] = useState("B2B SaaS MSA, customer is mid-market, governing law CA.");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  async function run() {
    setError("");
    setOutput("");
    if (!apiKey.trim()) {
      setError("Add your OpenAI API key above.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/clarity", {
        method: "POST",
        headers: authHeaders(apiKey),
        body: JSON.stringify({ text, context, model }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Request failed");
        return;
      }
      setOutput(JSON.stringify(data.result ?? data, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/90">
          Neuron suite · 15
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          Plain Bind Clarity
        </h1>
        <p className="max-w-2xl text-lg text-zinc-400">
          Turn dense clauses into obligations, risks, and checklists — with honest uncertainty. Not legal
          advice; a thinking partner for review.
        </p>
      </header>

      <ApiKeyBar settings={settings} accent="from-sky-400 to-slate-600" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Extra context</span>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-sky-400/60"
            />
          </label>
          <label className="block space-y-2 text-sm">
            <span className="text-zinc-300">Dense text</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none focus:border-sky-400/60"
            />
          </label>
          <button
            type="button"
            disabled={loading}
            onClick={run}
            className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-slate-600 px-4 py-3 text-sm font-semibold text-sky-950 shadow-lg shadow-sky-500/30 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? "Unbinding…" : "Generate plain clarity"}
          </button>
        </div>
        <div className="flex min-h-[520px] flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Brief JSON</span>
            {error ? <span className="text-rose-400">Error</span> : null}
          </div>
          {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          <pre className="flex-1 overflow-auto whitespace-pre-wrap text-zinc-100">{output}</pre>
        </div>
      </div>
    </div>
  );
}
