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
import { PLATFORM_URL } from "../config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
          <Button asChild>
            <a href={PLATFORM_URL} target="_blank" rel="noreferrer">
              Platform
            </a>
          </Button>
        </div>

        <ApiKeyInputs
          showOpenAI={false}
          openaiApiKey={openaiApiKey}
          setOpenaiApiKey={setOpenaiApiKey}
          keywordsaiApiKey={keywordsaiApiKey}
          setKeywordsaiApiKey={setKeywordsaiApiKey}
        />

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
          <Card className="p-4">
            <Label className="mb-3 block">Sections</Label>

            <Label className="mb-2 block text-gray-300">Observe</Label>
            <div className="flex flex-col gap-2 mb-6">
              <Button
                variant={section === "observe-logs" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("observe-logs")}
              >
                Logs
              </Button>
              <Button
                variant={section === "observe-traces" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("observe-traces")}
              >
                Traces
              </Button>
              <Button
                variant={section === "observe-threads" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("observe-threads")}
              >
                Threads
              </Button>
              <Button
                variant={section === "observe-users" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("observe-users")}
              >
                Users
              </Button>
            </div>

            <Label className="mb-2 block text-gray-300">Evaluate</Label>
            <div className="flex flex-col gap-2 mb-6">
              <Button
                variant={section === "evaluate-datasets" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("evaluate-datasets")}
              >
                Datasets
              </Button>
            </div>

            <Label className="mb-2 block text-gray-300">Develop</Label>
            <div className="flex flex-col gap-2">
              <Button
                variant={section === "develop-gateway" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("develop-gateway")}
              >
                Gateway
              </Button>
              <Button
                variant={section === "develop-prompts" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("develop-prompts")}
              >
                Prompts
              </Button>
              <Button
                variant={section === "develop-experiments" ? "primary" : "default"}
                className="w-full justify-start text-left"
                onClick={() => setSection("develop-experiments")}
              >
                Experiments
              </Button>
            </div>
          </Card>

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
