import fs from "fs/promises";
import path from "path";
import type { Report } from "./types";

const REPORTS_DIR = path.join(process.cwd(), "reports");

// On Vercel (or any serverless host) the local filesystem is ephemeral and not
// shared across requests, so reports are stored in Vercel Blob instead. We
// switch backends automatically based on the presence of the Blob token, which
// keeps local development on the plain filesystem with zero config.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

export function makeReportId(): string {
  const rand = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now().toString(36);
  return `rpt_${stamp}${rand}`;
}

const ID_RE = /^rpt_[a-z0-9]+$/i;

function blobKey(id: string): string {
  return `reports/${id}.json`;
}

export async function saveReport(report: Report): Promise<void> {
  if (useBlob) {
    const { put } = await import("@vercel/blob");
    await put(blobKey(report.report_id), JSON.stringify(report), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  await fs.mkdir(REPORTS_DIR, { recursive: true });
  const file = path.join(REPORTS_DIR, `${report.report_id}.json`);
  await fs.writeFile(file, JSON.stringify(report, null, 2), "utf8");
}

export async function getReport(id: string): Promise<Report | null> {
  if (!ID_RE.test(id)) return null; // guard against path traversal

  if (useBlob) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list({ prefix: blobKey(id), limit: 1 });
      const hit = blobs.find((b) => b.pathname === blobKey(id));
      if (!hit) return null;
      const res = await fetch(hit.url, { cache: "no-store" });
      if (!res.ok) return null;
      return (await res.json()) as Report;
    } catch {
      return null;
    }
  }

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
