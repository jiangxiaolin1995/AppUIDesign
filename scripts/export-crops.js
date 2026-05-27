#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.error("Missing dependency: sharp. Run `npm install` in this repo, then retry.");
    process.exit(1);
  }
}

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
  node scripts/export-crops.js --spec examples/crop-spec.example.json
  node scripts/export-crops.js --source assets/generated/01-home.png --spec crops.json --out assets/crops --scale 3

Spec shape:
  {
    "source": "assets/generated/01-home.png",
    "outDir": "assets/crops",
    "coordinateSpace": "logical",
    "scale": 3,
    "crops": [
      { "name": "home-hero", "type": "hero", "x": 24, "y": 150, "width": 345, "height": 160 }
    ]
  }`;
}

function slugName(value) {
  return String(value || "crop")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "crop";
}

function toPixels(value, scale) {
  return Math.round(Number(value) * scale);
}

function cropRect(crop, scale) {
  for (const key of ["x", "y", "width", "height"]) {
    if (!Number.isFinite(Number(crop[key]))) {
      throw new Error(`Crop "${crop.name || "unnamed"}" is missing numeric ${key}.`);
    }
  }
  return {
    left: toPixels(crop.x, scale),
    top: toPixels(crop.y, scale),
    width: toPixels(crop.width, scale),
    height: toPixels(crop.height, scale)
  };
}

function validateBounds(rect, meta, cropName) {
  if (rect.left < 0 || rect.top < 0 || rect.width <= 0 || rect.height <= 0) {
    throw new Error(`Crop "${cropName}" has invalid bounds: ${JSON.stringify(rect)}.`);
  }
  if (rect.left + rect.width > meta.width || rect.top + rect.height > meta.height) {
    throw new Error(
      `Crop "${cropName}" exceeds source image ${meta.width}x${meta.height}: ${JSON.stringify(rect)}.`
    );
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.spec) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const sharp = await loadSharp();
  const repoRoot = process.cwd();
  const specPath = path.resolve(repoRoot, args.spec);
  const spec = JSON.parse(await fs.readFile(specPath, "utf8"));
  const sourcePath = path.resolve(repoRoot, args.source || spec.source || "");
  const outDir = path.resolve(repoRoot, args.out || spec.outDir || "assets/crops");
  const coordinateSpace = args["coordinate-space"] || spec.coordinateSpace || "source-px";
  const scale = Number(args.scale || spec.scale || (coordinateSpace === "logical" ? 3 : 1));
  const crops = Array.isArray(spec) ? spec : spec.crops;

  if (!sourcePath || !Array.isArray(crops) || crops.length === 0) {
    throw new Error("Provide a source image and at least one crop in the spec.");
  }

  await fs.mkdir(outDir, { recursive: true });
  const source = sharp(sourcePath);
  const meta = await source.metadata();
  if (!meta.width || !meta.height) throw new Error("Could not read source image dimensions.");

  const ledger = [];
  for (const crop of crops) {
    const name = slugName(crop.name);
    const format = crop.format || "png";
    const fileName = crop.fileName || `${name}.${format}`;
    const outPath = path.join(outDir, fileName);
    const rect = cropRect(crop, scale);
    validateBounds(rect, meta, name);

    await sharp(sourcePath).extract(rect).toFormat(format).toFile(outPath);
    ledger.push({
      name,
      type: crop.type || "bitmap-media",
      file: path.relative(repoRoot, outPath),
      source: path.relative(repoRoot, sourcePath),
      coordinateSpace,
      scale,
      logical: {
        x: Number(crop.x),
        y: Number(crop.y),
        width: Number(crop.width),
        height: Number(crop.height)
      },
      sourcePx: rect,
      figma: {
        handling: crop.figmaHandling || "Place as independent image-fill rectangle",
        radius: crop.radius || 0,
        notes: crop.notes || ""
      }
    });
  }

  const jsonPath = path.join(outDir, "crop-ledger.json");
  const mdPath = path.join(outDir, "crop-ledger.md");
  await fs.writeFile(jsonPath, `${JSON.stringify(ledger, null, 2)}\n`);
  await fs.writeFile(
    mdPath,
    [
      "# Crop Ledger",
      "",
      `Source: ${path.relative(repoRoot, sourcePath)}`,
      `Source size: ${meta.width}x${meta.height}`,
      `Coordinate space: ${coordinateSpace}`,
      `Scale: ${scale}`,
      "",
      "| crop | type | file | source px | Figma handling |",
      "| --- | --- | --- | --- | --- |",
      ...ledger.map((item) => {
        const r = item.sourcePx;
        return `| ${item.name} | ${item.type} | ${item.file} | ${r.left},${r.top},${r.width},${r.height} | ${item.figma.handling} |`;
      }),
      ""
    ].join("\n")
  );

  console.log(`Exported ${ledger.length} crop(s) to ${path.relative(repoRoot, outDir)}.`);
  console.log(`Ledger: ${path.relative(repoRoot, mdPath)}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
