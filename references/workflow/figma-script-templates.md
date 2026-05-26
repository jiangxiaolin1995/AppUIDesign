# Figma Script Templates

Use this file when converting generated mobile design images into Figma. The goal is not "put the image in Figma"; the goal is an editable Figma file whose visible screen matches the generated image.

## Non-Negotiable Output

- The approved raster screen is a locked reference only.
- The final visible phone frame is rebuilt from movable Figma materials.
- UI copy is editable text.
- Icons are vector nodes or component instances.
- Repeated UI is componentized: cards, buttons, chips, tabs, toolbars, bottom bars, metric modules, chart blocks.
- Photo/editor/product/food/result regions are separate movable bitmap crops.
- Do not present one pasted full-screen screenshot as the editable screen.

## Template 1: Editable Phone Frame Skeleton

Use this before drawing detailed UI. It creates a reference frame and a deliverable phone frame with safe-area guides and core mobile chrome groups.

```js
const fontRegular = { family: "Inter", style: "Regular" };
const fontBold = { family: "Inter", style: "Bold" };
await figma.loadFontAsync(fontRegular);
await figma.loadFontAsync(fontBold);

const page = figma.currentPage;
page.name = "Mobile App UI";

const W = 393;
const H = 852;
const x0 = 120;
const y0 = 120;

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

function label(name, text, x, y, size = 12) {
  const node = figma.createText();
  node.name = name;
  node.fontName = fontRegular;
  node.fontSize = size;
  node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.35) };
  node.fills = [solid("#9CA3AF")];
  node.characters = text;
  node.x = x;
  node.y = y;
  return node;
}

const ref = figma.createFrame();
ref.name = "Locked Reference - approved image";
ref.resize(W, H);
ref.x = x0;
ref.y = y0;
ref.fills = [solid("#111318")];
ref.locked = true;

const screen = figma.createFrame();
screen.name = "Editable Screen - componentized";
screen.resize(W, H);
screen.x = x0 + W + 96;
screen.y = y0;
screen.clipsContent = true;
screen.cornerRadius = 34;
screen.fills = [solid("#090B10")];

const status = figma.createFrame();
status.name = "Status Bar";
status.resize(W, 48);
status.fills = [];
screen.appendChild(status);

const content = figma.createFrame();
content.name = "Content Groups";
content.resize(W, H - 132);
content.x = 0;
content.y = 48;
content.fills = [];
screen.appendChild(content);

const bottom = figma.createFrame();
bottom.name = "Bottom Controls";
bottom.resize(W, 84);
bottom.x = 0;
bottom.y = H - 84;
bottom.fills = [solid("#090B10", 0.96)];
screen.appendChild(bottom);

page.appendChild(label("Note", "Reference is locked. Deliverable frame must stay editable.", x0, y0 + H + 20));

return {
  createdNodeIds: [ref.id, screen.id, status.id, content.id, bottom.id],
  frameSize: `${W}x${H}`,
  rule: "Do not replace the editable screen with a full-screen screenshot."
};
```

## Template 2: Component Kit Seeds

Use this to create reusable primitives before reconstructing a screen. Keep components small; assemble the screen from instances.

