# Evidence — Reroute Case 走查

## 走查口径

按 spec.md AC-05：每个 skill 的调用语义不变，原有路由 / 讨论 / 执行流程不变。

走查方式：用 spec.md 中给出的典型用户话术，对照重构后的 SKILL.md description 与 `<what-to-do>` 块，判断"用户输入 → 期望路由 → 实际路由"是否一致；并抽查"被路由后立即应执行的指令"是否与原有正文（`<supporting-info>` 内）一致。

## 走查表

| # | 用户输入 | 期望路由 | 实际匹配证据 | 调用语义是否变化 | 结果 |
|---|---------|---------|-------------|------------------|------|
| 1 | "ys-team 状态" | `ys-team` skill 的状态查询分支 | ys-team description 含「ys-team 状态」；`<what-to-do>` 步骤 2 显式写"按下方「状态查询」流程读 status.md" | 否（原 ## 状态查询章节内容逐字保留在 supporting-info） | PASS |
| 2 | "起一个 spec" | `ys-team-spec-talk` skill | ys-team-spec-talk description 含「起一个 spec」；`<what-to-do>` 步骤 1-7 等价于原 Read Order + Standard Flow + Status 写入 + Host Summary 链路 | 否（原 ## Read Order / Standard Flow / Spec 产出要求 / Status 写入 / Host Summary 全部保留） | PASS |
| 3 | "按 spec 执行" | `ys-team-spec-work` skill | ys-team-spec-work description 含「按 spec 执行」；`<what-to-do>` 步骤 2 强制校验"位于 release/work 分支"，与原 Rules 第 2 条一致 | 否（原 ## Rules / Execution / Status 写入 / Visible Marker 全部保留） | PASS |
| 4 | "rebuild baseline" | `ys-team-init` skill 的 rebuild 分支 | ys-team-init description 含「rebuild baseline」；`<what-to-do>` 步骤 3 显式分流到 Rebuild 模式 | 否（原 ## Rebuild 模式整段保留，含旧结构检测、版本检查、重估规则、记忆健康检查） | PASS |

## 抽查：what-to-do 与原文一致性

| skill | what-to-do 引用的原文锚点 | 锚点在 supporting-info 内是否仍存在 |
|-------|--------------------------|----------------------------------|
| ys-team | Routing / 状态查询 / 讨论能力 / Response Markers | ✓ 全部保留 |
| ys-team-init | Init 模式 / Rebuild 模式 / 现实索引生成 / Baseline Source / Success Criteria | ✓ 全部保留 |
| ys-team-spec-talk | Read Order / Intent First / Standard Flow / 收敛规则 / Spec 产出要求 / 角色记忆回顾 / Status 写入 / Host Summary | ✓ 全部保留 |
| ys-team-spec-work | Read Order / Rules / Execution / Status 写入 / Visible Marker / 角色记忆回顾 | ✓ 全部保留 |

## 结论

4 个 reroute case 全部 PASS，调用语义 0 变化。`<what-to-do>` 是原文执行链路的「目录化指针」，未引入新指令也未隐藏旧指令。
