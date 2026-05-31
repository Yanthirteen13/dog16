import { sticker } from "@/lib/stickers";
import type { CoverCard as CoverCardData, PetProfile } from "@/lib/types";

export default function CoverCard({
  data,
  profile,
}: {
  data: CoverCardData;
  profile: PetProfile;
}) {
  return (
    <section className="card overflow-hidden">
      {/* header strip */}
      <div className="flex items-center justify-between bg-primary px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
            {data.section_no}
          </span>
          <span className="text-base font-black text-white">
            {data.section_title}
          </span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={sticker("stamp")} alt="" className="h-9 w-9" />
      </div>

      <div className="p-5">
        <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-3xl border-4 border-primary-soft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.pet_image_url}
            alt={profile.pet_name}
            className="h-full w-full object-cover"
          />
        </div>

        <h1 className="mt-4 text-center text-3xl font-black text-ink">
          {data.headline}
        </h1>
        <p className="mt-3 text-center text-xs font-bold text-ink/50">
          {data.type_label}
        </p>
        <div className="mt-1 text-center">
          <span className="text-4xl font-black tracking-wider text-primary">
            {data.type_code}
          </span>
        </div>
        <div className="mt-2 flex justify-center">
          <span className="rounded-full bg-primary-soft px-4 py-1.5 text-sm font-black text-primary-dark">
            {data.type_name}
          </span>
        </div>

        {data.info_items.length > 0 && (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {data.info_items.map((it) => (
              <div
                key={it.label}
                className="flex items-center gap-2 rounded-xl bg-cream px-3 py-2"
              >
                {sticker(it.icon) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={sticker(it.icon)} alt="" className="h-6 w-6" />
                )}
                <div className="leading-tight">
                  <div className="text-[10px] text-ink/40">{it.label}</div>
                  <div className="text-xs font-bold text-ink">{it.value}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="relative mt-5 rounded-2xl bg-primary-soft/60 px-5 py-4">
          <span className="absolute left-3 top-1 text-3xl leading-none text-primary/40">
            “
          </span>
          <p className="px-3 text-center text-sm font-bold leading-relaxed text-ink">
            {data.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
