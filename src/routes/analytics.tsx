import { createFileRoute } from "@tanstack/react-router";
import { getPageViews } from "~/server/analytics";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [data, setData] = useState<{
    pageviews: number;
    lastUpdated: string;
  } | null>(null);

  useEffect(() => {
    getPageViews().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-dvh bg-[#050505] text-white flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#050505] text-white px-6 py-16">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold mb-8">📊 Nexus One Analytics</h1>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              Page Views
            </p>
            <p className="text-4xl font-bold text-white mt-1">
              {data.pageviews.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              Last Updated
            </p>
            <p className="text-lg text-gray-300 mt-1">{data.lastUpdated}</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-700 text-center">
          Privacy-friendly — no cookies, no IP tracking. Just a counter.
        </p>
      </div>
    </div>
  );
}
