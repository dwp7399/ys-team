# npm Publish Evidence

Date: 2026-05-21
Package: `ys-team@0.6.3` and corrective `ys-team@0.6.4`

## Pre-publish Checks

```bash
rg -n '"version": "0.6.3"|^0.6.3$' package.json .ys_team/VERSION examples/baseline/.ys_team/VERSION
npm pack --dry-run
```

Result: PASS. Version line was consistent across `package.json`, `.ys_team/VERSION`, and `examples/baseline/.ys_team/VERSION`. `npm pack --dry-run` produced `ys-team-0.6.3.tgz` metadata and included the new `questions.md` templates.

## Publish

First publish attempt with the original token failed because npm auth was not accepted. The second token authenticated as `ys7399`.

```bash
npm whoami
npm publish
```

Result: PASS. npm returned:

```text
+ ys-team@0.6.3
```

## Registry Verification

```bash
npm view ys-team version
```

Result:

```text
0.6.3
```

## Corrective Publish

`0.6.3` was published before the archive commit, so the npm package contained the spec under `docs/specs/active/` while the git tag pointed at the archived state. To keep npm package contents and the git tag aligned, close performed a corrective patch release:

```bash
rg -n '"version": "0.6.4"|^0.6.4$' package.json .ys_team/VERSION examples/baseline/.ys_team/VERSION
npm pack --dry-run
npm publish
npm view ys-team version
```

Final registry result:

```text
0.6.4
```
