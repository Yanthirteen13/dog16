import { notFound } from "next/navigation";
import QRCode from "qrcode";
import ReportView from "@/components/report/ReportView";
import { getReport } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const report = await getReport(id);
  if (!report) notFound();

  const qrDataUrl = await QRCode.toDataURL(report.report_url, {
    margin: 1,
    width: 200,
    color: { dark: "#2C2A3A", light: "#FFFFFF" },
  });

  return <ReportView report={report} qrDataUrl={qrDataUrl} />;
}
