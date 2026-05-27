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
| id | label | role | screen | state | source | size | color | Figma strategy | status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-home | 首页 | bottom tab | home | selected/default | vector | 24 | brand/neutral | Component / Icon / Home | final |
| tab-message | 消息 | bottom tab | home | default + badge | vector | 24 | neutral + badge | Component / Icon / Message | final |
```

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

## Acceptance Checklist

- Icon inventory exists.
- Every icon has a semantic role and state.
- Standard icons are vector or library-based.
- Custom icons are generated as a clean sheet or cropped from source.
- No final high-fidelity output uses placeholder circles.
- Icons are independent from labels.
- Badges are separate layers.
- Hit areas meet mobile touch floors.
- Figma ledger lists any temporary or bitmap-backed icon.
