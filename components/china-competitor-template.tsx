import Link from "next/link";
import { CopyButton } from "@/components/copy-button";
import { chinaCompetitorTemplate } from "@/lib/china-competitor-template";

export function ChinaCompetitorTemplate() {
  return (
    <section className="competitor-template" aria-labelledby="competitor-template-title">
      <div className="competitor-template-intro">
        <div>
          <span className="panel-kicker">CHINA COMPETITOR ANALYSIS TEMPLATE</span>
          <h2 id="competitor-template-title">Classify the market before you compare it.</h2>
        </div>
        <p>
          A useful China competitor analysis starts with the decision and buyer context—not a list of
          familiar brands. Use these four layers to decide what belongs in the core comparison, what
          needs a separate model, and what should stay on a watchlist.
        </p>
      </div>

      <div className="competitor-layer-grid" aria-label="Four-layer competitor framework">
        {chinaCompetitorTemplate.layers.map((layer) => (
          <article key={layer.code}>
            <span>{layer.code}</span>
            <h3>{layer.title}</h3>
            <p>{layer.description}</p>
            <strong>{layer.question}</strong>
          </article>
        ))}
      </div>

      <div className="competitor-template-console">
        <div className="competitor-template-head">
          <div>
            <span>WORKSHEET / COPY AND COMPLETE</span>
            <strong>From market scope to decision output</strong>
          </div>
          <CopyButton value={chinaCompetitorTemplate.template} label="Copy template" />
        </div>
        <pre><code>{chinaCompetitorTemplate.template}</code></pre>
      </div>

      <div className="competitor-example">
        <div className="competitor-example-heading">
          <div>
            <span className="panel-kicker">SYNTHETIC EXAMPLE</span>
            <h3>One B2B AI category, four different competitive roles.</h3>
          </div>
          <p>
            These are illustrative classifications, not current market claims. A real analysis must
            replace them with dated sources and explicit inclusion decisions.
          </p>
        </div>
        <div className="competitor-example-grid">
          {chinaCompetitorTemplate.example.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.result}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
        <Link href="/en/cases/map-competitors-before-comparing/">
          Open the full synthetic case <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
