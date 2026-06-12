# 交付检查清单

Spec: 20260611-loop-era-redesign

## spec-talk
- [x] 路由判断完成（L2：跨方法论/skill/baseline 多模块，破坏性换代，需讨论收敛）
- [x] 讨论收敛，spec.md 已写入
- [x] Write-Scope 明确到文件级
- [x] 设计文档已先行产出并经用户过目（docs/roadmap/active/v1.0-loop-era-redesign.md）

## spec-review
- [x] 独立审阅完成
- [x] 已确认 v1 原地替换现有 `ys-team` skill,旧版通过 npm `legacy` tag 保留
- [x] 已确认 L3/L2/L1/L0 验收分级采用 spec 当前定义
- [x] 已确认 "UI/交互类 < L2 默认 REJECT" 门槛
- [x] 已确认迁移分两步估计(无痛切换 1 天 + 深度瘦身 1-2 周)
- [x] AC 可验证、Verification 可执行
- [x] Write-Scope 无遗漏
- [x] Delete-Scope 覆盖旧角色池/月报模板删除
- [x] 已确认执行分支策略（release/work）
- [x] 重点审：四原则重新定位是否有实测依据、verifier 分级是否自洽、三道闸是否真能替代排他
- [x] 重点审：root AGENTS/CLAUDE、CLI help、baseline 全量 diff、三条版本线均有验收覆盖

## spec-work
- [x] spec-review PASS 后已切到 release/work 分支
- [x] 按 Write-Scope 执行，无越界
- [x] 小步推进：每个原则/机制一个实现闭环，各自带验证
- [x] work.md 记录关键决策
- [x] baseline 双副本同次同步

## qa
- [x] AC-01~18 逐项验证
- [x] Verification 命令执行通过（正向/反向关键词、双副本 diff、版本一致性、npm pack）
- [x] evidence/ 已存放证据

## close
- [x] status.md 更新
- [x] 文档同步完成（设计文档迁 completed、CHANGELOG）
- [x] release-first：三条版本线一致
- [x] npm pack 验证通过
- [x] npm publish 成功（新版 latest）
- [x] 旧版补 legacy tag
- [x] 发布分支已合回 main
- [x] main 和 git tag 已 push
- [x] spec 目录归档并完成 close commit
