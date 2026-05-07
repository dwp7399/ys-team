---
name: ys-team-spec-work
description: "Execute an approved ys-team spec against its contract; keep docs and evidence aligned. Use when 用户说「按 spec 执行」「进入 spec-work」「把这个 spec 落地」「执行 active spec」等。"
---

# ys-team-spec-work

<what-to-do>

被调用时按以下流程立即执行：

1. 按下方「Read Order」加载 `.ys_team/config.yaml` / `spec.md` / `work.md` / `qa-report.md`（如存在）/ 角色记忆 / `rules.md`。
2. 校验前置：spec-review PASS 已完成、当前位于 `release/<version>` 或 `work/<spec-id>` 分支（参见下方「Rules」第 2 条）；未满足则停止并向用户报告。
3. 按下方「Execution」逐项落地 spec.md 的 Deliverables，严格遵守 Write-Scope（禁止项 #4）。
4. 执行过程中按下方「Status 写入」节点更新 `.ys_team/status.md`，并实时维护 `work.md`。
5. 收集 evidence（测试 / 构建 / 静态检查 / 人工验证 / 截图 / 命令输出）写入 spec 目录的 `evidence/`。
6. 完成后按「角色记忆回顾」检查是否需要写入新经验（写入即输出 `> **[记忆更新]**` 通知）。
7. 按下方「Visible Marker」格式输出响应末尾。

遇到 scope 外修改需求 → 立刻停止，回到讨论（禁止项 #5）。

</what-to-do>

<supporting-info>

内部委托 skill。按已审阅通过的 spec 执行实现。

## Read Order

1. `.ys_team/config.yaml`（模式、角色）
2. 当前 spec 的 `spec.md`（执行合约）
3. 当前 spec 的 `work.md`（如存在，接续上下文）
4. 当前 spec 的 `qa-report.md`（如存在，QA 打回后的重试）
5. 执行角色的记忆文件（`.ys_team/memory/<role>.md`）
6. `.ys_team/rules.md`
7. spec.md 中的 `### Feedback Loop` 段（如存在）— 用于 step 4.5 复现成本校验

## Rules

- 不对模糊讨论执行，必须有 spec
- spec-review PASS 后应位于 release/work 分支；未切分支不得继续执行非 trivial 可交付改动
- 严格遵守 Write-Scope（禁止项 #4）
- 实现、文档、证据同步交付
- 遇到 scope 外修改需求 → 停止，回到讨论（禁止项 #5）
- 高风险行为改动默认小步推进：一个行为、一个测试或等价验证、一个实现闭环
- 不以"简单"、"之后补测试"、"文档不用同步"作为跳过验证或降级理由
- spec.md 必须含 `### Feedback Loop` 段（允许 `N/A — <理由>`）；缺失则停止并回到 spec-talk 补全

## Execution

1. 读取 spec.md 的 Write-Scope 和 AC
2. 按 Deliverables 逐项执行
3. 执行过程中更新 `work.md`（关键决策、阻塞、进度）
4. 收集 evidence（测试、构建、静态检查、人工验证、截图、日志或命令输出）
4.5 **校验 Feedback Loop 复现成本** — 执行 spec.md `### Feedback Loop` 段声明的命令并记录耗时；若实际复现成本与声明显著偏离，记入 work.md 关键决策；N/A 时跳过本步并核对理由是否成立
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

</supporting-info>
