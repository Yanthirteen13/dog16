"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BrandPawLogo,
  DoodleLightning,
  DoodleStar,
} from "@/components/visual/Doodles";
import { FeatureIconDanger } from "@/components/visual/FeatureIcons";

const STEPS = [
  "正在嗅探狗狗的灵魂气味...",
  "正在分析 24 道灵魂拷问...",
  "正在计算社交发疯指数...",
  "正在召唤毒舌鉴定师...",
  "正在生成专属吐槽报告...",
  "马上就好，它快藏不住本性了...",
];

export default function GeneratingPage() {
  const router = useRouter();
  const started = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(6);
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState("");

  // Runs (or re-runs) generation from the answers stashed in sessionStorage,
  // so a retry after failure does NOT make the user re-answer the quiz.
  const run = useCallback(() => {
    const raw = sessionStorage.getItem("dog16_pending");
    if (!raw) {
      router.replace("/test");
      return;
    }

    setError("");
    setProgress(6);
    setStepIdx(0);

    // fake progress that eases toward ~92% while we wait
    if (timerRef.current) clearInterval(timerRef.current);
    const startedAt = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      const eased = 92 * (1 - Math.exp(-elapsed / 18));
      setProgress((p) => Math.max(p, Math.min(92, Math.round(eased))));
      setStepIdx(Math.min(STEPS.length - 1, Math.floor(elapsed / 8)));
    }, 400);

    (async () => {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error || "生成失败");
        }
        const { report_id } = await res.json();
        sessionStorage.removeItem("dog16_pending");
        setProgress(100);
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => router.replace(`/report/${report_id}`), 500);
      } catch (err) {
        if (timerRef.current) clearInterval(timerRef.current);
        setError(err instanceof Error ? err.message : "生成失败，请重试");
      }
    })();
  }, [router]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    run();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [run]);

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-roast-bg3 via-roast-bg to-roast-pinklight/50">
        <main className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center px-6 text-center">
          <div className="rounded-3xl border-2 border-roast-ink bg-white p-5 shadow-[4px_5px_0_0_#251F2D]">
            <FeatureIconDanger size={56} />
          </div>
          <h1 className="mt-5 text-xl font-black text-roast-ink">
            哎呀，出了点状况
          </h1>
          <p className="mt-2 text-sm font-medium text-roast-muted">{error}</p>
          <p className="mt-1 text-xs font-medium text-roast-muted">
            鉴定师可能在忙，重试一下通常就好了，答案已经帮你保留
          </p>
          <button
            onClick={run}
            className="mt-6 inline-flex items-center justify-center rounded-full border-2 border-roast-ink bg-roast-pink px-8 py-3.5 text-base font-black text-white shadow-[4px_5px_0_0_#251F2D] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#251F2D]"
          >
            重试一次 →
          </button>
          <button
            onClick={() => router.replace("/test")}
            className="mt-3 text-sm font-bold text-roast-muted underline underline-offset-4"
          >
            返回重新填写
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-roast-bg3 via-roast-bg to-roast-pinklight/50">
      <main className="mx-auto flex min-h-screen max-w-[480px] flex-col items-center justify-center px-8 text-center">
        <div className="relative">
          <DoodleStar className="absolute -left-7 -top-3 -rotate-12" size={22} />
          <DoodleLightning className="absolute -right-7 top-1 rotate-12" size={20} />
          <div className="animate-bounce rounded-3xl border-2 border-roast-ink bg-white p-5 shadow-[4px_5px_0_0_#251F2D]">
            <BrandPawLogo size={52} />
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-black text-roast-ink">鉴定中...</h1>
        <p className="mt-3 h-6 text-sm font-bold text-roast-pink transition-all">
          {STEPS[stepIdx]}
        </p>

        <div className="mt-6 h-3 w-full overflow-hidden rounded-full border border-roast-border bg-white">
          <div
            className="h-full rounded-full bg-roast-pink transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-medium text-roast-muted">{progress}%</p>

        <p className="mt-10 text-xs font-medium text-roast-muted">
          毒舌鉴定师正在认真工作，大约需要 30~60 秒
        </p>
      </main>
    </div>
  );
}
