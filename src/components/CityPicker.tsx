import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROVINCE_CITY_DATA, getAllProvinces, getCitiesByProvince } from "@/data/provinceCities";

const HOT_CITIES = [
  "北京", "上海", "成都", "西安", "杭州", "重庆", "长沙",
  "大理", "厦门", "三亚", "拉萨", "哈尔滨",
];

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
}

interface SearchResult {
  city: string;
  province: string;
}

const CityPicker = ({ value, onChange }: CityPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const provinces = getAllProvinces();
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : [];

  // Search across all provinces/cities
  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    const results: SearchResult[] = [];
    for (const { province, cities } of PROVINCE_CITY_DATA) {
      for (const city of cities) {
        if (city.toLowerCase().includes(q)) {
          results.push({ city, province });
        }
      }
    }
    return results.slice(0, 15);
  }, [searchQuery]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectCity = (city: string) => {
    onChange(city);
    setSearchQuery("");
    setShowSearch(false);
  };

  // Find which province a city belongs to (for display)
  const getProvinceForCity = (city: string): string => {
    for (const { province, cities } of PROVINCE_CITY_DATA) {
      if (cities.includes(city)) return province;
    }
    return "";
  };

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            placeholder="搜索城市名称..."
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setShowSearch(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {showSearch && searchQuery.trim() && (
          <div className="absolute z-50 top-full mt-1 w-full bg-popover border rounded-lg shadow-lg max-h-52 overflow-y-auto">
            {searchResults.length > 0 ? (
              searchResults.map(({ city, province }) => (
                <button
                  key={`${province}-${city}`}
                  onClick={() => selectCity(city)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{city}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{province}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                未找到匹配城市
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hot cities */}
      <div>
        <span className="text-xs text-muted-foreground mr-2">🔥 热门：</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {HOT_CITIES.map(city => (
            <button
              key={city}
              onClick={() => selectCity(city)}
              className={cn(
                "rounded-full px-3 py-1 text-xs border transition-all",
                value === city
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Province → City selectors */}
      <div className="grid grid-cols-2 gap-3">
        <Select
          value={selectedProvince}
          onValueChange={(v) => {
            setSelectedProvince(v);
            // Don't clear city if switching province just to browse
          }}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="按省份选择" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {provinces.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={cities.includes(value) ? value : ""}
          onValueChange={selectCity}
          disabled={!selectedProvince}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder={selectedProvince ? "选择城市" : "请先选省份"} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Selected city display */}
      {value && (
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{getProvinceForCity(value)}</span>
          <button
            onClick={() => onChange("")}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CityPicker;
