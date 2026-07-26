import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NEXUS ONE — The Universal Intelligence Platform" },
      { name: "description", content: "NEXUS ONE is the Universal Intelligence Platform — an intelligence layer above every operating system, connecting them all into one ecosystem." },
      { property: "og:title", content: "NEXUS ONE — The Universal Intelligence Platform" },
      { property: "og:description", content: "One Intelligence. Every Device. Every Business. Every Person. Every AI. The intelligence layer above every operating system." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://145ca9e69e360e81cdcd3e66912cb696.ctonew.app" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "NEXUS ONE — The Universal Intelligence Platform" },
      { name: "twitter:description", content: "One Intelligence. Every Device. Every Business. Every Person. Every AI. The intelligence layer above every operating system." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => <div>Page not found</div>,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
