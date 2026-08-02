import { JsonLd } from "@/components/json-ld";
import { TrackedGithubLink } from "@/components/tracked-github-link";
import { getFeedbackUrl } from "@/lib/feedback";
import { absoluteUrl } from "@/lib/site-config";
import { localeConfig, localizedPath, type Locale } from "@/lib/site-content";

export const feedbackPageCopy = {
  en: {
    title: "Feedback and Privacy",
    description: "Report installation or skill problems, request a China marketing workflow, and understand the site's minimal event logging.",
    heading: <>Turn a real problem<br />into the next improvement.</>,
    intro: "Choose the closest category and continue in a public GitHub issue. Remove client names, accounts, keys, internal data, and unpublished material before submitting.",
    options: [
      ["ISSUE.01", "Installation failure", "Command errors, missing directories, host discovery failures, or upgrade regressions.", "install-failure", "Report an installation problem ↗", "feedback_install_failure"],
      ["ISSUE.02", "Skill problem", "Inaccurate triggers, weak steps, off-target outputs, missing China context, or unclear boundaries.", "skill-problem", "Report a skill problem ↗", "feedback_skill_problem"],
      ["SIGNAL.03", "Request a workflow", "Describe the real China marketing job, current workaround, and required deliverable so repeated demand can guide the roadmap.", "skill-request", "Submit a demand signal ↗", "feedback_skill_request"],
    ],
    disabled: "Connect GitHub to continue", privacy: "MINIMUM SIGNAL / DATA & PRIVACY", privacyTitle: "Record only the signal needed for the next decision.",
    privacyCopy: [
      "This site has no accounts, cookies, cross-site tracking, or user profiles. It records only whether an install command was copied, a GitHub link was opened, or a search returned no result. Search terms, form content, and work material are never sent.",
      "These fixed events enter the same first-party server logs as normal page visits and help identify installation intent and content gaps. Raw logs are retained for no more than 14 days. GitHub issues are public; never submit sensitive information.",
    ],
  },
  zh: {
    title: "反馈与隐私说明",
    description: "反馈 MARKET//SKILLS 的安装问题、Skill 使用问题或新的市场工作流需求，并了解站点的最小化数据记录。",
    heading: <>把真实问题，<br />变成下一次改进。</>,
    intro: "选择最接近的一类，在公开 GitHub Issue 中继续。提交前请移除客户名称、账号、密钥、内部数据和未公开材料。",
    options: [
      ["ISSUE.01", "安装失败", "命令报错、目录未生成、宿主无法识别，或升级后行为异常。", "install-failure", "报告安装问题 ↗", "feedback_install_failure"],
      ["ISSUE.02", "Skill 问题", "触发不准确、步骤不合理、输出偏离，或边界说明不清。", "skill-problem", "报告 Skill 问题 ↗", "feedback_skill_problem"],
      ["SIGNAL.03", "建议新工作流", "描述真实的市场任务、现有做法和需要的交付物，让重复需求驱动路线图。", "skill-request", "提交需求信号 ↗", "feedback_skill_request"],
    ],
    disabled: "连接 GitHub 后开放", privacy: "MINIMUM SIGNAL / 数据与隐私", privacyTitle: "只记录决定下一步所需的信号。",
    privacyCopy: [
      "本站不设账号，不使用 Cookie、跨站追踪或用户画像。只记录安装命令复制、GitHub 跳转和无结果检索是否发生；不会发送搜索词、表单内容或你的工作材料。",
      "这些固定事件与普通页面访问一样进入本站服务器日志，用于判断安装意向和内容缺口。原始日志最长保留 14 天。GitHub Issue 是公开内容，请勿提交敏感信息。",
    ],
  },
} as const;

export function FeedbackPage({ locale }: { locale: Locale }) {
  const content = feedbackPageCopy[locale];
  const pagePath = localizedPath(locale, "/feedback/");
  const jsonLd = { "@context": "https://schema.org", "@type": "WebPage", "@id": absoluteUrl(pagePath + "#webpage"), url: absoluteUrl(pagePath), name: content.title, description: content.description, inLanguage: localeConfig[locale].languageTag, isPartOf: { "@id": absoluteUrl(localizedPath(locale) + "#website") } };
  return (
    <div className="feedback-page shell">
      <JsonLd data={jsonLd} />
      <header className="feedback-header"><div><span className="section-code orange">FEEDBACK / OPEN CHANNEL</span><h1>{content.heading}</h1></div><p>{content.intro}</p></header>
      <section className="feedback-grid" aria-label={locale === "en" ? "Feedback types" : "反馈类型"}>
        {content.options.map(([code, title, description, kind, action, eventSource]) => { const href = getFeedbackUrl(kind as "install-failure" | "skill-problem" | "skill-request"); return <article key={code}><span>{code}</span><h2>{title}</h2><p>{description}</p>{href ? <TrackedGithubLink href={href} target="_blank" rel="noreferrer" eventSource={eventSource}>{action}</TrackedGithubLink> : <em>{content.disabled}</em>}</article>; })}
      </section>
      <section className="privacy-panel" id="privacy"><div><span className="panel-kicker">{content.privacy}</span><h2>{content.privacyTitle}</h2></div><div className="privacy-copy">{content.privacyCopy.map((item) => <p key={item}>{item}</p>)}</div></section>
    </div>
  );
}
