# Figma Reconstruction

Use this file when a generated mobile design image, user screenshot, prototype render, or approved visual mockup must be rebuilt in Figma. The goal is both visual fidelity and editability.

## Core Rule

The approved raster image is the visual source of truth. The Figma deliverable must match that image first, then expose the design as movable materials. Do not replace a beautiful image-led design with a simplified redraw, and do not paste one full-screen screenshot as the editable result.

## Fidelity Levels

Use these labels honestly in handoff notes:

- `Design image`: a polished raster screen. It may be visually strong but is not editable Figma.
- `Editable draft`: a Figma reconstruction with movable layers, but visible differences remain in layout, crop, icons, typography, or density.
- `High-fidelity editable`: Figma layers are editable and broadly match the approved image at phone scale. Some minor icon, shadow, or spacing drift may remain and must be listed.
- `Pixel-faithful`: a Figma screenshot was compared against the approved raster at the same logical size, and major regions match: screen geometry, media crop, color, typography hierarchy, icon placement, spacing, bottom nav, and safe areas. Any bitmap-composite regions are documented.

Do not use `1:1`, `pixel-perfect`, or `pixel-faithful` for an editable draft. If no screenshot comparison was performed, the highest allowed label is `high-fidelity editable`.

## Required Output Structure

Every image-to-Figma conversion must contain:

- Locked reference frame: the full approved screen image at the same logical frame size.
- Editable reconstruction frame: the visible deliverable, rebuilt from layers.
- Component kit or reusable groups: navigation, tabs, chips, cards, buttons, lists, metrics, editor tools, sheets, and repeated content modules.
- Icon inventory: one explicit row for every tab icon, toolbar icon, action icon, badge, empty-state icon, and custom glyph. Each row states whether it will be rebuilt as vector, imported from a known icon library, generated separately, or cropped from the source.
- Bitmap crop assets: one separate image node for each photo, media thumbnail, avatar, editor canvas, generated result, product shot, cover, or complex illustration region.
- Fidelity ledger: what is editable, what is bitmap-backed, what was intentionally preserved as a crop, and what limitations remain.

Use `figma-component-system.md` to decide component names, states, component-like groups, and component ledger requirements.

## Layer Classification

Before drawing, classify every visible region:

- `layout`: backgrounds, cards, sheets, separators, grids, safe areas, nav containers, button surfaces, tab indicators.
- `editable-text`: titles, labels, metadata, counters, body copy, prices, status copy, chip text, CTA labels.
- `vector-icon`: icons, simple glyphs, badges, progress strokes, controls, rating marks, simple charts.
- `bitmap-media`: photos, food/product images, pet or people photos, covers, thumbnails, generated AI results, editor canvases, illustrations, map tiles, posters.
- `bitmap-composite`: a complex region that mixes image, lighting, blur, shadows, or generated texture and cannot be cleanly separated without changing the visual. This is allowed only as a movable region, never as the whole screen.
- `effect`: scrim, blur plate, shadow, tint overlay, gradient fade, mask, clipped rounded container.
- `system-chrome`: status bar, home indicator, safe area, native tab bar, keyboard, permission prompt, host-app chrome.

If a region contains user-facing UI text, do not keep that text inside a bitmap unless separating it would visibly damage the approved design. When that exception is used, label the layer `Bitmap Composite / ...` and record the reason in the ledger.

## Generation-Time Layer Planning

Do this before creating the first raster screen. The image generation prompt should not be the only source of truth.

1. Draft the target screen as a layer plan: chrome, navigation, tabs, cards, media, copy, icons, overlays, sheets, and states.
2. Mark every region as `editable-vector`, `editable-text`, `bitmap-media`, `bitmap-composite`, or `effect`.
3. Create an icon inventory before generation. Do not let the image model invent generic circles for tab icons or action icons.
4. Decide which visuals need separate assets:
   - full reference screen
   - clean photo/media assets
   - avatars and thumbnails
   - complex hero composites
   - custom icon set, if the icons are brand-specific or illustrated
