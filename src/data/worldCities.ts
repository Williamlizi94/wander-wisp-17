import type { Lang } from "@/lib/i18n";

// ============ Bilingual name map (zh → en) ============
const NAME_EN: Record<string, string> = {
  // US States
  "加利福尼亚州": "California", "纽约州": "New York", "佛罗里达州": "Florida",
  "内华达州": "Nevada", "华盛顿州": "Washington", "马萨诸塞州": "Massachusetts",
  "伊利诺伊州": "Illinois", "德克萨斯州": "Texas", "亚利桑那州": "Arizona",
  "科罗拉多州": "Colorado", "犹他州": "Utah", "怀俄明州": "Wyoming",
  "蒙大拿州": "Montana", "俄勒冈州": "Oregon", "宾夕法尼亚州": "Pennsylvania",
  "路易斯安那州": "Louisiana", "田纳西州": "Tennessee", "乔治亚州": "Georgia",
  "南卡罗来纳州": "South Carolina", "新墨西哥州": "New Mexico", "密歇根州": "Michigan",
  "明尼苏达州": "Minnesota", "密苏里州": "Missouri", "哥伦比亚特区": "Washington D.C.",
  "夏威夷州": "Hawaii", "阿拉斯加州": "Alaska", "缅因州": "Maine",
  // US Cities
  "纽约": "New York", "洛杉矶": "Los Angeles", "旧金山": "San Francisco",
  "拉斯维加斯": "Las Vegas", "夏威夷": "Hawaii", "华盛顿": "Washington D.C.",
  "芝加哥": "Chicago", "迈阿密": "Miami", "西雅图": "Seattle", "波士顿": "Boston",
  "奥兰多": "Orlando", "圣地亚哥": "San Diego", "休斯顿": "Houston",
  "达拉斯": "Dallas", "丹佛": "Denver", "费城": "Philadelphia",
  "菲尼克斯": "Phoenix", "波特兰": "Portland", "纳什维尔": "Nashville",
  "新奥尔良": "New Orleans", "亚特兰大": "Atlanta", "底特律": "Detroit",
  "盐湖城": "Salt Lake City", "圣安东尼奥": "San Antonio", "匹兹堡": "Pittsburgh",
  "明尼阿波利斯": "Minneapolis", "堪萨斯城": "Kansas City", "奥斯汀": "Austin",
  "棕榈泉": "Palm Springs", "纳帕谷": "Napa Valley", "查尔斯顿": "Charleston",
  "萨凡纳": "Savannah", "圣塔菲": "Santa Fe", "基韦斯特": "Key West",
  "阿尔伯克基": "Albuquerque", "圣路易斯": "St. Louis", "里诺": "Reno",
  "奥林匹亚": "Olympia", "坦帕": "Tampa", "迈尔斯堡": "Fort Myers",
  "檀香山": "Honolulu", "安克雷奇": "Anchorage", "费尔班克斯": "Fairbanks",
  "圣塔芭芭拉": "Santa Barbara", "蒙特雷": "Monterey", "孟菲斯": "Memphis",
  "长岛": "Long Island", "伍德斯托克": "Woodstock", "塞多纳": "Sedona",
  "阿斯彭": "Aspen", "杰克逊霍尔": "Jackson Hole",
  // US National Parks & Landmarks
  "黄石公园": "Yellowstone", "大峡谷": "Grand Canyon",
  "优胜美地": "Yosemite", "羚羊谷": "Antelope Canyon", "纪念碑谷": "Monument Valley",
  "拱门国家公园": "Arches NP", "锡安国家公园": "Zion NP",
  "冰川国家公园": "Glacier NP", "大提顿国家公园": "Grand Teton NP",
  "红杉国家公园": "Sequoia NP", "阿卡迪亚国家公园": "Acadia NP",
  "落基山国家公园": "Rocky Mountain NP", "尼亚加拉瀑布": "Niagara Falls",
  "大烟山国家公园": "Great Smoky Mountains", "火山口湖": "Crater Lake",
  "迪纳利国家公园": "Denali NP", "布莱斯峡谷": "Bryce Canyon",
  "一号公路": "Pacific Coast Hwy", "66号公路": "Route 66",
  "阿拉斯加": "Alaska", "关岛": "Guam", "塞班岛": "Saipan",
  "科德角": "Cape Cod", "剑桥": "Cambridge", "毛伊岛": "Maui", "大岛": "Big Island",
  // China Provinces
  "北京市": "Beijing", "上海市": "Shanghai", "天津市": "Tianjin", "重庆市": "Chongqing",
  "广东省": "Guangdong", "浙江省": "Zhejiang", "江苏省": "Jiangsu",
  "四川省": "Sichuan", "云南省": "Yunnan", "福建省": "Fujian",
  "湖南省": "Hunan", "湖北省": "Hubei", "山东省": "Shandong",
  "陕西省": "Shaanxi", "河南省": "Henan", "安徽省": "Anhui",
  "江西省": "Jiangxi", "辽宁省": "Liaoning", "吉林省": "Jilin",
  "黑龙江省": "Heilongjiang", "贵州省": "Guizhou", "广西": "Guangxi",
  "海南省": "Hainan", "甘肃省": "Gansu", "青海省": "Qinghai",
  "西藏": "Tibet", "新疆": "Xinjiang", "内蒙古": "Inner Mongolia",
  "宁夏": "Ningxia", "山西省": "Shanxi", "河北省": "Hebei",
  "香港": "Hong Kong", "澳门": "Macau", "台湾": "Taiwan",
  // China Cities
  "北京": "Beijing", "上海": "Shanghai", "广州": "Guangzhou", "深圳": "Shenzhen",
  "成都": "Chengdu", "重庆": "Chongqing", "杭州": "Hangzhou", "西安": "Xi'an",
  "南京": "Nanjing", "武汉": "Wuhan", "长沙": "Changsha", "苏州": "Suzhou",
  "厦门": "Xiamen", "青岛": "Qingdao", "大连": "Dalian", "哈尔滨": "Harbin",
  "三亚": "Sanya", "丽江": "Lijiang", "大理": "Dali", "拉萨": "Lhasa",
  "桂林": "Guilin", "张家界": "Zhangjiajie", "黄山": "Huangshan",
  "九寨沟": "Jiuzhaigou", "敦煌": "Dunhuang", "洛阳": "Luoyang",
  "开封": "Kaifeng", "昆明": "Kunming", "贵阳": "Guiyang", "兰州": "Lanzhou",
  "乌鲁木齐": "Urumqi", "呼和浩特": "Hohhot", "香格里拉": "Shangri-La",
  "凤凰": "Fenghuang", "乌镇": "Wuzhen", "平遥": "Pingyao", "婺源": "Wuyuan",
  "台北": "Taipei", "高雄": "Kaohsiung", "台中": "Taichung", "台南": "Tainan",
  "花莲": "Hualien", "垦丁": "Kenting", "九份": "Jiufen",
  "宁波": "Ningbo", "温州": "Wenzhou", "绍兴": "Shaoxing", "嘉兴": "Jiaxing",
  "金华": "Jinhua", "舟山": "Zhoushan", "义乌": "Yiwu",
  "无锡": "Wuxi", "常州": "Changzhou", "扬州": "Yangzhou", "南通": "Nantong",
  "镇江": "Zhenjiang", "徐州": "Xuzhou",
  "乐山": "Leshan", "稻城": "Daocheng", "峨眉山": "Mount Emei",
  "都江堰": "Dujiangyan", "甘孜": "Garze", "阿坝": "Aba",
  "西双版纳": "Xishuangbanna", "腾冲": "Tengchong", "泸沽湖": "Lugu Lake",
  "福州": "Fuzhou", "泉州": "Quanzhou", "漳州": "Zhangzhou", "武夷山": "Wuyi Mountain", "平潭": "Pingtan",
  "岳阳": "Yueyang", "衡阳": "Hengyang", "湘西": "Xiangxi",
  "宜昌": "Yichang", "襄阳": "Xiangyang", "恩施": "Enshi", "神农架": "Shennongjia",
  "济南": "Jinan", "烟台": "Yantai", "威海": "Weihai", "泰安": "Tai'an", "曲阜": "Qufu",
  "咸阳": "Xianyang", "延安": "Yan'an", "汉中": "Hanzhong", "华山": "Mount Hua",
  "郑州": "Zhengzhou", "南阳": "Nanyang", "登封": "Dengfeng",
  "合肥": "Hefei", "宣城": "Xuancheng", "池州": "Chizhou", "芜湖": "Wuhu",
  "南昌": "Nanchang", "景德镇": "Jingdezhen", "庐山": "Lushan", "九江": "Jiujiang",
  "沈阳": "Shenyang", "丹东": "Dandong",
  "长春": "Changchun", "延吉": "Yanji", "长白山": "Changbai Mountain",
  "漠河": "Mohe", "牡丹江": "Mudanjiang",
  "遵义": "Zunyi", "黔东南": "Qiandongnan", "荔波": "Libo", "西江千户苗寨": "Xijiang Miao Village",
  "南宁": "Nanning", "北海": "Beihai", "阳朔": "Yangshuo", "涠洲岛": "Weizhou Island",
  "海口": "Haikou", "万宁": "Wanning", "陵水": "Lingshui",
  "张掖": "Zhangye", "嘉峪关": "Jiayuguan",
  "西宁": "Xining", "青海湖": "Qinghai Lake", "茶卡": "Chaka",
  "林芝": "Nyingchi", "日喀则": "Shigatse", "纳木错": "Namtso",
  "喀什": "Kashgar", "伊犁": "Ili", "喀纳斯": "Kanas", "吐鲁番": "Turpan", "赛里木湖": "Sayram Lake",
  "呼伦贝尔": "Hulunbuir", "鄂尔多斯": "Ordos", "阿尔山": "Arxan",
  "银川": "Yinchuan", "中卫": "Zhongwei", "沙坡头": "Shapotou",
  "太原": "Taiyuan", "大同": "Datong",
  "石家庄": "Shijiazhuang", "秦皇岛": "Qinhuangdao", "承德": "Chengde", "张家口": "Zhangjiakou",
  "天津": "Tianjin",
  "珠海": "Zhuhai", "佛山": "Foshan", "东莞": "Dongguan", "惠州": "Huizhou", "中山": "Zhongshan", "汕头": "Shantou", "湛江": "Zhanjiang",
  // International Countries
  "日本": "Japan", "韩国": "South Korea",
  "泰国": "Thailand", "越南": "Vietnam", "新加坡": "Singapore",
  "马来西亚": "Malaysia", "印度尼西亚": "Indonesia", "菲律宾": "Philippines", "柬埔寨": "Cambodia",
  "印度": "India", "斯里兰卡": "Sri Lanka", "尼泊尔": "Nepal", "马尔代夫": "Maldives",
  "阿联酋": "UAE", "土耳其": "Turkey", "以色列": "Israel", "约旦": "Jordan",
  "法国": "France", "英国": "UK", "意大利": "Italy", "西班牙": "Spain",
  "德国": "Germany", "瑞士": "Switzerland", "荷兰": "Netherlands", "希腊": "Greece",
  "葡萄牙": "Portugal", "奥地利": "Austria", "捷克": "Czech Republic", "匈牙利": "Hungary",
  "冰岛": "Iceland", "挪威": "Norway", "芬兰": "Finland", "克罗地亚": "Croatia",
  "俄罗斯": "Russia", "加拿大": "Canada", "墨西哥": "Mexico",
  "巴西": "Brazil", "阿根廷": "Argentina", "秘鲁": "Peru",
  "澳大利亚": "Australia", "新西兰": "New Zealand",
  "埃及": "Egypt", "南非": "South Africa", "肯尼亚": "Kenya", "摩洛哥": "Morocco",
  // International Cities
  "东京": "Tokyo", "大阪": "Osaka", "京都": "Kyoto", "奈良": "Nara",
  "北海道": "Hokkaido", "冲绳": "Okinawa", "名古屋": "Nagoya", "福冈": "Fukuoka",
  "神户": "Kobe", "箱根": "Hakone", "镰仓": "Kamakura", "富士山": "Mt. Fuji",
  "首尔": "Seoul", "釜山": "Busan", "济州岛": "Jeju Island", "仁川": "Incheon", "庆州": "Gyeongju",
  "曼谷": "Bangkok", "清迈": "Chiang Mai", "普吉岛": "Phuket", "芭提雅": "Pattaya",
  "苏梅岛": "Koh Samui", "甲米": "Krabi",
  "河内": "Hanoi", "胡志明市": "Ho Chi Minh City", "岘港": "Da Nang", "会安": "Hoi An",
  "下龙湾": "Ha Long Bay", "芽庄": "Nha Trang",
  "吉隆坡": "Kuala Lumpur", "槟城": "Penang", "兰卡威": "Langkawi",
  "马六甲": "Malacca", "沙巴": "Sabah",
  "巴厘岛": "Bali", "雅加达": "Jakarta", "日惹": "Yogyakarta",
  "马尼拉": "Manila", "长滩岛": "Boracay", "宿雾": "Cebu", "巴拉望": "Palawan",
  "暹粒": "Siem Reap", "金边": "Phnom Penh",
  "新德里": "New Delhi", "孟买": "Mumbai", "阿格拉": "Agra", "斋浦尔": "Jaipur", "瓦拉纳西": "Varanasi",
  "科伦坡": "Colombo", "康提": "Kandy", "加勒": "Galle",
  "加德满都": "Kathmandu", "博卡拉": "Pokhara", "马累": "Malé",
  "迪拜": "Dubai", "阿布扎比": "Abu Dhabi",
  "伊斯坦布尔": "Istanbul", "卡帕多奇亚": "Cappadocia", "安塔利亚": "Antalya", "棉花堡": "Pamukkale",
  "耶路撒冷": "Jerusalem", "特拉维夫": "Tel Aviv",
  "安曼": "Amman", "佩特拉": "Petra", "死海": "Dead Sea",
  "巴黎": "Paris", "尼斯": "Nice", "普罗旺斯": "Provence", "里昂": "Lyon", "马赛": "Marseille",
  "伦敦": "London", "爱丁堡": "Edinburgh", "牛津": "Oxford", "巴斯": "Bath", "曼彻斯特": "Manchester",
  "罗马": "Rome", "佛罗伦萨": "Florence", "威尼斯": "Venice", "米兰": "Milan",
  "那不勒斯": "Naples", "阿马尔菲": "Amalfi", "五渔村": "Cinque Terre",
  "巴塞罗那": "Barcelona", "马德里": "Madrid", "塞维利亚": "Seville", "格拉纳达": "Granada",
  "柏林": "Berlin", "慕尼黑": "Munich", "法兰克福": "Frankfurt", "汉堡": "Hamburg", "海德堡": "Heidelberg",
  "苏黎世": "Zurich", "日内瓦": "Geneva", "卢塞恩": "Lucerne", "因特拉肯": "Interlaken", "少女峰": "Jungfrau",
  "阿姆斯特丹": "Amsterdam", "鹿特丹": "Rotterdam",
  "雅典": "Athens", "圣托里尼": "Santorini", "米科诺斯": "Mykonos",
  "里斯本": "Lisbon", "波尔图": "Porto",
  "维也纳": "Vienna", "萨尔茨堡": "Salzburg",
  "布拉格": "Prague", "CK小镇": "Český Krumlov", "布达佩斯": "Budapest",
  "雷克雅未克": "Reykjavik",
  "奥斯陆": "Oslo", "卑尔根": "Bergen", "特罗姆瑟": "Tromsø",
  "赫尔辛基": "Helsinki", "罗瓦涅米": "Rovaniemi",
  "杜布罗夫尼克": "Dubrovnik", "萨格勒布": "Zagreb",
  "莫斯科": "Moscow", "圣彼得堡": "St. Petersburg",
  "温哥华": "Vancouver", "多伦多": "Toronto", "蒙特利尔": "Montreal",
  "魁北克": "Quebec City", "班夫": "Banff", "渥太华": "Ottawa",
  "墨西哥城": "Mexico City", "坎昆": "Cancún", "瓜纳华托": "Guanajuato",
  "里约热内卢": "Rio de Janeiro", "圣保罗": "São Paulo",
  "布宜诺斯艾利斯": "Buenos Aires", "乌斯怀亚": "Ushuaia", "伊瓜苏": "Iguazú",
  "利马": "Lima", "库斯科": "Cusco", "马丘比丘": "Machu Picchu",
  "悉尼": "Sydney", "墨尔本": "Melbourne", "黄金海岸": "Gold Coast",
  "凯恩斯": "Cairns", "大堡礁": "Great Barrier Reef", "珀斯": "Perth",
  "奥克兰": "Auckland", "皇后镇": "Queenstown", "基督城": "Christchurch",
  "开罗": "Cairo", "卢克索": "Luxor", "红海": "Red Sea",
  "开普敦": "Cape Town", "约翰内斯堡": "Johannesburg",
  "内罗毕": "Nairobi", "马赛马拉": "Masai Mara",
  "马拉喀什": "Marrakech", "卡萨布兰卡": "Casablanca", "菲斯": "Fez", "舍夫沙万": "Chefchaouen",
  "美国": "USA",
};

