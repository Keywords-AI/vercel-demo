"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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

  const [show, setShow] = useState(false);

  return (
    <Card variant="muted" className="mb-12 p-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <Label className="block">API keys (optional)</Label>
          <p className="text-xs text-gray-600">
            Not persisted. If you set env vars in <span className="font-bold">.env.local</span>, you don't need these.
          </p>
        </div>
        <Button onClick={() => setShow((s) => !s)} disabled={disabled}>
          {show ? "Hide" : "Show"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {showOpenAI && (
          <div>
            <Label className="mb-2 block">
              OpenAI (<span className="font-bold">OPENAI_API_KEY</span>)
            </Label>
            <div className="flex gap-2">
              <Input
                className="flex-1"
                type={show ? "text" : "password"}
                placeholder="sk-... (optional)"
                value={openaiApiKey}
                onChange={(e) => setOpenaiApiKey(e.target.value)}
                autoComplete="off"
                disabled={disabled}
              />
              <Button disabled={disabled} onClick={() => setOpenaiApiKey("")}>
                Clear
              </Button>
            </div>
          </div>
        )}

        <div>
          <Label className="mb-2 block">
            KeywordsAI (<span className="font-bold">KEYWORDSAI_API_KEY</span>)
          </Label>
          <div className="flex gap-2">
            <Input
              className="flex-1"
              type={show ? "text" : "password"}
              placeholder="kwai_... (optional)"
              value={keywordsaiApiKey}
              onChange={(e) => setKeywordsaiApiKey(e.target.value)}
              autoComplete="off"
              disabled={disabled}
            />
            <Button disabled={disabled} onClick={() => setKeywordsaiApiKey("")}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
