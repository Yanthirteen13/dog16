// ---- Personality dimensions ----

export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type TypeCode = `${"E" | "I"}${"S" | "N"}${"T" | "F"}${"J" | "P"}`;

export type DimensionScores = Record<Letter, number>;

export interface DimensionResult {
  EI: "E" | "I";
  SN: "S" | "N";
  TF: "T" | "F";
  JP: "J" | "P";
}

// ---- 16 type table (from spec) ----

export interface TypeInfo {
  name: string;
  tagline: string;
}

export const TYPE_TABLE: Record<TypeCode, TypeInfo> = {
  ENFP: { name: "社交发疯小太阳", tagline: "见人想贴，见狗想聊，快乐像开了自动续费" },
  ENFJ: { name: "小区气氛组组长", tagline: "热情、会照顾情绪，还喜欢管理全场氛围" },
  ENTJ: { name: "狗界霸道总裁", tagline: "目标明确，行动力强，顺便觉得全家都该听它的" },
  ENTP: { name: "混乱快乐发明家", tagline: "脑洞大、点子多，拆家都像在做实验" },
  ESFP: { name: "人来疯派对王", tagline: "有人就兴奋，有局就参加，天生不允许冷场" },
  ESFJ: { name: "贴贴服务部部长", tagline: "爱社交、爱陪伴，主打一个全家情绪售后" },
  ESTJ: { name: "小区纪律委员", tagline: "规律、强势、有原则，觉得家里需要它来管理" },
  ESTP: { name: "草坪飙车刺头", tagline: "现实、胆大、爱冲，看到机会就立刻开干" },
  INFP: { name: "玻璃心幻想家", tagline: "敏感、慢热、爱脑补，内心戏比主人还多" },
  INFJ: { name: "安静灵魂保镖", tagline: "温柔、警觉、会观察，默默守着你的小影子" },
  INTJ: { name: "高冷战略狗", tagline: "看起来冷淡，其实在默默分析全家的运行逻辑" },
  INTP: { name: "狗界发呆学者", tagline: "经常走神，像在研究空气里的宇宙秘密" },
  ISFP: { name: "慢热软糯小艺术家", tagline: "温柔、随性、凭感觉生活，喜欢安静但也会突然可爱" },
  ISFJ: { name: "居家守护小棉袄", tagline: "稳定、细腻、恋家，是你身边最安静的陪伴者" },
  ISTJ: { name: "生物钟老干部", tagline: "规律、可靠、认路线，到点吃饭到点巡逻" },
  ISTP: { name: "冷静拆弹专家", tagline: "不吵不闹，但一出手就精准解决它感兴趣的问题" },
};

// ---- Report JSON schema (v1) ----

export interface PetProfile {
  pet_name: string;
  pet_image_url: string;
  breed?: string;
  gender?: string;
  birthday?: string;
  weight?: string;
}

export interface PersonalityResult {
  type_code: TypeCode;
  type_name: string;
  type_subtitle: string;
  dimension_result: DimensionResult;
  dimension_scores: DimensionScores;
  keywords: string[];
}

export interface InfoItem {
  label: string;
  value: string;
  icon: string;
}

export interface CoverCard {
  section_no: string;
  section_title: string;
  badge_text: string;
  headline: string;
  type_label: string;
  type_code: string;
  type_name: string;
  info_items: InfoItem[];
  quote: string;
}

export interface SummaryCard {
  section_no: string;
  section_title: string;
  section_subtitle: string;
  highlight_label: string;
  big_summary: string;
  paragraphs: string[];
  tone: { roast: number; sharp: number };
}

export interface OwnerRole {
  title: string;
  description: string;
  icon: string;
  badge_color: "yellow" | "green" | "blue" | "purple";
}

export interface OwnerRoleCard {
  section_no: string;
  section_title: string;
  section_subtitle: string;
  relationship_rating: string;
  roles: OwnerRole[];
  true_thought_label: string;
  true_thought: string;
}

export interface RadarItem {
  key: string;
  label: string;
  score: number;
  icon: string;
}

export interface RadarCard {
  section_no: string;
  section_title: string;
  section_subtitle: string;
  radar_items: RadarItem[];
}

export interface DangerItem {
  title: string;
  description: string;
  icon: string;
  sticker: string;
  speech_bubble: string;
}

export interface DangerZoneCard {
  section_no: string;
  section_title: string;
  section_subtitle: string;
  items: DangerItem[];
}

export interface ShareButton {
  label: string;
  action: "generate_share_image" | "download_pdf" | "copy_link";
  icon: string;
}

export interface ShareCard {
  section_no: string;
  section_title: string;
  section_subtitle: string;
  report_url: string;
  cta_text: string;
  buttons: ShareButton[];
}

export interface Report {
  report_id: string;
  report_url: string;
  created_at: string;
  pet_profile: PetProfile;
  personality_result: PersonalityResult;
  cover_card: CoverCard;
  summary_card: SummaryCard;
  owner_role_card: OwnerRoleCard;
  radar_card: RadarCard;
  danger_zone_card: DangerZoneCard;
  share_card: ShareCard;
}

// The creative fields the AI is asked to produce.
export interface AIContent {
  type_subtitle: string;
  keywords: string[];
  cover_quote: string;
  summary: {
    big_summary: string;
    paragraphs: string[];
  };
  owner_role: {
    relationship_rating: string;
    roles: OwnerRole[];
    true_thought: string;
  };
  danger_items: DangerItem[];
}
