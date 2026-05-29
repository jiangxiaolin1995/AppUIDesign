#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.error("Missing dependency: sharp. Run `npm install` in this skill folder.");
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
  node scripts/measure-screenshot.js --image ref.png --out recon/measure
  node scripts/measure-screenshot.js --image ref.png --regions regions.json --grid-step 24 --out recon/measure

Outputs measurement-report.json, measurement-report.md, and measurement-overlay.png.`;
}

function assertArgs(args) {
  if (args.help || !args.image) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }
}

function hex(value) {
  return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
}

function colorAt(data, width, height, x, y) {
  const px = Math.max(0, Math.min(width - 1, Math.round(x)));
  const py = Math.max(0, Math.min(height - 1, Math.round(y)));
  const offset = (py * width + px) * 4;
  return {
    rgba: [data[offset], data[offset + 1], data[offset + 2], data[offset + 3]],
    hex: `#${hex(data[offset])}${hex(data[offset + 1])}${hex(data[offset + 2])}`
  };
}

function pixelDistance(data, width, aX, aY, bX, bY) {
  const a = (aY * width + aX) * 4;
  const b = (bY * width + bX) * 4;
  return (
    Math.abs(data[a] - data[b]) +
    Math.abs(data[a + 1] - data[b + 1]) +
    Math.abs(data[a + 2] - data[b + 2]) +
    Math.abs(data[a + 3] - data[b + 3])
  ) / 1020;
}

function rowScores(data, width, height) {
  const stride = Math.max(1, Math.floor(width / 240));
  const scores = [];
  for (let y = 1; y < height; y += 1) {
    let total = 0;
    let count = 0;
    for (let x = 0; x < width; x += stride) {
      total += pixelDistance(data, width, x, y - 1, x, y);
      count += 1;
    }
    scores.push({ pos: y, score: total / count });
  }
  return scores;
}

function colScores(data, width, height) {
  const stride = Math.max(1, Math.floor(height / 240));
  const scores = [];
  for (let x = 1; x < width; x += 1) {
    let total = 0;
    let count = 0;
    for (let y = 0; y < height; y += stride) {
      total += pixelDistance(data, width, x - 1, y, x, y);
      count += 1;
    }
    scores.push({ pos: x, score: total / count });
  }
  return scores;
}

function peaks(scores, threshold, minGap, limit) {
  const candidates = scores
    .filter((item, index) => {
      const prev = scores[index - 1]?.score ?? -1;
      const next = scores[index + 1]?.score ?? -1;
      return item.score >= threshold && item.score >= prev && item.score >= next;
    })
    .sort((a, b) => b.score - a.score);
  const chosen = [];
  for (const item of candidates) {
    if (chosen.every((other) => Math.abs(other.pos - item.pos) >= minGap)) chosen.push(item);
    if (chosen.length >= limit) break;
  }
  return chosen.sort((a, b) => a.pos - b.pos).map((item) => ({
    pos: item.pos,
    score: Number(item.score.toFixed(4))
  }));
}

function normalizeRegions(raw) {
  const list = Array.isArray(raw) ? raw : raw.regions || [];
  return list.map((region) => ({
    name: region.name || "region",
    x: Number(region.x),
    y: Number(region.y),
    width: Number(region.width),
    height: Number(region.height)
  })).filter((region) => (
    Number.isFinite(region.x) &&
    Number.isFinite(region.y) &&
    Number.isFinite(region.width) &&
    Number.isFinite(region.height)
  ));
}

function regionGaps(regions, axis) {
  const start = axis === "x" ? "x" : "y";
  const size = axis === "x" ? "width" : "height";
  const sorted = [...regions].sort((a, b) => a[start] - b[start]);
  const gaps = [];
  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const current = sorted[i];
    const gap = current[start] - (prev[start] + prev[size]);
    if (gap >= 0) {
      gaps.push({
        from: prev.name,
        to: current.name,
        axis,
        gap
      });
    }
  }
  return gaps;
}

function xmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;"
  }[char]));
}

