# Delivery Package

Use this file when saving or handing off mobile app design work in the local workspace, Figma, GitHub, or a design package.

## Core Rule

Every design task should leave behind a package that another pass can inspect, continue, or publish. Do not scatter final images, Figma scripts, crops, and notes without a clear structure.

## Recommended Folder Structure

```text
project-name/
  README.md
  brief.md
  handoff.md
  assets/
    references/
    generated/
    crops/
    icons/
  figma/
    figma-build-script.js
    import-spec.md
    fidelity-ledger.md
    component-ledger.md
    screenshots/
  diff/
    visual-diff-report.md
    reference-normalized.png
    candidate-normalized.png
    diff.png
  html/
    index.html
    styles.css
  docs/
    state-matrix.md
    multi-screen-consistency.md
```

Use only the folders needed for the task. For a small design, `README.md`, `brief.md`, `assets/`, and `figma/` may be enough.

## Required Files

### README.md

Include:

- product concept
- target platform
- UI Notes industry category
- screens included
- output route
- Figma link/page if available
- local asset paths
- fidelity label
- known limitations

### brief.md

Use `design-production-brief.md`.

### handoff.md

Include:

- final screens
- component inventory
- asset inventory
- icon inventory
- state matrix summary
- accessibility notes
- implementation notes if relevant

### figma/import-spec.md

Include:

- frame size
- source raster size
- scale
- image node map
- component taxonomy
- layer classification
- upload/backfill instructions

### figma/fidelity-ledger.md

Include:

- Figma file/page
- locked references
- editable frames
- bitmap crops/composites
- components created
- icon pipeline status
- visual diff level
- remaining limitations

### diff/visual-diff-report.md

Use `visual-diff.md` when the user asked for high fidelity or 1:1.

## Naming Rules

Use stable names:

- `01-home-reference.png`
- `01-home-figma-screenshot.png`
- `01-home-diff.png`
- `icon-tab-home-selected.png`
- `crop-home-hero.png`
- `figma-build-script.js`
- `v1-fidelity-ledger.md`

Avoid:

- `final.png`
- `new-final.png`
- `test2.png`
- `screenshot.png` as the only saved name
- unnamed downloaded images

## Figma Link Rules

When Figma is written:

- Record file URL.
- Record page name.
- Record important frame IDs if available.
- Record screenshot paths.
- Record whether direct write succeeded or an import package was produced instead.

## GitHub / Publishing Rules

If publishing to GitHub:

- Keep generated images and docs in predictable folders.
- Include a README with clear purpose and examples.
- Do not include secrets, short-lived Figma asset URLs, access tokens, or private user data.
- Prefer source assets and specs over only screenshots.
- Include limitations and next-step roadmap.

## Package Acceptance Checklist

- README exists.
- Production brief exists.
- Final visual artifacts are saved.
- Figma script/spec/ledger exists when Figma is involved.
- Assets are organized into references/generated/crops/icons.
- Visual diff report exists when claiming pixel-faithful or 1:1.
- Handoff explains fidelity level and limitations.
- No temporary URLs or secrets are committed.
