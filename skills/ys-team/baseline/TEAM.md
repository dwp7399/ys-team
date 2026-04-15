# Team Configuration

## mode

default: manual
# manual:    用户手动推进每个阶段（现有模式）
# semi-auto: 自动流转，执行前和关闭前暂停等确认
# full-auto: 全自动，只在重试耗尽时暂停

## limits

spec_review_max_retries: 3
qa_max_retries: 3
auto_downgrade_on_exhaust: true

## memory

role_memory_limit: 2k
workspace_limit: 2k

## roles

# 从方法论角色库中选用，init 时根据项目类型推荐默认组合
# 用户可自由增删改，角色定义在 .ys_team/roles/ 中

- project-architect:   tools: [Read, Write, Edit, Bash, Glob, Grep]
- domain-integrator:   tools: [Read, Write, Edit, Bash, Glob, Grep]
- doc-spec-steward:    tools: [Read, Write, Edit, Glob, Grep]
- spec-reviewer:       tools: [Read, Glob, Grep]
- qa-guard:            tools: [Read, Glob, Grep, Bash]
- delivery-guard:      tools: [Read, Glob, Grep]

## spec_dir

docs/specs/

## state_machine

# Spec 生命周期状态流转（持久化在 status.md 每个 spec 条目中）
# idle → spec-talk → spec-review → spec-work → qa → close → done
# spec-review REJECT → spec-talk（重试）
# qa REJECT → spec-work（重试）
# 重试耗尽 → halt（降级半自动，等用户决策）
