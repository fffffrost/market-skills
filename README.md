# MARKET//SKILLS

面向中文市场从业者的开源 AI Agent Skill Hub。10 个首发 Skill 覆盖洞察、策略、内容、执行与复盘，并按 Open Agent Skills 目录格式发布。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

复制示例环境变量后，本地页面会使用真实 GitHub 仓库。生产构建使用：

```env
NEXT_PUBLIC_GITHUB_REPO=fffffrost/market-skills
NEXT_PUBLIC_SITE_URL=https://mktskill.com
```

未配置真实 GitHub 仓库时，生产构建会主动失败，避免线上展示不可用的安装命令。

## 质量检查

```bash
npm run validate:skills
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

`npm run verify` 会依次执行静态检查、Skill 校验、组件测试、生产构建和浏览器端到端测试。

## Skill 结构

```text
skills/<skill-name>/
├── SKILL.md
├── listing.yaml
├── agents/openai.yaml
└── references/<task-template>.md
```

- `SKILL.md`：给 Agent 使用的触发描述和工作协议。
- `listing.yaml`：网站展示、搜索和筛选所需的目录元数据。
- `agents/openai.yaml`：Codex 等宿主的界面元数据。
- `references/`：执行具体任务时按需读取的模板。

## 安装验证

仓库发布后可整包或单独安装：

```bash
npx skills add fffffrost/market-skills
npx skills add fffffrost/market-skills --skill research-competitors
```

本地仓库也可以作为安装源：

```bash
npx skills add . --list
npx skills add . --skill research-competitors --agent codex --copy -y
```

## 腾讯云发布

项目使用 Next.js 静态导出，`npm run build` 会生成 `out/`：

```bash
npm ci
npm run build
sudo mkdir -p /var/www/market-skills
sudo cp -R out/. /var/www/market-skills/
sudo cp deploy/nginx-market-skills.conf /etc/nginx/sites-available/market-skills
sudo ln -sfn /etc/nginx/sites-available/market-skills /etc/nginx/sites-enabled/market-skills
sudo nginx -t
sudo systemctl reload nginx
```

备案通过前可使用服务器公网 IP 验证。备案通过后再解析 `mktskill.com`，签发 HTTPS 证书并完成正式上线检查。

## License

MIT
