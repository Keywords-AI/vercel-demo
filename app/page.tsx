"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Keywords AI Demo</h1>
          <p className="text-gray-600 italic uppercase text-[10px] tracking-widest font-bold">
            APIs and integrations
          </p>
          <p className="text-[11px] text-gray-600 mt-2">
            Recommended: run locally with env vars for the simplest setup.{" "}
            <a
              className="text-black underline underline-offset-4"
              href="https://docs.keywordsai.co/integration/tracing/vercel-tracing?utm_source=agentblocks"
              target="_blank"
              rel="noreferrer"
            >
              docs.keywordsai.co
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/apis"
            className="block text-left p-6 border border-gray-200 hover:border-black transition-all"
          >
            <h2 className="font-bold text-sm mb-2">APIs</h2>
            <p className="text-[11px] leading-relaxed text-gray-500">
              Walk through Keywords AI API endpoints step-by-step (Logs, Traces, …).
            </p>
          </Link>

          <Link
            href="/integration"
            className="block text-left p-6 border border-gray-200 hover:border-black transition-all"
          >
            <h2 className="font-bold text-sm mb-2">Integration</h2>
            <p className="text-[11px] leading-relaxed text-gray-500">
              Vercel AI SDK tracing demo (OpenAI provider + 3 tracing examples).
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}