5. Ask the image model for the app screen and, when needed, ask for a companion asset sheet with clean icons or media crops. The screen image establishes composition; the asset sheet supports faithful Figma reconstruction.
6. If the user supplied a prototype or screenshot, preserve the original navigation count, tab meanings, and major spatial relationships. Do not simplify a five-tab app into five circles.

## Icon Handling Rules

Icons are product controls, not decoration. Treat them as first-class assets.

For detailed icon source decisions, generated icon sheets, source-raster crops, vector reconstruction, bottom navigation rules, and badge handling, use `icon-pipeline.md`.

- For standard icons such as home, search, back, close, share, notification, message, profile, settings, cart, map, filter, play, camera, undo, export, and plus, rebuild them as vector icons or import from the project's icon library. Do not approximate them with circles, emoji, or unrelated glyphs.
- For custom brand icons such as paw tabs, mascot marks, creator-tool icons, game icons, or stylized category marks, either generate a clean icon asset sheet at the same time as the screen or crop the exact icon from the source raster.
- For bottom tabs, every tab must have the correct semantic icon and selected/unselected states. Placeholder circles are allowed only in wireframes, never in a high-fidelity Figma handoff.
- Preserve icon size, stroke weight, optical alignment, active color, inactive color, badge placement, and hit area.
- Keep icons independent from labels so the user can move, recolor, or replace them in Figma.
- If an icon is cropped from the raster source, name it `Bitmap Icon / ...`; if it is rebuilt, name it `Vector / ...` or `Component / Icon / ...`.
- If a faithful icon cannot be produced in the current pass, mark it as a fidelity issue in the ledger instead of silently substituting a different shape.

## Asset Crop Rules

Use original source assets when available. If only the full raster screen exists, crop media regions from that screen.

- Crop at source resolution, then place at logical Figma size.
- Preserve aspect ratio; no non-proportional stretching.
- Match the original focal point, corner radius, mask shape, scrim, shadow, and overlay.
- Use cover behavior for hero images, feed thumbnails, product cards, restaurant photos, travel cards, and community media.
- Use contain behavior only for editor canvases, before/after comparisons, document previews, QR codes, maps that must show exact bounds, and objects where cropping destroys meaning.
- Do not substitute a different photo during Figma reconstruction. If the photo is wrong, regenerate or crop the correct source first.
- Keep each avatar/photo/media area as its own movable bitmap node so it can be replaced later.

## Size Matching Rules

The raster and Figma frame must share a clear scale:

- Recommended raster sizes: `1179x2556`, `1290x2796`, or equivalent portrait `9:19.5`.
- Recommended logical Figma sizes: `393x852`, `430x932`, or the exact device frame requested.
- Document the scale, usually `3x`.
- All position, radius, typography, and crop values are recorded in logical Figma pixels, not source pixels.
- Do not compress multiple screens into one small artboard as the only design handoff.

## Platform And Big-App Heuristics

Use platform and large-company references as decision inputs, not as templates to copy.

- Apple HIG: respect safe areas, familiar hierarchy, platform chrome, readable text, high-resolution imagery, and at least `44x44pt` practical hit areas.
- Android and Material: keep Android targets around `48x48dp`, preserve content descriptions, use clear state feedback, and adapt layout to compact/medium/expanded contexts when needed.
- Ant Design Mobile and Alibaba/Ant patterns: use modular mobile components, clear feedback, configurable themes, business-flow certainty, and restrained but polished components.
- Tencent TDesign and WeUI patterns: for mini-program, super-app, H5-in-mobile, and service-entry flows, prefer familiar cells, sheets, dialogs, toasts, uploaders, tabs, dark-mode readiness, and multi-stack consistency.
- Meituan practice: for service/food/local-life products, keep a standard color palette, icon library, real-data filling, reusable business components, and theme adaptation across host apps.
- JD/NutUI practice: for retail and commerce-heavy flows, preserve visual product richness, promotion density, cross-platform H5/mini-program consistency, search/filter/detail/cart/payment paths, and component reuse.
- ByteDance Arco/Semi-style systems: for high-throughput tools and creator products, use lightweight modern defaults, theme customization, internationalization, and component-to-code clarity.

These heuristics decide dimensions and behavior. They must not lead to copying another company's brand, exact component styling, screenshots, or proprietary assets.

