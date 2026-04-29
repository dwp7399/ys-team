---
name: ys-team-spec-work
description: "Silent internal execution capability for approved ys-team specs. Execute against spec contract, keep docs and evidence aligned."
---

# ys-team-spec-work

内部委托 skill。按已审阅通过的 spec 执行实现。

## Read Order

1. `.ys_team/config.yaml`（模式、角色）
2. 当前 spec 的 `spec.md`（执行合约）
3. 当前 spec 的 `work.md`（如存在，接续上下文）
4. 当前 spec 的 `qa-report.md`（如存在，QA 打回后的重试）
5. 执行角色的记忆文件（`.ys_team/memory/<role>.md`）
6. `.ys_team/rules.md`

## Rules

- 不对模糊讨论执行，必须有 spec
- 严格遵守 Write-Scope（禁止项 #4）
- 实现、文档、证据同步交付
- 遇到 scope 外修改需求 → 停止，回到讨论（禁止项 #5）
- 高风险行为改动默认小步推进：一个行为、一个测试或等价验证、一个实现闭环
- 不以"简单"、"之后补测试"、"文档不用同步"作为跳过验证或降级理由

## Execution

1. 读取 spec.md 的 Write-Scope 和 AC
2. 按 Deliverables 逐项执行
3. 执行过程中更新 `work.md`（关键决策、阻塞、进度）
4. 收集 evidence（测试、构建、静态检查、人工验证、截图、日志或命令输出）
5. 同步更新 Write-Scope 中的文档类文件

## 角色记忆回顾

执行完成后：
1. 读取自己的记忆文件
2. 判断是否有跨任务经验
3. 如有，写入（超限则压缩后写回）
4. 如有写入，输出：`> **[记忆更新]** <角色名>：<一句话>`

## Status 写入

在以下节点更新 `.ys_team/status.md`：

- **执行开始**：阶段 → spec-work，状态 → 执行中
- **执行完成**：状态 → 待验收，待办追加 qa 建议
- **遇到阻塞**：状态 → 已阻塞，阻塞项追加原因

## Visible Marker

```
---
**[执行中]** ys-team · spec-work

[1-2 句当前执行内容]

- 关联 Spec：[spec id]
- 状态：[执行中 / 待验收 / 已阻塞]
- 下一步：[一个明确动作]
---
```
