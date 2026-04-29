---
Spec-Type: control
Initiative: <YYYYMMDD-name>
Status: draft
Owner-Session: —
Write-Scope:
  - # 列出允许修改的文件/目录
Delete-Scope:
  - # 列出允许删除的文件/目录（可选）
Depends-On: []
Verification: "见 ## Verification"
---

# <标题>

## Background

为什么要做这件事。

## Goals

要达成什么。

## Integration Gate

实现期间必须保持的轻量约束。

- 用户不需要选择内部工作流；本 spec 负责承载必要的讨论、执行、验证和收口约束。
- 如涉及高风险行为变化，优先小步推进：一个行为、一个测试或等价验证、一个实现闭环。
- 不得以"简单"、"之后补验证"、"文档不用同步"作为降级或跳过 evidence 的理由。

## Non-goals

不做什么（可选）。

## Deliverables

具体交付物。

## Documentation Updates

需要同步更新的文档与状态留痕（可选）。

## Acceptance Criteria

- AC-01: ...
- AC-02: ...

## Verification

```bash
# 可直接执行的验证命令
```

可接受的 evidence 类型：
- 测试：单元测试、集成测试、端到端测试
- 构建：编译、打包、类型检查
- 静态检查：lint、格式检查、安全扫描
- 人工验证：明确步骤、输入、期望输出
- 运行证据：日志、截图、命令输出、回调记录

## Acceptance Evidence

记录 evidence/ 中应留下的验证产物（可选）。

## Risks

（可选）

## Rollback Plan

（可选）
