# HANDOFF — 20260611-loop-era-redesign

**给接手的 agent(codex):** 这份文档让你不读原始对话也能接上 ys-team v1.0 换代任务。读完这一份 + `spec.md` + `docs/roadmap/active/v1.0-loop-era-redesign.md` 就够了。

---

## 0. 你现在在哪

- **任务:** 把 ys-team 这套 AI 开发工作流从 prompt era 换代到 loop era。
- **当前阶段:** spec-review 已 PASS,spec 已迁入 `docs/specs/active/20260611-loop-era-redesign/`,当前进入 spec-work。
- **本仓工作流:** ys-team 自己用 ys-team 的 release-first 流程。阶段链:spec-talk → spec-review → spec-work → qa → close(close = npm 发布 + 合 main + tag)。
- **下一步:** 按 D1→D6 小步实现,每个原则/机制独立闭环并跑对应验证。

---

## 1. 一句话目标

**把工程重量从"约束执行过程的流程仪式",搬迁到"供给一个人类级保真、且能在 agent loop 内自跑的退出判定(verifier)";流程结构降到能托住该 verifier 的最小集。**

用户的原话诉求:"写完 spec 基本就能准确落地,验收即真实验收,质量追求人类测试的效果,尽量减少人的复查成本。"

---

## 2. 为什么换代(支撑结论的实测,别推翻)

这些是从 ai-gateway / jarvis 两个真实在用项目里挖出来的数据,不是猜的。换代的每个决定都挂在这些证据上:

1. **流程合规 ≠ 落地质量。** jarvis `todo-outline-editor`:全流程走完、marker 齐全、`cargo test + npm build` 全绿,**交付后仍出 3 个 user-reported bug**(粘贴失败、Enter/Tab 不可用、Markdown 解析失败)。根因:验收信号是单测+编译,不是"人真去粘一段真实文本看持不持久"。
2. **保真验收 → 一次通过。** jarvis `codex-agent-drawer`:验收用真实 codex exec 探针 + JSONL 事件断言(人等价),一次过。
3. **五角圆桌只有一角有用。** ai-gateway 五角(后端/供应商/文档/测试/挑战者)里,只有**挑战者**抓到真 bug(k8s multi-worker 并发缺陷、rpm-limit fail-open 语义冲突);其余四角经常一致 PASS,贡献是"补 spec 漏项"。
4. **20% spec 被 REJECT 重写**(6/30),理由几乎全是机械可检的结构问题("Write-Scope 缺、验收不清")——不需要五角讨论,一个结构 lint 就能挡。
5. **四个参考项目共识**(obra/superpowers、mattpocock/skills、garrytan/gstack、karpathy-skills):全把验证当地基、都在解决"假绿";轻框架风向明显(mattpocock 指名反 GSD/BMAD/Spec-Kit);grill 被反复验证高价值;gstack 的 `/codex` 跨模型审查破了"同模型戴帽=假独立"。

**核心洞察(loop engineering 的真义):** loop 能自我收敛,全靠退出条件(verifier)够不够保真。verifier 烂,loop 就是在快速地把错误代码迭代得更自信。**所以 loop era 真正稀缺、要工程化的是 verifier,不是 loop 本身。**

---

## 3. 已定的设计决定(七条,别重新讨论,要改先问用户)

详见 `docs/roadmap/active/v1.0-loop-era-redesign.md` 第四节。摘要:

1. **Verifier 分级(新中枢):** L3 人等价(真实输入/点击/上游调用+断言)> L2 行为测试 > L1 单测+编译(**UI/交互类禁止单独作为退出条件**)> L0 人工抽检。spec 必须声明够到哪级,够不到诚实写理由。
2. **三道闸替代排他规则:** 闸一入口(没 verifier 卡进不了 loop)、闸二出口(验收脚本不真绿不算完成)、闸三可见性(原生 todo + 结果状态)。**去掉强制 marker + 禁用其他 skill。**
3. **Spec 塌缩成一张 verifier 卡** + 结构 lint 前置(替代四角补漏项)。卡结构:意图 / 非目标 / Write-Scope / 验收(保真度等级 + 人等价脚本 + Feedback Loop)/ 交付清单 / 依赖风险。
4. **跨模型对抗审阅替代五角圆桌:** claude 写 → codex 验(或反之),真不同训练分布。trivial 跳过。
5. **`.ys_team/` 瘦身为跨会话记忆层:** 判据"跨会话且 agent 重建不出来才留"。reality.md 从结构地图砍成约束/风险地图;config 砍五角/槽位;角色记忆拍平成项目错题本(去人格壳)。
6. **CheckList 拆解:** 流程打勾 → 折叠进原生 todo;交付清单(项目本地 SOP)→ 并入 verifier 卡。确认点从每阶段压到两个(签 spec 卡 + 抽检证据)。
7. **尾缀改性质:** 留尾缀本身(用户喜欢),砍强制机制,内容从"流程口号"换成"结果状态"(如 `spec 卡已签 · loop 3/5 验收项过 · 未全绿`)。

