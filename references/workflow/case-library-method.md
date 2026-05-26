# Mobile Case Library Method

Use this file when a mobile app design task should learn from real products, screenshot libraries, or competitor references. Start from the UI Notes `/app` industry category, then inspect UI Notes `/pin` function/component patterns. The goal is to extract reusable patterns and product judgment, not to copy screenshots, assets, layouts, or proprietary visual details.

## Source Coverage

### UI Notes App Library

- URL: https://uinotes.com/app
- Public positioning observed: app library with `408` real app screenshot sets and ongoing updates.
- Useful filters observed: company and industry.
- Company filters observed: Alibaba, iQiyi, Baidu, JD, Kuaishou, Meituan, Apple, Tencent, NetEase, Xiaomi, ByteDance, and others.
- Industry filters observed: finance, reference, navigation, tools, shopping, health and fitness, education, travel, food and drink, business, social, photography and video, lifestyle, sports, weather, books, graphics and design, productivity, news, medical, music, and entertainment.

Use this source to choose industry-level app benchmarks: overall product structure, onboarding depth, navigation model, tab organization, account/profile patterns, and category-specific visual posture.

### UI Notes Pin Library

- URL: https://uinotes.com/pin
- Public positioning observed: screenshot library with `156120` screenshots, function search, component search, keyword search, and OCR search.
- Function taxonomy observed:
  - Onboarding and guidance: launch, onboarding, permissions, registration/login, feature education, icon, red dot, share, category, steps, tile areas, service-entry grids.
  - Content: home, discovery, recommendation, topic/community, feeds, media lists, detail pages, live, articles, books, audio, image detail, video list/detail.
  - Operations: search entry, search page, search result, edit, photo/scan, image editing, video editing, delete.
  - Display: dark mode, tags, emoji/stickers, badges, maps, QR codes, profile center, user homepage, result pages, history/favorites, rankings, timeline, data statistics, widgets.
  - Interaction: follow, chat, rating/reviews, comments, notifications/messages, likes/favorites, posting/publishing, virtual characters.
  - Transaction: orders, cart, member unlock, membership center, store, wallet/income-expense, mall, product detail, coupons, payment.
  - Campaigns: banner, check-in, task center, invite friends, operations campaign.
  - Support: help/feedback, about, loading, empty states, verification, settings, explanation pages, pull-to-refresh, themes.
- Component taxonomy observed:
  - Navigation: tabs, see more, bottom navigation, top navigation, segmented control, toolbar, filter/sort.
  - Popups: snackbar, toast, side sheet, dialog, bottom sheet, popover, dropdown.
  - Controls: buttons, forms, stepper, radio/checkbox, slider, switch, input, floating button, expand/collapse, primary/secondary buttons.
  - Display: horizontal cards, progress bar, card, list, waterfall, date/calendar, hero image plus content, grid.

Use this source to benchmark a specific screen or state: login, search, empty state, pay, membership, comments, posting, filter, map, chat, loading, or settings.

### Meiye Screenshot

- URL: https://www.meiye.art/Screenshot
- Mobile app channel observed: https://www.meiye.art/Screenshot/23
- Web channel observed: `/Screenshot/85`; ignore it for this skill unless the user explicitly asks for web.
- App categories observed: AI, travel and transportation, yoga/meditation, Google apps, photo/video editing, ecommerce, habit building, fitness, food delivery, audio/reading, notes/planning, social/communication, finance, healthcare, live/video, news, music/entertainment, tickets, tools, education, real estate/rental, sports, interest communities, travel/hotel, and food/health.

Use this source for app discovery, category breadth, recent visual examples, and product-positioning cues across consumer app types.

### Meiye Inspiration Album

- URL: https://www.meiye.art/InspirationAlbum
- Public categories observed: APP, web, operations, poster, illustration, logo, typography, packaging, icon, and others.
- APP inspiration categories observed: general pages, popups, cards, membership, operations UI, music, social, finance, image/video, ecommerce, food delivery, sports, education, news, transportation, travel, reading, live/video, healthcare, smart life, automotive, and other mobile categories.
- Function albums observed: home, profile, App Store promo, loading animation, launch/splash, onboarding, privacy agreement, permissions, login/register, search, empty state, publish/create, share, filters, comments, image detail, status prompt, form, message list, category selection, bottom popup, settings, chat, map, calendar, identity verification, membership center, finance home, image/video editing, food delivery, shopping cart, healthcare, education, news, fitness, social messaging, travel, ecommerce, dark mode, and data visualization.

Use this source for visual-category cues: mood, density, card rhythm, media treatment, dark/light tone, and category-specific composition. Do not copy exact artwork, screenshots, or brand layouts.

## Access Limits

