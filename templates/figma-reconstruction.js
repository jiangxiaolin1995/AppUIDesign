// AppUIDesign Figma reconstruction template.
// Paste into use_figma after filling SPEC, ASSETS, imageHashes, and screen builders.
// The visible frame must be editable. The full raster screen is reference only.

const SPEC = {
  pageName: "Mobile App / Editable Reconstruction",
  frame: { width: 393, height: 852, radius: 42 },
  font: {
    regular: { family: "Inter", style: "Regular" },
    medium: { family: "Inter", style: "Medium" },
    bold: { family: "Inter", style: "Bold" }
  },
  color: {
    bg: "#F7F7F2",
    surface: "#FFFFFF",
    surfaceSoft: "#F0F2EC",
    text: "#172018",
    textMuted: "#7D847B",
    brand: "#62B43E",
    accent: "#FF665E",
    line: "#E7E9E2",
    white: "#FFFFFF"
  }
};

const ASSETS = {
  "home-reference": { role: "locked-reference", description: "Approved full-screen raster reference" },
  "home-hero": { role: "bitmap-media", description: "Clean media or exact source crop for the hero region" }
};

const imageHashes = {
  "home-reference": "",
  "home-hero": ""
};

const ICONS = [
  { key: "home", label: "Home", source: "vector", required: true },
  { key: "search", label: "Search", source: "vector", required: true },
  { key: "profile", label: "Profile", source: "vector", required: true }
];

// Optional manifest-driven input. Replace null with DESIGN_MANIFEST from
// scripts/build-figma-packet.js to generate reference/editable frames, media
// rectangles, and text boxes directly from the asset manifest.
const DESIGN_MANIFEST = null;

const audit = {
  pageId: null,
  frames: {},
  imageNodes: {},
  referencePairs: [],
  assetFills: [],
  components: [],
  icons: ICONS,
  warnings: [],
  layerEditability: {
    fullScreenScreenshotUsedAsVisible: false,
    textLayerCount: 0,
    vectorIconCount: 0,
    bitmapMediaCount: 0
  },
  layerCounts: {}
};

await Promise.all([
  figma.loadFontAsync(SPEC.font.regular),
  figma.loadFontAsync(SPEC.font.medium),
  figma.loadFontAsync(SPEC.font.bold)
]);

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255
  };
}

function solid(hex, opacity = 1) {
  return { type: "SOLID", color: hexToRgb(hex), opacity };
}

function imagePaint(hash, fallback = SPEC.color.surfaceSoft) {
  if (!hash) {
    audit.warnings.push(`Missing image hash; using ${fallback} fallback.`);
    return [solid(fallback)];
  }
  return [{ type: "IMAGE", imageHash: hash, scaleMode: "FILL" }];
}

function tag(node, kind, data = {}) {
  node.setSharedPluginData("app-ui-design", "kind", kind);
  node.setSharedPluginData("app-ui-design", "data", JSON.stringify(data));
  return node;
}

function append(parent, child) {
  parent.appendChild(child);
  return child;
}

function makePage() {
  const page = figma.createPage();
  page.name = SPEC.pageName;
  audit.pageId = page.id;
  return page;
}

function makePhoneFrame(name, x, y, fill = SPEC.color.bg) {
  const frame = figma.createFrame();
  frame.name = `Frame / ${name}`;
  frame.x = x;
  frame.y = y;
  frame.resize(SPEC.frame.width, SPEC.frame.height);
  frame.cornerRadius = SPEC.frame.radius;
  frame.clipsContent = true;
  frame.fills = [solid(fill)];
  tag(frame, "phone-frame", { width: SPEC.frame.width, height: SPEC.frame.height });
  audit.frames[name] = frame.id;
  return frame;
}

function rect(name, x, y, width, height, fill = SPEC.color.surface, radius = 0) {
  const node = figma.createRectangle();
  node.name = name;
  node.x = x;
  node.y = y;
  node.resize(width, height);
  node.cornerRadius = radius;
  node.fills = [solid(fill)];
  tag(node, "layout");
  return node;
}

function media(name, assetKey, x, y, width, height, radius = 0, mode = "FILL") {
  const node = figma.createRectangle();
  node.name = `Bitmap Crop / ${name}`;
  node.x = x;
  node.y = y;
  node.resize(width, height);
  node.cornerRadius = radius;
  const hasImageHash = Boolean(imageHashes[assetKey]);
  node.fills = hasImageHash ? [{ type: "IMAGE", imageHash: imageHashes[assetKey], scaleMode: mode }] : imagePaint("", SPEC.color.surfaceSoft);
  tag(node, ASSETS[assetKey]?.role || "bitmap-media", { assetKey, mode, description: ASSETS[assetKey]?.description || "" });
  audit.imageNodes[assetKey] = node.id;
  audit.assetFills.push({
    assetKey,
    nodeId: node.id,
    nodeName: node.name,
    fillType: hasImageHash ? "IMAGE" : "PLACEHOLDER",
    scaleMode: mode,
    hasImageHash
  });
  if (ASSETS[assetKey]?.role !== "locked-reference") audit.layerEditability.bitmapMediaCount += 1;
  return node;
}

