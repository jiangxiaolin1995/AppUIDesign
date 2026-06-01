# Figma Reconstruction

Use this file when a generated mobile design image, user screenshot, prototype render, or approved visual mockup must be rebuilt in Figma. The goal is both visual fidelity and editability.

## Core Rule

The approved raster image is the visual source of truth. The Figma deliverable must match that image first, then expose the design as movable materials. Do not replace a beautiful image-led design with a simplified redraw, and do not paste one full-screen screenshot as the editable result.

Layer editability and layout fidelity are separate requirements. A Figma frame can have editable layers and still fail if the measured geometry is wrong. Do not start from approximate positions; build from a measurement table.

When a user asks to convert a generated image into Figma, the first Figma page must prove fidelity before reinterpretation:

1. Put the locked approved image on the left at the target logical phone size.
2. Put the reconstruction frame on the right at the exact same size.
3. Reuse exact source crops for every media/photo/complex region.
4. Rebuild text, icons, cards, charts, and controls as editable layers whenever clean separation is possible.
5. Rebuild user-facing UI as editable Figma layers. Text, cards, buttons, chips, navigation, chart marks, and icons must not be baked into bitmap slices in the final deliverable.
6. Use bitmap nodes only for true media: photos, illustrations, generated AI results, maps, covers, or complex non-UI artwork.
7. If clean media is missing, create/regenerate clean media assets or mark the media as an exception. Do not call bitmap slicing a finished editable 1:1 reconstruction.
8. Do not call an independently redesigned Figma screen a conversion or 1:1 reconstruction.

## Source Asset Pack Intake

Before writing or updating Figma, inspect the source asset pack:

| required item | purpose | failure if missing |
| --- | --- | --- |
| full-screen reference PNG per screen | locked left-side comparison source | no 1:1 claim allowed |
| clean media assets | right-side image fills for photos, thumbnails, maps, canvases, covers, AI results | grey boxes, changed photos, or bitmap-composite fallback |
| batch icon asset pack, custom icon sheet, or vector icon contract | accurate icon reconstruction | wrong glyphs, missing states, or placeholder circles |
| asset manifest | maps files to Figma node names, crop modes, focal points, radii, and overlay splits | layout and image backfill become guesswork |
| measurement table | maps source rectangles to Figma rectangles | componentized but misaligned result |

Rules:

- Load the asset manifest before creating image nodes.
- Create image fills from manifest files, not from unrelated replacement assets.
- For each manifest row, name the resulting node exactly as the target node or with a clear child suffix.
- After upload/backfill, check that each media and bitmap icon node uses `IMAGE` fill, expected scale mode, and expected mask/radius.
- Grey rectangles, gradient placeholders, empty fills, or different photos are blocking fidelity issues.
- If clean media does not exist, regenerate it or record the row as `asset-pack-partial`; do not silently replace it with a nearby-looking image.
- If generated or cropped icon assets do not exist, create them before Figma. Do not repair missing custom icons by drawing unrelated vector shapes during reconstruction.

## Reference Pair Requirement

Every image-to-Figma conversion page must start with a comparison pair:

```text
Locked Reference / 01 Home        Editable Reconstruction / 01 Home
[approved full-screen PNG]        [editable Figma layers]
```

Rules:

- Place the locked original on the left and the editable reconstruction on the right.
- Use identical logical phone size, safe area, status bar assumptions, and scale.
- Lock the left reference image and keep it visible until screenshot verification is done.
- The right frame must be built from editable text, shapes, vectors, components, and independent bitmap media nodes.
- Do not place only a gallery of editable screens without their paired originals when the user asked for 1:1 or image-to-Figma conversion.
- If the pair is absent, label the result `editable draft` even if the Figma layers are selectable.

## Layout Measurement Protocol

Use this protocol before writing Figma JS or dragging layers by hand.

1. Run `scripts/measure-screenshot.js` on the approved image or user screenshot. Save `measurement-report.json`, `measurement-report.md`, and `measurement-overlay.png` into the delivery package.
2. Record the source raster size and target Figma size.
3. Compute scale factors:
   - `scaleX = figmaWidth / sourceWidth`
   - `scaleY = figmaHeight / sourceHeight`
   - If they differ, document why and do not stretch media.
4. Create a measurement table for every visible region:
   - screen chrome
   - nav/header
   - hero/media
   - cards
   - repeated rows
   - buttons and chips
   - charts
   - bottom navigation
   - home indicator
5. For each region, record:
   - source rectangle: `sx`, `sy`, `sw`, `sh`
   - logical rectangle: `x`, `y`, `w`, `h`
   - parent/container
   - z-order
   - radius
   - stroke
   - shadow/effect
   - clip/mask behavior
   - text baseline or vertical alignment notes
   - media crop/focal point if applicable
6. Use measured rectangles to place component instances. A clean component master does not excuse wrong instance geometry.
7. After building each major region, compare against the locked reference before moving on.
8. If a region is visibly off, fix the coordinates, size, radius, padding, or crop before styling new regions.

CLI example:

```bash
node scripts/measure-screenshot.js \
  --image assets/generated/01-home-reference.png \
  --regions specs/01-home-regions.json \
  --out specs/measurements/01-home
```

If no region file exists yet, run the script once without `--regions`, inspect `measurement-overlay.png`, then create the region JSON for the main modules and rerun it.

Measurement table format:

| id | type | parent | source rect sx/sy/sw/sh | figma rect x/y/w/h | radius | z | strategy | tolerance | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hero-card | layout/media | screen | 28/214/796/534 | 13/99/367/247 | 22 | 20 | shape + media crop | 2px | pending |

