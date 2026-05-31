# Changelog

## 2026-05-29

This update turns `mobile-app-ui-design` from a mobile UI reference into a fuller design-production and Figma-reconstruction workflow.

### Added

- Industry-first mobile app judgment based on UI Notes `/app`, with secondary task models used only after the industry is identified.
- Tab-to-screen coverage rules: when designing an app with bottom tabs, each tab gets its own primary screen unless the user explicitly scopes the task to one page.
- Design source package workflow: screen size, layout rectangles, typography, spacing, components, images, icons, prompts, and Figma reconstruction rules are defined before final image generation.
- Source asset pack workflow for Figma: full-screen reference images, clean media assets, icon packs, crop specs, and asset manifests are prepared before writing Figma layers.
- Batch icon pipeline for navigation, toolbar, business-category, editor-tool, status/badge, and brand/custom icons.
- Screenshot measurement workflow with `measure-screenshot.js`, measurement reports, overlay images, and region maps.
- Manifest-driven Figma packet generation with `build-figma-packet.js`.
- Figma audit validation with `validate-figma-audit.js`.
- Asset manifest validation for media, bitmap icons, logical bounds, scale strategy, crop mode, and missing placeholder risks.
- Prompt templates for clean media assets, icon sheets, full-screen references, and manifest fill-in.

### Changed

- Figma output is now treated as a pixel-faithful editable reconstruction task, not a separate reinterpretation of the image.
- Full-screen raster screenshots are allowed only as locked references; final visible Figma frames must be rebuilt from movable text, components, vectors, and independent bitmap media.
- Bottom navigation must be rebuilt from components, labels, icons, states, badges, and safe-area layers.
- Image-heavy screens now require role decisions such as full-bleed, hero, card thumbnail, content image, cutout, or decorative support.
- Multi-screen work now requires consistency across tokens, navigation, icons, image style, component behavior, state language, and entity continuity.
- README now documents current capabilities, Figma handoff rules, file structure, and verification commands.

### Verification

Use these checks before publishing or after making new changes:

```bash
npm run check:scripts
npm run check:examples
rg -n "temporary placeholder markers" .
```

## 2026-05-31

### Added

- Measurement annotation handoff for image-to-Figma work: spacing/size labels can now be represented as structured JSON and as a separate `Measurement Overlay / {screen}` frame in Figma.
- `Measurement JSON / {screen}` spec panel support in the Figma reconstruction template, keeping annotation data visible and copyable in the Figma file.
- Example measurement annotation schema at `examples/measurement-annotations.example.json`.

### Changed

- Image-to-Figma reconstruction now keeps three concerns separate: locked source image, clean editable reconstruction, and measurement annotation handoff.
