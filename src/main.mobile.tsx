import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoachSpaceMobile from "./CoachSpaceMobile";
import "./styles.css";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CoachSpaceMobile />
      </QueryClientProvider>
    </StrictMode>,
  );
}
