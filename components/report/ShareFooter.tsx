import type { ShareCard as ShareCardData } from "@/lib/types";

export default function ShareFooter({
  data,
  qrDataUrl,
}: {
  data: ShareCardData;
  qrDataUrl: string;
}) {
  return (
    <section className="card flex items-center gap-4 p-5">
      <div className="min-w-0 flex-1">
        <div className="text-xs font-black tracking-widest text-primary">
          狗狗 16 型主子人格测试
        </div>
        <p className="mt-2 text-sm font-bold leading-snug text-ink">
          {data.cta_text}
        </p>
        <p className="mt-2 text-[10px] text-ink/40">
          每一只狗狗，都是独一无二的主子
        </p>
      </div>
      {qrDataUrl && (
        <div className="shrink-0 rounded-xl bg-white p-1.5 shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrDataUrl} alt="扫码查看报告" className="h-24 w-24" />
        </div>
      )}
    </section>
  );
}
