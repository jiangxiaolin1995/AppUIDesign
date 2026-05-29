# Icon Pipeline

Use this file when designing, generating, extracting, or rebuilding icons for mobile app screens and Figma handoff.

## Core Rule

Icons are functional UI controls. They must be planned, named, and reconstructed with the same seriousness as layout and text.

Do not use placeholder circles, emoji, unrelated glyphs, or vague decorative marks in high-fidelity app designs. If an icon is temporary, label it as temporary and list it in the warnings.

## Icon Source Decision

Choose the source in this order:

1. Existing project icon library or design system component.
2. Standard vector reconstruction in Figma JS.
3. Source-raster crop when the approved image has a specific custom icon that must match.
4. Generated icon sheet for custom brand icons, mascots, stickers, badges, and illustrated category marks.
5. Temporary placeholder only for wireframe or editable draft, never final high-fidelity handoff.

Before choosing a source, identify the icon's exact meaning. A visually neat glyph is wrong if the semantic role is wrong. For example, discovery, publish, message, profile, camera, upload, scan, filter, map, cart, favorite, undo, and export each need distinct shapes and states.

## Batch Icon Asset Pack

For Figma-bound screens, create the icon source package before generating the final screen image. Do not wait until Figma reconstruction to decide what each icon means.

Use batches so generation, cropping, manifest rows, and Figma upload stay organized:

- `navigation`: bottom tabs, top tabs, back, close, menu, profile.
- `toolbar`: search, notification, filter, sort, share, settings.
- `business-category`: product categories, course categories, pet tags, food categories, ticket categories.
- `editor-tool`: camera, crop, brush, eraser, undo, redo, layers, compare, export, scan.
- `status-badge`: success, warning, error, info, membership, level, unread badge.
- `brand-custom`: logo marks, mascots, custom paws, stickers, campaign symbols.

For each batch, output a ledger and assets:

```md
| batch | icon id | label | role | state | source | asset file | target node | logical box | scale mode | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| navigation | tab-home | 首页 | bottom tab | selected | vector | none | Component / Icon / tab-home / selected | 24x24 | vector | final |
| navigation | tab-course | 课程 | bottom tab | default | generated-sheet | assets/icons/navigation/tab-course-default.png | Bitmap Icon / tab-course / default | 24x24 | FIT | final |
```

The ledger is part of the source asset pack. Every `generated-sheet`, `exact-source-crop`, or `bitmap-icon` row must have a real file path before Figma upload. Every `vector` row must have a Figma function or component name before Figma JS is written.

### Batch Generation Rules

- Generate custom icon sheets separately from full screens.
- Keep one icon per grid cell, with enough padding for cropping.
- Use transparent background when possible; otherwise use a flat high-contrast background only for cropping.
- Generate selected/default variants together when the icon shape changes by state.
- Do not put labels, tab containers, badges, or UI chrome inside the icon sheet.
- Use the same visual language as the screen: stroke weight, corner shape, fill depth, lighting, and active color.
- Crop each icon into its own file before Figma; do not upload the whole sheet as the visible icon.
- Keep icon files named by role and state, for example `icon-navigation-tab-home-selected.png`.

### Standard vs Custom Split

Standard system icons should usually become editable vectors in Figma. Still include them in the batch ledger, because their size, state, optical center, badge anchor, and target node must be known before the final screen prompt.

Custom or brand-heavy icons can remain bitmap-backed if the exact visual style matters. They must be independent movable nodes named `Bitmap Icon / ...`, not part of the full-screen screenshot or a card screenshot.

## Standard Icons

Use vector/icon-library sources for common controls:

- navigation: home, back, close, menu, tab, profile
- utility: search, filter, sort, settings, share, notification
- transaction: cart, order, pay, coupon, location
- media/editor: camera, image, crop, brush, eraser, undo, redo, layers, compare, export
- social: like, comment, favorite, follow, message, report, block
- status: success, warning, error, info, loading, offline

Do not ask image generation to create these unless the style is intentionally custom and the icon sheet is part of the deliverable.

## Custom Icons

Generate or crop custom icons when the product needs:

- brand marks
- mascots
- pet paws or community-specific tab icons
- illustrated category icons
- sticker-like badges
- game or entertainment icons
- custom creator/editor tool glyphs
- campaign or membership symbols

Generated custom icons should be on a clean transparent or flat background, one icon per slot, consistent stroke/fill style, no baked labels, no watermarks, and no extra UI.

## Icon Inventory Template

```md
| id | label | role | expected glyph | screen | state | source | box | stroke/fill | optical center | badge anchor | Figma strategy | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-home | 首页 | bottom tab | home/house | home | selected/default | vector | 24x24 | 2px stroke | 12/12 | none | Component / Icon / Home | final |
| tab-message | 消息 | bottom tab | chat bubble | home | default + badge | vector | 24x24 | 2px stroke | 12/12 | top-right of icon | Component / Icon / Message | final |
```

Inventory rows are required for every toolbar action, bottom tab, chip icon, card action, category glyph, badge symbol, empty-state icon, and custom brand mark. If the row is missing, the Figma layer is not ready for high-fidelity handoff.

## State Requirements

For each icon, define:

- default
- selected
- pressed
- disabled
- loading, if applicable
- badge/count, if applicable
- danger/destructive, if applicable
- dark mode variant, if applicable

The icon itself may look smaller than the touch target, but the hit area must meet practical mobile floors: at least `44pt` for iOS-like apps and `48dp` for Android-like apps.

## Figma Naming

Use explicit names:

- `Component / Icon / Home`
- `Vector / Icon / Home / roof`
- `Bitmap Icon / Brand Paw / selected`
- `Component / Tab Badge / Message`
- `Text / Tab Badge / Message`
- `Component / Bottom Nav Item / Home`

Avoid:

- `Ellipse 12`
- `Icon`
- `Group 5`
- `circle`
- `placeholder`

If a layer is temporary, include it in the name:

- `Placeholder / Icon / Discover / needs replacement`

## Figma JS Vector Pattern

Use grouped vector nodes for standard icons. Each icon should be its own component-like group and should not depend on a text glyph unless the glyph is the intended icon source.

```js
function makeIconGroup(parent, nodes, name, meta = {}) {
  const group = figma.group(nodes, parent);
  group.name = `Component / Icon / ${name}`;
  group.setSharedPluginData("mobile_app_ui_design", "classification", "vector-icon");
  group.setSharedPluginData("mobile_app_ui_design", "iconName", name);
  for (const [key, value] of Object.entries(meta)) {
    group.setSharedPluginData("mobile_app_ui_design", key, String(value));
  }
  return group;
}

function iconSearch(parent, cx, cy, color, stroke = 2) {
  const ring = figma.createEllipse();
  ring.name = "Vector / Icon / Search / ring";
  ring.x = cx - 8;
  ring.y = cy - 8;
  ring.resize(16, 16);
  ring.fills = [];
  ring.strokes = [solid(color)];
  ring.strokeWeight = stroke;

  const handle = figma.createLine();
  handle.name = "Vector / Icon / Search / handle";
  handle.x = cx + 6;
  handle.y = cy + 6;
  handle.resize(8, 0);
  handle.rotation = 45;
  handle.strokes = [solid(color)];
  handle.strokeWeight = stroke;
  handle.strokeCap = "ROUND";

  parent.appendChild(ring);
  parent.appendChild(handle);
  return makeIconGroup(parent, [ring, handle], "Search", { source: "vector" });
}
```

## Raster Crop Protocol

Use this when the icon already exists in the approved raster and must match exactly.

1. Crop at source resolution with padding.
2. Keep transparent background if possible.
3. Save as `icon-{screen}-{role}-{state}.png`.
4. Upload as a separate Figma asset.
5. Place as `Bitmap Icon / ...`, not `Bitmap Crop / photo`.
6. Record why it is bitmap-backed in the ledger.

Raster icons are acceptable for custom marks, but standard controls should become vector in later cleanup.

## Generated Icon Sheet Protocol

When generating a custom icon sheet, prompt for:

- flat asset sheet, not an app screen
- transparent or plain light background
- consistent stroke/fill style
- one icon per grid cell
- no labels or text inside icons
- no watermarks
- no device frame
- enough padding around each icon
- selected and default variants if needed

After generation:

1. Inspect the sheet.
2. Crop each icon into its own file.
3. Name each file by semantic role and state.
4. Place into Figma as independent nodes or recreate as vector if simple enough.

## Figma Manifest Fields For Icons

Every icon row in the asset manifest should include:

- `id`
- `batch`
- `label`
- `role`
- `glyph`
- `source`: `vector-library`, `figma-vector`, `generated-sheet`, `exact-source-crop`, or `bitmap-icon`
- `file`, required for generated or cropped bitmap icons
- `targetNode`
- `state`
- `logicalBox`
- `strokeFill`
- `opticalCenter`
- `badgeAnchor`
- `scaleMode`
- `required`

Example:

```json
{
  "id": "tab-progress",
  "batch": "navigation",
  "label": "进度",
  "role": "bottom tab",
  "glyph": "chart-line",
  "source": "figma-vector",
  "targetNode": "Component / Icon / tab-progress / default",
  "state": "default",
  "logicalBox": { "width": 24, "height": 24 },
  "strokeFill": "2px stroke, inactive #B8C0B0",
  "opticalCenter": { "x": 12, "y": 12 },
  "badgeAnchor": "none",
  "scaleMode": "vector",
  "required": true
}
```

## Figma Upload And Backfill

When an icon is bitmap-backed:

1. Create an empty target node with the exact measured bounds.
2. Upload the PNG/SVG through the Figma asset upload flow.
3. Set the node fill to `IMAGE` with `FIT` unless the icon intentionally fills an irregular mask.
4. Keep the icon independent from the label and hit-area frame.
5. Record the resulting node id and image fill in the Figma audit.

When an icon is vector-backed:

1. Create the vector or import the library icon before assembling the tab or toolbar.
2. Group its sublayers as `Component / Icon / {id} / {state}`.
3. Add shared plugin metadata for role, source, state, and optical center.
4. Put the icon group inside a larger hit-area component.

## Bottom Navigation Rules

Bottom nav is a common failure point. Apply these rules:

- Every tab must have a semantic icon and label.
- Active icon and label must share active color.
- Inactive icons must use consistent stroke/fill and opacity.
- Badges attach to the icon, not the whole tab.
- The center publish/create tab may be a special FAB only if the reference/product calls for it.
- Do not use five circles as final icons.
- Do not use the same icon for all tabs.
- Keep icon optical size consistent even when shapes differ.
- Keep a separate hit-area frame for each tab item. The visible icon may be `20-28px`, but the tab item should preserve the measured tappable region.
- If the approved reference uses a custom center action, reconstruct it as a FAB or special tab component with its own icon, label, shadow, and safe-area relationship.
- Badges and dots must be separate editable layers anchored to the icon's measured corner.

## Icon Fidelity Gate

Run this before marking a Figma file as high-fidelity or 1:1.

1. Semantic check: every icon's meaning matches its label and action.
2. Source check: standard icons are vector/library; custom icons are exact crops or clean generated sheet assets.
3. Geometry check: visual box, stroke/fill weight, optical center, active/inactive color, and badge placement match the approved reference.
4. State check: selected, default, pressed, disabled, and badge states exist when the product uses them.
5. Naming check: no final layer is named `Placeholder / ...`, `Ellipse`, `circle`, or a generic `Icon`.

If any standard icon cannot be accurately drawn in the current pass, stop at `editable draft` and list the icon in warnings. Do not call the output 1:1.

## Acceptance Checklist

- Icon inventory exists.
- Batch icon asset pack exists for any screen with Figma output.
- Every icon has a semantic role and state.
- Every icon has an expected glyph/source decision before Figma creation.
- Standard icons are vector or library-based.
- Custom icons are generated as a clean sheet or cropped from source.
- Bitmap-backed icons are independent `Bitmap Icon / ...` nodes and have `IMAGE` fills after upload.
- No final high-fidelity output uses placeholder circles.
- No tab bar reuses one generic icon for multiple different destinations.
- Icons are independent from labels.
- Badges are separate layers.
- Icon bounding boxes, optical centers, colors, stroke/fill style, and badge anchors were checked against the reference.
- Hit areas meet mobile touch floors.
- Figma ledger lists any temporary or bitmap-backed icon.
