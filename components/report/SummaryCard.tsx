import SectionHeader from "./SectionHeader";
import type { SummaryCard as SummaryCardData } from "@/lib/types";

export default function SummaryCard({ data }: { data: SummaryCardData }) {
  return (
    <section className="card p-5">
      <SectionHeader
        no={data.section_no}
        title={data.section_title}
        subtitle={data.section_subtitle}
      />

      <div className="rounded-2xl bg-ink px-5 py-5">
        <div className="text-[10px] font-bold tracking-widest text-white/40">
          {data.highlight_label}
        </div>
        <p className="mt-2 text-xl font-black leading-snug text-white">
          {data.big_summary}
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {data.paragraphs.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-ink/80">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
