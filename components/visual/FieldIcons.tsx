import { DOODLE_COLORS } from "./Doodles";

const { INK, PINK } = DOODLE_COLORS;

type IconProps = {
  className?: string;
  size?: number;
};

/** 名字 — luggage/name tag with a pink hole. */
export function FieldIconName({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M11.4 4H18a2 2 0 0 1 2 2v6.6a2 2 0 0 1-.6 1.4l-5.4 5.4a2 2 0 0 1-2.8 0L4.6 13.8a2 2 0 0 1 0-2.8l5.4-5.4A2 2 0 0 1 11.4 4Z"
        fill="#fff"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="15.2" cy="8.8" r="1.6" fill={PINK} stroke={INK} strokeWidth="1.4" />
    </svg>
  );
}

/** 犬种 — paw print. */
export function FieldIconBreed({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="12" cy="16" rx="4.4" ry="3.6" fill={PINK} stroke={INK} strokeWidth="1.7" />
      <circle cx="7.6" cy="11.4" r="1.9" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <circle cx="11" cy="8.4" r="1.9" fill={PINK} stroke={INK} strokeWidth="1.5" />
      <circle cx="15" cy="9.2" r="1.9" fill={PINK} stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}

/** 性别 — combined venus/mars symbol. */
export function FieldIconGender({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="13" r="4.4" fill="#fff" stroke={INK} strokeWidth="1.8" />
      <path d="M13.2 9.8 19 4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M15 4h4v4" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 17.4V21M8.2 19.2h3.6" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** 生日 — birthday cake with a pink flame. */
export function FieldIconBirthday({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12.5c0-1.4 1.1-2.5 2.5-2.5h9c1.4 0 2.5 1.1 2.5 2.5V19H5z"
        fill="#fff"
        stroke={INK}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M5 14.5c1.4 1.2 2.6 1.2 3.5 0 1 1.2 2.1 1.2 3.5 0 1.4 1.2 2.5 1.2 3.5 0 .9 1.2 2.1 1.2 3.5 0" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9.8V6.5" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3.5c1.2 1.1 1.2 2.3 0 3-1.2-.7-1.2-1.9 0-3Z" fill={PINK} stroke={INK} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 19h14" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/** 体重 — dumbbell. */
export function FieldIconWeight({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="8.5" width="3.4" height="7" rx="1.2" fill={PINK} stroke={INK} strokeWidth="1.6" />
      <rect x="18.1" y="8.5" width="3.4" height="7" rx="1.2" fill={PINK} stroke={INK} strokeWidth="1.6" />
      <rect x="5.5" y="10.6" width="13" height="2.8" rx="1.4" fill="#fff" stroke={INK} strokeWidth="1.6" />
    </svg>
  );
}

/** 照片 — camera with a pink lens. */
export function FieldIconPhoto({ className, size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 8.5C3 7.1 4.1 6 5.5 6h1.7l1.1-1.8a1.4 1.4 0 0 1 1.2-.7h3a1.4 1.4 0 0 1 1.2.7L15.8 6h2.7C19.9 6 21 7.1 21 8.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        fill="#fff"
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.6" r="3.6" fill={PINK} stroke={INK} strokeWidth="1.7" />
    </svg>
  );
}