function overlaySvg({ width, height, gridStep, rowGuides, colGuides, regions }) {
  const lines = [];
  for (let x = gridStep; x < width; x += gridStep) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#00a3ff" stroke-opacity="0.22" stroke-width="1"/>`);
  }
  for (let y = gridStep; y < height; y += gridStep) {
    lines.push(`<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#00a3ff" stroke-opacity="0.22" stroke-width="1"/>`);
  }
  for (const guide of rowGuides) {
    lines.push(`<line x1="0" y1="${guide.pos}" x2="${width}" y2="${guide.pos}" stroke="#ff2d55" stroke-opacity="0.75" stroke-width="1"/>`);
  }
  for (const guide of colGuides) {
    lines.push(`<line x1="${guide.pos}" y1="0" x2="${guide.pos}" y2="${height}" stroke="#ff2d55" stroke-opacity="0.75" stroke-width="1"/>`);
  }
  for (const region of regions) {
    lines.push(`<rect x="${region.x}" y="${region.y}" width="${region.width}" height="${region.height}" fill="none" stroke="#34c759" stroke-width="2"/>`);
    lines.push(`<text x="${region.x + 4}" y="${Math.max(12, region.y - 4)}" font-family="Arial" font-size="12" fill="#34c759">${xmlEscape(region.name)}</text>`);
  }
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">${lines.join("")}</svg>`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  assertArgs(args);
  const sharp = await loadSharp();
  const imagePath = path.resolve(process.cwd(), args.image);
  const outDir = path.resolve(process.cwd(), args.out || "measure");
  const gridStep = Number(args["grid-step"] || 24);
  const threshold = Number(args["guide-threshold"] || 0.09);
  await fs.mkdir(outDir, { recursive: true });

  const image = sharp(imagePath).ensureAlpha();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;
  let rawSpec = {};
  if (args.regions) rawSpec = JSON.parse(await fs.readFile(path.resolve(process.cwd(), args.regions), "utf8"));
  const regions = normalizeRegions(rawSpec);
  const samples = (rawSpec.samples || []).map((sample) => ({
    name: sample.name || "sample",
    x: Number(sample.x),
    y: Number(sample.y),
    ...colorAt(data, width, height, Number(sample.x), Number(sample.y))
  }));
  const measuredRegions = regions.map((region) => ({
    ...region,
    right: region.x + region.width,
    bottom: region.y + region.height,
    center: {
      x: region.x + region.width / 2,
      y: region.y + region.height / 2
    },
    centerColor: colorAt(data, width, height, region.x + region.width / 2, region.y + region.height / 2).hex
  }));
  const rowGuides = peaks(rowScores(data, width, height), threshold, 6, 80);
  const colGuides = peaks(colScores(data, width, height), threshold, 6, 80);
  const report = {
    image: path.relative(process.cwd(), imagePath),
    size: { width, height },
    gridStep,
    guideThreshold: threshold,
    rowGuides,
    colGuides,
    regions: measuredRegions,
    gaps: {
      vertical: regionGaps(measuredRegions, "y"),
      horizontal: regionGaps(measuredRegions, "x")
    },
    samples
  };

  const overlayPath = path.join(outDir, "measurement-overlay.png");
  const overlay = Buffer.from(overlaySvg({ width, height, gridStep, rowGuides, colGuides, regions: measuredRegions }));
  await sharp(imagePath)
    .ensureAlpha()
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toFile(overlayPath);

  const jsonPath = path.join(outDir, "measurement-report.json");
  const mdPath = path.join(outDir, "measurement-report.md");
  await fs.writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(mdPath, [
    "# Measurement Report",
    "",
    `Image: ${report.image}`,
    `Size: ${width}x${height}`,
    `Grid step: ${gridStep}`,
    `Overlay: ${path.relative(process.cwd(), overlayPath)}`,
    "",
    "## Prominent Guides",
    "",
    `Rows: ${rowGuides.map((g) => g.pos).join(", ") || "none"}`,
    `Columns: ${colGuides.map((g) => g.pos).join(", ") || "none"}`,
    "",
    "## Regions",
    "",
    measuredRegions.length
      ? "| name | x | y | width | height | center color |\n| --- | ---: | ---: | ---: | ---: | --- |\n" +
        measuredRegions.map((r) => `| ${r.name} | ${r.x} | ${r.y} | ${r.width} | ${r.height} | ${r.centerColor} |`).join("\n")
      : "No regions supplied.",
    "",
    "## Gaps",
    "",
    [...report.gaps.vertical, ...report.gaps.horizontal].length
      ? "| from | to | axis | gap |\n| --- | --- | --- | ---: |\n" +
        [...report.gaps.vertical, ...report.gaps.horizontal].map((g) => `| ${g.from} | ${g.to} | ${g.axis} | ${g.gap} |`).join("\n")
      : "No non-overlapping region gaps measured.",
    "",
    "## Samples",
    "",
    samples.length
      ? "| name | x | y | color |\n| --- | ---: | ---: | --- |\n" +
        samples.map((s) => `| ${s.name} | ${s.x} | ${s.y} | ${s.hex} |`).join("\n")
      : "No sample points supplied.",
    ""
  ].join("\n"));

  console.log(`Measured ${width}x${height}. Report: ${path.relative(process.cwd(), mdPath)}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});