function text(name, value, x, y, size, color = SPEC.color.text, font = SPEC.font.medium, width = null) {
  const node = figma.createText();
  node.name = `Text / ${name}`;
  node.fontName = font;
  node.characters = value;
  node.fontSize = size;
  node.fills = [solid(color)];
  node.x = x;
  node.y = y;
  if (width) {
    node.textAutoResize = "HEIGHT";
    node.resize(width, node.height);
  }
  tag(node, "editable-text");
  audit.layerEditability.textLayerCount += 1;
  return node;
}

function lineIcon(name, strokes) {
  const group = figma.group(strokes, figma.currentPage);
  group.name = `Component / Icon / ${name}`;
  tag(group, "vector-icon");
  audit.components.push({ name: group.name, id: group.id, kind: "icon" });
  audit.layerEditability.vectorIconCount += 1;
  return group;
}

function iconSearch(parent, cx, cy, color) {
  const circle = figma.createEllipse();
  circle.name = "Vector / Search Lens";
  circle.x = cx - 9;
  circle.y = cy - 9;
  circle.resize(15, 15);
  circle.fills = [];
  circle.strokes = [solid(color)];
  circle.strokeWeight = 2;
  const handle = figma.createLine();
  handle.name = "Vector / Search Handle";
  handle.x = cx + 3;
  handle.y = cy + 3;
  handle.resize(8, 0);
  handle.rotation = 45;
  handle.strokes = [solid(color)];
  handle.strokeWeight = 2;
  const group = lineIcon("Search", [circle, handle]);
  parent.appendChild(group);
  return group;
}

function iconHome(parent, cx, cy, color) {
  const roof = figma.createPolygon();
  roof.name = "Vector / Home Roof";
  roof.pointCount = 3;
  roof.x = cx - 11;
  roof.y = cy - 13;
  roof.resize(22, 18);
  roof.fills = [solid(color)];
  const body = rect("Vector / Home Body", cx - 9, cy - 1, 18, 14, color, 4);
  const group = lineIcon("Home", [roof, body]);
  parent.appendChild(group);
  return group;
}

function bottomNav(parent, activeKey, items) {
  append(parent, rect("Component / Bottom Nav / Surface", 0, 772, SPEC.frame.width, 80, SPEC.color.surface, 28));
  for (const item of items) {
    const active = item.key === activeKey;
    const color = active ? SPEC.color.brand : "#BBC0B7";
    if (!item.icon) audit.warnings.push(`Bottom tab ${item.key} has no icon builder.`);
    else item.icon(parent, item.x, 804, color);
    append(parent, text(`Bottom Nav Label / ${item.label}`, item.label, item.x - 14, 828, 11, active ? SPEC.color.brand : SPEC.color.textMuted, active ? SPEC.font.bold : SPEC.font.medium, 40));
  }
  audit.components.push({ name: "Component / Bottom Nav", kind: "navigation" });
}

function lockedReference(page, assetKey, name, x, y) {
  const frame = makePhoneFrame(`Locked Reference / ${name}`, x, y, "#EDEDEB");
  append(frame, media(`${name} Full Raster`, assetKey, 0, 0, SPEC.frame.width, SPEC.frame.height, SPEC.frame.radius));
  frame.locked = true;
  page.appendChild(frame);
  return frame;
}

function frameSizeFromManifest(screen) {
  return {
    width: Number(screen.logicalFrame?.width || SPEC.frame.width),
    height: Number(screen.logicalFrame?.height || SPEC.frame.height)
  };
}

function resizeFrameFromManifest(frame, screen) {
  const size = frameSizeFromManifest(screen);
  frame.resize(size.width, size.height);
  tag(frame, "phone-frame", size);
}

function assetRole(asset) {
  if (asset.kind === "full-screen-reference") return "locked-reference";
  if (asset.kind === "clean-media") return "bitmap-media";
  if (asset.kind === "custom-icon-sheet") return "bitmap-icon-sheet";
  return "bitmap-media";
}

function mediaFromManifest(parent, screen, region) {
  const asset = (screen.assets || []).find((item) => item.id === region.assetId);
  if (!asset) {
    audit.warnings.push(`Region ${screen.id}/${region.id} references missing asset ${region.assetId}.`);
    return null;
  }
  ASSETS[asset.id] = { role: assetRole(asset), description: asset.overlaySplit || asset.kind };
  const r = region.rect;
  return append(parent, media(`${screen.name} / ${region.id}`, asset.id, r.x, r.y, r.width, r.height, region.radius || asset.radius || 0, asset.cropMode === "contain" ? "FIT" : "FILL"));
}

