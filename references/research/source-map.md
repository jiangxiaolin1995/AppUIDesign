# Mobile UI Source Map

Use this file as the research base for mobile app UI design work. Prefer official documentation and primary company materials; mark sources that are case studies rather than normative guidelines.

## Global Platform Sources

### Apple

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
- Designing for iOS: https://developer.apple.com/design/human-interface-guidelines/designing-for-ios
- Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- Layout: https://developer.apple.com/design/human-interface-guidelines/layout
- Navigation and search: https://developer.apple.com/design/human-interface-guidelines/navigation-and-search

Use for native iOS expectations: hierarchy, harmony with system UI, Dynamic Type, control sizing, familiar navigation, system materials, safe areas, gestures, and accessibility behavior.

### Google / Android / Material

- Android mobile UI design: https://developer.android.com/design/ui/mobile
- Android adaptive mobile layout: https://developer.android.com/design/ui/mobile/guides/layout-and-content/adapt-layout
- Android touch target size: https://support.google.com/accessibility/android/answer/7101858
- Material Design 3: https://m3.material.io/
- Material accessibility: https://m2.material.io/design/usability/accessibility.html
- Material 3 minimum interactive component size: https://developer.android.com/reference/kotlin/androidx/compose/material3/minimumInteractiveComponentSize.modifier
- Material bottom navigation: https://m2.material.io/components/bottom-navigation/ios
- Android window size classes: https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes

Use for Android app foundations: Material components, adaptive layouts, compact/medium/expanded classes, dynamic color/theming, predictable navigation, `48x48dp` touch targets, and accessibility.

### Meta / Facebook

- Origami Studio: https://origami.design/
- Introducing Origami Live: https://engineering.fb.com/2015/02/24/ios/introducing-origami-live/
- Facebook iOS app architecture: https://engineering.fb.com/2023/02/06/ios/facebook-ios-app-architecture/

Use as case-study material, not as a public canonical design guideline. Extract process lessons: prototype on real devices, validate gesture-heavy interactions, optimize dense social feeds for limited space, and keep large-scale mobile systems modular.

### Slack

- Slack app design: https://docs.slack.dev/surfaces/app-design/
- Re-designing Slack on Mobile: https://slack.design/articles/re-designing-slack-on-mobile/

Use for productivity/chat mobile style: short sessions, catch-up behavior, small-screen information architecture, empathy for mobile-only users, notification triage, and collaboration density without clutter.

### Discord

- Discord Social SDK branding guidelines: https://docs.discord.com/developers/discord-social-sdk/design-guidelines/branding-guidelines
- Discord direct messages guidelines: https://docs.discord.com/developers/discord-social-sdk/design-guidelines/direct-messages
- Discord mobile Activities guide: https://docs.discord.com/developers/activities/development-guides/mobile

Use for community/chat product patterns: identity, presence, direct messages, app-integrated social surfaces, contrast-aware branded buttons, and mobile performance constraints.

### Reddit

- Reddit developer guidelines: https://developers.reddit.com/docs/guidelines
- Reddit engineering note on iOS design system: https://www.reddit.com/r/RedditEng/comments/16rxnx4/building_reddits_design_system_on_ios/
- Reddit engineering note on Android design system: https://www.reddit.com/r/RedditEng/comments/13oxmqa/building_reddits_design_system_for_android_with/
- Reddit design system story: https://www.reddit.com/r/RedditEng/comments/17kxwri/from_chaos_to_cohesion_reddits_design_system_story/

Use for community/feed/comment systems. Reddit engineering posts are useful primary team notes, but because they are Reddit posts, recheck current status before treating specific details as durable.

### TikTok / Douyin

- TikTok creative guidelines: https://ads.tiktok.com/help/article/creative-guidelines-for-tiktok-out-of-phone
- Douyin open platform operation rules: https://partner.open-douyin.com/docs/resource/zh-CN/developer/operation-norm/operation-standard

Use as product-style reference for mobile-first video/feed surfaces: authentic content, captions/sound-off support, strong creator identity, high-contrast overlays, and clear safety/policy constraints. These are not full app UI guidelines.

### Spotify

- Reimagining Design Systems at Spotify: https://spotify.design/article/reimagining-design-systems-at-spotify
- Can I get an Encore? Spotify's Design System, Three Years On: https://spotify.design/article/can-i-get-an-encore-spotifys-design-system-three-years-on

Use as case-study material for large-scale mobile product systems. Key lesson: a single monolithic design system may not fit every platform; Spotify uses a family-of-systems model, with local systems tailored to platforms such as iOS and Android while inheriting shared foundations.

### Adobe

- Spectrum, Adobe's design system: https://spectrum.adobe.com/
- Spectrum introduction for developers: https://developer.adobe.com/project-firefly/docs/resources/spectrum-intro/lesson1/

Use for cross-product cohesion, accessible component guidance, UI kits, open-source implementations, and design language consistency across mobile Adobe products.

### GitHub

- Primer design system: https://primer.github.io/design/
- Primer organization: https://github.com/primer
- Primer design docs source: https://github.com/primer/design

