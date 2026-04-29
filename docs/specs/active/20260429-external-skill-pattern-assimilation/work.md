# Work Log

Spec: 20260429-external-skill-pattern-assimilation

## 2026-04-29

- spec-review PASS 后按 full-auto 进入 spec-work，并将 spec 迁入 `docs/specs/active/`。
- 修正上轮未自动流转的问题：本仓 `mode: full-auto`，除 scope 变更、REJECT 重试耗尽或外部平台限制外，不应停在 spec-talk 汇报。
- README 和 guide 改为“安装一次，正常开发；用户不背流程”的产品叙事。
- methodology 增加内部生命周期、外部模式吸收边界、anti-rationalization、evidence 类型、ADR/context 边界。
- 四个 skill 更新为自动路由口径：外部 workflow 只内化到 routing、baseline 和文档，不外显为用户选择负担。
- baseline rules/spec/checklist 与 npm 安装副本同步更新。
- QA 预检发现原 Verification 的两个命令过宽：用户命令检查误扫到 `docs/specs` 路径，baseline diff 误扫到本轮 scope 外的历史不同步文件。已收窄为用户命令边界匹配和本轮三类 baseline 文件逐项 diff；用户命令检查使用 `! rg` 表示预期无匹配。

## 偏差处理

- 未新增默认 `docs/project/context.md` 或 ADR 目录；本轮只定义 init/rebuild 可识别和提示的边界，避免增加默认产物。
- `docs/specs/` 被 `.gitignore` 忽略，spec 制品需要 Git 收口时应显式 `git add -f`。
