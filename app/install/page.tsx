import type { Metadata } from "next";
import Link from "next/link";
import { InstallCommand } from "@/components/install-command";
import { getInstallCommand, siteConfig } from "@/lib/site-config";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "安装指南",
  description: "安装 MARKET//SKILLS 单个 Skill 或完整技能库，并在使用前检查源码与依赖。",
};

export default function InstallPage() {
  const firstSkill = getSkills()[0];

  return (
    <div className="install-page shell">
      <header className="install-header">
        <div>
          <span className="section-code orange">SETUP / APPROX. 2 MIN</span>
          <h1>把方法装进<br />你的 Agent。</h1>
        </div>
        <p>使用开放的 Agent Skills 目录格式。可以安装全部 10 个模块，也可以只取当前任务需要的一个。</p>
      </header>

      <section className="install-step">
        <div className="step-number">01</div>
        <div className="step-content">
          <span className="panel-kicker">CHOOSE SCOPE</span>
          <h2>安装整套工作链</h2>
          <p>适合希望让 Agent 自动识别不同市场任务的人。每个 Skill 只会在匹配的场景加载。</p>
          <InstallCommand command={getInstallCommand()} label="ALL MODULES" />
        </div>
      </section>

      <section className="install-step">
        <div className="step-number">02</div>
        <div className="step-content">
          <span className="panel-kicker">OR / PICK ONE</span>
          <h2>只安装一个 Skill</h2>
          <p>在命令末尾加上 `--skill` 和英文 slug。每个详情页都已经生成对应命令。</p>
          <InstallCommand command={getInstallCommand(firstSkill.slug)} label="SINGLE MODULE" />
          <Link className="text-link" href="/skills">去技能库选择模块 →</Link>
        </div>
      </section>

      <section className="install-step">
        <div className="step-number">03</div>
        <div className="step-content">
          <span className="panel-kicker">MANUAL ROUTE</span>
          <h2>需要时也可以手动安装</h2>
          <p>从仓库复制目标 Skill 目录，放入 Agent 对应的 skills 目录。保留 `SKILL.md`、`references/` 和 `agents/` 的相对结构。</p>
          <div className="path-grid">
            <div><span>Codex</span><code>~/.codex/skills/&lt;skill-name&gt;</code></div>
            <div><span>Project scope</span><code>.agents/skills/&lt;skill-name&gt;</code></div>
            <div><span>Claude Code</span><code>.claude/skills/&lt;skill-name&gt;</code></div>
          </div>
        </div>
      </section>

      <section className="install-step safety-step">
        <div className="step-number">04</div>
        <div className="step-content">
          <span className="panel-kicker">TRUST PROTOCOL</span>
          <h2>安装前，先看源码。</h2>
          <p>Agent Skill 会影响模型如何执行任务。检查触发描述、文件引用、外部依赖和工具权限，确认它与当前工作环境匹配。</p>
          <ul className="safety-list">
            <li><span>CHECK.01</span>阅读 `SKILL.md` 的触发条件和边界</li>
            <li><span>CHECK.02</span>确认 `references/` 与脚本来源</li>
            <li><span>CHECK.03</span>审查联网、文件和外部工具依赖</li>
            <li><span>CHECK.04</span>先用非敏感任务完成一次试运行</li>
          </ul>
          {siteConfig.isRepoConfigured ? (
            <a className="primary-link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">打开 GitHub 仓库 ↗</a>
          ) : (
            <span className="primary-link is-disabled">GitHub 仓库待连接</span>
          )}
        </div>
      </section>
    </div>
  );
}