---

## 4. 已产出的制品(你接手时已存在)

| 文件 | 内容 | 状态 |
|---|---|---|
| `docs/roadmap/active/v1.0-loop-era-redesign.md` | 轻量设计文档(9 节 + 参考项目对比附录)。**先读这个建立全局。** | 完成,用户已过目 |
| `docs/specs/queued/20260611-loop-era-redesign/spec.md` | 执行合约。D1~D6 交付物、AC-01~18、Verification | 完成 |
| `docs/specs/queued/20260611-loop-era-redesign/checklist.md` | 五阶段清单,spec-talk 段已勾 | 完成 |
| `.ys_team/status.md` | 已留痕(活跃 spec + 最新判断) | 完成 |

---

## 5. 用户确认项

已确认:

- **新老并存策略** —— 用户已确认:原地替换现有 `ys-team` skill,旧版只通过 npm `legacy` tag 保留,不做 `ys-team-v1` / `ys-team-legacy` 双 skill。
- **验收分级 L3/L2/L1/L0 的具体定义** —— 按 spec 当前定义执行。
- **"UI/交互类 < L2 默认 REJECT"门槛** —— 按 spec 当前门槛执行。
- **迁移分两步** —— 按 roadmap/spec 当前估计执行:无痛切换 1 天 + 深度瘦身 1-2 周。

---

## 6. 实现时的硬约束(spec-work 阶段必须守)

- **Write-Scope 见 spec.md frontmatter**,别越界。主要是 `AGENTS.md`、`CLAUDE.md`、`docs/methodology/`、`skills/`、`examples/baseline/`、`skills/ys-team/baseline/`、`docs/guide/`、`README.md`、`package.json`、`scripts/ys-team.mjs`、`.ys_team/status.md`、spec/evidence 生命周期目录和 roadmap 迁移目录。
- **baseline 双副本必须同次同步:** `examples/baseline/` 与 `skills/ys-team/baseline/` 内容必须全量一致,QA 会跑 `diff -r` 校验为空。改一个必须改另一个。
- **三条版本线:** npm `package.json`(升 1.0.0)、baseline `.ys_team/VERSION`、`docs/methodology/VERSION`(升 2.0.0)。语义不同,别混。
- **小步推进:** 一个原则/一个机制 = 一个实现闭环,各自带验证。别一把梭。
- **spec-review PASS 后先切 `release/<version>` 或 `work/20260611-loop-era-redesign` 分支,再动手。**
- **本 spec 自身验收保真度是 L1(文档契约),这是诚实声明,别假装更高。** 真实通过率(L3)验证在下游试点,不是本 spec 的退出条件。

---

## 7. 验证怎么跑(spec.md ## Verification 的精简版)

最快 pass/fail 信号(Feedback Loop,< 10 秒):

```bash
# 反向:排他/强制 marker 真被移除了吗(应无输出)
! grep -rn "缺失即视为未进入工作流\|立刻回到路由\|禁止自动触发\|缺少标记 → 视为未进入" \
  skills/ examples/baseline/AGENTS.md examples/baseline/CLAUDE.md skills/ys-team/baseline/

# baseline 双副本全量一致吗(应无输出)
diff -r examples/baseline/ skills/ys-team/baseline/
```

正向 + 版本检查见 spec.md。

---

## 8. 一个要避开的认知陷阱

换代是**减法为主**。诱惑是"既然要做新方法论,不如顺手加点新机制"。**别。** 用户明确要更快、更省 token、更高通过率,这些几乎全靠减(去 marker 税、去五角圆桌、塌缩四制品、去排他规则)+ 把省下的预算单点投到 verifier。任何"增加用户主动选择负担"或"增加每轮固定开销"的设计,都违背换代初衷,直接否掉。

---

## 9. 你接手后的第一个动作

1. 读 `docs/roadmap/active/v1.0-loop-era-redesign.md`(全局)+ 本 spec 的 `spec.md`(合约)。
2. 跟用户确认第 5 节的四个待定项(至少确认第 2 条门槛)。
3. 按用户选择进入 spec-review 或 spec-work。
4. 若进 spec-work,先切分支,按 D1→D6 小步实现,每步带验证,baseline 双副本同步。

---

**交接人备注:** 这份换代的所有结论都有实测或参考项目支撑(第 2 节),不是凭感觉。如果你在实现中发现某条决定与代码现实冲突,停下来报告,别自行推翻已定决策——那些是用户五轮讨论拍下来的。
