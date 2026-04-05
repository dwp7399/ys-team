---
name: ys-team-rebuild
description: "Reassess an existing project-local ys-team baseline and minimally update it when the project, stack, or collaboration shape has materially changed."
---

# ys-team-rebuild

Use this skill when a repository already has `.ys_team/`, but the current local method no longer matches repository reality.

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
2. Compare with `examples/baseline/.ys_team/VERSION` from the installed ys-team skill
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

## Doc-Build Integration

After baseline update is complete, automatically invoke `ys-team-doc-build` to rebuild the reality index. This ensures `docs/project/module-index.md` reflects current project structure after any rebuild.

## Output

Summarize:

- what changed
- why it changed
- whether existing specs need follow-up
- 工具变化（新增内化、深化、移除）
