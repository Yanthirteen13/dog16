import SectionHeader from "./SectionHeader";
import { sticker } from "@/lib/stickers";
import type { DangerZoneCard as DangerZoneCardData } from "@/lib/types";

export default function DangerZoneCard({
  data,
}: {
  data: DangerZoneCardData;
}) {
  return (
    <section className="card p-5">
      <SectionHeader no={data.section_no} title={data.section_title} subtitle={data.section_subtitle} />

      <div className="space-y-3">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-2xl bg-cream p-3"
          >
            <div className="relative shrink-0">
              {sticker(item.sticker) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={sticker(item.sticker)}
                  alt=""
                  className="h-14 w-14"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-base leading-none">⚠️</span>
                <span className="text-sm font-black text-ink">
                  {item.title}
                </span>
              </div>
              <p className="mt-1 text-xs leading-snug text-ink/65">
                {item.description}
              </p>
              {item.speech_bubble && (
                <span className="mt-2 inline-block rounded-full rounded-bl-sm bg-primary px-3 py-1 text-[11px] font-bold text-white">
                  {item.speech_bubble}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
