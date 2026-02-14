export interface RegionData {
  region: string;
  countries: {
    country: string;
    cities: string[];
  }[];
}

export const WORLD_CITY_DATA: RegionData[] = [
  {
    region: "中国",
    countries: [
      {
        country: "中国大陆",
        cities: [
          "北京", "上海", "广州", "深圳", "成都", "重庆", "杭州", "西安", "南京", "武汉",
          "长沙", "苏州", "厦门", "青岛", "大连", "哈尔滨", "三亚", "丽江", "大理", "拉萨",
          "桂林", "张家界", "黄山", "九寨沟", "敦煌", "洛阳", "开封", "昆明", "贵阳", "兰州",
          "乌鲁木齐", "呼和浩特", "香格里拉", "凤凰", "乌镇", "平遥", "婺源",
        ],
      },
      { country: "香港", cities: ["香港"] },
      { country: "澳门", cities: ["澳门"] },
      { country: "台湾", cities: ["台北", "高雄", "台中", "台南", "花莲", "垦丁", "九份"] },
    ],
  },
  {
    region: "东亚",
    countries: [
      { country: "日本", cities: ["东京", "大阪", "京都", "奈良", "北海道", "冲绳", "名古屋", "福冈", "神户", "箱根", "镰仓", "富士山"] },
      { country: "韩国", cities: ["首尔", "釜山", "济州岛", "仁川", "庆州"] },
      { country: "蒙古", cities: ["乌兰巴托"] },
    ],
  },
  {
    region: "东南亚",
    countries: [
      { country: "泰国", cities: ["曼谷", "清迈", "普吉岛", "芭提雅", "苏梅岛", "甲米"] },
      { country: "越南", cities: ["河内", "胡志明市", "岘港", "会安", "下龙湾", "芽庄"] },
      { country: "新加坡", cities: ["新加坡"] },
      { country: "马来西亚", cities: ["吉隆坡", "槟城", "兰卡威", "马六甲", "沙巴"] },
      { country: "印度尼西亚", cities: ["巴厘岛", "雅加达", "日惹"] },
      { country: "菲律宾", cities: ["马尼拉", "长滩岛", "宿雾", "巴拉望"] },
      { country: "柬埔寨", cities: ["暹粒", "金边"] },
      { country: "老挝", cities: ["万象", "琅勃拉邦"] },
      { country: "缅甸", cities: ["仰光", "蒲甘", "曼德勒"] },
    ],
  },
  {
    region: "南亚",
    countries: [
      { country: "印度", cities: ["新德里", "孟买", "阿格拉", "斋浦尔", "瓦拉纳西", "果阿"] },
      { country: "斯里兰卡", cities: ["科伦坡", "康提", "加勒"] },
      { country: "尼泊尔", cities: ["加德满都", "博卡拉"] },
      { country: "马尔代夫", cities: ["马累"] },
    ],
  },
  {
    region: "中东",
    countries: [
      { country: "阿联酋", cities: ["迪拜", "阿布扎比"] },
      { country: "土耳其", cities: ["伊斯坦布尔", "卡帕多奇亚", "安塔利亚", "棉花堡", "以弗所"] },
      { country: "以色列", cities: ["耶路撒冷", "特拉维夫"] },
      { country: "约旦", cities: ["安曼", "佩特拉", "死海"] },
      { country: "沙特阿拉伯", cities: ["利雅得", "吉达"] },
    ],
  },
  {
    region: "欧洲",
    countries: [
      { country: "法国", cities: ["巴黎", "尼斯", "普罗旺斯", "里昂", "马赛", "斯特拉斯堡"] },
      { country: "英国", cities: ["伦敦", "爱丁堡", "牛津", "剑桥", "巴斯", "曼彻斯特"] },
      { country: "意大利", cities: ["罗马", "佛罗伦萨", "威尼斯", "米兰", "那不勒斯", "阿马尔菲", "五渔村"] },
      { country: "西班牙", cities: ["巴塞罗那", "马德里", "塞维利亚", "格拉纳达", "马拉加"] },
      { country: "德国", cities: ["柏林", "慕尼黑", "法兰克福", "汉堡", "海德堡", "科隆"] },
      { country: "瑞士", cities: ["苏黎世", "日内瓦", "卢塞恩", "因特拉肯", "少女峰"] },
      { country: "荷兰", cities: ["阿姆斯特丹", "鹿特丹"] },
      { country: "希腊", cities: ["雅典", "圣托里尼", "米科诺斯", "克里特岛"] },
      { country: "葡萄牙", cities: ["里斯本", "波尔图"] },
      { country: "奥地利", cities: ["维也纳", "萨尔茨堡", "因斯布鲁克"] },
      { country: "捷克", cities: ["布拉格", "CK小镇"] },
      { country: "匈牙利", cities: ["布达佩斯"] },
      { country: "冰岛", cities: ["雷克雅未克"] },
      { country: "挪威", cities: ["奥斯陆", "卑尔根", "特罗姆瑟"] },
      { country: "瑞典", cities: ["斯德哥尔摩"] },
      { country: "丹麦", cities: ["哥本哈根"] },
      { country: "芬兰", cities: ["赫尔辛基", "罗瓦涅米"] },
      { country: "克罗地亚", cities: ["杜布罗夫尼克", "萨格勒布", "斯普利特"] },
      { country: "俄罗斯", cities: ["莫斯科", "圣彼得堡"] },
      { country: "波兰", cities: ["华沙", "克拉科夫"] },
    ],
  },
  {
    region: "北美洲",
    countries: [
      { country: "美国", cities: ["纽约", "洛杉矶", "旧金山", "拉斯维加斯", "夏威夷", "华盛顿", "芝加哥", "迈阿密", "西雅图", "波士顿", "奥兰多", "圣地亚哥", "黄石公园", "大峡谷"] },
      { country: "加拿大", cities: ["温哥华", "多伦多", "蒙特利尔", "魁北克", "班夫", "渥太华"] },
      { country: "墨西哥", cities: ["墨西哥城", "坎昆", "瓜纳华托"] },
    ],
  },
  {
    region: "南美洲",
    countries: [
      { country: "巴西", cities: ["里约热内卢", "圣保罗"] },
      { country: "阿根廷", cities: ["布宜诺斯艾利斯", "乌斯怀亚", "伊瓜苏"] },
      { country: "秘鲁", cities: ["利马", "库斯科", "马丘比丘"] },
      { country: "智利", cities: ["圣地亚哥", "瓦尔帕莱索", "复活节岛"] },
      { country: "哥伦比亚", cities: ["波哥大", "卡塔赫纳"] },
    ],
  },
  {
    region: "大洋洲",
    countries: [
      { country: "澳大利亚", cities: ["悉尼", "墨尔本", "黄金海岸", "凯恩斯", "大堡礁", "珀斯", "塔斯马尼亚"] },
      { country: "新西兰", cities: ["奥克兰", "皇后镇", "基督城", "罗托鲁瓦"] },
      { country: "斐济", cities: ["苏瓦", "楠迪"] },
    ],
  },
  {
    region: "非洲",
    countries: [
      { country: "埃及", cities: ["开罗", "卢克索", "阿斯旺", "红海"] },
      { country: "南非", cities: ["开普敦", "约翰内斯堡"] },
      { country: "肯尼亚", cities: ["内罗毕", "马赛马拉"] },
      { country: "坦桑尼亚", cities: ["达累斯萨拉姆", "桑给巴尔", "塞伦盖蒂"] },
      { country: "摩洛哥", cities: ["马拉喀什", "卡萨布兰卡", "菲斯", "舍夫沙万"] },
      { country: "毛里求斯", cities: ["路易港"] },
    ],
  },
];

