"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Report, ShareButton } from "@/lib/types";
import CoverCard from "./CoverCard";
import SummaryCard from "./SummaryCard";
import OwnerRoleCard from "./OwnerRoleCard";
import RadarCard from "./RadarCard";
import DangerZoneCard from "./DangerZoneCard";
import ShareFooter from "./ShareFooter";
import SharePoster from "./SharePoster";

export default function ReportView({
  report,
  qrDataUrl,
}: {
  report: Report;
  qrDataUrl: string;
}) {
  const captureRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const fileBase = `${report.pet_profile.pet_name}-主子人格-${report.personality_result.type_code}`;

  function flash(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }

  async function renderCanvas() {
    const html2canvas = (await import("html2canvas")).default;
    const el = captureRef.current!;
    return html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFE9F0",
      logging: false,
    });
  }

  async function renderPoster() {
    const html2canvas = (await import("html2canvas")).default;
    const el = posterRef.current!;
    return html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#F7F0EE",
      logging: false,
    });
  }

  async function onShareImage() {
    setBusy("image");
    try {
      const canvas = await renderPoster();
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileBase}.png`;
      a.click();
      flash("分享图已生成，去发圈吧！");
    } catch {
      flash("生成失败，请重试");
    } finally {
      setBusy(null);
    }
  }

  async function onDownloadPdf() {
    setBusy("pdf");
    try {
      const canvas = await renderCanvas();
      const { jsPDF } = await import("jspdf");
      const w = canvas.width;
      const h = canvas.height;
      const pdf = new jsPDF({
        orientation: h >= w ? "portrait" : "landscape",
        unit: "px",
        format: [w, h],
      });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, w, h);
      pdf.save(`${fileBase}.pdf`);
      flash("报告 PDF 已下载");
    } catch {
      flash("生成失败，请重试");
    } finally {
      setBusy(null);
    }
  }

  async function onCopyLink() {
    try {
      await navigator.clipboard.writeText(report.report_url);
      flash("链接已复制，发给朋友审判一下！");
    } catch {
      flash(report.report_url);
    }
  }

  function handle(btn: ShareButton) {
    if (busy) return;
    if (btn.action === "generate_share_image") onShareImage();
    else if (btn.action === "download_pdf") onDownloadPdf();
    else if (btn.action === "copy_link") onCopyLink();
  }

  return (
    <main className="mx-auto max-w-[480px] px-4 py-6">
      <div ref={captureRef} className="space-y-4">
        <CoverCard data={report.cover_card} profile={report.pet_profile} />
        <SummaryCard data={report.summary_card} />
        <OwnerRoleCard data={report.owner_role_card} />
        <RadarCard data={report.radar_card} />
        <DangerZoneCard data={report.danger_zone_card} />
        <ShareFooter data={report.share_card} qrDataUrl={qrDataUrl} />
      </div>

      {/* off-screen social-share poster (captured by "生成分享图") */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-10000px] top-0"
      >
        <div ref={posterRef}>
          <SharePoster report={report} qrDataUrl={qrDataUrl} />
        </div>
      </div>

      {/* action buttons (not part of the share image) */}
      <div className="mt-5 space-y-2.5">
        {report.share_card.buttons.map((btn) => {
          const isBusy =
            (busy === "image" && btn.action === "generate_share_image") ||
            (busy === "pdf" && btn.action === "download_pdf");
          const primary = btn.action === "generate_share_image";
          return (
            <button
              key={btn.action}
              onClick={() => handle(btn)}
              disabled={!!busy}
              className={`w-full ${primary ? "btn-primary" : "btn-ghost"}`}
            >
              {isBusy ? "生成中..." : btn.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-6 text-sm font-bold text-ink/50">
        <Link href="/test">再测一只</Link>
        <Link href="/">回首页</Link>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
