export const chinaCompetitorTemplate = {
  pageTitle: "China Competitor Analysis Template",
  pageSummary:
    "Use a structured China competitor analysis template to separate direct rivals, platform-native capabilities, adjacent solutions, and substitutes before an entry or positioning decision.",
  seoTitle: "China Competitor Analysis Template & AI Skill",
  seoDescription:
    "Use a China competitor analysis template to classify direct rivals, platform-native capabilities, adjacent solutions, substitutes, evidence gaps, and entry implications.",
  keywords: [
    "China competitor analysis template",
    "China competitor analysis",
    "China market competitor research",
    "China market entry competitor analysis",
  ],
  layers: [
    {
      code: "01 / DIRECT",
      title: "Direct competitors",
      description: "Products serving the same China buyer, core job, and purchase path.",
      question: "Would the buyer compare or replace us with this option?",
    },
    {
      code: "02 / PLATFORM",
      title: "Platform-native capabilities",
      description: "Capabilities bundled into platforms the buyer already uses.",
      question: "Does distribution, data, or bundling change the buying decision?",
    },
    {
      code: "03 / ADJACENT",
      title: "Adjacent solutions",
      description: "Services or tools solving part of the job through a different delivery model.",
      question: "Does it compete for the same budget, owner, or outcome?",
    },
    {
      code: "04 / SUBSTITUTE",
      title: "Substitutes",
      description: "Manual work, internal builds, or the decision to keep the status quo.",
      question: "What existing behavior must change before a purchase happens?",
    },
  ],
  template: `CHINA COMPETITOR ANALYSIS

DECISION FRAME
Decision this analysis must support:
Focal product:
China buyer / user:
Core job:
Purchase path:
Segment / geography:
Evidence cutoff date:

CANDIDATE CLASSIFICATION
01 DIRECT COMPETITOR
- Candidate:
- Buyer + job overlap:
- Purchase / replacement evidence:
- Include, monitor, or exclude:

02 PLATFORM-NATIVE CAPABILITY
- Platform + capability:
- Distribution / data advantage:
- Buyer adoption evidence:
- Include, monitor, or exclude:

03 ADJACENT SOLUTION
- Provider + delivery model:
- Shared budget / owner / outcome:
- Why it is not direct:
- Include, monitor, or exclude:

04 SUBSTITUTE
- Existing behavior or workaround:
- Why buyers keep it:
- Trigger for change:
- Include, monitor, or exclude:

EVIDENCE LEDGER
Claim | Source | Source type | Published / checked | Confidence | Unknown

COMPARISON
Candidate | Layer | Buyer | Core job | Value promise | Proof | Delivery | Entry implication

DECISION OUTPUT
Core comparison set:
Watchlist:
Evidence to validate next:
Positioning implication:
Owner + next review date:`,
  example: [
    {
      label: "DIRECT",
      result: "Compare",
      detail: "An independent product aimed at the same marketing team and workflow.",
    },
    {
      label: "PLATFORM",
      result: "Model separately",
      detail: "A capability embedded in a platform the team already operates every day.",
    },
    {
      label: "ADJACENT",
      result: "Track budget overlap",
      detail: "A managed service that delivers the outcome without selling the same product.",
    },
    {
      label: "SUBSTITUTE",
      result: "Test switching trigger",
      detail: "An internal spreadsheet-and-agency workflow that buyers may prefer to keep.",
    },
  ],
} as const;
