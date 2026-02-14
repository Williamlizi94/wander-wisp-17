import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  US_STATES, US_HOT_CITIES,
  CHINA_PROVINCES, CHINA_HOT_CITIES,
  INTERNATIONAL_DATA, INTERNATIONAL_HOT_CITIES,
  searchAllCities, findCityLocation,
} from "@/data/worldCities";

type Tab = "us" | "china" | "international";

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: "us", label: "美国", emoji: "🇺🇸" },
  { key: "china", label: "中国", emoji: "🇨🇳" },
  { key: "international", label: "国际", emoji: "🌍" },
];

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
}

const CityPicker = ({ value, onChange }: CityPickerProps) => {
  const [tab, setTab] = useState<Tab>("china");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Drill-down selectors state
  const [selectedState, setSelectedState] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const searchResults = useMemo(() => searchAllCities(searchQuery), [searchQuery]);

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

  const hotCities = tab === "us" ? US_HOT_CITIES : tab === "china" ? CHINA_HOT_CITIES : INTERNATIONAL_HOT_CITIES;

  // Drill-down data
  const usCities = selectedState ? (US_STATES.find(s => s.state === selectedState)?.cities || []) : [];
  const chinaCities = selectedProvince ? (CHINA_PROVINCES.find(p => p.province === selectedProvince)?.cities || []) : [];
  const intlCities = selectedCountry ? (INTERNATIONAL_DATA.find(c => c.country === selectedCountry)?.cities || []) : [];

  const locationLabel = value ? findCityLocation(value) : "";

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
            onFocus={() => setShowSearch(true)}
            placeholder="搜索全球任意城市..."
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
        {showSearch && searchQuery.trim() && (
          <div className="absolute z-50 top-full mt-1 w-full bg-popover border rounded-lg shadow-lg max-h-52 overflow-y-auto">
            {searchResults.length > 0 ? searchResults.map(({ city, location }) => (
              <button
                key={`${location}-${city}`}
                onClick={() => selectCity(city)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
              >
                <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="font-medium text-foreground">{city}</span>
                <span className="text-xs text-muted-foreground ml-auto">{location}</span>
              </button>
            )) : (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">未找到匹配城市</div>
            )}
          </div>
        )}
      </div>

      {/* Tab switcher */}
      <div className="flex rounded-lg border border-border overflow-hidden">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex-1 py-2 text-sm font-medium transition-colors",
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Hot cities */}
      <div>
        <span className="text-xs text-muted-foreground mr-2">🔥 热门：</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {hotCities.map(city => (
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

      {/* Drill-down selectors */}
      {tab === "us" && (
        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="选择州" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {US_STATES.map(s => (
                <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={usCities.includes(value) ? value : ""} onValueChange={selectCity} disabled={!selectedState}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={selectedState ? "选择城市" : "先选州"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {usCities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {tab === "china" && (
        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="选择省份" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {CHINA_PROVINCES.map(p => (
                <SelectItem key={p.province} value={p.province}>{p.province}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={chinaCities.includes(value) ? value : ""} onValueChange={selectCity} disabled={!selectedProvince}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={selectedProvince ? "选择城市" : "先选省份"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {chinaCities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {tab === "international" && (
        <div className="grid grid-cols-2 gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder="选择国家" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {INTERNATIONAL_DATA.map(c => (
                <SelectItem key={c.country} value={c.country}>{c.country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={intlCities.includes(value) ? value : ""} onValueChange={selectCity} disabled={!selectedCountry}>
            <SelectTrigger className="text-sm">
              <SelectValue placeholder={selectedCountry ? "选择城市" : "先选国家"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {intlCities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selected city display */}
      {value && (
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{value}</span>
          {locationLabel && <span className="text-xs text-muted-foreground">{locationLabel}</span>}
          <button onClick={() => onChange("")} className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CityPicker;
