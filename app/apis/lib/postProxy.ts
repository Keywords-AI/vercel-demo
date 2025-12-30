"use client";

export async function postProxy(path: string, keywordsaiApiKey: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(keywordsaiApiKey ? { "x-keywordsai-api-key": keywordsaiApiKey } : {}),
    },
    body: JSON.stringify(body ?? {}),
  });

  const data = await res.json().catch(() => ({}));
  return { status: res.status, ...data };
}