/** Get the display name for a given Chinese name based on current language */
export function loc(zhName: string, lang: Lang): string {
  if (lang === "zh") return zhName;
  return NAME_EN[zhName] || zhName;
}

// ============ US States & Cities ============
export interface USStateData {
  state: string;
  cities: string[];
}

export const US_STATES: USStateData[] = [
  { state: "加利福尼亚州", cities: ["洛杉矶", "旧金山", "圣地亚哥", "棕榈泉", "纳帕谷", "优胜美地", "红杉国家公园", "一号公路", "圣塔芭芭拉", "蒙特雷"] },
  { state: "纽约州", cities: ["纽约", "尼亚加拉瀑布", "长岛", "伍德斯托克"] },
  { state: "佛罗里达州", cities: ["迈阿密", "奥兰多", "基韦斯特", "坦帕", "迈尔斯堡"] },
  { state: "内华达州", cities: ["拉斯维加斯", "里诺"] },
  { state: "华盛顿州", cities: ["西雅图", "奥林匹亚"] },
  { state: "马萨诸塞州", cities: ["波士顿", "剑桥", "科德角"] },
  { state: "伊利诺伊州", cities: ["芝加哥"] },
  { state: "德克萨斯州", cities: ["休斯顿", "达拉斯", "奥斯汀", "圣安东尼奥"] },
  { state: "亚利桑那州", cities: ["菲尼克斯", "大峡谷", "羚羊谷", "纪念碑谷", "塞多纳"] },
  { state: "科罗拉多州", cities: ["丹佛", "落基山国家公园", "阿斯彭"] },
  { state: "犹他州", cities: ["盐湖城", "拱门国家公园", "锡安国家公园", "布莱斯峡谷"] },
  { state: "怀俄明州", cities: ["黄石公园", "大提顿国家公园", "杰克逊霍尔"] },
  { state: "蒙大拿州", cities: ["冰川国家公园"] },
  { state: "俄勒冈州", cities: ["波特兰", "火山口湖"] },
  { state: "宾夕法尼亚州", cities: ["费城", "匹兹堡"] },
  { state: "路易斯安那州", cities: ["新奥尔良"] },
  { state: "田纳西州", cities: ["纳什维尔", "孟菲斯", "大烟山国家公园"] },
  { state: "乔治亚州", cities: ["亚特兰大", "萨凡纳"] },
  { state: "南卡罗来纳州", cities: ["查尔斯顿"] },
  { state: "新墨西哥州", cities: ["圣塔菲", "阿尔伯克基"] },
  { state: "密歇根州", cities: ["底特律"] },
  { state: "明尼苏达州", cities: ["明尼阿波利斯"] },
  { state: "密苏里州", cities: ["堪萨斯城", "圣路易斯"] },
  { state: "哥伦比亚特区", cities: ["华盛顿"] },
  { state: "夏威夷州", cities: ["夏威夷", "檀香山", "毛伊岛", "大岛"] },
  { state: "阿拉斯加州", cities: ["阿拉斯加", "安克雷奇", "费尔班克斯", "迪纳利国家公园"] },
  { state: "缅因州", cities: ["阿卡迪亚国家公园", "波特兰"] },
];

