import SectionHeader from "./SectionHeader";
import { sticker } from "@/lib/stickers";
import type { OwnerRoleCard as OwnerRoleCardData } from "@/lib/types";

const BADGE: Record<string, { bg: string; text: string }> = {
  yellow: { bg: "bg-sun/25", text: "text-yellow-700" },
  green: { bg: "bg-grass/25", text: "text-green-700" },
  blue: { bg: "bg-sky/25", text: "text-sky-700" },
  purple: { bg: "bg-grape/25", text: "text-purple-700" },
};

export default function OwnerRoleCard({ data }: { data: OwnerRoleCardData }) {
  return (
    <section className="card p-5">
      <div className="flex items-start justify-between">
        <SectionHeader no={data.section_no} title={data.section_title} subtitle={data.section_subtitle} />
        <div className="flex items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={sticker("crown")} alt="" className="h-6 w-6" />
          <span className="text-xs font-bold text-ink/50">关系评级</span>
          <span className="text-xl font-black text-primary">
            {data.relationship_rating}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.roles.map((r) => {
          const badge = BADGE[r.badge_color] ?? BADGE.yellow;
          return (
            <div
              key={r.title}
              className={`flex flex-col gap-2 rounded-2xl p-3 ${badge.bg}`}
            >
              {sticker(r.icon) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sticker(r.icon)} alt="" className="h-10 w-10" />
              )}
              <div className={`text-sm font-black ${badge.text}`}>{r.title}</div>
              <div className="text-xs leading-snug text-ink/70">
                {r.description}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-primary-soft/60 px-4 py-3">
        <div className="text-[10px] font-bold text-primary-dark/70">
          {data.true_thought_label}
        </div>
        <p className="mt-1 text-sm font-bold leading-relaxed text-ink">
          {data.true_thought}
        </p>
      </div>
    </section>
  );
}
