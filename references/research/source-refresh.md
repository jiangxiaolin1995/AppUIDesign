# Source Refresh

Use this file when maintaining external references for mobile UI design, platform guidance, company design systems, screenshot libraries, and Figma handoff constraints.

## Core Rule

External sources are decision inputs, not permanent truth. Before using a source for current screen-size, platform, component, image, or accessibility claims, check whether the URL still resolves and whether the rule is still current enough for the task.

## Refresh Fields

When adding or updating source links, record:

| field | meaning |
| --- | --- |
| source | organization or library |
| URL | canonical public link |
| last reviewed | date checked, `YYYY-MM-DD` |
| use for | screen size, touch target, platform chrome, crop behavior, component consistency, etc. |
| freshness risk | low / medium / high |
| notes | what the source informs, not copied visual style |

## Freshness Rules

- Platform guidance from Apple, Android, Material, HarmonyOS, Samsung, and accessibility bodies is medium-to-high freshness risk. Recheck before citing exact current behavior.
- Screenshot-library counts, category lists, and public availability are high freshness risk. Recheck before claiming numbers or coverage.
- Company design-system URLs can move. Run the link checker before publishing a refreshed README or GitHub version.
- Major-company rules should be used to choose constraints, density, safety, crop, and component behavior. Do not copy their brand visuals, screenshots, proprietary assets, or exact page composition.

## Link Check Command

```bash
node scripts/check-links.js references/research/source-map.md references/research/platform-image-guidelines.md --out tmp/source-link-report.json
```

For a quick smoke test:

```bash
node scripts/check-links.js references/research/source-map.md --limit 10
```

## Review Note Template

```md
## Source Refresh - YYYY-MM-DD

- Checked files:
- Link report:
- Broken or redirected URLs:
- Sources whose rules changed:
- UI Notes / Meiye taxonomy changes:
- Skill files updated:
- Remaining risks:
```
