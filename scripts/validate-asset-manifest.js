#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
    args[key] = value;
  }
  return args;
}

function usage() {
  return `Usage:
  node scripts/validate-asset-manifest.js --manifest examples/asset-manifest.example.json
  node scripts/validate-asset-manifest.js --manifest project/asset-manifest.json --root project --check-files

Validates that source references, clean media, icons, text boxes, and measured regions are present before Figma JS is written.`;
}

function isNumber(value) {
  return Number.isFinite(Number(value));
}

function requireString(errors, obj, key, label) {
  if (!obj || typeof obj[key] !== "string" || !obj[key].trim()) {
    errors.push(`${label}.${key} must be a non-empty string.`);
  }
}

function requireRect(errors, rect, label) {
  for (const key of ["x", "y", "width", "height"]) {
    if (!isNumber(rect?.[key])) errors.push(`${label}.${key} must be numeric.`);
  }
  if (isNumber(rect?.width) && Number(rect.width) <= 0) errors.push(`${label}.width must be > 0.`);
  if (isNumber(rect?.height) && Number(rect.height) <= 0) errors.push(`${label}.height must be > 0.`);
}

function rectValue(rect) {
  return {
    x: Number(rect.x),
    y: Number(rect.y),
    width: Number(rect.width),
    height: Number(rect.height)
  };
}

function checkRectWithin(errors, rect, bounds, label) {
  if (!rect || !bounds) return;
  const r = rectValue(rect);
  const b = rectValue({ x: 0, y: 0, width: bounds.width, height: bounds.height });
  if (![r.x, r.y, r.width, r.height, b.width, b.height].every(Number.isFinite)) return;
  if (r.x < 0 || r.y < 0 || r.x + r.width > b.width || r.y + r.height > b.height) {
    errors.push(`${label} exceeds logical frame ${b.width}x${b.height}: ${r.x}/${r.y}/${r.width}/${r.height}.`);
  }
}

function overlapArea(a, b) {
  const ar = rectValue(a);
  const br = rectValue(b);
  const x = Math.max(0, Math.min(ar.x + ar.width, br.x + br.width) - Math.max(ar.x, br.x));
  const y = Math.max(0, Math.min(ar.y + ar.height, br.y + br.height) - Math.max(ar.y, br.y));
  return x * y;
}

function mostlyOverlaps(a, b) {
  const area = overlapArea(a.rect, b.rect);
  if (!area) return false;
  const aArea = Number(a.rect.width) * Number(a.rect.height);
  const bArea = Number(b.rect.width) * Number(b.rect.height);
  return area / Math.min(aArea, bArea) > 0.85;
}

function requireSize(errors, size, label) {
  for (const key of ["width", "height"]) {
    if (!isNumber(size?.[key]) || Number(size[key]) <= 0) errors.push(`${label}.${key} must be numeric and > 0.`);
  }
}

