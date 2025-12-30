"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiKeyInputs } from "../components/ApiKeyInputs";
import { ObserveLogsSection } from "./sections/ObserveLogsSection";
import { ObserveTracesSection } from "./sections/ObserveTracesSection";
import { ObserveThreadsSection } from "./sections/ObserveThreadsSection";
import { ObserveUsersSection } from "./sections/ObserveUsersSection";
import { DevelopGatewaySection } from "./sections/DevelopGatewaySection";
import { DevelopPromptsSection } from "./sections/DevelopPromptsSection";
import { DevelopExperimentsSection } from "./sections/DevelopExperimentsSection";
import { EvaluateDatasetsSection } from "./sections/EvaluateDatasetsSection";

type ApiSection =
  | "observe-logs"
  | "observe-traces"
  | "observe-threads"
  | "observe-users"
  | "evaluate-datasets"
  | "develop-gateway"
  | "develop-prompts"
  | "develop-experiments";

export default function ApisPage() {
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [keywordsaiApiKey, setKeywordsaiApiKey] = useState("");
  const [section, setSection] = useState<ApiSection>("observe-logs");

  const platformUrl = "https://platform.keywordsai.co/platform/dashboard";

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="mb-3">
          <Link href="/" className="text-xs font-mono underline underline-offset-4">
            ← Back
          </Link>
        </div>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">APIs</h1>
            <p className="text-xs text-gray-600 mt-2">
              Use the sidebar to navigate. Each section is a self-contained component so this scales to many endpoints.
            </p>
          </div>
          <a
            className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black"
            href={platformUrl}
            target="_blank"
            rel="noreferrer"
          >
            Platform
          </a>
        </div>

        <ApiKeyInputs
          showOpenAI={false}
          openaiApiKey={openaiApiKey}
          setOpenaiApiKey={setOpenaiApiKey}
          keywordsaiApiKey={keywordsaiApiKey}
          setKeywordsaiApiKey={setKeywordsaiApiKey}
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <div className="border border-gray-200 bg-white p-4">
            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-3">Sections</p>

            <p className="text-[10px] font-bold uppercase text-gray-300 tracking-widest font-mono mb-2">Observe</p>
            <div className="flex flex-col gap-2 mb-6">
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "observe-logs"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("observe-logs")}
              >
                Logs
              </button>
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "observe-traces"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("observe-traces")}
              >
                Traces
              </button>
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "observe-threads"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("observe-threads")}
              >
                Threads
              </button>
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "observe-users"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("observe-users")}
              >
                Users
              </button>
            </div>

            <p className="text-[10px] font-bold uppercase text-gray-300 tracking-widest font-mono mb-2">Evaluate</p>
            <div className="flex flex-col gap-2 mb-6">
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "evaluate-datasets"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("evaluate-datasets")}
              >
                Datasets
              </button>
            </div>

            <p className="text-[10px] font-bold uppercase text-gray-300 tracking-widest font-mono mb-2">Develop</p>
            <div className="flex flex-col gap-2">
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "develop-gateway"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("develop-gateway")}
              >
                Gateway
              </button>
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "develop-prompts"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("develop-prompts")}
              >
                Prompts
              </button>
              <button
                className={`border px-3 py-2 text-xs font-mono text-left ${
                  section === "develop-experiments"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-black"
                }`}
                onClick={() => setSection("develop-experiments")}
              >
                Experiments
              </button>
            </div>
          </div>

          <div>
            {section === "observe-logs" && <ObserveLogsSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "observe-traces" && <ObserveTracesSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "observe-threads" && <ObserveThreadsSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "observe-users" && <ObserveUsersSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "evaluate-datasets" && <EvaluateDatasetsSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "develop-gateway" && <DevelopGatewaySection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "develop-prompts" && <DevelopPromptsSection keywordsaiApiKey={keywordsaiApiKey} />}
            {section === "develop-experiments" && <DevelopExperimentsSection keywordsaiApiKey={keywordsaiApiKey} />}
          </div>
        </div>
      </div>
    </div>
  );
}


