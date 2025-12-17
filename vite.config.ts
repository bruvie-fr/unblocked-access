import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow Cloudflare Tunnel hostnames (trycloudflare) or other ephemeral hosts
    // so the Vite dev server will accept requests forwarded by the tunnel.
    // Supports explicit hosts, a wildcard regex for *.trycloudflare.com, and
    // an optional comma-separated env var `ALLOWED_HOSTS` for convenience.
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      // previous explicit test-host
      "fish-workers-float-contamination.trycloudflare.com",
      // accept any trycloudflare ephemeral hostname
      /.*\.trycloudflare\.com$/,
      // allow the specific tunnel the user reported
      "remix-salmon-bureau-expenditure.trycloudflare.com",
      // env overrides (comma-separated hostnames)
      ...(process.env.ALLOWED_HOSTS ? process.env.ALLOWED_HOSTS.split(",").map((s) => s.trim()).filter(Boolean) : []),
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
