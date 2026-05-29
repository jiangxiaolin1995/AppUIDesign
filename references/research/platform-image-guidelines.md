# Platform And Company Image Guidelines

Use this file when deciding how mobile app images, crops, visual assets, and screen-size constraints should behave. These sources are not visual templates to copy. Use them to infer platform constraints, density expectations, component consistency, and image behavior.

## Apple

Sources:

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [UI Design Dos and Don'ts](https://developer.apple.com/design/tips/)

Rules to apply:

- Respect safe areas and system chrome.
- Keep touch targets at least `44x44pt` on iOS and iPadOS.
- Provide high-resolution image assets for Retina displays.
- Preserve image aspect ratio; never distort photos or generated results.
- Avoid edge crowding and overlapping controls.

## Android / Material

Sources:

- [Android mobile UI design](https://developer.android.com/design/ui/mobile)
- [Adapt layouts](https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout)
- [Android accessibility and touch target guidance](https://developer.android.com/guide/topics/ui/accessibility/apps?hl=en)
- [Material accessibility](https://m2.material.io/design/usability/accessibility.html)
- [minimumInteractiveComponentSize](https://developer.android.com/reference/kotlin/androidx/compose/material3/minimumInteractiveComponentSize.modifier)

Rules to apply:

- Treat adaptive layout as the default: handset, foldable, tablet, and multi-window contexts matter.
- Reserve at least `48x48dp` touch targets for interactive elements.
- Use flexible grids and images that respond to available space.
- Separate decorative images from functional images in accessibility notes.
- Do not stretch content full width on larger surfaces without constraints.

## Tencent / WeChat

Sources:

- [TDesign](https://tdesign.tencent.com/)
- [TDesign Mobile Vue](https://tdesign.tencent.com/mobile-vue/)
- [TDesign Mobile React](https://tdesign.tencent.com/mobile-react/)
- [WeUI](https://github.com/Tencent/weui)
- [WeUI demo](https://weui.io/)

Rules to apply:

- Prefer consistent cross-stack components and design tokens.
- For mini-program/H5-in-mobile flows, use familiar cells, uploaders, action sheets, dialogs, toasts, and form rows.
- Keep image upload and preview patterns explicit; permissions, failure, and progress states must be designed.
- Avoid custom novelty that fights WeChat-like familiarity when the target is a super-app container.

## Alibaba / Ant

Sources:

- [Ant Design Mobile](https://mobile.ant.design/zh)
- [Ant Design values](https://4x-ant-design.antgroup.com/docs/spec/values)
- [Alibaba Design](https://www.alibabadesign.com/)

Rules to apply:

- Use mobile-native component vocabulary: tabs, swipers, lists, cards, image components, pull-to-refresh, floating panels.
- Keep business-product interaction certain and predictable.
- Use imagery to clarify business value, not to decorate unrelated space.
- Preserve component consistency across H5, native-like screens, and mini-program contexts.

## Meituan

Sources:

- [移动端UI一致性解决方案](https://tech.meituan.com/2020/11/26/consistency-in-ui-design.html)
- [美团移动端动态化实践](https://tech.meituan.com/2019/12/19/meituan-mrn-practice.html)

Rules to apply:

- Standardize colors, icons, components, and real-data filling to reduce UI drift.
- Food/retail/service images should support fast scanning and transactions.
- Component libraries and design-to-code mapping matter in high-volume mobile businesses.
- Image regions must be reusable assets, not one-off flattened screenshots.

## JD.com

Sources:

- [JD Retail Design Language](https://jdrdl.jd.com/Home.html)
- [JD Retail operation color](https://jdrdl.jd.com/Design-Operation-color.html)
- [NutUI](https://nutui.jd.com/)
- [JD mini-program standard design deck](https://www.w3.org/2021/03/miniapp-cjk/slides/standard-design-jd.pdf)

Rules to apply:

- Retail images must be clear, bright, and useful for quick product judgment.
- Promotions can be dense, but product photos, price, title, and CTA must remain separable.
- H5 and mini-program delivery needs component consistency across platforms.
- For commerce, every image crop should serve recognition, comparison, trust, or conversion.

## Cross-Company Synthesis

- Use platform standards for safe areas, touch targets, and accessibility.
- Use company systems for component consistency, business density, and cross-platform delivery.
- Choose the phone canvas by matching target platform, product type, source prototype, and delivery container. Do not copy the visual style of Apple, Tencent, Alibaba, Meituan, or JD unless the user explicitly asks for that brand direction.
- Keep bitmap regions independently movable in Figma.
- Preserve the approved crop and focal point before chasing full vector editability.
- Reject any design handoff where beautiful imagery only exists inside a flattened screenshot.
