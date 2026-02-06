"use client";

import Link from "next/link";
import { EXAMPLE_PAGES } from "./config/sections";
import { PLATFORM_URL } from "../config/site";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExamplesPage() {
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
            <h1 className="text-2xl font-bold tracking-tight">Examples</h1>
            <p className="text-xs text-gray-600 mt-2">
              Demo use cases: Invoice generator (AI autofill) and internal banking chatbot.
            </p>
          </div>
          <Button asChild>
            <a href={PLATFORM_URL} target="_blank" rel="noreferrer">
              Platform
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EXAMPLE_PAGES.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="block text-left p-6 hover:border-black transition-all h-full">
                <CardTitle className="mb-2">{page.label}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
