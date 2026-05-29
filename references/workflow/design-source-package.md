# Design Source Package

Use this file before generating any mobile app design image that may later become Figma. The goal is to make the image generation step produce a design that can be rebuilt, not just a beautiful flat picture.

## Core Rule

Do not generate the final screen image first and guess the structure later. First create a design source package. The package is the contract between image generation and Figma reconstruction.

If the user asks for a Figma file, or if the design may need Figma later, the package is mandatory. A screen produced without it can only be treated as visual exploration, not a reliable Figma source.

## Required Package

```md
# Design Source Package

## Screen Contract
- Product:
- UI Notes industry:
- Secondary task model:
- Target platform:
- Logical Figma frame:
- Raster export size:
- Scale:
- Safe areas:
- Status/navigation chrome:
- Top-level tabs:
- Minimum primary screens:

## Tab-To-Screen Coverage
For app-level design requests, every bottom tab gets one primary screen by default.

| tab id | label | role | screen id | screen name | selected state | output required | notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| home | 首页 | destination | 01-home | Home | selected | yes | default first screen |
| create | 发布 | action | 03-create | Create Sheet | active/action | yes | action screen or modal |

## Layout Blueprint
| region | role | x | y | w | h | radius | gap/padding | z | Figma strategy |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| top-bar | navigation | 0 | 44 | 430 | 64 | 0 | 24/16 | 10 | editable text + vector icons |
| hero-media | media | 20 | 126 | 390 | 520 | 30 | 0 | 20 | independent bitmap media node |

## Typography Tokens
| token | use | size | weight | line-height | color | box behavior |
| --- | --- | --- | --- | --- | --- | --- |
| title-xl | screen title | 24 | 700 | 30 | #111111 | fixed box |
| body-sm | metadata | 12 | 400 | 16 | #7A7F8A | fixed box |

## Spacing And Radius Tokens
| token | value | use |
| --- | --- | --- |
| space-4 | 4 | tight icon/text gap |
| space-8 | 8 | chip inner gap |
| space-16 | 16 | card padding |
| radius-card | 16 | cards |
| radius-hero | 30 | hero media |

## Component Contract
| component | instances | measured size | states | children | Figma strategy |
| --- | --- | --- | --- | --- | --- |
| Bottom Nav Item | 4 | 86x62 | selected/default | hit area, vector icon, label | component-like group |
| Editor Tool | 5 | 70x74 | selected/default/disabled | hit area, icon, label | fixed wrapper |

## Icon Contract
| id | batch | label | role | expected glyph | size | stroke/fill | state | source | asset file | Figma node |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tab-home | navigation | 首页 | bottom tab | home | 24 | 2px stroke | selected/default | vector/library | none | Component / Icon / Home |
| editor-crop | editor-tool | 裁剪 | toolbar | crop corners | 24 | 2px stroke | default | vector/library | none | Component / Icon / Crop |
| pet-paw | brand-custom | 爪友圈 | custom tab | paw mark | 28 | filled | selected/default | generated-sheet | assets/icons/navigation/pet-paw-selected.png | Bitmap Icon / pet-paw / selected |

## Asset Contract
| id | role | generated separately? | aspect | crop mode | focal point | no-baked-ui rule | Figma node |
| --- | --- | --- | --- | --- | --- | --- | --- |
| editor-result | editor canvas | yes | 3:4 | cover/contain by product | subject center | no text/buttons/icons | Bitmap Crop / editor-result |

## Source Asset Pack
| file | type | screen | Figma node | required before Figma? | notes |
| --- | --- | --- | --- | --- | --- |
| 01-home-reference.png | full-screen reference | Home | Locked Reference / 01 Home | yes | original visual source |
| home-hero-athlete.png | clean media | Home | Bitmap Crop / home-hero-athlete | yes | no UI/text/icons |
| custom-icons.png | icon sheet | all | Bitmap Icon or vector rebuild source | only for custom icons | standard icons should be vector |
| icon-ledger.json | icon ledger | all | icon manifest rows | yes | batches, states, source decisions, target nodes |

## Image Generation Contract
- Screen image prompt:
- Negative prompt:
- Separate media asset prompts:
- Separate icon sheet prompt:
- Batch icon asset prompt:
- Text that must remain editable:
- UI elements that must not be baked into media:
- Expected visual hierarchy:

## Figma Reconstruction Contract
- Locked reference frame:
- Editable frame:
- Pair layout: left locked original, right editable reconstruction, same logical phone size:
- Scale factor:
- Component masters/groups:
- Text layers:
- Vector icons:
- Bitmap media nodes:
- Bitmap composite exceptions:
- Audit checks:
- Asset backfill checks:

## Acceptance Gate
- Layout blueprint completed:
- Tab-to-screen coverage completed:
- One primary screen per bottom tab, unless explicitly scoped out:
- Typography tokens completed:
- Component contract completed:
- Icon contract completed:
- Icon batch ledger completed:
- Bitmap-backed icon files generated/cropped:
- Asset contract completed:
- Image prompts separate UI from media:
- No critical Figma region depends on guessing:
```

## Package Rules

