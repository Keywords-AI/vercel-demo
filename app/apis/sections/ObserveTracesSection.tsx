"use client";

import { useState } from "react";
import { JsonBlock } from "../../components/JsonBlock";
import { postProxy } from "../lib/postProxy";

export function ObserveTracesSection(props: { keywordsaiApiKey: string }) {
  const { keywordsaiApiKey } = props;

  const listDefaults = {
    page: 1,
    page_size: 20,
    sort_by: "-timestamp",
    filters: {},
  };

  const [tracesStepLoading, setTracesStepLoading] = useState<"list" | "get" | "summary" | null>(null);
  const [traceId, setTraceId] = useState<string | null>(null);
  const [tracesListResult, setTracesListResult] = useState<any>(null);
  const [tracesGetResult, setTracesGetResult] = useState<any>(null);
  const [tracesSummaryResult, setTracesSummaryResult] = useState<any>(null);

  const traces = {
    list: async () => {
      setTracesStepLoading("list");
      setTracesListResult(null);
      setTracesGetResult(null);
      setTracesSummaryResult(null);
      try {
        const data = await postProxy("/api/keywordsai/traces/list", keywordsaiApiKey, {
          ...listDefaults,
        });
        setTracesListResult(data);
        const firstId =
          (data as any)?.response?.results?.[0]?.trace_unique_id || (data as any)?.response?.results?.[0]?.id;
        if (firstId) setTraceId(String(firstId));
      } finally {
        setTracesStepLoading(null);
      }
    },
    get: async () => {
      if (!traceId) return;
      setTracesStepLoading("get");
      setTracesGetResult(null);
      try {
        const data = await postProxy("/api/keywordsai/traces/get", keywordsaiApiKey, { trace_unique_id: traceId });
        setTracesGetResult(data);
      } finally {
        setTracesStepLoading(null);
      }
    },
    summary: async () => {
      setTracesStepLoading("summary");
      setTracesSummaryResult(null);
      try {
        const data = await postProxy("/api/keywordsai/traces/summary", keywordsaiApiKey, { filters: {} });
        setTracesSummaryResult(data);
      } finally {
        setTracesStepLoading(null);
      }
    },
  };

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-sm font-bold">Observe → Traces</h2>
        <p className="text-xs text-gray-600 mt-1">
          First list traces to get a <span className="font-mono">trace_unique_id</span>, then retrieve and view
          summary.
        </p>
      </div>

      <div className="mb-4 border border-gray-200 bg-gray-50 p-4">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">Fixed inputs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">list params:</span> {JSON.stringify(listDefaults)}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">summary filters:</span> {JSON.stringify({ filters: {} })}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">Derived IDs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">trace_unique_id:</span> {traceId || "—"}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">source:</span> list traces → first result
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={traces.list}
          disabled={tracesStepLoading !== null}
        >
          1) List traces
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={traces.get}
          disabled={tracesStepLoading !== null || !traceId}
        >
          2) Retrieve trace
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={traces.summary}
          disabled={tracesStepLoading !== null}
        >
          3) Summary
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50"
          disabled
        >
          —
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <JsonBlock title="Step 1 response" value={tracesListResult} emptyText="Click “1) List traces”" />
        <JsonBlock title="Step 2 response" value={tracesGetResult} emptyText="Click “2) Retrieve trace”" />
        <JsonBlock title="Step 3 response" value={tracesSummaryResult} emptyText="Click “3) Summary”" />
      </div>
    </div>
  );
}


