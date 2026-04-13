# npm 发布说明

## 当前状态

仓库当前已经具备 **可发布到 npm registry** 的包形态：

- `package.json` 已声明 `bin`
- `publishConfig.access` 已设为 `public`
- `npm pack --dry-run` 可通过

## 安装模式

### 全局模式

```bash
npx ys-team install-skills
```

默认写入：

```text
~/.claude/skills
```

### 项目模式

```bash
npx ys-team init-project --dir /path/to/project
```

默认写入：

- `/path/to/project/.agents/skills`
- `/path/to/project/AGENTS.md`
- `/path/to/project/CLAUDE.md`

## 真实发布仍需的条件

以下步骤尚未在仓库内自动化：

1. 准备 npm 账号
2. 执行 `npm login`
3. 如启用 2FA，按 npm 要求完成验证
4. 在发布环境中执行：

```bash
npm publish
```

## 建议发布前检查

```bash
node scripts/ys-team.mjs --help
node scripts/ys-team.mjs install-skills --dry-run
node scripts/ys-team.mjs init-project --dir /tmp/ys-team-project-check --dry-run
npm pack --dry-run
```
