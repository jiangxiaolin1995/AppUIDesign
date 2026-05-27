# Design Production Brief

Use this file before producing a mobile app design image, Figma file, HTML preview, or implementation handoff. It prevents the common failure mode where a beautiful raster screen is generated first and the editable structure is guessed later.

## Core Rule

Before generating or rebuilding any screen, create a production brief. The brief is the source of truth for industry fit, screen scope, layout, assets, icons, states, and Figma reconstruction.

Do not skip the brief for visual work. A short brief is acceptable for simple one-screen tasks, but it must still include industry, screen size, navigation, assets, icons, and layer plan.

## Production Brief Template

```md
# Mobile App Design Production Brief

## Request
- User request:
- Target platform:
- Output route: image-first / Figma / HTML / implementation
- Target phone size:
- Raster size:
- Figma logical size:

## Industry And Style
- Primary UI Notes industry:
- Secondary industry or task model:
- Why this classification fits:
- Style posture:
- Density:
- Trust/commercial/safety requirements:
- Benchmark categories to inspect:

## Screen Scope
- Screen 1:
  - Purpose:
  - Primary action:
  - Main sections:
  - Required states:
- Screen 2:
  - Purpose:
  - Primary action:
  - Main sections:
  - Required states:

## Navigation Model
- Top-level navigation:
- Bottom tabs:
- Top bar actions:
- Modal/sheet/dialog use:
- Back behavior:

## Component Inventory
- Navigation:
- Cards:
- Lists:
- Buttons:
- Chips/tags:
- Forms:
- Toolbars:
- Charts/metrics:
- Empty/error/loading states:

## Figma Component System Plan
- Components to create:
- Component-like groups:
- Variants/states:
- Shared tokens:
- Component ledger path:

## Icon Inventory
| icon | role | state | source | size | color | notes |
| --- | --- | --- | --- | --- | --- | --- |
| home | bottom tab | selected/default | vector/icon library | 24 | brand/neutral | no circle fallback |

## Icon Pipeline Plan
- Standard vector/library icons:
- Custom generated icon sheet:
- Source-raster icon crops:
- Temporary icon placeholders:
- Badge/count handling:
- Dark mode icon handling:
- Icon warnings to report:

## Visual Asset Inventory
| asset | screen | role | aspect/crop | source | Figma handling |
| --- | --- | --- | --- | --- | --- |
| home hero | home | bitmap composite or hero photo | cover | generated/cropped | movable bitmap crop |

## Prototype Constraints
- Must preserve:
- May improve:
- Must not change:
- Usability overrides:

## State Matrix
| screen | flow/component | loading | empty | error | offline | permission | success | destructive | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

## Layer Plan
| region | type | Figma layer strategy | editable? | risk |
| --- | --- | --- | --- | --- |
| status bar | system-chrome | vector/text or bitmap composite if included in source | yes/partial | duplicate risk |
| hero | bitmap-media/bitmap-composite | image crop plus editable overlays, or composite if inseparable | partial | crop/text duplication |

## Image Generation Prompt Plan
- Screen prompt:
- Negative prompt:
- Companion asset sheet prompt:
- Icon sheet prompt:
- Asset consistency requirements:

## Figma Reconstruction Plan
- Locked references:
- Editable frames:
- Bitmap crops:
- Bitmap composites:
- Vector icons:
- Components:
- Shared plugin data keys:
- Verification screenshots:

## Multi-Screen Consistency Plan
- Shared tokens:
- Shared navigation:
- Shared components:
- Shared icons:
- Shared media identity:
- State language:
- Known intentional differences:

## Visual Difference Plan
- Reference normalization:
- Candidate export size:
- Manual visual check:
- Region checklist:
- Pixel diff required:
- Diff artifact paths:
- Fidelity label target:

## Acceptance Criteria
- Standard phone ratio:
- No placeholder icon circles:
- Same-source images:
- Figma layers movable/selectable:
- Component system completed:
- Prototype constraints respected:
- State matrix covered:
- Multi-screen consistency checked:
- Visual comparison completed:
- Visual diff level:
- Icon pipeline completed:
- Delivery package completed:
- Known limitations:
```

## Industry Decision Rules

Classify by the user's primary daily task, not only by product name.

- If users browse, post, follow, comment, chat, or build identity, classify as `社交` first.
- If users buy, compare, add to cart, pay, track, refund, or redeem, classify as `购物` or `美食佳饮` first.
- If users book trips, hotels, routes, tickets, itineraries, or local destinations, classify as `旅游` or `导航`.
- If users edit photos/videos, generate media, export assets, or manage canvases, classify as `摄影与录像` or `图形和设计`.
- If users record workouts, meals, sleep, mood, body data, or training plans, classify as `健康健美`.
- If users track money, invest, insure, transfer, repay, or verify transactions, classify as `财务`.
- If users diagnose, book care, manage medicine, view reports, or consult clinicians, classify as `医疗`.
- If users search factual knowledge, definitions, translations, formulas, or static references, classify as `参考`.
- If users complete quick tasks with low emotional content, classify as `工具` or `效率`.

If the product crosses industries, pick one primary industry and one secondary task model. For example:

- Pet community with local meetups: `社交` primary, `生活` secondary, `content feed + social exchange`.
- AI retouching app with sharing: `摄影与录像` primary, `图形和设计` secondary, `creation/editing + export`.
- Food delivery with community reviews: `美食佳饮` primary, `社交` secondary, `transaction + content detail`.

## Screen Scope Rules

For a first design set, choose screens that prove the core workflow rather than random marketing views.

