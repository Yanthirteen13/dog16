# dog16 部署清单（国内 VPS）

适用：阿里云 / 腾讯云轻量服务器，Node + Nginx + 域名。
本应用是 Next.js 全栈，数据存本地文件系统（`reports/`、`public/uploads/`），所以
**必须用「自己的服务器」而不是 Vercel 这类无服务器平台**，否则数据会丢。

---

## 0. 上线前在本地确认

```bash
npm install
npm run build      # 必须能成功，不能有 TypeScript / 构建报错
```

> 注意：跑 `npm run build` 前先关掉 `npm run dev`，两个一起跑会损坏 `.next`。

---

## 1. 服务器准备

- 系统：Ubuntu 22.04 / 24.04（或同等）
- 安装 Node 20+：
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  node -v   # 确认 >= 20
  ```
- 安装进程守护 pm2：`sudo npm i -g pm2`
- 安装 Nginx：`sudo apt install -y nginx`
- 安全组 / 防火墙放行 80、443（不要直接对外暴露 3000）

---

## 2. 上传代码

把项目传到服务器（`/var/www/dog16`）。**不要**上传 `node_modules`、`.next`、`.env.local`。
推荐用 git：本地 `git init` 后推到私有仓库，服务器 `git clone`。

服务器上：
```bash
cd /var/www/dog16
npm ci            # 按 package-lock 精确安装
```

---

## 3. 配置环境变量

在服务器项目根目录新建 `.env.local`（此文件已被 .gitignore 忽略，不会进仓库）：

```
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=<在服务器上填正式 key，建议用重置后的新 key>
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com
NEXT_PUBLIC_BASE_URL=https://你的域名
```

⚠️ `NEXT_PUBLIC_BASE_URL` 必须改成正式域名，否则报告链接和二维码会指向 localhost。
⚠️ 注意确认 `DEEPSEEK_MODEL` 是 DeepSeek 真实支持的模型名（当前本地写的是 `deepseek-v4-flash`，上线前核对一下）。

---

## 4. 构建并启动

```bash
npm run build
pm2 start npm --name dog16 -- start     # 等价于 next start，默认监听 3000
pm2 save                                 # 保存进程列表
pm2 startup                              # 生成开机自启脚本，按提示执行一行 sudo 命令
```

确认本地能访问：`curl http://127.0.0.1:3000` 有 HTML 返回。

---

## 5. Nginx 反向代理 + HTTPS

`/etc/nginx/sites-available/dog16`：
```nginx
server {
    listen 80;
    server_name 你的域名;

    client_max_body_size 10M;   # 照片上传上限 8MB，留点余量

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/dog16 /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

HTTPS（域名已备案并解析到服务器后）：
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d 你的域名
```
> 国内服务器对外提供 80/443 网站服务需要**域名备案**，提前办。

---

## 6. 更新发布流程（以后每次改完代码）

```bash
cd /var/www/dog16
git pull
npm ci
npm run build
pm2 restart dog16
```

---

## 7. 上线后注意

- **数据备份**：报告和图片都在 `reports/`、`public/uploads/`，定期备份这两个目录（cron + 打包到对象存储）。
- **磁盘**：用户上传图片会持续占盘，关注磁盘用量。
- **Key 安全**：正式 key 只放服务器 `.env.local`，绝不提交仓库、不发聊天/截图。
- **日志**：`pm2 logs dog16` 看运行日志，AI 调用失败会打 `[generate] AI error`。

---

## 后续可选优化（量大再做）

- 文件存储 → 对象存储（七牛 / 阿里 OSS），报告 → 数据库，便于多机扩容和不丢数据。
- 加访问频率限制，防止 AI key 被刷爆产生费用。
- `app/test/` 测试页上线前确认是否需要保留 / 屏蔽。
