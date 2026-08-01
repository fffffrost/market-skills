import "server-only";

import type { SkillPhase } from "@/lib/skill-schema";
import type { Locale } from "@/lib/site-content";

export type CaseStudy = {
  slug: string;
  order: number;
  title: string;
  english_name: string;
  summary: string;
  phase: SkillPhase;
  phase_label: string;
  skill_slug: string;
  published_at: string;
  role: string;
  work_type: string;
  task: string;
  decision: string;
  context: Array<{ label: string; value: string }>;
  inputs: string[];
  prompt: string;
  steps: Array<{ title: string; body: string; checkpoint: string }>;
  artifacts: Array<{ label: string; title: string; body: string }>;
  deliverables: string[];
  human_checks: string[];
  good_fit: string[];
  poor_fit: string[];
  takeaway: string;
  keywords: string[];
};

const casesZh: CaseStudy[] = [
  {
    slug: "map-competitors-before-comparing",
    order: 1,
    title: "先划清竞品边界，再做对比",
    english_name: "Map the field before comparing",
    summary:
      "一个虚构的 B2B AI 产品团队准备季度定位评审。案例展示如何从候选发现开始，区分直接竞品、平台原生能力与相邻替代方案。",
    phase: "insight",
    phase_label: "洞察",
    skill_slug: "research-competitors",
    published_at: "2026-07-23",
    role: "产品市场经理",
    work_type: "定位评审前研究",
    task:
      "为一款面向中型连锁企业的 AI 营销工作台建立竞品地图，回答销售话术与下一季度产品路线到底该对标谁。",
    decision:
      "哪些对象值得进入核心竞品清单，哪些只需要作为需求替代或生态风险持续观察？",
    context: [
      { label: "已有材料", value: "产品简介、目标客户假设、4 个已知候选对象" },
      { label: "研究范围", value: "中国市场、公开可验证信息、近 12 个月" },
      { label: "交付用途", value: "季度定位评审与销售对比口径" },
      { label: "关键限制", value: "不能因为功能相似就直接判定为竞品" },
    ],
    inputs: [
      "一句话产品定义与当前交付方式",
      "目标客户、主要买方和典型使用任务",
      "本次研究需要支持的两个决策",
      "团队已经关注的候选产品清单",
    ],
    prompt:
      "调研面向中国中型连锁企业的 AI 营销工作台竞品。先广泛发现候选对象，再按目标客户、核心任务、购买入口和交付方式分层。最终给出核心对标清单、证据台账与对定位评审的建议；不要把功能相似直接当成竞争关系。",
    steps: [
      {
        title: "先把“研究竞品”改写成决策问题",
        body:
          "团队最初只说“看看市场上还有谁”。Skill 先要求明确用途：一份清单要服务销售对比，另一份观察列表要服务产品路线。两类对象的进入门槛不能相同。",
        checkpoint: "如果删除某个候选对象，不会改变任何决策，它就不该进入核心清单。",
      },
      {
        title: "广泛发现，再用统一门槛分层",
        body:
          "合成演示中先得到 18 个候选对象，再依次检查目标客户、核心任务、购买入口和交付形态。结果被拆成直接竞品 4 个、平台原生能力 6 个、相邻替代方案 5 个和参考对象 3 个。",
        checkpoint: "分层数字仅用于展示方法，不代表真实市场结论。",
      },
      {
        title: "只在同一层里进行锚定式比较",
        body:
          "核心竞品按“买方—触发任务—价值承诺—证据—交付方式”比较。缺少公开证据的项目保留为未知，不用推测补齐，也不把官网功能数量当成产品价值。",
        checkpoint: "每个比较结论必须能回到公开页面、产品文档或明确的未知项。",
      },
      {
        title: "把研究结果翻译成不同团队能执行的动作",
        body:
          "销售只携带 4 个核心对标对象；产品团队按月观察平台原生能力；品牌团队不再使用覆盖面过大的品类表述。一个竞品表由此变成三条不同的行动线。",
        checkpoint: "建议必须指向负责人、使用场景和下一次复核时间。",
      },
    ],
    artifacts: [
      {
        label: "CORE / 04",
        title: "直接竞品",
        body: "同一类买方、解决同一核心任务，并以可独立采购或签约的方式进入客户预算。",
      },
      {
        label: "PLATFORM / 06",
        title: "平台原生能力",
        body: "会吸收部分需求，但通常绑定既有平台采购，不与独立产品进行完全相同的售前竞争。",
      },
      {
        label: "ADJACENT / 05",
        title: "相邻替代方案",
        body: "客户能用它完成一部分任务，但使用路径、负责人或交付结果明显不同。",
      },
      {
        label: "WATCH / 03",
        title: "参考对象",
        body: "适合观察产品表达或交互方式，不进入市场份额和销售输赢的核心判断。",
      },
    ],
    deliverables: [
      "四层竞品地图与纳入理由",
      "核心竞品锚定式对比表",
      "逐条可回查的证据台账",
      "面向销售、产品和品牌的分角色建议",
    ],
    human_checks: [
      "目标客户和主要买方是否已经由团队确认",
      "公开证据是否仍然有效，是否需要二次核验",
      "分类门槛是否符合当前商业模式，而非通用模板",
    ],
    good_fit: [
      "进入新市场或准备定位评审",
      "已知竞品清单混入大量相邻产品",
      "需要把研究结论交给销售或产品团队使用",
    ],
    poor_fit: [
      "只想快速抄录一份功能或价格表",
      "缺少联网能力却要求最新市场事实",
      "尚未说清产品服务谁、解决什么任务",
    ],
    takeaway:
      "竞品研究最先要解决的不是“比什么”，而是“谁有资格被放在一起比”。边界稳定后，比较才可能支持决策。",
    keywords: ["竞品研究案例", "竞品分层", "竞争格局", "AI 营销工具"],
  },
  {
    slug: "edit-a-wechat-draft-for-publishing",
    order: 2,
    title: "把一篇“信息都对”的长文改到可发布",
    english_name: "Turn a correct draft into a publishable story",
    summary:
      "一篇虚构的 B2B 功能发布稿事实基本完整，但开头绕、结构重复、结论过满。案例展示如何保留事实与作者声音，同时重建阅读路径。",
    phase: "content",
    phase_label: "内容",
    skill_slug: "wechat-article-editor",
    published_at: "2026-07-23",
    role: "产品内容编辑",
    work_type: "公众号发布前审稿",
    task:
      "将一篇约 2600 字的企业协作产品功能稿改成可发布版本，同时交付标题、摘要、修改说明和待确认事实。",
    decision:
      "哪些内容需要重写，哪些只该调整顺序，哪些事实必须停下来请产品团队确认？",
    context: [
      { label: "稿件状态", value: "事实基本齐全，但 7 个段落中有 3 组重复表达" },
      { label: "目标读者", value: "企业 IT 管理员与部门负责人" },
      { label: "账号语气", value: "稳健、克制、避免夸大效率收益" },
      { label: "发布要求", value: "正文、3 个标题、摘要、编辑说明同时交付" },
    ],
    inputs: [
      "原始文章草稿与产品事实资料",
      "目标读者和期望阅读后动作",
      "账号常用语气与禁用表达",
      "可以确认事实的产品负责人",
    ],
    prompt:
      "以深度编辑模式审校这篇公众号长文。重点解决开头绕、结构重复和结论过满的问题，保留作者原有的克制语气。所有产品事实必须可追溯；不确定的数字和效果请标记待确认。最后按发布顺序交付正文、标题、摘要、修改说明和待确认事项。",
    steps: [
      {
        title: "先选择编辑模式，不默认全文重写",
        body:
          "这篇稿件的事实底座可用，因此选择“深度编辑”而不是从零代写。这样可以保留作者的判断与业务语境，把精力放在阅读路径和证据表达上。",
        checkpoint: "如果原稿的核心观点仍然成立，就不为了显得焕然一新而更换观点。",
      },
      {
        title: "按阅读路径、证据、语言和发布要素分层诊断",
        body:
          "开头用较长行业背景铺垫，真正的问题到第四段才出现；中段三次重复“权限难管理”；结尾把尚未验证的效率提升写成确定收益。问题被分别归入结构、重复和事实边界。",
        checkpoint: "每个修改都必须说明是在修复什么，而不是只给出“更顺”的主观评价。",
      },
      {
        title: "把 7 段重组为 4 个连续问题",
        body:
          "新结构依次回答：管理员为什么看不清权限、现有处理方式哪里会断、功能如何改变检查路径、上线前需要确认什么。重复说明被合并，功能列表被改写为任务过程。",
        checkpoint: "结构数字为合成演示，用来说明压缩和重组方法。",
      },
      {
        title: "逐句区分事实、判断与待确认项",
        body:
          "可由产品文档支持的功能说明继续保留；“节省 80% 时间”因缺少口径被移入待确认清单；“彻底避免权限风险”改为描述具体可见性，不承诺无法证明的结果。",
        checkpoint: "Agent 可以标记风险，但产品事实和最终发布口径仍由人确认。",
      },
      {
        title: "按编辑团队的发布顺序交付",
        body:
          "最终包先给可粘贴正文，再给标题和摘要，随后说明关键修改，最后单列 4 个待确认事实。编辑不需要在多个版本之间寻找最终稿。",
        checkpoint: "发布前最后一次校对应在排版完成后进行，不能由文本修改替代。",
      },
    ],
    artifacts: [
      {
        label: "BEFORE / 开头",
        title: "从宏观趋势开始",
        body:
          "“随着数字化转型不断深入，企业协作方式正在发生深刻变化……”读者要经过多层背景，才能看到文章真正处理的权限问题。",
      },
      {
        label: "AFTER / 开头",
        title: "从读者正在处理的问题开始",
        body:
          "“管理员最难处理的，不是权限数量多，而是不知道某项权限为什么还在。”第一屏直接建立问题、角色和继续阅读的理由。",
      },
      {
        label: "STRUCTURE / 07→04",
        title: "把功能介绍改成任务路径",
        body:
          "问题出现 → 旧方式断点 → 新检查路径 → 上线前确认。删除重复结论，但保留支撑判断所需的事实。",
      },
      {
        label: "FACT QUEUE / 04",
        title: "把不确定项留给负责人",
        body:
          "处理时长、适用版本、权限范围和上线日期被集中标记，不让编辑自行猜测，也不把问题藏在正文批注里。",
      },
    ],
    deliverables: [
      "一版可继续排版的修订正文",
      "3 个不同信息重心的标题",
      "公众号摘要与转发预览文本",
      "关键修改说明和待确认事实清单",
    ],
    human_checks: [
      "产品效果数字与功能边界是否有正式口径",
      "重写后的开头是否仍然符合账号声音",
      "排版、配图和链接完成后的最终发布校对",
    ],
    good_fit: [
      "原稿有材料，但阅读路径或语言节奏不稳",
      "需要在保留作者声音的前提下深度编辑",
      "发布前需要同时整理标题、摘要和事实风险",
    ],
    poor_fit: [
      "没有任何事实材料却要求补写产品能力",
      "只需要纠正错别字和标点",
      "希望用强情绪表达替代证据和具体信息",
    ],
    takeaway:
      "编辑不是把每句话改得更像编辑，而是让读者更早看见问题、让证据待在正确的位置，并让未知项停在发布线之前。",
    keywords: ["公众号审稿案例", "长文编辑", "B2B 内容", "发布前校对"],
  },
  {
    slug: "turn-campaign-data-into-next-actions",
    order: 3,
    title: "不急着归因，先把 Campaign 复盘成下一步",
    english_name: "Turn campaign data into the next decision",
    summary:
      "一次虚构的行业报告 Campaign 下载量超过目标，但合格线索与跟进时效未达预期。案例展示如何统一证据、限制归因，并把发现转成负责人明确的动作。",
    phase: "review",
    phase_label: "复盘",
    skill_slug: "campaign-retrospective",
    published_at: "2026-07-23",
    role: "整合营销负责人",
    work_type: "季度 Campaign 复盘",
    task:
      "复盘一次行业报告发布 Campaign，解释为什么下载量达标但合格线索不足，并为下一轮活动生成行动清单。",
    decision:
      "下一轮应该增加流量、调整转化路径，还是先修复线索定义与销售跟进？",
    context: [
      { label: "原始目标", value: "900 次下载、320 条合格线索、90% 在 48 小时内跟进" },
      { label: "可用材料", value: "Brief、网站数据、表单导出、CRM 状态与团队记录" },
      { label: "数据缺口", value: "32% 的线索缺少完整来源标记" },
      { label: "复盘要求", value: "事实、推断和待验证假设必须分开" },
    ],
    inputs: [
      "Campaign 原始目标和指标定义",
      "渠道、落地页、表单和 CRM 原始数据",
      "实际发布时间线与变更记录",
      "市场、销售和内容团队的执行反馈",
    ],
    prompt:
      "基于 Campaign Brief、渠道数据、表单导出、CRM 状态和团队记录完成复盘。先还原原始目标和指标口径，再从结果、漏斗、执行和解释四层分析。请把事实、推断和待验证假设分开；不要在来源标记不完整时做单渠道归因。最后给出带负责人和验证方式的下一轮行动清单。",
    steps: [
      {
        title: "还原最初约定，而不是用结果倒写目标",
        body:
          "复盘先锁定三个原始目标及定义：下载、合格线索、48 小时跟进。临时新增的浏览量和社媒互动可以作为诊断信号，但不能在结果出来后升级成主要成功指标。",
        checkpoint: "指标必须保留当时的定义、数据源和负责人。",
      },
      {
        title: "建立一张统一证据表",
        body:
          "网站记录 6240 次访问和 1086 次下载；CRM 中确认 278 条合格线索；在规定时间内完成跟进的比例为 61%。下载超出目标，但后两项没有达标。",
        checkpoint: "所有数字均为合成数据，只用于展示复盘结构。",
      },
      {
        title: "从结果、漏斗、执行和解释四层分析",
        body:
          "结果层确认下载达标；漏斗层发现下载到合格线索的落差；执行层发现跟进时效不足；解释层只提出两条假设：表单门槛偏低，以及内容团队与销售的交接批次过晚。",
        checkpoint: "有相关性但缺少验证的数据，必须停留在假设层。",
      },
      {
        title: "主动限制无法支持的渠道归因",
        body:
          "由于 32% 的线索缺少完整来源标记，本次不能宣称某个渠道贡献最高，也不能用最后点击覆盖内容触达。结论被改写为“当前归因数据不足，下一轮先修复标记”。",
        checkpoint: "未知不是复盘失败；把未知伪装成结论才是。",
      },
      {
        title: "让每条建议都能进入下一轮排期",
        body:
          "行动项被压缩为三条：增长负责人统一 UTM 与来源字段；内容负责人增加二阶段下载确认；销售运营把线索交接改为每日两批。每条都附带负责人、截止时间和验证指标。",
        checkpoint: "没有负责人和验证方式的建议，不进入最终行动清单。",
      },
    ],
    artifacts: [
      {
        label: "DOWNLOAD / 121%",
        title: "1086 / 900",
        body: "下载量超过原始目标。这是明确事实，但不能单独代表 Campaign 对业务有效。",
      },
      {
        label: "QUALIFIED / 87%",
        title: "278 / 320",
        body: "合格线索没有达标。需要继续检查表单门槛、目标人群和线索判定口径。",
      },
      {
        label: "FOLLOW-UP / 61%",
        title: "低于 90% 目标",
        body: "线索交接和销售处理节奏出现执行断点，削弱了前端获客成果的后续价值。",
      },
      {
        label: "ATTRIBUTION / LIMITED",
        title: "32% 来源不完整",
        body: "本轮不做单渠道胜负判断；下一轮先修复 UTM、表单字段和 CRM 来源映射。",
      },
    ],
    deliverables: [
      "原始目标与实际结果记分卡",
      "结果、漏斗、执行和解释四层发现",
      "明确写出的归因边界与未知项",
      "带负责人、截止时间和验证指标的行动清单",
    ],
    human_checks: [
      "市场与销售是否采用相同的合格线索定义",
      "跨渠道重复线索是否已经去重",
      "行动负责人是否接受截止时间和验证口径",
    ],
    good_fit: [
      "活动数据来自多个系统、口径容易打架",
      "团队容易把相关性写成确定归因",
      "需要把复盘会议转成下一轮执行动作",
    ],
    poor_fit: [
      "只有总结感受，没有目标和任何原始记录",
      "要求 Agent 替业务负责人确认归因结论",
      "只想制作一份突出成绩的对外战报",
    ],
    takeaway:
      "复盘的价值不是给过去找一个漂亮解释，而是识别哪一段证据足够、哪一段仍然未知，以及下一轮先改变什么。",
    keywords: ["Campaign 复盘案例", "营销复盘", "归因边界", "行动清单"],
  },
];

