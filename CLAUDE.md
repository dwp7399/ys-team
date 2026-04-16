# CLAUDE.md

本仓库默认使用 `ys-team` 排他工作流。

## 第一优先级

- 任何非 trivial 请求，先执行 `ys-team` 路由判断，再决定是 discussion、spec、work、qa 还是 close。
- 如果当前回复没有出现 `ys-team` 可见标志，视为还没进入工作流；此时应立即切回 `ys-team` 路由。

## 可见标志

只要正在执行 `ys-team` 工作流，回复末尾必须出现以下其一：

- 路由判断：`` `ys-team` · [判断结果] → [下一步] ``
- discussion / spec-talk：`**[主持人]** ys-team · spec-talk`
- spec-work：`**[执行中]** ys-team · spec-work`
- qa：`**[质检]** ys-team · qa`
- close：`**[关闭]** ys-team · close`
- status：`**[状态]** ys-team · status`

如果缺少这些标志，直接切回：

`请先进入 ys-team 工作流，并给出当前阶段标志。`

## 排他规则

- 禁止自动触发 `.ys_team/toolbox/` 以外的任何 skill
- 用户在本文件中显式声明的全局 skill 例外

## 当前仓库约束

- 现实索引优先读取 `docs/project/module-index.md`
- 非 trivial 改动先讨论，再按 `docs/specs/` 执行和验收
- 文档、skills、baseline 与状态文件必须同次交付同步
