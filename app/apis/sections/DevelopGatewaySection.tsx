"use client";

import { useState } from "react";
import { JsonBlock } from "../../components/JsonBlock";
import { postProxy } from "../lib/postProxy";

export function DevelopGatewaySection(props: { keywordsaiApiKey: string }) {
  const { keywordsaiApiKey } = props;

  const fixedPayload = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: "Say 'Hello World'" }],
  };

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await postProxy("/api/keywordsai/gateway/chat-completions", keywordsaiApiKey, fixedPayload);
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-sm font-bold">Develop → Gateway</h2>
        <p className="text-xs text-gray-600 mt-1">
          OpenAI-compatible endpoint: <span className="font-mono">POST /api/chat/completions</span>.
        </p>
      </div>

      <div className="mb-4 border border-gray-200 bg-gray-50 p-4">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">Fixed inputs</p>
        <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
          {JSON.stringify(fixedPayload)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={run}
          disabled={loading}
        >
          1) Create chat completion
        </button>
        <button className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50" disabled>
          —
        </button>
        <button className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50" disabled>
          —
        </button>
        <button className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50" disabled>
          —
        </button>
      </div>

      <div className="mt-4">
        <JsonBlock title="Response" value={result} emptyText="Click “1) Create chat completion”" />
      </div>
    </div>
  );
}


