# Visual Difference Check

Use this file when a generated image, Figma reconstruction, HTML preview, or implementation screenshot must be compared against an approved mobile design image.

## Core Rule

Do not claim `1:1`, `pixel-perfect`, or `pixel-faithful` unless a same-size screenshot comparison has been performed and the remaining differences are documented.

The goal is not only a numeric diff. The check must identify visible product drift: wrong image crop, missing module, placeholder icon, text overlap, density change, shifted navigation, or unsafe touch/safe-area layout.

Before pixel diff, check measured geometry. Pixel diff can look noisy because of shadows and media, but layout drift is often a simple coordinate error. A design with editable layers fails if major containers, tab bars, cards, or text baselines are not in the measured positions.

## Inputs

Prepare these files before checking:

- `reference`: approved raster screen or user-provided source image.
- `candidate`: exported Figma frame, HTML screenshot, or implementation screenshot.
- `frame`: logical size such as `393x852` or source size such as `1179x2556`.
- `scale`: usually `3x` when comparing `1179x2556` source to `393x852` Figma.
- `region map`: screen regions from the production brief or source segmentation.
- `measurement table`: source rectangles and Figma logical rectangles for key regions.

## Output Files

Save comparison artifacts when possible:

- `*-reference-normalized.png`
- `*-candidate-normalized.png`
- `*-diff.png`
- `*-diff-report.md`
- `*-layout-report.md`

## Comparison Levels

Use three levels:

- `manual visual check`: screenshot viewed next to reference. Required for every design handoff.
- `region checklist`: each major region is checked and marked pass/fail. Required before calling something high-fidelity.
- `layout geometry check`: measured rectangles, gaps, radii, and baselines are compared against the reference measurement table. Required before calling any image-to-Figma result 1:1.
- `pixel/threshold diff`: normalized images are compared with a diff image and metrics. Required before calling something pixel-faithful.

## Normalization Protocol

1. Export the candidate at the same logical size as the reference target.
2. If the reference is `3x`, resize it down to the Figma logical size or export the candidate up to source size. Use one scale consistently.
3. Preserve aspect ratio. Do not stretch either image to force a match.
4. Crop only if both images include the same intended frame but one has external canvas padding.
5. Compare with the same background color; transparent areas should be composited over the intended screen background.

## Region Checklist

Check these regions in order:

- Frame geometry: width, height, corner radius, clipping, safe areas.
- System chrome: status bar, home indicator, keyboard, host-app chrome.
- Header/navigation: title, tabs, top actions, search, location, back behavior.
- Hero/media: same image, same crop, same focal point, same radius, same scrim.
- Content cards: card size, spacing, shadow, radius, image placement, text hierarchy.
- Iconography: semantic icon, size, stroke weight, active/default states, badge.
- Forms/editor controls: input size, toolbar placement, selection state, disabled/loading state.
- Bottom navigation: height, hit area, selected state, labels, badge, floating action overlap.
- Typography: font size, weight, line height, truncation, text wrapping.
- Color and effects: brand/accent color, surface, shadows, blur, opacity.
- Edge states: empty/error/loading/permission/offline/success states when part of scope.

## Layout Geometry Check

Use the measurement table from `design-production-brief.md` or `figma-reconstruction.md`.

For each measured region, check:

- `x/y/w/h`: same logical coordinates within tolerance.
- `gap`: vertical and horizontal gaps between neighboring modules.
- `radius`: card, media, button, chip, and nav radius.
- `padding`: inner content positions relative to card/container.
- `baseline`: title, body, label, and tab label vertical alignment.
- `z-order`: overlays, scrims, badges, floating buttons, and bottom sheets.
- `clip`: media and container clipping is correct.
- `constraints`: repeated components do not resize or shift when labels change.

Suggested tolerances:

- Frame and safe area: exact.
- Header/nav/bottom tab: `0-2px`.
- Main cards and media: `0-3px`.
- Repeated cards/list rows: `0-3px`.
- Text baselines: `0-3px`, allowing font substitution.
- Icon geometry: `0-2px`.

