---
Spec-Type: control
Initiative: <YYYYMMDD-name>
Status: draft
Owner-Session: —
Write-Scope:
  - # 允许修改的文件/目录
Delete-Scope:
  - # 允许删除的文件/目录（可选）
Depends-On: []
Verification: "见 ## 验收"
---

# <标题>

## 意图

一句话说明要解决什么问题，以及为什么现在要做。

## 非目标

- 本次明确不做什么。

## Write-Scope

- `<path>`：为什么允许修改。

## 验收

### 保真度等级

L3 / L2 / L1 / L0：说明选择理由。

> UI/交互类改动低于 L2 默认不通过。L0/L1 必须说明为什么不能更高，以及剩余人工风险。

### 人等价验收脚本

- 命令或步骤：`<command or steps>`
- 输入：`<realistic input>`
- 期望：`<observable assertion>`
- 复现成本：`<time>`

如无法达到 L3/L2，写明降级理由和人工抽检项。

### Feedback Loop

本 spec 改对了的最快 pass/fail 信号是什么？目标复现成本 < 30 秒。

- 命令或步骤：`<command or steps>`
- 期望信号：`<exit code / output / assertion>`
- 复现成本：`<time>`

## 交付清单

- [ ] 文档同步
- [ ] 项目本地 SOP gate（不适用写 N/A）
- [ ] 发布或部署 gate（不适用写 N/A）

## 依赖 / 风险

- 依赖：
- 风险：
- 回滚：
