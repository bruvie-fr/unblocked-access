import { useState } from "react";
import { Search, ArrowRight, Globe } from "lucide-react";

interface SearchBarProps {
  onSearch: (url: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [url, setUrl] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative flex items-center gap-3 p-2 pl-5
          glass rounded-2xl
          transition-all duration-300 ease-out
          ${isFocused ? "glow ring-1 ring-primary/50" : ""}
        `}
      >
        <Globe className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter any URL (e.g., google.com)"
          className="
            flex-1 bg-transparent text-foreground
            placeholder:text-muted-foreground
            text-base outline-none
            py-3
          "
        />
        
        <button
          type="submit"
          disabled={!url.trim()}
          className="
            flex items-center justify-center gap-2
            bg-primary text-primary-foreground
            px-5 py-3 rounded-xl
            font-medium text-sm
            transition-all duration-200
            hover:opacity-90 hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Unblock</span>
          <ArrowRight className="w-4 h-4 sm:hidden" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
