# 交付检查清单

Spec: <spec-id>

## spec-talk
- [ ] 路由判断完成（L0/L1/L2）
- [ ] 参与角色已选定
- [ ] 已读取现实索引和相关项目文档
- [ ] 讨论收敛，spec.md 已写入
- [ ] Write-Scope 明确到文件级
- [ ] 参与角色记忆回顾已执行；如有跨任务经验，已写入并输出 `[记忆更新]` 通知

## spec-review
- [ ] 独立审阅完成
- [ ] AC 可验证、Verification 可执行
- [ ] Write-Scope 无遗漏
- [ ] 未把内部工作流外显为用户必须选择的命令
- [ ] 已确认执行分支策略

## spec-work
- [ ] spec 已从 queued 迁入 active
- [ ] spec-review PASS 后已切到 release/work 分支
- [ ] 按 Write-Scope 执行，无越界
- [ ] work.md 记录关键决策
- [ ] 高风险行为改动已按小步验证推进
- [ ] 代码变更与 spec 一致
- [ ] 执行角色记忆回顾已执行；如有跨任务经验，已写入并输出 `[记忆更新]` 通知

## qa
- [ ] AC 逐项验证
- [ ] Verification 命令执行通过
- [ ] evidence/ 已存放测试、构建、静态检查、人工验证或运行证据

## close
- [ ] status.md 更新
- [ ] 文档同步完成
- [ ] 如本 spec 命中项目本地 SOP，已完成该 SOP 的条件式 close gate，并更新经验总结或说明已有总结覆盖
- [ ] git commit（代码 + evidence）
- [ ] 项目发布 gate 完成
- [ ] 发布分支已合回主线
- [ ] 主线和 tag 已 push（如项目使用 tag）
- [ ] spec 已迁入 completed 或 archive，并完成 close commit
