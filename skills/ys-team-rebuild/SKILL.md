---
name: ys-team-rebuild
description: "Reassess an existing project-local ys-team baseline and minimally update it when the project, stack, or collaboration shape has materially changed."
---

# ys-team-rebuild

Use this skill when a repository already has `.ys_team/`, but the current local method no longer matches repository reality.

> 演进触发条件和重估规则见 `docs/methodology/06-bootstrap-and-evolution.md`。

## Purpose

Refresh the local ys-team baseline without reintroducing heavy process or unnecessary churn.

## Rebuild Triggers

- stack changed
- project gained or lost major modules
- existing local roles no longer fit delivery reality
- current templates no longer match acceptance or rollback needs
- documentation authority is no longer aligned with the codebase

## Rules

- Change the smallest surface that fixes the mismatch.
- Preserve stable local wording and role boundaries when they still fit.
- Keep the local method weak-guidance, strong-result.
- Update local templates only when repository reality really changed.

## Version Check

Before rebuilding, check version alignment:

1. Read project `.ys_team/VERSION` (if exists)
2. Compare with the bundled baseline `.ys_team/VERSION`
   - 仓库内来源：`examples/baseline/.ys_team/VERSION`
   - npm 安装来源：`ys-team/baseline/.ys_team/VERSION`
3. If versions differ, inform user: "ys-team baseline 有更新（当前 X.Y.Z → 最新 A.B.C）。是否同步？"
4. On user confirmation: merge baseline updates into project `.ys_team/`, preserving project-local customizations
5. Update project `.ys_team/VERSION` to match baseline

## 工具重新内化

Rebuild 时除了更新基础配置，还需评估和更新工具内化：

### 步骤

1. **检查候选列表**：读取 `.ys_team/toolbox/_candidates.md`，这些是用户在工作流中显式使用过的未内化 skill，作为内化评估输入

2. **检查深化标记**：遍历 `.ys_team/toolbox/*.md`（排除 `_sources.md` 和 `_candidates.md`），检查是否有"需要深化"标记

3. **重新匹配推荐**：如果项目类型发生变化，重新匹配 `registry/` 推荐

4. **处理候选**：
   - 对每个候选工具，评估是否值得内化
   - 和用户确认后，执行内化流程（同 init 的内化步骤）
   - 处理完毕后清空 `_candidates.md`

5. **深化已有工具**：
   - 对标记"需要深化"的工具，回到原 skill 源（通过 `_sources.md` 中的链接）
   - 重新阅读原 skill 最新内容
   - 提取更深入的部分，更新内化文件
   - 清除深化标记

6. **更新角色绑定**：如果新增或移除了工具，同步更新 `team.md` 中的 tools 字段

7. **更新源索引**：同步 `_sources.md`

### 自我学习

当团队成员在某个环节发现内化程度不够时，可以在对应的内化文件末尾追加：

```markdown
## 需要深化

[具体哪方面不够，需要从原 skill 补充什么]
```

下次 rebuild 时会自动处理。

## TEAM.md 同步

Rebuild 时检查 TEAM.md 状态：

1. 如果项目没有 `TEAM.md`（旧版本项目），从 baseline 生成一份，保留项目已有的角色配置
2. 如果 baseline TEAM.md 有新增配置项（如新版本加了 memory 配置），合并到项目 TEAM.md 中，保留用户已有的自定义值
3. 如果 TEAM.md 的 roles 列表与 `.ys_team/team.md` 不一致，以 TEAM.md 为准同步 team.md

## 记忆健康检查

Rebuild 时检查记忆系统状态：

1. 如果 `.ys_team/memory/` 不存在（旧版本项目），从 baseline 初始化
2. 检查角色记忆文件是否与 TEAM.md 的 roles 列表对齐：
   - 新角色缺少记忆文件 → 创建空文件
   - 角色已从 TEAM.md 移除但记忆文件存在 → 保留文件，在文件头部标记 `archived: true`
3. 检查角色记忆文件是否超限（对比 TEAM.md 的 `memory.role_memory_limit`）：
   - 超限的文件 → 提示用户，建议在下次角色工作时自动压缩
4. 检查 `memory/policy.md` 是否需要更新（对比 baseline 版本）

## Doc-Build Integration

After baseline update is complete, automatically invoke `ys-team-doc-build` to rebuild the reality index. This ensures `docs/project/module-index.md` reflects current project structure after any rebuild.

## Output

Summarize:

- what changed
- why it changed
- whether existing specs need follow-up
- 工具变化（新增内化、深化、移除）