## Figma Script Template

The Figma JavaScript must be explicit enough that another pass can inspect and fix it. Do not write a tiny script that hides layout decisions in magic numbers or unnamed nodes.

Minimum requirements:

- Define constants for frame size, scale, safe areas, spacing, radius, colors, typography, and asset keys.
- Load fonts up front and use only loaded font names.
- Use helper functions for fills, text, frames, cards, media, icons, badges, and component-like groups.
- Name every node by role: `Locked Reference /`, `Editable Screen /`, `Component /`, `Text /`, `Vector /`, `Bitmap Crop /`, `Bitmap Composite /`, `Effect /`, `System Chrome /`.
- Put asset keys in shared plugin data so image nodes can be found and backfilled after upload.
- Return a structured audit object: page id, frame ids, image node ids, component ids, icon inventory, layer counts, warnings, and next verification steps.
- Never set `figma.currentPage = page`; use `await figma.setCurrentPageAsync(page)`.
- Do not silently substitute placeholder circles for icons. If a proper icon cannot be drawn, add a warning and name the layer as a placeholder.

Use a script shape like this for `use_figma`. Replace image hashes after uploading assets, or create placeholders first and use the returned `imageNodes` map for `upload_assets`.

For repeatable work, start from `templates/figma-reconstruction.js`. Keep project-specific copies in the delivery package, usually at `figma/figma-build-script.js`, so the exact build can be inspected and rerun.

