import type { GenInput } from "./ai";
import type {
  AIContent,
  DangerItem,
  InfoItem,
  OwnerRole,
  Report,
} from "./types";
import { TYPE_TABLE } from "./types";
import { scoreAnswers, type AnswerMap } from "./scoring";

const ROLE_ICONS = ["food_bowl", "battery", "shield", "ball"] as const;
const ROLE_COLORS = ["yellow", "green", "blue", "purple"] as const;
const DANGER_STICKERS = [
  "cool_dog",
  "emo_dog",
  "crazy_dog",
  "shocked_dog",
] as const;

const RADAR_DEF: { key: string; label: string; letter: keyof Report["personality_result"]["dimension_scores"]; icon: string }[] = [
  { key: "social_active", label: "社交主动值", letter: "E", icon: "social_dogs" },
  { key: "fantasy_alert", label: "脑洞警觉值", letter: "N", icon: "lightbulb" },
  { key: "emotional_sync", label: "情绪共振值", letter: "F", icon: "heart" },
  { key: "random_crazy", label: "随机发疯值", letter: "P", icon: "boom" },
  { key: "routine_control", label: "规律掌控值", letter: "J", icon: "clock" },
  { key: "straightforward", label: "铁头直球值", letter: "T", icon: "helmet" },
  { key: "food_practical", label: "干饭务实值", letter: "S", icon: "food_bowl" },
  { key: "solo_recharge", label: "独处回血值", letter: "I", icon: "sleepy_dog" },
];

// Pick a valid value from `pool`, preferring the AI's choice when valid and unused.
function assign<T extends string>(
  preferred: string | undefined,
  pool: readonly T[],
  used: Set<string>,
  index: number,
): T {
  if (preferred && (pool as readonly string[]).includes(preferred) && !used.has(preferred)) {
    used.add(preferred);
    return preferred as T;
  }
  const free = pool.find((p) => !used.has(p)) ?? pool[index % pool.length];
  used.add(free);
  return free;
}

function formatBirthday(raw?: string): string | undefined {
  if (!raw) return undefined;
  return raw.replace(/-/g, ".");
}

function buildInfoItems(p: {
  birthday?: string;
  breed?: string;
  gender?: string;
  weight?: string;
}): InfoItem[] {
  const items: InfoItem[] = [];
  const bday = formatBirthday(p.birthday);
  if (bday) items.push({ label: "生日", value: bday, icon: "calendar" });
  if (p.breed) items.push({ label: "犬种", value: p.breed, icon: "breed" });
  if (p.gender) items.push({ label: "性别", value: p.gender, icon: "gender" });
  if (p.weight) items.push({ label: "体重", value: p.weight, icon: "weight" });
  return items;
}

function buildRoles(aiRoles: OwnerRole[] | undefined): OwnerRole[] {
  const usedIcon = new Set<string>();
  const usedColor = new Set<string>();
  const src = (aiRoles ?? []).slice(0, 4);
  while (src.length < 4) src.push({} as OwnerRole);
  return src.map((r, i) => ({
    title: r.title || ROLE_FALLBACK[i].title,
    description: r.description || ROLE_FALLBACK[i].description,
    icon: assign(r.icon, ROLE_ICONS, usedIcon, i),
    badge_color: assign(r.badge_color, ROLE_COLORS, usedColor, i),
  }));
}

const ROLE_FALLBACK = [
  { title: "24小时饭票", description: "干饭的源泉，快乐的根基，生存的保障！" },
  { title: "情绪充电宝", description: "你在它安心，你累它贴贴，你笑它更嗨！" },
  { title: "专属保镖", description: "你安全我负责，谁靠近你我先汪汪！" },
  { title: "玩具投放员", description: "会扔玩具的人类，是最伟大的发明！" },
];

function buildDangerItems(aiItems: DangerItem[] | undefined): DangerItem[] {
  const used = new Set<string>();
  const src = (aiItems ?? []).slice(0, 4);
  while (src.length < 4) src.push({} as DangerItem);
  return src.map((d, i) => ({
    title: d.title || DANGER_FALLBACK[i].title,
    description: d.description || DANGER_FALLBACK[i].description,
    icon: "warning",
    sticker: assign(d.sticker, DANGER_STICKERS, used, i),
    speech_bubble: d.speech_bubble || DANGER_FALLBACK[i].speech_bubble,
  }));
}

