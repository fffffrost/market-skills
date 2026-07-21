# WORKLOG

按时间追加项目实际工作记录。新记录只能插入下方唯一锚点之前。

## 2026-07-21 11:44 CST — Shuangs-MacBook-Air.local

- 本次目标：完成 MARKET//SKILLS 首版网站、10 个第一方 Agent Skills、安装体验和发布准备。
- 完成内容：初始化 Git/Next.js 项目；完成首页、静态目录、详情页、安装指南、SEO 与 Vercel 配置；编写 10 个 Skill 及模板、Codex UI 元数据和正负向验收场景；补齐内容解析、构建期校验、组件测试和浏览器测试；完成桌面与移动端视觉检查。
- 涉及文件：项目根配置与连续性文档；`app/`、`components/`、`lib/`、`skills/`、`scripts/`、`tests/`、`e2e/`。
- 重要决定：使用任务阶段而非工具分类；中文优先、英文 slug；MIT 开源；生产环境必须配置真实 GitHub 仓库；不纳入外部作者 Skill，不实现社区和账号能力。
- 验证结果：`npm run verify` 通过；10/10 Skill 通过两套结构校验；4/4 组件测试和 8/8 桌面/375px 浏览器测试通过；单个与整包本地安装成功；生产静态构建成功。
- 未完成事项：尚未创建公开 GitHub 远程仓库、连接 Vercel、配置真实仓库/站点地址或完成线上安装验证；这些步骤需要用户账号登录。
- 明确下一步：创建 `market-skills` 公开仓库并推送，设置 Vercel 环境变量后部署，再从线上仓库复验安装命令。

## 2026-07-21 13:21 CST — Shuangs-MacBook-Air.local

- 本次目标：创建 MARKET//SKILLS 公开 GitHub 仓库并推送首版代码。
- 完成内容：在 GitHub 账号 `fffffrost` 下创建公开仓库 `market-skills`；将真实仓库地址写入示例环境变量、README 安装命令和发布说明；配置项目级 Git 提交身份；完成首发提交并通过 SSH 推送 `main`。
- 涉及文件：`.env.example`、`README.md`、`PROJECT.md`、`WORKLOG.md`，以及首次纳入版本控制的首版项目文件。
- 重要决定：仓库保持 Public；GitHub 端不初始化 README、`.gitignore` 或 License，使用本地已验证版本；远端使用 SSH 地址 `git@github.com:fffffrost/market-skills.git`；提交身份仅配置在当前仓库。
- 验证结果：`npm run verify` 全部通过（10/10 Skill、4/4 组件测试、18 个静态页面/资源、8/8 E2E）；未发现常见私钥或令牌格式；SSH 推送成功；远端 `main` 已指向首发提交 `797058698dde`。
- 未完成事项：尚未导入 Vercel、配置生产环境变量和自定义域名，也尚未从公开 GitHub 源执行单个与整包安装复验。
- 明确下一步：在 Vercel 导入 `fffffrost/market-skills`，设置仓库与站点 URL，完成部署后复验安装命令并连接自定义域名。

## 2026-07-21 13:23 CST — Shuangs-MacBook-Air.local

- 本次目标：从刚发布的公开 GitHub 仓库复验单个与整包安装接口。
- 完成内容：在两个独立的 `/tmp` 临时 Git 项目中分别执行单个 Skill 与整包安装；两次均从 `https://github.com/fffffrost/market-skills.git` 克隆，不依赖本地工作区。
- 涉及文件：仅更新 `PROJECT.md` 和 `WORKLOG.md`；安装产物位于系统临时目录，未写入项目或用户全局 Skill 目录。
- 重要决定：远程安装验证使用非交互复制模式；单个安装指定 `research-competitors`，整包安装覆盖仓库发现的全部 10 个 Skill。
- 验证结果：单个安装成功且发现 1 个 Skill 目录；整包安装成功且发现 10 个 Skill 目录；公开 GitHub 源可被 skills CLI 正常克隆和解析。
- 未完成事项：Vercel 部署、生产环境变量、自定义域名连接和线上页面验证尚未完成。
- 明确下一步：将 GitHub 仓库导入 Vercel，配置真实站点 URL 后部署并连接自定义域名。

## 2026-07-21 13:48 CST — Shuang’s MacBook Air

- 本次目标：完成公开站点上线前的域名、备案云资源与 ICP 备案准备。
- 完成内容：注册 `mktskill.com`；购买腾讯云上海轻量应用服务器一年套餐；确认服务器实例运行；为 ICP 备案创建服务相关角色；接受备案服务信息收集说明；用户本人完成实名资料填写并提交备案。
- 涉及文件：`PROJECT.md`、`WORKLOG.md`；外部资源涉及腾讯云域名、轻量应用服务器和 ICP 备案控制台。
- 重要决定：选择中国大陆轻量应用服务器满足备案资源要求；服务器使用 2 核 2G、3M、40GB 的一年套餐；敏感实名资料、人脸核验和正式提交均由用户本人操作；项目仍按既定方案使用 Vercel 部署网站。
- 验证结果：云服务器订单 ¥68 交易成功，实例已创建并运行；备案系统成功识别域名与云资源；ICP备案已由用户提交。
- 未完成事项：腾讯云初审、工信部短信核验、管局审核、Vercel 生产部署、自定义域名连接和线上验收尚未完成。
- 明确下一步：等待并处理备案初审与短信通知；同时导入 Vercel 并配置生产环境，备案通过后连接域名并完成线上验证。

<!-- WORKLOG_APPEND_POINT_DO_NOT_REMOVE -->
