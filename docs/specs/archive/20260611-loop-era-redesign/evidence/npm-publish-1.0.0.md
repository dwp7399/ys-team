# npm publish 1.0.0

Date: 2026-06-12

## Commands

- `npm dist-tag add ys-team@0.6.5 legacy`
- `npm publish --access public`
- `npm view ys-team dist-tags --json`

## Result

- Published: `ys-team@1.0.0`
- Dist tags:
  - `latest`: `1.0.0`
  - `legacy`: `0.6.5`

## Notes

- npm token was supplied through a temporary npmrc and removed after command completion.
- npm cache was redirected to `/tmp` to avoid local cache permission errors.
