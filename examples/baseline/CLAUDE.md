# CLAUDE.md

本项目启用 `ys-team` 工作流后，默认进入排他模式。

## 首先做什么

- 先判断当前请求是否已进入 `ys-team` 路由
- 按三级分流决定路径：L0 trivial（直接执行）、L1 patch（执行 + 留痕）、L2 spec（完整流程）

## 工作流可见标志

正在执行 `ys-team` 时，回复末尾必须出现以下其一：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- submit：`**[验收]** ys-team · submit`
- status：`**[状态]** ys-team · status`

如果没有这些标志，直接要求：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

## 排他规则

- 禁止自动触发 `.ys_team/toolbox/` 以外的任何 skill
- 用户在仓库自己的 `CLAUDE.md` 中显式声明的全局 skill 例外

## 现实索引

- 先读取 `docs/project/module-index.md`
- 再判断影响范围和是否需要 spec