- Public pages can expose categories, metadata, and some examples.
- Full screenshot browsing on some libraries may require login. If login is unavailable, state the limitation and use the public taxonomy plus accessible pages only.
- Do not imply that a private screenshot set was reviewed unless it was actually accessible.
- Do not copy proprietary screenshots, artwork, brand assets, or exact page compositions into a deliverable.

## Case Research Workflow

1. Define the UI Notes industry and task weight.
   - Industry: 报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐.
   - Task weight: quick utility, repeat habit, high-trust transaction, long-form consumption, creation/editing, social exchange, or service fulfillment.
2. Build a benchmark set.
   - Choose 3-5 app-level benchmarks from the same UI Notes industry or a clearly adjacent industry.
   - Include at least one platform-native reference when designing for iOS or Android.
   - Include one contrast reference from a different style if the product direction is unclear.
3. Build a function matrix.
   - List the required screens and states: onboarding, login, home, search, detail, creation, transaction, profile, settings, empty, loading, error, offline, permission denied, success.
   - For each screen, inspect relevant function/component categories rather than browsing randomly.
4. Extract patterns at four levels.
   - Information architecture: tab model, stack depth, entry points, search/filter placement, account/service boundaries.
   - Interaction: gestures, sheets, dialogs, forms, feedback, keyboard behavior, permission flow, undo/recovery.
   - Components: cards, lists, grids, tabs, segmented controls, buttons, input rows, bottom sheets, toast/snackbar, empty states.
   - Visual language: density, typography rhythm, icon weight, color role, imagery, motion style, dark mode.
5. Decide what to keep, adapt, or reject.
   - Keep patterns that match user intent and platform conventions.
   - Adapt patterns that fit the product category but not the target platform or brand.
   - Reject patterns that rely on growth tricks, clutter, misleading hierarchy, inaccessible contrast, or desktop-style density.
6. Convert findings into a spec.
   - Produce a screen inventory, navigation map, component inventory, state list, token notes, and open risks.
   - Cite the source category or benchmark type, not copied visuals.

## Mandatory Pre-Design Synthesis

Run this before producing high-fidelity design images, visual mockups, or Figma output.

1. **UI Notes Pin pass**: choose function/component categories for the requested flow.
   - AI retouch example: image/video editing, photo/scan, dark mode, slider, toolbar, bottom sheet, export, loading, permission denied.
   - Food delivery example: food delivery, search, filter, restaurant detail, cart, coupons, payment, order status, empty states.
   - Fitness example: health/fitness, data statistics, timeline, progress bar, cards, check-in, reminders.
2. **Meiye Inspiration pass**: choose visual albums that match the industry and screen mood.
   - AI retouch example: image/video, dark mode, cards, general pages.
   - Food delivery example: food delivery, ecommerce, cards, operations UI.
   - Fitness example: sports, healthcare, data visualization, cards.
3. **Pattern extraction**:
   - IA: entry points, tabs, stack depth, core action placement.
   - Components: card/list/grid, toolbar, bottom nav, bottom sheet, slider, forms, dialogs.
   - Imagery: hero/canvas/thumbnail/background role and crop behavior.
   - Visual rhythm: density, typography, dark/light tone, icon weight, spacing.
   - State coverage: loading, empty, error, permissions, success, export/payment/order states.
4. **Design filter**:
   - Keep what matches the user's industry and platform.
   - Adapt what matches the task but needs a different size, density, or brand tone.
   - Reject copied compositions, proprietary assets, growth tricks, inaccessible contrast, and web/desktop visual habits.

If live access is blocked, use the known taxonomy above and say the pass is taxonomy-based rather than screenshot-reviewed.

## Product-Style Reading Guide

- Finance and medical: trust, confirmation, risk/privacy disclosure, secure forms, exact error recovery.
- Shopping, food and drink, and travel: search/filter, detail pages, transaction, order/booking status, after-sales/support.
- Social, entertainment, music, news, newspapers/magazines, and books: feed or library structure, identity/source cues, reading/playback continuity, recommendations, moderation where relevant.
- Tools, productivity, reference, navigation, and weather: fast entry, clear state, low-noise controls, offline/permission handling.
- Photo/video and graphics/design: canvas priority, tool discoverability, undo/redo, export states, media permissions.
- Health and fitness, education, sports, lifestyle, and business: progress, routines, reminders, data clarity, role/task fit, and safe recovery.

## Output Template

When case research is needed, include:

- Benchmark scope: UI Notes industry category, target platform, and 3-5 reference types.
- UI Notes Pin categories selected and why.
- Meiye Inspiration Album categories selected and why.
- Function matrix: screens/states being researched.
- Pattern extraction: IA, interaction, components, visual language.
- Design decision: keep/adapt/reject notes.
- Implementation spec: screens, components, states, tokens, accessibility, and handoff risks.
