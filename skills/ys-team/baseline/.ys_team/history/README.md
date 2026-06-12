# 月度摘要

`status.md` 只保留当前快照和最近 10 条判断。跨月的轻量统计留在 `.ys_team/history/YYYY-MM.md`。

## 字段约定

- `month`：月份，格式 `YYYY-MM`
- `new_specs`：当月新建 spec 数
- `closed_specs`：当月 close 完成数
- `cancelled_specs`：当月取消数
- `spec_review_rejects`：当月 spec-review REJECT 次数
- `qa_rejects`：当月 QA REJECT 次数
- `rebuilds`：当月 rebuild 次数
- `top_blockers`：主要阻塞及简述

## 边界

- 这是轻量治理摘要，不记录流水账。
- 具体背景、决策和证据仍以 `docs/specs/` 中的 spec 制品为准。
