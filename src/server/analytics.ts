import { createServerFn } from "@tanstack/react-start";

const ANALYTICS_PATH = "/home/team/shared/analytics.json";

async function readAnalytics(): Promise<{ pageviews: number; lastUpdated: string }> {
  const file = Bun.file(ANALYTICS_PATH);
  const exists = await file.exists();
  if (!exists) {
    return { pageviews: 0, lastUpdated: new Date().toISOString() };
  }
  return await file.json();
}

async function writeAnalytics(data: {
  pageviews: number;
  lastUpdated: string;
}): Promise<void> {
  await Bun.write(ANALYTICS_PATH, JSON.stringify(data, null, 2) + "\n");
}

export const trackPageView = createServerFn({ method: "POST" }).handler(
  async () => {
    const current = await readAnalytics();
    const updated = {
      pageviews: current.pageviews + 1,
      lastUpdated: new Date().toISOString(),
    };
    await writeAnalytics(updated);
    return updated;
  },
);

export const getPageViews = createServerFn({ method: "GET" }).handler(
  async () => {
    return await readAnalytics();
  },
);
