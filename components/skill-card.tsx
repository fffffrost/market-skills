import Link from "next/link";
import type { SkillListing } from "@/lib/skill-schema";

export function SkillCard({ skill, index }: { skill: SkillListing; index: number }) {
  return (
    <article className={`skill-card phase-${skill.phase}`}>
      <Link href={`/skills/${skill.slug}`} className="skill-card-link" aria-label={`打开 ${skill.title}`}>
        <div className="card-index">MOD.{String(index).padStart(2, "0")}</div>
        <div className="card-phase">{skill.phase_label}</div>
        <h3>{skill.title}</h3>
        <p className="skill-english">{skill.english_name}</p>
        <p className="skill-summary">{skill.summary}</p>
        <div className="task-tags" aria-label="任务标签">
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