Use for pragmatic, code-first design systems: design tokens, accessibility, content patterns, responsive design, native/mobile documentation, and strong design-engineering alignment.

### Microsoft

- Fluent 2 layout: https://fluent2.microsoft.design/layout
- Fluent 2 accessibility: https://fluent2.microsoft.design/accessibility
- Windows touch target guidance: https://learn.microsoft.com/windows/apps/design/input/guidelines-for-targeting

Use for inclusive, cross-platform enterprise-product thinking: hierarchy, spacing, responsive reflow, WCAG contrast, focus order, keyboard/screen-reader behavior, and semantic specs.

### Salesforce

- Lightning Design System guidelines: https://spring-20.lightningdesignsystem.com/guidelines/overview
- Mobile-ready Lightning Web Components: https://developer.salesforce.com/docs/platform/lwc/guide/mobile
- Salesforce Mobile and Offline Developer Guide: https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/mobile_offline.pdf

Use for enterprise mobile workflows, mobile-ready components, offline constraints, accessibility, clarity, efficiency, consistency, and component-based governance.

### Shopify

- Polaris 101: https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/getting-started/polaris-101
- Polaris color: https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/design/colors
- Shopify design principles archive summary: https://principles.design/examples/shopify-principles

Use for merchant/admin product thinking: empower without overwhelming, cohesive experience, purposeful polish, semantic color, and embedded app consistency. Treat mobile as part of responsive/admin ecosystem rather than a native-app-specific guideline.

### Atlassian

- Atlassian design overview: https://www.atlassian.com/agile/design
- Atlassian content design: https://design-system-docs-proxy.services.atlassian.com/get-started/content-design/
- Atlassian inclusive language: https://design-system-docs-proxy.services.atlassian.com/foundations/content/language-and-grammar

Use for team-scale design systems, content design, inclusive language, consistent product-family experiences, and design collaboration with developers/product owners.

### Uber

- Base design system overview: https://www.uiguideline.com/systems/base
- Base Web repository: https://github.com/uber/baseweb

Use as a large marketplace/logistics product-system reference. Public access to Uber Base documentation may be partial or mirrored, so verify availability before treating a detail as canonical.

### IBM

- Carbon Design System: https://carbondesignsystem.com/
- IBM Design Language: https://www.ibm.com/design/language/

Use for enterprise-grade accessibility, structured foundations, data-heavy workflows, component maturity, and design language governance. More useful for mobile enterprise products than consumer-native visual style.

### Pinterest

- Gestalt design system: https://gestalt.pinterest.systems/
- Gestalt GitHub: https://github.com/pinterest/gestalt

Use for visual discovery, masonry/feed-like content systems, mobile sheets, side navigation, responsive components, and image-heavy product patterns. Check the current public docs before relying on component specifics.

### Samsung

- One UI overview: https://developer.samsung.com/one-ui/index.html
- One UI grid system: https://developer.samsung.com/one-ui/layout/grid.html
- One UI design guide PDF: https://design.samsung.com/global/contents/one-ui/download/oneui_design_guide_eng.pdf

Use for large-phone ergonomics, viewing area versus interaction area, foldables, large screens, dark mode, readability, and responsive device adaptation.

### Huawei / HarmonyOS

- HarmonyOS NEXT application planning: https://developer.huawei.com/consumer/cn/app/planning/
- HarmonyOS overview: https://www.harmonyos.com/en/

Use for multi-device and HarmonyOS-specific planning, especially if the target app must support Huawei/HarmonyOS ecosystems. Recheck current developer design URLs because HarmonyOS documentation paths change.

## China / Asia Product-System Sources

### Alibaba / Ant Group

- Ant Design Mobile: https://mobile.ant.design/zh/
- Ant Design values: https://4x-ant-design.antgroup.com/docs/spec/values
- Ant Design FAQ pointing mobile work to Ant Design Mobile: https://ant.design/docs/react/faq-cn/
- Alibaba Design: https://www.alibabadesign.com/

Use for mobile componentization, business-product consistency, natural/certain/meaningful/growing values, modular design, feedback, restrained visual expression, and Ant ecosystem patterns.

### Tencent / WeChat

- TDesign: https://tdesign.tencent.com/
- TDesign mobile Vue: https://tdesign.tencent.com/mobile-vue/
- TDesign mobile React: https://tdesign.tencent.com/mobile-react/
- Tencent WeUI: https://github.com/Tencent/weui
- WeUI demo: https://weui.io/

Use for super-app, mini-program, and H5-in-mobile patterns: cells, action sheets, dialogs, toasts, uploaders, form rows, fast service entry, WeChat-like familiarity, design tokens, dark mode, and multi-stack consistency.

### ByteDance

- Semi Design introduction: https://semi.design/en-US/start/introduction
- Semi Design resources: https://semi.design/en-US/advanced/design-source
- Arco Design Mobile React: https://arco.design/mobile/react
- Arco Design Mobile components: https://arco.design/mobile/react/arco-design/mobile/

