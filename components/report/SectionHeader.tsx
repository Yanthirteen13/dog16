export default function SectionHeader({
  no,
  title,
  subtitle,
}: {
  no: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="section-no">{no}</span>
      <div className="leading-tight">
        <div className="text-lg font-black text-ink">{title}</div>
        {subtitle && (
          <div className="text-[10px] font-bold tracking-widest text-primary/50">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
