#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const bundledSkillsDir = path.join(packageRoot, "skills");
const bundledBaselineDir = path.join(packageRoot, "examples", "baseline");
const baselineAgentsPath = path.join(packageRoot, "examples", "baseline", "AGENTS.md");
const baselineClaudePath = path.join(packageRoot, "examples", "baseline", "CLAUDE.md");
const installedBaselineSkillName = "ys-team";

function defaultSkillsDir() {
  return path.join(os.homedir(), ".claude", "skills");
}

function helpText() {
  return [
    "ys-team — AI 团队治理方法论工具链",
    "",
    "Commands:",
    "  ys-team install-skills [--dest <dir>] [--force] [--dry-run]",
    "  ys-team init-project [--dir <project-dir>] [--force] [--dry-run]",
    "  ys-team check-update",
    "  ys-team --help",
    "",
    `Default install destination: ${defaultSkillsDir()}`,
    "",
    "Quick start:",
    "  npx ys-team install-skills --force",
    "  # Then in your project, tell Claude: 用 ys-team-init 初始化这个项目",
    "",
    "Update:",
    "  npx ys-team check-update",
    "  npx ys-team@latest install-skills --force",
    "",
    "Workflow levels:",
    "  L0 trivial  — single file, no impact, direct execution",
    "  L1 patch    — ≤3 files, single module, execute + record",
    "  L2 spec     — cross-module or risky, full spec flow",
    "",
    "Docs: docs/methodology/ for the full method specification"
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    command: null,
    dest: defaultSkillsDir(),
    dir: process.cwd(),
    force: false,
    dryRun: false,
    help: false
  };

  const rest = argv.slice(2);
  if (rest.length === 0) {
    args.help = true;
    return args;
  }

  for (let i = 0; i < rest.length; i += 1) {
    const value = rest[i];
    if (value === "--help" || value === "-h") {
      args.help = true;
      continue;
    }
    if (!args.command && !value.startsWith("--")) {
      args.command = value;
      continue;
    }
    if (value === "--dest") {
      const next = rest[i + 1];
      if (!next) {
        throw new Error("Missing value for --dest");
      }
      args.dest = path.resolve(next);
      i += 1;
      continue;
    }
    if (value === "--dir") {
      const next = rest[i + 1];
      if (!next) {
        throw new Error("Missing value for --dir");
      }
      args.dir = path.resolve(next);
      i += 1;
      continue;
    }
    if (value === "--force") {
      args.force = true;
      continue;
    }
    if (value === "--dry-run") {
      args.dryRun = true;
      continue;
    }
    throw new Error(`Unsupported argument: ${value}`);
  }

  return args;
}

function ensureBundledSkills() {
  if (!fs.existsSync(bundledSkillsDir)) {
    throw new Error(`Bundled skills directory not found: ${bundledSkillsDir}`);
  }
  if (!fs.existsSync(bundledBaselineDir)) {
    throw new Error(`Bundled baseline directory not found: ${bundledBaselineDir}`);
  }
  if (!fs.existsSync(baselineAgentsPath) || !fs.existsSync(baselineClaudePath)) {
    throw new Error("Baseline AGENTS.md / CLAUDE.md templates not found");
  }
}

function sharedBaselineInstallPath(dest) {
  return path.join(dest, installedBaselineSkillName, "baseline");
}

