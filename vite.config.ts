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
    // Add additional entries if you use a different tunnel hostname.
    allowedHosts: [
      "fish-workers-float-contamination.trycloudflare.com",
      "localhost",
      "127.0.0.1",
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