export const HOT_CITIES_GLOBAL = [
  "东京", "巴黎", "曼谷", "首尔", "伦敦", "纽约",
  "巴厘岛", "罗马", "迪拜", "悉尼", "北京", "成都",
];

export interface CitySearchResult {
  city: string;
  country: string;
  region: string;
}

export function searchCities(query: string): CitySearchResult[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  const results: CitySearchResult[] = [];
  for (const { region, countries } of WORLD_CITY_DATA) {
    for (const { country, cities } of countries) {
      for (const city of cities) {
        if (city.toLowerCase().includes(q) || country.toLowerCase().includes(q)) {
          results.push({ city, country, region });
        }
      }
    }
  }
  return results.slice(0, 20);
}

export function getAllRegions(): string[] {
  return WORLD_CITY_DATA.map(r => r.region);
}

export function getCountriesByRegion(region: string): string[] {
  return WORLD_CITY_DATA.find(r => r.region === region)?.countries.map(c => c.country) || [];
}

export function getCitiesByCountry(region: string, country: string): string[] {
  return WORLD_CITY_DATA.find(r => r.region === region)?.countries.find(c => c.country === country)?.cities || [];
}

export function findCityInfo(cityName: string): { country: string; region: string } | null {
  for (const { region, countries } of WORLD_CITY_DATA) {
    for (const { country, cities } of countries) {
      if (cities.includes(cityName)) return { country, region };
    }
  }
  return null;
}
