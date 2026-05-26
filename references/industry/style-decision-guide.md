# Mobile Style Decision Guide

Use this file after inferring the UI Notes industry category. It turns the industry decision into mobile visual style choices: density, color posture, imagery, layout rhythm, motion, and component emphasis.

## Style Dimensions

- Trust level: how explicit, calm, and reversible the interface must feel.
- Information density: how much content can be shown before scanning breaks.
- Media richness: how much imagery, video, illustration, or artwork should lead the page.
- Task focus: whether the screen should feel like a tool, feed, reader, player, storefront, map, or form.
- Motion intensity: whether motion should be nearly invisible, state-explaining, or expressive.
- Brand voice: whether the product should feel restrained, warm, energetic, premium, playful, editorial, or utilitarian.

## Default Rules

- High-trust categories get semantic color, explicit copy, plain confirmation, and restrained motion.
- Utility categories get fast entry, low ornament, strong status feedback, and compact controls.
- Media and entertainment categories can be immersive, but controls must remain readable over unpredictable content.
- Commerce and booking categories can be dense, but price, availability, rules, and primary action must stay dominant.
- Creation categories keep canvas/workspace first; tool chrome must not overpower the work.
- Content reading categories protect typography, reading continuity, source clarity, and saved/offline states.

## Industry Style Matrix

| UI Notes industry | Style posture | Density | Color/material | Imagery/media | Motion | Component emphasis |
| --- | --- | --- | --- | --- | --- | --- |
| 报刊杂志 | Editorial, calm, reading-first | Medium | Neutral base, strong typography contrast | Covers and article images can lead section entry | Subtle page/reading transitions | Article lists, section tabs, reader toolbar, subscription states |
| 财务 | Trustworthy, precise, restrained | Medium-high for data, low for actions | Semantic colors, conservative accents, strong contrast | Use charts and icons more than decoration | Minimal; explain confirmation and success | Amounts, secure forms, confirmation sheets, receipts, charts |
| 参考 | Search-first, clear, utilitarian | High if hierarchy is strong | Neutral, low-noise, highlight search terms | Minimal; diagrams only when useful | Minimal | Search, result lists, tabs, copy/share controls, favorites |
| 导航 | Map-first, glanceable, high contrast | Low chrome, high map information | Location/status colors, strong overlay contrast | Map is primary media | State and route transitions only | Map canvas, bottom sheets, route cards, floating controls |
| 工具 | Fast, practical, low ornament | Low-medium | Plain surfaces, one clear accent | Minimal unless tool output is visual | Fast feedback for action/result | Primary action, segmented modes, status, undo/export |
| 购物 | Rich, commercial, comparison-friendly | Medium-high | Promotional accents with disciplined semantic roles | Product images lead cards/details | Microfeedback for cart/pay/status | Product cards, filters, price badges, sticky buy/cart |
| 健康健美 | Motivating, reassuring, personal | Medium | Fresh but not alarmist; accessible status colors | Human/activity imagery when it supports motivation | Progress and session feedback | Progress cards, charts, timers, reminders, privacy |
| 教育 | Encouraging, focused, friendly | Medium | Warm accents, clear success/error roles | Illustration can support lessons, not replace content | Feedback/reward motion in moderation | Lesson cards, progress, quiz controls, retry states |
| 旅游 | Aspirational but rule-clear | Medium | Open, airy, destination-friendly accents | Destination imagery can lead discovery | Smooth transitions for search/booking | Date pickers, filters, map/list, itinerary, booking states |
| 美食佳饮 | Appetizing, fast, local | Medium-high | Warm food-friendly accents; price/status semantic | Food photos are important but must not hide price | Cart/order status feedback | Menu lists, modifiers, sticky cart, coupons, delivery status |
| 商务 | Utilitarian, calm, work-focused | High if scannable | Neutral, semantic status colors, low decoration | Minimal; icons and charts over photos | Minimal | Lists, forms, filters, approvals, sync/offline status |
| 社交 | Identity-forward, responsive, safe | Medium | Brand/personality accents, strong privacy/status cues | Avatars and user media lead | Responsive feedback for reactions/messages | Feed cards, composer, chat, comments, safety controls |
| 摄影与录像 | Canvas-first, immersive, precise | Low chrome around canvas | Dark or neutral editing surfaces; tool accent sparingly | Captured media is primary | Preview/compare/export feedback | Canvas, tool trays, sliders, timeline, permissions |
| 生活 | Approachable, flexible, service-led | Medium | Friendly neutrals, moderate brand warmth | Cards/images depend on service type | Light feedback for booking/status | Category grids, cards, filters, reminders, personalization |
| 体育 | Energetic, live, data-forward | Medium-high | Team/status colors with readable contrast | Highlights/video can support live data | Live update and score transitions | Live score cards, rankings, timelines, notification toggles |
| 天气 | Atmospheric, glanceable, alert-first | Medium | Weather-based color is fine; alerts override mood | Atmosphere can enrich but numbers stay readable | Gentle condition changes, urgent alerts | Forecast cards, charts, maps, alert banners, widgets |
| 图书 | Quiet, library/reader-first | Medium in library, low in reader | Warm or neutral reading surfaces | Covers support browsing; reader stays text-first | Subtle progress/turn feedback | Shelves, reader toolbar, font/theme, bookmarks |
| 图形和设计 | Creative, workspace-first | Medium around workspace | Neutral canvas chrome, expressive templates | Templates/assets lead discovery | Preview/export feedback | Canvas, asset grid, layers, property controls, undo/export |
| 效率 | Calm, efficient, capture-first | Medium-high if organized | Neutral, focused accents, clear status | Minimal | Quick feedback for capture/sync/reminders | Quick add, lists, calendar, tags, search, sync |
| 新闻 | Immediate, credible, source-clear | Medium-high | Neutral editorial base, urgent alert accents | News images/video support hierarchy | Minimal except live/breaking states | Headline lists, source labels, alerts, saved/offline |
| 医疗 | Calm, accessible, highly trustworthy | Medium-low for forms/actions | Clinical neutrals, strong semantic alerts | Minimal, supportive only | Minimal; clarify progress and confirmation | Step forms, verification, consent, appointment/record cards |
| 音乐 | Immersive, media-led, controllable | Medium | Artwork-driven surfaces with reliable control contrast | Album art and visualizers can lead | Playback transitions can be expressive | Mini/full player, queue, library, downloads, lyrics |
| 娱乐 | Rich, immersive, discovery-led | Medium | High-contrast media overlays, clear monetization/status | Video/live/media lead | More expressive, but not at cost of control | Player, feed/cards, comments, ranking, subscription prompts |

## Cross-Industry Conflict Rules

- If finance or medical is involved in a high-risk action, their trust style overrides entertainment, social, or commerce styling for that flow.
- If a creation app has social/community features, keep the editor canvas style for editing screens and switch to social feed style only in discovery/community screens.
- If a shopping app includes content feeds, keep product price, seller trust, cart, and after-sales visible before feed engagement controls.
- If a travel or food app uses maps, map legibility and location state override promotional imagery.
- If a productivity or business app adds collaboration, keep work-task density and status clarity before chat/social warmth.

## Style Output Template

When style guidance is needed, include:

- Inferred industry and evidence.
- Style posture in one phrase.
- Density level and why.
- Color/material rules.
- Typography and layout rhythm.
- Imagery/media rules.
- Motion and feedback rules.
- Components that should visually dominate.
- Style risks to avoid.
