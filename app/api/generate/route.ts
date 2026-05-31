import { NextRequest, NextResponse } from "next/server";
import { generateAIContent } from "@/lib/ai";
import {
  assembleReport,
  genInputFrom,
  scoreFromAnswers,
} from "@/lib/report";
import { baseUrl, makeReportId, saveReport } from "@/lib/store";
import type { AnswerMap, Choice } from "@/lib/scoring";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface Body {
  profile?: {
    pet_name?: string;
    pet_image_url?: string;
    breed?: string;
    gender?: string;
    birthday?: string;
    weight?: string;
  };
  answers?: Record<string, Choice>;
  calibration?: Choice | null;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }

  const profile = body.profile;
  if (!profile?.pet_name || !profile?.pet_image_url) {
    return NextResponse.json({ error: "缺少狗狗名字或照片" }, { status: 400 });
  }

  const answers: AnswerMap = {};
  for (const [k, v] of Object.entries(body.answers ?? {})) {
    answers[Number(k)] = v;
  }
  if (Object.keys(answers).length < 24) {
    return NextResponse.json({ error: "答题不完整" }, { status: 400 });
  }

  const scored = scoreFromAnswers(answers);

  let ai;
  try {
    ai = await generateAIContent(
      genInputFrom(
        {
          pet_name: profile.pet_name,
          pet_image_url: profile.pet_image_url,
          breed: profile.breed,
          gender: profile.gender,
          birthday: profile.birthday,
          weight: profile.weight,
        },
        scored,
        body.calibration ?? null,
      ),
    );
  } catch (err) {
    console.error("[generate] AI error:", err);
    return NextResponse.json(
      { error: "AI 生成失败，请稍后重试" },
      { status: 502 },
    );
  }

  const report_id = makeReportId();
  const report_url = `${baseUrl()}/report/${report_id}`;

  const report = assembleReport({
    report_id,
    report_url,
    profile: {
      pet_name: profile.pet_name,
      pet_image_url: profile.pet_image_url,
      breed: profile.breed,
      gender: profile.gender,
      birthday: profile.birthday,
      weight: profile.weight,
    },
    scored,
    ai,
  });

  await saveReport(report);

  return NextResponse.json({
    report_id,
    report_url,
    type_code: report.personality_result.type_code,
  });
}
