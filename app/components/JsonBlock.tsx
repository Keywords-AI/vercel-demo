"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function JsonBlock(props: { title: string; value: unknown; emptyText?: string }) {
  const { title, value, emptyText = "—" } = props;
  return (
    <Card className="p-4">
      <Label className="mb-2 block">{title}</Label>
      <pre className="text-[10px] font-mono overflow-auto max-h-64">
        {value ? JSON.stringify(value, null, 2) : emptyText}
      </pre>
    </Card>
  );
}
