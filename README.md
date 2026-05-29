# AppUIDesign

移动端 App UI 设计 Skill。它的目标不是写一套空泛的“好看 UI”规则，而是让 Codex 在做移动 App 设计图、原型升级、Figma 还原和交付时，先判断行业和任务，再决定页面结构、视觉风格、图片资产、图标方案和可编辑交付方式。

## 当前能力

- **行业判断**：先把用户需求匹配到 UI Notes `/app` 的行业分类，再选择适合这个行业的移动端风格。
- **完整行业覆盖**：覆盖报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐。
- **案例提炼**：设计图和 Figma 输出前，使用 UI Notes `/pin` 提炼功能/组件模式，用美叶灵感集提炼视觉方向，只提炼模式，不照搬截图。
- **原型约束**：用户给原型图、草图、截图或 Figma frame 时，先判断哪些必须保留、哪些可以优化、哪些不能改。
- **标准手机尺寸**：根据原型、平台、行业和输出容器选择手机画布，常用 `393x852 -> 1179x2556`、`430x932 -> 1290x2796`、Android `360x800 -> 1080x2400` 等比例，不把多屏压成小图。
- **设计生产包前置**：最终出图前先锁定手机尺寸、布局蓝图、文字 token、间距/圆角、组件合同、icon 合同、素材合同和 Figma 还原合同，避免先出漂亮扁平图再猜结构。
- **Image-first 视觉稿**：当用户要“设计图 / 高保真 / mockup / 出图”时，优先生成标准手机尺寸的图片稿，而不是只写文字说明。
- **按 Tab 出主页面**：当用户说“设计一个 App”时，底部 Tab 数量决定默认主页面数量；4 个 Tab 默认出 4 个主页面，每页都要有对应 selected 状态。
- **图片资产规划**：英雄图、内容图、头像、商品图、食物图、编辑画布、AI 结果图、空状态插图都要先定义角色和裁切方式。
- **素材包前置**：Figma 前必须准备整屏参考图、无 UI 的干净媒体素材、分批图标素材包或矢量 icon 合同，以及 asset manifest，避免还原时临时找图、换图或出现灰块。
- **Manifest 驱动 Figma**：用 `asset-manifest` 固定素材、节点名、x/y/w/h、圆角、裁切、icon 和文字框，再生成 Figma JS 输入包，减少布局靠猜。
- **截图测量前置**：用户给截图或要求还原 Figma 时，先用 `measure-screenshot.js` 生成尺寸、参考线、区域表、间距、颜色采样和标线图，再开始切素材或写 Figma。
- **Figma audit 验收**：Figma 写完后检查左右对照、`IMAGE` fill、可编辑文字/矢量/bitmap 数量和警告，不能只看图层是否存在。
- **Prompt 模板**：生图时区分 clean media、custom icon sheet、full-screen reference 和 manifest fill-in，不再只写一个整屏风格 prompt。
- **资料刷新**：外部大厂规范和截图库链接有检查脚本与刷新规则，避免引用失效或过期信息。
- **图标管线**：底部 Tab、工具栏、徽标、自定义图标必须有来源方案；Figma 前先按 `navigation / toolbar / business-category / editor-tool / status-badge / brand-custom` 分批生成或定义，不能用圆点假装图标。
- **Figma 1:1 可编辑还原**：整屏图只能做锁定参考；Figma 页面默认左边放原图、右边放同尺寸可编辑还原稿，最终可见 frame 必须由可移动的文字、组件、矢量图标和独立 bitmap crop 组成。
- **组件系统**：重复的底部导航、卡片、按钮、工具栏、指标、编辑器控件、空状态要抽象成组件或组件化分组。
- **状态矩阵**：按行业和页面补齐 loading、empty、error、offline、permission、success、destructive 等状态。
- **多屏一致性**：多屏设计必须统一导航、token、组件、图标语言、图片风格、实体数据和状态文案。
- **交付包**：设计任务应沉淀 README、brief、assets、Figma spec/script/ledger、验证截图和 diff 报告。
- **可执行工具**：提供截图测量脚本、crop 导出脚本、视觉 diff 脚本和 Figma 重建模板，减少每次靠手工重做的误差。

## 适用场景

- “帮我做一个外卖 App 设计图”
- “根据这个原型图做移动端高保真”
- “做一个 AI 修图 App，并放进 Figma”
- “把这张图片 1:1 还原到 Figma，元素要可移动”
- “检查这个移动端设计是不是符合行业风格”
- “把多屏 App 设计稿整理成交付包”

## 核心流程

