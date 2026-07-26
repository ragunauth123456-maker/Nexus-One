import { getPageViews } from "~/server/analytics";
import { useEffect, useState } from "react";

export function Footer() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    getPageViews().then((data) => setViews(data.pageviews));
  }, []);

  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-semibold text-white">
            NEXUS ONE<span className="align-top text-[0.6em] text-blue-500">™</span>
          </p>
          <p className="text-xs text-gray-500">
            The Universal Intelligence Platform™
          </p>
        </div>
        <div className="flex flex-col items-center gap-1 sm:items-end">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Nexus One. All rights reserved.
          </p>
          {views !== null && (
            <p className="text-xs text-gray-700">
              👁 {views.toLocaleString()} view{views !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
