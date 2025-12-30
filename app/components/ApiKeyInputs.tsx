"use client";

import { useState } from "react";

export function ApiKeyInputs(props: {
  showOpenAI?: boolean;
  openaiApiKey: string;
  setOpenaiApiKey: (v: string) => void;
  keywordsaiApiKey: string;
  setKeywordsaiApiKey: (v: string) => void;
  disabled?: boolean;
}) {
  const {
    showOpenAI = false,
    openaiApiKey,
    setOpenaiApiKey,
    keywordsaiApiKey,
    setKeywordsaiApiKey,
    disabled = false,
  } = props;

  // no persistence: keep in-memory only
  const [show, setShow] = useState(false);

  return (
    <div className="mb-12 border border-gray-200 bg-gray-50 p-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono">
            API keys (optional)
          </p>
          <p className="text-xs text-gray-600">
            Not persisted. If you set env vars in <span className="font-bold">.env.local</span>, you don’t need these.
          </p>
        </div>
        <button
          className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black disabled:opacity-50"
          onClick={() => setShow((s) => !s)}
          disabled={disabled}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {showOpenAI && (
          <div>
            <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">
              OpenAI (<span className="font-bold">OPENAI_API_KEY</span>)
            </p>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black focus:outline-none disabled:opacity-50"
                type={show ? "text" : "password"}
                placeholder="sk-... (optional)"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                autoComplete="off"
                disabled={disabled}
              />
              <button
                className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black disabled:opacity-50"
                disabled={disabled}
                onClick={() => setOpenaiApiKey("")}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest font-mono mb-2">
            KeywordsAI (<span className="font-bold">KEYWORDSAI_API_KEY</span>)
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black focus:outline-none disabled:opacity-50"
              type={show ? "text" : "password"}
              placeholder="kwai_... (optional)"
              value={keywordsaiApiKey}
              onChange={(e) => setKeywordsaiApiKey(e.target.value)}
              autoComplete="off"
              disabled={disabled}
            />
            <button
              className="border border-gray-200 bg-white px-3 py-2 text-xs font-mono hover:border-black disabled:opacity-50"
              disabled={disabled}
              onClick={() => setKeywordsaiApiKey("")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