function textFromManifest(parent, screen, item) {
  const r = item.rect;
  return append(parent, text(`${screen.name} / ${item.id}`, item.text, r.x, r.y, item.fontSize, item.color || SPEC.color.text, item.weight >= 700 ? SPEC.font.bold : item.weight >= 500 ? SPEC.font.medium : SPEC.font.regular, r.width));
}

function buildScreenPairFromManifest(page, screen, x, y) {
  const size = frameSizeFromManifest(screen);
  const refAsset = (screen.assets || []).find((item) => item.kind === "full-screen-reference") || screen.assets?.[0];
  if (!refAsset) throw new Error(`Screen ${screen.id} has no reference asset.`);
  ASSETS[refAsset.id] = { role: "locked-reference", description: "Approved full-screen raster reference" };

  const ref = makePhoneFrame(`Locked Reference / ${screen.name}`, x, y, "#EDEDEB");
  resizeFrameFromManifest(ref, screen);
  append(ref, media(`${screen.name} / full-reference`, refAsset.id, 0, 0, size.width, size.height, SPEC.frame.radius, "FIT"));
  ref.locked = true;
  page.appendChild(ref);

  const editable = makePhoneFrame(`Editable Reconstruction / ${screen.name}`, x + size.width + 40, y);
  resizeFrameFromManifest(editable, screen);
  page.appendChild(editable);

  for (const region of screen.regions || []) {
    if (region.type === "bitmap-media") mediaFromManifest(editable, screen, region);
    if (region.type === "layout" || region.type === "component") {
      const r = region.rect;
      append(editable, rect(region.targetNode || `Component / ${screen.name} / ${region.id}`, r.x, r.y, r.width, r.height, SPEC.color.surface, region.radius || 0));
      audit.components.push({ name: region.targetNode || region.id, kind: region.type });
    }
  }
  for (const item of screen.textLayers || []) textFromManifest(editable, screen, item);
  for (const icon of screen.icons || []) audit.icons.push({ key: icon.id, label: icon.label, source: icon.source, status: icon.source === "placeholder" ? "warning" : "planned" });

  audit.referencePairs.push({
    screen: screen.name,
    referenceFrameId: ref.id,
    editableFrameId: editable.id,
    referenceName: `Locked Reference / ${screen.name}`,
    editableName: `Editable Reconstruction / ${screen.name}`,
    sameSize: ref.width === editable.width && ref.height === editable.height,
    logicalSize: size
  });
  return { ref, editable };
}

function editableHome(page, x, y) {
  const frame = makePhoneFrame("Editable Reconstruction / Home", x, y);
  page.appendChild(frame);

  append(frame, text("Time", "9:41", 32, 18, 15, SPEC.color.text, SPEC.font.bold));
  append(frame, text("App Name", "App Name", 24, 62, 28, SPEC.color.text, SPEC.font.bold));
  iconSearch(frame, 346, 76, SPEC.color.text);
  append(frame, media("Home Hero", "home-hero", 24, 150, 345, 160, 18));
  append(frame, rect("Component / Card / Feed", 16, 342, 361, 148, SPEC.color.surface, 18));
  append(frame, text("Feed Title", "Editable card title", 32, 366, 18, SPEC.color.text, SPEC.font.bold, 250));
  append(frame, text("Feed Meta", "Metadata and supporting copy", 32, 396, 13, SPEC.color.textMuted, SPEC.font.regular, 280));
  bottomNav(frame, "home", [
    { key: "home", label: "Home", x: 52, icon: iconHome },
    { key: "search", label: "Search", x: 196, icon: iconSearch },
    { key: "profile", label: "Profile", x: 340, icon: iconHome }
  ]);

  return frame;
}

function countLayers(root) {
  let count = 0;
  function visit(node) {
    count += 1;
    if ("children" in node) node.children.forEach(visit);
  }
  visit(root);
  return count;
}

const page = makePage();
await figma.setCurrentPageAsync(page);
let reference;
let editable;
if (DESIGN_MANIFEST?.screens?.length) {
  const pair = buildScreenPairFromManifest(page, DESIGN_MANIFEST.screens[0], 120, 120);
  reference = pair.ref;
  editable = pair.editable;
} else {
  reference = lockedReference(page, "home-reference", "Home", 120, 120);
  editable = editableHome(page, 120 + SPEC.frame.width + 40, 120);
  audit.referencePairs.push({
    screen: "Home",
    referenceFrameId: reference.id,
    editableFrameId: editable.id,
    referenceName: "Locked Reference / Home",
    editableName: "Editable Reconstruction / Home",
    sameSize: reference.width === editable.width && reference.height === editable.height,
    logicalSize: { width: SPEC.frame.width, height: SPEC.frame.height }
  });
}
audit.layerCounts.reference = countLayers(reference);
audit.layerCounts.editable = countLayers(editable);
if (audit.assetFills.some((item) => item.fillType !== "IMAGE")) {
  audit.warnings.push("Fill ASSETS/imageHashes with upload_assets hashes before delivery.");
}

figma.viewport.scrollAndZoomIntoView([reference, editable]);
audit;
