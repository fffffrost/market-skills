import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { InstallCommand } from "@/components/install-command";
import { getCasesForSkill } from "@/lib/cases";
import { createPageMetadata } from "@/lib/seo";
import { absoluteUrl, getInstallCommand, siteConfig } from "@/lib/site-config";
import { getSkill, getSkills } from "@/lib/skills";

type SkillPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  return createPageMetadata({
    title: skill.title + " AI Skill",
    description: skill.summary,
    path: "/skills/" + skill.slug + "/",
    keywords: [skill.english_name, ...skill.tasks, ...skill.roles],
  });
}

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();
  const skillPath = "/skills/" + skill.slug + "/";
  const skillUrl = absoluteUrl(skillPath);
  const relatedCases = getCasesForSkill(skill.slug);
  const skillJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(skillPath + "#webpage"),
        url: skillUrl,
        name: skill.title + " AI Skill",
        description: skill.summary,
        inLanguage: "zh-CN",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: { "@id": absoluteUrl(skillPath + "#skill") },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首页", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "技能库", item: absoluteUrl("/skills/") },
          { "@type": "ListItem", position: 3, name: skill.title, item: skillUrl },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": absoluteUrl(skillPath + "#skill"),
        name: skill.title,
        alternateName: skill.english_name,
        description: skill.summary,
        url: skillUrl,
        ...(siteConfig.isRepoConfigured
          ? { codeRepository: siteConfig.githubUrl + "/tree/main/skills/" + skill.slug }
          : {}),
        version: skill.version,
        dateModified: skill.updated_at,
        license: "https://opensource.org/license/mit",
        inLanguage: "zh-CN",
        programmingLanguage: ["Markdown", "YAML"],
        runtimePlatform: skill.compatibility,
        keywords: skill.tasks,
        isAccessibleForFree: true,
      },
    ],
  };

  return (
    <article className={`skill-detail phase-${skill.phase}`}>
      <JsonLd data={skillJsonLd} />
      <div className="shell">
        <nav className="breadcrumbs" aria-label="面包屑">
          <Link href="/skills">技能库</Link><span>/</span><span>{skill.slug}</span>
        </nav>

        <header className="detail-hero">
          <div className="detail-title-block">
            <div className="eyebrow"><span>{skill.phase_label}</span> / MOD.{String(skill.order).padStart(2, "0")} / v{skill.version}</div>
            <h1>{skill.title}</h1>
            <p className="detail-english">{skill.english_name}</p>
            <p className="detail-summary">{skill.summary}</p>
            <div className="task-tags detail-tags">
              {skill.tasks.map((task) => <span key={task}>{task}</span>)}
            </div>
          </div>
          <div className="detail-status-panel">
            <span className="status-label">MODULE STATUS</span>
            <strong><i /> READY TO INSTALL</strong>
            <dl>
              <div><dt>VERSION</dt><dd>{skill.version}</dd></div>
              <div><dt>UPDATED</dt><dd>{skill.updated_at}</dd></div>
              <div><dt>LICENSE</dt><dd>MIT</dd></div>
              <div><dt>FILES</dt><dd>{String(skill.files.length).padStart(2, "0")}</dd></div>
            </dl>
          </div>
        </header>

        <InstallCommand command={getInstallCommand(skill.slug)} label={`INSTALL / ${skill.slug}`} />

        {!siteConfig.isRepoConfigured && (
          <p className="config-notice">DEV MODE / 当前命令使用仓库占位符；生产部署会强制要求真实 GitHub 仓库地址。</p>
        )}

        <div className="detail-grid">
          <section className="io-panel">
            <span className="panel-kicker">INPUT / 所需材料</span>
            <ul>{skill.inputs.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section className="io-panel output-panel">
            <span className="panel-kicker">OUTPUT / 交付结果</span>
            <ul>{skill.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        </div>

        <div className="detail-lower-grid">
          <section className="protocol-panel">
            <span className="panel-kicker">EXECUTION PROTOCOL / 执行流程</span>
            <h2>它会怎样工作</h2>
            <ol>
              {skill.protocol_steps.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
              ))}
            </ol>
          </section>

          <aside className="example-panel">
            <span className="panel-kicker">TRY THIS</span>
            <h2>从这个任务开始</h2>
            <div className="prompt-example">
              <code>Use ${skill.slug}</code>
              <p>{skill.example_prompt}</p>
            </div>
            <div className="compatibility-list">
              <span>COMPATIBLE</span>
              <div>{skill.compatibility.map((item) => <em key={item}>{item}</em>)}</div>
            </div>
          </aside>
        </div>

        {relatedCases.length > 0 && (
          <section className="skill-cases-panel">
            <div>
              <span className="panel-kicker">FIELD REPORT / 使用案例</span>
              <h2>看它怎样进入一次完整工作。</h2>
              <p>案例保留了任务背景、起始材料、执行轨迹、输出节选和必须由人完成的判断。</p>
            </div>
            <div className="skill-case-links">
              {relatedCases.map((caseStudy) => (
                <Link href={`/cases/${caseStudy.slug}`} key={caseStudy.slug}>
                  <span>CASE.{String(caseStudy.order).padStart(2, "0")} / 合成演示</span>
                  <strong>{caseStudy.title}</strong>
                  <em>OPEN REPORT ↗</em>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="files-panel">
          <div>
            <span className="panel-kicker">PACKAGE CONTENTS</span>
            <h2>源码透明，安装前可检查。</h2>
            <p>Skill 的指令、模板、兼容信息和依赖都保存在同一个目录中。</p>
          </div>
          <ul className="file-tree">
            {skill.files.map((file) => <li key={file}><span>├─</span>{file}</li>)}
          </ul>
          {siteConfig.isRepoConfigured ? (
            <a className="secondary-link" href={`${siteConfig.githubUrl}/tree/main/skills/${skill.slug}`} target="_blank" rel="noreferrer">查看 GitHub 源码 ↗</a>
          ) : (
            <span className="secondary-link is-disabled">连接 GitHub 后查看源码</span>
          )}
        </section>

        <nav className="detail-end-nav">
          <Link href="/skills">← 返回技能库</Link>
          <Link href="/install">查看安装指南 →</Link>
        </nav>
      </div>
    </article>
  );
}