Recommended tolerances for editable reconstruction:

- Frame size: exact.
- Major section y position: `0-2px`.
- Cards, bars, and tab containers: `0-3px`.
- Text baseline: `0-3px`, allowing font substitution differences.
- Icon size/position: `0-2px`.
- Media crop focal point: visually same; geometry `0-3px`.
- Shadows and generated lighting: visually close; document if not exact.

Any geometry drift above tolerance is a `major` issue unless intentionally documented.

## Measurement Annotation Overlay And JSON

When the user asks to "标注间距", "把数字放图上", "产出 JSON", or when a Figma reconstruction needs explicit implementation measurements, create a measurement coordinate contract in addition to the clean editable reconstruction. The point is not only to annotate the screenshot. The point is to create a pixel source that the Figma script can use to place layers accurately.

Figma structure:

```text
Locked Reference / 01 Screen
Editable Reconstruction / 01 Screen
Measurement Overlay / 01 Screen
Measurement JSON / 01 Screen
```

Rules:

- `Measurement Overlay / ...` is a same-size frame used for screenshot communication. It may show red/blue guide lines, bracket ticks, and compact labels such as `30px`, `Nav 88px`, or `Button 330 x 96px`.
- `Measurement JSON / ...` is a separate text/spec panel containing the same values in structured JSON. This panel is for implementation, review, and later Figma JS updates.
- `elements[]` is the Figma coordinate contract. It contains the actual measured rectangles for containers, text boxes, icons, media, badges, rows, and controls.
- `annotations[]` is the visual explanation layer. It contains guide lines and labels for human communication. Do not use annotation-line rectangles as UI node rectangles unless the annotation is explicitly also an element.
- Do not draw measurement guides inside the final `Editable Reconstruction / ...` frame. The clean UI must stay usable as a design source.
- The overlay and JSON must share the same ids. If the overlay has `bottom_actions.button_gap`, the JSON must contain the same key and value.
- Record the unit and basis: source raster px, logical Figma px, scale factor, or visual-estimate. If values are estimated from a screenshot, mark `measurementConfidence: "visual-estimate"` or `measurementConfidence: "approximate"`.
- Include both section-level sizes and gaps: safe areas, nav height, content margins, hero/card size, module gaps, row/card height, repeated spacing, badge sizes, CTA sizes, and bottom safe area.
- In the asset manifest or Figma script, reference measured elements by `measurementRef`. If a node has `measurementRef: "search.bar"`, the script should use `elements["search.bar"].rect` for `x/y/width/height`.
- If both `item.rect` and `measurementRef` exist, `measurementRef` wins unless the script explicitly documents a local override.
- If `basis` is `source-raster-px`, convert to the target Figma frame with one documented scale before placement. Do not mix source pixels and logical Figma pixels in the same contract.

Recommended JSON shape:

```json
{
  "screen": {
    "id": "01-import-safety",
    "name": "未准入境商品",
    "unit": "px",
    "basis": "logical-figma-frame",
    "measurementConfidence": "approximate"
  },
  "annotations": [
    {
      "id": "page.margin.left",
      "label": "30px",
      "type": "spacing",
      "value": 30,
      "orientation": "horizontal",
      "from": "screen.left",
      "to": "content.left",
      "rect": { "x": 0, "y": 142, "width": 30, "height": 1 }
    },
    {
      "id": "bottom_actions.primary.size",
      "label": "330 x 96px",
      "type": "size",
      "value": { "width": 330, "height": 96 },
      "target": "Component / Bottom Action / primary",
      "rect": { "x": 48, "y": 1700, "width": 330, "height": 96 }
    }
  ],
  "elements": [
    {
      "id": "search.bar",
      "type": "component",
      "targetNode": "Component / Search Bar",
      "rect": { "x": 28, "y": 520, "width": 728, "height": 60 },
      "radius": 30,
      "figmaStrategy": "shape + editable icon + editable placeholder text"
    },
    {
      "id": "risk_badge.first",
      "type": "component",
      "targetNode": "Component / Risk Badge / high",
      "rect": { "x": 646, "y": 696, "width": 82, "height": 36 },
      "radius": 18,
      "figmaStrategy": "shape + editable text"
    }
  ],
  "groups": {
    "safe_area": { "top_safe": 24, "bottom_safe": 34 },
    "navigation": { "nav_height": 88 },
    "page_margin": { "left": 30, "right": 30 },
    "bottom_actions": { "button_width": 330, "button_height": 96, "button_gap": 22 }
  }
}
```

Overlay drawing rules:

- Use annotation layers named `Measurement / {id}`.
- Use reconstructed UI nodes named from `elements[].targetNode` or from manifest rows that reference `elements[].id`.
- Keep labels compact and high contrast, usually red guide lines with a small white label backing.
- Put labels outside dense text where possible. If the screenshot is crowded, use short ids in the overlay and put the full explanation in JSON.
- If a measurement is estimated, include `~` in the overlay label or mark `estimated: true` in JSON.
- When exporting a screenshot for communication, use the measurement overlay frame, not the clean editable frame.

Figma JS placement rules:

- Build a lookup map from `elements[]` and `annotations[]`.
- For UI nodes, read `measurementRef` first and use the referenced element rect.
- Use `annotations[]` only for measurement guide layers and labels.
- Record every coordinate source in the audit, for example `{ nodeName, measurementRef, rectSource: "measurement-elements" }`.
- If a measured element is missing, fail for required UI nodes or mark the node as `coordinate-assumption` in the audit.

## Detail Media Fidelity Protocol