const DANGER_FALLBACK = [
  { title: "不要试图跟它讲道理。", description: "它不是没听懂，它只是没有批准你的提案。", speech_bubble: "听懂了，但不执行！" },
  { title: "不要长时间冷落它。", description: "它会先 emo，再启动家庭连续剧第一集。", speech_bubble: "我 emo 了..." },
  { title: "不要低估它的无聊程度。", description: "一只无聊的狗，能把家变成案发现场。", speech_bubble: "我没事，我就想搞点事。" },
  { title: "不要在它兴致高涨时突然拒绝。", description: "它会质疑你的人品，并在心里给你差评。", speech_bubble: "你居然拒绝我？！" },
];

export interface AssembleInput {
  report_id: string;
  report_url: string;
  profile: {
    pet_name: string;
    pet_image_url: string;
    breed?: string;
    gender?: string;
    birthday?: string;
    weight?: string;
  };
  scored: ReturnType<typeof scoreAnswers>;
  ai: AIContent;
}

export function assembleReport(input: AssembleInput): Report {
  const { report_id, report_url, profile, scored, ai } = input;
  const info = TYPE_TABLE[scored.type_code];

  return {
    report_id,
    report_url,
    created_at: new Date().toISOString(),
    pet_profile: {
      pet_name: profile.pet_name,
      pet_image_url: profile.pet_image_url,
      breed: profile.breed || undefined,
      gender: profile.gender || undefined,
      birthday: formatBirthday(profile.birthday),
      weight: profile.weight || undefined,
    },
    personality_result: {
      type_code: scored.type_code,
      type_name: info.name,
      type_subtitle: ai.type_subtitle || info.tagline,
      dimension_result: scored.dimension_result,
      dimension_scores: scored.dimension_scores,
      keywords: (ai.keywords ?? []).slice(0, 4),
    },
    cover_card: {
      section_no: "01",
      section_title: "鉴定完成",
      badge_text: "鉴定完成",
      headline: profile.pet_name,
      type_label: "你的主子人格类型是：",
      type_code: scored.type_code,
      type_name: info.name,
      info_items: buildInfoItems(profile),
      quote: ai.cover_quote,
    },
    summary_card: {
      section_no: "02",
      section_title: "人格总评",
      section_subtitle: "PERSONALITY SUMMARY",
      highlight_label: "一句话总结",
      big_summary: ai.summary?.big_summary ?? "",
      paragraphs: (ai.summary?.paragraphs ?? []).slice(0, 3),
      tone: { roast: 70, sharp: 30 },
    },
    owner_role_card: {
      section_no: "03",
      section_title: "在它眼里，你是：",
      section_subtitle: "WHAT YOU ARE TO THEM",
      relationship_rating: ai.owner_role?.relationship_rating || "SSS",
      roles: buildRoles(ai.owner_role?.roles),
      true_thought_label: "它对你的真实想法：",
      true_thought: ai.owner_role?.true_thought ?? "",
    },
    radar_card: {
      section_no: "04",
      section_title: "主子人格雷达图",
      section_subtitle: "PERSONALITY RADAR",
      radar_items: RADAR_DEF.map((r) => ({
        key: r.key,
        label: r.label,
        score: scored.dimension_scores[r.letter],
        icon: r.icon,
      })),
    },
    danger_zone_card: {
      section_no: "05",
      section_title: "雷区提醒",
      section_subtitle: "DANGER ZONE",
      items: buildDangerItems(ai.danger_items),
    },
    share_card: {
      section_no: "06",
      section_title: "分享你的主子人格报告",
      section_subtitle: "SHARE YOUR REPORT",
      report_url,
      cta_text: "扫码查看完整报告，测测你家狗是哪种主子！",
      buttons: [
        { label: "生成朋友圈分享图", action: "generate_share_image", icon: "image" },
        { label: "下载完整报告", action: "download_pdf", icon: "pdf" },
        { label: "复制报告链接", action: "copy_link", icon: "link" },
      ],
    },
  };
}

export function scoreFromAnswers(answers: AnswerMap) {
  return scoreAnswers(answers);
}

export function genInputFrom(
  profile: AssembleInput["profile"],
  scored: ReturnType<typeof scoreAnswers>,
  calibration: GenInput["calibration"],
): GenInput {
  const info = TYPE_TABLE[scored.type_code];
  return {
    pet_name: profile.pet_name,
    breed: profile.breed,
    gender: profile.gender,
    type_code: scored.type_code,
    type_name: info.name,
    tagline: info.tagline,
    dimension_result: scored.dimension_result,
    dimension_scores: scored.dimension_scores,
    calibration,
  };
}
