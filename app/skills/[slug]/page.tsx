import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstallCommand } from "@/components/install-command";
import { getInstallCommand, siteConfig } from "@/lib/site-config";
import { getSkill, getSkills } from "@/lib/skills";

type SkillPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getSkills().map((skill) => ({ slug: skill.slug }));
}

export async function generateMetadata({ params }: SkillPageProps): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return {};
  return {
    title: skill.title,
    description: skill.summary,
    openGraph: { title: `${skill.title} // MARKET//SKILLS`, description: skill.summary },
  };
}

export default async function SkillDetailPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const sections = [...skill.body.matchAll(/^## (.+)$/gm)].map((match) => match[1]);

  return (
    <article className={`skill-detail phase-${skill.phase}`}>
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
            <span className="panel-kicker">EXECUTION PROTOCOL</span>
            <h2>它会怎样工作</h2>
            <ol>
              {sections.filter((section) => !section.toLowerCase().includes("compatibility")).slice(0, 6).map((section, index) => (
                <li key={section}><span>{String(index + 1).padStart(2, "0")}</span>{section}</li>
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

