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
  node scripts/validate-figma-audit.js --audit examples/figma-audit.example.json
  node scripts/validate-figma-audit.js --audit figma/audit.json --allow-warnings

Checks that a Figma write produced left/right reference pairs, image fills, componentized layers, and no full-screen screenshot as the visible frame.`;
}

function mainAudit(audit, allowWarnings = false) {
  const errors = [];
  const warnings = [];
  const pairs = audit.referencePairs || [];
  if (!Array.isArray(pairs) || pairs.length === 0) errors.push("referencePairs must contain at least one locked/editable pair.");
  for (const [index, pair] of pairs.entries()) {
    const label = `referencePairs[${index}]`;
    if (!pair.referenceName?.startsWith("Locked Reference /")) errors.push(`${label}.referenceName must start with "Locked Reference /".`);
    if (!pair.editableName?.startsWith("Editable Reconstruction /")) errors.push(`${label}.editableName must start with "Editable Reconstruction /".`);
    if (!pair.sameSize) errors.push(`${label}.sameSize must be true.`);
  }

  const fills = audit.assetFills || [];
  if (!Array.isArray(fills) || fills.length === 0) errors.push("assetFills must list uploaded image fills.");
  for (const [index, fill] of fills.entries()) {
    const label = `assetFills[${index}]`;
    if (fill.fillType !== "IMAGE") errors.push(`${label}.fillType must be IMAGE.`);
    if (!fill.hasImageHash) errors.push(`${label}.hasImageHash must be true.`);
    if (!fill.nodeName || !/Bitmap|Media|Reference|Crop/i.test(fill.nodeName)) {
      warnings.push(`${label}.nodeName does not look like a named bitmap/media/reference node.`);
    }
  }

  const editability = audit.layerEditability || {};
  if (editability.fullScreenScreenshotUsedAsVisible) {
    errors.push("fullScreenScreenshotUsedAsVisible must be false.");
  }
  if (Number(editability.textLayerCount || 0) <= 0) warnings.push("No editable text layers reported.");
  if (Number(editability.vectorIconCount || 0) <= 0) warnings.push("No vector icon layers reported.");
  if (Number(editability.bitmapMediaCount || 0) <= 0) warnings.push("No movable bitmap media layers reported.");

  if (!Array.isArray(audit.components) || audit.components.length === 0) warnings.push("No components or component-like groups reported.");
  if (!Array.isArray(audit.icons) || audit.icons.length === 0) warnings.push("No icon inventory reported.");

  const auditWarnings = Array.isArray(audit.warnings) ? audit.warnings : [];
  if (auditWarnings.length && !allowWarnings) errors.push(`Figma audit contains ${auditWarnings.length} warning(s). Use --allow-warnings only for drafts.`);

  return {
    status: errors.length ? "fail" : warnings.length || auditWarnings.length ? "warning" : "pass",
    errors,
    warnings,
    auditWarnings
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.audit) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }
  const auditPath = path.resolve(process.cwd(), args.audit);
  const audit = JSON.parse(await fs.readFile(auditPath, "utf8"));
  const result = mainAudit(audit, Boolean(args["allow-warnings"]));
  console.log(JSON.stringify({ audit: path.relative(process.cwd(), auditPath), ...result }, null, 2));
  if (result.errors.length) process.exit(2);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
