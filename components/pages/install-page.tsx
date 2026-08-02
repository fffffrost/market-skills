import Link from "next/link";
import { InstallCommand } from "@/components/install-command";
import { JsonLd } from "@/components/json-ld";
import { TrackedGithubLink } from "@/components/tracked-github-link";
import { getFeedbackUrl } from "@/lib/feedback";
import { absoluteUrl, getInstallCommand, siteConfig } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";
import { getSkills } from "@/lib/skills";

export const installPageCopy = {
  en: {
    title: "Install China Marketing AI Agent Skills",
    description: "Install one China marketing AI agent skill or the complete open-source workflow library, then inspect every instruction and dependency.",
    heading: <>Add a China marketing<br /><span>operating layer to your agent.</span></>,
    intro: "Install all ten workflows or choose only the job you need. The source remains open and editable in your own environment.",
    allTitle: "Install all ten skills", allBody: "Run the command in your project directory. The installer discovers every compatible skill in the repository.",
    oneTitle: "Install one skill", oneBody: "Append --skill and the stable English slug. Every skill page includes its exact command.", oneLink: "Choose a skill →",
    manualTitle: "Manual installation is also available", manualBody: "Copy the target skill directory into the host's skills directory. Preserve SKILL.md, references, and agents relative paths.",
    trustTitle: "Inspect the source before installing.", trustBody: "Agent Skills influence how a model performs work. Review triggers, references, external dependencies, and tool permissions before use.",
    checks: ["Read SKILL.md triggers and boundaries", "Confirm the origin of references and scripts", "Review network file and external-tool dependencies", "Run one non-sensitive test task first"],
    repo: "Open the GitHub repository ↗", repoDisabled: "GitHub repository not connected",
    troubleshoot: "TROUBLESHOOT", troubleTitle: "When installation fails, isolate the layer first.", troubleBody: "Command, directory, and host discovery failures are different problems. Preserve a redacted error before checking them in order.",
    troubles: [
      ["Command does not run", "Confirm Node.js and npm are available, the network can reach GitHub, and the full command was copied."],
      ["Directory is not created", "Check that the project is writable and preserve SKILL.md, references, and agents during manual installation."],
      ["Installed but not triggered", "Confirm the host supports Agent Skills, reload the project, and test with the example job from the skill page."],
      ["Still blocked", "Report the host, environment, full command, and redacted error. Never publish accounts, keys, client material, or full local paths."],
    ],
    report: "Report an installation problem ↗", reportDisabled: "Connect GitHub to report a problem",
  },
  zh: {
    title: "Agent Skill 安装指南",
    description: "安装 MARKET//SKILLS 单个 Skill 或完整技能库，并在使用前检查源码与依赖。",
    heading: <>把方法装进<br /><span>你的 Agent。</span></>,
    intro: "使用开放的 Agent Skills 目录格式。可以安装全部十个模块，也可以只取当前任务需要的一个。",
    allTitle: "安装整套工作链", allBody: "适合希望让 Agent 自动识别不同市场任务的人。每个 Skill 只会在匹配的场景加载。",
    oneTitle: "只安装一个 Skill", oneBody: "在命令末尾添加 --skill 和稳定的英文 slug。每个详情页都有精确命令。", oneLink: "去技能库选择 →",
    manualTitle: "需要时也可以手动安装", manualBody: "从仓库复制目标 Skill 目录，放入 Agent 对应的 skills 目录。保留 SKILL.md、references 和 agents 的相对结构。",
    trustTitle: "安装前，先看源码。", trustBody: "Agent Skill 会影响模型如何执行任务。检查触发描述、文件引用、外部依赖和工具权限，确认它与当前工作环境匹配。",
    checks: ["阅读 SKILL.md 的触发条件和边界", "确认 references 与脚本来源", "审查联网、文件和外部工具依赖", "先用非敏感任务完成一次试运行"],
    repo: "打开 GitHub 仓库 ↗", repoDisabled: "GitHub 仓库待连接",
    troubleshoot: "TROUBLESHOOT / 安装排错", troubleTitle: "装不上时，先定位是哪一层。", troubleBody: "命令、目录和宿主识别是三类不同问题。先保留已脱敏错误，再按顺序检查。",
    troubles: [
      ["命令无法运行", "确认 Node.js 与 npm 可用，网络能访问 GitHub，并重新复制完整命令。"],
      ["目录没有生成", "检查当前项目是否可写；手动安装时保留 SKILL.md、references 与 agents。"],
      ["已安装但没有触发", "确认宿主支持 Agent Skills，重新载入项目，并用 Skill 详情页的示例任务测试。"],
      ["仍然无法解决", "提交宿主、环境、完整命令和脱敏错误；不要公开账号、密钥、客户材料或本地完整路径。"],
    ],
    report: "报告安装问题 ↗", reportDisabled: "连接 GitHub 后反馈",
  },
} as const;

