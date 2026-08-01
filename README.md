# MARKET//SKILLS

Open-source, installable AI agent skills for global teams operating in China. The first 10 skills cover market intelligence, positioning, Chinese messaging, local content channels, campaign execution, and measurement. Three synthetic cases show how the skills support real decisions without presenting invented client results.

MARKET//SKILLS 是面向中国市场工作的开源 AI Agent Skill Hub。中文主站位于 [`mktskill.com`](https://mktskill.com/)，英文版位于 [`mktskill.com/en/`](https://mktskill.com/en/)。两种语言共享同一套 Skill、安装路径和版本。

## Local development / 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

The example environment uses the public GitHub repository. Production builds require:

```env
NEXT_PUBLIC_GITHUB_REPO=fffffrost/market-skills
NEXT_PUBLIC_SITE_URL=https://mktskill.com
```

A production build fails when the repository is not configured, preventing unusable install commands from being published.

## Quality checks / 质量检查

```bash
npm run validate:skills
npm run typecheck
npm run lint
npm test
npm run build
npm run validate:seo
npm run test:e2e
```

`npm run verify` runs the complete sequence, including the bilingual static export and desktop/mobile browser tests. Run `npm run build` before invoking `npm run test:e2e` by itself.

## Skill structure / Skill 结构

```text
skills/<skill-name>/
├── SKILL.md
├── listing.yaml
├── agents/openai.yaml
└── references/<task-template>.md
```

- `SKILL.md`: agent instructions, triggers, workflow, and boundaries.
- `listing.yaml`: bilingual website metadata, search fields, version, and protocol steps.
- `agents/openai.yaml`: interface metadata for compatible hosts such as Codex.
- `references/`: task templates loaded only when needed.

## Installation / 安装

Install the complete collection or one skill from GitHub:

```bash
npx skills add fffffrost/market-skills
npx skills add fffffrost/market-skills --skill research-competitors
```

Use a local checkout as the source:

```bash
npx skills add . --list
npx skills add . --skill research-competitors --agent codex --copy -y
```

## License

MIT