```js
const SPEC = {
  pageName: "Mobile App / Editable Reconstruction",
  frame: { width: 393, height: 852, radius: 34 },
  source: { width: 1179, height: 2556, scale: 3 },
  safeArea: { top: 48, bottom: 34 },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  color: {
    bg: "#FFFDF9",
    surface: "#FFFFFF",
    surfaceSoft: "#F4F7F2",
    text: "#172019",
    textMuted: "#7A827A",
    line: "#E8ECE7",
    brand: "#7EBE42",
    accent: "#FF6B5F",
    warning: "#F59E0B",
    dark: "#111827",
    white: "#FFFFFF"
  },
  font: {
    regular: { family: "Inter", style: "Regular" },
    medium: { family: "Inter", style: "Medium" },
    bold: { family: "Inter", style: "Bold" }
  }
};

const ASSETS = {
  referenceHome: { kind: "locked-reference", description: "Full approved home screen" },
  homeHero: { kind: "bitmap-composite", description: "Hero photo region; use exact source crop" },
  feedAvatar1: { kind: "bitmap-media", description: "Author avatar 1" },
  feedPhoto1: { kind: "bitmap-media", description: "Feed card photo 1" }
};

const ICONS = [
  { key: "home", label: "Home", role: "bottom-tab", source: "vector", states: ["selected", "default"] },
  { key: "discover", label: "Discover", role: "bottom-tab", source: "vector", states: ["default"] },
  { key: "publish", label: "Publish", role: "bottom-tab", source: "vector", states: ["default"] },
  { key: "message", label: "Message", role: "bottom-tab", source: "vector", states: ["default", "badge"] },
  { key: "profile", label: "Profile", role: "bottom-tab", source: "vector", states: ["default"] }
];

const imageHashes = {
  referenceHome: "",
  homeHero: "",
  feedAvatar1: "",
  feedPhoto1: ""
};

const audit = {
  pageId: null,
  frames: [],
  imageNodes: {},
  components: [],
  icons: ICONS,
  warnings: [],
  layerCounts: {},
  verification: [
    "Export each editable frame at 393x852.",
    "Compare against the locked reference: chrome, hero, media, typography, bottom navigation, and safe areas.",
    "Do not claim 1:1 until region-level drift is checked."
  ]
};

await Promise.all([
  figma.loadFontAsync(SPEC.font.regular),
  figma.loadFontAsync(SPEC.font.medium),
  figma.loadFontAsync(SPEC.font.bold)
]);

function solid(hex, opacity = 1) {
  const n = parseInt(hex.replace("#", ""), 16);
  return {
    type: "SOLID",
    color: {
      r: ((n >> 16) & 255) / 255,
      g: ((n >> 8) & 255) / 255,
      b: (n & 255) / 255
    },
    opacity
  };
}

function imageFill(hash, fallback = SPEC.color.surfaceSoft) {
  if (!hash) return [solid(fallback)];
  return [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
}

function setIntent(node, classification, data = {}) {
  node.setSharedPluginData("mobile_app_ui_design", "classification", classification);
  for (const [key, value] of Object.entries(data)) {
    node.setSharedPluginData("mobile_app_ui_design", key, String(value));
  }
  return node;
}

function add(parent, child) {
  parent.appendChild(child);
  return child;
}

function createPage(name) {
  const page = figma.createPage();
  page.name = name;
  return page;
}

function createPhoneFrame(name, x, y, fill = SPEC.color.bg) {
  const node = figma.createFrame();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(SPEC.frame.width, SPEC.frame.height);
  node.cornerRadius = SPEC.frame.radius;
  node.clipsContent = true;
  node.fills = [solid(fill)];
  setIntent(node, name.startsWith("Locked Reference") ? "locked-reference" : "editable-screen");
  return node;
}

function createRect(name, x, y, w, h, fill = SPEC.color.surface, radius = SPEC.radius.md) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.cornerRadius = radius;
  node.fills = fill ? [solid(fill)] : [];
  return node;
}

function createMedia(parent, key, name, x, y, w, h, radius, options = {}) {
  const node = createRect(
    `Bitmap ${options.composite ? "Composite" : "Crop"} / ${name}`,
    x,
    y,
    w,
    h,
    options.fallback || SPEC.color.surfaceSoft,
    radius
  );
  node.fills = imageFill(imageHashes[key], options.fallback || SPEC.color.surfaceSoft);
  setIntent(node, options.composite ? "bitmap-composite" : "bitmap-media", {
    assetKey: key,
    crop: options.crop || "FILL",
    description: options.description || ASSETS[key]?.description || ""
  });
  add(parent, node);
  audit.imageNodes[key] = node.id;
  return node;
}

function createText(name, value, x, y, size, color = SPEC.color.text, font = SPEC.font.medium, width = null) {
  const node = figma.createText();
  node.name = name;
  node.fontName = font;
  node.fontSize = size;
  node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.28) };
  node.fills = [solid(color)];
  node.characters = value;
  node.x = x;
  node.y = y;
  if (width) {
    node.resize(width, node.height);
    node.textAutoResize = "HEIGHT";
  }
  setIntent(node, "editable-text");
  return node;
}

function createLine(name, x, y, width, color = SPEC.color.textMuted, weight = 2) {
  const node = figma.createLine();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(width, 0);
  node.strokes = [solid(color)];
  node.strokeWeight = weight;
  node.strokeCap = "ROUND";
  setIntent(node, "vector-icon");
  return node;
}

function createEllipse(name, x, y, w, h, fill = null, stroke = null, weight = 2) {
  const node = figma.createEllipse();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(w, h);
  node.fills = fill ? [solid(fill)] : [];
  if (stroke) {
    node.strokes = [solid(stroke)];
    node.strokeWeight = weight;
  }
  setIntent(node, "vector-icon");
  return node;
}

function createBadge(parent, name, x, y, value) {
  add(parent, createEllipse(`Component / Badge / ${name}`, x, y, 16, 16, SPEC.color.accent));
  add(parent, createText(`Text / Badge / ${name}`, value, x + 5, y + 2, 9, SPEC.color.white, SPEC.font.bold));
}

function groupAsComponent(parent, nodes, name, classification = "component") {
  const group = figma.group(nodes, parent);
  group.name = `Component / ${name}`;
  setIntent(group, classification);
  audit.components.push({ id: group.id, name: group.name, classification });
  return group;
}

function iconHome(parent, cx, cy, color) {
  const nodes = [];
  const roofLeft = createLine("Vector / Icon / Home / roof left", cx - 10, cy - 1, 10, color, 2.2);
  roofLeft.rotation = -38;
  nodes.push(add(parent, roofLeft));
  const roofRight = createLine("Vector / Icon / Home / roof right", cx, cy - 7, 10, color, 2.2);
  roofRight.rotation = 38;
  nodes.push(add(parent, roofRight));
  const body = createRect("Vector / Icon / Home / body", cx - 8, cy, 16, 13, null, 3);
  body.fills = [];
  body.strokes = [solid(color)];
  body.strokeWeight = 2.2;
  setIntent(body, "vector-icon");
  nodes.push(add(parent, body));
  return groupAsComponent(parent, nodes, "Icon / Home", "vector-icon");
}

function iconMessage(parent, cx, cy, color, badgeValue = null) {
  const nodes = [];
  const bubble = createRect("Vector / Icon / Message / bubble", cx - 12, cy - 9, 24, 18, null, 8);
  bubble.fills = [];
  bubble.strokes = [solid(color)];
  bubble.strokeWeight = 2;
  setIntent(bubble, "vector-icon");
  nodes.push(add(parent, bubble));
  const tail = figma.createPolygon();
  tail.name = "Vector / Icon / Message / tail";
  tail.pointCount = 3;
  tail.x = cx + 3;
  tail.y = cy + 5;
  tail.resize(8, 7);
  tail.rotation = 30;
  tail.fills = [solid(color)];
  setIntent(tail, "vector-icon");
  nodes.push(add(parent, tail));
  if (badgeValue) {
    const badge = createEllipse("Component / Icon Badge / Message", cx + 9, cy - 16, 16, 16, SPEC.color.accent);
    const badgeText = createText("Text / Icon Badge / Message", badgeValue, cx + 14, cy - 14, 9, SPEC.color.white, SPEC.font.bold);
    nodes.push(add(parent, badge), add(parent, badgeText));
  }
  return groupAsComponent(parent, nodes, "Icon / Message", "vector-icon");
}

function createBottomNav(parent, activeKey = "home") {
  add(parent, createRect("Component / Bottom Navigation / Surface", 0, 772, SPEC.frame.width, 80, SPEC.color.surface, 28));
  const items = [
    { key: "home", label: "首页", x: 52, icon: iconHome },
    { key: "discover", label: "发现", x: 130, icon: iconHome, warning: "Replace with compass icon if this app uses discovery." },
    { key: "publish", label: "发布", x: 208, icon: iconHome, warning: "Replace with product-specific publish icon." },
    { key: "message", label: "消息", x: 286, icon: iconMessage, badge: "9" },
    { key: "profile", label: "我的", x: 364, icon: iconHome, warning: "Replace with profile icon." }
  ];
  for (const item of items) {
    const active = item.key === activeKey;
    const color = active ? SPEC.color.brand : "#BFC4BF";
    if (item.warning) audit.warnings.push(`Icon placeholder: ${item.key}. ${item.warning}`);
    item.icon(parent, item.x, 804, color, item.badge);
    add(parent, createText(`Text / Bottom Nav Label / ${item.label}`, item.label, item.x - 12, 828, 11, active ? SPEC.color.brand : SPEC.color.textMuted, active ? SPEC.font.bold : SPEC.font.medium));
  }
}

function createLockedReference(page, key, name, x, y) {
  const ref = createPhoneFrame(`Locked Reference / ${name}`, x, y, "#F3F4F6");
  createMedia(ref, key, `${name} Full Raster`, 0, 0, SPEC.frame.width, SPEC.frame.height, SPEC.frame.radius, {
    composite: true,
    description: "Full reference image. Locked audit layer only."
  });
  ref.locked = true;
  page.appendChild(ref);
  audit.frames.push({ id: ref.id, name: ref.name, locked: true });
  return ref;
}

function createEditableScreen(page, name, x, y) {
  const screen = createPhoneFrame(`Editable Screen / ${name}`, x, y);
  page.appendChild(screen);
  audit.frames.push({ id: screen.id, name: screen.name, locked: false });
  return screen;
}

function countLayers(root) {
  const counts = {};
  function visit(node) {
    counts[node.type] = (counts[node.type] || 0) + 1;
    if ("children" in node) node.children.forEach(visit);
  }
  visit(root);
  return counts;
}

const page = createPage(SPEC.pageName);
await figma.setCurrentPageAsync(page);
audit.pageId = page.id;

const ref = createLockedReference(page, "referenceHome", "01 Home", 120, 120);
const screen = createEditableScreen(page, "01 Home", 120 + SPEC.frame.width + 32, 120);

createMedia(screen, "homeHero", "Home Hero", 16, 168, 361, 170, 18, {
  composite: true,
  description: "If this crop already contains title/CTA/avatar overlays, do not duplicate those as editable layers."
});
add(screen, createText("Text / App Name", "App Name", 22, 58, 28, SPEC.color.text, SPEC.font.bold));
add(screen, createText("Text / Segment / Active", "推荐", 38, 113, 18, SPEC.color.brand, SPEC.font.bold));
add(screen, createRect("Component / Segment Indicator", 50, 148, 32, 4, SPEC.color.brand, 2));
add(screen, createRect("Component / Card / Feed Item", 16, 422, 361, 150, SPEC.color.surface, 18));
createMedia(screen, "feedAvatar1", "Feed Author Avatar", 28, 438, 36, 36, 18);
add(screen, createText("Text / Feed Author", "用户名", 76, 438, 15, SPEC.color.text, SPEC.font.bold));
createMedia(screen, "feedPhoto1", "Feed Photo", 214, 438, 142, 112, 14);
createBottomNav(screen, "home");

const ledger = figma.createText();
ledger.name = "Fidelity Ledger / Script Audit";
ledger.fontName = SPEC.font.regular;
ledger.fontSize = 13;
ledger.lineHeight = { unit: "PIXELS", value: 18 };
ledger.characters = [
  "Layer plan: locked reference + editable reconstruction.",
  "Image nodes expose shared assetKey data for upload/backfill.",
  "Icons are semantic vector groups; warnings list any placeholders.",
  "Do not claim 1:1 until exported screenshot is compared with the locked reference."
].join("\\n");
ledger.resize(620, 120);
ledger.x = 120;
ledger.y = 120 + SPEC.frame.height + 56;
ledger.fills = [solid(SPEC.color.textMuted)];
page.appendChild(ledger);

audit.layerCounts[ref.name] = countLayers(ref);
audit.layerCounts[screen.name] = countLayers(screen);

figma.viewport.scrollAndZoomIntoView([ref, screen]);

return audit;
```

