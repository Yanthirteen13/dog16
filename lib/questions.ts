// Dog 16-type questionnaire v1.
// Per dimension, options map: A = left +2, B = left +1, C = right +1, D = right +2.
// EI left=E, SN left=S, TF left=T, JP left=J. Q25 is a style-calibration question (not scored).

export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface Option {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface Question {
  id: number;
  dimension: Dimension;
  section: string;
  title: string;
  options: Option[];
}

export const SECTIONS: Record<Dimension, string> = {
  EI: "一、E vs I：社交充电狗 / 独处回血狗",
  SN: "二、S vs N：务实干饭狗 / 脑洞警觉狗",
  TF: "三、T vs F：直球铁头狗 / 情绪共振狗",
  JP: "四、J vs P：生物钟大师 / 随机发疯派",
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "出门遇到陌生狗，它第一反应通常是？",
    options: [
      { key: "A", text: "立刻冲上去开聊，仿佛小区狗圈没有它不认识的狗" },
      { key: "B", text: "先装矜持三秒，然后开始友好闻闻" },
      { key: "C", text: "躲在你腿边暗中观察，主打谨慎交友" },
      { key: "D", text: "原地启动退堂鼓：这社交局谁爱去谁去" },
    ],
  },
  {
    id: 2,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "家里来了客人，它一般会？",
    options: [
      { key: "A", text: "第一时间冲过去营业，像家里请来的迎宾经理" },
      { key: "B", text: "会主动靠近看看，确认对方是不是好人类" },
      { key: "C", text: "远远观察，等它觉得安全了才赏脸出现" },
      { key: "D", text: "直接消失，仿佛家里从来没有这条狗" },
    ],
  },
  {
    id: 3,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "去狗公园时，它更像？",
    options: [
      { key: "A", text: "狗群主持人，恨不得给每只狗都发名片" },
      { key: "B", text: "会主动找合眼缘的狗玩，社交但不乱社交" },
      { key: "C", text: "多数时候跟着你，偶尔偷偷观察别的狗" },
      { key: "D", text: "全程想下班：我只是被人类绑架来的" },
    ],
  },
  {
    id: 4,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "一天玩完回家后，它通常？",
    options: [
      { key: "A", text: "还没尽兴，继续叼玩具来找你加班" },
      { key: "B", text: "有点累，但你一招呼它还能再营业一会儿" },
      { key: "C", text: "自己找地方趴着，需要安静回血" },
      { key: "D", text: "直接关机，谁碰它谁就是不懂边界感" },
    ],
  },
  {
    id: 5,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "面对陌生人夸它、摸它，它会？",
    options: [
      { key: "A", text: "立刻配合，尾巴摇得像小电风扇" },
      { key: "B", text: "可以摸，但要先通过它的气味审核" },
      { key: "C", text: "身体后撤，表情写着“你谁啊”" },
      { key: "D", text: "明确拒绝：本汪不提供陌生人情绪价值" },
    ],
  },
  {
    id: 6,
    dimension: "EI",
    section: SECTIONS.EI,
    title: "它平时最像哪种狗？",
    options: [
      { key: "A", text: "哪里热闹往哪里钻，天生爱凑局" },
      { key: "B", text: "熟人局很放松，陌生局也能适应" },
      { key: "C", text: "只在安全圈里活跃，出圈就谨慎" },
      { key: "D", text: "独处才是顶级享受，人多狗多都费电" },
    ],
  },
  {
    id: 7,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "它最容易被什么召唤？",
    options: [
      { key: "A", text: "零食袋一响，瞬间闪现，像装了雷达" },
      { key: "B", text: "玩具、球、食物这类真实奖励最有效" },
      { key: "C", text: "门外一点动静、角落一点变化都会吸引它" },
      { key: "D", text: "空气、墙角、天花板，疑似在接收外星信号" },
    ],
  },
  {
    id: 8,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "面对新玩具，它通常会？",
    options: [
      { key: "A", text: "直接上嘴，先咬了再说，实践出真知" },
      { key: "B", text: "闻一闻、扒拉两下，很快进入战斗状态" },
      { key: "C", text: "绕着它观察，像在做风险评估" },
      { key: "D", text: "盯着它研究半天，仿佛怀疑里面住了灵魂" },
    ],
  },
  {
    id: 9,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "训练时它更吃哪一套？",
    options: [
      { key: "A", text: "有吃的什么都好说，没有吃的免谈" },
      { key: "B", text: "零食和夸奖都能用，但奖励必须明确" },
      { key: "C", text: "容易被环境影响，旁边有动静就走神" },
      { key: "D", text: "训练到一半突然开始思考狗生，注意力飘去宇宙" },
    ],
  },
  {
    id: 10,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "家里突然多了一个纸箱/快递，它会？",
    options: [
      { key: "A", text: "先看有没有能吃的，没有就兴趣下降" },
      { key: "B", text: "闻闻看看，确认一下这是不是新玩具" },
      { key: "C", text: "谨慎靠近，围着绕几圈再决定" },
      { key: "D", text: "如临大敌：这不是纸箱，这是入侵者" },
    ],
  },
  {
    id: 11,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "散步时它更关注什么？",
    options: [
      { key: "A", text: "地上有没有吃的、球、树枝，现实得很" },
      { key: "B", text: "气味、路线、能不能玩，目标比较明确" },
      { key: "C", text: "远处声音、陌生人、奇怪物体都会让它分心" },
      { key: "D", text: "它经常突然定住，像看到你看不见的剧情线" },
    ],
  },
  {
    id: 12,
    dimension: "SN",
    section: SECTIONS.SN,
    title: "它平时发呆的时候，更像？",
    options: [
      { key: "A", text: "基本不发呆，有吃有玩就是人生主线" },
      { key: "B", text: "偶尔放空，但很快被现实奖励拉回来" },
      { key: "C", text: "经常盯着某处，像在预判环境变化" },
      { key: "D", text: "盯着虚空十分钟，表情像刚接完神秘任务" },
    ],
  },
  {
    id: 13,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "你假装哭的时候，它通常会？",
    options: [
      { key: "A", text: "冷眼旁观：人类又开始演了" },
      { key: "B", text: "看你一眼，然后继续研究地板上有没有吃的" },
      { key: "C", text: "凑过来闻闻你，像在排查家里哪个零件坏了" },
      { key: "D", text: "立刻贴贴舔舔：别哭，本汪还在" },
    ],
  },
  {
    id: 14,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "它犯错后，比如咬坏拖鞋、打翻东西，会？",
    options: [
      { key: "A", text: "理直气壮看着你，仿佛拖鞋先动的手" },
      { key: "B", text: "知道你在生气，但它觉得问题不大" },
      { key: "C", text: "会观察你脸色，有点心虚但还能撑住" },
      { key: "D", text: "立刻低头委屈，像刚被全世界误解" },
    ],
  },
  {
    id: 15,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "你语气变严肃时，它会？",
    options: [
      { key: "A", text: "基本不受影响，继续顶风作案" },
      { key: "B", text: "停一下，但很快恢复自己的节奏" },
      { key: "C", text: "明显变谨慎，开始看你脸色" },
      { key: "D", text: "立刻耳朵后贴，眼神开始写小作文" },
    ],
  },
  {
    id: 16,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "它争宠的时候通常？",
    options: [
      { key: "A", text: "不争，反正它相信自己地位稳如老干部" },
      { key: "B", text: "会过来看一眼，但不太放低姿态" },
      { key: "C", text: "会主动靠近刷存在感，提醒你别忘了它" },
      { key: "D", text: "醋意明显：你摸别的狗，就是感情事故" },
    ],
  },
  {
    id: 17,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "主人难过或疲惫时，它更像？",
    options: [
      { key: "A", text: "“你难过你的，我忙我的”，情绪边界清晰" },
      { key: "B", text: "会注意到，但不一定主动安慰" },
      { key: "C", text: "会靠过来陪着，像安静的小棉袄" },
      { key: "D", text: "情绪同步拉满，你 emo 它也跟着 emo" },
    ],
  },
  {
    id: 18,
    dimension: "TF",
    section: SECTIONS.TF,
    title: "它被夸奖时通常？",
    options: [
      { key: "A", text: "没太大反应，仿佛夸奖只是人类的噪音" },
      { key: "B", text: "有点开心，但不会表现得太明显" },
      { key: "C", text: "明显兴奋，会更愿意配合你" },
      { key: "D", text: "开心到起飞：请继续，本汪爱听" },
    ],
  },
  {
    id: 19,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "到了饭点但你还没喂，它会？",
    options: [
      { key: "A", text: "准时出现在饭盆旁：人类，系统已超时" },
      { key: "B", text: "用眼神、哼唧、蹭你疯狂暗示" },
      { key: "C", text: "有时提醒，有时自己也忘了这回事" },
      { key: "D", text: "饭点？不存在的，今天想几点吃看心情" },
    ],
  },
  {
    id: 20,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "它的散步时间通常？",
    options: [
      { key: "A", text: "非常精准，到点就开始催你上班" },
      { key: "B", text: "大致固定，晚一点它会明显提醒" },
      { key: "C", text: "有规律，但经常被心情和天气打断" },
      { key: "D", text: "完全随机，今天想冲刺，明天想罢工" },
    ],
  },
  {
    id: 21,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "散步路线被改变时，它会？",
    options: [
      { key: "A", text: "不太乐意：本汪的路线规划不接受临时改版" },
      { key: "B", text: "会疑惑一下，但勉强能接受" },
      { key: "C", text: "觉得还行，新路线也可以探索" },
      { key: "D", text: "太好了！随机地图才是狗生乐趣" },
    ],
  },
  {
    id: 22,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "它玩耍的时候更像？",
    options: [
      { key: "A", text: "有固定玩法，球就该这么玩，绳就该这么咬" },
      { key: "B", text: "喜欢熟悉游戏，但偶尔能换换花样" },
      { key: "C", text: "玩着玩着突然换目标，兴趣来得快去得也快" },
      { key: "D", text: "彻底随机：上一秒叼球，下一秒开始攻击空气" },
    ],
  },
  {
    id: 23,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "它睡觉作息通常？",
    options: [
      { key: "A", text: "很规律，到点自动进窝，像打卡下班" },
      { key: "B", text: "大致稳定，只是偶尔熬夜陪你" },
      { key: "C", text: "经常换地方、换时间，看心情安排" },
      { key: "D", text: "半夜两点突然跑酷，疑似体内住了夜班保安" },
    ],
  },
  {
    id: 24,
    dimension: "JP",
    section: SECTIONS.JP,
    title: "面对训练规则，它通常？",
    options: [
      { key: "A", text: "一旦学会就稳定执行，是规则界优秀员工" },
      { key: "B", text: "大多数时候能执行，偶尔偷懒" },
      { key: "C", text: "知道规则，但经常选择性失忆" },
      { key: "D", text: "规则是人类的幻想，本汪只服从当下灵感" },
    ],
  },
];

// Q25 — style-calibration question. Not scored; passed to the AI to tune report tone.
export interface CalibrationOption {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export const CALIBRATION_QUESTION = {
  id: 25,
  section: "五、综合校准题",
  title: "如果用一句话总结你家狗，它最像？",
  options: [
    { key: "A", text: "社交积极、目标明确、情绪独立、作息稳定的狗界公务员" },
    { key: "B", text: "热情但有点小心思，整体还算听得懂人话" },
    { key: "C", text: "敏感、会脑补、情绪细腻，但偶尔随机掉线" },
    { key: "D", text: "又疯又可爱，像一台装着毛的随机事件生成器" },
  ] as CalibrationOption[],
};
