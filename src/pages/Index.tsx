import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIES, BUDGET_OPTIONS, PREFERENCE_TAGS, generateMockItinerary } from "@/data/mockItinerary";
import type { TravelForm } from "@/data/mockItinerary";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TravelForm>({
    city: "",
    startDate: undefined,
    endDate: undefined,
    budget: "mid",
    preferences: [],
  });
  const [loading, setLoading] = useState(false);

  const togglePreference = (value: string) => {
    setForm(prev => ({
      ...prev,
      preferences: prev.preferences.includes(value)
        ? prev.preferences.filter(p => p !== value)
        : [...prev.preferences, value],
    }));
  };

  const handleGenerate = () => {
    if (!form.city) return;
    setLoading(true);
    setTimeout(() => {
      const itinerary = generateMockItinerary(form);
      navigate("/itinerary", { state: { itinerary } });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img src={heroImage} alt="旅行" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
            旅行攻略生成器
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-md drop-shadow">
            告诉我你想去哪，AI 帮你规划每一天
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 -mt-10 relative z-10 pb-16">
        <div className="glass-card rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          {/* City */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              <MapPin className="inline h-4 w-4 mr-1 text-primary" />
              目标城市
            </label>
            <Select value={form.city} onValueChange={(v) => setForm(prev => ({ ...prev, city: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择你想去的城市" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">出发日期</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !form.startDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.startDate ? format(form.startDate, "MM月dd日", { locale: zhCN }) : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.startDate}
                    onSelect={(d) => setForm(prev => ({ ...prev, startDate: d }))}
                    disabled={(date) => date < new Date()}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">结束日期</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !form.endDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.endDate ? format(form.endDate, "MM月dd日", { locale: zhCN }) : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={form.endDate}
                    onSelect={(d) => setForm(prev => ({ ...prev, endDate: d }))}
                    disabled={(date) => date < (form.startDate || new Date())}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">预算区间</label>
            <div className="grid grid-cols-2 gap-2">
              {BUDGET_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(prev => ({ ...prev, budget: opt.value }))}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all text-sm",
                    form.budget === opt.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <span className="font-medium text-foreground">{opt.label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{opt.range}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">旅行偏好（可选）</label>
            <div className="flex flex-wrap gap-2">
              {PREFERENCE_TAGS.map(tag => (
                <button
                  key={tag.value}
                  onClick={() => togglePreference(tag.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm border transition-all",
                    form.preferences.includes(tag.value)
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleGenerate}
            disabled={!form.city || loading}
            className="w-full travel-gradient text-primary-foreground h-12 text-base font-semibold shadow-lg hover:opacity-90 transition-opacity"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                正在生成攻略...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                生成攻略
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
