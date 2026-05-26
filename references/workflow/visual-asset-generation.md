# Visual Asset Generation

Use this file when a mobile app design needs polished bitmap assets: food photos, product photos, people, places, empty-state illustrations, backgrounds, covers, posters, thumbnails, mock content, or generated-result examples.

## Core Rule

If the design would look unfinished with placeholder boxes, generic CSS shapes, or abstract gradients, generate or source real visual assets. For visual mockups and high-fidelity screens, do not substitute CSS drawings for food, people, places, product shots, media thumbnails, or creator content when bitmap assets would materially improve quality.

## When To Generate Images

- Food and drink: dish photos, restaurant hero images, menu item photos, delivery status illustrations.
- Shopping: product shots, category imagery, merchant/brand visuals, campaign banners.
- Travel/navigation/lifestyle: places, maps-adjacent scenic cards, booking destination imagery.
- Photo/video and graphics/design: before/after examples, editable canvas media, generated-result examples.
- Music/entertainment/books/news: covers, posters, artwork, thumbnails, editorial imagery.
- Health/fitness/education: supportive illustrations, activity photos, lesson covers, progress empty states.
- Social/community: avatars, user content thumbnails, topic covers, empty-state illustrations.

Do not generate images for simple icons, chevrons, UI glyphs, charts, wireframes, or components that should remain code-native/SVG.

## Built-In Image Generation Workflow

1. Make an asset inventory before implementation:
   - asset name
   - screen/page where it appears
   - role: hero, card thumbnail, product image, empty state, background, before/after sample, cover, avatar
   - aspect ratio and approximate rendered size
   - style requirements from the inferred industry
   - composition role: full-bleed background, immersive hero, card thumbnail, content image, cutout, or decorative support
   - crop behavior: cover, contain, fixed focal crop, masked edge, or transparent cutout
   - avoid list: text, watermark, logos, busy backgrounds, unreadable detail
2. Use the built-in image generation tool by default for new bitmap assets.
3. For project-bound assets, move or copy the selected generated image into the workspace before finalizing.
4. Reference workspace images from the design artifact. Never leave a design dependent on an image stored only in Codex's default generated-image location.
5. If a transparent cutout is required, generate on a flat chroma-key background first and remove the background locally; use true transparent CLI fallback only when explicitly confirmed.
6. Inspect the output for subject quality, crop, lighting, style fit, and whether it competes with UI text.
7. Replace placeholders in the design with final assets and verify the layout still fits.

## Direct Raster Screen Generation

Use direct raster generation when the user asks for "设计图", "视觉稿", "高保真", "mockup", "出图", or says not to use HTML. In this mode, generate the app screen itself as the final design artifact.

Rules:

- Generate one standard vertical phone screen per image. Target an iPhone-like `9:19.5` ratio such as `1179x2556`, `1290x2796`, or equivalent high-resolution portrait phone size.
- For multi-screen flows, generate separate full-size images for each screen: home, list, detail, checkout, profile, editor, etc.
- Do not pack many screens into one compressed board as the only deliverable. That makes text, spacing, and UI hierarchy unusable.
- Do not generate browser mockups, desktop boards, landscape posters, or square concept cards unless the user explicitly asks.
- Ask the image model for "the actual app screen, edge-to-edge inside a phone-screen canvas, no external device frame, no browser chrome" unless a device-frame presentation is requested.
- If a full-flow overview is useful, create it only after full-size individual screens exist.
- Save project-bound generated screens into the workspace and report their paths.

Preferred pipeline:

- Start with image-generated screens for visual direction and polish.
- Move to Figma after the user accepts the direction and needs editable design handoff.
- Move to HTML only when interaction, responsive preview, or implementation is requested.
- Do not use HTML as a substitute for image generation when the user is judging visual design quality.

## Image Composition And Fill Rules

Choose the asset's layout role before implementation:

- Full-bleed background: image fills the entire screen/section/card with `object-fit: cover` or equivalent background sizing. Use this for destination, food hero, entertainment, editorial, weather, or immersive first screens.
- Immersive hero: image fills a large header or top area and may extend behind chrome. Use gradients, scrims, masks, or edge fades to protect text and controls.
- Card thumbnail: image is cropped consistently inside cards. Use stable aspect ratios and one focal point; avoid letterboxing unless the product category requires the full image.
- Content image: image is the user's object of attention, such as an editor canvas, product detail image, or article media. Do not crop away critical content.
- Cutout: subject floats over a designed surface. Use transparent or chroma-key-removed PNG/WebP only when the cutout shape is part of the composition.
- Decorative support: image supports mood but must not compete with the primary task.

Implementation rules:

- If the image is intended to carry the screen's emotion or product appeal, it should usually fill its container, not sit as a small centered object.
- For CSS/HTML mockups, prefer `object-fit: cover`, `background-size: cover`, or a crop frame with explicit aspect ratio for hero/card imagery.
- Set `object-position` or equivalent focal point so the important subject remains visible after crop.
- When text or controls sit on imagery, add a gradient, scrim, blur plate, or safe area so contrast stays readable.
- Use `contain` only when the entire asset must be visible, such as editor canvases, logos, document previews, or before/after comparison images.
- Avoid tiny centered photos inside large empty panels unless the empty space is intentionally part of the design.
- Do not stretch images non-proportionally.

## Figma Bitmap Preservation And Componentization

When a raster screen is later converted to Figma, preserve bitmap regions instead of inventing replacement artwork, but keep the final visible screen composed of movable Figma materials.

- Reuse original generated/source images whenever possible.
- If only the full screen image exists, crop the needed photo/media areas from that screen and upload those crops as separate Figma image fills.
- Match the original crop, focal point, scale mode, corner radius, scrim, and overlay treatment.
- Keep text, controls, charts, and cards editable as Figma layers above or around the bitmap fills.
- Build a component kit for repeated UI before final assembly: cards, buttons, chips, tabs, metric cells, list rows, bottom bars, toolbars, editor controls, and chart modules.
- For photo-heavy sections, a bitmap-backed movable container is the correct outcome; generic vector silhouettes are only acceptable for intentionally illustrative placeholders.
- Keep the full raster screen as a locked reference in Figma until screenshot verification is complete.
- Do not use the locked full-screen source image as the final visible screen. It is a reference, not the deliverable.
- The deliverable frame must be assembled from editable components, editable text/vector layers, and separate movable bitmap crops.
- If the final screenshot differs materially from the approved raster image, revise the Figma file or clearly label the output as an editable reinterpretation rather than a faithful conversion.

## Prompt Rules

- Describe the asset as a product/design asset, not a standalone artwork.
- Specify realistic crop and aspect ratio: square menu photo, 4:3 product card, tall phone editor sample, wide hero banner.
- If an image should fill a full screen or card, prompt for enough background/edge detail so it can be safely cropped with `cover`.
- Match the industry style: food should feel appetizing and legible; finance/medical imagery should be restrained; creation/editor assets should leave room for UI overlays.
- Ask for no text, no watermark, no logo unless exact in-image text is required.
- Avoid overly busy compositions when the asset sits behind controls or labels.
- For repeated assets in one screen, keep lighting, background, crop, and visual language consistent.

## Asset Quality Checklist

- The image has a clear subject at mobile size.
- Raster app screens use a standard vertical phone aspect ratio and are not compressed into unreadable overview boards.
- The crop works inside the intended frame.
- The image role is correct: full-bleed/hero images fill the frame; thumbnails crop consistently; content images preserve critical subject matter.
- Focal points survive mobile crop and responsive changes.
- UI labels and controls remain readable over or near the image.
- The image matches the inferred industry style and brand tone.
- There is no unwanted text, watermark, logo, distorted anatomy, or confusing object.
- The file is stored in the workspace and referenced by the design.
- The page still works if the image takes time to load: size is stable, no layout jump.

## Output Notes

When image generation is used for a design task, report:

- Generated asset names and where they are used.
- Whether images were generated with the built-in image tool or another explicit user-approved path.
- Final workspace paths for project-bound assets.
- Any asset limitations or replacements still needed.
