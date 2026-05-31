---
name: mobile-app-ui-design
description: Use when designing, reviewing, or improving mobile app UI and interaction specs, visual mockups, screenshot-to-Figma reconstruction, measured pixel spacing, asset cropping, or visual-diff verification for iOS, Android, mini programs, or cross-platform mobile apps, especially from user-provided prototypes, wireframes, sketches, or screenshots.
metadata:
  short-description: Mobile app UI design guidance
---

# Mobile App UI Design

Use this skill when a user asks for mobile app page design, mobile UI rules, design review, interaction polish, component specs, or a reusable mobile design system.

## Capability Summary

- Infer the app's industry before styling. Use UI Notes `/app` categories as the primary taxonomy, then choose the mobile style that fits the industry's task, trust level, content density, and business action.
- Before producing high-fidelity design images or Figma output, run a case-library synthesis using UI Notes `/pin` for function/component patterns and Meiye Inspiration Album for visual-category cues. Extract patterns; do not copy screenshots.
- Turn user-provided prototypes, wireframes, screenshots, or rough ideas into polished mobile visual designs while preserving the original information architecture and core workflow.
- When the user provides a screenshot/reference image and asks to copy, restore, reproduce, measure spacing, crop assets, or build it in Figma, run a measured reconstruction workflow first: image size, scale factor, region rectangles, gaps, color samples, crop ledger, Figma reconstruction plan, and visual-diff target.
- Produce high-fidelity mobile design images when the user asks for "设计图", "高保真", "视觉稿", "mockup", or "出图"; do not answer with text-only specs in those cases.
- Use an Image-first route for visual quality: generate one standard phone-size screen per image, then convert or rebuild into Figma for handoff and editability when tools are available.
- Before producing a visual artifact, create a design source package and production brief that lock industry classification, screen scope, phone size, layout blueprint, typography tokens, spacing/radius tokens, component contract, asset contract, icon contract, prompt plan, and Figma reconstruction plan.
- If a design image may later become Figma, the first serious deliverable is the design source package, not the raster screen. Do not generate a final high-fidelity screen until the package defines what is layout, what is editable text, what is icon/vector, what is component, and what is independent bitmap media.
- For Figma-bound image work, generate or assemble a source asset pack before writing Figma: full-screen reference image for each screen, separate no-UI media assets for every photo/hero/thumbnail/canvas, custom icon sheet or vector icon contract, and an asset manifest that maps each asset to its intended Figma node.
- For Figma-bound work, create icons before the final screen and before Figma JS. Produce a batch icon asset pack for bottom tabs, top actions, business category icons, badges, and custom marks; then reference those assets or vector contracts in the manifest.
- Treat the asset manifest as machine-checkable input, not notes. Validate it before writing Figma JS, then generate a Figma packet so node names, rectangles, radii, assets, icons, and text boxes come from the same source.
- Figma handoff for image-generated screens must be a left/right reference pair by default: locked original screen on the left, editable reconstruction on the right, same logical phone size, same scale, same crop targets. A direct editable Figma screen without a left-side original is only a design draft, not a 1:1 reconstruction.
- When converting an approved image screen into Figma, treat that image as the pixel source of truth. The Figma result must visually match the image in layout, photos, crops, colors, spacing, and hierarchy before claiming it is a Figma version.
- Use a pixel-faithful editable Figma structure by default after image generation: keep the full raster screen as a locked reference only, then rebuild the visible phone frame from movable Figma layers, cropped bitmap assets, editable text, vector shapes, and reusable components.
- When the user asks to turn a generated design image into Figma, do not create an independent reinterpretation. First produce a reference-to-Figma reconstruction page: locked reference on the left, reconstructed frame on the right, with matching size, matching layout, and a fidelity ledger.
- Layout fidelity is a separate deliverable from layer editability. Before writing Figma nodes, measure the approved image into a layout measurement table: frame scale, bounding boxes, x/y/w/h, inter-module gaps, radii, shadow/effect notes, typography boxes, media crop boxes, and z-order. Do not rely on eyeballed coordinates.
- Use `scripts/measure-screenshot.js` for screenshot/reference reconstruction. It produces `measurement-report.json`, `measurement-report.md`, and `measurement-overlay.png`; these files are the starting point for Figma coordinates, crop specs, and diff regions.
- When spacing, size, or structure annotations are useful, turn them into a structured measurement annotation JSON and add them to Figma as separate handoff materials: a `Measurement Overlay / {screen}` frame with visible guides/labels and a `Measurement JSON / {screen}` text block. Do not place measurement labels inside the final clean editable UI frame.
- Detail-media fidelity is a separate gate. For every photo, thumbnail, avatar, product shot, editor canvas, map, cover, generated result, or small detail image, record the exact source rectangle, role, focal point, crop mode, radius, mask, scrim, and expected Figma node. If a detail image cannot be faithfully cropped or regenerated, mark it as a blocking fidelity issue instead of swapping in a similar image.
- Icon accuracy is a separate gate. Every icon needs a semantic role, source, size, stroke/fill style, state, optical center, badge relationship, and Figma strategy before reconstruction. Standard controls must use vector/library icons; custom glyphs must use a clean icon sheet or exact source crop. Do not substitute approximate symbols in high-fidelity output.
- A finished "1:1 Figma reconstruction" means the visible UI is rebuilt from editable Figma materials: editable text, vector icons, shape layers, components, chart vectors, and independent bitmap media for photos/illustrations only. Do not satisfy this request by slicing the full image into bitmap modules and reassembling it.
- `Bitmap Composite` slices are allowed only as a clearly labeled temporary fallback or issue marker. They are not acceptable as the final answer when the user asked for editable 1:1 Figma layers.
- Treat "asset extraction / 抠图" as material extraction, not screenshot slicing. Extract only the parts that are truly bitmap materials: photos, avatars, product shots, posters, illustrations, generated AI results, textures, or complex shadows that cannot be rebuilt. Rebuild containers, cards, navigation, bottom tabs, buttons, text, icons, charts, and controls as Figma layers or components.
- Keep every raster screen in a standard vertical phone ratio around `9:19.5`, such as `1179x2556`, `1290x2796`, or an equivalent high-resolution portrait. Do not compress several screens into one unreadable board as the only deliverable.
- Select the phone canvas deliberately from the user's prototype, target platform, product type, and delivery container. Use Apple/Android and major-company references to choose suitable size, density, safe area, and crop behavior, not to copy their visual style.
- Generate or source polished bitmap imagery when the design needs hero photos, food/product cards, fitness scenes, before/after editing results, covers, thumbnails, empty states, or illustrations.
- Place imagery with intent: use full-bleed, hero, card thumbnail, content image, cutout, or decorative roles with proper cover/crop/focal point/scrim treatment. Avoid small centered images when a section or screen should be visually filled.
- For image-first Figma work, generate or request clean companion assets whenever possible: no-text hero/media crops, icon sheets, avatar/product/photo crops, background plates, and a source segmentation map. This prevents baked text/photo composites from blocking both 1:1 fidelity and editability later.
- Companion assets are not optional decoration when the screen relies on imagery. Hero photos, course/product thumbnails, editor canvases, maps, avatars, covers, generated results, and custom illustrated marks must be produced as separate files or clearly listed as missing before Figma work begins.
- In editable Figma output, every visible material must be independently movable or selectable: text as text layers, cards/buttons/charts/navigation as editable components, icons as vectors/components, and photos/media as separate cropped bitmap nodes. Do not paste one full-screen screenshot as the final visible design.
- Build an editable component kit before or alongside the Figma reconstruction. Use it to assemble repeated cards, tabs, buttons, metric modules, chart blocks, toolbars, and bottom navigation while matching the approved image 1:1.
- Use a Figma component system for repeated UI. Bottom nav, top bars, cards, rows, buttons, chips, sheets, metrics, editor tools, and empty states should become components or component-like groups with documented states.
- Componentized reconstruction must still use measured instance geometry. Component masters may be clean and reusable, but each instance must be placed, sized, padded, and clipped according to the reference measurement table.
- Figma layouts must be stable after editing. Use fixed frame sizes, constraints, clipping, text boxes, and measured component instance rectangles so labels, icons, badges, and image fills do not shift the layout when selected, edited, or replaced.
- Manifest coordinates must pass bounds and scale checks before Figma work. Regions and text boxes that exceed the logical phone frame, or raster sizes that do not match logical size times scale, are blocking issues unless the manifest explicitly documents a different scale strategy.
- Bottom navigation must never be a screenshot crop in a finished Figma reconstruction. Build it from a bottom-nav container, tab item components, vector icons, editable labels, selected/default states, badges, and safe-area/home-indicator layers.
- Containers and surfaces must be rebuilt as shape layers whenever possible: frame, fill, stroke, radius, shadow, blur, scrim, mask, and padding. Crop a container only if it contains non-reproducible texture, lighting, or artwork, and then label it as a media/effect exception.
- Before rebuilding in Figma, classify the screen into layout, editable text, vector/icon, bitmap media, bitmap composite, effects, and system chrome. This decides which parts become components and which parts become cropped image assets.
- Before generating the screen image, make an icon inventory and layer plan. Tab icons, toolbar icons, action icons, badges, and custom glyphs must be planned as vector/icon-library items, generated icon-sheet assets, or source-raster crops; do not let high-fidelity tab bars fall back to circles.
- Generate icons in batches by role before the final screen when the product uses custom visual language: `navigation`, `toolbar`, `business-category`, `editor-tool`, `status/badge`, and `brand/custom`. Standard icons may stay vector-only, but they still need inventory rows and Figma target names before the screen is generated.
- Use the icon pipeline for every nontrivial design: standard icons become vectors or library icons; custom icons become generated sheets or source crops; temporary icon placeholders must be named as warnings.
- Bottom tab icons are never improvised during Figma reconstruction. Before writing Figma, each tab must have a decided source: vector function, generated transparent PNG/SVG from the icon pack, or exact source crop. The same source decision must be reflected in the screen prompt, manifest, Figma script, and audit.
- Before final image generation, define typography, spacing, and component geometry in a design source package. The image prompt should follow these measured tokens instead of asking for a vague attractive app screen.
- Preserve the exact photo/media material from the approved image. If a Figma reconstruction needs photos, avatars, food, product images, covers, editor canvases, or AI results, reuse uploaded originals or crop those regions from the source screen; do not swap in different pictures during reconstruction.
- After uploading assets into Figma, verify target nodes use `IMAGE` fills and are not still gradients, grey placeholders, missing fills, or unrelated fallback images. If an upload/backfill fails, fix it before handoff.
- After writing Figma, validate the returned audit: reference pairs exist, asset fills are `IMAGE`, the visible frame is not one full-screen screenshot, text/vector/bitmap counts are nonzero, and warnings are either fixed or explicitly labeled as draft-only.
- For small or detail-heavy media regions, crop with enough source-pixel bleed to preserve shadows, rounded masks, hairlines, and object edges, then clip/mask inside Figma. If the crop includes baked UI text or controls that should be editable, regenerate a clean companion asset or separate those overlays into Figma layers.
- Claim "1:1" only after visual diff work: same-size screenshot comparison, region checklist, and documented remaining differences. If the Figma output changes photos, crop, density, spacing, typography, or hierarchy, call it an editable draft and revise it.
- If visual 1:1 and full editability conflict because only a flattened raster exists, do not silently choose bitmap slicing. Explain the conflict, generate or request clean media assets, then rebuild the UI as editable layers. Use bitmap composites only to mark unresolved media/illustration regions in the fidelity ledger.
- Write to Figma directly when the Figma tools are exposed (`create_new_file`, `use_figma`, `upload_assets`, or equivalent). If Figma write tools are unavailable, create a Figma-ready import package with PNG assets, SVG board, and handoff specs.
- For multi-screen work, maintain shared tokens, navigation, icons, image style, component behavior, state language, and entity continuity across screens.
- When the user asks to design an app rather than a single page, top-level navigation defines the minimum screen set. If the app has four bottom tabs, generate one primary screen for each tab by default, with the correct selected tab state on every screen. Only produce fewer screens when the user explicitly asks for a single page, a specific flow, or a limited draft.
- Save design work as a structured delivery package with brief, assets, Figma specs, ledgers, screenshots, diff reports when needed, and a README.
- Use HTML only when the user needs an interaction preview or implementation target; HTML is not the default medium for static mobile design稿.
- For cross-industry apps, keep the UI Notes industry as the primary decision and use abstract archetypes only as secondary task models, such as transaction, content feed, creation/editing, habit loop, booking, or high-trust data entry.

