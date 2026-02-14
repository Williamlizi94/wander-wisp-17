import { useState } from "react";
import { ChevronDown, UtensilsCrossed, Bus, CloudRain } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { ItineraryDay } from "@/data/mockItinerary";
import WeatherBar from "./WeatherBar";
import TimelineItem from "./TimelineItem";

interface DayCardProps {
  data: ItineraryDay;
  defaultOpen?: boolean;
}

const DayCard = ({ data, defaultOpen = false }: DayCardProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const { t } = useI18n();

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="travel-gradient text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg shrink-0">
            {data.day}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Day {data.day}</h3>
            <p className="text-sm text-muted-foreground">{data.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {data.weather.icon} {data.weather.tempRange}
          </span>
          <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", open && "rotate-180")} />
        </div>
      </button>

      {open && (
        <div className="px-4 md:px-5 pb-5 space-y-5 animate-in slide-in-from-top-2 duration-200">
          <WeatherBar {...data.weather} />

          <div>
            <h4 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">{t("schedule")}</h4>
            <div>
              {data.schedule.map((item, i) => (
                <TimelineItem key={i} {...item} isLast={i === data.schedule.length - 1} />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              {t("todayFood")}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {data.food.map((f, i) => (
                <div key={i} className="bg-travel-sunset rounded-lg p-3">
                  <p className="font-medium text-travel-sunset-foreground text-sm">{f.name}</p>
                  <p className="text-xs text-travel-sunset-foreground/70">{f.area} · {f.type}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <Bus className="h-4 w-4" />
              {t("transport")}
            </h4>
            <div className="bg-travel-sage rounded-lg p-3">
              <p className="font-medium text-travel-sage-foreground text-sm">
                {t("recommended")}{data.transport.main}
              </p>
              <p className="text-xs text-travel-sage-foreground/70 mt-1">{data.transport.reason}</p>
              {data.transport.backup && (
                <p className="text-xs text-travel-sage-foreground/70 mt-1">{t("backup")}{data.transport.backup}</p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
              <CloudRain className="h-4 w-4" />
              {t("planB")}
            </h4>
            <div className="bg-travel-rain rounded-lg p-3">
              <p className="text-sm text-travel-rain-foreground">{data.planB}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
