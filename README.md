# 狗狗 16 型主子人格测试 🐶

一个 MBTI 风格的趣味测评网站：上传狗狗照片、回答 24+1 道问题，由 AI 生成一份"奶油毒舌"风格的主子人格报告，并可一键导出**方形朋友圈分享海报**与**完整 PDF 报告**。

> 全栈 Next.js（App Router）应用，AI 报告生成支持 Anthropic Claude 或 DeepSeek（二选一），数据以本地文件方式存储，无需数据库。

## ✨ 功能

- **资料 + 问卷**：填写狗狗资料、上传照片，完成 25 题测评
- **AI 人格报告**：根据计分结果调用大模型生成结构化报告（人格类型、总评、主人定位、维度雷达、危险区等）
- **方形分享海报**：1080×1080 两栏式"人格卡"，含宠物照片、人格代号、称号、一句话吐槽、四维度、二维码，配豆沙粉高级感配色
- **PDF 导出**：导出完整报告页（`html2canvas` + `jsPDF`）
- **二维码**：服务端生成，扫码可访问报告页

## 🧱 技术栈

- [Next.js 15](https://nextjs.org/)（App Router）+ React 19 + TypeScript
- [Tailwind CSS 3](https://tailwindcss.com/)
- AI：[`@anthropic-ai/sdk`](https://www.npmjs.com/package/@anthropic-ai/sdk) 或 [`openai`](https://www.npmjs.com/package/openai)（DeepSeek 兼容）
- 图像/文档：`html2canvas`、`jspdf`、`qrcode`
- 存储：本地文件（`reports/*.json`、`public/uploads/`），无数据库

## 🚀 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制示例文件并填入你自己的密钥：

```bash
cp .env.example .env.local
```

`.env.local` 字段说明：

| 变量 | 说明 |
| --- | --- |
| `AI_PROVIDER` | `anthropic` 或 `deepseek`，决定调用哪个模型 |
| `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` | 使用 Claude 时填写 |
| `DEEPSEEK_API_KEY` / `DEEPSEEK_MODEL` | 使用 DeepSeek 时填写 |
| `NEXT_PUBLIC_BASE_URL` | 报告链接 / 二维码用的站点地址，本地为 `http://localhost:3000` |

> ⚠️ `.env.local` 已被 `.gitignore` 忽略，**切勿提交真实密钥**。

### 3. 启动

```bash
npm run dev
```

打开 http://localhost:3000 即可。

> 💡 构建生产版本前请先停掉 `npm run dev`，避免两个进程同时写 `.next` 导致构建产物损坏。

```bash
npm run build
npm run start
```

## 📁 目录结构

```
app/                  页面与 API 路由
  page.tsx            首页
  test/               资料 + 问卷
  generating/         AI 生成中的加载页
  report/[id]/        报告页
  api/upload/         照片上传
  api/generate/       调用 AI 生成报告
components/
  report/             报告各卡片 + 分享海报（SharePoster）
  visual/             图标与涂鸦组件
lib/                  问卷、计分、AI 调用、存储、类型定义
public/uploads/       用户上传的照片（运行时生成，git 忽略）
reports/              生成的报告 JSON（运行时生成，git 忽略）
```

## 📝 说明

- `public/uploads/` 与 `reports/` 中的运行时数据不纳入版本管理（仅保留 `.gitkeep`）。
- 本项目仅供学习与娱乐，AI 生成内容请勿当真。
