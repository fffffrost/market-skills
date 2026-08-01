export type SeoChecklistPage = {
  slug: string;
  pageTitle: string;
  pageSummary: string;
  seoTitle: string;
  seoDescription: string;
  keywords: readonly string[];
  eyebrow: string;
  headline: string;
  introduction: string;
  checklistLabel: string;
  steps: readonly {
    code: string;
    title: string;
    description: string;
    question: string;
  }[];
  worksheetLabel: string;
  worksheetTitle: string;
  template: string;
  exampleLabel: string;
  exampleTitle: string;
  exampleNote: string;
  example: readonly {
    label: string;
    result: string;
    detail: string;
  }[];
  caseLink?: {
    href: string;
    label: string;
  };
};

const pages = {
  "content-repurposing": {
    slug: "content-repurposing",
    pageTitle: "China Content Localization Checklist",
    pageSummary:
      "Use a practical China content localization checklist to rebuild an approved global source for Chinese audiences, channels, search intent, and sales use without letting facts or terminology drift.",
    seoTitle: "China Content Localization Checklist & AI Skill",
    seoDescription:
      "Use a China content localization checklist to adapt global content for WeChat, REDnote, Zhihu, Bilibili, Baidu search, and sales without claim drift.",
    keywords: [
      "China content localization checklist",
      "content localization for China",
      "China marketing content localization",
      "localize content for Chinese market",
      "WeChat REDnote content adaptation",
    ],
    eyebrow: "CHINA CONTENT LOCALIZATION CHECKLIST",
    headline: "Localize the job, not just the language.",
    introduction:
      "China-ready content is not one translated master cut into smaller pieces. Lock the source truth, decide what each Chinese audience and channel must accomplish, then rebuild the reading path while every claim remains traceable.",
    checklistLabel: "Six gates from source truth to local approval",
    steps: [
      {
        code: "01 / SOURCE",
        title: "Lock source truth",
        description: "Separate approved facts, dated claims, terminology, quotations, and material that may change.",
        question: "Can every local version point back to an approved source?",
      },
      {
        code: "02 / AUDIENCE",
        title: "Define the China reader",
        description: "Name the buyer, user, knowledge level, search intent, decision stage, and action the content must support.",
        question: "What must this reader understand or decide next?",
      },
      {
        code: "03 / CHANNEL",
        title: "Assign one channel job",
        description: "Give WeChat, REDnote, Zhihu, Bilibili, Baidu search, and sales follow-up distinct roles instead of duplicate copy.",
        question: "Why should this asset exist on this channel?",
      },
      {
        code: "04 / STRUCTURE",
        title: "Rebuild the reading path",
        description: "Change the hook, order, proof density, format, and call to action for the channel and intent.",
        question: "Does the structure feel native without copying a trend?",
      },
      {
        code: "05 / TRACE",
        title: "Preserve claim traceability",
        description: "Map localized numbers, product claims, names, and conclusions to the source and flag every inference.",
        question: "Did meaning change while the expression changed?",
      },
      {
        code: "06 / REVIEW",
        title: "Run local review gates",
        description: "Check language, brand voice, subject-matter accuracy, platform fit, approval dependencies, and expiry dates.",
        question: "Who must approve what before this asset moves?",
      },
    ],
    worksheetLabel: "WORKSHEET / COPY AND COMPLETE",
    worksheetTitle: "From approved source to channel-native system",
    template: `CHINA CONTENT LOCALIZATION CHECKLIST

SOURCE TRUTH
Approved source asset:
Source owner:
Evidence cutoff date:
Approved facts and claims:
Approved terminology:
Mutable or prohibited material:

CHINA AUDIENCE
Primary reader / buyer:
Knowledge level:
Search or discovery intent:
Decision stage:
Next action to support:

CHANNEL JOBS
WeChat — role / reader promise / CTA:
REDnote — role / reader promise / CTA:
Zhihu — role / reader promise / CTA:
Bilibili — role / reader promise / CTA:
Baidu search — query / answer / CTA:
Sales follow-up — trigger / proof / CTA:

STRUCTURE REBUILD
New hook:
Reading path:
Proof order:
Format changes:
Elements removed from the source:

CLAIM MAP
Localized claim | Source location | Expression change | Inference? | Owner

REVIEW GATES
[ ] Chinese language and terminology
[ ] Buyer and channel fit
[ ] Product / subject-matter accuracy
[ ] Brand and legal review
[ ] Platform and format check
[ ] Final source-to-output consistency

HANDOFF
Asset owner:
Approval dependencies:
Known unknowns:
Publish / review date:`,
    exampleLabel: "SYNTHETIC EXAMPLE",
    exampleTitle: "One approved report, four different local jobs.",
    exampleNote:
      "This illustrates the transformation logic, not current platform rules or a real campaign. A production brief must use the actual source, audience, and review requirements.",
    example: [
      {
        label: "WECHAT",
        result: "Build the full argument",
        detail: "A decision-led article connects the business problem, evidence, implications, and a credible next step.",
      },
      {
        label: "REDNOTE",
        result: "Make the problem scannable",
        detail: "A compact discovery asset surfaces one practical tension without inventing certainty or lifestyle proof.",
      },
      {
        label: "ZHIHU / BAIDU",
        result: "Answer an explicit question",
        detail: "A query-led explanation defines the problem, limits the claim, and routes the reader to deeper material.",
      },
      {
        label: "SALES",
        result: "Support the next decision",
        detail: "A follow-up note selects only the proof relevant to the buyer stage and keeps every statement traceable.",
      },
    ],
  },
  "wechat-article-editor": {
    slug: "wechat-article-editor",
    pageTitle: "WeChat Article Editing Checklist",
    pageSummary:
      "Use a publication-ready WeChat article editing checklist to repair the reading path, strengthen evidence and Chinese rhythm, align the title and abstract, and surface final human approvals.",
    seoTitle: "WeChat Article Editing Checklist & AI Skill",
    seoDescription:
      "Use a WeChat article editing checklist for structure, reader promise, evidence, Chinese rhythm, titles, abstracts, visual notes, and final publication review.",
    keywords: [
      "WeChat article editing checklist",
      "WeChat Official Account article editor",
      "edit WeChat article",
      "WeChat content checklist",
      "Chinese WeChat article editing",
    ],
    eyebrow: "WECHAT ARTICLE EDITING CHECKLIST",
    headline: "Edit the reading path before you polish sentences.",
    introduction:
      "A publishable WeChat Official Account article is one aligned system: reader promise, structure, evidence, Chinese rhythm, title, abstract, visual notes, and call to action. Fix that system before line editing hides a broken argument.",
    checklistLabel: "Six passes from draft diagnosis to publishing package",
    steps: [
      {
        code: "01 / MODE",
        title: "Agree the edit mode",
        description: "Choose proofread, line edit, structural edit, or source-led reconstruction and protect the author position.",
        question: "What may change, and what must remain untouched?",
      },
      {
        code: "02 / PROMISE",
        title: "State the reader promise",
        description: "Name the reader, the tension they recognize, the value they receive, and the next action the article supports.",
        question: "Can the promise be stated in one precise sentence?",
      },
      {
        code: "03 / PATH",
        title: "Repair the reading path",
        description: "Reorder the opening, problem, evidence, implications, objections, and close; remove repeated sections.",
        question: "Does each section earn the next one?",
      },
      {
        code: "04 / PROOF",
        title: "Strengthen credibility",
        description: "Trace numbers, quotations, product claims, dates, and causal language; flag unsupported or expired statements.",
        question: "Which claims still need a human owner or source?",
      },
      {
        code: "05 / RHYTHM",
        title: "Edit Chinese rhythm",
        description: "Tighten sentence length, transitions, headings, repetition, and jargon without flattening the author voice.",
        question: "Is the article easier to follow without sounding generic?",
      },
      {
        code: "06 / PACKAGE",
        title: "Align the publishing package",
        description: "Check title, abstract, body, visual notes, captions, CTA, preview, links, and the final approval queue together.",
        question: "Do all publishing elements make the same promise?",
      },
    ],
    worksheetLabel: "WORKSHEET / COPY AND COMPLETE",
    worksheetTitle: "From draft diagnosis to publication handoff",
    template: `WECHAT ARTICLE EDITING CHECKLIST

EDIT MODE
Requested mode: proofread / line / structural / reconstruction
Author position to preserve:
Facts or sections that must not change:
Approval owner:

READER PROMISE
Primary reader:
Recognized tension:
Value of reading:
Decision or action after reading:
One-sentence promise:

READING PATH
Opening job:
Section sequence:
Repeated or removable sections:
Evidence placement:
Objection / limitation:
Close and CTA:

PROOF CHECK
Claim | Source | Date | Wording risk | Owner | Status

CHINESE EDIT
[ ] Sentence length and subject are clear
[ ] Headings describe real progression
[ ] Transitions carry the argument
[ ] Jargon and translated phrasing are removed
[ ] Author voice and position are preserved

PUBLISHING PACKAGE
Title options:
Abstract:
Cover / visual note:
In-body image and caption notes:
Links and CTA:
Preview device / account:

FINAL HUMAN CHECKS
[ ] Product and factual approval
[ ] Brand / communications approval
[ ] Copyright and compliance review
[ ] Title, abstract, body, and visuals aligned
[ ] Unknowns and unresolved claims visible

HANDOFF
Change log:
Approval queue:
Publication owner / date:`,
    exampleLabel: "SYNTHETIC EDIT TRACE",
    exampleTitle: "Four repairs that turn a correct draft into a readable article.",
    exampleNote:
      "This is an illustrative edit trace, not a real client result. The full case keeps the facts synthetic and shows where product approval must interrupt the edit.",
    example: [
      {
        label: "OPENING",
        result: "Lead with the reader tension",
        detail: "Replace several paragraphs of internal context with the decision the target reader is already facing.",
      },
      {
        label: "STRUCTURE",
        result: "Merge repeated benefits",
        detail: "Move proof beside the claim it supports and let each section advance a distinct part of the argument.",
      },
      {
        label: "CLAIMS",
        result: "Stop where facts are missing",
        detail: "Keep dated statements traceable and send unresolved product or performance claims to an explicit owner.",
      },
      {
        label: "PACKAGE",
        result: "Align every promise",
        detail: "Make the title, abstract, body, visual notes, and CTA describe the same article instead of five variants.",
      },
    ],
    caseLink: {
      href: "/en/cases/edit-a-wechat-draft-for-publishing/",
      label: "Open the full synthetic editing case",
    },
  },
} as const satisfies Record<string, SeoChecklistPage>;

export function getSeoChecklistPage(slug: string): SeoChecklistPage | undefined {
  return pages[slug as keyof typeof pages];
}