## Visual Difference Check

Do not claim `1:1` without a comparison step.

For detailed normalization, region checklist, pixel diff, failure categories, and report templates, use `visual-diff.md`.

1. Capture or export the editable Figma frame at the same logical size as the reference.
2. Compare against the approved raster screen region by region: chrome, header, hero/media, content cards, text blocks, tab bar, floating actions, safe areas.
3. Check for the common drifts:
   - changed photo or focal crop
   - duplicated text over a bitmap region
   - simplified shadows that alter depth
   - text width, line height, or weight mismatch
   - icons replaced by unrelated symbols
   - card radius or spacing drift
   - bottom navigation height or safe-area mismatch
   - image letterboxing or unintended center-fit behavior
4. Fix the largest visible mismatch first. Fidelity beats arbitrary layer purity.
5. Record remaining bitmap-backed regions and why they exist.

Suggested tolerance:

- Critical regions such as headers, hero images, bottom nav, editor canvas, product/food photos, and primary CTA should be visually indistinguishable at phone scale.
- Minor icon glyph differences may be acceptable only if the meaning, size, weight, and position match.
- A different image, changed crop, changed density, or missing module means the result is not `1:1`.

## Acceptance Checklist

- The visible deliverable is not one full-screen bitmap.
- The locked reference is present and separate.
- Text is editable wherever possible.
- Cards, chips, buttons, tabs, nav, forms, stats, charts, and toolbars are components or grouped editable layers.
- Every photo/media/generated-result area is a separate movable bitmap node.
- No image is stretched, letterboxed unintentionally, or replaced by a different photo.
- Frame size, safe area, status bar, home indicator, and bottom controls match the source.
- The layer names reveal intent: `Component /`, `Text /`, `Bitmap Crop /`, `Vector /`, `Effect /`, `Locked Reference /`.
- The fidelity ledger explains any bitmap-composite exceptions.
- The final screenshot has been compared to the approved image before handoff.
