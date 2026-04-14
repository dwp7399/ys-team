---
Initiative: 20260414-183500-rebuild-method-repo
Phase: spec-talk
Author-Session: ys-team-spec-talk
---

# 原始需求记录

## 需求来源

- 提出时间：2026-04-14
- 来源方式：用户口述

## 原始描述

对本项目进行一次完整 rebuild，走正常项目的 rebuild 流程。

## 背景补充

- 当前本仓发布线版本与 baseline 版本均为 `0.3.2`
- 上一轮交付已经完成 `0.3.2` 发版与发布治理收口
- 用户本次要求不是继续发版，而是让本仓按照正常项目 rebuild 逻辑重新评估本地 `.ys_team/`

## 初步范围判断

- 影响模块：本仓 `.ys_team/`、`docs/project/module-index.md`、`.ys_team/status.md`
- 是否跨模块：是，但以本仓工作流配置为主
- 是否涉及外部发布：否
- 是否涉及真实凭证：否
