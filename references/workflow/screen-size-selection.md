# Screen Size Selection

Use this file before generating a mobile design image or reconstructing it in Figma. Platform and company references are not visual templates to copy; they help choose a suitable canvas, density, crop behavior, and interaction scale.

## Core Rule

Do not default blindly to one phone size. Match the screen size to the target platform, delivery container, product type, and source prototype.

## Decision Order

1. **User-provided prototype wins**: if the user gives a screenshot, wireframe, or Figma frame, preserve its aspect ratio unless it is clearly not a mobile screen.
2. **Target platform wins next**: iOS, Android, mini program, H5-in-mobile, React Native, Flutter, or unspecified cross-platform.
3. **Product context adjusts density**: media/editor screens may need taller canvas and full-bleed imagery; commerce/service screens need stable card/list density; finance/medical screens need calmer spacing.
4. **Figma must match the selected logical size**: source image, Figma frame, crop coordinates, and screenshot verification should share the same aspect ratio.

## Default Canvas Map

| Situation | Figma logical frame | Raster export target | Why |
| --- | --- | --- | --- |
| Unspecified iOS/cross-platform app | `393x852` | `1179x2556` | Common modern iPhone scale, good default for App Store-like mobile design |
| Large iPhone / visual-rich screen | `430x932` | `1290x2796` | More room for immersive photos, editor canvas, media detail, commerce hero |
| Compact iPhone compatibility | `390x844` | `1170x2532` | Useful when matching older/common iPhone proportions |
| Android-first compact phone | `360x800 dp` | `1080x2400` | Android density-independent baseline, good for Material-like compact phones |
| Android large phone | `412x915 dp` | `1236x2745` | Better for commerce, content feed, and image-heavy Android screens |
| WeChat mini program / mobile H5 | `375x812` or `390x844` | `1125x2436` or `1170x2532` | Familiar mobile container sizes; match host chrome if provided |
| User screenshot has exact dimensions | nearest matching aspect ratio | preserve source ratio | Prevent visual drift from arbitrary resizing |

## Product-Type Adjustments

| Product | Preferred Size Behavior |
| --- | --- |
| AI photo/video editor | Use `393x852` or `430x932`; canvas dominates; preserve before/after image crop |
| Food delivery / shopping | Use `393x852`, `430x932`, or Android `412x915`; image cards need clear product/food recognition |
| Fitness / lifestyle | Use `393x852`; allow hero image plus metric cards without crowding |
| Finance / medical | Use `390x844` or `393x852`; prioritize trust, spacing, confirmation, readable numbers |
| Social / news / entertainment | Use `393x852` or Android `412x915`; content feed density and media preview matter |
| Utility / weather / navigation | Use `390x844` or Android `360x800`; fast lookup and state clarity matter more than decoration |

## How To Match A Given Design Image

1. Read the source image dimensions.
2. Compute aspect ratio.
3. Match to nearest target:
   - around `0.461`: iPhone `393x852`, `1179x2556`
   - around `0.462`: iPhone `430x932`, `1290x2796`
   - around `0.450`: Android `360x800`, `1080x2400`
   - around `0.454`: Android `412x915`
4. If the source is already a high-resolution phone screen, keep it and set the Figma frame to the corresponding logical size.
5. If the source is a board with multiple screens, extract or regenerate each screen separately.

## Platform Reference Interpretation

- Apple references guide safe areas, high-resolution assets, aspect-ratio preservation, iOS touch scale, and familiar chrome.
- Android/Material references guide density-independent sizing, `48dp` touch targets, and adaptive behavior across device classes.
- Tencent/WeUI references guide mini-program/H5 mobile familiarity and common upload/form/service modules.
- Ant Design Mobile references guide business mobile component vocabulary and predictable interaction.
- Meituan references guide consistency across high-volume service businesses, especially color/icon/component standardization.
- JD/NutUI references guide retail/mobile commerce density, product image clarity, and cross-platform H5/mini-program components.

These references are constraints and heuristics, not visual styles to copy.

## Figma Implications

- The selected logical frame is the source of truth for all coordinates.
- Crops should be exported against the source image's native pixel size, then placed into the logical Figma frame proportionally.
- Screenshot verification must compare equivalent aspect ratios.
- If the selected size changes, redo crop coordinates; do not stretch old crops.

## Common Mistakes

| Mistake | Correction |
| --- | --- |
| Always using `393x852` | Choose size from platform, prototype, and product type |
| Copying a big-company visual style | Extract constraints: density, image handling, component consistency, safe areas |
| Resizing a generated image to fit Figma | Generate or reconstruct at the chosen aspect ratio |
| Using one board image for several screens | Split into separate phone screens |
| Letting Figma crops drift after size change | Recompute crop coordinates for the selected frame |
