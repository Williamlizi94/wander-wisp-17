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

// ============ International (excluding US & China) ============
export interface InternationalData {
  country: string;
  cities: string[];
}

export const INTERNATIONAL_DATA: InternationalData[] = [
  // 东亚
  { country: "日本", cities: ["东京", "大阪", "京都", "奈良", "北海道", "冲绳", "名古屋", "福冈", "神户", "箱根", "镰仓", "富士山"] },
  { country: "韩国", cities: ["首尔", "釜山", "济州岛", "仁川", "庆州"] },
  // 东南亚
  { country: "泰国", cities: ["曼谷", "清迈", "普吉岛", "芭提雅", "苏梅岛", "甲米"] },
  { country: "越南", cities: ["河内", "胡志明市", "岘港", "会安", "下龙湾", "芽庄"] },
  { country: "新加坡", cities: ["新加坡"] },
  { country: "马来西亚", cities: ["吉隆坡", "槟城", "兰卡威", "马六甲", "沙巴"] },
  { country: "印度尼西亚", cities: ["巴厘岛", "雅加达", "日惹"] },
  { country: "菲律宾", cities: ["马尼拉", "长滩岛", "宿雾", "巴拉望"] },
  { country: "柬埔寨", cities: ["暹粒", "金边"] },
  // 南亚
  { country: "印度", cities: ["新德里", "孟买", "阿格拉", "斋浦尔", "瓦拉纳西"] },
  { country: "斯里兰卡", cities: ["科伦坡", "康提", "加勒"] },
  { country: "尼泊尔", cities: ["加德满都", "博卡拉"] },
  { country: "马尔代夫", cities: ["马累"] },
  // 中东
  { country: "阿联酋", cities: ["迪拜", "阿布扎比"] },
  { country: "土耳其", cities: ["伊斯坦布尔", "卡帕多奇亚", "安塔利亚", "棉花堡"] },
  { country: "以色列", cities: ["耶路撒冷", "特拉维夫"] },
  { country: "约旦", cities: ["安曼", "佩特拉", "死海"] },
  // 欧洲
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
  // 北美（非美国）
  { country: "加拿大", cities: ["温哥华", "多伦多", "蒙特利尔", "魁北克", "班夫", "渥太华"] },
  { country: "墨西哥", cities: ["墨西哥城", "坎昆", "瓜纳华托"] },
  // 南美
  { country: "巴西", cities: ["里约热内卢", "圣保罗"] },
  { country: "阿根廷", cities: ["布宜诺斯艾利斯", "乌斯怀亚", "伊瓜苏"] },
  { country: "秘鲁", cities: ["利马", "库斯科", "马丘比丘"] },
  // 大洋洲
  { country: "澳大利亚", cities: ["悉尼", "墨尔本", "黄金海岸", "凯恩斯", "大堡礁", "珀斯"] },
  { country: "新西兰", cities: ["奥克兰", "皇后镇", "基督城"] },
  // 非洲
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
  location: string; // state / province / country
  tab: "us" | "china" | "international";
}

export function searchAllCities(query: string): CitySearchResult[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results: CitySearchResult[] = [];

  for (const { state, cities } of US_STATES) {
    for (const city of cities) {
      if (city.toLowerCase().includes(q) || state.toLowerCase().includes(q)) {
        results.push({ city, location: `${state}，美国`, tab: "us" });
      }
    }
  }
  for (const { province, cities } of CHINA_PROVINCES) {
    for (const city of cities) {
      if (city.toLowerCase().includes(q) || province.toLowerCase().includes(q)) {
        results.push({ city, location: province, tab: "china" });
      }
    }
  }
  for (const { country, cities } of INTERNATIONAL_DATA) {
    for (const city of cities) {
      if (city.toLowerCase().includes(q) || country.toLowerCase().includes(q)) {
        results.push({ city, location: country, tab: "international" });
      }
    }
  }
  return results.slice(0, 20);
}

export function findCityLocation(cityName: string): string {
  for (const { state, cities } of US_STATES) {
    if (cities.includes(cityName)) return `${state}，美国`;
  }
  for (const { province, cities } of CHINA_PROVINCES) {
    if (cities.includes(cityName)) return province;
  }
  for (const { country, cities } of INTERNATIONAL_DATA) {
    if (cities.includes(cityName)) return country;
  }
  return "";
}
