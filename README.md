# MARKET//SKILLS

Open-source, installable AI agent skills for marketing teams. The collection covers the workflow from market insight and positioning to content, campaign execution, SOPs, and retrospectives.

MARKET//SKILLS 是一套面向市场人的开源 AI Agent Skill，覆盖从洞察、策略、内容与执行到复盘的完整工作链。英文内容帮助全球团队处理中国市场任务。

Browse the bilingual catalog at [mktskill.com](https://mktskill.com/) or [mktskill.com/en/](https://mktskill.com/en/).

## Use with Mika

[Mika, your AI marketing teammate](https://mktskill.com/en/?utm_source=github&utm_medium=referral&utm_campaign=public_skills), uses these open methods to work from a brief to a reviewable delivery. The English workspace supports research, planning, content and analysis, with task progress, source records, revisions and editable exports.

Start with competitor research for a small B2B marketing team:

- [Free competitor research work pack](https://mktskill.com/en/resources/competitor-research-pack/?utm_source=github&utm_medium=referral&utm_campaign=public_skills): blank Excel workbook, fictional filled example and evidence ledger. No login required to download.
- [Brevo, Mailchimp and Kit research example](https://mktskill.com/en/research/brevo-mailchimp-kit/?utm_source=github&utm_medium=referral&utm_campaign=public_skills): a real public-source Mika run, reviewed report files and a condensed execution replay. This is a product demonstration, not a customer case.
- [Open the English workspace](https://app.mktskill.com/?lang=en&utm_source=github&utm_medium=referral&utm_campaign=public_skills): submit your own brief. Task execution uses the Mika credits and eligibility shown in your account.

You can also install the Skills below and use them in your own agent. Installing a Skill and using the hosted workspace are separate paths.

## Installation / 安装

Install the complete collection:

```bash
npx skills add fffffrost/market-skills
```

Install one skill:

```bash
npx skills add fffffrost/market-skills --skill research-competitors
```

Inspect a local checkout:

```bash
npx skills add . --list
npx skills add . --skill research-competitors --agent codex --copy -y
```

## Skill structure / Skill 结构

```text
skills/<skill-name>/
├── SKILL.md
├── listing.yaml
├── agents/openai.yaml
└── references/<task-template>.md
```

- `SKILL.md`: agent instructions, triggers, workflow, and boundaries.
- `listing.yaml`: bilingual catalog metadata, version, and protocol steps.
- `agents/openai.yaml`: interface metadata for compatible hosts such as Codex.
- `references/`: task templates loaded only when needed.

## Validation / 校验

```bash
npm ci
npm run verify
```

The validator checks directory structure, metadata, references, licensing, and positive/negative acceptance cases for all published skills.

## Repository scope / 仓库范围

This public repository intentionally contains the Skill sources and their supporting validation and feedback files. The website is a separate distribution surface and its application source is not part of this repository.

本公开仓库只包含 Skill 源文件，以及必要的校验与反馈配置；网站作为独立的展示和分发渠道，不在本仓库开源。

## License

MIT