export const US_HOT_CITIES = [
  "纽约", "洛杉矶", "旧金山", "拉斯维加斯", "夏威夷", "迈阿密",
  "华盛顿", "芝加哥", "西雅图", "大峡谷", "黄石公园", "波士顿",
];

// ============ China Provinces & Cities ============
export interface ChinaProvinceData {
  province: string;
  cities: string[];
}

export const CHINA_PROVINCES: ChinaProvinceData[] = [
  { province: "北京市", cities: ["北京"] },
  { province: "上海市", cities: ["上海"] },
  { province: "天津市", cities: ["天津"] },
  { province: "重庆市", cities: ["重庆"] },
  { province: "广东省", cities: ["广州", "深圳", "珠海", "佛山", "东莞", "惠州", "中山", "汕头", "湛江"] },
  { province: "浙江省", cities: ["杭州", "宁波", "温州", "绍兴", "嘉兴", "金华", "舟山", "乌镇", "义乌"] },
  { province: "江苏省", cities: ["南京", "苏州", "无锡", "常州", "扬州", "南通", "镇江", "徐州"] },
  { province: "四川省", cities: ["成都", "乐山", "九寨沟", "稻城", "峨眉山", "都江堰", "甘孜", "阿坝"] },
  { province: "云南省", cities: ["昆明", "大理", "丽江", "西双版纳", "香格里拉", "腾冲", "泸沽湖"] },
  { province: "福建省", cities: ["厦门", "福州", "泉州", "漳州", "武夷山", "平潭"] },
  { province: "湖南省", cities: ["长沙", "张家界", "凤凰", "岳阳", "衡阳", "湘西"] },
  { province: "湖北省", cities: ["武汉", "宜昌", "襄阳", "恩施", "神农架"] },
  { province: "山东省", cities: ["济南", "青岛", "烟台", "威海", "泰安", "曲阜"] },
  { province: "陕西省", cities: ["西安", "咸阳", "延安", "汉中", "华山"] },
  { province: "河南省", cities: ["郑州", "洛阳", "开封", "南阳", "登封"] },
  { province: "安徽省", cities: ["合肥", "黄山", "宣城", "池州", "芜湖"] },
  { province: "江西省", cities: ["南昌", "景德镇", "庐山", "婺源", "九江"] },
  { province: "辽宁省", cities: ["沈阳", "大连", "丹东"] },
  { province: "吉林省", cities: ["长春", "延吉", "长白山"] },
  { province: "黑龙江省", cities: ["哈尔滨", "漠河", "牡丹江"] },
  { province: "贵州省", cities: ["贵阳", "遵义", "黔东南", "荔波", "西江千户苗寨"] },
  { province: "广西", cities: ["南宁", "桂林", "北海", "阳朔", "涠洲岛"] },
  { province: "海南省", cities: ["海口", "三亚", "万宁", "陵水"] },
  { province: "甘肃省", cities: ["兰州", "敦煌", "张掖", "嘉峪关"] },
  { province: "青海省", cities: ["西宁", "青海湖", "茶卡"] },
  { province: "西藏", cities: ["拉萨", "林芝", "日喀则", "纳木错"] },
  { province: "新疆", cities: ["乌鲁木齐", "喀什", "伊犁", "喀纳斯", "吐鲁番", "赛里木湖"] },
  { province: "内蒙古", cities: ["呼和浩特", "呼伦贝尔", "鄂尔多斯", "阿尔山"] },
  { province: "宁夏", cities: ["银川", "中卫", "沙坡头"] },
  { province: "山西省", cities: ["太原", "大同", "平遥"] },
  { province: "河北省", cities: ["石家庄", "秦皇岛", "承德", "张家口"] },
  { province: "香港", cities: ["香港"] },
  { province: "澳门", cities: ["澳门"] },
  { province: "台湾", cities: ["台北", "高雄", "台中", "台南", "花莲", "垦丁", "九份"] },
];

