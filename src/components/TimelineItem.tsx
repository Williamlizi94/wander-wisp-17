import { Clock, MapPin } from "lucide-react";

interface TimelineItemProps {
  time: string;
  place: string;
  type: string;
  duration: string;
  suggestArrival?: string;
  description: string;
  isLast?: boolean;
}

const TimelineItem = ({ time, place, type, duration, suggestArrival, description, isLast }: TimelineItemProps) => {
  const timeColors: Record<string, string> = {
    "上午": "bg-travel-sunset text-travel-sunset-foreground",
    "下午": "bg-travel-sage text-travel-sage-foreground",
    "晚上": "bg-primary/10 text-primary",
  };

  return (
    <div className="flex gap-4">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-primary mt-1.5 shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-border mt-1" />}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${timeColors[time] || "bg-muted text-muted-foreground"}`}>
            {time}
          </span>
          <h4 className="font-semibold text-foreground">{place}</h4>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{type}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            预计 {duration}
          </span>
          {suggestArrival && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              建议 {suggestArrival} 到达
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