Use this protocol for every detail image, not only large heroes. Small media is often where a reconstruction stops looking like the approved design.

Create one ledger row for each photo, avatar, thumbnail, cover, product shot, map, editor canvas, generated result, mascot, badge illustration, and rich decorative detail:

| id | role | source | source rect sx/sy/sw/sh | bleed | figma rect x/y/w/h | crop mode | focal point | mask/radius | overlays | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| feed-thumb-01 | thumbnail | approved screen crop | 672/1240/384/252 | 6px | 224/413/128/84 | cover | dog face center | r12 | none | pass |

Rules:

- Prefer original standalone assets when available. If not, crop from the approved screen at source resolution.
- Add `2-8px` source-pixel bleed when shadows, rounded corners, hairlines, glows, or object edges sit near the crop boundary, then clip inside Figma to the measured rectangle.
- Preserve the same focal point. Face, product, dish, pet, map route, before/after result, and editor subject must remain in the same visual position.
- Preserve the same mask, radius, scrim, tint, shadow, and overlay stack. UI labels and buttons over media should be editable layers unless they are genuinely printed into a poster or photo.
- Reject crops with accidental baked UI text, doubled labels, wrong subject, watermarks, image-model artifacts, or changed photos. Regenerate or repair the asset before calling the frame faithful.
- Name media nodes `Bitmap Crop / {screen} / {role}` and store the crop id in shared plugin data when using Figma JS.

If a region mixes media and UI controls, split it: keep the photo/generated artwork as `bitmap-media`, then rebuild controls, text, badges, gradients, and chips above it as editable layers. If splitting would destroy the approved appearance, mark the region as `Bitmap Composite / ...` and record why.

## Layout Stability Gate

Editable layers are not enough if the frame falls apart when the user selects, edits, or replaces a part. Run this gate after Figma creation.

- Every top-level module and repeated component instance uses a measured `x/y/w/h`, not auto-layout guesses copied from a clean master.
- Text nodes have fixed boxes, intentional wrapping/clipping, and line heights that match the reference. Do not let dynamic text resize cards unless the reference design requires it.
- Media nodes preserve aspect ratio and crop mode. Replacing a crop should not resize or move the surrounding card.
- Icon groups have stable bounding boxes and optical centers inside their hit areas.
- Badges are anchored to the intended icon or avatar, not to the whole navigation item or card.
- Containers with masks, shadows, blurs, and rounded corners clip consistently in the same place as the source image.
- Component masters may be tidy, but placed instances must keep measured padding, gaps, and size. If the master differs from the reference, override the instance and note it.

In the audit result, include `layoutStability: pass|warning|fail` and list any shifted node ids or regions.

## Asset Extraction Boundary

When the user says to "抠图" for Figma reconstruction, interpret it as extracting source materials, not slicing UI screenshots into panels.

Extract as bitmap:

- Photos, hero media, avatars, product shots, covers, maps, posters, generated results, rich illustrations, mascots, non-reproducible textures, and complex lighting effects.

Rebuild as Figma layers/components:

- Containers, cards, sheets, buttons, chips, navigation bars, bottom tabs, text, icons, charts, progress rings, tables, rows, badges, controls, safe-area chrome, and home indicators.

If a container has a special texture or lighting that cannot be rebuilt, separate the effect as a small bitmap/effect layer while keeping the container geometry editable.

Bottom tabs require a componentized reconstruction: tab bar container, tab item components, vector icons, editable labels, selected/default states, optional badges, and safe-area/home-indicator layers. A bottom tab screenshot crop is a failure for finished editable reconstruction.

## Fidelity Levels

Use these labels honestly in handoff notes:

- `Design image`: a polished raster screen. It may be visually strong but is not editable Figma.
- `Editable draft`: a Figma reconstruction with movable layers, but visible differences remain in layout, crop, icons, typography, or density.
- `High-fidelity editable`: Figma layers are editable and broadly match the approved image at phone scale. Some minor icon, shadow, or spacing drift may remain and must be listed.
- `Pixel-faithful`: a Figma screenshot was compared against the approved raster at the same logical size, and major regions match: screen geometry, media crop, color, typography hierarchy, icon placement, spacing, bottom nav, and safe areas. Any bitmap-composite regions are documented.
- `Temporary bitmap-composite fallback`: the approved image is reconstructed from movable bitmap-composite regions because no clean underlying assets exist. This is a diagnostic or bridge artifact only; it is not a finished editable 1:1 Figma reconstruction.

Do not use `1:1`, `pixel-perfect`, or `pixel-faithful` for an editable draft. If no screenshot comparison was performed, the highest allowed label is `high-fidelity editable`.

## Required Output Structure

Every image-to-Figma conversion must contain:

- Locked reference frame: the full approved screen image at the same logical frame size.
- Editable reconstruction frame: the visible deliverable, rebuilt from layers.
- Measurement overlay frame when spacing labels are requested or useful: same logical size, visible guides/labels, and separate from the clean editable UI.
- Measurement JSON/spec panel when an overlay exists: a structured text block with the same ids and values used by the overlay.
- Component kit or reusable groups: navigation, tabs, chips, cards, buttons, lists, metrics, editor tools, sheets, and repeated content modules.
- Icon inventory and batch ledger: one explicit row for every tab icon, toolbar icon, action icon, badge, empty-state icon, and custom glyph. Each row states the batch, state, source, asset file if bitmap-backed, target node, optical center, and badge anchor.
- Bitmap crop assets: one separate image node for each photo, media thumbnail, avatar, editor canvas, generated result, product shot, cover, or complex illustration region.
- Fidelity ledger: what is editable, what is bitmap-backed, what was intentionally preserved as a crop, and what limitations remain.
- Route declaration: `editable 1:1 reconstruction`, `editable reconstruction with media exceptions`, or `temporary bitmap-composite fallback`.