## Core Workflow

1. Identify the target surface: iOS, Android, mini program, React Native, Flutter, or cross-platform mobile app. Treat H5-in-mobile sources only as mobile interaction references; ignore desktop or website styling unless the user explicitly asks for it.
2. If the user provides a prototype, wireframe, sketch, screenshot, or Figma frame, apply the prototype constraints protocol. Classify must-preserve, may-improve, must-not-change, and usability-override items before redesigning.
3. Clarify product context: user goal, primary workflow, content density, platform constraints, brand tone, and business risk.
4. Infer the UI Notes industry category from the user's product description and prototype before choosing visuals. Do this even when the user does not name an industry. Use the user's main daily task as the deciding signal, then choose the industry-appropriate mobile style.
5. Match one primary UI Notes industry category: 报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐.
6. Add a secondary task model only when needed: transaction, content feed, creation/editing, social exchange, utility lookup, habit loop, booking, or high-trust data entry.
7. Choose the design posture:
   - **Native-first**: follow Apple HIG or Android/Material conventions closely.
   - **Brand system with platform adaptation**: shared brand tokens, platform-specific navigation and controls.
   - **Super-app / mini-program style**: prioritize familiar host-app mobile patterns, fast task completion, and service-entry efficiency.
8. Choose the industry-fit visual style: density, color/material posture, imagery/media role, motion intensity, and component emphasis.
9. Build a benchmark set: choose 3-5 comparable apps from the same industry, 2-4 key flows, and the specific function/component patterns to inspect.
10. For any request that asks for design images, high fidelity, visual mockups, or Figma, run the UI Notes Pin + Meiye Inspiration Album synthesis before drawing:
   - UI Notes `/pin`: choose function/component categories that match the required screens and states.
   - Meiye Inspiration Album: choose APP visual-category cues that match the industry and mood.
   - Output the extracted pattern notes: IA, component choices, imagery role, density, visual rhythm, and rejected patterns.
