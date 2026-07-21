"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SkillCard } from "@/components/skill-card";
import type { SkillListing, SkillPhase } from "@/lib/skill-schema";

const phaseOptions: Array<{ value: "all" | SkillPhase; label: string }> = [
  { value: "all", label: "全部阶段" },
  { value: "insight", label: "洞察" },
  { value: "strategy", label: "策略" },
  { value: "content", label: "内容" },
  { value: "execution", label: "执行" },
  { value: "review", label: "复盘" },
];

export function SkillExplorer({
  skills,
}: {
  skills: SkillListing[];
}) {
  const searchParams = useSearchParams();
  const requestedPhase = searchParams.get("phase");
  const initialPhase = phaseOptions.some((option) => option.value === requestedPhase)
    ? (requestedPhase as SkillPhase)
    : "all";
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [phase, setPhase] = useState<"all" | SkillPhase>(initialPhase);
  const [role, setRole] = useState("all");
  const [task, setTask] = useState("all");

  const roles = useMemo(() => [...new Set(skills.flatMap((skill) => skill.roles))].sort(), [skills]);
  const tasks = useMemo(() => [...new Set(skills.flatMap((skill) => skill.tasks))].sort(), [skills]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
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
      ].join(" ").toLocaleLowerCase("zh-CN");

      return (
        (!normalized || haystack.includes(normalized)) &&
        (phase === "all" || skill.phase === phase) &&
        (role === "all" || skill.roles.includes(role)) &&
        (task === "all" || skill.tasks.includes(task))
      );
    });
  }, [phase, query, role, skills, task]);

  const isFiltered = query || phase !== "all" || role !== "all" || task !== "all";

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
          <span className="sr-only">搜索 Skill</span>
          <span className="search-prompt" aria-hidden="true">QUERY://</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="输入你要完成的任务，例如：竞品、公众号、活动复盘"
          />
        </label>
        <div className="filter-grid">
          <label>
            <span>阶段</span>
            <select value={phase} onChange={(event) => setPhase(event.target.value as "all" | SkillPhase)}>
              {phaseOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
          </label>
          <label>
            <span>岗位</span>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="all">全部岗位</option>
              {roles.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>任务</span>
            <select value={task} onChange={(event) => setTask(event.target.value)}>
              <option value="all">全部任务</option>
              {tasks.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <div className="filter-status" aria-live="polite">
          <span>RETURNED / {String(filtered.length).padStart(2, "0")}</span>
          {isFiltered && <button type="button" onClick={reset}>清空筛选 ×</button>}
        </div>
      </div>

      {filtered.length ? (
        <div className="skill-grid">
          {filtered.map((skill) => <SkillCard skill={skill} index={skill.order} key={skill.slug} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="empty-code">404 / NO MATCH</span>
          <h2>暂时没有匹配的 Skill</h2>
          <p>换一个更具体的工作任务，或清空筛选查看完整工作链。</p>
          <button type="button" onClick={reset}>重置检索</button>
        </div>
      )}
    </div>
  );
}
