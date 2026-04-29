# Publish Attempt Evidence

Spec: 20260429-release-first-close-workflow

Date: 2026-04-29

## Commands

```bash
npm pack
npm publish
npm whoami
npm view ys-team version
npm config get registry
```

## Result

- `npm pack`: PASS. Generated `ys-team-0.5.3.tgz`; package version was `0.5.3`.
- `npm publish`: BLOCKED. Registry returned `E404 Not Found - PUT https://registry.npmjs.org/ys-team`.
- `npm whoami`: BLOCKED. Registry returned `E401 Unauthorized`.
- `npm view ys-team version`: PASS. Remote package exists at `0.5.2`.
- `npm config get registry`: PASS. Registry is `https://registry.npmjs.org/`.

## Decision

Close cannot continue until npm authentication is restored. The release branch remains `release/0.5.3`; the spec remains active and blocked.
