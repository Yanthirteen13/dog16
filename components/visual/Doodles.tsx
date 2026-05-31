import type { ReactNode } from "react";

const INK = "#251F2D";
const PINK = "#FF2D7A";
const YELLOW = "#FFD23F";
const BLUE = "#4DA3FF";

type SvgProps = {
  className?: string;
  size?: number;
};

/** Brand paw mark — pink pad + 4 toes, thin black outline. */
export function BrandPawLogo({ className, size = 28 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="16"
        cy="21"
        rx="7.6"
        ry="6.6"
        fill={PINK}
        stroke={INK}
        strokeWidth="1.8"
      />
      <ellipse cx="8" cy="12.5" rx="2.7" ry="3.3" fill={PINK} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="13.8" cy="8.6" rx="2.7" ry="3.5" fill={PINK} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="20.2" cy="8.6" rx="2.7" ry="3.5" fill={PINK} stroke={INK} strokeWidth="1.8" />
      <ellipse cx="26" cy="12.5" rx="2.7" ry="3.3" fill={PINK} stroke={INK} strokeWidth="1.8" />
    </svg>
  );
}

/** Heart — pink fill, thin black outline, slight hand-drawn lean. */
export function DoodleHeart({ className, size = 24 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 20.5C6 16.4 3 13 3 9.2 3 6.4 5.1 4.5 7.7 4.5c1.8 0 3.3 1 4.3 2.6 1-1.6 2.5-2.6 4.3-2.6C18.9 4.5 21 6.4 21 9.2c0 3.8-3 7.2-9 11.3Z"
        fill={PINK}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Four-point sparkle star — yellow fill, thin black outline. */
export function DoodleStar({ className, size = 22 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5c.7 4.7 2.1 6.1 6.8 6.8v.4c-4.7.7-6.1 2.1-6.8 6.8h-.4c-.7-4.7-2.1-6.1-6.8-6.8v-.4C9.5 8.6 10.9 7.2 11.6 2.5Z"
        transform="translate(0 1.4)"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Lightning bolt — yellow fill, thin black outline. */
export function DoodleLightning({ className, size = 22 }: SvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.5 2.5 5 13.2h5.2L9 21.5 19 9.8h-5.6l1.1-7.3Z"
        fill={YELLOW}
        stroke={INK}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** One-line burn sticky-note. Card with thin black border, a bit of tape, a pink quote. */
export function RoastNote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* tape */}
      <span
        className="absolute -top-2 left-1/2 h-4 w-12 -translate-x-1/2 -rotate-3 rounded-[3px] border border-roast-ink/70"
        style={{ background: "rgba(255,210,63,0.7)" }}
      />
      <div
        className="relative rounded-2xl border-2 bg-white px-4 py-3 shadow-[3px_4px_0_0_rgba(37,31,45,0.9)]"
        style={{ borderColor: INK, rotate: "-2deg" }}
      >
        <svg
          className="absolute -left-1 -top-3"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 14c0-4 2.5-7 6-8m6 8c0-4 2.5-7 6-8"
            stroke={PINK}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-[13px] font-extrabold leading-snug text-roast-ink">
          {children}
        </p>
        <span
          className="absolute -bottom-1.5 right-4 h-3 w-3 rotate-45 border-b-2 border-r-2 bg-white"
          style={{ borderColor: INK }}
        />
      </div>
    </div>
  );
}

export const DOODLE_COLORS = { INK, PINK, YELLOW, BLUE };