Use `figma-component-system.md` to decide component names, states, component-like groups, and component ledger requirements.

## Layer Classification

Before drawing, classify every visible region:

- `layout`: backgrounds, cards, sheets, separators, grids, safe areas, nav containers, button surfaces, tab indicators.
- `editable-text`: titles, labels, metadata, counters, body copy, prices, status copy, chip text, CTA labels.
- `vector-icon`: icons, simple glyphs, badges, progress strokes, controls, rating marks, simple charts.
- `bitmap-icon`: generated or cropped custom icon assets that remain independent and movable in Figma.
- `bitmap-media`: photos, food/product images, pet or people photos, covers, thumbnails, generated AI results, editor canvases, illustrations, map tiles, posters.
- `bitmap-composite`: a complex region that mixes image, lighting, blur, shadows, or generated texture and cannot be cleanly separated without changing the visual. This is allowed only as a movable region, never as the whole screen.
- `effect`: scrim, blur plate, shadow, tint overlay, gradient fade, mask, clipped rounded container.
- `system-chrome`: status bar, home indicator, safe area, native tab bar, keyboard, permission prompt, host-app chrome.

If a region contains user-facing UI text, do not keep that text inside a bitmap unless separating it would visibly damage the approved design. When that exception is used, label the layer `Bitmap Composite / ...` and record the reason in the ledger.

## Generation-Time Layer Planning

Do this before creating the first raster screen. The image generation prompt should not be the only source of truth.

1. Draft the target screen as a layer plan: chrome, navigation, tabs, cards, media, copy, icons, overlays, sheets, and states.
2. Mark every region as `editable-vector`, `editable-text`, `bitmap-media`, `bitmap-composite`, or `effect`.
3. Create an icon inventory and batch ledger before generation. Do not let the image model invent generic circles for tab icons or action icons.
4. Decide which visuals need separate assets:
   - full reference screen
   - clean photo/media assets
   - avatars and thumbnails
   - complex hero composites
   - navigation, toolbar, category, editor, status, and brand/custom icon batches
5. Ask the image model for icon sheets and clean media assets before the app screen when those assets are custom. Then ask for the app screen to use the same icon style and layout contract. The screen image establishes composition; the asset sheets support faithful Figma reconstruction.
6. If the user supplied a prototype or screenshot, preserve the original navigation count, tab meanings, and major spatial relationships. Do not simplify a five-tab app into five circles.

## Bitmap Fallback Is Not Completion

Use this fallback only when the approved visual is a flattened raster and clean assets are unavailable. It is not considered a finished response to a user asking for editable 1:1 Figma layers.

1. Keep the full raster as `Locked Reference / ...`.
2. Segment the source image by meaningful modules: chrome, nav, hero, metrics, content list, tab bar, bottom sheet, modal, toolbar, or editor canvas.
3. Crop each segment at source resolution and upload it as a separate asset.
4. Reassemble the reconstruction from these crop assets at the same logical coordinates.
5. Name each layer `Bitmap Composite / Screen / Region`.
6. Store source metadata on the node when possible: source screen, crop region, scale, and classification.
7. Add a fidelity ledger explaining which parts are bitmap-backed and why.
8. Preserve or create a separate editable reconstruction so the user still has editable text/components to work from.
9. Continue toward a true editable reconstruction by regenerating clean media assets or replacing bitmap-composite UI regions with Figma text, vectors, shapes, and components.

This fallback is acceptable only as a temporary visual bridge. It is not a substitute for a clean asset-backed editable reconstruction when the user expects every text label, component, icon, and chart to be editable.

## Editable 1:1 Reconstruction Standard

For a finished editable 1:1 reconstruction:

- Status/system chrome may be rebuilt as text/vector, or omitted only if the target platform expects live system chrome.
- Navigation bars, tab bars, toolbars, and bottom sheets are shape/vector/text layers.
- Cards, chips, buttons, tags, progress rings, bars, charts, and list rows are shape/vector/text layers.
- Container fills, strokes, radii, shadows, blur plates, scrims, masks, and padding are recreated as Figma properties or effect layers, not cropped from the screenshot.
- Bottom navigation is built from tab item components with editable vector icons and labels.
- All user-facing text is editable text unless it is part of a real poster/photo/media asset.
- Icons are vectors/components or exact bitmap icon crops only when the source icon is custom and cannot be drawn faithfully.
- Photos, hero images, thumbnails, avatars, covers, editor canvases, AI results, and rich illustrations are independent bitmap media nodes with matching crop/mask/focal point.
- The full reference image remains locked beside the reconstruction.
- A fidelity ledger lists any media exceptions and any remaining drift.
- A layout measurement table exists and the reconstructed frame was checked against it.

## Icon Handling Rules

Icons are product controls, not decoration. Treat them as first-class assets.

For detailed icon source decisions, generated icon sheets, source-raster crops, vector reconstruction, bottom navigation rules, and badge handling, use `icon-pipeline.md`.