11. Map industry to screen and component patterns, then design from information architecture outward: navigation, page hierarchy, core actions, feedback, empty/error/loading states, then visual styling.
12. Define the top-level navigation before screen generation. For an app request, the bottom tab count sets the minimum screen count: four tabs means four primary tab screens; five tabs means five primary tab screens. Each tab screen needs its own purpose, selected tab state, main content, and at least one representative empty/loading/error or permission state when relevant.
13. Select the output screen size before generating or rebuilding: preserve user-provided prototype ratio when present; otherwise choose an iOS, Android, mini-program/H5, or cross-platform logical frame from `screen-size-selection.md`.
14. Before final visual generation, create a design source package from `design-source-package.md`. It must define screen contract, layout blueprint, typography tokens, spacing/radius tokens, component contract, icon contract, asset contract, image generation contract, Figma reconstruction contract, and acceptance gate.
15. If the user asks to move quickly, the package may be concise, but it still must choose exact screen size, module rectangles, text sizes, spacing, icon semantics, and media assets. If those are missing, label the next image as `visual-exploration-only`, not Figma-ready.
16. Create an asset, crop, and icon inventory before visual generation. Decide which parts are generated photos/media, which parts need clean no-text companion assets, which parts are clean icon assets, which parts are editable vectors, and which parts may remain bitmap composites. Include detail-image rows for small thumbnails, avatars, edge crops, shadows, maps, editor canvases, and generated-result previews.
17. For Figma-bound work, create the icon source package before the final screen: standard-vector contract, custom icon sheets, transparent icon PNG/SVG crops, state variants, target Figma names, and a batch ledger. Use `navigation`, `toolbar`, `business-category`, `editor-tool`, `status/badge`, and `brand/custom` batches so the design prompt and Figma JS use the same icons.
18. For Figma-bound work, create a source asset pack before writing Figma. Required files: full-screen reference image per screen, clean media asset per media region, icon assets or vector contracts per icon region, and an asset manifest mapping file names to Figma node names, crop mode, focal point, radius, state, and whether UI overlays are rebuilt separately. Validate the manifest with `scripts/validate-asset-manifest.js` before writing Figma JS.
19. If the design needs polished photos, illustrations, covers, thumbnails, empty states, or generated-result examples, create a visual asset inventory and generate/source bitmap assets instead of using placeholder boxes or generic CSS shapes. Decide each image's composition role before placing it: full-bleed background, immersive hero, card thumbnail, content image, cutout, or decorative support. For Figma-bound work, generate companion crops or an asset sheet before Figma work begins.
20. If the design needs custom icons, custom tab glyphs, mascots, stickers, or brand marks, follow the icon pipeline: generate or extract companion icon sheets in batches before the full screen. Standard icons should be vector or imported from the project icon library. Do an icon accuracy pass before Figma reconstruction: role, glyph, size, stroke/fill, state, optical alignment, badge, and hit area must match the approved image.
21. If the user asks for a design image, visual mockup, high-fidelity screen, Figma frame, or "设计图", produce a direct visual artifact rather than only a text spec. Default fidelity route for Figma: generate standard phone-size reference screen images from the design source package, generate the companion source asset pack, then rebuild the approved image into Figma. Use HTML only for interactive preview or implementation.
22. When Figma is requested after image generation or from a user-provided screenshot, create a pixel-fidelity conversion plan before drawing: original screen size, Figma frame size, scale factor, layout measurement table, locked reference image, movable bitmap crop map, editable component taxonomy, text/icon/vector layer plan, bitmap-composite exception list, and verification screenshot target. Start by running `scripts/measure-screenshot.js` on the reference and save the report in the delivery package. If the user asks for spacing/size labels, or the reconstruction needs explicit implementation measurements, create a measurement annotation JSON for safe areas, margins, module sizes, gaps, rows, badges, buttons, and bottom safe area. Generate a Figma packet with `scripts/build-figma-packet.js` when using a manifest-driven script.
23. When Figma is requested, check whether write tools are available before promising direct file output. If available, create or update the Figma file with frames, images, components, and annotations. If unavailable, create a Figma-ready import package with full-size PNG screens, an SVG board, and a concise import spec.
24. Before rebuilding, produce a layer classification: `layout`, `editable-text`, `vector-icon`, `bitmap-icon`, `bitmap-media`, `bitmap-composite`, `effect`, and `system-chrome`. Use this to decide component boundaries and crop assets.
25. Before writing Figma JS, produce a measured geometry map for every visible region. Each node or component instance must have a source rectangle, logical rectangle, parent frame, constraints, radius, and notes for clipping/effects. Convert source pixels to Figma logical pixels with one explicit scale factor and round consistently.
26. Before writing Figma JS, produce a detail-media map and icon map. The detail-media map records source crop, bleed, crop mode, focal point, mask, radius, scrim, and upload key. The icon map records semantic role, state, exact glyph/source, size, stroke/fill, optical center, badge anchor, upload key, and fallback status.
27. In Figma, create a reference pair for each screen: `Locked Reference / {screen}` on the left and `Editable Reconstruction / {screen}` on the right. Both frames must share the same logical phone size. Keep component libraries and ledgers separate from this pair.
28. If measurement annotations exist, create `Measurement Overlay / {screen}` as a third same-size frame and `Measurement JSON / {screen}` as a nearby code/spec panel. The overlay should show visible guide lines and labels for the measured dimensions; the JSON panel should contain the same values in a structured format. Keep these annotation layers separate from the final editable UI.
29. Assemble the visible frame from movable materials: cropped bitmap assets for photos/generated results, editable text for labels and copy, vector/icon layers for glyphs, shape/effect layers for containers, and component instances for repeated UI. If a custom icon is bitmap-backed, keep it as an independent `Bitmap Icon / ...` node with the exact measured bounds and state metadata.
30. If only a flattened generated image exists and exact editable 1:1 is required, rebuild every UI region as editable layers and isolate only true media/illustration regions as bitmap media. If clean media or custom icon assets are missing, create or regenerate those assets before claiming completion. Bitmap-composite slicing may be used only as a diagnostic fallback, not as the final deliverable.
31. For multi-screen sets, run a consistency pass for tokens, navigation, component reuse, icon language, shared media identity, state language, and flow continuity.
32. Run visual difference checks against the approved image after each major region: media crop, card background, text hierarchy, icon placement, charts, tab bar, and safe areas. Fix drift before claiming 1:1.
33. Validate measured layout fidelity before visual polish: frame size, safe areas, section y positions, component x/y/w/h, gaps, radii, text baselines, image crop boxes, z-order, and bottom navigation geometry. Major geometry drift blocks handoff even when layers are editable.
34. Validate detail fidelity and icon accuracy before handoff: no changed photos, no stretched crops, no missing focal content, no baked editable text inside media crops, no unrelated icon glyphs, no reused wrong tab icons, no missing generated icon assets, and no placeholder icon names in a final file.
35. Validate Figma asset backfill: every media and bitmap-icon node listed in the manifest has an `IMAGE` fill, correct scale mode, correct mask/radius, and no grey/gradient placeholder remains in the final reconstruction. Save the Figma audit JSON when possible and check it with `scripts/validate-figma-audit.js`.
36. Validate Figma layout stability: instances keep measured x/y/w/h, text boxes clip or wrap intentionally, media nodes preserve aspect ratio, icon groups stay centered in their hit areas, badges attach to the intended icon, and replacing a bitmap or label does not rearrange the screen unexpectedly.
37. Validate annotation handoff when present: measurement overlay labels match the measurement JSON values, the overlay is separate from the final editable frame, and the JSON includes enough structure for safe areas, margins, module sizes, gaps, repeated rows, badges, and bottom actions.
38. Validate against mobile constraints and pixel fidelity: reachability, touch targets, small-screen clipping, keyboard behavior, scroll rhythm, accessibility, dark mode, large text, asset loading, image/text overlap, standard phone aspect ratio, movable/editable Figma layers, and visual match to the approved image.
39. Save or update the delivery package: README, production brief, design source package, source asset pack, icon pack, assets, Figma script/spec/ledger, measurement annotation JSON, verification screenshots, diff report when needed, and handoff notes.
40. Return concrete specs: inferred industry classification, industry-fit style rationale, secondary task model, page structure, design source package status, source asset pack status, component inventory, asset inventory, icon inventory, icon pack status, measurement annotation status, state matrix, token recommendations, interaction states, benchmark-derived rationale, standard phone-size visual artifact when requested, Figma output or import package path when applicable, and review checklist.

