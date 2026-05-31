import type { Report } from "@/lib/types";

/**
 * Square (1080×1080) social-share poster, two-column "personality card" layout.
 * Rendered off-screen and rasterised by html2canvas.
 * Palette: faint dusty-rose wash, white card, charcoal text, 豆沙粉 accents in light/deep shades.
 *
 * html2canvas notes:
 *  - it does NOT honour `object-fit: cover`; an <img> would be stretched. The pet
 *    photo is therefore a fixed-size <div> with a `background-image` + `cover`.
 *  - flexible (`flex-1`) heights are computed differently than the browser, so the
 *    photo height and right-column sizing are kept deterministic to avoid the QR
 *    overflowing / being clipped.
 */

const INK = "#2B2830";
const MUTED = "#9E909A";
const SUBINK = "#5A535E";
const ROSE_DEEP = "#A65C72"; // deep dusty-rose (accent text / badge letter)
const PILL_BG = "#F2E2E8"; // pill / chip background
const PILL_BORDER = "#E7CDD6";
const BADGE_BG = "#EFD9E0"; // dimension badge circle
const ROW_BG = "#FBF4F6"; // dimension row background
const ROW_BORDER = "#F1E1E6";
const FRAME = "#EFE5E5"; // photo / card frame
const CARD = "#FFFFFF";
const BASE = "#F7F0EE"; // outer wash

export default function SharePoster({
  report,
  qrDataUrl,
}: {
  report: Report;
  qrDataUrl: string;
}) {
  const { pet_profile, personality_result, cover_card } = report;
  const d = personality_result.dimension_result;
  const quote = cover_card.quote || personality_result.type_subtitle;

  const dims = [
    { pair: "E / I", name: "能量来源", letter: d.EI, pole: d.EI === "E" ? "外向" : "内向" },
    { pair: "S / N", name: "信息获取", letter: d.SN, pole: d.SN === "S" ? "实感" : "直觉" },
    { pair: "T / F", name: "决策方式", letter: d.TF, pole: d.TF === "T" ? "理性" : "感性" },
    { pair: "J / P", name: "生活态度", letter: d.JP, pole: d.JP === "J" ? "计划" : "随性" },
  ];

  return (
    <div
      style={{ width: 1080, height: 1080, backgroundColor: BASE }}
      className="flex p-8"
    >
      <div
        style={{ backgroundColor: CARD, borderColor: FRAME }}
        className="flex flex-1 flex-col rounded-[44px] border px-14 py-10"
      >
        {/* masthead */}
        <div className="flex shrink-0 items-center justify-between">
          <span
            style={{ backgroundColor: PILL_BG, borderColor: PILL_BORDER, color: ROSE_DEEP }}
            className="rounded-full border px-5 py-2 text-[22px] font-bold"
          >
            你的主子人格类型
          </span>
          <span style={{ color: ROSE_DEEP }} className="text-[26px] font-black tracking-[0.12em]">
            DOG16
          </span>
        </div>

        {/* body: photo + info */}
        <div className="mt-8 flex flex-1 gap-11">
          {/* left: photo + scan caption */}
          <div className="flex w-[384px] shrink-0 flex-col">
            <div
              style={{
                backgroundColor: "#fff",
                backgroundImage: `url(${pet_profile.pet_image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderColor: FRAME,
              }}
              className="h-[656px] w-full shrink-0 rounded-[30px] border"
              role="img"
              aria-label={pet_profile.pet_name}
            />
            <div className="mt-7 shrink-0">
              <p style={{ color: MUTED }} className="text-[20px] font-medium">
                扫码测测你家主子
              </p>
              <p style={{ color: INK }} className="mt-1 text-[26px] font-black tracking-tight">
                狗狗 16 型人格测试
              </p>
            </div>
          </div>

          {/* right: type info + dimensions + qr */}
          <div className="flex min-w-0 flex-1 flex-col">
            <span
              style={{ backgroundColor: PILL_BG, color: ROSE_DEEP }}
              className="w-fit rounded-xl px-4 py-1.5 text-[20px] font-black tracking-wide"
            >
              DOG16
            </span>
            <h1
              style={{ color: INK }}
              className="mt-3 text-[84px] font-black leading-none tracking-[0.04em]"
            >
              {personality_result.type_code}
            </h1>
            <h2 style={{ color: INK }} className="mt-3 text-[44px] font-black leading-tight">
              {personality_result.type_name}
            </h2>
            <p style={{ color: SUBINK }} className="mt-4 text-[25px] font-bold leading-snug">
              {quote}
            </p>

            <p style={{ color: MUTED }} className="mt-6 text-[21px] font-bold">
              四个关键维度
            </p>
            <div className="mt-3 space-y-2.5">
              {dims.map((it) => (
                <div
                  key={it.pair}
                  style={{ backgroundColor: ROW_BG, borderColor: ROW_BORDER }}
                  className="flex items-center justify-between rounded-2xl border px-6 py-2.5"
                >
                  <div className="min-w-0">
                    <div style={{ color: MUTED }} className="text-[16px] font-bold tracking-[0.1em]">
                      {it.pair}
                    </div>
                    <div style={{ color: INK }} className="text-[24px] font-black leading-tight">
                      {it.name} · {it.pole}
                    </div>
                  </div>
                  <div
                    style={{ backgroundColor: BADGE_BG, color: ROSE_DEEP }}
                    className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full text-[26px] font-black"
                  >
                    {it.letter}
                  </div>
                </div>
              ))}
            </div>

            {/* qr pinned bottom-right */}
            <div className="mt-auto flex justify-end pt-5">
              {qrDataUrl && (
                <div
                  style={{ borderColor: FRAME }}
                  className="rounded-2xl border bg-white p-2.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrDataUrl} alt="扫码查看报告" className="h-[140px] w-[140px]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
