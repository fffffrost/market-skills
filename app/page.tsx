import Link from "next/link";
import { InstallCommand } from "@/components/install-command";
import { SkillCard } from "@/components/skill-card";
import { getInstallCommand } from "@/lib/site-config";
import { getSkills } from "@/lib/skills";

const phaseMeta = [
  { key: "insight", no: "01", label: "洞察", verb: "看见真正的问题", code: "OBSERVE" },
  { key: "strategy", no: "02", label: "策略", verb: "做出清晰的选择", code: "DECIDE" },
  { key: "content", no: "03", label: "内容", verb: "把价值表达出来", code: "EXPRESS" },
  { key: "execution", no: "04", label: "执行", verb: "让协作真正落地", code: "OPERATE" },
  { key: "review", no: "05", label: "复盘", verb: "把经验变成资产", code: "LEARN" },
] as const;

export default function HomePage() {
  const skills = getSkills();

  return (
    <>
      <section className="hero shell">
        <div className="hero-copy reveal reveal-1">
          <div className="eyebrow"><span>READY</span> / 中文市场任务库 · v1.0</div>
          <h1>
            别从空白<br />
            <span>Prompt</span> 开始。
          </h1>
          <p className="hero-lead">装上经过实战提炼的方法，再开始工作。10 个可安装 Agent Skills，覆盖从洞察到复盘的完整市场链路。</p>
          <form action="/skills" className="hero-search">
            <label htmlFor="hero-query">你现在要完成什么市场任务？</label>
            <div>
              <span aria-hidden="true">&gt;_</span>
              <input id="hero-query" name="q" placeholder="例如：竞品研究、公众号审稿、活动复盘" />
              <button type="submit">RUN ↗</button>
            </div>
          </form>
          <div className="quick-links" aria-label="快捷任务">
            <span>QUICK.RUN</span>
            <Link href="/skills?q=竞品">竞品</Link>
            <Link href="/skills?q=定位">定位</Link>
            <Link href="/skills?q=公众号">公众号</Link>
            <Link href="/skills?q=活动">活动</Link>
            <Link href="/skills?q=复盘">复盘</Link>
          </div>
        </div>

        <div className="mission-panel reveal reveal-2" aria-label="系统概览">
          <div className="panel-topline">
            <span>MISSION.CONTROL</span>
            <span>CN_MARKETING_OS</span>
          </div>
          <div className="radar-field" aria-hidden="true">
            <div className="radar-ring ring-1" />
            <div className="radar-ring ring-2" />
            <div className="radar-cross cross-x" />
            <div className="radar-cross cross-y" />
            <div className="radar-sweep" />
            <span className="radar-node node-1" />
            <span className="radar-node node-2" />
            <span className="radar-node node-3" />
            <strong>10</strong>
            <small>MODULES READY</small>
          </div>
          <div className="system-readout">
            <div><span>WORKFLOW</span><strong>05 PHASES</strong></div>
            <div><span>LANGUAGE</span><strong>ZH-CN</strong></div>
            <div><span>FORMAT</span><strong>OPEN SKILL</strong></div>
            <div><span>LICENSE</span><strong>MIT</strong></div>
          </div>
          <div className="boot-log">
            <span>✓ evidence chain</span>
            <span>✓ output template</span>
            <span>✓ boundary guardrails</span>
          </div>
        </div>
      </section>

      <section className="workflow-section shell reveal reveal-3" aria-labelledby="workflow-title">
        <div className="section-heading">
          <div>
            <span className="section-code">01 / WORKFLOW MAP</span>
            <h2 id="workflow-title">按工作推进，不按工具堆砌。</h2>
          </div>
          <p>每个 Skill 对应一个清晰任务。它知道什么时候介入、需要什么输入，也知道应该在哪里停下。</p>
        </div>
        <div className="phase-rail">
          {phaseMeta.map((phase) => {
            const count = skills.filter((skill) => skill.phase === phase.key).length;
            return (
              <Link href={`/skills?phase=${phase.key}`} className={`phase-node phase-${phase.key}`} key={phase.key}>
                <span className="phase-number">{phase.no}</span>
                <span className="phase-code">{phase.code}</span>
                <strong>{phase.label}</strong>
                <small>{phase.verb}</small>
                <em>{count} MODULES</em>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="featured-section shell" aria-labelledby="featured-title">
        <div className="section-heading compact">
          <div>
            <span className="section-code">02 / MODULE LIBRARY</span>
            <h2 id="featured-title">首发技能，全部可用。</h2>
          </div>
          <Link className="text-link" href="/skills">打开完整任务库 →</Link>
        </div>
        <div className="skill-grid featured-grid">
          {skills.slice(0, 6).map((skill) => <SkillCard skill={skill} index={skill.order} key={skill.slug} />)}
        </div>
      </section>

      <section className="principles-section shell" id="principles" aria-labelledby="principles-title">
        <div className="principles-copy">
          <span className="section-code">03 / QUALITY PROTOCOL</span>
          <h2 id="principles-title">不是写得长，<br />而是做得稳。</h2>
          <p>每个 Skill 都把营销工作的判断标准、输入边界和交付结构写进 Agent 的工作方式里。</p>
        </div>
        <ol className="protocol-list">
          <li><span>01</span><div><strong>触发准确</strong><p>说清适用场景，也写清不该介入的任务。</p></div></li>
          <li><span>02</span><div><strong>证据优先</strong><p>区分事实、官方口径、分析推断与未知项。</p></div></li>
          <li><span>03</span><div><strong>交付明确</strong><p>输入、步骤、模板和验收标准都可直接复用。</p></div></li>
          <li><span>04</span><div><strong>源码可查</strong><p>开源、可修改，安装前能审阅全部指令和依赖。</p></div></li>
        </ol>
      </section>

      <section className="install-cta shell">
        <div className="cta-copy">
          <span className="section-code orange">04 / INITIALIZE</span>
          <h2>一次安装，<br />补齐整个市场工作链。</h2>
          <p>也可以只选择当前需要的单个 Skill。支持 Codex、Claude Code、Cursor 与其他兼容 Agent Skills 的工具。</p>
          <Link className="primary-link" href="/install">查看安装说明 ↗</Link>
        </div>
        <InstallCommand command={getInstallCommand()} label="INSTALL ALL / 10 MODULES" />
      </section>
    </>
  );
}