- The package must be written before final image generation. It can be revised after a visual direction test, but the final screen should be generated from the package.
- For Figma-bound work, produce assets in this order: clean media assets, batch icon source package, full-screen reference image, asset manifest, then Figma reconstruction. Do not start the editable Figma file from an untracked image prompt.
- Use one phone frame size for the whole package. Do not mix raster and Figma sizes without an explicit scale factor.
- Every visible module needs a layout row. For unknown values, choose a reasonable value before generating; do not leave blanks.
- Every user-facing text style needs a token row. Include fixed text-box behavior so Figma text does not resize the layout unexpectedly.
- Every icon needs an expected glyph. Do not rely on the image model to invent tab or toolbar icons.
- Every photo, avatar, product image, map, editor canvas, generated result, or illustration needs an asset row.
- Every Figma-bound screen needs a full-screen reference image row. This is the image placed on the left side of the Figma reference pair.
- Every Figma-bound media region needs a separate clean media file or a documented crop source. Do not rely on grey fills, gradients, or later guessing.
- Custom icon art needs a separate icon sheet or exact source crop. Standard UI controls should be vector/library icons, but they still need icon contract and batch ledger rows.
- The asset manifest must map each file to a Figma target node name, crop mode, focal point, radius, overlay split, icon state/source, and verification status.
- Every media asset that should remain editable/reusable in Figma should be generated or sourced separately, without UI labels, buttons, chips, or icons baked into it.
- If a hero/media region intentionally includes overlaid UI in the raster image, list which overlays will be rebuilt as Figma text/vector layers.
- The Figma reconstruction contract must say how each region becomes editable: text, vector, shape, component, bitmap media, or documented bitmap composite.
- The Figma reconstruction contract must require a left/right reference pair for each screen whenever a raster source exists.
- The final handoff must verify that each asset manifest row was uploaded and applied to its target node as an `IMAGE` fill.

## Figma-Bound Asset Manifest

Use this manifest before writing Figma. Markdown is acceptable for planning; JSON is better for scripts.

| id | file | kind | source | screen | target node | x/y/w/h | crop mode | focal point | radius | overlay split | verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ref-home | 01-home-reference.png | full-screen reference | generated screen | 01 Home | Locked Reference / 01 Home | 0/0/430/932 | contain | n/a | 0 | none | pending |
| hero-home | home-hero-photo.png | clean media | generated clean asset | 01 Home | Bitmap Media / 01 Home / hero | 20/132/390/246 | cover | center face | 24 | title + CTA rebuilt | pending |
| icon-tab-plan | icon-sheet.png | custom icon sheet | generated sheet | all | Component / Icon / Plan | 24x24 | crop or vector trace | optical center | n/a | label rebuilt | pending |
| icon-tab-home | assets/icons/navigation/tab-home-selected.png | bitmap-icon | generated icon pack | all | Bitmap Icon / tab-home / selected | 24x24 | fit | optical center 12/12 | n/a | label rebuilt | pending |

Rules:

- Full-screen reference files are locked originals only. They are never the final visible editable screen.
- Clean media files must not contain UI text, buttons, chips, status bars, tab bars, watermarks, or device frames.
- Standard icons can skip raster icon files only when the icon contract names the exact vector/library glyph to use.
- Bitmap-backed icons need one manifest row per state and must upload into independent `Bitmap Icon / ...` nodes, not into the full-screen reference.
- If a manifest row is missing a target node, crop mode, or verification status, the file is not Figma-ready.
- If any required media file cannot be generated cleanly, label the work `asset-pack-partial` and list which node will be visually weaker.

## Reference Pair Contract

Every Figma-bound screen converted from a generated or supplied image must create a pair:

| side | frame name | contents | editability |
| --- | --- | --- | --- |
| left | `Locked Reference / {screen}` | approved full-screen PNG at logical phone size | locked image only |
| right | `Editable Reconstruction / {screen}` | Figma layers rebuilt from manifest, components, text, vectors, and bitmap media | editable/movable |

Rules:

- The left and right frames use the same logical phone size and scale.
- The pair sits on the same Figma page before any presentation board or component library.
- The right frame cannot use the full-screen reference image as its visible background.
- Component libraries, notes, and ledgers should sit outside the pair so comparison remains clean.
- If the right frame is not measured against the left frame, the highest honest label is `editable draft`.

## What The User Should Give

When possible, ask for or infer these inputs before producing a design:

- Product type and primary user task.
- Target platform or container: iOS, Android, mini program, mobile H5, React Native, Flutter.
- Whether the user wants image-only, Figma, or both.
- Reference prototype or screenshot, if any.
- Brand colors or mood.
- Required screen count.
- Required tabs/actions.
- Real assets the user wants preserved.

If the user does not provide these, make a conservative mobile-first assumption and record it in the package.

## Figma Readiness Labels

- `source-package-ready`: all required package sections are filled and image generation can proceed.
- `visual-exploration-only`: a direction image can be generated, but it is not reliable for Figma.
- `figma-blocked`: missing icon, media, layout, or text information would cause a bad Figma reconstruction.
- `figma-ready-with-assumptions`: enough information exists, but assumptions are recorded and must be visible in handoff.

## Asset Pack Readiness Labels

- `asset-pack-ready`: full-screen references, clean media assets, and custom icon sheets/vector contracts are available and mapped to Figma nodes.
- `asset-pack-partial`: some media or icon assets are missing; Figma can start only with visible warnings.
- `asset-pack-blocked`: required reference images or media assets are missing, so 1:1 Figma reconstruction should not start.

## Common Failures

- Generating one attractive screen with baked text, icons, and photos, then trying to extract editable layers afterward.
- Building Figma directly without a left-side original reference, making it impossible to judge whether layout drifted.
- Creating image nodes but leaving them as grey rectangles or gradients after upload/backfill fails.
- Letting the image model decide icon semantics, which creates circles, wrong metaphors, or inconsistent strokes.
- Not fixing text sizes and boxes before Figma, which makes layout drift during reconstruction.
- Treating photos as decoration instead of named media assets with crop, focal point, and mask.
- Creating clean Figma components whose real instances no longer match the approved image geometry.