If any core module is outside tolerance, mark it `major` and fix layout before visual styling.

## Failure Categories

Use these labels in diff reports:

- `blocking`: wrong screen, missing core module, wrong photo, unusable layout, text overlap, impossible interaction, full-screen screenshot used as editable result.
- `major`: visible crop drift, wrong icon semantics, large spacing/density shift, missing state, incorrect navigation, large typography mismatch.
- `minor`: small shadow/radius/line-height difference, icon optical alignment, tiny color drift, acceptable bitmap-composite limitation.
- `accepted`: documented difference that preserves user value and is intentionally not fixed in this pass.

## Pixel Diff Guidance

Use pixel diff as a support tool, not as the only authority. Generated images and Figma shadows may create harmless pixel noise, while wrong icons can look small numerically but matter semantically.

Recommended metrics:

- `dimension match`: candidate and reference must match exact width/height after normalization.
- `changed pixel ratio`: useful as a rough signal.
- `region diff`: more important than whole-screen diff.
- `bounding box of differences`: helps locate drift.
- `manual notes`: required for photos, text, icons, and layout semantics.

Suggested thresholds:

- For `pixel-faithful`: no blocking or major failures. Important regions visually match at phone scale.
- For `high-fidelity editable`: no blocking failures; major failures are listed as next-pass work.
- For `editable draft`: visible differences are acceptable only if the user asked for an early draft.

## CLI Workflow

Use available local tools. Prefer existing project tooling if present.

Before diffing, generate or update the measurement artifacts:

```bash
node scripts/measure-screenshot.js \
  --image assets/generated/01-home-reference.png \
  --regions specs/01-home-regions.json \
  --out specs/measurements/01-home
```

Preferred repo script:

```bash
npm install
node scripts/visual-diff.js \
  --reference assets/generated/01-home-reference.png \
  --candidate figma/screenshots/01-home.png \
  --out diff/01-home \
  --regions examples/regions.example.json \
  --threshold 0.08
```

The script writes:

- `reference-normalized.png`
- `candidate-normalized.png`
- `diff.png`
- `visual-diff-report.md`
- `visual-diff-report.json`

Use `--fail-above 0.03` when an automated pass should fail if more than 3% of pixels exceed the threshold. Pixel percentage is only a signal; still review major regions manually.

With ImageMagick:

```bash
magick reference.png -resize 393x852! reference-normalized.png
magick candidate.png -resize 393x852! candidate-normalized.png
magick compare -metric AE reference-normalized.png candidate-normalized.png diff.png
```

With FFmpeg for resizing:

```bash
ffmpeg -y -i reference.png -vf scale=393:852 reference-normalized.png
ffmpeg -y -i candidate.png -vf scale=393:852 candidate-normalized.png
```

With a Node script, use a PNG library if already installed in the workspace. Do not add heavy dependencies just for a one-off diff unless the project needs repeatable visual testing.

## Figma Screenshot Workflow

1. Use Figma screenshot/export for the editable frame, not the locked reference.
2. Download the screenshot to the workspace.
3. Normalize it against the approved reference.
4. Run region checklist.
5. Save a diff report near the Figma ledger.
6. Update the fidelity label.

## Diff Report Template

```md
# Visual Diff Report

Reference:
Candidate:
Frame:
Scale:
Fidelity label:

## Summary
- Overall result:
- Blocking issues:
- Major issues:
- Minor issues:

## Region Results
| region | status | notes | action |
| --- | --- | --- | --- |
| header | pass/fail |  |  |
| hero/media | pass/fail |  |  |
| bottom nav | pass/fail |  |  |

## Accepted Differences
- 

## Next Pass
- 
```

## Handoff Rule

When reporting to the user, say which level was performed:

- `Manual visual check only`
- `Region checklist completed`
- `Pixel diff completed`

If only manual review was performed, do not call the output pixel-faithful.
