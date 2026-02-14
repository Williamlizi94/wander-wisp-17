import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, Clock, Sparkles, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { saveItinerary } from "@/lib/itineraryStorage";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { TravelForm } from "@/data/mockItinerary";
import CityPicker from "@/components/CityPicker";
import LangToggle from "@/components/LangToggle";
import heroImage from "@/assets/hero-travel.jpg";

const BUDGET_KEYS = [
  { labelKey: "budgetLow" as const, rangeKey: "budgetLowRange" as const, value: "low" },
  { labelKey: "budgetEconomy" as const, rangeKey: "budgetEconomyRange" as const, value: "economy" },
  { labelKey: "budgetMid" as const, rangeKey: "budgetMidRange" as const, value: "mid" },
  { labelKey: "budgetHigh" as const, rangeKey: "budgetHighRange" as const, value: "high" },
  { labelKey: "budgetPremium" as const, rangeKey: "budgetPremiumRange" as const, value: "premium" },
  { labelKey: "budgetLuxury" as const, rangeKey: "budgetLuxuryRange" as const, value: "luxury" },
];

const GROUP_KEYS = [
  { labelKey: "solo" as const, descKey: "soloDesc" as const, value: "solo" },
  { labelKey: "couple" as const, descKey: "coupleDesc" as const, value: "couple" },
  { labelKey: "family" as const, descKey: "familyDesc" as const, value: "family" },
  { labelKey: "friends" as const, descKey: "friendsDesc" as const, value: "friends" },
];

const PREF_KEYS = [
  { labelKey: "prefFood" as const, value: "美食" },
  { labelKey: "prefCulture" as const, value: "人文" },
  { labelKey: "prefNature" as const, value: "自然" },
  { labelKey: "prefPhoto" as const, value: "拍照" },
  { labelKey: "prefKids" as const, value: "亲子" },
  { labelKey: "prefIntense" as const, value: "特种兵" },
  { labelKey: "prefRelax" as const, value: "松弛" },
  { labelKey: "prefDrive" as const, value: "自驾" },
];

const TIME_OPTIONS = [
  "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00",
  "08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00",
  "16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00",
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, lang } = useI18n();
  const [form, setForm] = useState<TravelForm>({
    city: "",
    startDate: undefined,
    endDate: undefined,
    arrivalTime: "",
    departureTime: "",
    budget: "mid",
    preferences: [],
    groupType: "solo",
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

  const handleGenerate = async () => {
    if (!form.city) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-itinerary", {
        body: {
          city: form.city,
          startDate: form.startDate?.toISOString(),
          endDate: form.endDate?.toISOString(),
          arrivalTime: form.arrivalTime,
          departureTime: form.departureTime,
          budget: form.budget,
          preferences: form.preferences,
          groupType: form.groupType,
          lang,
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: t("generateFailed"), description: data.error, variant: "destructive" });
        return;
      }
      const savedId = saveItinerary(data);
      navigate("/itinerary", { state: { itinerary: data, savedId } });
    } catch (err: any) {
      console.error("Generate error:", err);
      toast({ title: t("generateError"), description: err?.message || t("retryLater"), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const dateLocale = lang === "zh" ? zhCN : undefined;
  const formatDate = (d: Date) => lang === "zh"
    ? format(d, "MM月dd日", { locale: zhCN })
    : format(d, "MMM d");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <LangToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/history")}
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <History className="h-4 w-4 mr-1" />
            {t("myItineraries")}
          </Button>
        </div>
        <img src={heroImage} alt="Travel" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-background" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
            {t("heroTitle")}
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl max-w-md drop-shadow">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 -mt-10 relative z-10 pb-16">
        <div className="glass-card rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("targetCity")}</label>
            <CityPicker value={form.city} onChange={(city) => setForm(prev => ({ ...prev, city }))} />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("startDate")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !form.startDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.startDate ? formatDate(form.startDate) : t("selectDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={form.startDate} onSelect={(d) => setForm(prev => ({ ...prev, startDate: d }))} disabled={(date) => date < new Date()} className="pointer-events-auto" locale={dateLocale} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("endDate")}</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !form.endDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.endDate ? formatDate(form.endDate) : t("selectDate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={form.endDate} onSelect={(d) => setForm(prev => ({ ...prev, endDate: d }))} disabled={(date) => date < (form.startDate || new Date())} className="pointer-events-auto" locale={dateLocale} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Arrival & Departure */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("arrivalTime")}</label>
              <Select value={form.arrivalTime} onValueChange={(v) => setForm(prev => ({ ...prev, arrivalTime: v }))}>
                <SelectTrigger className={cn(!form.arrivalTime && "text-muted-foreground")}>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t("selectTime")} />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t("departureTime")}</label>
              <Select value={form.departureTime} onValueChange={(v) => setForm(prev => ({ ...prev, departureTime: v }))}>
                <SelectTrigger className={cn(!form.departureTime && "text-muted-foreground")}>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder={t("selectTime")} />
                </SelectTrigger>
                <SelectContent>
                  {TIME_OPTIONS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Group */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("groupType")}</label>
            <div className="grid grid-cols-2 gap-2">
              {GROUP_KEYS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(prev => ({ ...prev, groupType: opt.value }))}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all text-sm",
                    form.groupType === opt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <span className="font-medium text-foreground">{t(opt.labelKey)}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{t(opt.descKey)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("budgetRange")}</label>
            <div className="grid grid-cols-3 gap-2">
              {BUDGET_KEYS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(prev => ({ ...prev, budget: opt.value }))}
                  className={cn(
                    "rounded-lg border p-3 text-left transition-all text-sm",
                    form.budget === opt.value ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/40"
                  )}
                >
                  <span className="font-medium text-foreground">{t(opt.labelKey)}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{t(opt.rangeKey)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{t("preferences")}</label>
            <div className="flex flex-wrap gap-2">
              {PREF_KEYS.map(tag => (
                <button
                  key={tag.value}
                  onClick={() => togglePreference(tag.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm border transition-all",
                    form.preferences.includes(tag.value) ? "border-primary bg-primary/10 text-primary font-medium" : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {t(tag.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!form.city || loading}
            className="w-full travel-gradient text-primary-foreground h-12 text-base font-semibold shadow-lg hover:opacity-90 transition-opacity"
            size="lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                {t("generating")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {t("generate")}
              </span>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">{t("aiNote")}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
