# Prototype To Visual Design

Use this file when the user provides a wireframe, prototype, sketch, screenshot, Figma frame, or rough layout and asks for a mobile app design. The prototype is a structural source of truth, not just inspiration.

## Core Rule

When a user provides a prototype, preserve the user's intended information architecture and core workflow unless there is a clear mobile usability problem. Improve hierarchy, spacing, component quality, visual style, states, and platform fit; do not casually replace the product structure with a generic app pattern.

Use `prototype-constraints.md` to classify must-preserve, may-improve, must-not-change, and usability-override items before making visual changes.

## Prototype Reading Workflow

1. Identify the screen type: onboarding, home, feed, search, list, detail, editor, checkout, profile, settings, dashboard, or modal/sheet.
2. Extract the structure: navigation, content groups, primary action, secondary actions, repeated components, and bottom/top bars.
3. Infer the UI Notes industry and secondary task model from the prototype plus the user's text.
4. Create or update the production brief from `design-production-brief.md`. The prototype supplies structure; the brief supplies the production plan for screens, assets, icons, states, layers, prompts, and Figma reconstruction.
5. Decide what must be preserved:
   - Page purpose and user intent.
   - Primary workflow and CTA.
   - Required content blocks.
   - Navigation destinations.
   - Business-critical modules such as pay, upload, publish, chat, booking, or export.
6. Decide what should be improved:
   - Visual hierarchy, spacing, typography, contrast, icon clarity, touch targets, component states, empty/error/loading states.
   - Industry-fit style: trust, speed, density, media richness, or task focus.
   - Mobile platform conventions: safe area, status bar, home indicator, keyboard, sheets, gestures, permissions.
7. Produce the design artifact the user asked for.

## Visual Design Output Modes

Choose the strongest available output for the user's wording:

- If the user asks for a "设计图", "视觉稿", "高保真", "mockup", or "出图", create a visual design artifact, not only a written spec.
- If the user wants an image-based design, use direct raster image generation first. Do not default to HTML just to simulate a design image.
- If the user asks for Figma or design handoff/editability, convert the accepted raster direction into Figma when tools/context are available; otherwise provide a Figma-ready frame spec.
- If the user asks for a static concept image, generate or provide a high-fidelity raster mockup.
- If the user asks for an implementable preview, build a local mobile mockup page or app screen and verify it visually.
- If the user asks only for review or advice, provide annotated analysis and concrete improvement directions.

Do not call a text-only response a design图. A text-only response is a design spec or review, not a visual artifact.

## Fidelity Route

Default route for mobile design稿:

1. **Image first**: generate one or more standard phone-size raster screens to establish visual quality, composition, imagery, color, and mood.
2. **Figma second**: after the user accepts the image direction, reconstruct the screens in Figma as movable materials, editable layers, reusable components, annotations, and design handoff.
3. **HTML last**: use HTML only when the user needs an interactive preview, clickable prototype, responsive behavior check, or frontend implementation.

Why:

- Image generation usually gives the highest first-pass visual polish and image integration.
- Figma usually gives the highest design-file fidelity and editability after the visual direction is chosen, but only when the visible screen is rebuilt from selectable layers rather than pasted as a flattened screenshot.
- HTML is best for interaction and implementation, but it can lose visual nuance if used as the first design medium.

If the user explicitly asks for HTML first, follow that request, but still avoid calling it the final design图 unless it has been visually verified.

## Image To Figma Fidelity

When converting an approved raster screen into Figma, the raster screen is the pixel source of truth. Figma output must match the image's visible design and remain movable/editable before it is described as a finished Figma version.

Rules:

- Preserve the exact screen composition: layout, photo choices, crop, color mood, spacing, typography hierarchy, status bar, navigation, and bottom controls.
- Keep UI elements editable wherever they are UI: text layers for copy, vector/icon layers for glyphs, auto-layout or grouped components for cards/buttons/tabs/navigation, and separate chart/progress components for data visuals.
- Preserve photo-heavy and generated-result regions with the same original assets, extracted crops, or uploaded bitmap fills. Each bitmap region must be its own movable node with the correct crop, radius, scrim, and mask.
- Use a componentized hybrid structure when needed: editable text/shapes/components around bitmap photo containers. This is better than a visually wrong vector redraw or a flattened whole-screen screenshot.
- Default to a pixel-faithful editable structure: locked source image as reference, visible reconstructed phone frame as movable layers, shared component kit for repeated elements. The full-screen source image must not be the final visible deliverable layer.
- If exact vector editability conflicts with fidelity, keep that region as a movable bitmap crop and label it as bitmap-backed. Do not flatten the whole screen to hide the problem.
- Keep a locked reference image or reference frame in the Figma file during reconstruction, and compare the final editable Figma screenshot against it.
- Do not claim "1:1", "pixel-faithful", or "converted to Figma" if the final visible screen is only one pasted screenshot, or if photos, crops, density, or visual hierarchy changed materially. Call it a raster reference or editable draft instead.
- Before writing Figma layers, classify every region as layout, editable text, vector/icon, bitmap media, bitmap composite, effect, or system chrome. Use `references/workflow/figma-reconstruction.md` as the detailed execution manual.
- Do not replace media during reconstruction. If the generated image used a specific dog, dish, product, model, cover, map tile, or edited-photo result, the Figma file must use that exact asset or a crop from that exact source.