1. 判断目标平台：iOS、Android、小程序、React Native、Flutter、移动容器 H5 或跨平台。
2. 如果用户给了原型，先做原型约束判断。
3. 判断 UI Notes 行业分类，并说明依据。
4. 补充二级任务模型：交易、内容流、创作编辑、工具查询、习惯养成、预约、社交互动等。
5. 用同业案例和组件模式确定信息架构、页面层级、图片角色、图标语言和状态覆盖。
6. 先定义 Tab-To-Screen Coverage：如果是 4 个底部 Tab，默认生成 4 个主页面；如果某个 Tab 是发布/创建动作，则生成对应页面、弹层或状态。
7. 选择标准手机画布和输出尺寸。
8. 生成最终设计图前先写 design source package：布局、文字、间距、组件、icon、素材、图片 prompt、Figma 分层都要先定。
9. 再写 production brief：screen、asset、icon、state、component、Figma reconstruction、delivery package。
10. 需要视觉稿时，按 design source package 生成标准手机比例图片。
11. 需要 Figma 时，先准备 source asset pack：整屏参考图、干净媒体素材、分批 icon asset pack 或矢量 icon 合同、asset manifest。
12. 对整屏参考图运行 `measure-screenshot.js`，产出 measurement report、overlay、region map 和 scale 记录。
13. 用 `validate-asset-manifest.js` 检查 manifest，再用 `build-figma-packet.js` 生成 Figma JS 输入包。
14. 把图片作为 source of truth：左侧锁定参考图 + 右侧可编辑重建稿 + 独立图片裁切 + 组件系统。
15. 用 crop 脚本导出独立图片素材，用 Figma 模板重建可编辑 frame。
16. 用 `validate-figma-audit.js`、截图、region checklist 和 visual diff 脚本做视觉差异检查，没对齐就不能声称 1:1。

## Figma 交付规则

不能把整张设计图贴进 Figma 就说完成。

正确做法：

- 整屏设计图作为 locked reference。
- Figma 页面左侧是 locked reference，右侧是同尺寸 editable reconstruction。
- 最终 visible frame 是可编辑重建稿，不能把整屏参考图作为最终背景。
- 文案是 Figma text layer。
- 图标是 vector、component、独立 `Bitmap Icon / ...` 节点或源图标裁切；底部 Tab 和工具栏图标要提前从 icon pack/manifest 进入 Figma，不用圆点代替。
- 卡片、按钮、Tab、底部栏、工具栏是 component 或 grouped pattern。
- 人像、食物、产品、编辑画布、生成结果等复杂图片区域，是独立可移动 bitmap crop。
- 每个图片节点要能在 asset manifest 里找到来源，并验证为 `IMAGE` fill，不能保留灰块、渐变占位或替换图。
- 交付前截图对比原始设计图，确认布局、裁切、颜色、层级、间距和移动端 chrome 没有明显偏差。

## 文件结构

```text
.
├── AGENTS.md
├── README.md
├── SKILL.md
├── examples/
│   ├── asset-manifest.example.json
│   ├── crop-spec.example.json
│   ├── figma-audit.example.json
│   └── regions.example.json
├── package.json
├── scripts/
│   ├── build-figma-packet.js
│   ├── check-links.js
│   ├── export-crops.js
│   ├── measure-screenshot.js
│   ├── validate-asset-manifest.js
│   ├── validate-figma-audit.js
│   └── visual-diff.js
├── templates/
│   ├── figma-reconstruction.js
│   └── prompts/
│       └── source-asset-pack.md
└── references/
    ├── industry/
    │   ├── industry-to-pattern-map.md
    │   ├── product-archetypes.md
    │   └── style-decision-guide.md
    ├── research/
    │   ├── mobile-ui-principles.md
    │   ├── platform-image-guidelines.md
    │   ├── source-refresh.md
    │   └── source-map.md
    └── workflow/
        ├── case-library-method.md
        ├── delivery-package.md
        ├── design-production-brief.md
        ├── design-source-package.md
        ├── figma-component-system.md
        ├── figma-reconstruction.md
        ├── figma-script-templates.md
        ├── icon-pipeline.md
        ├── image-crop-spec.md
        ├── multi-screen-consistency.md
        ├── prototype-constraints.md
        ├── prototype-to-visual-design.md
        ├── review-checklist.md
        ├── screen-size-selection.md
        ├── state-matrix.md
        ├── visual-asset-generation.md
        ├── visual-diff-check.md
        └── visual-diff.md
```

## 设计原则

- 移动端优先，不套桌面 Web 或 SaaS landing page 风格。
- 行业任务优先，不用泛化“漂亮 UI”替代产品判断。
- 大厂规范用于判断尺寸、安全区、触控、图片裁切、组件一致性和平台约束，不用于照搬视觉风格。
- 图片要服务核心任务；该 full-bleed、hero 或 cover 的区域不要只放中间小图。
- 生成设计图时就要想清楚后续 Figma 如何分层、裁图、组件化和验证。
- Figma 交付必须可移动、可编辑、可复用，同时尽量保持与源图片一致。
- 自定义图标要先做图标素材包，再进入整屏设计和 Figma；标准图标也要先写入 manifest 的语义、尺寸、状态和目标节点。

## 还可以继续增强

- 增加 3-5 个完整案例包，例如 AI 修图、外卖、健身、财务、宠物社区。
- 给 23 个行业补更细的 benchmark app 清单和常见 screen set。

## 脚本使用

先安装依赖：

```bash
npm install
```

导出图片裁切：

```bash
node scripts/export-crops.js --spec examples/crop-spec.example.json
```

对比源图和 Figma/HTML 截图：

```bash
node scripts/visual-diff.js --reference assets/generated/01-home-reference.png --candidate figma/screenshots/01-home.png --out diff/01-home --regions examples/regions.example.json
```

检查脚本语法：

```bash
npm run check:scripts
```

检查示例 manifest、Figma packet 和 Figma audit：

```bash
npm run check:examples
```

生成 Figma JS 输入包：

```bash
node scripts/build-figma-packet.js --manifest examples/asset-manifest.example.json --out tmp/figma-packet.example.js
```

检查外部资料链接样本：

```bash
npm run check:links:sample
```

发布或刷新资料前检查全量外部链接：

```bash
npm run check:links
```
