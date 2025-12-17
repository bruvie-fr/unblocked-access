import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { buildScramjetCandidates } from "@/lib/proxy";
import { Shield, Zap, Eye, Lock } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import FeatureCard from "@/components/FeatureCard";
import ProxyFrame from "@/components/ProxyFrame";

const Index = () => {
  const [proxyUrl, setProxyUrl] = useState<string | null>(null);

  const handleSearch = (url: string) => {
    setProxyUrl(url);
  };

  const features = [
    {
      icon: Shield,
      title: "Bypass Restrictions",
      description: "Access any website regardless of network blocks or filters.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized servers ensure minimal latency and fast loading times.",
    },
    {
      icon: Eye,
      title: "Stay Anonymous",
      description: "Your browsing activity remains private and untraceable.",
    },
    {
      icon: Lock,
      title: "Encrypted Connection",
      description: "All traffic is encrypted to protect your data from interception.",
    },
  ];

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ background: "var(--gradient-glow)" }}
        />

        {/* Main content */}
        <div className="relative z-10">
          {/* Header */}
          <header className="px-6 py-6">
            <nav className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">:</span>
                </div>
                <span className="text-foreground font-semibold text-lg">
                  colon<span className="text-primary">unblocker</span>
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground text-sm hidden sm:block">
                  Free & Anonymous
                </span>
                <button
                  className="text-sm px-3 py-1 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  onClick={async () => {
                    // Try common hosts and ports to find a running Scramjet instance.
                    const hosts = [window.location.hostname, "localhost", "127.0.0.1"];
                    const ports = [8080, 1337, 80];
                    const target = "https://example.com";
                    let foundBase: string | null = null;

                    outer: for (const host of hosts) {
                      for (const port of ports) {
                        const base = port === 80 ? `http://${host}` : `http://${host}:${port}`;
                        // build both query and path variants
                        const candidates = [
                          `${base}/?url=${encodeURIComponent(target)}`,
                          `${base}/${encodeURIComponent(target)}`,
                        ];

                        for (const c of candidates) {
                          try {
                            const controller = new AbortController();
                            const id = setTimeout(() => controller.abort(), 1500);
                            await fetch(c, { method: "GET", signal: controller.signal });
                            clearTimeout(id);
                            foundBase = base;
                            break outer;
                          } catch (e) {
                            // try next candidate
                          }
                        }
                      }
                    }

                    if (foundBase) {
                      window.localStorage.setItem("SCRAMJET_BASE_RUNTIME", foundBase);
                      toast({ title: "Scramjet detected", description: `Using ${foundBase} for proxying.` });
                    } else {
                      toast({ title: "Scramjet not found", description: "No Scramjet instance responded on common ports (try setting SCRAMJET_BASE_RUNTIME manually)." });
                    }
                  }}
                >
                  Detect Scramjet
                </button>
                <button
                  className="text-sm px-3 py-1 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  onClick={() => {
                    const current = window.localStorage.getItem("SCRAMJET_BASE_RUNTIME") || "http://129.213.26.17:1337";
                    const value = window.prompt("Enter Scramjet base (e.g. http://129.213.26.17:1337)", current);
                    if (value) {
                      window.localStorage.setItem("SCRAMJET_BASE_RUNTIME", value);
                      toast({ title: "Proxy saved", description: `Using ${value}` });
                      window.location.reload();
                    }
                  }}
                >
                  Set Proxy
                </button>
              </div>
            </nav>
          </header>

          {/* Hero Section */}
          <main className="px-6 pt-16 pb-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-gradient">Browse the web</span>
                <br />
                <span className="text-gradient-accent">without limits</span>
              </h1>
              
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                Enter any URL and instantly bypass network restrictions. 
                Access blocked websites freely and anonymously.
              </p>

              <SearchBar onSearch={handleSearch} />

              <p className="text-muted-foreground/50 text-sm mt-6">
                Just enter a URL like <span className="text-muted-foreground">google.com</span> or <span className="text-muted-foreground">youtube.com</span>
              </p>
            </div>
          </main>

          {/* Features Section */}
          <section className="px-6 pb-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="px-6 py-8 border-t border-border/50">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground/60 text-sm">
                © 2024 colonunblocker. Use responsibly.
              </p>
              <p className="text-muted-foreground/40 text-xs">
                This service is for educational purposes only.
              </p>
            </div>
          </footer>
        </div>
      </div>

      {/* Proxy Frame Overlay */}
      {proxyUrl && (
        <ProxyFrame url={proxyUrl} onClose={() => setProxyUrl(null)} />
      )}
    </>
  );
};

export default Index;
