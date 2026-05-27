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
  node scripts/visual-diff.js --reference ref.png --candidate figma.png --out diff/01-home
  node scripts/visual-diff.js --reference ref.png --candidate figma.png --regions examples/regions.example.json --threshold 0.08 --fail-above 0.03

Notes:
  --threshold is per-pixel channel distance from 0 to 1. Default: 0.08
  --fail-above exits with code 2 when total diff percent is above the value.`;
}

function assertArgs(args) {
  if (args.help || !args.reference || !args.candidate) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }
}

function clampRect(rect, width, height) {
  const x = Math.max(0, Math.round(Number(rect.x)));
  const y = Math.max(0, Math.round(Number(rect.y)));
  const w = Math.max(0, Math.round(Number(rect.width)));
  const h = Math.max(0, Math.round(Number(rect.height)));
  return {
    name: rect.name || "region",
    x,
    y,
    width: Math.min(w, width - x),
    height: Math.min(h, height - y)
  };
}

function diffPixel(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  const da = a[3] - b[3];
  return Math.sqrt(dr * dr + dg * dg + db * db + da * da) / 510;
}

function regionStats(mask, width, region) {
  let diff = 0;
  let total = 0;
  for (let y = region.y; y < region.y + region.height; y += 1) {
    for (let x = region.x; x < region.x + region.width; x += 1) {
      total += 1;
      if (mask[y * width + x]) diff += 1;
    }
  }
  return {
    name: region.name,
    bounds: region,
    diffPixels: diff,
    totalPixels: total,
    diffPercent: total ? diff / total : 0
  };
}

async function rawImage(sharp, filePath, width = null, height = null) {
  let image = sharp(filePath).ensureAlpha();
  if (width && height) image = image.resize(width, height, { fit: "fill" });
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  return { data, info };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  assertArgs(args);

  const sharp = await loadSharp();
  const repoRoot = process.cwd();
  const referencePath = path.resolve(repoRoot, args.reference);
  const candidatePath = path.resolve(repoRoot, args.candidate);
  const outDir = path.resolve(repoRoot, args.out || "diff/visual-diff");
  const threshold = Number(args.threshold || 0.08);
  const failAbove = args["fail-above"] === undefined ? null : Number(args["fail-above"]);

  await fs.mkdir(outDir, { recursive: true });
  const reference = await rawImage(sharp, referencePath);
  const width = reference.info.width;
  const height = reference.info.height;
  const candidateOriginal = await sharp(candidatePath).metadata();
  const candidate = await rawImage(sharp, candidatePath, width, height);

  const diffBuffer = Buffer.alloc(width * height * 4);
  const mask = new Uint8Array(width * height);
  let diffPixels = 0;
  let totalDistance = 0;

  for (let i = 0; i < width * height; i += 1) {
    const offset = i * 4;
    const a = reference.data.subarray(offset, offset + 4);
    const b = candidate.data.subarray(offset, offset + 4);
    const distance = diffPixel(a, b);
    totalDistance += distance;
    const isDiff = distance > threshold;
    mask[i] = isDiff ? 1 : 0;
    if (isDiff) diffPixels += 1;

    if (isDiff) {
      diffBuffer[offset] = 255;
      diffBuffer[offset + 1] = 48;
      diffBuffer[offset + 2] = 48;
      diffBuffer[offset + 3] = 255;
    } else {
      diffBuffer[offset] = Math.round(b[0] * 0.35 + 255 * 0.65);
      diffBuffer[offset + 1] = Math.round(b[1] * 0.35 + 255 * 0.65);
      diffBuffer[offset + 2] = Math.round(b[2] * 0.35 + 255 * 0.65);
      diffBuffer[offset + 3] = 255;
    }
  }

  const diffPercent = diffPixels / (width * height);
  const avgDistance = totalDistance / (width * height);

  const referenceNormalized = path.join(outDir, "reference-normalized.png");
  const candidateNormalized = path.join(outDir, "candidate-normalized.png");
  const diffPath = path.join(outDir, "diff.png");
  await sharp(reference.data, { raw: reference.info }).png().toFile(referenceNormalized);
  await sharp(candidate.data, { raw: candidate.info }).png().toFile(candidateNormalized);
  await sharp(diffBuffer, { raw: { width, height, channels: 4 } }).png().toFile(diffPath);

  let regions = [];
  if (args.regions) {
    const regionSpec = JSON.parse(await fs.readFile(path.resolve(repoRoot, args.regions), "utf8"));
    const regionList = Array.isArray(regionSpec) ? regionSpec : regionSpec.regions || [];
    regions = regionList.map((region) => regionStats(mask, width, clampRect(region, width, height)));
  }

  const report = {
    reference: path.relative(repoRoot, referencePath),
    candidate: path.relative(repoRoot, candidatePath),
    size: { width, height },
    candidateOriginalSize: { width: candidateOriginal.width, height: candidateOriginal.height },
    threshold,
    diffPixels,
    totalPixels: width * height,
    diffPercent,
    avgDistance,
    regions,
    artifacts: {
      referenceNormalized: path.relative(repoRoot, referenceNormalized),
      candidateNormalized: path.relative(repoRoot, candidateNormalized),
      diff: path.relative(repoRoot, diffPath)
    }
  };

  const jsonPath = path.join(outDir, "visual-diff-report.json");
  const mdPath = path.join(outDir, "visual-diff-report.md");
  await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(
    mdPath,
    [
      "# Visual Diff Report",
      "",
      `Reference: ${report.reference}`,
      `Candidate: ${report.candidate}`,
      `Comparison size: ${width}x${height}`,
      `Threshold: ${threshold}`,
      `Diff pixels: ${diffPixels} / ${width * height}`,
      `Diff percent: ${(diffPercent * 100).toFixed(3)}%`,
      `Average channel distance: ${avgDistance.toFixed(5)}`,
      "",
      "## Artifacts",
      "",
      `- Reference normalized: ${report.artifacts.referenceNormalized}`,
      `- Candidate normalized: ${report.artifacts.candidateNormalized}`,
      `- Diff image: ${report.artifacts.diff}`,
      "",
      "## Regions",
      "",
      regions.length
        ? "| region | diff percent | diff pixels |\n| --- | ---: | ---: |\n" +
          regions
            .map((region) => `| ${region.name} | ${(region.diffPercent * 100).toFixed(3)}% | ${region.diffPixels} |`)
            .join("\n")
        : "No regions provided.",
      ""
    ].join("\n")
  );

  console.log(`Diff percent: ${(diffPercent * 100).toFixed(3)}%`);
  console.log(`Report: ${path.relative(repoRoot, mdPath)}`);

  if (failAbove !== null && diffPercent > failAbove) {
    console.error(`Diff exceeds --fail-above ${failAbove}.`);
    process.exit(2);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
