---
name: ys-team-doc-build
description: "Build or rebuild the reality index for a ys-team project. Generates module-level index with relationship graph and business summaries. Called automatically by ys-team-init and ys-team-rebuild, or invoked manually."
---

# ys-team-doc-build

Use this skill to generate or rebuild the project's reality index.

## Purpose

The reality index (`docs/project/module-index.md`) gives AI team roles a shared understanding of the project's module structure and dependencies — so that during spec discussion, roles can reason about impact scope without re-exploring the codebase from scratch each time.

This is not javadoc. It is not for humans to read. It is a collaboration substrate for AI roles.

## Core Principles

- **Relationship-first**: Record cross-file relationships (inter-module dependencies, data access, messaging, external APIs). These are expensive to re-derive dynamically.
- **Summary-aided**: Each module gets 2–3 sentences on business responsibility. This lets roles assess impact scope during control phase without reading source files.
- **Scale-adaptive**: Index granularity adjusts to project size.
- **Language-agnostic**: Detect project type from build files; adapt index structure to match.

## Scale Strategy

| Project Scale | Index Strategy |
|--------------|----------------|
| Small (<500 files) | Detailed module index + key class descriptions |
| Medium (500–2000 files) | Module index + entry point lists |
| Large (>2000 files) | Core modules only + layered entry point lists |

## Execution Steps

### Phase 1: Project Analysis

1. **Detect language and build tool**:
   - `pom.xml` → Java Maven
   - `build.gradle` → Java Gradle
   - `pyproject.toml` or `setup.py` → Python
   - `package.json` → Node.js / TypeScript
   - Other → Generic

2. **Estimate scale**: Count source files (exclude build output dirs: `target/`, `dist/`, `node_modules/`, `venv/`, `.git/`)

3. **Select strategy** based on file count

### Phase 2: Module Discovery

Identify module boundaries using language-specific signals:

- **Java Maven**: Parse `<modules>` in root `pom.xml`; top-level application classes (`@SpringBootApplication`); DDD layer packages (`application/`, `domain/`, `service/`)
- **Java Gradle**: Parse `include` in `settings.gradle`
- **Python**: Top-level packages under `src/` or project root
- **Node.js/TS**: Directories with `index.ts` or dedicated `package.json`
- **Generic**: Top-level directories with source files

### Phase 3: Relationship Extraction

For each module, use Grep to extract:

- Entry points (service classes, application classes, API controllers)
- Domain/business services
- Data access layer (mappers, repositories, DAOs)
- Outbound messaging (MQ producers, event publishers)
- Inbound messaging (MQ listeners, event consumers)
- Scheduled jobs
- External service dependencies (API clients, SDK calls)
- Which other modules depend on this module (reverse dependency)
- Configuration key prefixes (Apollo, env vars, application.properties)

### Phase 4: Summary Generation

Read the primary entry class for each module. Generate 2–3 sentences describing:
- What business problem this module solves
- Its primary responsibilities
- Any notable design pattern (strategy, adapter, etc.) if central to understanding

Keep summaries factual and stable — avoid implementation details that change frequently.

### Phase 5: Index Generation

Write `docs/project/module-index.md` using the format below.

For medium and large projects, also generate `docs/project/entry-points/generate.sh` — a shell script that, when run, produces fresh lists of key entry points (services, mappers, listeners, jobs).

## Output Format

```markdown
# Module Index

**Project Type**: [detected type]
**Project Scale**: [Small/Medium/Large] (~N files)
**Index Strategy**: [strategy description]
**Last Updated**: [YYYY-MM-DD]

## [Module Name]（[Chinese label if applicable]）
**职责**：[2–3 sentence business summary]

**关系**：
- 入口：[entry class(es)]
- 领域服务：[domain service classes] (if applicable)
- [Framework] 服务：[service impl classes] (if applicable)
- 数据访问：[mapper/repository classes]
- 外部依赖：[external API/SDK names]
- 被依赖：[modules that depend on this one, with brief reason]
- 消息：[listener/producer classes and topic] (omit if none)
- 定时任务：[job class names] (omit if none)
- 配置前缀：[config key prefix] (omit if unknown)
```

Omit fields that do not apply. Do not fabricate entries.

## Entry Point Script (Medium/Large projects)

Generate `docs/project/entry-points/generate.sh`:

```bash
#!/bin/bash
# Regenerate key entry point lists for this project
# Run from project root

OUTDIR="docs/project/entry-points"
mkdir -p "$OUTDIR"

# Example for Java Maven + Dubbo + MyBatis + RocketMQ:
grep -r "@DubboService" --include="*.java" -l | sort > "$OUTDIR/dubbo-services.txt"
ls src/main/resources/mapper/*.xml 2>/dev/null | sed 's|.*/||;s|Mapper.xml||' | sort > "$OUTDIR/mappers.txt"
grep -r "@RocketMQMessageListener\|implements.*Listener" --include="*.java" -l | sort > "$OUTDIR/listeners.txt"
grep -r "@Scheduled\|@Job\|@ElasticJob" --include="*.java" -l | sort > "$OUTDIR/jobs.txt"

echo "Entry points updated in $OUTDIR/"
```

Adapt the script to the actual project's framework and conventions. Make it executable.

## Validation

Before finalizing:

- Every module listed has a non-empty **职责** summary
- Every dependency relationship is bidirectional (if A depends on B, B lists A under 被依赖)
- No invented entries — only what Grep or Read confirmed

## Token Cost Check

If generation would exceed ~80k tokens (e.g., large project with many modules), warn the user and suggest reducing scope to core modules only.

## Trigger Conditions

- Automatically called by `ys-team-init` after baseline generation
- Automatically called by `ys-team-rebuild` after baseline update
- Manually invoked when project module structure has materially changed

## After Generation

Inform the user:
- Location of the generated index
- Number of modules indexed
- Whether an entry point script was generated
- Suggested next step (e.g., run `ys-team-rebuild` if project has evolved, or begin spec work)
