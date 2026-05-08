# Spec Review — 20260508-friendly-mode

Date: 2026-05-08
Reviewer: 规格审阅人
Decision: PASS

## Summary

本 spec 已准确承载用户澄清后的意图：友好模式不是固定的“结论 / 风险 / 下一步”模板，而是在原始技术输出之外追加一段面向非程序背景用户的自然语言总结。

## Checks

- 用户意图：PASS。Background、Goals 和 Friendly Mode Contract 都明确写成“原输出 + 友好总结 / 二次解释层”。
- 非目标边界：PASS。Non-goals 明确不新增 skill、不改变 L0/L1/L2、不替代技术细节。
- 不强制结构：PASS。Friendly Mode Contract 明确允许一句话、短段落或少量要点，不要求固定字段。
- 治理强度：PASS。AC 和 Verification 保留 evidence、可见标志、版本一致性和 release-first 约束。
- Write-Scope：PASS。覆盖 skill、方法论文档、用户指南、glossary、status、版本文件和 spec 生命周期目录。
- Verification：PASS。关键词检查能验证“友好总结 / 二次解释 / 非程序 / 不强制结构”口径落入关键入口文件。

## Notes

- spec-work 阶段应避免把友好模式实现成固定组件或固定字段。
- 文案应优先使用“人话版总结”“友好总结”“再解释一遍”这类用户能理解的表达。
- 原始技术输出仍应保留，友好总结只负责降低理解门槛。

## Addendum — output_mode revision

Date: 2026-05-08
Decision: PASS

用户进一步澄清友好模式应通过配置选择，而不是主要依赖关键词触发。修订后的 spec 将最终机制收敛为 `.ys_team/config.yaml` 中的 `output_mode: technical | friendly`：

- `technical` 为默认技术模式。
- `friendly` 在原始技术输出后追加友好总结。
- 本轮口头要求“用人话总结”只作为临时覆盖，不是稳定主机制。

审阅结论：PASS。该修订更符合“稳定配置”的产品目标，且没有改变 L0/L1/L2、evidence、verification、scope 或可见标志要求。
