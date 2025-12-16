import { X, ExternalLink, RefreshCw } from "lucide-react";

interface ProxyFrameProps {
  url: string;
  onClose: () => void;
}

const ProxyFrame = ({ url, onClose }: ProxyFrameProps) => {
  // Format URL with protocol if missing
  const formattedUrl = url.startsWith("http") ? url : `https://${url}`;

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
            onClick={() => window.open(formattedUrl, "_blank")}
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
      <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] p-8">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          </div>
          
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Connecting to Proxy
          </h2>
          
          <p className="text-muted-foreground text-sm mb-4">
            Attempting to load <span className="text-primary">{formattedUrl}</span>
          </p>
          
          <p className="text-muted-foreground/60 text-xs">
            Note: Full proxy functionality requires backend implementation. 
            This is a frontend demonstration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProxyFrame;
