# 上线获客清单

## 1. Vercel 部署（约 10 分钟）

1. 打开 [vercel.com/new](https://vercel.com/new)，用 GitHub 导入 `chenxiaochun/pictionary-word-generator`
2. Framework 选 **Next.js**，直接 Deploy
3. 部署成功后进入 **Settings → Environment Variables**，添加：

   | Name | Value | Environments |
   |------|-------|----------------|
   | `NEXT_PUBLIC_SITE_URL` | 你的正式域名，如 `https://pictionary-host.vercel.app` 或自定义域名 | Production（Preview 可选） |

4. 改完环境变量后 **Redeploy** 一次，否则 sitemap / JSON-LD 仍会用旧 URL

### 自定义域名（可选）

Settings → Domains → 添加域名 → 按提示配置 DNS。

---

## 2. Google Search Console（约 15 分钟）

1. [search.google.com/search-console](https://search.google.com/search-console) → 添加资源 → **网址前缀** → 填入 `NEXT_PUBLIC_SITE_URL`
2. 验证所有权（任选其一）：
   - **HTML 标记**：把 Google 给的 `content="..."` 里的值填到 Vercel 环境变量 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`，重新部署
   - **DNS TXT**：在域名服务商添加记录（适合自定义域名）
3. **Sitemap** → 提交：`https://你的域名/sitemap.xml`
4. **网址检查** → 请求编入索引：首页、`/for-zoom`、`/for-kids`、`/easy-pictionary-words`

---

## 3. 部署后自检

- [ ] 首页能打开，点 **Start a Game** 能进设置
- [ ] `curl -s https://你的域名/robots.txt` 里 sitemap 指向正确域名
- [ ] `curl -s https://你的域名/sitemap.xml` 含 4 个 URL
- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或 [opengraph.xyz](https://www.opengraph.xyz/) 抓取 OG 图正常
- [ ] 手机分享链接有标题 + 大图预览

---

## 4. 获客后续（上线后再做）

- Vercel Dashboard 开启 **Analytics**（无需改代码）
- Reddit / 朋友圈 / 社群发「免费 Zoom 你画我猜主持工具」带 `/for-zoom` 链接
- 2–4 周后看 GSC「效果」报告，按展示词决定是否加新 SEO 页