export const CHINA_HOT_CITIES = [
  "北京", "上海", "成都", "西安", "杭州", "重庆",
  "长沙", "大理", "厦门", "三亚", "拉萨", "哈尔滨",
];

// ============ International ============
export interface InternationalData {
  country: string;
  cities: string[];
}

export const INTERNATIONAL_DATA: InternationalData[] = [
  { country: "日本", cities: ["东京", "大阪", "京都", "奈良", "北海道", "冲绳", "名古屋", "福冈", "神户", "箱根", "镰仓", "富士山"] },
  { country: "韩国", cities: ["首尔", "釜山", "济州岛", "仁川", "庆州"] },
  { country: "泰国", cities: ["曼谷", "清迈", "普吉岛", "芭提雅", "苏梅岛", "甲米"] },
  { country: "越南", cities: ["河内", "胡志明市", "岘港", "会安", "下龙湾", "芽庄"] },
  { country: "新加坡", cities: ["新加坡"] },
  { country: "马来西亚", cities: ["吉隆坡", "槟城", "兰卡威", "马六甲", "沙巴"] },
  { country: "印度尼西亚", cities: ["巴厘岛", "雅加达", "日惹"] },
  { country: "菲律宾", cities: ["马尼拉", "长滩岛", "宿雾", "巴拉望"] },
  { country: "柬埔寨", cities: ["暹粒", "金边"] },
  { country: "印度", cities: ["新德里", "孟买", "阿格拉", "斋浦尔", "瓦拉纳西"] },
  { country: "斯里兰卡", cities: ["科伦坡", "康提", "加勒"] },
  { country: "尼泊尔", cities: ["加德满都", "博卡拉"] },
  { country: "马尔代夫", cities: ["马累"] },
  { country: "阿联酋", cities: ["迪拜", "阿布扎比"] },
  { country: "土耳其", cities: ["伊斯坦布尔", "卡帕多奇亚", "安塔利亚", "棉花堡"] },
  { country: "以色列", cities: ["耶路撒冷", "特拉维夫"] },
  { country: "约旦", cities: ["安曼", "佩特拉", "死海"] },
  { country: "法国", cities: ["巴黎", "尼斯", "普罗旺斯", "里昂", "马赛"] },
  { country: "英国", cities: ["伦敦", "爱丁堡", "牛津", "剑桥", "巴斯"] },
  { country: "意大利", cities: ["罗马", "佛罗伦萨", "威尼斯", "米兰", "那不勒斯", "阿马尔菲", "五渔村"] },
  { country: "西班牙", cities: ["巴塞罗那", "马德里", "塞维利亚", "格拉纳达"] },
  { country: "德国", cities: ["柏林", "慕尼黑", "法兰克福", "汉堡", "海德堡"] },
  { country: "瑞士", cities: ["苏黎世", "日内瓦", "卢塞恩", "因特拉肯", "少女峰"] },
  { country: "荷兰", cities: ["阿姆斯特丹", "鹿特丹"] },
  { country: "希腊", cities: ["雅典", "圣托里尼", "米科诺斯"] },
  { country: "葡萄牙", cities: ["里斯本", "波尔图"] },
  { country: "奥地利", cities: ["维也纳", "萨尔茨堡"] },
  { country: "捷克", cities: ["布拉格", "CK小镇"] },
  { country: "匈牙利", cities: ["布达佩斯"] },
  { country: "冰岛", cities: ["雷克雅未克"] },
  { country: "挪威", cities: ["奥斯陆", "卑尔根", "特罗姆瑟"] },
  { country: "芬兰", cities: ["赫尔辛基", "罗瓦涅米"] },
  { country: "克罗地亚", cities: ["杜布罗夫尼克", "萨格勒布"] },
  { country: "俄罗斯", cities: ["莫斯科", "圣彼得堡"] },
  { country: "加拿大", cities: ["温哥华", "多伦多", "蒙特利尔", "魁北克", "班夫", "渥太华"] },
  { country: "墨西哥", cities: ["墨西哥城", "坎昆", "瓜纳华托"] },
  { country: "巴西", cities: ["里约热内卢", "圣保罗"] },
  { country: "阿根廷", cities: ["布宜诺斯艾利斯", "乌斯怀亚", "伊瓜苏"] },
  { country: "秘鲁", cities: ["利马", "库斯科", "马丘比丘"] },
  { country: "澳大利亚", cities: ["悉尼", "墨尔本", "黄金海岸", "凯恩斯", "大堡礁", "珀斯"] },
  { country: "新西兰", cities: ["奥克兰", "皇后镇", "基督城"] },
  { country: "埃及", cities: ["开罗", "卢克索", "红海"] },
  { country: "南非", cities: ["开普敦", "约翰内斯堡"] },
  { country: "肯尼亚", cities: ["内罗毕", "马赛马拉"] },
  { country: "摩洛哥", cities: ["马拉喀什", "卡萨布兰卡", "菲斯", "舍夫沙万"] },
];

