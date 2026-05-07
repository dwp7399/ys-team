# Evidence — 0.6.0 Release Checklist（close 阶段执行）

## 范围

本 spec 的 close 阶段同时完成：
1. 0.6.0 版本号 bump（4 处）
2. npm publish ys-team@0.6.0
3. 双 spec 合并归档（Spec A + Spec B 同 commit 移动到 archive/）
4. release/0.6.0 → main 合回
5. v0.6.0 tag + push main + push tag

## 非本轮 spec（明确不动）

| 旧 spec | 状态 | 不动原因 |
|---------|------|---------|
| 20260421-baseline-status-and-role-pool-sourcing | active/close in-progress | 工作区含本轮无关改动；非 0.6.0 release 单元 |
| 20260421-baseline-visible-marker-hardening | active/close in-progress | 工作区含历史改动混合；非 0.6.0 release 单元 |
| 20260421-baseline-postrebuild-hardening | 状态待查 | 已完成 close 但未 commit；非 0.6.0 release 单元 |

这 3 个旧 spec 不在本 spec close 范围内，由后续独立 close 处理。

## Close 步骤

### Step 1 — 版本号 bump（4 处）

```bash
# 1. package.json
node -e "const f='./package.json'; const j=require(f); j.version='0.6.0'; require('fs').writeFileSync(f, JSON.stringify(j, null, 2)+'\n')"

# 2-4. 三处 .ys_team/VERSION
echo "0.6.0" > examples/baseline/.ys_team/VERSION
echo "0.6.0" > skills/ys-team/baseline/.ys_team/VERSION
echo "0.6.0" > .ys_team/VERSION

# 验证 AC-10
v_pkg=$(node -p "require('./package.json').version")
v_ex=$(cat examples/baseline/.ys_team/VERSION)
v_sk=$(cat skills/ys-team/baseline/.ys_team/VERSION)
v_self=$(cat .ys_team/VERSION)
echo "$v_pkg / $v_ex / $v_sk / $v_self"  # 期望: 0.6.0 / 0.6.0 / 0.6.0 / 0.6.0

# 验证 AC-11（无 0.5.3 残留）
grep -l "0\\.5\\.3" package.json examples/baseline/.ys_team/VERSION \
    skills/ys-team/baseline/.ys_team/VERSION .ys_team/VERSION 2>/dev/null
# 期望：无输出
```

### Step 2 — npm publish 预检

```bash
npm whoami  # 期望返回用户名；401 → 停止并 npm login
npm pack --dry-run  # 检查包内容
```

### Step 3 — npm publish

```bash
npm publish
# 验证 AC-12
npm view ys-team@0.6.0 version  # 期望返回 0.6.0
```

### Step 4 — 双 spec 合并归档（同一 commit）

```bash
git mv docs/specs/active/20260507-skill-structure-refactor docs/specs/archive/
git mv docs/specs/active/20260507-context-and-feedback-loop docs/specs/archive/
# 同时编辑 .ys_team/status.md：移除两条活跃 spec
# commit 信息：Archive 0.6.0 specs (A + B) and finalize close

# 验证 AC-13
[ -d docs/specs/archive/20260507-skill-structure-refactor ] && \
[ -d docs/specs/archive/20260507-context-and-feedback-loop ] && \
[ ! -d docs/specs/active/20260507-skill-structure-refactor ] && \
[ ! -d docs/specs/active/20260507-context-and-feedback-loop ] && \
echo "AC-13 OK"
```

### Step 5 — 合 main + tag + push

```bash
git checkout main
git merge --no-ff release/0.6.0 -m "Merge branch 'release/0.6.0' (0.6.0)"
git tag v0.6.0
git push origin main
git push origin v0.6.0

# 验证 AC-14
git log main --oneline | head -1 | grep -q "Merge branch 'release/0.6.0'"  # AC-14 merge
git rev-parse v0.6.0 >/dev/null 2>&1  # AC-14 tag

# 验证 AC-15
git ls-remote origin main | grep -q "$(git rev-parse main)"
git ls-remote origin refs/tags/v0.6.0 | grep -q "$(git rev-parse v0.6.0)"
```

## Rollback 触发条件

| 条件 | 行动 |
|------|------|
| Step 2 `npm whoami` 返回 401 | 停止全流程；提示用户 `npm login`；待重试 |
| Step 3 `npm publish` 失败 | 不进 Step 4-5；回到 release/0.6.0 调试 |
| Step 5 合 main 冲突 | git merge --abort；分析冲突源 |
| publish 后发现严重 bug | `npm deprecate ys-team@0.6.0 "rolled back"`（72h 内可 unpublish）；下一轮发 0.6.1 |

## Close 完成判据（全部满足才算 done）

- [ ] AC-10 ~ AC-15 全部 OK
- [ ] status.md 已更新（移除 0.6.0 双 spec 活跃记录）
- [ ] 4 处版本号 = 0.6.0
- [ ] npm registry 含 ys-team@0.6.0
- [ ] main 含合并提交，v0.6.0 tag 存在
- [ ] origin/main 与 origin/v0.6.0 已 push
