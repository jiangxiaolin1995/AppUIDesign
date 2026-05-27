# AppUIDesign

移动端 App UI 设计 Skill。它的目标不是写一套空泛的“好看 UI”规则，而是让 Codex 在做移动 App 设计图、原型升级、Figma 还原和交付时，先判断行业和任务，再决定页面结构、视觉风格、图片资产、图标方案和可编辑交付方式。

## 当前能力

- **行业判断**：先把用户需求匹配到 UI Notes `/app` 的行业分类，再选择适合这个行业的移动端风格。
- **完整行业覆盖**：覆盖报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐。
- **案例提炼**：设计图和 Figma 输出前，使用 UI Notes `/pin` 提炼功能/组件模式，用美叶灵感集提炼视觉方向，只提炼模式，不照搬截图。
- **原型约束**：用户给原型图、草图、截图或 Figma frame 时，先判断哪些必须保留、哪些可以优化、哪些不能改。
- **标准手机尺寸**：根据原型、平台、行业和输出容器选择手机画布，常用 `393x852 -> 1179x2556`、`430x932 -> 1290x2796`、Android `360x800 -> 1080x2400` 等比例，不把多屏压成小图。
- **Image-first 视觉稿**：当用户要“设计图 / 高保真 / mockup / 出图”时，优先生成标准手机尺寸的图片稿，而不是只写文字说明。
- **图片资产规划**：英雄图、内容图、头像、商品图、食物图、编辑画布、AI 结果图、空状态插图都要先定义角色和裁切方式。
- **图标管线**：底部 Tab、工具栏、徽标、自定义图标必须有来源方案，不能用圆点假装图标。
- **Figma 1:1 可编辑还原**：整屏图只能做锁定参考；最终可见 frame 必须由可移动的文字、组件、矢量图标和独立 bitmap crop 组成。
- **组件系统**：重复的底部导航、卡片、按钮、工具栏、指标、编辑器控件、空状态要抽象成组件或组件化分组。
- **状态矩阵**：按行业和页面补齐 loading、empty、error、offline、permission、success、destructive 等状态。
- **多屏一致性**：多屏设计必须统一导航、token、组件、图标语言、图片风格、实体数据和状态文案。
- **交付包**：设计任务应沉淀 README、brief、assets、Figma spec/script/ledger、验证截图和 diff 报告。

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
6. 选择标准手机画布和输出尺寸。
7. 生成设计图前先写 production brief：screen、asset、icon、state、component、Figma reconstruction、delivery package。
8. 需要视觉稿时先生成标准手机比例图片。
9. 需要 Figma 时，把图片作为 source of truth：锁定参考图 + 可编辑重建稿 + 独立图片裁切 + 组件系统。
10. 用截图和 region checklist 做视觉差异检查，没对齐就不能声称 1:1。

## Figma 交付规则

不能把整张设计图贴进 Figma 就说完成。

正确做法：

- 整屏设计图作为 locked reference。
- 最终 visible frame 是可编辑重建稿。
- 文案是 Figma text layer。
- 图标是 vector、component 或源图标裁切，不用圆点代替。
- 卡片、按钮、Tab、底部栏、工具栏是 component 或 grouped pattern。
- 人像、食物、产品、编辑画布、生成结果等复杂图片区域，是独立可移动 bitmap crop。
- 交付前截图对比原始设计图，确认布局、裁切、颜色、层级、间距和移动端 chrome 没有明显偏差。

## 文件结构

```text
.
├── AGENTS.md
├── README.md
├── SKILL.md
└── references/
    ├── industry/
    │   ├── industry-to-pattern-map.md
    │   ├── product-archetypes.md
    │   └── style-decision-guide.md
    ├── research/
    │   ├── mobile-ui-principles.md
    │   ├── platform-image-guidelines.md
    │   └── source-map.md
    └── workflow/
        ├── case-library-method.md
        ├── delivery-package.md
        ├── design-production-brief.md
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
        └── visual-diff.md
```

## 设计原则

- 移动端优先，不套桌面 Web 或 SaaS landing page 风格。
- 行业任务优先，不用泛化“漂亮 UI”替代产品判断。
- 大厂规范用于判断尺寸、安全区、触控、图片裁切、组件一致性和平台约束，不用于照搬视觉风格。
- 图片要服务核心任务；该 full-bleed、hero 或 cover 的区域不要只放中间小图。
- 生成设计图时就要想清楚后续 Figma 如何分层、裁图、组件化和验证。
- Figma 交付必须可移动、可编辑、可复用，同时尽量保持与源图片一致。

## 还可以继续增强

- 增加 3-5 个完整案例包，例如 AI 修图、外卖、健身、财务、宠物社区。
- 把 crop 坐标表做成自动导出脚本。
- 把视觉 diff 从人工清单升级成自动截图对比。
- 给 23 个行业补更细的 benchmark app 清单和常见 screen set。