export const INTERNATIONAL_HOT_CITIES = [
  "东京", "巴黎", "曼谷", "首尔", "伦敦", "巴厘岛",
  "罗马", "迪拜", "悉尼", "伊斯坦布尔", "清迈", "马丘比丘",
];

// ============ Universal search ============
export interface CitySearchResult {
  city: string;
  location: string;
  tab: "us" | "china" | "international";
}

export function searchAllCities(query: string, lang: Lang = "zh"): CitySearchResult[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results: CitySearchResult[] = [];

  for (const { state, cities } of US_STATES) {
    for (const city of cities) {
      const cityEn = (NAME_EN[city] || "").toLowerCase();
      const stateEn = (NAME_EN[state] || "").toLowerCase();
      if (city.toLowerCase().includes(q) || state.toLowerCase().includes(q) || cityEn.includes(q) || stateEn.includes(q)) {
        results.push({ city, location: `${loc(state, lang)}, ${loc("美国", lang)}`, tab: "us" });
      }
    }
  }
  for (const { province, cities } of CHINA_PROVINCES) {
    for (const city of cities) {
      const cityEn = (NAME_EN[city] || "").toLowerCase();
      const provEn = (NAME_EN[province] || "").toLowerCase();
      if (city.toLowerCase().includes(q) || province.toLowerCase().includes(q) || cityEn.includes(q) || provEn.includes(q)) {
        results.push({ city, location: loc(province, lang), tab: "china" });
      }
    }
  }
  for (const { country, cities } of INTERNATIONAL_DATA) {
    for (const city of cities) {
      const cityEn = (NAME_EN[city] || "").toLowerCase();
      const countryEn = (NAME_EN[country] || "").toLowerCase();
      if (city.toLowerCase().includes(q) || country.toLowerCase().includes(q) || cityEn.includes(q) || countryEn.includes(q)) {
        results.push({ city, location: loc(country, lang), tab: "international" });
      }
    }
  }
  return results.slice(0, 20);
}

export function findCityLocation(cityName: string, lang: Lang = "zh"): string {
  for (const { state, cities } of US_STATES) {
    if (cities.includes(cityName)) return `${loc(state, lang)}, ${loc("美国", lang)}`;
  }
  for (const { province, cities } of CHINA_PROVINCES) {
    if (cities.includes(cityName)) return loc(province, lang);
  }
  for (const { country, cities } of INTERNATIONAL_DATA) {
    if (cities.includes(cityName)) return loc(country, lang);
  }
  return "";
}
