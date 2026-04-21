# AGENTS.md

## ys-team 工作流

本仓库使用 `ys-team` 排他工作流。任何请求必须先经过路由判断。

### 改动分流

- **L0 trivial**：单文件、无影响、用户声明 trivial → 直接执行
- **L1 patch**：≤3 文件、单模块内、意图清晰 → 执行 + `status.md` 留痕
- **L2 spec**：不满足 L0/L1 → 完整 `spec-talk -> spec-review -> spec-work -> qa -> close` 流程

不确定时走 L2。

### 禁止项（完整版见 `.ys_team/rules.md`）

1. 未路由不改文件（Hard Ban）
2. 未读现实不下结论（Hard Ban）
3. 无 spec 不执行（Hard Ban）
4. 不越 Write-Scope（Hard Ban）
5. 范围扩大必须回头（Confirmation Ban）
6. 不顺手动别人的代码（Style Ban）
7. 无证据不说完成（Hard Ban）
8. 文档不同步不收口（Hard Ban）

### 可见标志

每次经过 ys-team 路由的响应，末尾必须带状态标记，格式如下：

路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- 讨论：`**[主持人]** ys-team · spec-talk`
- 审阅：`**[审阅]** ys-team · spec-review`
- 执行：`**[执行中]** ys-team · spec-work`
- 质检：`**[质检]** ys-team · qa`
- 关闭：`**[关闭]** ys-team · close`
- 状态：`**[状态]** ys-team · status`

如果当前回复末尾没有出现 `ys-team` 可见标志，视为不在 ys-team 工作流中，必须立即切回路由。

缺少这些标志时，直接要求：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

### 现实索引

先读 `.ys_team/reality.md`，再判断影响范围。

### baseline 约定

- `status.md` 是当前快照，不是历史总账；「最新判断」只保留最近 10 条。
- 外部角色池来源定义在 `.ys_team/role-pool.yaml`；项目实际启用的槽位和绑定定义在 `.ys_team/config.yaml`。
