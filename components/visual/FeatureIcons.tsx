import { DOODLE_COLORS } from "./Doodles";

const { INK, PINK, YELLOW, BLUE } = DOODLE_COLORS;

type IconProps = {
  className?: string;
  size?: number;
};

function tinyPaw(cx: number, cy: number, fill: string, scale = 1) {
  const s = scale;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 2.4 * s} rx={3 * s} ry={2.6 * s} fill={fill} stroke={INK} strokeWidth="1.4" />
      <circle cx={cx - 3 * s} cy={cy - 1.4 * s} r={1.4 * s} fill={fill} stroke={INK} strokeWidth="1.2" />
      <circle cx={cx} cy={cy - 2.8 * s} r={1.4 * s} fill={fill} stroke={INK} strokeWidth="1.2" />
      <circle cx={cx + 3 * s} cy={cy - 1.4 * s} r={1.4 * s} fill={fill} stroke={INK} strokeWidth="1.2" />
    </g>
  );
}

/** 鉴定人格 — magnifier with a little paw inside the lens. */
export function FeatureIconPersonality({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <line x1="25" y1="25" x2="33" y2="33" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="17" cy="17" r="11.5" fill="#fff" stroke={INK} strokeWidth="2.4" />
      {tinyPaw(17, 17, PINK, 0.92)}
    </svg>
  );
}

/** 行为画像 — a trail of paw prints. */
export function FeatureIconBehavior({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      {tinyPaw(10, 29, PINK, 1)}
      {tinyPaw(20, 19, "#fff", 1)}
      {tinyPaw(30, 9, PINK, 1)}
    </svg>
  );
}

/** 关系解读 — two overlapping hearts. */
export function FeatureIconRelationship({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 33C8 27.5 4 23 4 17.7 4 13.9 6.8 11.3 10.3 11.3c2.4 0 4.4 1.4 5.7 3.5 1.3-2.1 3.3-3.5 5.7-3.5 3.5 0 6.3 2.6 6.3 6.4 0 5.3-4 9.8-12 15.3Z"
        fill={PINK}
        stroke={INK}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M28.5 17.5c-3.8-2.6-5.7-4.8-5.7-7.4 0-1.9 1.4-3.2 3.1-3.2 1.2 0 2.2.7 2.6 1.7.4-1 1.4-1.7 2.6-1.7 1.7 0 3.1 1.3 3.1 3.2 0 2.6-1.9 4.8-5.7 7.4Z"
        fill={BLUE}
        stroke={INK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 雷区提醒 — warning triangle with exclamation. */
export function FeatureIconDanger({ className, size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 6.5 35 31.5Q36.4 34 33.4 34H6.6Q3.6 34 5 31.5Z"
        fill={PINK}
        stroke={INK}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <rect x="18.4" y="15" width="3.2" height="9" rx="1.6" fill="#fff" />
      <circle cx="20" cy="28.5" r="1.9" fill="#fff" />
      <path d="M31 8.5l1.8 1.4M33 13l2.2-.4" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
