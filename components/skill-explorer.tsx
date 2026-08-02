"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SkillCard } from "@/components/skill-card";
import type { SkillListing, SkillPhase } from "@/lib/skill-schema";
import type { Locale } from "@/lib/site-content";
import { trackEvent } from "@/lib/telemetry";

const copy = {
  en: {
    phaseOptions: [["all", "All stages"], ["insight", "Insight"], ["strategy", "Strategy"], ["content", "Content"], ["execution", "Execution"], ["review", "Review"]],
    search: "Search skills",
    placeholder: "Describe a job: China competitors, WeChat, localization, campaign review",
    phase: "Stage", role: "Role", task: "Job", allRoles: "All roles", allTasks: "All jobs",
    clear: "Clear filters ×", emptyTitle: "No matching skill yet", emptyBody: "Try a more specific China marketing job or reset the filters.", reset: "Reset search",
  },
  zh: {
    phaseOptions: [["all", "全部阶段"], ["insight", "洞察"], ["strategy", "策略"], ["content", "内容"], ["execution", "执行"], ["review", "复盘"]],
    search: "搜索 Skill", placeholder: "输入任务，例如：竞品、公众号、活动复盘",
    phase: "阶段", role: "岗位", task: "任务", allRoles: "全部岗位", allTasks: "全部任务",
    clear: "清空筛选 ×", emptyTitle: "暂时没有匹配的 Skill", emptyBody: "换一个更具体的工作任务，或清空筛选查看完整工作链。", reset: "重置检索",
  },
} as const;

export function SkillExplorer({
  skills,
  locale,
}: {
  skills: SkillListing[];
  locale: Locale;
}) {
  const content = copy[locale];
  const phaseOptions = content.phaseOptions as ReadonlyArray<readonly ["all" | SkillPhase, string]>;
  const searchParams = useSearchParams();
  const requestedPhase = searchParams.get("phase");
  const initialPhase = phaseOptions.some(([value]) => value === requestedPhase)
    ? (requestedPhase as SkillPhase)
    : "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [phase, setPhase] = useState<"all" | SkillPhase>(initialPhase);
  const [role, setRole] = useState("all");
  const [task, setTask] = useState("all");
  const lastTrackedEmptyState = useRef("");

  const roles = useMemo(() => [...new Set(skills.flatMap((skill) => skill.roles))].sort(), [skills]);
  const tasks = useMemo(() => [...new Set(skills.flatMap((skill) => skill.tasks))].sort(), [skills]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale === "en" ? "en" : "zh-CN");
    return skills.filter((skill) => {
      const haystack = [
        skill.title,
        skill.english_name,
        skill.slug,
        skill.summary,
        ...skill.roles,
        ...skill.tasks,
        ...skill.inputs,
        ...skill.outputs,
      ].join(" ").toLocaleLowerCase(locale === "en" ? "en" : "zh-CN");

      return (
        (!normalized || haystack.includes(normalized)) &&
        (phase === "all" || skill.phase === phase) &&
        (role === "all" || skill.roles.includes(role)) &&
        (task === "all" || skill.tasks.includes(task))
      );
    });
  }, [locale, phase, query, role, skills, task]);

  const isFiltered = query || phase !== "all" || role !== "all" || task !== "all";

  useEffect(() => {
    if (filtered.length || !isFiltered) return;
    const emptyStateKey = [query.trim(), phase, role, task].join("|");
    if (lastTrackedEmptyState.current === emptyStateKey) return;

    const timeout = window.setTimeout(() => {
      trackEvent("search_no_results", "skill_library");
      lastTrackedEmptyState.current = emptyStateKey;
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [filtered.length, isFiltered, phase, query, role, task]);

  function reset() {
    setQuery("");
    setPhase("all");
    setRole("all");
    setTask("all");
  }

  return (
    <div className="explorer">
      <div className="filter-console">
        <label className="search-field">
          <span className="sr-only">{content.search}</span>
          <span className="search-prompt" aria-hidden="true">QUERY://</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={content.placeholder}
          />
        </label>
        <div className="filter-grid">
          <label>
            <span>{content.phase}</span>
            <select value={phase} onChange={(event) => setPhase(event.target.value as "all" | SkillPhase)}>
              {phaseOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
            </select>
          </label>
          <label>
            <span>{content.role}</span>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="all">{content.allRoles}</option>
              {roles.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>{content.task}</span>
            <select value={task} onChange={(event) => setTask(event.target.value)}>
              <option value="all">{content.allTasks}</option>
              {tasks.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="filter-status" aria-live="polite">
          <span>RETURNED / {String(filtered.length).padStart(2, "0")}</span>
          {isFiltered && <button type="button" onClick={reset}>{content.clear}</button>}
        </div>
      </div>

      {filtered.length ? (
        <div className="skill-grid">
          {filtered.map((skill) => <SkillCard skill={skill} index={skill.order} locale={locale} key={skill.slug} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-code">404 / NO MATCH</span>
          <h2>{content.emptyTitle}</h2>
          <p>{content.emptyBody}</p>
          <button type="button" onClick={reset}>{content.reset}</button>
        </div>
      )}
    </div>
  );
}