function listBundledSkills() {
  ensureBundledSkills();
  return fs.readdirSync(bundledSkillsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function copyDirectoryRecursive(sourceDir, targetDir) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    if (entry.isDirectory()) {
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyFileWithPolicy(sourcePath, targetPath, { force, dryRun }) {
  const exists = fs.existsSync(targetPath);
  if (exists && !force) {
    return { action: "skipped", targetPath };
  }

  if (!dryRun) {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  }

  return { action: exists ? "replaced" : "created", targetPath };
}

function installSkills({ dest, force, dryRun }) {
  const skills = listBundledSkills();
  const operations = [];
  const skipped = [];
  const baselineTargetPath = sharedBaselineInstallPath(dest);
  const baselineExists = fs.existsSync(baselineTargetPath);

  for (const skill of skills) {
    const sourcePath = path.join(bundledSkillsDir, skill);
    const targetPath = path.join(dest, skill);
    const exists = fs.existsSync(targetPath);

    if (exists && !force) {
      skipped.push(skill);
      continue;
    }

    operations.push({ skill, sourcePath, targetPath, replace: exists });
  }

  if (!dryRun) {
    fs.mkdirSync(dest, { recursive: true });
    for (const op of operations) {
      if (op.replace) {
        fs.rmSync(op.targetPath, { recursive: true, force: true });
      }
      copyDirectoryRecursive(op.sourcePath, op.targetPath);
    }

    if (baselineExists && force) {
      fs.rmSync(baselineTargetPath, { recursive: true, force: true });
    }
    if (!baselineExists || force) {
      copyDirectoryRecursive(bundledBaselineDir, baselineTargetPath);
    }
  }

  const lines = [
    dryRun ? "ys-team install-skills dry-run" : "ys-team install-skills",
    "",
    `destination: ${dest}`,
    `shared baseline: ${baselineTargetPath}`,
    `bundled skills: ${skills.length}`,
    `scheduled installs: ${operations.length}`,
    `skipped existing: ${skipped.length}`,
    `baseline action: ${baselineExists ? (force ? "replace" : "skip") : "create"}`
  ];

  if (operations.length > 0) {
    lines.push("", "planned:");
    for (const op of operations) {
      lines.push(`- ${op.skill}${op.replace ? " (replace)" : ""}`);
    }
  }

  if (skipped.length > 0) {
    lines.push("", "skipped:");
    for (const skill of skipped) {
      lines.push(`- ${skill}`);
    }
    lines.push("", "Use --force to replace existing installed skills.");
  }

  if (!dryRun && operations.length > 0) {
    lines.push("", "next:");
    lines.push("- run ys-team-init in the target repository");
    lines.push("- update AGENTS.md and CLAUDE.md so ys-team is the highest-priority workflow");
  }

  return lines.join("\n");
}

function initProject({ dir, force, dryRun }) {
  const skillsDest = path.join(dir, ".agents", "skills");
  const agentsDest = path.join(dir, "AGENTS.md");
  const claudeDest = path.join(dir, "CLAUDE.md");

  const installSummary = installSkills({
    dest: skillsDest,
    force,
    dryRun
  });

  const agentsResult = copyFileWithPolicy(baselineAgentsPath, agentsDest, { force, dryRun });
  const claudeResult = copyFileWithPolicy(baselineClaudePath, claudeDest, { force, dryRun });

  return [
    dryRun ? "ys-team init-project dry-run" : "ys-team init-project",
    "",
    `project: ${dir}`,
    `local skills: ${skillsDest}`,
    `AGENTS.md: ${agentsResult.action}`,
    `CLAUDE.md: ${claudeResult.action}`,
    "",
    installSummary,
    "",
    "next:",
    "- open the target repository",
    "- run ys-team-init in that repository",
    `- baseline assets are available at ${sharedBaselineInstallPath(skillsDest)}`,
    "- verify AGENTS.md and CLAUDE.md match your project-local needs"
  ].join("\n");
}

function fetchLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}/latest`;
    https.get(url, { headers: { Accept: "application/json" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          resolve(json.version);
        } catch {
          reject(new Error("解析 npm registry 响应失败"));
        }
      });
    }).on("error", reject);
  });
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) > (pb[i] ?? 0)) return 1;
    if ((pa[i] ?? 0) < (pb[i] ?? 0)) return -1;
  }
  return 0;
}

async function checkUpdate() {
  const localPkg = JSON.parse(fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"));
  const localVersion = localPkg.version;

  process.stdout.write("正在检查更新...\n");
  const latestVersion = await fetchLatestVersion(localPkg.name);
  const cmp = compareVersions(latestVersion, localVersion);

  const lines = [
    "ys-team check-update",
    "",
    `已安装版本: v${localVersion}`,
    `npm 最新版:  v${latestVersion}`,
  ];

  if (cmp === 0) {
    lines.push("", "已是最新版本。");
  } else if (cmp > 0) {
    lines.push("", "发现新版本，运行以下命令更新 skills：");
    lines.push(`  npx ys-team@${latestVersion} install-skills --force`);
  } else {
    lines.push("", "本地版本比 npm 更新（开发中或未发布）。");
  }

  return lines.join("\n");
}

function main() {
  try {
    const args = parseArgs(process.argv);

    if (args.help || !args.command) {
      console.log(helpText());
      process.exit(0);
    }

    if (args.command === "install-skills") {
      console.log(installSkills(args));
      process.exit(0);
    }

    if (args.command === "init-project") {
      console.log(initProject(args));
      process.exit(0);
    }

    if (args.command === "check-update") {
      checkUpdate().then((output) => {
        console.log(output);
        process.exit(0);
      }).catch((err) => {
        console.error(`ys-team error: ${err.message}`);
        process.exit(1);
      });
      return;
    }

    console.error(`Unsupported command: ${args.command}`);
    console.error("Run `ys-team --help`.");
    process.exit(1);
  } catch (error) {
    console.error(`ys-team error: ${error.message}`);
    process.exit(1);
  }
}

main();
