# npm Publish Evidence

Spec: 20260429-release-first-close-workflow

Date: 2026-04-29

## Commands

```bash
npm_config_userconfig=/tmp/ys-team-npmrc-053 npm_config_cache=/tmp/ys-team-npm-cache-053 npm publish
npm_config_cache=/tmp/ys-team-npm-cache-053 npm view ys-team version
rm -f /tmp/ys-team-npmrc-053 /Users/ys/base/code/aigc/ys-team/ys-team-0.5.3.tgz
```

## Result

- `npm publish`: PASS. Registry returned `+ ys-team@0.5.3`.
- `npm view ys-team version`: PASS. Registry reports `0.5.3`.
- Temporary npm token file and generated tarball were removed after publish.