function isBitmapIconSource(source) {
  return ["generated-sheet", "exact-source-crop", "bitmap-icon", "custom-icon-sheet"].includes(source);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.manifest) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const root = path.resolve(process.cwd(), args.root || ".");
  const manifestPath = path.resolve(process.cwd(), args.manifest);
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const errors = [];
  const warnings = [];

  if (manifest.version !== 1) errors.push("version must be 1.");
  requireString(errors, manifest, "project", "manifest");
  requireSize(errors, manifest.screenSize?.logical, "screenSize.logical");
  requireSize(errors, manifest.screenSize?.raster, "screenSize.raster");
  if (!isNumber(manifest.screenSize?.scale) || Number(manifest.screenSize.scale) <= 0) {
    errors.push("screenSize.scale must be numeric and > 0.");
  }
  if (
    isNumber(manifest.screenSize?.logical?.width) &&
    isNumber(manifest.screenSize?.logical?.height) &&
    isNumber(manifest.screenSize?.raster?.width) &&
    isNumber(manifest.screenSize?.raster?.height) &&
    isNumber(manifest.screenSize?.scale)
  ) {
    const scale = Number(manifest.screenSize.scale);
    const expectedW = Number(manifest.screenSize.logical.width) * scale;
    const expectedH = Number(manifest.screenSize.logical.height) * scale;
    if (Math.abs(expectedW - Number(manifest.screenSize.raster.width)) > 2) {
      errors.push(`screenSize.raster.width should be logical.width * scale (${expectedW}), got ${manifest.screenSize.raster.width}.`);
    }
    if (Math.abs(expectedH - Number(manifest.screenSize.raster.height)) > 2) {
      errors.push(`screenSize.raster.height should be logical.height * scale (${expectedH}), got ${manifest.screenSize.raster.height}.`);
    }
  }
  if (!Array.isArray(manifest.screens) || manifest.screens.length === 0) {
    errors.push("screens must contain at least one screen.");
  }

  const fileChecks = [];
  for (const [screenIndex, screen] of (manifest.screens || []).entries()) {
    const s = `screens[${screenIndex}]`;
    requireString(errors, screen, "id", s);
    requireString(errors, screen, "name", s);
    requireSize(errors, screen.logicalFrame, `${s}.logicalFrame`);
    if (
      isNumber(screen.logicalFrame?.width) &&
      isNumber(screen.logicalFrame?.height) &&
      isNumber(manifest.screenSize?.logical?.width) &&
      isNumber(manifest.screenSize?.logical?.height) &&
      (Number(screen.logicalFrame.width) !== Number(manifest.screenSize.logical.width) ||
        Number(screen.logicalFrame.height) !== Number(manifest.screenSize.logical.height))
    ) {
      warnings.push(`${s}.logicalFrame differs from manifest.screenSize.logical; document scale intent if this is deliberate.`);
    }
    requireString(errors, screen.rasterReference || {}, "file", `${s}.rasterReference`);
    requireString(errors, screen.rasterReference || {}, "targetNode", `${s}.rasterReference`);

    if (screen.rasterReference?.file) fileChecks.push({ file: screen.rasterReference.file, label: `${s}.rasterReference.file` });

    const assets = Array.isArray(screen.assets) ? screen.assets : [];
    if (!assets.length) errors.push(`${s}.assets must contain at least the full-screen reference asset and all clean media.`);
    const assetById = new Map();
    const targetNodes = new Set();

    for (const [assetIndex, asset] of assets.entries()) {
      const a = `${s}.assets[${assetIndex}]`;
      requireString(errors, asset, "id", a);
      requireString(errors, asset, "kind", a);
      requireString(errors, asset, "file", a);
      requireString(errors, asset, "targetNode", a);
      requireString(errors, asset, "cropMode", a);
      requireString(errors, asset, "focalPoint", a);
      if (!isNumber(asset.radius)) errors.push(`${a}.radius must be numeric.`);
      if (!asset.overlaySplit) warnings.push(`${a}.overlaySplit is empty; state whether overlays are rebuilt or none.`);
      if (asset.id) assetById.set(asset.id, asset);
      if (asset.targetNode) {
        if (targetNodes.has(asset.targetNode)) warnings.push(`${a}.targetNode duplicates another asset target: ${asset.targetNode}`);
        targetNodes.add(asset.targetNode);
      }
      if (asset.file) fileChecks.push({ file: asset.file, label: `${a}.file` });
    }

    if (!assets.some((asset) => asset.kind === "full-screen-reference")) {
      errors.push(`${s}.assets must include one kind=full-screen-reference asset.`);
    }

    const regions = screen.regions || [];
    for (const [regionIndex, region] of regions.entries()) {
      const r = `${s}.regions[${regionIndex}]`;
      requireString(errors, region, "id", r);
      requireString(errors, region, "type", r);
      requireString(errors, region, "targetNode", r);
      requireRect(errors, region.rect, `${r}.rect`);
      checkRectWithin(errors, region.rect, screen.logicalFrame, `${r}.rect`);
      if (!isNumber(region.radius)) errors.push(`${r}.radius must be numeric.`);
      if (region.type === "bitmap-media") {
        if (!region.assetId) errors.push(`${r}.assetId is required for bitmap-media regions.`);
        if (region.assetId && !assetById.has(region.assetId)) errors.push(`${r}.assetId references missing asset "${region.assetId}".`);
      }
    }
    for (let i = 0; i < regions.length; i += 1) {
      for (let j = i + 1; j < regions.length; j += 1) {
        const a = regions[i];
        const b = regions[j];
        if (a?.rect && b?.rect && mostlyOverlaps(a, b) && a.type === b.type) {
          warnings.push(`${s}.regions[${i}] and ${s}.regions[${j}] mostly overlap and share type "${a.type}". Confirm this is intentional.`);
        }
      }
    }

    for (const [iconIndex, icon] of (screen.icons || []).entries()) {
      const i = `${s}.icons[${iconIndex}]`;
      for (const key of ["id", "label", "role", "glyph", "source", "targetNode", "state"]) requireString(errors, icon, key, i);
      if (!icon.batch) warnings.push(`${i}.batch is empty; use navigation, toolbar, business-category, editor-tool, status-badge, or brand-custom.`);
      if (icon.size) {
        requireSize(errors, icon.size, `${i}.size`);
      } else {
        requireSize(errors, icon.logicalBox, `${i}.logicalBox`);
      }
      if (icon.source === "placeholder") errors.push(`${i}.source cannot be placeholder in a Figma-ready manifest.`);
      if (isBitmapIconSource(icon.source)) {
        requireString(errors, icon, "file", i);
        if (icon.targetNode && !icon.targetNode.startsWith("Bitmap Icon /")) {
          errors.push(`${i}.targetNode must start with "Bitmap Icon /" for bitmap-backed icon sources.`);
        }
        if (icon.file) fileChecks.push({ file: icon.file, label: `${i}.file` });
        if (!icon.scaleMode) warnings.push(`${i}.scaleMode is empty; bitmap icons should normally use FIT.`);
      }
      if ((icon.source === "vector-library" || icon.source === "figma-vector") && icon.file) {
        warnings.push(`${i}.file is set even though source is vector-backed; confirm this is intentional.`);
      }
      if (!icon.strokeFill && !icon["stroke/fill"]) warnings.push(`${i}.strokeFill is empty; icon appearance may drift.`);
      if (!icon.opticalCenter) warnings.push(`${i}.opticalCenter is empty; icon alignment may drift.`);
    }

    for (const [textIndex, text] of (screen.textLayers || []).entries()) {
      const t = `${s}.textLayers[${textIndex}]`;
      for (const key of ["id", "text", "targetNode", "color"]) requireString(errors, text, key, t);
      requireRect(errors, text.rect, `${t}.rect`);
      checkRectWithin(errors, text.rect, screen.logicalFrame, `${t}.rect`);
      for (const key of ["fontSize", "lineHeight", "weight"]) {
        if (!isNumber(text[key])) errors.push(`${t}.${key} must be numeric.`);
      }
    }
  }

  if (args["check-files"]) {
    for (const item of fileChecks) {
      const filePath = path.resolve(root, item.file);
      if (!(await exists(filePath))) errors.push(`${item.label} does not exist: ${item.file}`);
    }
  }

  const result = {
    manifest: path.relative(process.cwd(), manifestPath),
    status: errors.length ? "fail" : warnings.length ? "warning" : "pass",
    errors,
    warnings
  };

  console.log(JSON.stringify(result, null, 2));
  if (errors.length) process.exit(2);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
