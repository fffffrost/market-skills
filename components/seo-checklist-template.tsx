import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import type { SeoChecklistPage } from "@/lib/seo-checklist-pages";

export function SeoChecklistTemplate({ page }: { page: SeoChecklistPage }) {
  const titleId = `${page.slug}-checklist-title`;

  return (
    <section className="competitor-template checklist-template" aria-labelledby={titleId}>
      <div className="competitor-template-intro">
        <div>
          <span className="panel-kicker">{page.eyebrow}</span>
          <h2 id={titleId}>{page.headline}</h2>
        </div>
        <p>{page.introduction}</p>
      </div>

      <div className="competitor-layer-grid checklist-step-grid" aria-label={page.checklistLabel}>
        {page.steps.map((step) => (
          <article key={step.code}>
            <span>{step.code}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <strong>{step.question}</strong>
          </article>
        ))}
      </div>

      <div className="competitor-template-console">
        <div className="competitor-template-head">
          <div>
            <span>{page.worksheetLabel}</span>
            <strong>{page.worksheetTitle}</strong>
          </div>
          <CopyButton value={page.template} label="Copy checklist" />
        </div>
        <pre><code>{page.template}</code></pre>
      </div>

      <div className="competitor-example">
        <div className="competitor-example-heading">
          <div>
            <span className="panel-kicker">{page.exampleLabel}</span>
            <h3>{page.exampleTitle}</h3>
          </div>
          <p>{page.exampleNote}</p>
        </div>
        <div className="competitor-example-grid">
          {page.example.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.result}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        {page.caseLink && (
          <Link href={page.caseLink.href}>
            {page.caseLink.label} <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </section>
  );
}
