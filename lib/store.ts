import fs from "fs/promises";
import path from "path";
import type { Report } from "./types";

const REPORTS_DIR = path.join(process.cwd(), "reports");

export function makeReportId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36);
  return `rpt_${stamp}${rand}`;
}

const ID_RE = /^rpt_[a-z0-9]+$/i;

export async function saveReport(report: Report): Promise<void> {
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  const file = path.join(REPORTS_DIR, `${report.report_id}.json`);
  await fs.writeFile(file, JSON.stringify(report, null, 2), "utf8");
}

export async function getReport(id: string): Promise<Report | null> {
  if (!ID_RE.test(id)) return null; // guard against path traversal
  try {
    const raw = await fs.readFile(
      path.join(REPORTS_DIR, `${id}.json`),
      "utf8",
    );
    return JSON.parse(raw) as Report;
  } catch {
    return null;
  }
}

export function baseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
