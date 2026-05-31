"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type ReactNode } from "react";
import {
  CALIBRATION_QUESTION,
  QUESTIONS,
  type Option,
} from "@/lib/questions";
import type { Choice } from "@/lib/scoring";
import { BrandPawLogo } from "@/components/visual/Doodles";
import {
  FieldIconBirthday,
  FieldIconBreed,
  FieldIconGender,
  FieldIconName,
  FieldIconPhoto,
  FieldIconWeight,
} from "@/components/visual/FieldIcons";

type Phase = "profile" | "quiz";

interface Profile {
  pet_name: string;
  breed: string;
  gender: string;
  birthday: string;
  weight: string;
}

const GENDERS = ["男孩子", "女孩子"];

// profile + the 25 quiz questions (Q25 = calibration)
const FLOW = [...QUESTIONS, CALIBRATION_QUESTION];
const TOTAL = FLOW.length;

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("profile");
  const [profile, setProfile] = useState<Profile>({
    pet_name: "",
    breed: "",
    gender: "",
    birthday: "",
    weight: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [step, setStep] = useState(0);
  const advancing = useRef(false);
  const [answers, setAnswers] = useState<Record<number, Choice>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canStart = profile.pet_name.trim().length > 0 && !!photoFile;
  const current = FLOW[step];
  const progress = useMemo(
    () => Math.round(((step + 1) / TOTAL) * 100),
    [step],
  );

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function pickOption(choice: Choice) {
    if (advancing.current || submitting) return;
    const q = current;
    setAnswers((prev) => ({ ...prev, [q.id]: choice }));
    if (step < TOTAL - 1) {
      advancing.current = true;
      setTimeout(() => {
        setStep((s) => Math.min(s + 1, TOTAL - 1));
        advancing.current = false;
      }, 180);
    } else {
      advancing.current = true;
      setTimeout(() => submit({ ...answers, [q.id]: choice }), 200);
    }
  }

  async function submit(finalAnswers: Record<number, Choice>) {
    if (submitting || !photoFile) return;
    setSubmitting(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("photo", photoFile);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (!up.ok) throw new Error("照片上传失败");
      const { url } = await up.json();

      const calibration = finalAnswers[CALIBRATION_QUESTION.id] ?? null;
      const quizAnswers = { ...finalAnswers };
      delete quizAnswers[CALIBRATION_QUESTION.id];

      const payload = {
        profile: { ...profile, pet_image_url: url },
        answers: quizAnswers,
        calibration,
      };
      sessionStorage.setItem("dog16_pending", JSON.stringify(payload));
      router.push("/generating");
    } catch (err) {
      setError(err instanceof Error ? err.message : "出错了，请重试");
      setSubmitting(false);
      advancing.current = false;
    }
  }

  if (phase === "profile") {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-roast-bg3 via-roast-bg to-roast-pinklight/50">
        <main className="mx-auto flex min-h-screen max-w-[480px] flex-col px-6 pb-10 pt-8">
          <div className="flex items-center gap-2">
            <BrandPawLogo size={22} />
            <span className="text-[12px] font-bold tracking-[0.32em] text-roast-muted">
              DOG16 PERSONALITY TEST
            </span>
          </div>

          <h1 className="mt-5 text-[26px] font-black leading-tight text-roast-ink">
            先认识一下你家主子
          </h1>
          <p className="mt-2 text-sm font-medium text-roast-muted">
            填好资料，上传一张帅照，开始鉴定。
          </p>

          <label className="mt-6 flex flex-col items-center">
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-3xl border-[3px] border-dashed border-roast-ink/25 bg-white shadow-[3px_4px_0_0_rgba(37,31,45,0.08)]">
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt="预览"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-roast-pink">
                  <FieldIconPhoto size={42} />
                  <span className="text-sm font-bold text-roast-ink">
                    上传狗狗照片
                  </span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onPickPhoto}
              className="hidden"
            />
            <span className="mt-2 text-xs font-medium text-roast-muted">
              点击方框选择照片（必填）
            </span>
          </label>

          <div className="mt-6 space-y-4">
            <Field icon={<FieldIconName />} label="名字" required>
              <input
                value={profile.pet_name}
                onChange={(e) =>
                  setProfile({ ...profile, pet_name: e.target.value })
                }
                placeholder="比如：奶盖"
                maxLength={12}
                className="input"
              />
            </Field>

            <Field icon={<FieldIconBreed />} label="犬种">
              <input
                value={profile.breed}
                onChange={(e) =>
                  setProfile({ ...profile, breed: e.target.value })
                }
                placeholder="比如：金毛寻回犬"
                className="input"
              />
            </Field>

            <Field icon={<FieldIconGender />} label="性别">
              <div className="flex gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setProfile({ ...profile, gender: g })}
                    className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-bold transition ${
                      profile.gender === g
                        ? "border-roast-ink bg-roast-pink text-white shadow-[2px_3px_0_0_#251F2D]"
                        : "border-roast-border bg-white text-roast-muted"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </Field>

            <Field icon={<FieldIconBirthday />} label="生日">
              <input
                type="date"
                value={profile.birthday}
                onChange={(e) =>
                  setProfile({ ...profile, birthday: e.target.value })
                }
                className="input"
              />
            </Field>

            <Field icon={<FieldIconWeight />} label="体重">
              <input
                value={profile.weight}
                onChange={(e) =>
                  setProfile({ ...profile, weight: e.target.value })
                }
                placeholder="比如：28kg"
                className="input"
              />
            </Field>
          </div>

          <button
            disabled={!canStart}
            onClick={() => setPhase("quiz")}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full border-2 border-roast-ink bg-roast-pink px-8 py-4 text-lg font-black text-white shadow-[4px_5px_0_0_#251F2D] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#251F2D] disabled:cursor-not-allowed disabled:border-roast-ink/25 disabled:bg-roast-pink/40 disabled:text-white/80 disabled:shadow-none disabled:active:translate-x-0 disabled:active:translate-y-0"
          >
            开始答题（共 {TOTAL} 题）
          </button>
          <p className="mt-2 text-center text-xs font-medium text-roast-muted">
            名字和照片是必填项
          </p>

          <style jsx>{`
            .input {
              width: 100%;
              border-radius: 0.75rem;
              border: 2px solid #f1e6e0;
              background: #fff;
              padding: 0.625rem 0.875rem;
              font-size: 0.95rem;
              color: #251f2d;
              outline: none;
            }
            .input::placeholder {
              color: #b8afb8;
            }
            .input:focus {
              border-color: #ff2d7a;
            }
          `}</style>
        </main>
      </div>
    );
  }

  // quiz phase
  if (!current) return null;
  const isCalibration = current.id === CALIBRATION_QUESTION.id;
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-roast-bg3 via-roast-bg to-roast-pinklight/50">
      <main className="mx-auto flex min-h-screen max-w-[480px] flex-col px-6 pb-10 pt-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              step === 0 ? setPhase("profile") : setStep(step - 1)
            }
            className="text-sm font-bold text-roast-muted transition active:text-roast-ink"
          >
            ‹ 返回
          </button>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full border border-roast-border bg-white">
            <div
              className="h-full rounded-full bg-roast-pink transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-black text-roast-pink">
            {step + 1}/{TOTAL}
          </span>
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-roast-pink/70">
          {isCalibration ? "综合校准" : current.section.split("：")[0]}
        </p>
        <h2 className="mt-2 text-xl font-black leading-snug text-roast-ink">
          {isCalibration && (
            <span className="mr-1 text-roast-pink">最后一题 · </span>
          )}
          {current.title}
        </h2>

        <div className="mt-6 space-y-3">
          {current.options.map((opt: Option) => {
            const selected = answers[current.id] === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => pickOption(opt.key)}
                disabled={submitting}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition ${
                  selected
                    ? "border-roast-ink bg-roast-pinklight shadow-[3px_4px_0_0_#251F2D]"
                    : "border-roast-border bg-white hover:border-roast-pink/50"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                    selected
                      ? "bg-roast-pink text-white"
                      : "bg-roast-pinklight text-roast-pink"
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm leading-relaxed text-roast-ink">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {submitting && (
          <p className="mt-6 text-center text-sm font-bold text-roast-pink">
            正在召唤鉴定结果...
          </p>
        )}
        {error && (
          <p className="mt-6 text-center text-sm font-bold text-red-500">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

function Field({
  icon,
  label,
  required,
  children,
}: {
  icon: ReactNode;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5">
        {icon}
        <span className="text-sm font-bold text-roast-ink">{label}</span>
        {required && <span className="text-roast-pink">*</span>}
      </div>
      {children}
    </div>
  );
}
