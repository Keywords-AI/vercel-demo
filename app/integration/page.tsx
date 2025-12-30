"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiKeyInputs } from "../components/ApiKeyInputs";

type Provider = "openai" | "google" | "anthropic";
type Feature = "basic-workflow" | "tool-use" | "override-span";

interface FeatureConfig {
  id: Feature;
  name: string;
  description: string;
  defaultPrompt: string;
}

const features: FeatureConfig[] = [
  {
    id: "basic-workflow",
    name: "Basic Trace & Workflow",
    description: "Quickstart + Metadata + Agent Handoff",
    defaultPrompt: "¿Cómo se dice 'hello' en español?",
  },
  {
    id: "tool-use",
    name: "Tool Use",
    description: "Agent calling external tools",
    defaultPrompt: "What is the weather in Tokyo?",
  },
  {
    id: "override-span",
    name: "Override Span",
    description: "Customize trace names and data",
    defaultPrompt: "Secret message: The password is 12345",
  },
];

const providers: Array<{ id: Provider; name: string; enabled: boolean }> = [
  { id: "openai", name: "OpenAI", enabled: true },
  { id: "google", name: "Google (coming soon)", enabled: false },
  { id: "anthropic", name: "Anthropic (coming soon)", enabled: false },
];

export default function IntegrationPage() {
  const [provider, setProvider] = useState<Provider>("openai");
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [openaiApiKey, setOpenaiApiKey] = useState<string>("");
  const [keywordsaiApiKey, setKeywordsaiApiKey] = useState<string>("");

  const handleFeatureClick = async (feature: FeatureConfig) => {
    setSelectedFeature(feature.id);
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`/api/${provider}/${feature.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(provider === "openai" && openaiApiKey ? { "x-openai-api-key": openaiApiKey } : {}),
          ...(keywordsaiApiKey ? { "x-keywordsai-api-key": keywordsaiApiKey } : {}),
        },
        body: JSON.stringify({ message: feature.defaultPrompt }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: error instanceof Error ? error.message : "Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-3">
          <Link href="/" className="text-xs font-mono underline underline-offset-4">
            ← Back
          </Link>
        </div>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Integration</h1>
            <p className="text-xs text-gray-600 mt-2">Vercel AI SDK tracing integration demo.</p>
          </div>
          <a
            className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black"
            href="https://platform.keywordsai.co/platform/dashboard"
            target="_blank"
            rel="noreferrer"
          >
            Platform
          </a>
        </div>

        <ApiKeyInputs
          showOpenAI={true}
          openaiApiKey={openaiApiKey}
          setOpenaiApiKey={setOpenaiApiKey}
          keywordsaiApiKey={keywordsaiApiKey}
          setKeywordsaiApiKey={setKeywordsaiApiKey}
          disabled={loading}
        />

        <div className="mb-8 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono">
            Provider
          </span>
          <select
            className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black focus:outline-none"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value as Provider);
              setSelectedFeature(null);
              setResponse(null);
            }}
            disabled={loading}
          >
            {providers.map((p) => (
              <option key={p.id} value={p.id} disabled={!p.enabled}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleFeatureClick(feature)}
              disabled={loading || providers.find((p) => p.id === provider)?.enabled === false}
              className={`text-left p-6 border transition-all ${
                selectedFeature === feature.id
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-black"
              }`}
            >
              <h3 className="font-bold text-sm mb-2">{feature.name}</h3>
              <p
                className={`text-[11px] leading-relaxed ${
                  selectedFeature === feature.id ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {feature.description}
              </p>
            </button>
          ))}
        </div>

        {providers.find((p) => p.id === provider)?.enabled === false && (
          <div className="mb-12 border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-mono text-gray-700">
              Provider not enabled yet. Switch to <span className="font-bold">OpenAI</span> for now.
            </p>
          </div>
        )}

        {selectedFeature && (
          <div className="border border-black p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider">
                  {selectedFeature.replace("-", " ")} result
                </h3>
              </div>
              {loading && <span className="text-xs animate-pulse font-bold tracking-tighter">● PROCESSING</span>}
            </div>

            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest font-mono">
                Example input
              </p>
              <div className="p-4 bg-gray-50 border border-gray-100 font-mono text-xs text-gray-600">
                "{features.find((f) => f.id === selectedFeature)?.defaultPrompt}"
              </div>
            </div>

            {(response?.system_metadata || response?.custom_metadata) && (
              <div className="mb-8 p-4 bg-gray-50 border border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400 mb-3 tracking-widest font-mono">
                  Metadata & params sent
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {response.system_metadata && (
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">KeywordsAI system IDs</p>
                      <pre className="text-[10px] font-mono text-black">
                        {JSON.stringify(response.system_metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                  {response.custom_metadata && (
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Custom analytics data</p>
                      <pre className="text-[10px] font-mono text-black">
                        {JSON.stringify(response.custom_metadata, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest font-mono">
                Execution data
              </p>

              {response?.steps ? (
                <div className="space-y-6">
                  {response.steps.map((step: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-black pl-6 py-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5">
                          STEP {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter italic">
                          {step.agent || "Action"}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-black mb-2">{step.action}</p>
                      <pre className="text-xs font-mono bg-gray-50 p-4 border border-gray-100 overflow-auto whitespace-pre-wrap leading-relaxed">
                        {step.output}
                      </pre>
                    </div>
                  ))}
                </div>
              ) : (
                <pre className="text-xs font-mono overflow-auto max-h-[400px] whitespace-pre-wrap bg-gray-50 p-4 border border-gray-100 leading-relaxed text-gray-700">
                  {response ? JSON.stringify(response, null, 2) : "Loading..."}
                </pre>
              )}
            </div>

            {!loading && response && (
              <div className="mt-10 pt-6 border-t border-gray-100">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 text-center">
                  Trace successfully ingested by Keywords AI
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


