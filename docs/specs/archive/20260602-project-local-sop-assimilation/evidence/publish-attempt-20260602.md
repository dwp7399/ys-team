# Publish Attempt: 20260602-project-local-sop-assimilation

Date: 2026-06-02

## npm pack

Command:

```bash
npm pack
```

Result: PASS.

Key output:

```text
name: ys-team
version: 0.6.5
filename: ys-team-0.6.5.tgz
total files: 199
```

The generated tarball was removed after the publish attempt to keep the workspace clean.

## npm publish

Command:

```bash
npm publish
```

Result: BLOCKED.

Key output:

```text
npm error code E404
npm error 404 Not Found - PUT https://registry.npmjs.org/ys-team - Not found
```

Follow-up checks:

```bash
npm whoami
npm config get registry
npm view ys-team version
npm view ys-team versions --json
```

Results:

- `npm whoami`: E401 Unauthorized.
- `npm config get registry`: `https://registry.npmjs.org/`.
- `npm view ys-team version`: `0.6.4`.
- `npm view ys-team versions --json`: latest published version list ends at `0.6.4`.

## Conclusion

This attempt was blocked by npm authentication. The blocker was later resolved with a temporary npm user config and a successful publish; see `npm-publish-0.6.5.md`.
