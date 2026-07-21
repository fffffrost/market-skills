---
name: sop-flowchart
description: Create or revise readable business and marketing SOP flowcharts, call scripts, qualification logic, decision trees, handoff processes, and operations diagrams. Use for Mermaid、流程图、逻辑图、SOP 图、一线执行路径, especially when rules are complex or previous arrows and labels overlap.
---

# SOP Flowchart

Turn operating rules into a frontline-readable action path with maintainable source.

## Separate the information

Divide the source into:

- **Main path:** the normal sequence an operator follows.
- **Decision rules:** grading, exceptions, qualification, or retry logic.
- **Handoffs:** terminal state, owner, system, file, SLA, or next action.
- **Unknowns:** contradictions or missing rules that block a safe diagram.

Do not begin drawing until the main path and rule table are explicit.

Read [references/sop-template.md](references/sop-template.md) for the source worksheet and delivery format.

## Build the diagram

### 1. Normalize each step

Use a clear verb and object. Identify the owner, input, action, output, and next state. Merge cosmetic micro-steps that do not change ownership or decision.

### 2. Keep the graph operational

Show only branches that change what the operator does next. Put dense scoring, A/B/C/D rules, exceptions, and field definitions in a table beside or below the graph.

### 3. Choose the layout

- Prefer vertical flow for long frontline processes.
- Use horizontal flow only for short stage-based processes.
- Use Mermaid or another auto-layout graph format before custom SVG.
- Keep Chinese edge labels short; place long conditions inside nodes or rule tables.

### 4. Make handoffs visible

Show owner changes, required records, system updates, response time, and terminal states. Do not leave “跟进” without a destination or completion rule.

## Deliver

Provide:

1. assumptions and unresolved rules;
2. Mermaid source in a `.mmd` block or file;
3. rule and exception table;
4. owner and handoff notes;
5. validation result.

If the user needs shareable HTML, keep it self-contained when practical and preserve the `.mmd` source.

## Validate

- Render or inspect the diagram when possible.
- Check for blank output, clipped content, tiny nodes, cycles, dead ends, and label overlap.
- Trace one normal case and every branch that changes the next action.
- Confirm the diagram and rule table do not contradict each other.

Do not use absolute-position arrows for a normal SOP. Do not use this skill when the user only needs a decorative infographic.

## Compatibility and license

Works with Agent Skills-compatible tools. Mermaid rendering improves visual validation but is not required for source generation. Version 1.0.0, MIT License.

