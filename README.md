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

项目使用 Next.js 静态导出。正式发布通过 SSH 与 `rsync` 同步到独立 release 目录，校验成功后切换 Nginx 指向的软链接：

```bash
DEPLOY_HOST=<server-address> \
DEPLOY_KEY=<private-key-path> \
npm run deploy:tencent
```

脚本要求工作树干净，会重新构建、执行 SEO 校验、排除 macOS 元数据文件、比对文件数和首页哈希，并在远端冒烟检查失败时恢复上一版本。完整发布、检查、回滚和正式开放流程见 [`deploy/RUNBOOK.md`](deploy/RUNBOOK.md)。

腾讯云轻量应用服务器防火墙需放行 TCP 80。备案通过前可仅允许当前管理端公网 IP，并使用服务器公网 IP 验证；备案通过后再正式开放 Web 端口、解析 `mktskill.com`、签发 HTTPS 证书并完成上线检查。腾讯云 CLI 和自动化助手适合管理云资源或远程执行命令；本站构建产物固定通过 `rsync` 发布。

### SSH 加固

先确认服务器已配置 SSH 公钥，并保持当前会话不退出，再执行：

```bash
sudo install -m 644 deploy/sshd-market-skills.conf /etc/ssh/sshd_config.d/00-market-skills-hardening.conf
sudo sshd -t
sudo systemctl reload ssh
```

重载后必须另开会话复验密钥登录成功。该配置会禁用密码和键盘交互认证，未配置公钥的设备将无法直接登录。

## License

MIT
