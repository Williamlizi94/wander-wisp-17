export interface ItineraryDay {
  day: number;
  date: string;
  weather: {
    icon: string;
    tempRange: string;
    rainChance: number;
    suggestion: string;
  };
  schedule: {
    time: "上午" | "下午" | "晚上";
    place: string;
    type: string;
    duration: string;
    suggestArrival?: string;
    description: string;
  }[];
  food: {
    name: string;
    area: string;
    type: string;
  }[];
  transport: {
    main: string;
    reason: string;
    backup?: string;
  };
  planB: string;
}

export interface HotelRecommendation {
  area: string;
  price: string;
  reason: string;
  tags?: string[];
}

export interface Itinerary {
  city: string;
  dateRange: string;
  budget: string;
  summary: string;
  hotels?: HotelRecommendation[];
  days: ItineraryDay[];
}

export interface TravelForm {
  city: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  arrivalTime: string;
  departureTime: string;
  budget: string;
  preferences: string[];
  groupType: string;
}

export const GROUP_OPTIONS = [
  { label: "🧍 单人", value: "solo", desc: "一个人的自由之旅" },
  { label: "💑 情侣", value: "couple", desc: "浪漫二人世界" },
  { label: "👨‍👩‍👧‍👦 家庭", value: "family", desc: "带娃亲子出行" },
  { label: "👫 朋友团", value: "friends", desc: "好友结伴同行" },
];

export const CITIES = [
  "北京", "上海", "成都", "西安", "杭州", "南京", "重庆",
  "厦门", "大理", "丽江", "长沙", "武汉", "广州", "深圳",
  "青岛", "苏州", "桂林", "昆明", "哈尔滨", "三亚",
];

export const BUDGET_OPTIONS = [
  { label: "穷游模式", value: "low", range: "< 500元/天" },
  { label: "经济实惠", value: "economy", range: "500–1000元/天" },
  { label: "舒适出行", value: "mid", range: "1000–2000元/天" },
  { label: "品质旅行", value: "high", range: "2000–3000元/天" },
  { label: "轻奢体验", value: "premium", range: "3000–5000元/天" },
  { label: "奢华之旅", value: "luxury", range: "> 5000元/天" },
];

export const PREFERENCE_TAGS = [
  { label: "🍜 美食", value: "美食" },
  { label: "🏛️ 人文", value: "人文" },
  { label: "🌿 自然", value: "自然" },
  { label: "📸 拍照", value: "拍照" },
  { label: "👨‍👩‍👧 亲子", value: "亲子" },
  { label: "⚡ 特种兵", value: "特种兵" },
  { label: "🧘 松弛", value: "松弛" },
];

