import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "zh";

const translations = {
  // Index page
  heroTitle: { en: "Global Travel Planner", zh: "全球旅行攻略生成器" },
  heroSubtitle: { en: "Tell us where you want to go, AI plans every day for you", zh: "全球任意城市，AI 帮你规划每一天" },
  myItineraries: { en: "My Trips", zh: "我的攻略" },
  targetCity: { en: "📍 Destination", zh: "📍 目标城市" },
  startDate: { en: "Start Date", zh: "出发日期" },
  endDate: { en: "End Date", zh: "结束日期" },
  selectDate: { en: "Select date", zh: "选择日期" },
  arrivalTime: { en: "🕐 Arrival (optional)", zh: "🕐 到达时间（可选）" },
  departureTime: { en: "🕐 Departure (optional)", zh: "🕐 离开时间（可选）" },
  selectTime: { en: "Select time", zh: "选择时间" },
  groupType: { en: "Travel Group", zh: "出行人群" },
  budgetRange: { en: "Budget Range", zh: "预算区间" },
  preferences: { en: "Preferences (optional)", zh: "旅行偏好（可选）" },
  generate: { en: "Generate Itinerary", zh: "生成攻略" },
  generating: { en: "AI is generating...", zh: "AI 正在生成攻略..." },
  aiNote: { en: "AI-powered, usually takes 10-20 seconds", zh: "由 AI 智能生成，通常需要 10-20 秒" },
  generateFailed: { en: "Generation Failed", zh: "生成失败" },
  generateError: { en: "Failed to generate itinerary", zh: "生成攻略失败" },
  retryLater: { en: "Please try again later", zh: "请稍后重试" },

  // CityPicker
  searchPlaceholder: { en: "Search any city worldwide...", zh: "搜索全球任意城市..." },
  hot: { en: "🔥 Popular:", zh: "🔥 热门：" },
  noMatch: { en: "No matching city found", zh: "未找到匹配城市" },
  tabUS: { en: "USA", zh: "美国" },
  tabChina: { en: "China", zh: "中国" },
  tabIntl: { en: "International", zh: "国际" },
  selectState: { en: "Select state", zh: "选择州" },
  selectProvince: { en: "Select province", zh: "选择省份" },
  selectCountry: { en: "Select country", zh: "选择国家" },
  selectCity: { en: "Select city", zh: "选择城市" },
  firstState: { en: "State first", zh: "先选州" },
  firstProvince: { en: "Province first", zh: "先选省份" },
  firstCountry: { en: "Country first", zh: "先选国家" },

  // Itinerary Result
  replan: { en: "Re-plan", zh: "重新规划" },
  favorited: { en: "Saved", zh: "已收藏" },
  favorite: { en: "Save", zh: "收藏" },
  travelItinerary: { en: "Travel Itinerary", zh: "旅行攻略" },
  dayTrip: { en: "-day trip", zh: "天行程" },
  hotelAreas: { en: "Recommended Lodging Areas", zh: "推荐住宿区域" },
  aiDisclaimer: { en: "AI-generated, for reference only ✨", zh: "攻略由 AI 生成，仅供参考 ✨" },
  planNewTrip: { en: "Plan a New Trip", zh: "规划新的旅行" },

  // DayCard
  schedule: { en: "SCHEDULE", zh: "行程安排" },
  todayFood: { en: "TODAY'S FOOD", zh: "今日美食" },
  transport: { en: "TRANSPORT", zh: "交通建议" },
  recommended: { en: "Recommended: ", zh: "推荐：" },
  backup: { en: "Backup: ", zh: "备选：" },
  planB: { en: "PLAN B (RAINY DAY)", zh: "Plan B（雨天备案）" },

  // WeatherBar
  rain: { en: "Rain ", zh: "降雨 " },

  // TimelineItem
  estimated: { en: "Est. ", zh: "预计 " },
  suggestArrive: { en: "Arrive by ", zh: "建议 " },
  suggestArriveEnd: { en: "", zh: " 到达" },

  // History
  backHome: { en: "Back", zh: "返回首页" },
  myTrips: { en: "My Trips", zh: "我的攻略" },
  historySubtitle: { en: "View history and saved itineraries", zh: "查看历史记录和收藏的攻略" },
  allRecords: { en: "All Records", zh: "全部记录" },
  favorites: { en: "Saved", zh: "收藏" },
  noFavorites: { en: "No saved itineraries yet", zh: "还没有收藏的攻略" },
  noHistory: { en: "No itineraries generated yet", zh: "还没有生成过攻略" },
  goGenerate: { en: "Generate One", zh: "去生成攻略" },
  days: { en: " days", zh: "天" },

  // Group options
  solo: { en: "🧍 Solo", zh: "🧍 单人" },
  soloDesc: { en: "Free solo adventure", zh: "一个人的自由之旅" },
  couple: { en: "💑 Couple", zh: "💑 情侣" },
  coupleDesc: { en: "Romantic getaway", zh: "浪漫二人世界" },
  family: { en: "👨‍👩‍👧‍👦 Family", zh: "👨‍👩‍👧‍👦 家庭" },
  familyDesc: { en: "Kid-friendly trip", zh: "带娃亲子出行" },
  friends: { en: "👫 Friends", zh: "👫 朋友团" },
  friendsDesc: { en: "Group adventure", zh: "好友结伴同行" },

  // Budget options
  budgetLow: { en: "Budget", zh: "穷游模式" },
  budgetLowRange: { en: "< $70/day", zh: "< 500元/天" },
  budgetEconomy: { en: "Economy", zh: "经济实惠" },
  budgetEconomyRange: { en: "$70–140/day", zh: "500–1000元/天" },
  budgetMid: { en: "Comfortable", zh: "舒适出行" },
  budgetMidRange: { en: "$140–280/day", zh: "1000–2000元/天" },
  budgetHigh: { en: "Premium", zh: "品质旅行" },
  budgetHighRange: { en: "$280–420/day", zh: "2000–3000元/天" },
  budgetPremium: { en: "Luxury Lite", zh: "轻奢体验" },
  budgetPremiumRange: { en: "$420–700/day", zh: "3000–5000元/天" },
  budgetLuxury: { en: "Luxury", zh: "奢华之旅" },
  budgetLuxuryRange: { en: "> $700/day", zh: "> 5000元/天" },

  // Preferences
  prefFood: { en: "🍜 Food", zh: "🍜 美食" },
  prefCulture: { en: "🏛️ Culture", zh: "🏛️ 人文" },
  prefNature: { en: "🌿 Nature", zh: "🌿 自然" },
  prefPhoto: { en: "📸 Photography", zh: "📸 拍照" },
  prefKids: { en: "👨‍👩‍👧 Family", zh: "👨‍👩‍👧 亲子" },
  prefIntense: { en: "⚡ Intensive", zh: "⚡ 特种兵" },
  prefRelax: { en: "🧘 Relax", zh: "🧘 松弛" },
  prefDrive: { en: "🚗 Road Trip", zh: "🚗 自驾" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("app-lang");
    return (saved === "zh" || saved === "en") ? saved : "en";
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    return translations[key]?.[lang] || key;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