## Baseline Principles

- Prefer platform familiarity over visual novelty for core navigation, forms, destructive actions, permissions, and system handoffs.
- Make the primary task obvious within the first screen; avoid hiding the next action behind vague icons or decorative layouts.
- Keep interaction targets comfortable: use at least `44x44pt` on iOS and `48x48dp` on Android as the default floor unless the platform-specific source says otherwise.
- Separate visual size from hit area; icons may look smaller, but their tappable area must remain generous.
- Put frequent actions where thumbs can reach them, especially on tall phones; keep high-risk actions separated and confirmed.
- Use motion to explain state changes and continuity, not to decorate static content.
- Treat accessibility as a design input: dynamic text, contrast, labels, focus order, screen readers, haptics/audio alternatives, and non-color status indicators.
- Design loading, empty, offline, permission-denied, error, and success states before calling a screen complete.
- For cross-platform apps, preserve functional consistency while adapting native controls, navigation, and system affordances per platform.
- Do not apply desktop SaaS, dashboard, or website visual density to mobile apps unless the product is explicitly an enterprise/admin mobile app.

## When To Load References

- For source material and company-specific notes, read `references/research/source-map.md`.
- For refreshing external source links and review dates, read `references/research/source-refresh.md` and use `scripts/check-links.js`.
- For synthesized rules across Apple, Google, Meta/Facebook, Microsoft, Samsung, Alibaba/Ant, Tencent/WeChat, ByteDance, and Meituan, read `references/research/mobile-ui-principles.md`.
- For platform and company image/crop guidance from Apple, Android/Material, Tencent, Alibaba/Ant, Meituan, and JD, read `references/research/platform-image-guidelines.md`.
- For selecting the right phone canvas and Figma frame size from platform, prototype, and product type, read `references/workflow/screen-size-selection.md`.
- For the mandatory pre-image design source package covering exact layout, typography, spacing, components, icons, assets, prompts, and Figma reconstruction contract, read `references/workflow/design-source-package.md`.
- For visual work setup, screen scope, asset/icon planning, prompt construction, and Figma reconstruction packets, read `references/workflow/design-production-brief.md`.
- For repeated editable Figma components, component naming, states, component ledgers, and componentized JS requirements, read `references/workflow/figma-component-system.md`.
- For icon source decisions, icon sheets, source-raster icon crops, vector icon reconstruction, bottom tab icons, badges, and icon acceptance criteria, read `references/workflow/icon-pipeline.md`.
- For user-provided prototype constraints, must-preserve/may-improve/must-not-change/usability-override decisions, read `references/workflow/prototype-constraints.md`.
- For user-provided prototypes, wireframes, sketches, screenshots, or requests for design images, read `references/workflow/prototype-to-visual-design.md`.
- For state coverage by industry and component, loading/empty/error/offline/permission/success/destructive states, read `references/workflow/state-matrix.md`.
- For multi-screen token, navigation, icon, image, component, and flow consistency, read `references/workflow/multi-screen-consistency.md`.
- For workspace/Figma/GitHub package structure, README, brief, handoff, assets, ledgers, and diff artifact rules, read `references/workflow/delivery-package.md`.
- For image-to-Figma conversion, editable reconstruction, layer classification, crop rules, script templates, and visual difference checks, read `references/workflow/figma-reconstruction.md`.
- For extracting, naming, and placing image crops in Figma, read `references/workflow/image-crop-spec.md`.
- For reusable Figma script snippets and implementation helpers, read `references/workflow/figma-script-templates.md` and `templates/figma-reconstruction.js`.
- For screenshot measurement, region maps, screenshot normalization, pixel/threshold diff rules, diff report templates, and fidelity labels, read `references/workflow/figma-reconstruction.md` and `references/workflow/visual-diff.md`, then use `scripts/measure-screenshot.js` and `scripts/visual-diff.js`.
- For UI Notes industry-based app type selection, read `references/industry/product-archetypes.md`.
- For industry-fit visual style, read `references/industry/style-decision-guide.md`.
- For AI-generated or sourced bitmap assets, read `references/workflow/visual-asset-generation.md`.
- For prompt templates that generate clean media assets, custom icon sheets, full-screen references, and manifest rows, read `templates/prompts/source-asset-pack.md`.
- For mapping an industry to screen, function, and component patterns, read `references/industry/industry-to-pattern-map.md`.
- For case-library research using UI Notes, Meiye, app screenshots, or competitor screenshots, read `references/workflow/case-library-method.md`.
- For design review or acceptance criteria, read `references/workflow/review-checklist.md`.

