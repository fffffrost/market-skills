import Link from "next/link";
import type { SkillListing } from "@/lib/skill-schema";
import { localizedPath, type Locale } from "@/lib/site-content";

export function SkillCard({ skill, index, locale }: { skill: SkillListing; index: number; locale: Locale }) {
  return (
    <article className={`skill-card phase-${skill.phase}`}>
      <Link href={localizedPath(locale, `/skills/${skill.slug}`)} className="skill-card-link" aria-label={`${locale === "en" ? "Open" : "打开"} ${skill.title}`}>
        <div className="card-index">MOD.{String(index).padStart(2, "0")}</div>
        <div className="card-phase">{skill.phase_label}</div>
        <h3>{skill.title}</h3>
        {locale === "zh" && <p className="skill-english">{skill.english_name}</p>}
        <p className="skill-summary">{skill.summary}</p>
        <div className="task-tags" aria-label={locale === "en" ? "Task tags" : "任务标签"}>
          {skill.tasks.slice(0, 3).map((task) => <span key={task}>{task}</span>)}
        </div>
        <div className="card-footer">
          <span>v{skill.version}</span>
          <span className="open-mark">OPEN ↗</span>
        </div>
      </Link>
    </article>
  );
}
