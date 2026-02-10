import { Cloud, Droplets, Umbrella } from "lucide-react";

interface WeatherBarProps {
  icon: string;
  tempRange: string;
  rainChance: number;
  suggestion: string;
}

const WeatherBar = ({ icon, tempRange, rainChance, suggestion }: WeatherBarProps) => {
  const bgClass = rainChance > 50 ? "bg-travel-rain" : "bg-travel-sky";
  const textClass = rainChance > 50 ? "text-travel-rain-foreground" : "text-travel-sky-foreground";

  return (
    <div className={`${bgClass} ${textClass} rounded-lg px-4 py-3 flex flex-wrap items-center gap-4 text-sm`}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{tempRange}</span>
      <span className="flex items-center gap-1">
        <Droplets className="h-3.5 w-3.5" />
        降雨 {rainChance}%
      </span>
      <span className="flex items-center gap-1 ml-auto">
        {rainChance > 50 ? <Umbrella className="h-3.5 w-3.5" /> : <Cloud className="h-3.5 w-3.5" />}
        {suggestion}
      </span>
    </div>
  );
};

export default WeatherBar;
