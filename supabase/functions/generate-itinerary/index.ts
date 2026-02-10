import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { city, startDate, endDate, arrivalTime, departureTime, budget, preferences, groupType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const dayCount = startDate && endDate
      ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
      : 3;

    const budgetMap: Record<string, string> = {
      low: "穷游模式（<500元/天）",
      economy: "经济实惠（500-1000元/天）",
      mid: "舒适出行（1000-2000元/天）",
      high: "品质旅行（2000-3000元/天）",
      premium: "轻奢体验（3000-5000元/天）",
      luxury: "奢华之旅（>5000元/天）",
    };

    const prefStr = preferences?.length ? `旅行偏好：${preferences.join("、")}` : "无特殊偏好";
    const arrivalStr = arrivalTime ? `第一天到达时间：${arrivalTime}` : "第一天全天可用";
    const departureStr = departureTime ? `最后一天离开时间：${departureTime}` : "最后一天全天可用";

    const groupMap: Record<string, string> = {
      solo: "单人出行",
      couple: "情侣出行（注重浪漫氛围）",
      family: "家庭亲子出行（注意儿童友好）",
      friends: "朋友结伴出行（注重社交互动和体验）",
    };
    const groupStr = `出行人群：${groupMap[groupType] || "单人出行"}`;

    const prompt = `你是一个专业的中国旅行规划师。请为以下旅行生成详细攻略：

城市：${city}
天数：${dayCount}天
预算：${budgetMap[budget] || "舒适出行"}
${groupStr}
${prefStr}
${arrivalStr}
${departureStr}

请严格按照以下JSON格式返回（不要包含任何其他文字，只返回JSON）：

{
  "summary": "一句话总结旅行节奏和花费建议",
  "hotels": [
    {
      "area": "推荐住宿区域名称如XX路/XX商圈附近",
      "price": "该区域参考价格如300-500元/晚",
      "reason": "推荐理由如交通便利、靠近景点、环境优美等",
      "tags": ["标签如交通便利", "靠近景点", "性价比高"]
    }
  ],
  "days": [
    {
      "day": 1,
      "weather": {
        "icon": "天气emoji如🌤⛅🌧",
        "tempRange": "温度范围如12–18°C",
        "rainChance": 降雨概率数字如20,
        "suggestion": "穿衣建议如薄外套备伞"
      },
      "schedule": [
        {
          "time": "上午/下午/晚上",
          "place": "景点名称",
          "type": "景点类型如历史古迹/自然风光/美食街",
          "duration": "预计时长如2小时",
          "suggestArrival": "建议到达时间如9:00（可选）",
          "description": "一句话描述为什么去这里"
        }
      ],
      "food": [
        {
          "name": "美食/菜品名称（不要写具体店名）",
          "area": "推荐在当天行程附近的哪个区域吃",
          "type": "分类如传统小吃/特色正餐"
        }
      ],
      "transport": {
        "main": "主要交通方式",
        "reason": "推荐原因",
        "backup": "备选交通方式"
      },
      "planB": "下雨天的替代方案"
    }
  ]
}

要求：
- 推荐3个住宿区域（不要写具体酒店名），说明该区域的优势如交通便利、环境优美、靠近景点等，给出该区域的参考价格范围，并提供2-3个标签
- 每天安排上午、下午、晚上3个时段
- 每天推荐2-4个美食，只写菜品名不写具体店名，推荐地点选在当天行程景点附近的区域
- 天气数据请根据${city}该季节的典型天气给出合理估计
- 交通建议要具体实用
- Plan B要有具体的室内替代方案
- 根据出行人群特点调整景点和活动推荐
- 返回${dayCount}天的完整攻略
- 第一天的行程要根据到达时间安排，到达之前不要安排活动
- 最后一天的行程要根据离开时间安排，离开之后不要安排活动，并预留足够的赶路时间`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "你是专业旅行规划师，只返回有效JSON，不要包含markdown代码块标记。" },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "请求过于频繁，请稍后再试" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI 额度已用完，请充值后重试" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI 服务暂时不可用" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from response, stripping markdown code blocks if present
    let cleaned = content.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    let itinerary;
    try {
      itinerary = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("Failed to parse AI response:", cleaned);
      return new Response(JSON.stringify({ error: "AI 返回格式异常，请重试" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Construct full result
    const dateRange = startDate && endDate
      ? `${new Date(startDate).toLocaleDateString("zh-CN")} – ${new Date(endDate).toLocaleDateString("zh-CN")}`
      : `${dayCount}天行程`;

    const result = {
      city,
      dateRange,
      budget: budgetMap[budget] || "舒适出行",
      summary: itinerary.summary,
      hotels: itinerary.hotels || [],
      days: itinerary.days.map((d: any, i: number) => ({
        ...d,
        date: startDate
          ? new Date(new Date(startDate).getTime() + i * 86400000).toLocaleDateString("zh-CN", {
              month: "long", day: "numeric", weekday: "short",
            })
          : `第${i + 1}天`,
      })),
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-itinerary error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "未知错误" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
