import { useState, useMemo, useRef, useEffect } from "react";
import { Search, MapPin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  HOT_CITIES_GLOBAL,
  searchCities,
  getAllRegions,
  getCountriesByRegion,
  getCitiesByCountry,
  findCityInfo,
} from "@/data/worldCities";

interface CityPickerProps {
  value: string;
  onChange: (city: string) => void;
}

const CityPicker = ({ value, onChange }: CityPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const regions = getAllRegions();
  const countries = selectedRegion ? getCountriesByRegion(selectedRegion) : [];
  const cities = selectedRegion && selectedCountry ? getCitiesByCountry(selectedRegion, selectedCountry) : [];

  const searchResults = useMemo(() => {
    return searchCities(searchQuery);
  }, [searchQuery]);

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

  const cityInfo = value ? findCityInfo(value) : null;

  return (
    <div className="space-y-3">
      {/* Search bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            placeholder="搜索城市或国家..."
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
            {searchResults.length > 0 ? (
              searchResults.map(({ city, country, region }) => (
                <button
                  key={`${region}-${country}-${city}`}
                  onClick={() => selectCity(city)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-accent transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{city}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{country} · {region}</span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-muted-foreground text-center">
                未找到匹配城市，你也可以直接输入城市名后按回车
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hot cities */}
      <div>
        <span className="text-xs text-muted-foreground mr-2">🔥 热门：</span>
        <div className="inline-flex flex-wrap gap-1.5 mt-1">
          {HOT_CITIES_GLOBAL.map(city => (
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

      {/* Region → Country → City selectors */}
      <div className="grid grid-cols-3 gap-2">
        <Select
          value={selectedRegion}
          onValueChange={(v) => {
            setSelectedRegion(v);
            setSelectedCountry("");
          }}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder="选择地区" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {regions.map(r => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedCountry}
          onValueChange={(v) => setSelectedCountry(v)}
          disabled={!selectedRegion}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder={selectedRegion ? "选择国家" : "先选地区"} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {countries.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={cities.includes(value) ? value : ""}
          onValueChange={selectCity}
          disabled={!selectedCountry}
        >
          <SelectTrigger className="text-sm">
            <SelectValue placeholder={selectedCountry ? "选择城市" : "先选国家"} />
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
          {cityInfo && (
            <span className="text-xs text-muted-foreground">{cityInfo.country} · {cityInfo.region}</span>
          )}
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
