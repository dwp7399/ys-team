# CLAUDE.md

本项目使用 `ys-team` 工作流。任何请求先做路由判断，再按 `L0 / L1 / L2` 分流。

## 可见标志

每次经过 ys-team 路由的响应，末尾必须带状态标记，格式如下：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- 讨论：`**[主持人]** ys-team · spec-talk`
- 审阅：`**[审阅]** ys-team · spec-review`
- 执行：`**[执行中]** ys-team · spec-work`
- 质检：`**[质检]** ys-team · qa`
- 关闭：`**[关闭]** ys-team · close`
- 状态：`**[状态]** ys-team · status`

如果当前回复末尾没有出现 `ys-team` 可见标志，视为不在 ys-team 工作流中，必须立即切回路由。

## 现实索引

先读 `.ys_team/reality.md`，再判断影响范围。
