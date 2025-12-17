import { X, ExternalLink, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import buildScramjetUrl, { buildScramjetCandidates } from "@/lib/proxy";

interface ProxyFrameProps {
  url: string;
  onClose: () => void;
}

const ProxyFrame = ({ url, onClose }: ProxyFrameProps) => {
  // Format URL with protocol if missing
  const formattedUrl = url.startsWith("http") ? url : `https://${url}`;
    const proxiedUrl = buildScramjetUrl(formattedUrl);
    const candidates = buildScramjetCandidates(formattedUrl);
    const [iframeStatus, setIframeStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
    const [autoOpened, setAutoOpened] = useState(false);
    const [proxyReachable, setProxyReachable] = useState<boolean | null>(null);
    const [activeProxyUrl, setActiveProxyUrl] = useState<string | null>(proxiedUrl);

    // Probe the Scramjet proxy candidates and open the first that responds.
    useEffect(() => {
      let cancelled = false;

      async function probeAndOpen() {
        for (const candidate of candidates) {
          try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 2000);
            await fetch(candidate, { method: "GET", signal: controller.signal });
            clearTimeout(id);

            if (cancelled) return;

            setProxyReachable(true);
            setActiveProxyUrl(candidate);

            // small delay so overlay finishes rendering before opening
            setTimeout(() => {
              try {
                const w = window.open(candidate, "_blank");
                if (w) setAutoOpened(true);
              } catch (e) {
                // popup blocked; ignore
              }
            }, 250);

            return;
          } catch (err) {
            // failed; try next candidate
          }
        }

        if (!cancelled) {
          setProxyReachable(false);
          setActiveProxyUrl(null);
          // still attempt a best-effort open of the default proxied URL
          try {
            window.open(proxiedUrl, "_blank");
          } catch (e) {}
        }
      }

      const t = setTimeout(probeAndOpen, 150);

      return () => {
        cancelled = true;
        clearTimeout(t);
      };
    }, [proxiedUrl, candidates]);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Header */}
      <div className="
        flex items-center justify-between
        px-4 py-3
        border-b border-border
        glass
      ">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="
            flex items-center gap-2 px-4 py-2
            bg-secondary rounded-lg
            flex-1 max-w-xl
          ">
            <span className="text-primary text-xs font-medium">PROXIED</span>
            <span className="text-muted-foreground">|</span>
            <span className="text-foreground text-sm truncate">{formattedUrl}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open(proxiedUrl, "_blank")}
            className="
              p-2 rounded-lg
              text-muted-foreground hover:text-foreground
              hover:bg-secondary
              transition-colors
            "
            title="Open in new tab"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
          
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              text-muted-foreground hover:text-foreground
              hover:bg-secondary
              transition-colors
            "
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content area - shows message about proxy */}
      {/* Content area - show iframe preview and status */}
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <div className="glass rounded-2xl p-4 md:p-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3 mb-2">
                <RefreshCw className="w-5 h-5 text-primary animate-spin" />
                <div className="flex-1">
                  <div className="text-foreground font-medium">Connecting to Proxy</div>
                  <div className="text-muted-foreground/70 text-xs truncate">Attempting to load {formattedUrl}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {autoOpened ? "Opened in new tab" : "Opening..."}
                </div>
              </div>

              <div className="text-xs text-muted-foreground/60">
                Tip: set <code>VITE_SCRAMJET_BASE</code> to your Scramjet host (default: <code>http://localhost:1337</code>).
              </div>
            </div>
          </div>

          <div className="h-[60vh] md:h-[72vh] border border-border rounded-md overflow-hidden bg-background">
            {activeProxyUrl ? (
              <iframe
                src={activeProxyUrl}
                title="Proxied content"
                className="w-full h-full"
                onLoad={() => setIframeStatus("loaded")}
                onError={() => setIframeStatus("error")}
                sandbox={undefined}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Proxy not available — try opening the direct site or check your Scramjet host.
              </div>
            )}
          </div>

          {iframeStatus === "error" && (
            <div className="mt-3 text-sm text-red-500">
              Unable to load inline preview (site may block embedding). Use "Open in new tab" to view via Scramjet.
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm"
              onClick={() => window.open(activeProxyUrl || proxiedUrl, "_blank")}
            >
              Open proxied
            </button>

            <button
              className="px-3 py-2 border rounded-md text-sm"
              onClick={() => window.open(formattedUrl, "_blank")}
            >
              Open direct
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyFrame;