const casesEn: CaseStudy[] = [
  {
    slug: "map-competitors-before-comparing",
    order: 1,
    title: "Map the China market before comparing competitors",
    english_name: "Map the China market before comparing competitors",
    summary:
      "A synthetic B2B AI team tests China market entry. The case shows how local products, platform-native capabilities, agencies, and workflow substitutes become separate evidence pools.",
    phase: "insight",
    phase_label: "Insight",
    skill_slug: "research-competitors",
    published_at: "2026-08-01",
    role: "Global product marketing lead",
    work_type: "China market-entry research",
    task:
      "Build a China competitor landscape for an AI marketing workspace before choosing a local category, partner model, and sales narrative.",
    decision:
      "Which local options can replace the product, which platforms can absorb its core job, and which companies are only useful references?",
    context: [
      { label: "Available material", value: "Global product brief, assumed China ICP, and four familiar global competitors" },
      { label: "Market scope", value: "Mainland China, public evidence, and a twelve-month time boundary" },
      { label: "Business use", value: "Entry thesis, local positioning, and partner conversations" },
      { label: "Key constraint", value: "A translated feature list is not evidence of local competition" },
    ],
    inputs: [
      "One-sentence product definition and delivery model",
      "Proposed China buyer, user, and core job",
      "The entry or positioning decisions the research must support",
      "Known local and global candidates, including agencies or platforms",
    ],
    prompt:
      "Map the mainland China competitor landscape for this B2B AI marketing workspace. Discover Chinese products, platform-native capabilities, agencies, and substitutes before comparing. Use dated evidence, keep unknowns visible, and finish with implications for entry and positioning.",
    steps: [
      {
        title: "Turn a broad scan into an entry decision",
        body:
          "The team began with a list of familiar global names. The skill first defined the China buyer, core workflow, procurement path, and three decisions the landscape needed to change.",
        checkpoint: "If removing a candidate would not change an entry decision, it does not belong in the priority set.",
      },
      {
        title: "Discover through local routes",
        body:
          "Chinese-language queries, platform ecosystems, local directories, agency offers, and workflow alternatives produced a wider candidate pool than English searches alone.",
        checkpoint: "Discovery sources surface candidates; official pages and dated first-party evidence support conclusions.",
      },
      {
        title: "Classify before comparing",
        body:
          "Candidates were separated into structural direct competitors, platform-native capabilities, segment specialists, agencies, substitutes, references, and a watchlist.",
        checkpoint: "Feature overlap alone never qualifies an object as a direct competitor.",
      },
      {
        title: "Translate evidence into market choices",
        body:
          "The final view changed the proposed category language, identified two proof gaps for enterprise buyers, and moved platform bundling into the entry-risk register.",
        checkpoint: "Each recommendation names the evidence, confidence, owner, and next validation action.",
      },
    ],
    artifacts: [
      { label: "DIRECT", title: "Structural competitors", body: "Overlap in buyer, core job, procurement path, and plausible replacement decision." },
      { label: "PLATFORM", title: "Platform-native capabilities", body: "Narrower tools with first-party data, distribution, account, or bundling advantages." },
      { label: "SERVICE", title: "Agencies and managed services", body: "Alternative operating models that buyers may choose instead of internal tooling." },
      { label: "UNKNOWN", title: "Evidence gaps", body: "Availability, pricing, adoption, or product claims that remain unverified in mainland China." },
    ],
    deliverables: [
      "Layered China competitor landscape",
      "Anchored comparison of priority candidates",
      "Dated evidence ledger with confidence and unknowns",
      "Entry, positioning, product, and partner implications",
    ],
    human_checks: [
      "Confirm the proposed China buyer and procurement reality",
      "Verify time-sensitive availability, pricing, and regulatory claims",
      "Decide whether local interviews or hands-on product access are required",
    ],
    good_fit: ["China market-entry planning", "Local positioning review", "A competitor list dominated by global names"],
    poor_fit: ["Copying a feature table", "Live facts without web access", "A product with no defined China buyer or job"],
    takeaway:
      "The moat is not knowing more brand names. It is classifying the local market in a way that changes an entry decision and keeps every important claim reviewable.",
    keywords: ["China competitor analysis", "China market entry", "local competitors", "China marketing tools"],
  },
  {
    slug: "edit-a-wechat-draft-for-publishing",
    order: 2,
    title: "Turn a translated launch draft into a credible WeChat article",
    english_name: "Turn a translated launch draft into a credible WeChat article",
    summary:
      "A synthetic global B2B launch draft is factually sound but reads like translated headquarters copy. The case rebuilds the Chinese reading path while preserving approved claims.",
    phase: "content",
    phase_label: "Content",
    skill_slug: "wechat-article-editor",
    published_at: "2026-08-01",
    role: "China content editor",
    work_type: "WeChat launch localization",
    task:
      "Edit a 2,600-character Chinese product launch draft into a publishable WeChat Official Account article with titles, abstract, edit notes, and an approval queue.",
    decision:
      "Which global narrative elements still work in Chinese, what must be rebuilt for the local reader, and which claims need local approval?",
    context: [
      { label: "Draft state", value: "Accurate product facts but translated structure, repeated value claims, and a distant opening" },
      { label: "Target reader", value: "Enterprise IT and marketing operations leaders in China" },
      { label: "Account voice", value: "Calm, practical, and specific; no inflated efficiency claims" },
      { label: "Required package", value: "Body copy, three titles, abstract, edit notes, and unresolved facts" },
    ],
    inputs: [
      "Chinese draft and approved global source",
      "China reader, account identity, and intended action",
      "Approved Chinese terminology and prohibited claims",
      "A product owner who can confirm local availability and proof",
    ],
    prompt:
      "Edit this WeChat launch article in structural mode. Preserve approved facts and the author voice, rebuild the reading path for Chinese enterprise buyers, and flag local availability, product naming, and performance claims that still need approval.",
    steps: [
      {
        title: "Agree on an editing mode",
        body:
          "Because the source facts were usable, the editor chose a structural edit rather than a new article. This protected approved content while allowing the narrative to change.",
        checkpoint: "A fresh surface is not a reason to replace a sound product argument.",
      },
      {
        title: "Separate global facts from local assumptions",
        body:
          "Product capabilities remained approved facts. Mainland availability, Chinese product terminology, customer proof, and performance language moved into a separate confirmation queue.",
        checkpoint: "Global approval does not automatically make a claim locally usable.",
      },
      {
        title: "Rebuild the reading path",
        body:
          "The new structure moved from the reader's operating problem to the broken workflow, the product mechanism, credible proof, and a bounded next step.",
        checkpoint: "Every section must earn the reader's move into the next one.",
      },
      {
        title: "Deliver the publication package",
        body:
          "The editor returned paste-ready body copy first, then titles, abstract, change notes, and a compact list of claims requiring product or legal review.",
        checkpoint: "Final platform preview, links, images, and account publishing remain human checks.",
      },
    ],
    artifacts: [
      { label: "BEFORE", title: "A global trend opening", body: "The draft spent its first screen explaining a category trend before naming the reader's actual problem." },
      { label: "AFTER", title: "A local operating problem", body: "The revised opening gives a concrete role, broken workflow, and reason to continue reading." },
      { label: "STRUCTURE", title: "From feature order to reader order", body: "Problem, old workaround, product mechanism, proof boundary, and next step replace the source deck sequence." },
      { label: "APPROVAL", title: "Claims stay visible", body: "Local availability, naming, proof, and performance statements remain outside publishable copy until confirmed." },
    ],
    deliverables: ["Publishable revised body", "Three distinct title routes and an abstract", "Change log by structure evidence and language", "Local approval queue"],
    human_checks: ["Confirm local availability and product naming", "Review regulated or performance claims", "Complete the final WeChat preview and link check"],
    good_fit: ["Translated global draft", "Sound facts but weak Chinese reading path", "Publication package needed"],
    poor_fit: ["No factual source", "Account operation or distribution request", "A request to manufacture clickbait"],
    takeaway:
      "Good localization changes the reader journey before it changes individual sentences, while making every unresolved local claim easier to review.",
    keywords: ["WeChat article editing", "Chinese content localization", "China B2B messaging", "WeChat marketing"],
  },
  {
    slug: "turn-campaign-data-into-next-actions",
    order: 3,
    title: "Reconcile China campaign data before assigning credit",
    english_name: "Reconcile China campaign data before assigning credit",
    summary:
      "A synthetic China report campaign exceeds download targets but misses qualified-lead and follow-up goals. The case reconciles platform, CRM, agency, and execution evidence.",
    phase: "review",
    phase_label: "Review",
    skill_slug: "campaign-retrospective",
    published_at: "2026-08-01",
    role: "China integrated marketing lead",
    work_type: "Cross-platform campaign retrospective",
    task:
      "Review a China industry-report campaign and decide whether the next cycle needs more traffic, a different conversion path, or repaired lead definitions and follow-up.",
    decision:
      "Which result is proven, where does the funnel break, what cannot be attributed, and what should the local team change first?",
    context: [
      { label: "Original goal", value: "900 downloads, 320 qualified leads, and 90% follow-up within 48 hours" },
      { label: "Evidence", value: "WeChat, REDnote, Baidu, landing page, CRM, event, agency, and sales records" },
      { label: "Data gap", value: "32% of leads lack a complete normalized source" },
      { label: "Review rule", value: "Facts, interpretations, hypotheses, and unknowns must stay separate" },
    ],
    inputs: ["Original China campaign brief", "Platform and first-party exports", "CRM definitions and lead states", "Execution timeline and agency or team notes"],
    prompt:
      "Review this China campaign across platform, landing-page, CRM, event, agency, and sales evidence. Normalize definitions first, state attribution limits, and return no more than five owned actions with measurement points.",
    steps: [
      {
        title: "Restore the original contract",
        body:
          "The review locked the original download, qualified-lead, and follow-up definitions instead of promoting new engagement metrics after results were known.",
        checkpoint: "A retrospective cannot rewrite success criteria to rescue the outcome.",
      },
      {
        title: "Normalize the evidence",
        body:
          "Platform exposure, first-party visits, downloads, deduplicated leads, qualification, and sales follow-up were kept as different metric families with named owners.",
        checkpoint: "Metrics with different definitions or time windows cannot be compared directly.",
      },
      {
        title: "Limit cross-platform attribution",
        body:
          "Because source fields were incomplete and several platforms were walled gardens, the review did not declare a winning channel. It identified tracking repair as a prerequisite for the next decision.",
        checkpoint: "Unknown attribution is a finding, not a license to invent a story.",
      },
      {
        title: "Create owned next actions",
        body:
          "The final actions covered source normalization, form qualification, lead handoff cadence, and one controlled message test, each with an owner and measurement point.",
        checkpoint: "A recommendation without an owner and verification method does not enter the action plan.",
      },
    ],
    artifacts: [
      { label: "DOWNLOAD", title: "Top-line target exceeded", body: "Downloads are a clear result but cannot stand in for qualified demand or revenue impact." },
      { label: "QUALIFIED", title: "Lead target missed", body: "The gap points to audience, form, qualification, or data-definition questions that need separate checks." },
      { label: "HANDOFF", title: "Follow-up lagged", body: "The local market and sales handoff weakened the value of front-end acquisition." },
      { label: "ATTRIBUTION", title: "Channel credit is limited", body: "Incomplete source mapping and platform boundaries prevent a defensible single-channel winner." },
    ],
    deliverables: ["Original-goal scorecard", "Normalized cross-platform evidence table", "Attribution limits and evidence-backed findings", "Owned next-action plan"],
    human_checks: ["Align the qualified-lead definition with sales", "Confirm deduplication and agency transformations", "Secure owner agreement on deadlines and measurement"],
    good_fit: ["Cross-platform China campaign", "Agency and first-party reports disagree", "The team needs next actions rather than a victory deck"],
    poor_fit: ["No original goals or raw records", "A request for unsupported causal attribution", "An external performance press release"],
    takeaway:
      "The retrospective creates value by showing which evidence is comparable, which attribution is impossible, and which operating change should happen before buying more traffic.",
    keywords: ["China campaign analysis", "China marketing attribution", "campaign retrospective", "China demand generation"],
  },
];

export function getCases(locale: Locale = "zh") {
  return locale === "en" ? casesEn : casesZh;
}

export function getCase(slug: string, locale: Locale = "zh") {
  return getCases(locale).find((caseStudy) => caseStudy.slug === slug);
}

export function getCasesForSkill(skillSlug: string, locale: Locale = "zh") {
  return getCases(locale).filter((caseStudy) => caseStudy.skill_slug === skillSlug);
}
