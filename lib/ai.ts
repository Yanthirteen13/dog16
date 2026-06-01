import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import type { AIContent, DimensionResult, DimensionScores } from "./types";

export interface GenInput {
  pet_name: string;
  breed?: string;
  gender?: string;
  type_code: string;
  type_name: string;
  tagline: string;
  dimension_result: DimensionResult;
  dimension_scores: DimensionScores;
  calibration: "A" | "B" | "C" | "D" | null;
}

const CALIBRATION_FLAVOR: Record<string, string> = {
  A: "主人觉得它社交积极、目标明确、情绪独立、作息稳定，像狗界公务员。",
  B: "主人觉得它热情但有点小心思，整体还算听得懂人话。",
  C: "主人觉得它敏感、会脑补、情绪细腻，但偶尔随机掉线。",
  D: "主人觉得它又疯又可爱，像一台装着毛的随机事件生成器。",
};

const SYSTEM_PROMPT = `你是一个专业又毒舌的"狗狗人格鉴定师"，为一款狗狗版 16 型人格测试生成报告文案。
语气风格：吐槽 70%、毒舌 30%，像小红书爆款文案，好笑、犀利、但要让主人觉得"被说中了"且有点暖。
所有文案用简体中文。不要使用 markdown，不要解释，只输出一个严格合法的 JSON 对象。`;

function buildUserPrompt(input: GenInput): string {
  const scores = input.dimension_scores;
  const cal = input.calibration
    ? CALIBRATION_FLAVOR[input.calibration]
    : "（主人未填写主观印象）";

  return `请为这只狗生成人格报告文案。

【狗狗信息】
名字：${input.pet_name}
犬种：${input.breed || "未知"}
性别：${input.gender || "未知"}
人格类型：${input.type_code}（${input.type_name}）
类型定位：${input.tagline}
四维倾向：E/I=${input.dimension_result.EI}，S/N=${input.dimension_result.SN}，T/F=${input.dimension_result.TF}，J/P=${input.dimension_result.JP}
八维分数（0-100）：社交主动E=${scores.E}，独处回血I=${scores.I}，干饭务实S=${scores.S}，脑洞警觉N=${scores.N}，铁头直球T=${scores.T}，情绪共振F=${scores.F}，规律掌控J=${scores.J}，随机发疯P=${scores.P}
主人主观印象：${cal}

【输出 JSON 结构】（必须严格遵守字段名和取值范围）
{
  "type_subtitle": "一句话副标题，10-18字，点明这只狗的气质",
  "keywords": ["关键词1","关键词2","关键词3","关键词4"],
  "cover_quote": "封面金句，一句话暴击，要适合截图传播，结合它的人格，20-35字",
  "summary": {
    "big_summary": "一句话总评暴击，毒舌且好笑，15-30字",
    "paragraphs": ["第1段：它的核心气质","第2段：它最离谱的地方","第3段：你需要知道的相处要点"]
  },
  "owner_role": {
    "relationship_rating": "用 S/A/B 等级表示它对你的依赖，可用 SSS/SS/S/A 之一",
    "roles": [
      {"title":"角色名(5字内)","description":"一句吐槽描述(15-25字)","icon":"从 food_bowl/battery/shield/ball 中选一个，4个角色各不相同","badge_color":"从 yellow/green/blue/purple 中选一个，4个各不相同"}
    ],
    "true_thought": "它对你的真实想法，一句话，幽默有爱，20-35字"
  },
  "danger_items": [
    {"title":"不要……（一条雷区，祈使句）","description":"踩雷后果，毒舌一句(15-30字)","icon":"warning","sticker":"从 cool_dog/emo_dog/crazy_dog/shocked_dog 中选最贴合的","speech_bubble":"狗狗的内心吐槽气泡(6-12字)"}
  ]
}

要求：
- roles 必须正好 4 个，icon 和 badge_color 都不重复。
- danger_items 必须正好 4 个，sticker 尽量用满 4 种不重复，icon 一律为 "warning"。
- paragraphs 必须正好 3 段，每段 40-80 字。
- 文案要结合该狗的人格类型和分数，避免泛泛而谈，多带具体画面感。
- 多处自然带上狗狗的名字"${input.pet_name}"。
只输出 JSON，不要任何额外文字。`;
}

function parseAIJson(raw: string): AIContent {
  let text = raw.trim();
  // strip ```json ... ``` fences if present
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
  return JSON.parse(text) as AIContent;
}

// Per-call timeout and retry budget are kept well under the route's 60s
// maxDuration so two full attempts (incl. one retry) still finish in time.
const PER_CALL_TIMEOUT_MS = 24_000;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 800;

async function callDeepSeek(system: string, user: string): Promise<string> {
  const client = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
    timeout: PER_CALL_TIMEOUT_MS,
    maxRetries: 0, // we handle retries ourselves to stay within the time budget
  });
  const res = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" },
    temperature: 1.1,
    max_tokens: 3000,
  });
  return res.choices[0]?.message?.content ?? "";
}

async function callAnthropic(system: string, user: string): Promise<string> {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    timeout: PER_CALL_TIMEOUT_MS,
    maxRetries: 0,
  });
  const res = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
    max_tokens: 3000,
    temperature: 1,
    system,
    messages: [{ role: "user", content: user }],
  });
  const block = res.content[0];
  return block && block.type === "text" ? block.text : "";
}

export async function generateAIContent(input: GenInput): Promise<AIContent> {
  const provider = (process.env.AI_PROVIDER || "deepseek").toLowerCase();
  const user = buildUserPrompt(input);

  // The model occasionally returns an empty body or slightly malformed JSON
  // (especially under load). Retry a couple of times before giving up so a
  // single transient hiccup doesn't fail the whole report.
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const raw =
        provider === "anthropic"
          ? await callAnthropic(SYSTEM_PROMPT, user)
          : await callDeepSeek(SYSTEM_PROMPT, user);
      if (!raw.trim()) throw new Error("AI 返回为空");
      return parseAIJson(raw);
    } catch (err) {
      lastErr = err;
      console.error(
        `[ai] 第 ${attempt}/${MAX_ATTEMPTS} 次生成失败:`,
        err instanceof Error ? err.message : err,
      );
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("AI 生成失败");
}
