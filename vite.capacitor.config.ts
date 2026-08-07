// Standalone SPA build for Capacitor (iOS/Android).
// Does NOT use TanStack Router, TanStack Start SSR, Nitro, Cloudflare, Zod, or MCP.
// Uses a direct React entry (main.mobile.tsx) with a single root component.
// The default `npm run build` (Cloudflare SSR) is completely untouched.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020",
    rollupOptions: {
      input: path.resolve(__dirname, "index.capacitor.html"),
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/react-dom/") || id.includes("/node_modules/react/")) {
            return "vendor-react";
          }
          if (id.includes("/node_modules/@tanstack/")) {
            return "vendor-tanstack";
          }
          if (id.includes("/node_modules/lucide-react/")) {
            return "vendor-ui";
          }
        },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