## Output Shape

When designing a screen or flow, provide:

- Target platform and design posture.
- Prototype interpretation and preserved structure, when a prototype is provided.
- Inferred UI Notes industry category, evidence from the user's description, secondary task model, and style rationale.
- Benchmark set and extracted mobile patterns.
- Case-library synthesis from UI Notes Pin function/component categories and Meiye Inspiration Album visual categories when the request includes design images, high fidelity, or Figma.
- Selected screen size and rationale.
- Design source package status: `source-package-ready`, `visual-exploration-only`, `figma-blocked`, or `figma-ready-with-assumptions`.
- Design source package summary: layout blueprint, typography tokens, spacing/radius tokens, component contract, icon contract, asset contract, image generation contract, and Figma reconstruction contract.
- Source asset pack summary: full-screen reference images, clean media assets, custom icon sheet or vector icon contract, asset manifest, and upload/backfill status.
- Icon pack summary: batches generated or vectorized, file paths, state variants, Figma target names, upload/backfill status, and any icon that remains draft-only.
- Asset manifest validation result and Figma packet path when Figma JS is generated from a manifest.
- Production brief summary: screen scope, output route, asset/icon inventories, layer plan, and acceptance criteria.
- Screen hierarchy and navigation model.
- Tab-to-screen coverage: list every bottom tab and the screen generated for it; if any tab screen is intentionally omitted, state the user's constraint or scope reason.
- Component list with states and component-system notes.
- Visual asset inventory, generated/sourced image plan, and image composition rules when imagery is needed.
- State matrix and multi-screen consistency notes when more than one screen is produced.
- Layout, spacing, typography, color/material, imagery/media, icon, and density rules.
- Layout measurement summary: source size, scale factor, key region rectangles, maximum observed drift, and whether geometry passed.
- Measurement artifacts when a screenshot/reference image was used: `measurement-report.md`, `measurement-overlay.png`, crop spec or crop ledger, and the exact scale used for Figma.
- Measurement annotation handoff when spacing labels are needed: `Measurement Overlay / {screen}` frame, `Measurement JSON / {screen}` spec panel, JSON path, unit, scale basis, and whether labels match the JSON values.
- Detail-media fidelity summary: key image crops, crop source, focal point, crop mode, mask/radius, and any unresolved detail-image issue.
- Icon accuracy summary: semantic role, source strategy, state coverage, size/stroke/fill match, badge placement, and any placeholder or mismatch.
- Interaction behavior, feedback, and motion.
- Accessibility and edge-state checks.
- Standard phone-size Image artifact first, then direct Figma output when write tools are available, or a Figma-ready import package when they are not.
- For image-to-Figma handoff, include the reconstruction route used: `editable 1:1 reconstruction`, `editable reconstruction with media exceptions`, or `temporary bitmap-composite fallback`. If the route is not editable 1:1, say why and what is needed.
- For Figma converted from images, include whether the visible result is pixel-faithful, which components were created, which bitmap regions were reused as movable crops, and whether every visible region is independently movable/selectable.
- For Figma converted from images, include the left/right reference pair status for every screen and whether the right-side editable reconstruction was compared against the left-side locked original.
- For Figma converted from images, include the layer classification and any bitmap-composite exceptions. Do not call the result 1:1 unless a visual comparison was performed.
- For Figma converted from images, include a layout fidelity report. If the layout was not measured or checked, label the output `componentized draft`, not `1:1`.
- For Figma converted from images, include a layout stability report: whether measured instance rectangles, constraints, clipping, text boxes, icon centers, badge anchors, and media aspect ratios were checked.
- For direct Figma writes, include the script audit result: page/frame ids, image node ids for upload/backfill, component inventory, icon inventory, warnings, and screenshot verification status.
- For direct Figma writes with measurements, include whether the annotation overlay and JSON text panel were created and kept outside the clean editable UI frame.
- For direct Figma writes, include the `validate-figma-audit` result when an audit JSON is available.
- For manifest-driven Figma scripts, include whether `validate-asset-manifest.js` passed bounds, scale, and overlap checks before `use_figma` was called.
- For visual fidelity claims, include the visual diff level performed: manual visual check, region checklist, or pixel diff.
- For delivery work, include package paths: README, production brief, handoff, assets, Figma spec/ledger/script, verification screenshots, and visual diff report when created.
- When using repository scripts, include the exact `scripts/export-crops.js` or `scripts/visual-diff.js` command and the output paths.
- HTML/local preview only when the user needs interaction, implementation, or responsive behavior checks.
- Any open questions that block accurate design.
