# Work Log: 20260602-project-local-sop-assimilation

## 2026-06-02

进入 spec-work：

- 已切到 `work/20260602-project-local-sop-assimilation`。
- 已将 spec 从 `docs/specs/queued/` 迁入 `docs/specs/active/`。
- `docs/specs/` 被 `.gitignore` 忽略，最终提交时需要对本 spec 目录使用 `git add -f`。

执行边界：

- 只吸收 `ai-gateway` 的通用落地机制：repo-local SOP、条件式 close gate、结果责任、spec-review 合同检查。
- 不把 `ai-gateway` 的 provider/model 业务知识写入 README、方法论、baseline 或 skill baseline。

交付内容：

- 方法论文档新增项目本地 SOP 概念、与角色记忆的区别、Project Local SOP Gate 和 spec-review 加强检查项。
- README / getting-started 增加项目实践本地沉淀说明，以及 Python/Java 低成本开始方式。
- baseline 双副本和本仓 `.ys_team` 的 rules/checklist/spec template 增加项目本地 SOP 条件式规则。
- 4 个 ys-team skill 增加本地 SOP 识别、沉淀、执行 gate 和 rebuild 保留口径。
- 发布线版本对齐到 `0.6.5`，方法论版本升级到 `1.3.0`。

验证：

- 正向关键词检查通过。
- rules/checklist gate 检查通过。
- spec-review hardening 关键词检查通过。
- 业务细节反向检查通过，未在实现面写入项目业务词。
- 发布线版本和方法论版本检查通过。
- `npm pack --dry-run` 通过，包名 `ys-team@0.6.5`，total files 197。

Evidence: `evidence/work-01-verification.md`。

当前状态：

- spec-work 已完成，等待 QA。
