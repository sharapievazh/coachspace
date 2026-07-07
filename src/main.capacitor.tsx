import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
  createBrowserHistory,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { startIOSKeyboardStabilizer } from "./lib/ios-keyboard";
import { startPerfDiagnostics } from "./lib/perf-diagnostics";
import "./styles.css";

startPerfDiagnostics();
startIOSKeyboardStabilizer();

// Inside a Capacitor iOS/Android WebView the origin is `capacitor://localhost`
// (or `http://localhost` on Android). There is no server to handle deep-link
// URLs, so use hash history to keep routing entirely client-side.
const isCapacitor =
  typeof window !== "undefined" &&
  (window.location.protocol === "capacitor:" ||
    // Capacitor injects this global at runtime; treat it as a signal too.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof (window as any).Capacitor !== "undefined");

const history = isCapacitor ? createHashHistory() : createBrowserHistory();
const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  history,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
