# 团队状态

updated: —

## 活跃 Spec

| Spec | 阶段 | 状态 | 负责角色 | 重试次数 | 模式 |
|------|------|------|---------|---------|------|
| — | — | — | — | — | — |

### 状态值

- `idle` — 未开始
- `spec-talk` — 讨论中
- `spec-review` — 审阅中
- `spec-work` — 执行中
- `qa` — 验证中
- `close` — 关闭中
- `done` — 已完成
- `halt` — 已暂停（重试耗尽，等用户决策）

### 状态流转

```
idle → spec-talk → spec-review → spec-work → qa → close → done
                 ↑  [REJECT] ←┘            ↑  [REJECT] ←┘
                 ↑  [EXHAUST] → halt       ↑  [EXHAUST] → halt
```

## 最新判断

| 时间 | Spec | 角色 | 决定 | 原因 |
|------|------|------|------|------|
| — | — | — | — | — |

## 阻塞项

（无）

## 待办

（无）
