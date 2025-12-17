// Helper to build a Scramjet proxy URL for a target site.
// The base URL is configurable via Vite env var VITE_SCRAMJET_BASE.
// Default: http://localhost:1337 (Scramjet dev server)

// Default to the common Scramjet demo port (8080) used by Scramjet-App
const DEFAULT_BASE = "http://localhost:8080";

export function formatTargetUrl(raw: string) {
  const trimmed = raw.trim();
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

export function buildScramjetUrl(raw: string) {
  const target = formatTargetUrl(raw);
  // Allow runtime override via localStorage for easier discovery during dev:
  // localStorage.setItem('SCRAMJET_BASE_RUNTIME', 'http://localhost:1337')
  const runtime = typeof window !== "undefined" ? (window.localStorage.getItem("SCRAMJET_BASE_RUNTIME") as string | null) : null;
  const base = (runtime || (import.meta.env.VITE_SCRAMJET_BASE as string) || DEFAULT_BASE);

  // Common patterns used by proxy apps: query param or path. We'll use
  // a query param `url=` by default because it's widely supported and
  // doesn't require guessing path routing on the proxy host.
  const normalizedBase = base.replace(/\/+$/, "");

  return `${normalizedBase}/?url=${encodeURIComponent(target)}`;
}

// Return a list of candidate proxy URLs to try. Some scramjet hosts
// accept the target as a query param (`?url=`) while others accept it
// as a path (e.g. `/<encoded-url>`). We provide both so the client can
// probe which one works.
export function buildScramjetCandidates(raw: string) {
  const target = formatTargetUrl(raw);
  const runtime = typeof window !== "undefined" ? (window.localStorage.getItem("SCRAMJET_BASE_RUNTIME") as string | null) : null;
  const base = (runtime || (import.meta.env.VITE_SCRAMJET_BASE as string) || DEFAULT_BASE);
  const normalizedBase = base.replace(/\/+$/, "");

  return [
    `${normalizedBase}/?url=${encodeURIComponent(target)}`,
    `${normalizedBase}/${encodeURIComponent(target)}`,
  ];
}

export default buildScramjetUrl;