```js
const fontRegular = { family: "Inter", style: "Regular" };
const fontMedium = { family: "Inter", style: "Medium" };
const fontBold = { family: "Inter", style: "Bold" };
await figma.loadFontAsync(fontRegular);
await figma.loadFontAsync(fontMedium);
await figma.loadFontAsync(fontBold);

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

function textNode(name, value, size, fontName = fontMedium, color = "#F8FAFC") {
  const node = figma.createText();
  node.name = name;
  node.fontName = fontName;
  node.fontSize = size;
  node.lineHeight = { unit: "PIXELS", value: Math.round(size * 1.28) };
  node.fills = [solid(color)];
  node.characters = value;
  return node;
}

function makeButton() {
  const c = figma.createComponent();
  c.name = "Button / Primary";
  c.resize(148, 48);
  c.cornerRadius = 24;
  c.fills = [solid("#67E8F9")];
  const t = textNode("Label", "Apply", 15, fontBold, "#041014");
  c.appendChild(t);
  t.x = 54;
  t.y = 14;
  return c;
}

function makeToolChip() {
  const c = figma.createComponent();
  c.name = "Tool Chip / Selected";
  c.resize(72, 76);
  c.cornerRadius = 18;
  c.fills = [solid("#111827")];
  c.strokes = [solid("#67E8F9")];
  c.strokeWeight = 1;
  const icon = figma.createEllipse();
  icon.name = "Icon Placeholder";
  icon.resize(28, 28);
  icon.x = 22;
  icon.y = 12;
  icon.fills = [solid("#67E8F9", 0.18)];
  const t = textNode("Label", "Enhance", 11, fontMedium, "#E5E7EB");
  c.appendChild(icon);
  c.appendChild(t);
  t.x = 15;
  t.y = 48;
  return c;
}

function makeMediaCard() {
  const c = figma.createComponent();
  c.name = "Bitmap Media Card";
  c.resize(156, 116);
  c.cornerRadius = 20;
  c.fills = [solid("#1F2937")];
  const tag = textNode("Bitmap Layer Label", "movable image crop", 11, fontRegular, "#CBD5E1");
  c.appendChild(tag);
  tag.x = 16;
  tag.y = 86;
  return c;
}

const components = [makeButton(), makeToolChip(), makeMediaCard()];
components.forEach((node, i) => {
  node.x = 120 + i * 190;
  node.y = 1040;
  figma.currentPage.appendChild(node);
});

return {
  createdNodeIds: components.map((node) => node.id),
  components: components.map((node) => node.name)
};
```

## Template 3: Place Movable Bitmap Crop

Use this pattern after uploading image assets. Each visual asset must be its own node so it can be moved, replaced, resized, or masked.

```js
// Replace IMAGE_HASH with a hash returned by upload_assets.
const imageHash = "IMAGE_HASH";

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

const crop = figma.createRectangle();
crop.name = "Bitmap Crop / editor-canvas-before-after";
crop.resize(349, 456);
crop.x = 22;
crop.y = 110;
crop.cornerRadius = 28;
crop.fills = [{
  type: "IMAGE",
  imageHash,
  scaleMode: "FILL"
}];

const scrim = figma.createRectangle();
scrim.name = "Canvas Readability Scrim";
scrim.resize(349, 116);
scrim.x = 22;
scrim.y = 450;
scrim.cornerRadius = 28;
scrim.fills = [solid("#030712", 0.42)];

return {
  createdNodeIds: [crop.id, scrim.id],
  bitmapRegion: "editor-canvas-before-after",
  rule: "This is a movable crop, not a flattened whole-screen screenshot."
};
```

## Template 4: Verification Metadata

Use this after reconstruction. The check must prove the visible frame is not a single bitmap.

```js
const frame = figma.currentPage.findOne((node) => node.name === "Editable Screen - componentized");
if (!frame) throw new Error("Missing editable screen frame");

const descendants = frame.findAll();
const imageNodes = descendants.filter((node) => {
  return "fills" in node && Array.isArray(node.fills) && node.fills.some((paint) => paint.type === "IMAGE");
});
const textNodes = descendants.filter((node) => node.type === "TEXT");
const instanceNodes = descendants.filter((node) => node.type === "INSTANCE");
const componentLike = descendants.filter((node) => /Card|Button|Tab|Toolbar|Bottom|Tool|Metric/i.test(node.name));

return {
  frameId: frame.id,
  childCount: descendants.length,
  imageNodeCount: imageNodes.length,
  textNodeCount: textNodes.length,
  instanceNodeCount: instanceNodes.length,
  componentLikeCount: componentLike.length,
  pass: imageNodes.length >= 1 && textNodes.length >= 5 && componentLike.length >= 3,
  warning: "If imageNodeCount is 1 and childCount is tiny, the screen may be flattened."
};
```

## Common Failure Modes

| Failure | Fix |
| --- | --- |
| Full-screen screenshot is visible as the only layer | Rebuild the visible screen from components and crops; keep the screenshot locked as reference only |
| Photos look different from the generated image | Crop from the approved image or reuse the original generated/source photo |
| Text is flattened inside bitmap | Recreate it as Figma text unless it belongs inside a photo/poster/content asset |
| Icons are generic and visually drift | Use vector icons matching stroke/fill/size; make a small component set |
| Components match once but cannot be reused | Extract repeated UI into components before assembling additional screens |
