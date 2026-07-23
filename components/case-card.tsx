import Link from "next/link";
import type { CaseStudy } from "@/lib/cases";

type CaseCardProps = {
  caseStudy: CaseStudy;
};

export function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <article className={`case-card phase-${caseStudy.phase}`}>
      <Link href={`/cases/${caseStudy.slug}`} className="case-card-link">
        <div className="case-card-topline">
          <span>CASE.{String(caseStudy.order).padStart(2, "0")}</span>
          <span>{caseStudy.phase_label} / 合成演示</span>
        </div>
        <div className="case-card-body">
          <span className="case-card-role">{caseStudy.role}</span>
          <h3>{caseStudy.title}</h3>
          <p>{caseStudy.summary}</p>
        </div>
        <div className="case-card-decision">
          <span>DECISION</span>
          <strong>{caseStudy.decision}</strong>
        </div>
        <div className="case-card-footer">
          <span>USE / {caseStudy.skill_slug}</span>
          <span className="open-mark">OPEN REPORT ↗</span>
        </div>
      </Link>
    </article>
  );
}
