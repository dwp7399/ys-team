# Methods

## Principle

本仓 ys-team 采用”弱引导、强结果”。

含义：

- 先理解当前在讨论方法论、skill 边界、仓库接入，还是 spec 执行。
- 不把 ys-team 讲成固定流程图。
- 当问题已经收敛到可执行程度时，默认继续进入 spec / work / acceptance 链，而不是停在抽象讨论。
- 每轮讨论都要收敛到明确结论、现状和下一步。

## Infer First

讨论前先做三段判断：

1. 当前对象是什么 — idea / spec / requirement / roadmap / 已有制品
2. 当前目标是什么 — 澄清 / 起草 / 审阅 / 重新定义 / 执行准备 / 交付判断
3. 当前阻塞是什么 — 边界不清 / 缺少验证 / 依赖未完成 / 需要外部支持 / 无阻塞

如果任何一项不清楚，先向用户确认。

## Result Card

每轮重要讨论至少应收敛到：

- `Current Mode`
- `Decision`
- `Current State`
- `Why`
- `Needed Changes`
- `Next Step`

可选字段：`Need Your Input`、`External Support Request`

轻型讨论也不能只给口头结论，至少输出精简版结果卡。

## Role Brief

本仓讨论默认要给出角色简报，说明：

- 当前判断
- 关注风险
- 下一步

## Decision Meanings

- `PASS` — 方向足够清楚，可以继续；要明确列出微调项和执行步骤。
- `BLOCKED` — 当前不能继续；要明确写出缺什么、等谁输入、是否需要 external。
- `REJECT` — 当前 framing 不成立；要明确说明为什么不做，以及如何重新定义问题。

## Discussion Cost Awareness

讨论成本是自检信号，不是硬限制。每轮讨论后检查对话是否仍在收敛。

警告信号：
- 重复出现前轮已有的论点
- 在前一轮阻塞点未解决的情况下引入新 external role
- 在扩大范围而非收窄到决策

出现以上信号时，优先停轮，输出当前状态的结果卡（即使 Decision 是 BLOCKED），让用户决定是否继续。

## External Escalation

如果 internal team 认为需要 external role：

1. 先停止继续扩展讨论
2. 输出 External Support Request，必须写清楚：
   - 为什么 internal team 不足
   - 需要哪个 external role
   - external 要回答什么问题
   - 不引入 external 的风险
3. 等用户明确同意后再继续

## Subagent Policy

角色可声明 subagent 策略：

- `required` — 必须用独立 subagent（如需要上下文隔离的审阅、质检）
- `preferred` — 边界清晰或需要并行时优先用 subagent
- `local_only` — 保持在主会话中

这是提示而非强制，上层编排约束优先级更高。

## Execution Intent

当问题已经收敛到可执行程度时，默认应继续进入 spec / work / acceptance 链，而不是停在抽象讨论。

## Release Intent

涉及真实发版时，默认把“发布成功”而不是“代码写完”视为交付完成。

- 在 `release/<version>` 分支完成版本更新、验证和发版
- `npm publish` 成功后，才允许合并回 `main`
- 代码回到 `main` 并创建同版本 git tag 后，spec 才能 close

## Discussion Lens

本仓允许按问题场景装载思维透镜，例如：

- 第一性原理
- 苏格拉底提问
- 奥卡姆剃刀

这些透镜用于帮助看清问题，不构成强制流程。
