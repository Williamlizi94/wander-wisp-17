import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Wallet, Sparkles, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";
import DayCard from "@/components/DayCard";
import type { Itinerary } from "@/data/mockItinerary";

const ItineraryResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itinerary = location.state?.itinerary as Itinerary | undefined;

  if (!itinerary) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="travel-gradient text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            重新规划
          </Button>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {itinerary.city}旅行攻略
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-primary-foreground/80 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {itinerary.dateRange}
            </span>
            <span className="flex items-center gap-1.5">
              <Wallet className="h-4 w-4" />
              {itinerary.budget}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {itinerary.days.length}天行程
            </span>
          </div>

          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-4 flex gap-3">
            <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">{itinerary.summary}</p>
          </div>
        </div>
      </div>

      {/* Hotel Recommendations */}
      {itinerary.hotels && itinerary.hotels.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 pt-8">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
            <Hotel className="h-5 w-5 text-primary" />
            推荐住宿区域
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {itinerary.hotels.map((hotel, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4 space-y-2">
                <div className="font-medium text-foreground">{hotel.area}</div>
                {hotel.tags && hotel.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hotel.tags.map((tag, j) => (
                      <span key={j} className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="text-sm font-semibold text-primary">{hotel.price}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{hotel.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day Cards */}
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {itinerary.days.map((day) => (
          <DayCard key={day.day} data={day} defaultOpen={day.day === 1} />
        ))}
      </div>

      {/* Footer */}
      <div className="max-w-3xl mx-auto px-4 pb-12 text-center">
        <p className="text-sm text-muted-foreground mb-4">攻略由 AI 生成，仅供参考 ✨</p>
        <Button onClick={() => navigate("/")} variant="outline" size="lg">
          规划新的旅行
        </Button>
      </div>
    </div>
  );
};

export default ItineraryResult;