Use for high-throughput enterprise/product systems: high-quality defaults, modern lightweight style, theme customization, internationalization, design-to-code, component coverage, and mobile component libraries.

### Meituan

- Mobile UI consistency solution: https://tech.meituan.com/2020/11/26/consistency-in-ui-design.html
- Meituan mobile RN practice: https://tech.meituan.com/2019/12/19/meituan-mrn-practice.html
- Meituan financial front-end system with mobile component library notes: https://tech.meituan.com/2018/03/16/front-end-web-architecture.html

Use for large-business mobile consistency: standard color palettes, icon libraries, component libraries, design-to-code mapping, real-data filling, typography templates, cross-platform delivery, and governance.

### JD.com

- JD Retail Design Language: https://jdrdl.jd.com/Home.html
- JD Retail operation color: https://jdrdl.jd.com/Design-Operation-color.html
- NutUI mobile component library: https://nutui.jd.com/
- JD mini-program cross-platform standard design deck: https://www.w3.org/2021/03/miniapp-cjk/slides/standard-design-jd.pdf

Use for retail/e-commerce mobile flows, H5 and mini-program consistency, visual commerce, promotion-heavy layouts, and cross-platform component delivery.

### Xiaomi

- Xiaomi HyperOS widget design guidelines: https://dev.mi.com/xiaomihyperos/documentation/detail?pId=1664
- Xiaomi app market interaction design suggestions: https://dev.mi.com/docs/appsmarket/technical_docs/interactive_design/
- MIUI overview archive: https://www.miui.com/zt/miui8/about.html

Use for OS-level mobile ecosystem constraints, widgets, accessibility, Android ecosystem adaptation, and manufacturer-specific expectations. Treat older MIUI pages as historical style/product context.

### Youzan / Vant

- Vant mobile UI components: https://vant-ui.github.io/vant/
- Vant GitHub: https://github.com/youzan/vant

Use for H5 and commerce-service UI patterns inside mobile contexts, especially WeChat ecosystem flows, forms, cells, popups, pickers, tabs, and lightweight mobile components.

## Mobile Case Libraries

### UI Notes App Library

- UI Notes App Library: https://uinotes.com/app

Use as a mobile app benchmark source. The public page currently shows `408` real app screenshot sets and exposes app-level browsing by company and industry, including Alibaba, Tencent, ByteDance, Meituan, Apple, JD, Baidu, Xiaomi, NetEase, Kuaishou, tools, shopping, social, productivity, finance, education, travel, lifestyle, photography/video, music, entertainment, medical, health, and other app categories. Treat it as case-study material, not a normative design guideline.

### UI Notes Pin Library

- UI Notes Pin Library: https://uinotes.com/pin

Use as a function and component pattern source. The public page currently shows `156120` screenshots and exposes screenshot taxonomy for onboarding, login, search, home, content detail, chat, comments, posting, payment, membership, empty states, loading, settings, tabs, top/bottom navigation, dialogs, bottom sheets, buttons, forms, lists, cards, grids, calendars, and related mobile components. Full browsing may require login.

### Meiye Screenshot

- Meiye Screenshot: https://www.meiye.art/Screenshot
- Meiye mobile app channel: https://www.meiye.art/Screenshot/23

Use as an app-discovery and category-breadth source. Public pages expose mobile app categories including AI, transportation, meditation, Google apps, photo/video editing, ecommerce, habit building, fitness, food delivery, reading, notes/planning, social/communication, finance, healthcare, live/video, news, music/entertainment, tickets, tools, education, real estate/rental, sports, interest communities, travel/hotel, and food/health. Ignore the web screenshot channel unless the user asks for web design.

### Meiye Inspiration Album

- Meiye Inspiration Album: https://www.meiye.art/InspirationAlbum

Use as a mobile visual-category inspiration source. Public pages expose APP albums and mobile function/style albums such as home, profile, launch, onboarding, privacy agreement, permissions, login, search, empty state, publish, share, filter, comments, image detail, form, chat, map, membership, finance home, image/video editing, food delivery, shopping cart, healthcare, education, news, fitness, social, travel, ecommerce, dark mode, cards, and data visualization. Treat it as pattern inspiration, not a screenshot-copy source.

## Research Gaps To Recheck

- Meta/Facebook does not appear to publish a current general-purpose mobile UI design guideline comparable to Apple HIG or Material. Treat public Meta material as product/process evidence.
- Some domestic design systems publish rich component docs but fewer explicit mobile UX principles. When needed, infer from their component coverage and official design-system values.
- Airbnb, Didi, Baidu, and several consumer-app leaders have influential mobile products but limited public canonical UI guideline docs. Use official engineering/design blog posts or public product observation only as case studies, not as hard rules.
- Some public references are mirrors, archives, PDFs, or third-party summaries. Keep them below official company docs in priority.
- This skill is mobile-first. Ignore desktop website aesthetics unless a source provides mobile-native, native-app, mini-program, or H5-in-mobile guidance that applies to the user request.
- Always re-open sources before using dated platform facts, especially Apple iOS design changes, Material updates, and current component library versions.
