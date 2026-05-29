# Image Crop Spec

Use this file when generated mobile screens include photos, products, food, portraits, covers, maps, editor canvases, before/after results, or thumbnails that must survive Figma reconstruction.

## Core Rule

Preserve real imagery as real imagery. Do not redraw photo-heavy regions with generic shapes, and do not replace approved photos with unrelated new photos during Figma conversion.

## Source-Informed Principles

- Apple guidance emphasizes safe areas, high-resolution assets, and preserving image aspect ratio without distortion.
- Android and Material guidance emphasizes adaptive layouts, flexible images, and touch targets that remain usable across devices.
- Tencent TDesign and WeUI reinforce component consistency across mobile stacks and common mobile modules such as uploader, cells, dialogs, and action sheets.
- Ant Design Mobile reinforces mobile component vocabulary and business-product values such as natural, certain, meaningful, and growing.
- Meituan's mobile UI consistency work highlights the cost of inconsistent UI resources and the value of standard colors, icons, components, and design-to-code mapping.
- JD retail/NutUI sources reinforce retail image clarity, component consistency, H5/mini-program delivery, and promotion-heavy commerce scenarios.

These sources help choose size, density, crop behavior, and component constraints. They are not a license to copy another company's visual style.

## Crop Types

| Type | Use For | Figma Handling |
| --- | --- | --- |
| `hero` | screen-leading image, restaurant/product/profile/fitness/photo editor hero | one movable bitmap crop with mask, radius, scrim if text overlays |
| `canvas` | AI editor image, before/after result, camera preview, map/content workspace | movable bitmap crop; UI controls rebuilt above it |
| `thumbnail` | cards, menu items, album covers, presets, search results | repeated crop nodes or component slots |
| `avatar` | social, profile, coach, creator, comment | circular or rounded bitmap nodes, never flattened into card |
| `product` | shopping SKU, promo item, retail shelf | crop preserves object edge, label, and commerce context |
| `food` | dish, restaurant cover, order card | appetizing crop, bright enough, no distorted plates |
| `generated-result` | AI output, retouched photo, template preview | preserve exact result; controls/text stay editable |
| `background` | immersive top area or full-bleed mood image | full container cover crop with contrast protection |

## Naming

Use stable names so later Figma scripts can target the region:

```text
assets/
  01-home-reference.png
  01-home-hero.png
  01-home-card-restaurant-01.png
  02-editor-canvas-before-after.png
  02-editor-avatar-before.png
  03-result-generated-photo.png
```

Figma node names should mirror the asset:

```text
Bitmap Crop / 02-editor-canvas-before-after
Bitmap Crop / 01-home-card-restaurant-01
Bitmap Crop / 03-result-generated-photo
```

## Crop Workflow

1. Keep the original full screen in `assets/reference/` or as `*-reference.png`.
2. Identify every visual region that would be wrong if redrawn: faces, food, products, generated results, editor canvas, maps, covers, thumbnails.
3. Crop each region from the approved screen or reuse the original source asset.
4. Save crops at 2x or 3x of the Figma display size when possible.
5. Preserve aspect ratio. Never stretch horizontally or vertically.
6. In Figma, place each crop as its own rectangle/image-fill node.
7. Apply the same radius, mask, focal point, scrim, overlay, and shadow as the source.
8. Rebuild labels, buttons, icons, charts, and controls as editable layers above or around the crop.

## Detail Crop Quality Gate

Use this gate for small or detail-heavy visual regions before uploading crops to Figma.

| check | pass condition |
| --- | --- |
| source match | crop comes from the approved screen or original asset, not a similar replacement |
| bleed | source crop includes enough extra pixels for shadows, rounded corners, hairlines, and edge details |
| focal point | subject position matches the reference at phone size |
| mask | radius, circle crop, special shape, and clipping match the reference |
| overlays | text, buttons, icons, and chips are rebuilt as editable layers unless genuinely part of the media |
| quality | no visible stretch, blur, watermark, image-model artifact, edge clipping, or wrong subject |
| naming | asset and Figma node share a stable semantic id |

Inspect the crop at the target display size and at 2x zoom. Detail crops that fail this gate should be regenerated, repaired, or marked as a blocking fidelity issue. Do not hide the failure by placing a new unrelated photo.

For source-pixel cropping, add `2-8px` bleed around the measured region when possible, then apply the exact measured mask in Figma. This protects soft shadows and rounded edges without changing the visible layout.

## Crop Script

Use `scripts/export-crops.js` when crop coordinates are known or can be measured from the approved source image.

Example:

```bash
npm install
node scripts/export-crops.js --spec examples/crop-spec.example.json
```

The crop spec supports source-pixel coordinates or logical Figma coordinates:

```json
{
  "source": "assets/generated/01-home-reference.png",
  "outDir": "assets/crops",
  "coordinateSpace": "logical",
  "scale": 3,
  "crops": [
    {
      "name": "01-home-hero",
      "type": "hero",
      "x": 24,
      "y": 150,
      "width": 345,
      "height": 160,
      "radius": 18,
      "figmaHandling": "Place as one movable image-fill rectangle with matching radius"
    }
  ]
}
```

The script writes:

- individual crop PNG files
- `crop-ledger.json`
- `crop-ledger.md`

Use the ledger in the Figma import spec so every bitmap crop has a clear source, coordinate system, scale, and intended Figma handling.

## Platform Size Rules

- iOS target: use `393x852`, `390x844`, `402x874`, `430x932`, or matching `@3x` exports such as `1179x2556` and `1290x2796`.
- Android target: keep density-independent layout thinking; controls must reserve at least `48x48dp` touch area.
- Cross-platform target: design at one canonical phone size, then document how images crop or reflow for compact, medium, and expanded widths.

## Image Quality Checklist

- Subject is clear at mobile size.
- Important face/product/dish/canvas content is not cropped away.
- Crop is proportional and not stretched.
- Resolution is high enough for Retina/high-density display.
- Text and controls over images have a scrim, gradient, blur plate, or safe placement.
- Decorative images do not compete with the primary task.
- Functional images have an accessibility purpose or label in implementation notes.
- Generated image artifacts, stray text, watermarks, or wrong logos are rejected.
- Small thumbnails, avatars, badges, and detail illustrations match the approved reference and are not treated as disposable placeholders.
- Crops that include UI overlays have a clear reason; otherwise overlays are rebuilt as editable text, icons, chips, buttons, or badges above the media.

## Industry Notes

- **Photo/video and graphics/design**: canvas first; preserve before/after image exactly; tool UI floats above image and remains editable.
- **Food and drink**: dish images must fill card/hero frames, look bright and appetizing, and avoid clutter near price/CTA.
- **Shopping**: product photos need consistent angle, clean background, visible SKU distinction, and space for price/promotions.
- **Social/community**: avatars and content thumbnails are identity-bearing; preserve face crop and avoid accidental replacement.
- **Medical/finance**: imagery should be restrained and secondary; avoid decorative photos that reduce trust or readability.