Recommended Figma conversion steps:

1. Upload the full raster screen as a locked reference beside the work frame or on a separate reference page.
2. Create a phone frame at the target size with no flattened screenshot as the final visible layer.
3. Produce a source segmentation map with coordinates, region type, intended Figma layer type, asset path, crop behavior, radius, shadow/scrim, and editability target.
4. Crop/reuse image regions from the original screen or source assets for media containers, one movable node per hero image, thumbnail, avatar, editor canvas, or generated result.
5. Build a component kit for repeated text styles, cards, charts, buttons, icons, navigation, tab bars, toolbars, and controls.
6. Assemble the visible screen from component instances, text layers, vector layers, and movable bitmap crops.
7. Capture a Figma screenshot and compare it with the approved raster image before final handoff.
8. Keep the locked reference in the file for audit, but do not present it as the editable screen.

Region-by-region replacement protocol:

- Start with global structure: status bar, safe areas, background, navigation, bottom controls, and major content groups.
- Build low-risk UI components first: buttons, pills, simple cards, tab labels, and metric text.
- Then build structured components: progress rings, charts, data cards, lists, toolbars, editor controls, and navigation.
- Place media/photo regions only with original assets or crops, never with abstract drawings.
- After each major region, capture or inspect the Figma result. If it drifts, adjust the component or crop until it matches.
- Report which regions are editable components, editable text/vector layers, or movable bitmap-backed assets.
- If a region must remain a bitmap composite, keep it limited to that region, name it clearly, and record why a cleaner split was not possible.

## Standard Phone Image Rules

When producing raster design images:

- Generate each app screen as a standard vertical phone screen. Use an iPhone-style aspect ratio around `9:19.5`, such as `1179x2556`, `1290x2796`, or an equivalent high-resolution vertical phone canvas.
- Do not compress multiple screens into one small overview board when the user expects usable design稿. Multi-screen requests should produce one full-size phone image per screen, or a Figma/local layout with each phone frame kept at full readable scale.
- A presentation board is allowed only as an additional overview. It must not replace the full-size phone images.
- Do not output square, landscape, poster, or collage images for a single mobile screen unless the user explicitly asks for that format.
- Preserve real mobile chrome and safe areas: status bar, navigation/header, content body, bottom tab/action area, and home indicator when relevant.
- Keep text, controls, icons, and product imagery readable at phone scale. If any text would become unreadable after resizing, regenerate the screen instead of accepting compression.
- Avoid "phone inside a phone" framing unless the user asks for a marketing mockup. For design稿, the image should be the actual phone screen itself.

## Design Upgrade Checklist

- Keep the prototype's core layout unless changing it is necessary for mobile usability.
- Replace placeholder boxes with real mobile components and realistic content.
- Replace image placeholders with generated or sourced bitmap assets when photos, covers, thumbnails, backgrounds, before/after examples, or empty-state illustrations are needed.
- Decide whether each image should fill the whole screen/section/card or remain a contained content image. Full-bleed and hero imagery should use intentional cropping, focal point, and contrast protection, not a small centered placement.
- Use the inferred industry's style rules for density, color/material, imagery/media, and motion.
- Define light/dark mode behavior when the app type needs it.
- Add missing states visible in the design set: loading, empty, error, permission denied, success, disabled, selected, and editing.
- Use realistic mobile chrome: status bar, safe areas, bottom navigation, toolbars, sheets, keyboard, and home indicator where relevant.
- For raster output, keep every screen at a standard phone aspect ratio and full readable scale.
- Ensure text fits and touch targets meet practical mobile size floors.

## Output Template

For prototype-based design work, include:

- Prototype interpretation: what the original layout is trying to do.
- Industry classification and style direction.
- Preserved structure: what stays from the prototype.
- Design upgrades: hierarchy, components, spacing, visuals, interaction, states.
- Visual artifact: design image, Figma frame, or local preview when requested.
- Fidelity route used: Image-first, Figma handoff, or HTML interactive preview.
- Raster image dimensions: target phone aspect ratio and whether each screen is a separate full-size image.
- Asset inventory: generated or sourced images, final workspace paths, and where each asset is used.
- Handoff notes: tokens, components, edge states, and open risks.
