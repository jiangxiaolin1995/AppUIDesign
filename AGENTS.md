# AppUIDesign

## 架构

```text
AppUIDesign/
├── AGENTS.md
├── README.md
├── SKILL.md
└── references/
    ├── industry/
    ├── research/
    └── workflow/
```

## 职责

- `SKILL.md`：Skill 入口，定义移动 App UI 设计的触发条件、主流程、输出要求和 Figma 交付规则。
- `README.md`：面向 GitHub 的能力说明、安装使用、缺口判断和文件结构。
- `references/industry/`：行业分类、风格决策、页面/组件模式映射。
- `references/research/`：外部设计规范、平台原则、图片规范和资料来源。
- `references/workflow/`：原型约束、生产 brief、图片生成、图标管线、组件系统、Figma 重建、视觉差异检查、状态矩阵、多屏一致性、交付包和验收清单。
- `scripts/`：可执行辅助工具，目前包括图片裁切导出和视觉 diff。
- `templates/`：可复制的 Figma JS 重建模板。
- `examples/`：脚本输入示例，例如 crop spec 和 diff region spec。

## 决策

仓库根目录即 Skill 根目录，`SKILL.md` 必须保持在根上。参考资料按研究、行业、流程三类拆分，避免单层目录过载。大厂规范只作为尺寸、密度、组件一致性、图片裁切和平台约束的判断来源，不作为视觉风格照搬对象。设计图、高保真和 Figma 输出前必须做 UI Notes Pin + 美叶灵感集的模式提炼。

Figma 输出默认要求可编辑且尽量 1:1：整屏图只能做参考，最终稿必须由可移动素材、独立 bitmap crop、矢量图标、文本层和组件组成，并通过视觉差异检查。不能用圆点代替正式图标。生成图片时就要同步规划 Figma 分层、图标来源、图片裁切、组件边界、状态矩阵和交付包。

重复性工作优先沉淀为脚本或模板：图片裁切使用 `scripts/export-crops.js`，视觉差异检查使用 `scripts/visual-diff.js`，Figma 可编辑重建从 `templates/figma-reconstruction.js` 开始，再保存项目自己的 `figma/figma-build-script.js`。

## 变更日志

- 2026-05-26：初始化 GitHub 发布版，整理移动 App UI 设计能力、README 和分层参考资料。
- 2026-05-26：补充 Figma 脚本模板、视觉差异检查、图片裁剪规范和平台/大厂图片规范索引。
- 2026-05-26：补充屏幕尺寸选择规则，明确平台/大厂资料用于匹配合适尺寸和约束，而不是照搬风格。
- 2026-05-26：将 UI Notes Pin + 美叶灵感集升级为设计图/Figma 前的强制案例提炼步骤。
- 2026-05-27：同步组件系统、原型约束、状态矩阵、多屏一致性、交付包、图标管线和更详细的 Figma 1:1 可编辑重建规则。
- 2026-05-27：补充可执行 crop 导出脚本、visual diff 脚本、Figma reconstruction 模板和对应示例输入。
