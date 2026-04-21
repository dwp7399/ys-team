# AGENTS.md

## ys-team 工作流

本仓库使用 `ys-team` 排他工作流。任何请求先做路由判断：`L0 trivial` 直接执行，`L1 patch` 执行并留痕，其他一律走 `L2 spec`；不确定时走 `L2`。

## 禁止项（完整版见 `.ys_team/rules.md`）

1. 未路由不改文件（Hard Ban）
2. 未读现实不下结论（Hard Ban）
3. 无 spec 不执行（Hard Ban）
4. 不越 Write-Scope（Hard Ban）
5. 范围扩大必须回头（Confirmation Ban）
6. 不顺手动别人的代码（Style Ban）
7. 无证据不说完成（Hard Ban）
8. 文档不同步不收口（Hard Ban）

## 可见标志

回复末尾必须出现 `ys-team` 标志。缺少时要求切回路由。

## 现实索引

先读 `.ys_team/reality.md`，再判断影响范围。

## baseline 约定

- `status.md` 是当前快照，不是历史总账；「最新判断」只保留最近 10 条。
- 外部角色池来源定义在 `.ys_team/role-pool.yaml`；项目实际启用的槽位和绑定定义在 `.ys_team/config.yaml`。
