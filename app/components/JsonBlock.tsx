"use client";

export function JsonBlock(props: { title: string; value: unknown; emptyText?: string }) {
  const { title, value, emptyText = "—" } = props;
  return (
    <div className="border border-gray-200 bg-white p-4">
      <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-widest font-mono">
        {title}
      </p>
      <pre className="text-[10px] font-mono overflow-auto max-h-64">
        {value ? JSON.stringify(value, null, 2) : emptyText}
      </pre>
    </div>
  );
}


