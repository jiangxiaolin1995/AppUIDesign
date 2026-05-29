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
  node scripts/build-figma-packet.js --manifest examples/asset-manifest.example.json --out figma/figma-packet.js

Creates a JS constants packet for use_figma scripts so layout, assets, icons, and text boxes come from the manifest instead of memory.`;
}

function jsString(value) {
  return JSON.stringify(value, null, 2);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.manifest) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const manifestPath = path.resolve(process.cwd(), args.manifest);
  const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  const imageHashes = {};
  for (const screen of manifest.screens || []) {
    for (const asset of screen.assets || []) imageHashes[asset.id] = "";
  }

  const packet = `// Generated from ${path.relative(process.cwd(), manifestPath)}.
// Fill imageHashes with hashes returned by Figma upload_assets before running use_figma.
// Keep this packet as the single source for Figma node names, rectangles, radii, crops, icons, and text boxes.

export const DESIGN_MANIFEST = ${jsString(manifest)};

export const imageHashes = ${jsString(imageHashes)};

export function getScreen(id) {
  const screen = DESIGN_MANIFEST.screens.find((item) => item.id === id || item.name === id);
  if (!screen) throw new Error(\`Unknown screen: \${id}\`);
  return screen;
}

export function getAsset(screen, assetId) {
  const asset = screen.assets.find((item) => item.id === assetId);
  if (!asset) throw new Error(\`Unknown asset: \${screen.id}/\${assetId}\`);
  return asset;
}
`;

  if (args.out) {
    const outPath = path.resolve(process.cwd(), args.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, packet);
    console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
  } else {
    console.log(packet);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
