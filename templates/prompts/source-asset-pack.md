# Source Asset Pack Prompt Templates

Use these templates before final screen generation when the output may become Figma. The goal is to generate the screen and the reusable materials at the same time, not to reverse-engineer everything from one flat image.

## 1. Clean Media Asset Prompt

```text
Create a clean mobile app media asset for [PRODUCT / SCREEN / REGION].

Asset role:
- Screen: [01 Home]
- Region id: [home-hero]
- Intended Figma node: [Bitmap Media / 01 Home / hero-card]
- Aspect ratio / crop: [wide 345x128 logical, cover crop]
- Focal point: [subject center upper body]
- Industry: [健康健美 / 美食佳饮 / 摄影与录像 / etc.]
- Mood: [energetic but clean, realistic, premium, warm, etc.]

Content:
- [Describe the photo/illustration/canvas result]

Strict exclusions:
- no UI text
- no buttons
- no chips
- no icons
- no status bar
- no bottom navigation
- no watermark
- no device frame
- no logo unless explicitly required

Output:
- one standalone image asset
- enough edge detail for cover crop
- subject remains clear at mobile size
```

## 2. Custom Icon Sheet Prompt

Use only for custom brand icons, illustrated category marks, mascots, stickers, or unusual app-specific glyphs. Standard controls should be vectors or icon-library glyphs instead.

```text
Create a clean mobile app custom icon sheet.

Icon system:
- Product: [PRODUCT]
- Industry: [INDUSTRY]
- Style: [rounded filled / thin stroke / soft 3D / flat pictogram]
- Grid: [one icon per cell, equal optical size]
- Size target: [24x24 or 28x28 logical]
- States: [selected/default if needed]

Icons:
1. [id] - [semantic role] - expected glyph: [glyph description]
2. [id] - [semantic role] - expected glyph: [glyph description]
3. [id] - [semantic role] - expected glyph: [glyph description]

Strict exclusions:
- no labels
- no UI containers
- no tab bar
- no random decorative symbols
- no emoji style unless requested
- consistent stroke/fill, perspective, and lighting

Output:
- transparent background if possible, otherwise flat high-contrast background
- icons separated with clear padding for cropping
```

## 2A. Batch Icon Asset Pack Prompt

Use this before the full-screen reference prompt whenever the screen will become Figma. Generate custom icon sheets in batches and define vector contracts for standard icons before creating the final app screen.

```text
Create a mobile app icon source pack for Figma reconstruction.

Product:
- Product: [PRODUCT]
- UI Notes industry: [INDUSTRY]
- Platform posture: [iOS native / Android Material / mini-program / cross-platform]
- Screen(s): [01 Home, 02 Detail, etc.]
- Visual style: [rounded filled / thin stroke / soft 3D / glassy / flat pictogram]
- Active color: [#HEX]
- Inactive color: [#HEX]
- Icon target size: [24x24 logical, hit area 44x44 or 48x48]

Batches:
1. navigation
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]
2. toolbar
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]
3. business-category
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]
4. editor-tool
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]
5. status-badge
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]
6. brand-custom
   - [id] / [label] / [role] / [state] / expected glyph: [description] / source: [vector or generated]

Output requirements:
- Generate custom icons as clean asset sheets, grouped by batch.
- For standard icons, output vector contracts instead of raster art.
- One icon per grid cell, equal optical size, enough padding for cropping.
- Include selected/default variants when used.
- No labels inside icons.
- No tab bar, no buttons, no phone frame, no UI containers.
- No random decorative symbols.
- Transparent background when possible.
- Consistent stroke/fill, corner style, perspective, and lighting.

Also output an icon ledger:
- id
- batch
- label
- role
- state
- source
- expected asset file name
- target Figma node
- logical box
- stroke/fill
- optical center
- badge anchor
- scale mode
- required
```

## 3. Full-Screen Reference Prompt

Use after the layout blueprint, typography, component contract, icon contract, clean media assets, and asset manifest are drafted.

```text
Create one high-fidelity mobile app screen as the approved raster reference.

Phone canvas:
- Logical Figma size: [393x852]
- Raster output target: [1179x2556]
- Ratio: vertical phone, about 9:19.5
- No external phone frame
- No browser chrome

Product and industry:
- Product: [PRODUCT]
- UI Notes industry: [INDUSTRY]
- Secondary task model: [transaction / creation-editing / habit loop / content feed]
- Platform posture: [iOS native / Android Material / mini-program / cross-platform]

Layout blueprint:
- [region id]: x/y/w/h/radius, role, z-order, strategy
- [region id]: x/y/w/h/radius, role, z-order, strategy

Typography:
- [token]: size/weight/line-height/color/use
- [token]: size/weight/line-height/color/use

Components:
- [component]: size, state, repeated instances, padding
- [component]: size, state, repeated instances, padding

Media and icons:
- Use the clean media asset concept for [asset id] in [region].
- Standard icons should look like clear vector UI icons, not placeholder circles.
- Custom icons should match the separate icon sheet concept.

Visual requirements:
- mobile app screen, immediately usable
- no desktop/web landing page composition
- precise spacing, stable cards, readable Chinese text
- images fill their intended containers with correct crop/focal point
- text and controls over images have contrast protection

Negative prompt:
- no compressed multi-screen board
- no fake browser window
- no random illegible labels
- no generic round placeholders as icons
- no tiny centered image inside a large empty container
```

## 4. Asset Manifest Fill-In Prompt

Use this prompt with the visible design plan before writing Figma JS.

```text
Create an asset manifest for the following mobile screen.

Need:
- full-screen reference image row
- clean media rows for every photo, avatar, thumbnail, editor canvas, map, cover, product image, food image, generated result, or illustration
- icon rows for every bottom tab, toolbar icon, action icon, badge, and custom mark
- batch field and state field for every icon row
- text layer rows for every user-facing label
- measured region rows with x/y/w/h, radius, type, target Figma node, and strategy

Rules:
- Every bitmap-media region must have assetId pointing to a clean media asset.
- Standard icons use vector-library source.
- Custom icons use custom-icon-sheet or exact-source-crop source.
- Bitmap-backed icons must point to a real file path and use target nodes named `Bitmap Icon / ...`.
- Vector-backed icons must point to a Figma vector/component target and include stroke/fill and optical-center notes.
- No target node may be vague, such as "image 1" or "card".
- Text boxes must have fixed x/y/w/h, font size, line height, weight, and color.
- The locked reference target must be "Locked Reference / {screen}".
- The editable target must be "Editable Reconstruction / {screen}".
```
