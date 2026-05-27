# Figma Component System

Use this file when rebuilding mobile app screens in Figma or creating an editable design system from generated images.

## Core Rule

Repeated UI must become reusable components or clearly named component-like groups. Do not rebuild every repeated card, tab, row, or button as unrelated loose rectangles.

The goal is practical editability: the user should be able to move, replace, retheme, and reuse parts of the design without destroying visual fidelity.

## Component Naming

Use this pattern:

- `Component / Bottom Nav`
- `Component / Bottom Nav Item / Home / Selected`
- `Component / Top Bar`
- `Component / Feed Card`
- `Component / Media Card`
- `Component / Form Row`
- `Component / Primary Button`
- `Component / Secondary Button`
- `Component / Topic Chip`
- `Component / Metric Cell`
- `Component / Editor Toolbar`
- `Component / Editor Tool / Selected`
- `Component / Sheet`
- `Component / Dialog`
- `Component / Empty State`

Avoid Figma names like `Group 12`, `Rectangle 4`, `Card copy`, or `Icon`.

## Base Component Set

Every mobile app Figma reconstruction should consider these components:

| component | use when | required variants/states |
| --- | --- | --- |
| Bottom Nav | top-level mobile navigation | selected, default, badge, disabled |
| Top Bar | title/action/search/back areas | default, scrolled, dark/over-media |
| Tab Segment | peer sections inside one screen | selected, default, scrollable |
| Card | repeated content modules | default, pressed, loading, empty |
| Media Card | card with image/video/product/cover | image loading, failed image, selected |
| List Row | settings, menu, search result, order row | default, pressed, disabled, with badge |
| Button | primary/secondary/tertiary/destructive | default, pressed, loading, disabled |
| Chip/Tag | topics, filters, categories | selected, default, removable, disabled |
| Form Row | input, picker, switch, uploader | focused, error, disabled, filled |
| Sheet/Dialog | confirmation, filters, share, report | default, loading, destructive |
| Toast/Snackbar | transient feedback | success, warning, error |
| Metric Cell | stats, finance, health, profile | up/down/neutral, empty |
| Toolbar | editor, creation, media, maps | selected tool, disabled tool, overflow |
| Empty State | no content/search/offline/permission | with CTA, no CTA |

## Component Properties

When using real Figma components or component-like groups, document these properties:

- `state`: default, selected, pressed, loading, disabled, error.
- `size`: compact, regular, large.
- `tone`: primary, neutral, danger, success, warning.
- `media`: none, image, avatar, icon, bitmap-composite.
- `badge`: none, dot, count, label.
- `platform`: iOS, Android, mini-program, cross-platform.
- `theme`: light, dark, over-media.

If the current Figma API path cannot create formal component variants reliably, use named groups and a component inventory in the ledger. Do not pretend variants exist if they were not created.

## Auto Layout Guidance

Use auto layout when it helps editability without damaging pixel fidelity:

- Buttons with text/icons.
- Chips and tags.
- Rows with leading icon/avatar, text, trailing action.
- Metric groups.
- Bottom navigation items.
- Toolbars.

Avoid auto layout when exact raster fidelity depends on manually tuned positions:

- Complex hero overlays.
- Generated bitmap composites.
- Dense visual cards copied from a raster source.
- Irregular collage layouts.

## Component Construction Rules

- Build component surfaces first: card, row, button, nav surface.
- Add text as editable text layers.
- Add icons as vector/icon components.
- Add media as independent bitmap crops.
- Group or componentize only after child layers are named.
- Keep repeated instances aligned to the same spacing/radius/token values.
- Record any component that remains a one-off because of source-image constraints.

## Bottom Navigation Component

Required child layers:

- `Component / Bottom Nav / Surface`
- `Component / Bottom Nav Item / {label}`
- `Component / Icon / {semantic}`
- `Text / Bottom Nav Label / {label}`
- `Component / Badge / {label}` if needed
- `System Chrome / Home Indicator` if drawn in the frame

Required checks:

- No placeholder circles.
- Selected and inactive states are visually distinct.
- Icons and labels are optically aligned.
- Badge attaches to the icon, not the whole tab.
- Hit area reaches mobile touch floors.

## Editor Toolbar Component

For photo/video/design/editor apps, toolbar components must include:

- Tool icon.
- Tool label if icon meaning is not obvious.
- Selected state.
- Disabled state.
- Undo/redo if the workflow supports destructive changes.
- Export/share path.
- Overflow or advanced settings.

Canvas must stay dominant; toolbar should not steal focus from the edited content.

## Component Ledger Template

```md
# Component Ledger

| component | screen | instances | variants/states | layer strategy | notes |
| --- | --- | --- | --- | --- | --- |
| Bottom Nav | all main screens | 3 | selected/default/badge | grouped editable layers | icons are vector |
| Feed Card | home | 6 | default/loading | component-like group | media is bitmap crop |
```

## Figma JS Requirements

Detailed Figma JS should:

- Define helper functions for each repeated component type.
- Return a `components` array in the audit result.
- Store shared plugin data on component-like groups:
  - `classification=component`
  - `componentName`
  - `states`
  - `source=generated/rebuilt/imported`
- Use semantic function names such as `createBottomNav`, `createFeedCard`, `createFormRow`, `createEditorToolbar`.
- Avoid copying a block of rectangle/text creation code five times for repeated elements.

## Acceptance Checklist

- Repeated UI is componentized or listed in a component ledger.
- Component names are semantic.
- States are documented.
- Icons, text, and media are independent child layers.
- Bitmap-backed regions are limited to media/composite areas.
- Figma JS returns component inventory.
- Any missing formal component variants are clearly labeled as grouped components, not hidden.