export function generateMockItinerary(form: TravelForm): Itinerary {
  const dayCount = form.startDate && form.endDate
    ? Math.ceil((form.endDate.getTime() - form.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 3;

  const cityData: Record<string, ItineraryDay[]> = {
    "成都": [
      {
        day: 1, date: "", weather: { icon: "⛅", tempRange: "12–18°C", rainChance: 20, suggestion: "薄外套，备伞" },
        schedule: [
          { time: "上午", place: "武侯祠", type: "历史古迹", duration: "2小时", suggestArrival: "9:00", description: "三国文化圣地，感受诸葛亮的智慧" },
          { time: "下午", place: "锦里古街", type: "文化街区", duration: "3小时", description: "紧邻武侯祠，古色古香的商业街，各种小吃" },
          { time: "晚上", place: "九眼桥", type: "酒吧街/夜景", duration: "2小时", description: "成都夜生活地标，河边散步氛围极好" },
        ],
        food: [
          { name: "钟水饺", area: "锦里附近", type: "传统小吃" },
          { name: "甜水面", area: "锦里古街", type: "特色面食" },
          { name: "兔头", area: "玉林路", type: "成都特色" },
        ],
        transport: { main: "地铁 + 步行", reason: "武侯祠/锦里片区集中，地铁3号线直达", backup: "打车约15元" },
        planB: "下雨可改去成都博物馆（天府广场旁，免费），或方所书店喝咖啡",
      },
      {
        day: 2, date: "", weather: { icon: "🌤", tempRange: "14–22°C", rainChance: 10, suggestion: "适合户外，注意防晒" },
        schedule: [
          { time: "上午", place: "大熊猫繁育研究基地", type: "自然/动物", duration: "3小时", suggestArrival: "8:00", description: "一定要早去！上午熊猫活跃，下午基本都在睡觉" },
          { time: "下午", place: "人民公园", type: "城市公园", duration: "2小时", description: "喝盖碗茶、看大爷下棋，体验地道成都慢生活" },
          { time: "晚上", place: "建设路小吃街", type: "美食街", duration: "2.5小时", description: "成都大学旁的宝藏小吃街，学生价超实惠" },
        ],
        food: [
          { name: "蛋烘糕", area: "建设路", type: "街头小吃" },
          { name: "冰粉", area: "人民公园附近", type: "甜品" },
          { name: "串串香", area: "建设路", type: "特色火锅" },
        ],
        transport: { main: "地铁 + 景区摆渡车", reason: "熊猫基地有摆渡车，市区回程坐地铁3号线", backup: "打车约40元" },
        planB: "下雨改去太古里 IFS 逛街 + 看爬楼熊猫",
      },
      {
        day: 3, date: "", weather: { icon: "🌧", tempRange: "10–15°C", rainChance: 70, suggestion: "带伞，穿防水鞋" },
        schedule: [
          { time: "上午", place: "宽窄巷子", type: "文化街区", duration: "2小时", suggestArrival: "9:30", description: "清代古街区，三条平行巷子各有特色" },
          { time: "下午", place: "杜甫草堂", type: "历史古迹", duration: "2小时", description: "诗圣故居，竹林幽静，雨天别有韵味" },
          { time: "晚上", place: "火锅", type: "美食体验", duration: "2小时", description: "成都必体验！推荐小龙坎、蜀大侠或电台巷" },
        ],
        food: [
          { name: "三大炮", area: "宽窄巷子", type: "传统小吃" },
          { name: "龙抄手", area: "春熙路", type: "经典名吃" },
          { name: "火锅", area: "电台巷/玉林路", type: "必吃体验" },
        ],
        transport: { main: "打车", reason: "雨天打车更方便，景点间距离适中", backup: "地铁2/4号线" },
        planB: "已包含室内活动，雨天正合适",
      },
    ],
  };

  const defaultDay: ItineraryDay = {
    day: 1, date: "", weather: { icon: "🌤", tempRange: "15–25°C", rainChance: 15, suggestion: "舒适出行" },
    schedule: [
      { time: "上午", place: "市中心地标景点", type: "打卡", duration: "2小时", description: "先去最标志性的景点" },
      { time: "下午", place: "历史文化街区", type: "文化", duration: "3小时", description: "漫步老街感受城市底蕴" },
      { time: "晚上", place: "当地夜市", type: "美食/夜生活", duration: "2小时", description: "品尝地道夜市小吃" },
    ],
    food: [
      { name: "当地特色小吃", area: "老城区", type: "必吃" },
      { name: "地方名菜", area: "美食街", type: "正餐" },
    ],
    transport: { main: "地铁 + 步行", reason: "市区内最方便", backup: "打车" },
    planB: "可去当地博物馆或商场",
  };

  const baseDays = cityData[form.city] || [defaultDay, defaultDay, defaultDay];
  const days: ItineraryDay[] = [];

  for (let i = 0; i < Math.min(dayCount, 5); i++) {
    const base = baseDays[i % baseDays.length];
    const date = form.startDate
      ? new Date(form.startDate.getTime() + i * 86400000).toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "short" })
      : `第${i + 1}天`;
    days.push({ ...base, day: i + 1, date });
  }

  const budgetLabel = BUDGET_OPTIONS.find(b => b.value === form.budget)?.label || "舒适出行";

  return {
    city: form.city || "成都",
    dateRange: form.startDate && form.endDate
      ? `${form.startDate.toLocaleDateString("zh-CN")} – ${form.endDate.toLocaleDateString("zh-CN")}`
      : "3天2晚",
    budget: budgetLabel,
    summary: `${form.city || "成都"}${dayCount}天${budgetLabel}之旅。建议节奏适中，上午打卡景点，下午慢逛街区，晚上享受美食夜生活。总预算建议控制在${BUDGET_OPTIONS.find(b => b.value === form.budget)?.range || "1000-3000元/天"}。`,
    days,
  };
}
