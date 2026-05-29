# Multi Screen Consistency

Use this file when designing two or more screens for the same mobile app.

## Core Rule

Multiple screens must feel like one product. Keep tokens, navigation, icon language, imagery, spacing, component behavior, and state handling consistent across the set.

When the user asks to design an app, bottom tabs define the minimum primary screen set. A four-tab app needs four primary tab screens by default, one for each tab. A tab can be omitted only when the user explicitly asks for a single page, a specific flow, or a limited draft; record that scope decision in the ledger.

## Consistency Dimensions

Check consistency across:

- product name and brand voice
- industry style posture
- navigation model
- bottom tabs and top actions
- spacing scale
- typography scale
- color roles
- image style and crop behavior
- icon style and stroke/fill
- card and sheet radius
- button hierarchy
- motion/feedback intensity
- state language
- accessibility behavior

## Token Baseline

Define once per project:

```md
## Tokens
- Frame:
- Raster scale:
- Safe areas:
- Spacing scale:
- Radius scale:
- Typography:
- Brand color:
- Accent color:
- Surface colors:
- Text colors:
- Shadow/elevation:
- Icon stroke:
```

Do not let each screen invent a separate palette, radius system, or icon style unless the product intentionally changes mode, such as editor canvas versus settings.

## Navigation Continuity

- Create a Tab-To-Screen Coverage table before screen generation.
- Generate one primary screen per bottom tab by default.
- Keep bottom tab order identical across main screens.
- Keep selected tab state correct per screen.
- Keep top bar title/action logic consistent.
- Keep back behavior predictable.
- Keep floating action button placement consistent.
- Do not change labels between screens without a reason.
- If a tab is an action tab such as publish/create, include its action screen, sheet, or modal state.

## Imagery Continuity

- Use consistent lighting and crop style for related photos.
- Do not swap a product/person/pet/object identity between screens unless the screen context changes.
- Keep avatars consistent across feed, profile, comments, and messages.
- Keep generated before/after examples visually related in editor apps.
- Use the same crop/focal point if the same asset appears in multiple places.

## Icon Continuity

- Use the same icon source family across screens.
- Use the same stroke weight.
- Use consistent selected/default colors.
- Keep badges in the same position.
- Do not use vector icons on one screen and random raster glyphs on another unless documented.

## Component Continuity

Repeated components should reuse the same pattern:

- cards
- list rows
- chips/tags
- bottom nav
- top bar
- buttons
- editor toolbar
- sheets/dialogs
- comment rows
- metric cells

If a component intentionally changes, document the reason.

## Cross-Screen Flow Checks

For each flow, verify:

- The next screen follows from the previous CTA.
- User selections persist.
- Entity identity persists, such as pet, restaurant, product, workout, account, or photo.
- Loading/success/error states use the same language and visual treatment.
- Back/close/submit behavior is coherent.

## Multi-Screen Ledger Template

```md
# Multi-Screen Consistency Ledger

## Tab-To-Screen Coverage
| tab id | label | screen id | screen purpose | selected state | status | notes |
| --- | --- | --- | --- | --- | --- | --- |

## Tokens
- 

## Shared Components
| component | screens | notes |
| --- | --- | --- |

## Shared Assets
| asset | screens | crop/role |
| --- | --- | --- |

## Navigation
- 

## Known Differences
| difference | reason | accepted? |
| --- | --- | --- |
```

## Acceptance Checklist

- Every bottom tab has a corresponding primary screen, action screen, sheet, or documented omission.
- Tokens are shared.
- Navigation is consistent.
- Icons share style and semantics.
- Repeated components match.
- Shared media assets keep identity and crop logic.
- Flow continuity is clear.
- State language is consistent.
- Known differences are documented.
