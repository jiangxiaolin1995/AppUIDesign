#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const args = { files: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const value = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
      args[key] = value;
    } else {
      args.files.push(arg);
    }
  }
  return args;
}

function usage() {
  return `Usage:
  node scripts/check-links.js references/research/source-map.md --limit 20
  node scripts/check-links.js references/research/source-map.md references/research/platform-image-guidelines.md --timeout 8000

Checks public reference links and reports stale or unreachable sources.`;
}

function extractUrls(text) {
  const urls = [];
  const regex = /https?:\/\/[^\s)\]]+/g;
  let match;
  while ((match = regex.exec(text))) urls.push(match[0]);
  return urls;
}

async function checkUrl(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal });
    if ([405, 403].includes(response.status)) {
      response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal });
    }
    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    return { url, status: null, ok: false, error: error.name === "AbortError" ? "timeout" : error.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.files.length) {
    console.log(usage());
    process.exit(args.help ? 0 : 1);
  }

  const timeoutMs = Number(args.timeout || 8000);
  const limit = args.limit ? Number(args.limit) : Infinity;
  const urls = [];
  for (const file of args.files) {
    const filePath = path.resolve(process.cwd(), file);
    const text = await fs.readFile(filePath, "utf8");
    for (const url of extractUrls(text)) urls.push({ file, url });
  }

  const unique = [...new Map(urls.map((item) => [item.url, item])).values()].slice(0, limit);
  const results = [];
  for (const item of unique) {
    const result = await checkUrl(item.url, timeoutMs);
    results.push({ file: item.file, ...result });
    const status = result.ok ? "ok" : "fail";
    console.log(`${status} ${result.status || "-"} ${item.url}`);
  }

  const failed = results.filter((item) => !item.ok);
  const report = {
    checkedAt: new Date().toISOString(),
    checked: results.length,
    failed: failed.length,
    results
  };
  if (args.out) {
    const outPath = path.resolve(process.cwd(), args.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, `${JSON.stringify(report, null, 2)}\n`);
  }
  if (failed.length) process.exit(2);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
