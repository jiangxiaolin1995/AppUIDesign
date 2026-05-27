---
name: mobile-app-ui-design
description: Use when designing, reviewing, or improving mobile app UI and interaction specs or visual mockups for iOS, Android, mini programs, or cross-platform mobile apps, especially from user-provided prototypes, wireframes, sketches, or screenshots.
metadata:
  short-description: Mobile app UI design guidance
---

# Mobile App UI Design

Use this skill when a user asks for mobile app page design, mobile UI rules, design review, interaction polish, component specs, or a reusable mobile design system.

## Capability Summary

- Infer the app's industry before styling. Use UI Notes `/app` categories as the primary taxonomy, then choose the mobile style that fits the industry's task, trust level, content density, and business action.
- Before producing high-fidelity design images or Figma output, run a case-library synthesis using UI Notes `/pin` for function/component patterns and Meiye Inspiration Album for visual-category cues. Extract patterns; do not copy screenshots.
- Turn user-provided prototypes, wireframes, screenshots, or rough ideas into polished mobile visual designs while preserving the original information architecture and core workflow.
- Produce high-fidelity mobile design images when the user asks for "设计图", "高保真", "视觉稿", "mockup", or "出图"; do not answer with text-only specs in those cases.
- Use an Image-first route for visual quality: generate one standard phone-size screen per image, then convert or rebuild into Figma for handoff and editability when tools are available.
- Before producing a visual artifact, create a production brief that locks industry classification, screen scope, navigation, component inventory, asset inventory, icon inventory, layer plan, prompt plan, and Figma reconstruction plan.
- When converting an approved image screen into Figma, treat that image as the pixel source of truth. The Figma result must visually match the image in layout, photos, crops, colors, spacing, and hierarchy before claiming it is a Figma version.
- Use a pixel-faithful editable Figma structure by default after image generation: keep the full raster screen as a locked reference only, then rebuild the visible phone frame from movable Figma layers, cropped bitmap assets, editable text, vector shapes, and reusable components.
- Keep every raster screen in a standard vertical phone ratio around `9:19.5`, such as `1179x2556`, `1290x2796`, or an equivalent high-resolution portrait. Do not compress several screens into one unreadable board as the only deliverable.
- Select the phone canvas deliberately from the user's prototype, target platform, product type, and delivery container. Use Apple/Android and major-company references to choose suitable size, density, safe area, and crop behavior, not to copy their visual style.
- Generate or source polished bitmap imagery when the design needs hero photos, food/product cards, fitness scenes, before/after editing results, covers, thumbnails, empty states, or illustrations.
- Place imagery with intent: use full-bleed, hero, card thumbnail, content image, cutout, or decorative roles with proper cover/crop/focal point/scrim treatment. Avoid small centered images when a section or screen should be visually filled.
- In editable Figma output, every visible material must be independently movable or selectable: text as text layers, cards/buttons/charts/navigation as editable components, icons as vectors/components, and photos/media as separate cropped bitmap nodes. Do not paste one full-screen screenshot as the final visible design.
- Build an editable component kit before or alongside the Figma reconstruction. Use it to assemble repeated cards, tabs, buttons, metric modules, chart blocks, toolbars, and bottom navigation while matching the approved image 1:1.
- Use a Figma component system for repeated UI. Bottom nav, top bars, cards, rows, buttons, chips, sheets, metrics, editor tools, and empty states should become components or component-like groups with documented states.
- Before rebuilding in Figma, classify the screen into layout, editable text, vector/icon, bitmap media, bitmap composite, effects, and system chrome. This decides which parts become components and which parts become cropped image assets.
- Before generating the screen image, make an icon inventory and layer plan. Tab icons, toolbar icons, action icons, badges, and custom glyphs must be planned as vector/icon-library items, generated icon-sheet assets, or source-raster crops; do not let high-fidelity tab bars fall back to circles.
- Use the icon pipeline for every nontrivial design: standard icons become vectors or library icons; custom icons become generated sheets or source crops; temporary icon placeholders must be named as warnings.
- Preserve the exact photo/media material from the approved image. If a Figma reconstruction needs photos, avatars, food, product images, covers, editor canvases, or AI results, reuse uploaded originals or crop those regions from the source screen; do not swap in different pictures during reconstruction.
- Claim "1:1" only after visual diff work: same-size screenshot comparison, region checklist, and documented remaining differences. If the Figma output changes photos, crop, density, spacing, typography, or hierarchy, call it an editable draft and revise it.
- Write to Figma directly when the Figma tools are exposed (`create_new_file`, `use_figma`, `upload_assets`, or equivalent). If Figma write tools are unavailable, create a Figma-ready import package with PNG assets, SVG board, and handoff specs.
- For multi-screen work, maintain shared tokens, navigation, icons, image style, component behavior, state language, and entity continuity across screens.
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
12. Select the output screen size before generating or rebuilding: preserve user-provided prototype ratio when present; otherwise choose an iOS, Android, mini-program/H5, or cross-platform logical frame from `screen-size-selection.md`.
13. Create an asset and icon inventory before visual generation. Decide which parts are generated photos/media, which parts are clean icon assets, which parts are editable vectors, and which parts may remain bitmap composites.
14. If the design needs polished photos, illustrations, covers, thumbnails, empty states, or generated-result examples, create a visual asset inventory and generate/source bitmap assets instead of using placeholder boxes or generic CSS shapes. Decide each image's composition role before placing it: full-bleed background, immersive hero, card thumbnail, content image, cutout, or decorative support.
15. If the design needs custom icons, custom tab glyphs, mascots, stickers, or brand marks, follow the icon pipeline: generate or extract a companion icon/asset sheet in addition to the full screen. Standard icons should be vector or imported from the project icon library.
16. If the user asks for a design image, visual mockup, high-fidelity screen, Figma frame, or "设计图", produce a direct visual artifact rather than only a text spec. Default fidelity route: generate standard phone-size Image screens first, then write or rebuild them into Figma when design handoff/editability is needed. Use HTML only for interactive preview or implementation.
17. When Figma is requested after image generation, create a pixel-fidelity conversion plan before drawing: original screen size, Figma frame size, locked reference image, movable bitmap crop map, editable component taxonomy, text/icon/vector layer plan, and verification screenshot target.
18. When Figma is requested, check whether write tools are available before promising direct file output. If available, create or update the Figma file with frames, images, components, and annotations. If unavailable, create a Figma-ready import package with full-size PNG screens, an SVG board, and a concise import spec.
19. Before rebuilding, produce a layer classification: `layout`, `editable-text`, `vector-icon`, `bitmap-media`, `bitmap-composite`, `effect`, and `system-chrome`. Use this to decide component boundaries and crop assets.
20. In Figma, keep the approved raster screen as a locked reference beside the work frame or on a separate reference page, but make the deliverable phone frame visible as a componentized editable reconstruction. The final visible screen must not be a single full-screen bitmap.
21. Assemble the visible frame from movable materials: cropped bitmap assets for photos/generated results, editable text for labels and copy, vector/icon layers for glyphs, and component instances for repeated UI. If a complex media area cannot be redrawn faithfully, keep that region as its own movable bitmap asset, not as part of a flattened full-screen screenshot.
22. For multi-screen sets, run a consistency pass for tokens, navigation, component reuse, icon language, shared media identity, state language, and flow continuity.
23. Run visual difference checks against the approved image after each major region: media crop, card background, text hierarchy, icon placement, charts, tab bar, and safe areas. Fix drift before claiming 1:1.
24. Validate against mobile constraints and pixel fidelity: reachability, touch targets, small-screen clipping, keyboard behavior, scroll rhythm, accessibility, dark mode, large text, asset loading, image/text overlap, standard phone aspect ratio, movable/editable Figma layers, and visual match to the approved image.
25. Save or update the delivery package: README, production brief, assets, Figma script/spec/ledger, verification screenshots, diff report when needed, and handoff notes.
26. Return concrete specs: inferred industry classification, industry-fit style rationale, secondary task model, page structure, component inventory, asset inventory, icon inventory, state matrix, token recommendations, interaction states, benchmark-derived rationale, standard phone-size visual artifact when requested, Figma output or import package path when applicable, and review checklist.

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
- For synthesized rules across Apple, Google, Meta/Facebook, Microsoft, Samsung, Alibaba/Ant, Tencent/WeChat, ByteDance, and Meituan, read `references/research/mobile-ui-principles.md`.
- For platform and company image/crop guidance from Apple, Android/Material, Tencent, Alibaba/Ant, Meituan, and JD, read `references/research/platform-image-guidelines.md`.
- For selecting the right phone canvas and Figma frame size from platform, prototype, and product type, read `references/workflow/screen-size-selection.md`.
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
- For screenshot normalization, region checklists, pixel/threshold diff rules, diff report templates, and fidelity labels, read `references/workflow/visual-diff.md`.
- For UI Notes industry-based app type selection, read `references/industry/product-archetypes.md`.
- For industry-fit visual style, read `references/industry/style-decision-guide.md`.
- For AI-generated or sourced bitmap assets, read `references/workflow/visual-asset-generation.md`.
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
- Production brief summary: screen scope, output route, asset/icon inventories, layer plan, and acceptance criteria.
- Screen hierarchy and navigation model.
- Component list with states and component-system notes.
- Visual asset inventory, generated/sourced image plan, and image composition rules when imagery is needed.
- State matrix and multi-screen consistency notes when more than one screen is produced.
- Layout, spacing, typography, color/material, imagery/media, icon, and density rules.
- Interaction behavior, feedback, and motion.
- Accessibility and edge-state checks.
- Standard phone-size Image artifact first, then direct Figma output when write tools are available, or a Figma-ready import package when they are not.
- For Figma converted from images, include whether the visible result is pixel-faithful, which components were created, which bitmap regions were reused as movable crops, and whether every visible region is independently movable/selectable.
- For Figma converted from images, include the layer classification and any bitmap-composite exceptions. Do not call the result 1:1 unless a visual comparison was performed.
- For direct Figma writes, include the script audit result: page/frame ids, image node ids for upload/backfill, component inventory, icon inventory, warnings, and screenshot verification status.
- For visual fidelity claims, include the visual diff level performed: manual visual check, region checklist, or pixel diff.
- For delivery work, include package paths: README, production brief, handoff, assets, Figma spec/ledger/script, verification screenshots, and visual diff report when created.
- When using repository scripts, include the exact `scripts/export-crops.js` or `scripts/visual-diff.js` command and the output paths.
- HTML/local preview only when the user needs interaction, implementation, or responsive behavior checks.
- Any open questions that block accurate design.
