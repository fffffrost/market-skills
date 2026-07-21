# MARKET//SKILLS

## 项目目标

为中文市场从业者提供经过实战提炼、可直接安装的 AI Agent Skills。网站按真实任务组织内容，帮助用户理解什么时候使用、需要提供什么、最终会得到什么。

## 当前状态

- 状态：首版已发布到 GitHub，等待连接 Vercel、配置站点地址并上线
- GitHub：https://github.com/fffffrost/market-skills
- 产品名：MARKET//SKILLS
- 副标题：市场人的 AI Skill Hub
- 技术方案：Next.js App Router、TypeScript、静态生成、客户端搜索筛选、Vercel Analytics
- 授权：MIT
- 页面：首页、静态 Skill 目录、10 个静态详情页、安装指南、404、sitemap、robots
- 内容：10 个第一方 Skill，覆盖洞察、策略、内容、执行和复盘

## 已完成能力

- 中文/英文关键词搜索，以及阶段、岗位、任务组合筛选。
- 单个与整包安装命令、复制失败回退、手动安装路径和源码审查提示。
- 每个 Skill 均包含 `SKILL.md`、`listing.yaml`、`agents/openai.yaml` 和任务模板。
- 构建期校验名称、元数据、引用、版本、授权和正负向验收场景。
- 深色 AI 操作台视觉，支持键盘焦点、减少动效偏好与 375px 移动端。
- 生产环境缺少真实 GitHub 仓库配置时主动阻止发布。

## 重要决定

- 中文职场场景优先，英文 slug 与安装命令保持跨平台兼容。
- 按洞察、策略、内容、执行、复盘五个工作阶段组织，而不是按工具或模型分类。
- 首版没有账号、投稿、收藏、评论、排行榜、付费、CMS 或服务端数据库。
- 外部作者的配图和封面 Skill 未纳入第一方首发。
- 公开 GitHub 仓库固定为 `fffffrost/market-skills`；自定义域名和 Vercel 登录不写入仓库，发布时通过环境变量连接。

## 验证状态

- `npm run verify`：通过。
- Skill：10/10 通过项目校验与官方 `quick_validate.py`。
- 组件测试：4/4 通过。
- 浏览器测试：桌面与 375px 移动端共 8/8 通过。
- 生产构建：18 个静态页面/资源生成成功，目录页无服务端运行依赖。
- 安装：已在临时 Git 项目中验证单个 Skill 与整包 10 个 Skill 的本地安装。
- 视觉：已检查首页桌面、首页移动端和 Skill 详情长页截图。
- GitHub：公开仓库已创建，`main` 已通过 SSH 推送；远端分支指向首发提交 `797058698dde`。

## 明确下一步

1. 在 Vercel 导入 `fffffrost/market-skills`，配置 `NEXT_PUBLIC_GITHUB_REPO` 和 `NEXT_PUBLIC_SITE_URL`。
2. 部署后从线上仓库再次验证单个与整包安装命令。
3. 连接已注册的自定义域名，更新站点地址并重新部署。
