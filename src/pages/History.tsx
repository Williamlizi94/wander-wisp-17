import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Clock, MapPin, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getAllItineraries,
  toggleFavorite,
  deleteItinerary,
  type SavedItinerary,
} from "@/lib/itineraryStorage";

const History = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<SavedItinerary[]>([]);
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  useEffect(() => {
    setItems(getAllItineraries());
  }, []);

  const displayed = filter === "favorites" ? items.filter((i) => i.isFavorite) : items;

  const handleToggleFav = (id: string) => {
    toggleFavorite(id);
    setItems(getAllItineraries());
  };

  const handleDelete = (id: string) => {
    deleteItinerary(id);
    setItems(getAllItineraries());
  };

  const handleOpen = (item: SavedItinerary) => {
    navigate("/itinerary", { state: { itinerary: item.itinerary, savedId: item.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="travel-gradient text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回首页
          </Button>
          <h1 className="font-display text-3xl font-bold">我的攻略</h1>
          <p className="text-primary-foreground/80 mt-1">查看历史记录和收藏的攻略</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm border transition-all",
              filter === "all"
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border text-muted-foreground hover:border-primary/40"
            )}
          >
            <Clock className="inline h-4 w-4 mr-1" />
            全部记录 ({items.length})
          </button>
          <button
            onClick={() => setFilter("favorites")}
            className={cn(
              "rounded-full px-4 py-2 text-sm border transition-all",
              filter === "favorites"
                ? "border-primary bg-primary/10 text-primary font-medium"
                : "border-border text-muted-foreground hover:border-primary/40"
            )}
          >
            <Heart className="inline h-4 w-4 mr-1" />
            收藏 ({items.filter((i) => i.isFavorite).length})
          </button>
        </div>

        {displayed.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              {filter === "favorites" ? "还没有收藏的攻略" : "还没有生成过攻略"}
            </p>
            <Button onClick={() => navigate("/")} variant="outline">
              去生成攻略
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {displayed.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all cursor-pointer"
                onClick={() => handleOpen(item)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg">
                      {item.itinerary.city}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.itinerary.dateRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.itinerary.days.length}天
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {item.itinerary.summary}
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {new Date(item.createdAt).toLocaleDateString("zh-CN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFav(item.id);
                      }}
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          item.isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        )}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