- For standard icons such as home, search, back, close, share, notification, message, profile, settings, cart, map, filter, play, camera, undo, export, and plus, rebuild them as vector icons or import from the project's icon library. Do not approximate them with circles, emoji, or unrelated glyphs.
- For custom brand icons such as paw tabs, mascot marks, creator-tool icons, game icons, or stylized category marks, either generate a clean icon asset sheet at the same time as the screen or crop the exact icon from the source raster.
- Prefer generating the clean icon asset sheet before the final screen, then reference the same icon style in the screen prompt and manifest.
- For bottom tabs, every tab must have the correct semantic icon and selected/unselected states. Placeholder circles are allowed only in wireframes, never in a high-fidelity Figma handoff.
- In Figma, bitmap-backed custom icons must become independent `Bitmap Icon / ...` nodes with `IMAGE` fills; vector-backed icons must become grouped `Component / Icon / ...` nodes.
- Preserve icon size, stroke weight, optical alignment, active color, inactive color, badge placement, and hit area.
- Keep icons independent from labels so the user can move, recolor, or replace them in Figma.
- If an icon is cropped from the raster source, name it `Bitmap Icon / ...`; if it is rebuilt, name it `Vector / ...` or `Component / Icon / ...`.
- If a faithful icon cannot be produced in the current pass, mark it as a fidelity issue in the ledger instead of silently substituting a different shape.

Icon accuracy gate:

| id | role | expected glyph | source | state | box | stroke/fill | optical center | badge anchor | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-discover | bottom tab | compass | vector/library | default | 24x24 | 2px neutral stroke | 12/12 | none | pass |

- Check semantic meaning first: `发现` should not reuse a home icon, `发布` should not become a random circle, and `消息` needs a message/chat glyph with badge support when the source has a badge.
- Check geometry second: icon visual size, stroke/fill weight, active/inactive color, optical center, and badge position should match the approved image within the icon tolerance.
- Check state third: selected/default/disabled/pressed variants should not accidentally share the same color or fill behavior.
- If the icon is custom and cannot be redrawn accurately, use an exact bitmap icon crop or generate a clean icon sheet. Record it as bitmap-backed; do not replace it with a nearby library icon.
- A high-fidelity handoff fails if any final icon layer is named `Placeholder / ...` or uses an unrelated glyph without a ledger warning and user-facing note.

## Asset Crop Rules

Use original source assets when available. If only the full raster screen exists, crop media regions from that screen.

- Crop at source resolution, then place at logical Figma size.
- Preserve aspect ratio; no non-proportional stretching.
- Match the original focal point, corner radius, mask shape, scrim, shadow, and overlay.
- Use cover behavior for hero images, feed thumbnails, product cards, restaurant photos, travel cards, and community media.
- Use contain behavior only for editor canvases, before/after comparisons, document previews, QR codes, maps that must show exact bounds, and objects where cropping destroys meaning.
- Do not substitute a different photo during Figma reconstruction. If the photo is wrong, regenerate or crop the correct source first.
- Keep each avatar/photo/media area as its own movable bitmap node so it can be replaced later.
- For detail crops, inspect the resulting crop at the intended Figma size and at 2x zoom. Reject fuzzy crops, edge clipping, distorted subjects, broken rounded corners, and visible mismatches with the locked reference.

## Size Matching Rules

The raster and Figma frame must share a clear scale:

- Recommended raster sizes: `1179x2556`, `1290x2796`, or equivalent portrait `9:19.5`.
- Recommended logical Figma sizes: `393x852`, `430x932`, or the exact device frame requested.
- Document the scale, usually `3x`.
- All position, radius, typography, and crop values are recorded in logical Figma pixels, not source pixels.
- Do not compress multiple screens into one small artboard as the only design handoff.

## Platform And Big-App Heuristics

Use platform and large-company references as decision inputs, not as templates to copy.

- Apple HIG: respect safe areas, familiar hierarchy, platform chrome, readable text, high-resolution imagery, and at least `44x44pt` practical hit areas.
- Android and Material: keep Android targets around `48x48dp`, preserve content descriptions, use clear state feedback, and adapt layout to compact/medium/expanded contexts when needed.
- Ant Design Mobile and Alibaba/Ant patterns: use modular mobile components, clear feedback, configurable themes, business-flow certainty, and restrained but polished components.
- Tencent TDesign and WeUI patterns: for mini-program, super-app, H5-in-mobile, and service-entry flows, prefer familiar cells, sheets, dialogs, toasts, uploaders, tabs, dark-mode readiness, and multi-stack consistency.
- Meituan practice: for service/food/local-life products, keep a standard color palette, icon library, real-data filling, reusable business components, and theme adaptation across host apps.
- JD/NutUI practice: for retail and commerce-heavy flows, preserve visual product richness, promotion density, cross-platform H5/mini-program consistency, search/filter/detail/cart/payment paths, and component reuse.
- ByteDance Arco/Semi-style systems: for high-throughput tools and creator products, use lightweight modern defaults, theme customization, internationalization, and component-to-code clarity.

These heuristics decide dimensions and behavior. They must not lead to copying another company's brand, exact component styling, screenshots, or proprietary assets.

## Figma Script Template

The Figma JavaScript must be explicit enough that another pass can inspect and fix it. Do not write a tiny script that hides layout decisions in magic numbers or unnamed nodes.

Minimum requirements:

