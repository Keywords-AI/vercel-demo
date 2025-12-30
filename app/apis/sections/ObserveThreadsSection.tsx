"use client";

import { useState } from "react";
import { JsonBlock } from "../../components/JsonBlock";
import { postProxy } from "../lib/postProxy";

export function ObserveThreadsSection(props: { keywordsaiApiKey: string }) {
  const { keywordsaiApiKey } = props;

  const demoThreadIdentifier = "thread_demo_123";
  const demoCustomerIdentifier = "customer_thread_demo_123";

  const [threadsLoading, setThreadsLoading] = useState<"create" | "list" | null>(null);
  const [createLogResult, setCreateLogResult] = useState<any>(null);
  const [threadsResult, setThreadsResult] = useState<any>(null);

  const createLogWithThread = async () => {
    setThreadsLoading("create");
    setCreateLogResult(null);
    try {
      const data = await postProxy("/api/keywordsai/logs/create", keywordsaiApiKey, {
        customer_identifier: demoCustomerIdentifier,
        thread_identifier: demoThreadIdentifier,
      });
      setCreateLogResult(data);
    } finally {
      setThreadsLoading(null);
    }
  };

  const listThreads = async () => {
    setThreadsLoading("list");
    setThreadsResult(null);
    try {
      const data = await postProxy("/api/keywordsai/threads/list", keywordsaiApiKey, {
        page: 1,
        page_size: 50,
        filters: {
          thread_identifier: { operator: "in", value: [demoThreadIdentifier] },
        },
      });
      setThreadsResult(data);
    } finally {
      setThreadsLoading(null);
    }
  };

  return (
    <div className="mb-12">
      <div className="mb-4">
        <h2 className="text-sm font-bold">Observe → Threads</h2>
        <p className="text-xs text-gray-600 mt-1">
          No inputs. This flow uses a fixed <span className="font-mono">thread_identifier</span>:{" "}
          <span className="font-mono font-bold">{demoThreadIdentifier}</span>
        </p>
      </div>

      <div className="mb-4 border border-gray-200 bg-gray-50 p-4">
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">Fixed inputs</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">thread_identifier:</span> {demoThreadIdentifier}
          </div>
          <div className="border border-gray-200 bg-white p-3 text-xs font-mono">
            <span className="text-gray-400">customer_identifier:</span> {demoCustomerIdentifier}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={createLogWithThread}
          disabled={threadsLoading !== null}
        >
          1) Create log with thread id
        </button>
        <button
          className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={listThreads}
          disabled={threadsLoading !== null}
        >
          2) List threads
        </button>
        <button className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50" disabled>
          —
        </button>
        <button className="w-full border border-gray-200 bg-white px-3 py-3 text-xs font-mono disabled:opacity-50" disabled>
          —
        </button>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <JsonBlock
            title="Step 1 response (Create log)"
            value={createLogResult}
            emptyText="Click “1) Create log with thread id”"
          />
          <JsonBlock title="Step 2 response (List threads)" value={threadsResult} emptyText="Click “2) List threads”" />
        </div>
      </div>
    </div>
  );
}


