# AppUIDesign

移动端 App UI 设计 Skill，用于让 Codex 根据行业、原型、视觉质量、图片资产和 Figma 交付要求，生成更接近真实产品设计流程的移动端设计稿。

## 能力总结

这个 Skill 目前已经覆盖移动 App 设计的主流程：

- **行业判断**：先判断用户需求属于 UI Notes `/app` 的哪个行业，再选择更适合的移动端风格。
- **行业分类**：覆盖报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐。
- **尺寸判断**：遇到原型图、设计图或产品需求时，先匹配适合的手机画布尺寸和 Figma frame，而不是固定套一个尺寸。
- **原型转视觉稿**：用户给原型图、草图、截图或 Figma frame 时，保留信息架构和核心流程，再提升视觉层级、组件质量和移动端可用性。
- **Image-first 设计图**：当用户要“设计图 / 高保真 / 出图 / mockup”时，先生成标准手机比例的竖屏设计图，不用文字说明冒充设计稿。
- **图片资产生成**：需要美食、人物、产品、封面、前后对比、编辑画布、缩略图等素材时，直接生成或整理 bitmap 资产，并明确图片是全屏、hero、卡片图、内容图还是装饰图。
- **Figma 1:1 可编辑还原**：设计图进入 Figma 时，整屏图只能做锁定参考；最终可见 frame 必须由可移动素材组成，包括文字层、矢量图标、组件实例、独立图片裁剪节点。
- **组件化交付**：重复的卡片、按钮、Tab、底部导航、工具栏、指标模块、图表模块要抽象成组件或可复用结构。
- **Figma 脚本模板**：提供手机 frame、组件种子、图片裁剪节点和 layer audit 的 `use_figma` 脚本模板。
- **视觉差异检查**：要求用 source image 和 Figma screenshot 对比尺寸、安全区、图片裁切、颜色、文字层级、组件间距、图标和底部控件。
- **图片裁剪规范**：定义 hero、canvas、thumbnail、avatar、product、food、generated-result、background 等图片角色、命名和 Figma 放置方式。
- **HTML 定位**：HTML 只用于交互预览、响应式检查或前端实现，不作为静态设计稿的默认交付媒介。
- **验收清单**：包含行业适配、移动端触控、视觉素材、Figma 可编辑性、无压缩标准手机尺寸、状态覆盖和无桌面 Web 风格误用。

## 目前还可以继续补充的东西

主干能力已经完整，Figma 模板、视觉差异检查、图片裁剪规范已经补入。下一步更适合补“样例库和自动化执行脚本”，不是继续堆规则：

- **示例库**：补 3-5 个完整案例，例如 AI 修图、外卖、健身、财务、社交，把输入、设计图、Figma 还原要求和验收记录都放进去。
- **可执行裁剪工具**：把图片裁剪规范进一步做成脚本，输入坐标表后自动导出 crop assets。
- **视觉 diff 自动化**：把人工 ledger 升级成局部截图对比和尺寸检查脚本。
- **更多行业 benchmark**：每个行业补常见对标 App 和关键页面模式，方便未来更快判断风格。

## 使用方式

把仓库作为 Codex Skill 使用时，保持 `SKILL.md` 在 Skill 根目录：

```text
AppUIDesign/
├── SKILL.md
├── README.md
├── AGENTS.md
└── references/
```

触发场景：

- “帮我做一个外卖 App 设计图”
- “根据这个原型图做一个移动端高保真”
- “把这个设计图 1:1 还原到 Figma，里面元素要可移动”
- “做一个 AI 修图 App，并输出 Figma”
- “检查这个移动端设计是否符合行业风格”

## 核心工作流

1. **判断行业**：先输出 UI Notes 行业分类和依据。
2. **确定任务模型**：交易、内容流、创作编辑、工具查询、习惯养成、预约、社交互动等。
3. **选择移动端风格**：按行业决定信任感、内容密度、图片角色、动效强度和商业动作。
4. **生成标准手机设计图**：每个 screen 单独输出标准竖屏，不压缩成小拼图。
5. **整理图片资产**：明确哪些图是 full-bleed、hero、卡片图、内容图或独立裁剪素材。
6. **选择屏幕尺寸**：按用户原型、iOS/Android/小程序/H5 容器、产品类型和图片主次关系匹配手机画布。
7. **Figma 组件化还原**：锁定原图只做参考，最终可见稿用可移动图层、组件和独立 bitmap crop 重建。
8. **视觉差异检查**：截图对比源设计图和 Figma frame，记录 drift 并修正。
9. **验收**：检查行业适配、移动端可用性、图片填充、Figma 可编辑性和 1:1 视觉一致性。

## Figma 交付铁律

不能把整张设计图贴进 Figma 就说完成。

正确做法：

- 整屏设计图作为 locked reference。
- 最终 visible frame 是可编辑重建稿。
- 文案是 Figma text layer。
- 图标是 vector 或 component。
- 卡片、按钮、Tab、底部栏、工具栏是 component 或 grouped pattern。
- 人像、食物、产品、编辑画布、生成结果等复杂图片区域，是独立可移动 bitmap crop。
- 交付前截图对比原始设计图，确认布局、裁切、颜色、层级、间距和移动端 chrome 没有明显漂移。

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
        ├── figma-script-templates.md
        ├── image-crop-spec.md
        ├── prototype-to-visual-design.md
        ├── review-checklist.md
        ├── screen-size-selection.md
        ├── visual-diff-check.md
        └── visual-asset-generation.md
```

## 设计原则

- 移动端优先，不套桌面 Web 或 SaaS landing page 风格。
- 行业任务优先，不用泛化“漂亮 UI”替代产品判断。
- 图片要服务核心任务，能撑满容器就不要小图居中。
- 高保真设计图必须选择适合产品和平台的标准手机比例，不能压缩、拼小、糊字。
- Figma 交付必须可移动、可编辑、可复用，同时保持视觉 1:1。
