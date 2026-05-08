# 项目术语

> 本仓 (ys-team 方法论本身) 的项目术语。
> 空文件不阻塞任何流程；ys-team-spec-talk 加载时若为空则跳过术语对齐环节。

## 术语

| 术语 | 含义 | 避免说法 |
|------|------|---------|
| Spec | `docs/specs/<phase>/<id>/` 下的执行合约文件夹，含 `spec.md` / `work.md` / `qa-report.md` / `evidence/` | 任务、工单、需求 |
| Baseline | 项目本地 ys-team 配置骨架，位于 `.ys_team/`，由 `ys-team-init` 从模板生成 | 模板、脚手架、初始化包 |
| 同步副本 | 同一逻辑文件的多个权威拷贝（如 `examples/baseline/` 与 `skills/ys-team/baseline/`），必须保持一致 | 镜像、拷贝、备份 |
| Release 单元 | 一次 npm publish 涵盖的所有 spec 集合，可能跨 1～N 个 spec | 版本、发布包 |
| Feedback Loop | spec 中"如何快速判定改对了"的字段（目标 < 30 秒 pass/fail 信号）| 验证、测试、QA |
| Glossary | 本文件，项目术语词典 | 词汇表、辞典 |
| 友好模式 | `output_mode: friendly` 时，在原始技术输出后追加给非程序背景用户看的友好总结；不强制结构，不降低治理要求 | 简化模式、低强度模式、固定摘要模板 |
| 输出模式 | `.ys_team/config.yaml` 的 `output_mode` 字段，可选 `technical` 或 `friendly` | 触发词、口令 |

## 更新记录

| 时间 | 变更 |
|------|------|
| 2026-05-08 | 增加友好模式与输出模式术语 |
| 2026-05-07 | 初始化（0.6.0 Spec B 落地）|
