# Work Log — 20260508-friendly-mode

## 2026-05-08

- Entered spec-work after spec-review PASS and user approval.
- Switched to branch `work/20260508-friendly-mode`.
- Moved spec directory from `queued/` to `active/`.
- Implementation goal: add friendly mode as a second explanation layer: original technical output remains, then a plain-language summary may be appended when useful.
- Updated `ys-team`, `ys-team-spec-talk`, `ys-team-spec-work`, and `ys-team-init` skill docs with friendly mode behavior.
- Updated README, getting started guide, methodology overview/reference, and glossary.
- Bumped npm/baseline version files to `0.6.2` and methodology version to `1.2.0`.
- Ran keyword verification, governance-boundary verification, version alignment check, and Feedback Loop command. All passed.
- Wrote evidence files:
  - `evidence/friendly-mode-keyword-check.log`
  - `evidence/friendly-mode-contract-review.md`
- QA reran the verification commands plus fixed-template regression and diff hygiene checks; all passed.
- User clarified friendly mode should be configured, not primarily keyword-triggered. Reopened the active spec contract to add `output_mode: technical | friendly` and expand Write-Scope to config files.
- Added `output_mode: technical` to this repo config and both baseline config files.
- Updated skill and user docs so config is the stable switch; per-turn phrases are only temporary overrides.
- Reran config enum, contract, governance-boundary, version alignment, and diff hygiene checks; all passed.
