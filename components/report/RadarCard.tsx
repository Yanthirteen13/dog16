import SectionHeader from "./SectionHeader";
import type { RadarCard as RadarCardData, RadarItem } from "@/lib/types";

const CX = 170;
const CY = 158;
const R = 104;

function pointAt(i: number, total: number, radius: number) {
  const theta = ((-90 + (i * 360) / total) * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(theta),
    y: CY + radius * Math.sin(theta),
    cos: Math.cos(theta),
    sin: Math.sin(theta),
  };
}

function polygon(items: RadarItem[], radiusFn: (it: RadarItem) => number) {
  return items
    .map((it, i) => {
      const p = pointAt(i, items.length, radiusFn(it));
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

export default function RadarCard({ data }: { data: RadarCardData }) {
  const items = data.radar_items;
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <section className="card p-5">
      <SectionHeader no={data.section_no} title={data.section_title} subtitle={data.section_subtitle} />

      <svg viewBox="0 0 340 316" className="w-full">
        {/* grid rings */}
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={polygon(items, () => R * ring)}
            fill="none"
            stroke="#FFD6E4"
            strokeWidth={1}
          />
        ))}
        {/* axes */}
        {items.map((_, i) => {
          const p = pointAt(i, items.length, R);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke="#FFD6E4"
              strokeWidth={1}
            />
          );
        })}
        {/* data polygon */}
        <polygon
          points={polygon(items, (it) => (R * it.score) / 100)}
          fill="rgba(255,78,142,0.28)"
          stroke="#FF4E8E"
          strokeWidth={2.5}
        />
        {/* data points */}
        {items.map((it, i) => {
          const p = pointAt(i, items.length, (R * it.score) / 100);
          return <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#FF4E8E" />;
        })}
        {/* labels */}
        {items.map((it, i) => {
          const p = pointAt(i, items.length, R + 16);
          const anchor =
            p.cos > 0.3 ? "start" : p.cos < -0.3 ? "end" : "middle";
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-ink"
              fontSize="10.5"
              fontWeight="700"
            >
              {it.label}
              <tspan fill="#FF4E8E"> {it.score}</tspan>
            </text>
          );
        })}
      </svg>
    </section>
  );
}
