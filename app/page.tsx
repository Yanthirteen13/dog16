import Image from "next/image";
import Link from "next/link";
import {
  BrandPawLogo,
  DoodleHeart,
  DoodleLightning,
  DoodleStar,
  RoastNote,
} from "@/components/visual/Doodles";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-roast-bg3 via-roast-bg to-roast-pinklight/50">
      <main className="mx-auto flex min-h-screen max-w-[480px] flex-col px-6 pb-8 pt-7">
        {/* brand */}
        <header className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <BrandPawLogo size={26} />
            <span className="text-[15px] font-black tracking-tight text-roast-ink">
              狗狗16型主子人格测试
            </span>
          </div>
          <span className="mt-1 text-[10px] font-bold tracking-[0.35em] text-roast-muted">
            DOG16 PERSONALITY TEST
          </span>
        </header>

        {/* centered hero block */}
        <section className="flex flex-1 flex-col justify-center">
          <h1 className="text-center text-[34px] font-black leading-[1.15] text-roast-ink">
            发现你家主子的
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-[44px] text-roast-pink">真实人格</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 180 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M4 9C40 4 90 3 176 7"
                  stroke="#FF2D7A"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 text-center text-[15px] font-medium leading-relaxed text-roast-muted">
            24 道有趣灵魂拷问，生成一份专属报告
          </p>

          {/* hero visual */}
          <div className="relative mt-5">
            <DoodleStar className="absolute -top-1 right-2 rotate-12" size={22} />
            <DoodleLightning className="absolute right-0 top-16 -rotate-6" size={20} />
            <DoodleHeart className="absolute left-1 top-10 -rotate-12" size={20} />

            <div className="relative mx-auto flex aspect-square w-[244px] items-center justify-center">
              <Image
                src="/assets/hero/hero-dog.png"
                alt="狗狗主视觉"
                width={520}
                height={520}
                priority
                className="h-full w-full object-contain drop-shadow-[0_12px_24px_rgba(255,45,122,0.18)]"
              />
            </div>

            <RoastNote className="mx-auto -mt-2 w-[290px] max-w-full">
              它不是不听话，它只是觉得你的规则不配被执行。
            </RoastNote>
          </div>

          {/* CTA */}
          <Link
            href="/test"
            className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-roast-ink bg-roast-pink px-8 py-4 text-lg font-black text-white shadow-[4px_5px_0_0_#251F2D] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#251F2D]"
          >
            开始鉴定我的主子 →
          </Link>
          <p className="mt-3 text-center text-[11px] font-medium text-roast-muted">
            约 2 分钟 · 需要一张狗狗照片
          </p>
        </section>
      </main>
    </div>
  );
}