- Define constants for frame size, scale, safe areas, spacing, radius, colors, typography, and asset keys.
- Define measured layout rectangles in a `MEASUREMENTS` object and place nodes from it. Avoid freehand numeric coordinates scattered through the script.
- Define `DETAIL_MEDIA` and `ICON_MAP` objects for crop ids, icon roles, states, sources, expected bounds, and fallback warnings.
- Load fonts up front and use only loaded font names.
- Use helper functions for fills, text, frames, cards, media, icons, badges, and component-like groups.
- Name every node by role: `Locked Reference /`, `Editable Screen /`, `Component /`, `Text /`, `Vector /`, `Bitmap Crop /`, `Bitmap Composite /`, `Effect /`, `System Chrome /`.
- Put asset keys in shared plugin data so image nodes can be found and backfilled after upload.
- Return a structured audit object: page id, frame ids, image node ids, component ids, icon inventory, layer counts, warnings, and next verification steps.
- Return detail-media and layout-stability status in the audit object, including any crop mismatch, placeholder icon, or measured-geometry drift.
- Never set `figma.currentPage = page`; use `await figma.setCurrentPageAsync(page)`.
- Do not silently substitute placeholder circles for icons. If a proper icon cannot be drawn, add a warning and name the layer as a placeholder.

Use a script shape like this for `use_figma`. Replace image hashes after uploading assets, or create placeholders first and use the returned `imageNodes` map for `upload_assets`.

For repeatable work, start from `templates/figma-reconstruction.js`. Keep project-specific copies in the delivery package, usually at `figma/figma-build-script.js`, so the exact build can be inspected and rerun.

