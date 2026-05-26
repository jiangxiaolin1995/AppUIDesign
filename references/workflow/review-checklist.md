# Mobile UI Review Checklist

Use this before presenting a mobile app UI design as ready.

## Product Fit

- The target platform and design posture are explicit.
- If the user provided a prototype, the design preserves its intended workflow and information architecture unless a mobile usability issue is documented.
- If the user asked for a design image, visual mockup, high-fidelity screen, Figma frame, or "设计图", the output includes a visual artifact or a concrete visual-production plan, not only text.
- The UI Notes industry category is explicit and matches the user's primary daily task.
- The industry was inferred from the user's product description when the user did not name it directly.
- The visual style follows the inferred industry's needs for trust, speed, density, media richness, or task focus.
- Any secondary task model is documented, such as transaction, content feed, creation/editing, social exchange, utility lookup, habit loop, booking, or high-trust data entry.
- The benchmark set matches the industry instead of copying unrelated popular apps.
- Function-level references were checked for the screens that carry risk, such as onboarding, search, pay, posting, chat, empty states, settings, and permissions.
- The primary user goal is visible within the first screen.
- The primary action is visually clear and reachable.
- Secondary actions do not compete with the primary action.
- The design avoids marketing-page composition when the user needs a working app screen.

## Industry Fit

- The design supports the industry's core workflow, not just its visual style.
- Trust-heavy industries such as finance and medical include confirmation, privacy, risk, and recovery states.
- Transaction-heavy industries such as shopping, food and drink, and travel include search/filter, detail, payment or booking, status, and support paths.
- Content-heavy industries such as news, entertainment, music, books, and newspapers/magazines preserve reading or playback continuity.
- Creation-heavy industries such as photo/video and graphics/design preserve canvas priority, undo/redo, export, and permission states.
- Utility-heavy industries such as tools, reference, navigation, weather, and productivity keep entry fast and feedback clear.

## Navigation

- Top-level destinations are stable, limited, and easy to recognize.
- Back behavior is predictable for the platform.
- Tabs are used for peer sections, not global navigation.
- Modal, sheet, and dialog usage matches task weight.
- Search, filters, and sort controls preserve user context.

## Layout

- Safe areas, home indicator, status bar, host-app chrome, and fold/cutout constraints are handled.
- Spacing follows a consistent scale.
- Text does not overlap, truncate unexpectedly, or rely on viewport-scaled font sizes.
- Dense content remains scannable on a small phone.
- Tablet/foldable/landscape behavior is specified when relevant.

## Touch And Forms

- Interactive controls meet practical touch target floors.
- Adjacent targets have enough separation.
- Text fields use the right keyboard and input format.
- Validation messages are specific, local, and recoverable.
- Keyboard appearance does not hide critical actions.
- Gesture-only actions have visible alternatives.

## Components And States

- Each component has normal, pressed, loading, disabled, selected, error, and empty-state behavior where relevant.
- Destructive actions are clearly marked and separated from safe actions.
- Loading states distinguish initial load, refresh, pagination, and submission.
- Empty states explain what to do next.
- Error and offline states provide recovery paths.

## Visual And Content

- The chosen fidelity route matches the request: Image first for visual design, Figma for editable design handoff, HTML for interaction/implementation.
- Raster design images use a standard vertical phone aspect ratio, not square/landscape/collage output.
- Multi-screen raster output keeps each screen at full readable phone size; overview boards are supplemental only.
- The design image is the actual app screen unless a device-frame presentation was requested.
- Prototype placeholders have been converted into real mobile components and realistic content.
- Image placeholders that materially affect quality have been replaced with generated or sourced bitmap assets.
- Project-bound generated images are saved in the workspace and referenced from the design artifact.
- Food, product, people, place, cover, and media thumbnails look credible at mobile size.
- Hero/background images fill their intended container and use appropriate crop/focal point instead of sitting as small centered images.
- Text and controls over images have contrast protection such as gradient, scrim, blur plate, or safe placement.
- Images use proportional scaling; no accidental stretching, letterboxing, or layout jump.
- The style posture matches the inferred industry rather than a generic trendy mobile style.
- Density, color/material, imagery/media, and motion intensity are explicitly chosen.
- High-trust flows use restrained visuals, explicit copy, and confirmation before risky actions.
- Media-rich flows keep controls readable over images, artwork, or video.
- Creation/editing flows keep the canvas or workspace visually dominant.
- Typography hierarchy matches the screen density.
- Color roles are semantic and work in light and dark mode.
- Icons are familiar or labeled.
- Status is not communicated by color alone.
- Microcopy is short, specific, and action-oriented.

## Figma Fidelity And Editability

- If the user asked to convert a generated design image into Figma, the approved raster screen exists in the file only as a locked reference, not as the final visible deliverable.
- The final visible phone frame is assembled from movable Figma materials: component instances, editable text, vector icons, shapes, masks, and separate bitmap crops.
- Repeated UI is abstracted into components or reusable grouped patterns: navigation, tab bars, cards, buttons, chips, metric modules, charts, toolbars, and list rows.
- Photo, food, product, portrait, canvas, and generated-result regions reuse original assets or crops as independent movable bitmap nodes with correct crop, radius, scrim, and focal point.
- No flattened full-screen screenshot is presented as the editable Figma design.
- A Figma screenshot has been compared with the approved image for layout, crop, color, spacing, typography hierarchy, icon placement, and mobile chrome.
- Any region that remains bitmap-backed is named honestly and can still be moved, resized, or replaced as a separate layer.

## Accessibility

- Contrast meets WCAG AA baseline where applicable.
- Large text does not break layout.
- Screen-reader labels and roles are defined for custom controls.
- Focus order is logical.
- Audio/haptic cues have visual alternatives when they carry meaning.

## Handoff

- The component inventory is listed.
- Tokens or reusable values are named.
- Platform-specific exceptions are documented.
- Open questions are explicit.
- The design cites the relevant platform or design-system source when a rule comes from an external guideline.