export function InstallPage({ locale }: { locale: Locale }) {
  const content = installPageCopy[locale];
  const firstSkill = getSkills(locale)[0];
  const feedbackUrl = getFeedbackUrl("install-failure");
  const pagePath = localizedPath(locale, "/install/");
  const jsonLd = { "@context": "https://schema.org", "@type": "HowTo", "@id": absoluteUrl(pagePath + "#howto"), url: absoluteUrl(pagePath), name: content.title, description: content.description, inLanguage: localeConfig[locale].languageTag, step: [content.allTitle, content.oneTitle, content.manualTitle, content.trustTitle].map((name, index) => ({ "@type": "HowToStep", position: index + 1, name })) };
  return (
    <div className="install-page shell">
      <JsonLd data={jsonLd} />
      <header className="install-header"><div><span className="section-code">INSTALL / OPEN AGENT SKILLS</span><h1>{content.heading}</h1></div><p>{content.intro}</p></header>
      <section className="install-step"><div className="step-number">01</div><div className="step-content"><span className="panel-kicker">RECOMMENDED / ALL MODULES</span><h2>{content.allTitle}</h2><p>{content.allBody}</p><InstallCommand command={getInstallCommand()} label="ALL MODULES" eventSource="install_all_modules" locale={locale} /></div></section>
      <section className="install-step"><div className="step-number">02</div><div className="step-content"><span className="panel-kicker">OR / PICK ONE</span><h2>{content.oneTitle}</h2><p>{content.oneBody}</p><InstallCommand command={getInstallCommand(firstSkill.slug)} label="SINGLE MODULE" eventSource="install_single_module" locale={locale} /><Link className="text-link" href={localizedPath(locale, "/skills")}>{content.oneLink}</Link></div></section>
      <section className="install-step"><div className="step-number">03</div><div className="step-content"><span className="panel-kicker">MANUAL ROUTE</span><h2>{content.manualTitle}</h2><p>{content.manualBody}</p><div className="path-grid"><div><span>Codex</span><code>~/.codex/skills/&lt;skill-name&gt;</code></div><div><span>Project scope</span><code>.agents/skills/&lt;skill-name&gt;</code></div><div><span>Claude Code</span><code>.claude/skills/&lt;skill-name&gt;</code></div></div></div></section>
      <section className="install-step safety-step"><div className="step-number">04</div><div className="step-content"><span className="panel-kicker">TRUST PROTOCOL</span><h2>{content.trustTitle}</h2><p>{content.trustBody}</p><ul className="safety-list">{content.checks.map((item, index) => <li key={item}><span>CHECK.{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>{siteConfig.isRepoConfigured ? <TrackedGithubLink className="primary-link" href={siteConfig.githubUrl} target="_blank" rel="noreferrer" eventSource="install_repository">{content.repo}</TrackedGithubLink> : <span className="primary-link is-disabled">{content.repoDisabled}</span>}</div></section>
      <section className="install-step troubleshoot-step"><div className="step-number">05</div><div className="step-content"><span className="panel-kicker">{content.troubleshoot}</span><h2>{content.troubleTitle}</h2><p>{content.troubleBody}</p><ol className="troubleshoot-list">{content.troubles.map(([title, body], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>{feedbackUrl ? <TrackedGithubLink className="primary-link" href={feedbackUrl} target="_blank" rel="noreferrer" eventSource="install_failure_feedback">{content.report}</TrackedGithubLink> : <span className="primary-link is-disabled">{content.reportDisabled}</span>}</div></section>
    </div>
  );
}