```js
const SPEC = {
  pageName: "Mobile App / Editable Reconstruction",
  frame: { width: 393, height: 852, radius: 34 },
  source: { width: 1179, height: 2556, scale: 3 },
  safeArea: { top: 48, bottom: 34 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  color: {
    bg: "#FFFDF9",
    surface: "#FFFFFF",
    surfaceSoft: "#F4F7F2",
    text: "#172019",
    textMuted: "#7A827A",
    line: "#E8ECE7",
    brand: "#7EBE42",
    accent: "#FF6B5F",
    warning: "#F59E0B",
    dark: "#111827",
    white: "#FFFFFF"
  },
  font: {
    regular: { family: "Inter", style: "Regular" },
    medium: { family: "Inter", style: "Medium" },
    bold: { family: "Inter", style: "Bold" }
  }
};

const ASSETS = {
  referenceHome: { kind: "locked-reference", description: "Full approved home screen" },
  homeHero: { kind: "bitmap-composite", description: "Hero photo region; use exact source crop" },
  feedAvatar1: { kind: "bitmap-media", description: "Author avatar 1" },
  feedPhoto1: { kind: "bitmap-media", description: "Feed card photo 1" }
};

const ICONS = [
  { key: "home", label: "Home", role: "bottom-tab", source: "vector", states: ["selected", "default"] },
  { key: "discover", label: "Discover", role: "bottom-tab", source: "vector", states: ["default"] },
  { key: "publish", label: "Publish", role: "bottom-tab", source: "vector", states: ["default"] },
  { key: "message", label: "Message", role: "bottom-tab", source: "vector", states: ["default", "badge"] },
  { key: "profile", label: "Profile", role: "bottom-tab", source: "vector", states: ["default"] }
];

const MEASUREMENTS = {
  screen: { x: 0, y: 0, w: 393, h: 852 },
  header: { x: 20, y: 44, w: 353, h: 52, tolerance: 2 },
  heroCard: {
    source: { sx: 28, sy: 214, sw: 796, sh: 534 },
    figma: { x: 13, y: 99, w: 367, h: 247 },
    radius: 22,
    type: "layout + bitmap-media",
    tolerance: 3
  },
  bottomNav: {
    source: { sx: 0, sy: 1650, sw: 853, sh: 194 },
    figma: { x: 0, y: 763, w: 393, h: 89 },
    radius: 28,
    type: "component",
    tolerance: 2
  }
};

const imageHashes = {
  referenceHome: "",
  homeHero: "",
  feedAvatar1: "",
  feedPhoto1: ""
};

const audit = {
  pageId: null,
  frames: [],
  imageNodes: {},
  components: [],
  icons: ICONS,
  warnings: [],
  layerCounts: {},
  verification: [
    "Check every node against MEASUREMENTS before visual diff.",
    "Export each editable frame at 393x852.",
    "Compare against the locked reference: chrome, hero, media, typography, bottom navigation, and safe areas.",
    "Do not claim 1:1 until region-level drift is checked."
  ]
};

await Promise.all([
  figma.loadFontAsync(SPEC.font.regular),
  figma.loadFontAsync(SPEC.font.medium),
  figma.loadFontAsync(SPEC.font.bold)
]);

function solid(hex, opacity = 1) {
  const n = parseInt(hex.replace("#", ""), 16);
  return {
    type: "SOLID",
    color: {
      r: ((n >> 16) & 255) / 255,
      g: ((n >> 8) & 255) / 255,
      b: (n & 255) / 255
    },
    opacity
  };
}

function imageFill(hash, fallback = SPEC.color.surfaceSoft) {
  if (!hash) return [solid(fallback)];
  return [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
}

function setIntent(node, classification, data = {}) {
  node.setSharedPluginData("mobile_app_ui_design", "classification", classification);
  for (const [key, value] of Object.entries(data)) {
    node.setSharedPluginData("mobile_app_ui_design", key, String(value));
  }
  return node;
}

function add(parent, child) {
  parent.appendChild(child);
  return child;
}

function createPage(name) {
  const page = figma.createPage();
  page.name = name;
  return page;
}

function createPhoneFrame(name, x, y, fill = SPEC.color.bg) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(SPEC.frame.width, SPEC.frame.height);
  node.cornerRadius = SPEC.frame.radius;
  node.clipsContent = true;
  node.fills = [solid(fill)];
  setIntent(node, name.startsWith("Locked Reference") ? "locked-reference" : "editable-screen");
  return node;
}

function createRect(name, x, y, w, h, fill = SPEC.color.surface, radius = SPEC.radius.md) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.cornerRadius = radius;
  node.fills = fill ? [solid(fill)] : [];
  return node;
}

function createMedia(parent, key, name, x, y, w, h, radius, options = {}) {
  const node = createRect(
    `Bitmap ${options.composite ? "Composite" : "Crop"} / ${name}`,
    x,
    y,
    w,
    h,
    options.fallback || SPEC.color.surfaceSoft,
    radius
  );
  node.fills = imageFill(imageHashes[key], options.fallback || SPEC.color.surfaceSoft);
  setIntent(node, options.composite ? "bitmap-composite" : "bitmap-media", {
    assetKey: key,
    crop: options.crop || "FILL",
    description: options.description || ASSETS[key]?.description || ""
  });
  add(parent, node);
  audit.imageNodes[key] = node.id;
  return node;
}

function createText(name, value, x, y, size, color = SPEC.color.text, font = SPEC.font.medium, width = null) {
  const node = figma.createText();
  node.name = name;
  node.fontName = font;
  node.fontSize = size;
  node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.28) };
  node.fills = [solid(color)];
  node.characters = value;
  node.x = x;
  node.y = y;
  if (width) {
    node.resize(width, node.height);
    node.textAutoResize = "HEIGHT";
  }
  setIntent(node, "editable-text");
  return node;
}

function createLine(name, x, y, width, color = SPEC.color.textMuted, weight = 2) {
  const node = figma.createLine();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(width, 0);
  node.strokes = [solid(color)];
  node.strokeWeight = weight;
  node.strokeCap = "ROUND";
  setIntent(node, "vector-icon");
  return node;
}

function createEllipse(name, x, y, w, h, fill = null, stroke = null, weight = 2) {
  const node = figma.createEllipse();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = fill ? [solid(fill)] : [];
  if (stroke) {
    node.strokes = [solid(stroke)];
    node.strokeWeight = weight;
  }
  setIntent(node, "vector-icon");
  return node;
}

function createBadge(parent, name, x, y, value) {
  add(parent, createEllipse(`Component / Badge / ${name}`, x, y, 16, 16, SPEC.color.accent));
  add(parent, createText(`Text / Badge / ${name}`, value, x + 5, y + 2, 9, SPEC.color.white, SPEC.font.bold));
}

function groupAsComponent(parent, nodes, name, classification = "component") {
  const group = figma.group(nodes, parent);
  group.name = `Component / ${name}`;
  setIntent(group, classification);
  audit.components.push({ id: group.id, name: group.name, classification });
  return group;
}

function iconHome(parent, cx, cy, color) {
  const nodes = [];
  const roofLeft = createLine("Vector / Icon / Home / roof left", cx - 10, cy - 1, 10, color, 2.2);
  roofLeft.rotation = -38;
  nodes.push(add(parent, roofLeft));
  const roofRight = createLine("Vector / Icon / Home / roof right", cx, cy - 7, 10, color, 2.2);
  roofRight.rotation = 38;
  nodes.push(add(parent, roofRight));
  const body = createRect("Vector / Icon / Home / body", cx - 8, cy, 16, 13, null, 3);
  body.fills = [];
  body.strokes = [solid(color)];
  body.strokeWeight = 2.2;
  setIntent(body, "vector-icon");
  nodes.push(add(parent, body));
  return groupAsComponent(parent, nodes, "Icon / Home", "vector-icon");
}

function iconMessage(parent, cx, cy, color, badgeValue = null) {
  const nodes = [];
  const bubble = createRect("Vector / Icon / Message / bubble", cx - 12, cy - 9, 24, 18, null, 8);
  bubble.fills = [];
  bubble.strokes = [solid(color)];
  bubble.strokeWeight = 2;
  setIntent(bubble, "vector-icon");
  nodes.push(add(parent, bubble));
  const tail = figma.createPolygon();
  tail.name = "Vector / Icon / Message / tail";
  tail.pointCount = 3;
  tail.x = cx + 3;
  tail.y = cy + 5;
  tail.resize(8, 7);
  tail.rotation = 30;
  tail.fills = [solid(color)];
  setIntent(tail, "vector-icon");
  nodes.push(add(parent, tail));
  if (badgeValue) {
    const badge = createEllipse("Component / Icon Badge / Message", cx + 9, cy - 16, 16, 16, SPEC.color.accent);
    const badgeText = createText("Text / Icon Badge / Message", badgeValue, cx + 14, cy - 14, 9, SPEC.color.white, SPEC.font.bold);
    nodes.push(add(parent, badge), add(parent, badgeText));
  }
  return groupAsComponent(parent, nodes, "Icon / Message", "vector-icon");
}

function createBottomNav(parent, activeKey = "home") {
  add(parent, createRect("Component / Bottom Navigation / Surface", 0, 772, SPEC.frame.width, 80, SPEC.color.surface, 28));
  const items = [
    { key: "home", label: "首页", x: 52, icon: iconHome },
    { key: "discover", label: "发现", x: 130, icon: iconHome, warning: "Replace with compass icon if this app uses discovery." },
    { key: "publish", label: "发布", x: 208, icon: iconHome, warning: "Replace with product-specific publish icon." },
    { key: "message", label: "消息", x: 286, icon: iconMessage, badge: "9" },
    { key: "profile", label: "我的", x: 364, icon: iconHome, warning: "Replace with profile icon." }
  ];
  for (const item of items) {
    const active = item.key === activeKey;
    const color = active ? SPEC.color.brand : "#BFC4BF";
    if (item.warning) audit.warnings.push(`Icon placeholder: ${item.key}. ${item.warning}`);
    item.icon(parent, item.x, 804, color, item.badge);
    add(parent, createText(`Text / Bottom Nav Label / ${item.label}`, item.label, item.x - 12, 828, 11, active ? SPEC.color.brand : SPEC.color.textMuted, active ? SPEC.font.bold : SPEC.font.medium));
  }
}

function createLockedReference(page, key, name, x, y) {
  const ref = createPhoneFrame(`Locked Reference / ${name}`, x, y, "#F3F4F6");
  createMedia(ref, key, `${name} Full Raster`, 0, 0, SPEC.frame.width, SPEC.frame.height, SPEC.frame.radius, {
    composite: true,
    description: "Full reference image. Locked audit layer only."
  });
  ref.locked = true;
  page.appendChild(ref);
  audit.frames.push({ id: ref.id, name: ref.name, locked: true });
  return ref;
}

function createEditableScreen(page, name, x, y) {
  const screen = createPhoneFrame(`Editable Screen / ${name}`, x, y);
  page.appendChild(screen);
  audit.frames.push({ id: screen.id, name: screen.name, locked: false });
  return screen;
}

function countLayers(root) {
  const counts = {};
  function visit(node) {
    counts[node.type] = (counts[node.type] || 0) + 1;
    if ("children" in node) node.children.forEach(visit);
  }
  visit(root);
  return counts;
}

const page = createPage(SPEC.pageName);
await figma.setCurrentPageAsync(page);
audit.pageId = page.id;

const ref = createLockedReference(page, "referenceHome", "01 Home", 120, 120);
const screen = createEditableScreen(page, "01 Home", 120 + SPEC.frame.width + 32, 120);

createMedia(screen, "homeHero", "Home Hero", 16, 168, 361, 170, 18, {
  composite: true,
  description: "If this crop already contains title/CTA/avatar overlays, do not duplicate those as editable layers."
});
add(screen, createText("Text / App Name", "App Name", 22, 58, 28, SPEC.color.text, SPEC.font.bold));
add(screen, createText("Text / Segment / Active", "推荐", 38, 113, 18, SPEC.color.brand, SPEC.font.bold));
add(screen, createRect("Component / Segment Indicator", 50, 148, 32, 4, SPEC.color.brand, 2));
add(screen, createRect("Component / Card / Feed Item", 16, 422, 361, 150, SPEC.color.surface, 18));
createMedia(screen, "feedAvatar1", "Feed Author Avatar", 28, 438, 36, 36, 18);
add(screen, createText("Text / Feed Author", "用户名", 76, 438, 15, SPEC.color.text, SPEC.font.bold));
createMedia(screen, "feedPhoto1", "Feed Photo", 214, 438, 142, 112, 14);
createBottomNav(screen, "home");

const ledger = figma.createText();
ledger.name = "Fidelity Ledger / Script Audit";
ledger.fontName = SPEC.font.regular;
ledger.fontSize = 13;
ledger.lineHeight = { unit: "PIXELS", value: 18 };
ledger.characters = [
  "Layer plan: locked reference + editable reconstruction.",
  "Image nodes expose shared assetKey data for upload/backfill.",
  "Icons are semantic vector groups; warnings list any placeholders.",
  "Do not claim 1:1 until exported screenshot is compared with the locked reference."
].join("\\n");
ledger.resize(620, 120);
ledger.x = 120;
ledger.y = 120 + SPEC.frame.height + 56;
ledger.fills = [solid(SPEC.color.textMuted)];
page.appendChild(ledger);

audit.layerCounts[ref.name] = countLayers(ref);
audit.layerCounts[screen.name] = countLayers(screen);

figma.viewport.scrollAndZoomIntoView([ref, screen]);

return audit;
```