- Social/community: home feed, publish/create, profile/detail, comments/report state.
- Food delivery: home/search, restaurant detail, cart/checkout, order status.
- Photo/video editor: import/permission, editor canvas, AI result compare, export/share.
- Fitness: today dashboard, workout session, progress/insights, plan adjustment.
- Finance: overview, asset/detail, transaction confirmation, error/recovery.
- Medical: home/triage, appointment/detail, report/medicine, privacy/consent.
- Weather/navigation/tools: quick query, detail/map, permission/offline, settings.

## Navigation And Tab Rules

Navigation must be planned before image generation.

- Name every bottom tab and top action before generating the screen.
- Assign a semantic icon to each destination; do not accept unlabeled circles.
- Define selected, default, badge, disabled, and pressed states where relevant.
- Keep bottom navigation hit areas at least `44pt` on iOS-like frames and `48dp` on Android-like frames.
- Floating action buttons must not collide with bottom navigation labels or system home indicator.
- If the source image includes baked navigation text/icons, decide whether it is a bitmap composite or whether to rebuild it as editable layers. Do not duplicate both.

## Component Planning Rules

Use `figma-component-system.md` before writing Figma JS.

- Repeated UI must be listed as a component or component-like group.
- States and variants must be documented even if formal Figma variants are not created.
- Component names must be semantic and stable.
- Component inventory must be returned in the Figma script audit.

## Prototype Constraint Rules

Use `prototype-constraints.md` when the user gives a prototype, screenshot, or wireframe.

- List must-preserve items before redesigning.
- List must-not-change items before changing layout or flow.
- Use usability overrides only when mobile usability, safety, accessibility, or platform constraints require it.
- Document overrides in the handoff.

## State Matrix Rules

Use `state-matrix.md` for all real app flows.

- Transaction, finance, medical, creation/editor, and permission-heavy products require explicit state coverage.
- For simple concept screens, list at least default, loading, empty, and error assumptions.
- Do not call a workflow complete if submission/payment/export states are missing.

## Multi-Screen Consistency Rules

Use `multi-screen-consistency.md` when producing more than one screen.

- Define tokens once.
- Keep navigation order and labels stable.
- Keep icon family and image style consistent.
- Preserve entity identity across screens.
- Record intentional differences.

## Delivery Package Rules

Use `delivery-package.md` before final handoff.

- Save the production brief.
- Save generated/reference/crop/icon assets in predictable folders.
- Save Figma scripts/specs/ledgers when Figma is involved.
- Save diff artifacts when claiming pixel-faithful or 1:1.
- Include a README or handoff note with fidelity label and limitations.

## Asset And Icon Sheet Rules

When using image generation for polished screens, generate or extract enough separate material to rebuild Figma.

Create separate assets for:

- Hero photos and large media regions.
- Product, food, pet, people, travel, cover, poster, and editor-canvas images.
- Avatars and thumbnails.
- Before/after AI results.
- Custom tab icons, brand marks, badges, stickers, and mascots.
- Bitmap-composite regions that cannot be separated without visual damage.

Do not generate separate assets for:

- Standard chevrons, search, back, close, plus, home, profile, cart, filter, settings, or other common control icons. Rebuild those as vectors or import from an icon library.
- Text labels that should be editable in Figma.
- Simple cards, buttons, chips, bars, or list rows.

## Visual Diff Planning Rules

Plan the comparison before building the Figma file.

- If the user asks for `1:1`, plan for pixel/threshold diff.
- If the user asks for editable Figma but not strict 1:1, plan for at least a region checklist.
- If the output is only an early concept, manual visual check is acceptable, but the handoff label must be `design image` or `editable draft`.
- Always define the reference size, candidate export size, and whether the reference should be downscaled or the candidate upscaled.
- Save visual diff reports near the Figma ledger or design package.

## Prompt Construction Rules

The screen prompt must include:

- Actual mobile app screen, edge-to-edge phone canvas, no external device frame unless requested.
- Target frame ratio and approximate size.
- Industry and task context.
- Screen purpose and exact sections.
- Navigation and tab names.
- Icon semantics and instruction to avoid placeholder circles.
- Image roles and crop behavior.
- Visual style, density, color mood, typography mood.
- Text length limits and readable UI scale.
- State requirements such as badge, selected tab, loading, error, permission, or disabled.

The negative prompt must include:

- no browser UI
- no desktop layout
- no marketing poster
- no square collage
- no placeholder circles for icons
- no unreadable tiny text
- no random icon metaphors
- no swapped media subjects between screens
- no baked text inside clean asset sheets

## Figma Reconstruction Input Packet

Before calling `use_figma`, prepare a packet like this:

```json
{
  "fileKey": "figma-file-key",
  "pageName": "Project / Editable v1",
  "frame": { "width": 393, "height": 852, "sourceScale": 3 },
  "screens": [
    {
      "name": "01 Home",
      "referenceAsset": "assets/01-home-reference.png",
      "editableFrameName": "Editable Screen / 01 Home",
      "regions": [
        {
          "id": "hero",
          "type": "bitmap-media",
          "x": 16,
          "y": 168,
          "w": 361,
          "h": 170,
          "radius": 18,
          "asset": "assets/home-hero.png",
          "crop": "FILL",
          "editable": "movable bitmap"
        }
      ],
      "icons": [
        {
          "id": "tab-home",
          "role": "bottom-tab",
          "source": "vector",
          "state": "selected",
          "x": 52,
          "y": 804
        }
      ]
    }
  ]
}
```

Use this packet to drive detailed Figma JS. Do not write a script that only eyeballs a screenshot.

## Handoff Notes

When returning work to the user, include:

- Industry classification and why.
- Screens produced.
- Where generated/reference images are stored.
- Figma file/page if written.
- Whether icon inventory and asset inventory were completed.
- Whether the output is `pixel-faithful`, `high-fidelity editable`, or `editable draft`.
- Known mismatches and the next pass needed to reach stricter 1:1.
