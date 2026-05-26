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
- `references/workflow/`：原型转视觉、屏幕尺寸选择、图片生成、Figma 脚本模板、视觉差异检查、图片裁剪、案例研究、验收清单。

## 决策

仓库根目录即 Skill 根目录，`SKILL.md` 必须保持在根上。参考资料按研究、行业、流程三类拆分，避免单层目录过载。大厂规范只作为尺寸、密度、组件一致性、图片裁切和平台约束的判断来源，不作为视觉风格照搬对象。Figma 输出默认要求 1:1 且可编辑：整屏图只能做参考，最终稿必须由可移动素材、独立 bitmap crop 和组件组成，并通过视觉差异检查。

## 变更日志

- 2026-05-26：初始化 GitHub 发布版，整理移动 App UI 设计能力、README 和分层参考资料。
- 2026-05-26：补充 Figma 脚本模板、视觉差异检查、图片裁剪规范和平台/大厂图片规范索引。
- 2026-05-26：补充屏幕尺寸选择规则，明确平台/大厂资料用于匹配合适尺寸和约束，而不是照搬风格。