## Visual Difference Check

Do not claim `1:1` without a comparison step.

For detailed normalization, region checklist, pixel diff, failure categories, and report templates, use `visual-diff.md`.

1. Capture or export the editable Figma frame at the same logical size as the reference.
2. Compare against the approved raster screen region by region: chrome, header, hero/media, content cards, text blocks, tab bar, floating actions, safe areas.
3. Check for the common drifts:
   - changed photo or focal crop
   - duplicated text over a bitmap region
   - simplified shadows that alter depth
   - text width, line height, or weight mismatch
   - icons replaced by unrelated symbols
   - card radius or spacing drift
   - bottom navigation height or safe-area mismatch
   - image letterboxing or unintended center-fit behavior
4. Fix the largest visible mismatch first. Fidelity beats arbitrary layer purity.
5. Record remaining bitmap-backed regions and why they exist.

Suggested tolerance:

- Critical regions such as headers, hero images, bottom nav, editor canvas, product/food photos, and primary CTA should be visually indistinguishable at phone scale.
- Minor icon glyph differences may be acceptable only if the meaning, size, weight, and position match.
- A different image, changed crop, changed density, or missing module means the result is not `1:1`.

## Acceptance Checklist

- The visible deliverable is not one full-screen bitmap.
- The locked reference is present and separate.
- Text is editable wherever possible.
- Cards, chips, buttons, tabs, nav, forms, stats, charts, and toolbars are components or grouped editable layers.
- Every photo/media/generated-result area is a separate movable bitmap node.
- No image is stretched, letterboxed unintentionally, or replaced by a different photo.
- Frame size, safe area, status bar, home indicator, and bottom controls match the source.
- The layer names reveal intent: `Component /`, `Text /`, `Bitmap Crop /`, `Vector /`, `Effect /`, `Locked Reference /`.
- The fidelity ledger explains any bitmap-composite exceptions.
- The final screenshot has been compared to the approved image before handoff.
