# Visual Diff Check

Use this file before claiming a Figma reconstruction is 1:1. Passing build or seeing "roughly similar" is not enough.

## Required Inputs

- Approved raster screen path and dimensions.
- Figma file URL and frame name.
- Figma screenshot of the reconstructed visible frame.
- Layer audit proving the visible frame is editable and not one full-screen image.

## Check Sequence

1. Confirm the raster screen uses a standard phone ratio such as `393x852`, `1179x2556`, `1290x2796`, or another `9:19.5` equivalent.
2. Export or capture the Figma frame at the same logical aspect ratio.
3. Compare at least seven points:
   - screen size and safe areas
   - status/navigation/bottom chrome
   - primary image crop and focal point
   - color mood and contrast
   - text hierarchy and line breaks
   - spacing between major groups
   - icon placement and selected states
   - component radius and shadow
   - slider/chart/progress geometry
4. Inspect the Figma layer tree:
   - text layers exist for app copy
   - components or grouped patterns exist for repeated UI
   - images are separate movable crop nodes
   - locked full-screen reference is not the final visible screen
5. Record the fidelity ledger in the final response or handoff note.

## Fidelity Ledger Template

```text
Source image:
Figma file:
Frame:

Pixel/visual checks:
- Size/aspect:
- Safe area/chrome:
- Image crop/focal point:
- Color mood:
- Text hierarchy:
- Component spacing:
- Icon/tool state:
- Bottom controls:

Layer/editability checks:
- Text layers:
- Component instances/groups:
- Movable bitmap crops:
- Locked reference location:
- Full-screen screenshot used as visible layer: no

Result:
- Pass / Needs revision
- Remaining drift:
```

## Pass Standard

Pass only if all are true:

- The Figma screenshot would be accepted as the same visual design as the approved image.
- The visible deliverable frame is selectable/editable by region.
- Any bitmap-backed area is independently movable and honestly named.
- No important text, image, control, or bottom navigation is clipped or shifted.
- The screenshot comparison does not reveal meaningful drift in crop, spacing, hierarchy, or color.

## Fail Immediately If

- The visible frame is one pasted full-screen image.
- The photo or generated-result area changed subject, crop, lighting, or focal point.
- The Figma frame omits status bar, safe area, bottom controls, or primary action from the source.
- Text has different line breaks that change hierarchy.
- Components overlap or no longer meet mobile touch target expectations.
- A screen is squeezed into a board and becomes unreadable.

## Practical Thresholds

- Layout drift: keep major element positions within about `2-4px` at `393x852` scale unless the source image itself is ambiguous.
- Color drift: keep background, surface, text, and accent roles visually equivalent; do not "tastefully" shift to a different palette.
- Crop drift: subject face/product/dish/editor canvas must preserve focal point; small edge differences are acceptable only when the main subject is unchanged.
- Text drift: exact wording matters for UI labels. Generated-image gibberish should be replaced with intentional app copy while preserving hierarchy.
