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
    asset-manifest.json
    figma-packet.js
    figma-build-script.js
    import-spec.md
    figma-audit.json
    fidelity-ledger.md
    component-ledger.md
    screenshots/
  diff/
    visual-diff-report.md
    reference-normalized.png
    candidate-normalized.png
    diff.png
  scripts/
    crop-spec.json
    diff-regions.json
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

### figma/asset-manifest.json

Use `examples/asset-manifest.example.json` as the shape. It should be validated before Figma JS is written and should include:

- screen size and scale
- locked reference image
- clean media assets
- measured regions
- icon inventory
- fixed text boxes
- target Figma node names

### figma/figma-packet.js

Generate from the manifest with `scripts/build-figma-packet.js`. The Figma build script should read or paste this packet so coordinates and node names come from the manifest.

### figma/figma-audit.json

Save the audit returned by Figma JS when possible. Validate it with `scripts/validate-figma-audit.js` before claiming high-fidelity or 1:1 reconstruction.

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

### scripts and templates

For repeatable handoff work, prefer the repository scripts and templates:

- `scripts/export-crops.js`: exports bitmap crops from an approved source image using a JSON crop spec.
- `scripts/validate-asset-manifest.js`: checks source asset packs before Figma JS is written.
- `scripts/build-figma-packet.js`: converts a manifest into JS constants for Figma scripts.
- `scripts/validate-figma-audit.js`: checks Figma output for left/right pairs, image fills, and editable layer evidence.
- `scripts/visual-diff.js`: compares a reference image and candidate screenshot, then writes normalized images, a diff image, and Markdown/JSON reports.
- `scripts/check-links.js`: checks public reference links during source refresh.
- `templates/figma-reconstruction.js`: a reusable Figma JS starting point for locked references, editable frames, image nodes, vector icons, component-like groups, audit output, and optional manifest-driven base frame generation.

Copy scripts into a project package only when the project needs a self-contained handoff. Otherwise, reference them from this Skill repo and store only the project-specific specs and outputs.

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
- Asset manifest and Figma audit exist when claiming image-to-Figma fidelity.
- Assets are organized into references/generated/crops/icons.
- Visual diff report exists when claiming pixel-faithful or 1:1.
- Crop spec and diff region spec exist when scripts were used.
- Handoff explains fidelity level and limitations.
- No temporary URLs or secrets are committed.
