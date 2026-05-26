# Mobile Industry Archetypes

Use this file to choose the right mobile app design direction from the UI Notes App Library industry taxonomy. Start with the industry category, then add a secondary task model when the product crosses categories.

Primary source taxonomy: UI Notes `/app` industry filters: 报刊杂志、财务、参考、导航、工具、购物、健康健美、教育、旅游、美食佳饮、商务、社交、摄影与录像、生活、体育、天气、图书、图形和设计、效率、新闻、医疗、音乐、娱乐.

## How To Use

1. Infer the primary industry from the user's product description, even if the user does not name an industry.
2. Use the user's main daily task as the deciding signal: what the user opens the app to do most often.
3. Match the app to one primary industry below, then choose the style that fits that industry's task weight, trust level, and content density.
4. Add secondary task models only when needed: transaction, content feed, creation/editing, social exchange, utility lookup, habit loop, booking, or high-trust data entry.
5. Design the first version around the primary industry workflow. Do not copy a popular app from another industry just because it looks polished.
6. For cross-industry products, pick the industry that owns the user's main daily task, then borrow supporting patterns from the secondary industry.

## Industry Inference Rules

- If the product revolves around money, assets, insurance, lending, payment, or accounting, classify it as 财务 even when it also has charts or education content.
- If the product revolves around diagnosis, care, hospital visits, medication, medical records, or clinical advice, classify it as 医疗; if it is general wellness or workouts, use 健康健美.
- If the product revolves around buying goods, use 购物; if the purchase is prepared food, restaurant discovery, or delivery, use 美食佳饮; if it is trips, stays, tickets, or itinerary planning, use 旅游.
- If the product revolves around creating or editing visual media, classify it as 摄影与录像 or 图形和设计 depending on whether the primary object is captured media or designed assets.
- If the product revolves around quick lookup or one-off conversion/scanning/calculation, use 工具 or 参考: 工具 for doing, 参考 for looking up knowledge.
- If the product revolves around recurring organization, planning, notes, tasks, calendar, or documents, use 效率.
- If the product revolves around people, profiles, messaging, following, or sharing, use 社交, then add secondary models for content feed, music, travel, or commerce if needed.
- If two industries are plausible, choose the one that controls the home screen and primary navigation. Record the other as a secondary task model or adjacent benchmark.

## 1. 报刊杂志 / Newspapers And Magazines

- Use for periodical reading, magazine subscriptions, columns, editions, and curated long-form content.
- Core tasks: browse issues, read articles, save, share, subscribe, continue reading, manage downloads.
- IA/pages: Today or latest issue, categories, article detail, saved, search, subscription, profile/settings.
- Components: article lists, cover cards, section tabs, reading toolbar, font controls, bookmarks, download status.
- Visual posture: editorial, calm, image-led when content is visual; prioritize typography rhythm and reading comfort.
- Avoid: noisy feed mechanics, cramped article pages, hidden reading controls, aggressive subscription prompts before value is shown.

## 2. 财务 / Finance

- Use for banking, wallet, payment, insurance, loans, investment, accounting, and personal finance.
- Core tasks: check balance, inspect transactions, transfer/pay, confirm risk, receive receipts, recover from errors.
- IA/pages: Account overview, asset/detail, transaction history, transfer/payment, confirmation, receipt, security, support.
- Components: number typography, account selectors, secure inputs, risk notices, confirmation sheets, receipts, charts.
- Visual posture: trustworthy, restrained, precise; make amounts, fees, limits, and status impossible to misunderstand.
- Avoid: ambiguous CTA copy, color-only profit/loss, hidden fees, playful visuals on high-risk actions.

## 3. 参考 / Reference

- Use for dictionaries, encyclopedias, translation, lookup tools, catalogs, documentation, and knowledge bases.
- Core tasks: search, scan results, compare entries, save, copy/share, continue recent lookup.
- IA/pages: Search-first home, result list, entry detail, categories, history, favorites, settings.
- Components: search bars, result snippets, tabs, definition cards, copy buttons, pronunciation/audio, offline indicators.
- Visual posture: clear and information-dense; keep chrome minimal so lookup is fast.
- Avoid: discovery feeds that bury search, long onboarding, decorative cards that reduce scanning speed.

## 4. 导航 / Navigation

- Use for maps, routes, transit, driving, walking, location discovery, and location status.
- Core tasks: locate self, search places, compare routes, start navigation, monitor ETA, recover from GPS/network issues.
- IA/pages: Map home, place search, route options, active navigation, place detail, saved places, settings.
- Components: map canvas, bottom sheets, route cards, permission rationale, live status, offline/error banners.
- Visual posture: map-first, high contrast, glanceable; controls must work while moving.
- Avoid: tiny controls near map gestures, decorative overlays that block routes, unclear permission fallbacks.

## 5. 工具 / Tools

- Use for scanners, calculators, converters, timers, file tools, utilities, device helpers, and single-purpose apps.
- Core tasks: open fast, perform one job, see status, undo/retry, export/share, return later without losing state.
- IA/pages: Tool home, action workspace, history/recent, export/share, settings, help.
- Components: primary action buttons, mode segmented controls, bottom sheets, status indicators, undo/redo, permission prompts.
- Visual posture: practical and low-noise; brand should not slow task completion.
- Avoid: marketing-style first screens, hidden gestures for core actions, over-broad feature menus.

## 6. 购物 / Shopping

- Use for ecommerce, retail, marketplace, product discovery, coupons, cart, and after-sales.
- Core tasks: search/browse, filter, compare, inspect detail, add to cart, pay, track order, refund/support.
- IA/pages: Home, search/results, category, product detail, cart, checkout, payment, order detail, after-sales.
- Components: product cards, filters/sort, price/promo badges, sticky buy/cart bar, reviews, coupons, order status.
- Visual posture: rich but disciplined; commerce density is acceptable when hierarchy protects price, trust, and action.
- Avoid: promotion noise that hides price, inconsistent cards, dark patterns around coupons or cancellation.

## 7. 健康健美 / Health And Fitness

- Use for exercise, wellness, habit tracking, nutrition, sleep, meditation, body metrics, and activity communities.
- Core tasks: start session, log data, view progress, understand trends, set goals, receive reminders, protect privacy.
- IA/pages: Today, activity/session, plan, progress, insights, community/share if relevant, profile/settings.
- Components: progress rings, charts, timers, large session controls, reminders, privacy controls, wearable sync status.
- Visual posture: motivating and reassuring; use energy without making health data feel punitive.
- Avoid: alarmist visuals, red/green-only status, overloaded dashboards, claims without context.

## 8. 教育 / Education

- Use for courses, language learning, exam prep, tutoring, learning communities, and practice apps.
- Core tasks: continue lesson, practice, receive feedback, review mistakes, track progress, download/offline study.
- IA/pages: Learn/home, course outline, lesson, practice, review, progress, search, profile/settings.
- Components: lesson cards, progress bars, quiz controls, feedback states, streaks, bookmarks, downloads.
- Visual posture: encouraging and focused; friendly style is fine, but learning outcome stays central.
- Avoid: dense course tables, excessive gamification, unclear next lesson, punitive failure states.

## 9. 旅游 / Travel

- Use for trip planning, booking, itineraries, hotels, flights, guides, tickets, and travel communities.
- Core tasks: search destination, compare options, book, manage itinerary, navigate during trip, handle changes/refunds.
- IA/pages: Search/home, destination detail, results/filter, booking detail, checkout, itinerary, map, support.
- Components: date pickers, guest selectors, filters, map/list switch, itinerary cards, booking status, support entry.
- Visual posture: aspirational but task-led; imagery helps discovery, but dates, price, rules, and status must stay clear.
- Avoid: hiding fees/rules, weak cancellation visibility, map clutter, beautiful cards that obscure availability.

## 10. 美食佳饮 / Food And Drink

- Use for food delivery, restaurants, recipes, ordering, reservations, cafes, and cooking apps.
- Core tasks: find food/place, inspect menu/detail, customize, order/book, pay, track, review/reorder.
- IA/pages: Home/location, restaurant/menu, item detail, cart, checkout, order tracking, favorites, support.
- Components: location selector, menu lists, modifiers, sticky cart, delivery status, coupons, ratings, reorder.
- Visual posture: appetizing and fast; images help, but price, delivery time, availability, and customization must be obvious.
- Avoid: hidden fees, confusing modifiers, weak allergy/diet notes, overdecorated tracking screens.

## 11. 商务 / Business

- Use for CRM, admin, operations, merchant tools, analytics, approvals, and work management on mobile.
- Core tasks: triage, review records, approve, update status, contact, capture data, sync offline.
- IA/pages: Dashboard, tasks/inbox, record detail, create/edit, analytics, notifications, account/settings.
- Components: lists, status chips, forms, filters, charts, approval dialogs, offline sync, audit trails.
- Visual posture: utilitarian and calm; density is useful when scan hierarchy is strong.
- Avoid: desktop tables squeezed onto phone, decorative dashboards, burying daily actions under configuration.

## 12. 社交 / Social

- Use for messaging, relationship graphs, communities, profiles, sharing, followers, and social discovery.
- Core tasks: discover people/content, post, chat, comment, react, follow, manage privacy, report/block.
- IA/pages: Feed, discover/search, post/create, messages, notifications, profile, settings/safety.
- Components: feed cards, composer, avatars, reactions, comments, chat input, privacy controls, report flows.
- Visual posture: identity-forward and responsive; interaction speed and trust/safety matter as much as aesthetics.
- Avoid: hiding safety tools, ambiguous privacy states, heavy frames around every post, engagement dark patterns.

## 13. 摄影与录像 / Photo And Video

- Use for camera, photo editing, video editing, albums, filters, recording, publishing, and media management.
- Core tasks: capture/import, edit, preview, undo, save draft, export/share, manage permissions.
- IA/pages: Camera/import, editor canvas, tool tray, preview, export, drafts/library, settings.
- Components: canvas, bottom toolbars, mode switchers, sliders, timeline, permission prompts, export progress.
- Visual posture: canvas-first; controls should be contextual, compact, and labeled when icons are not obvious.
- Avoid: shrinking the canvas with permanent panels, destructive edits without undo, unclear export failure states.

## 14. 生活 / Lifestyle

- Use for daily-life services, home, personal interests, local discovery, relationships, pets, hobbies, and mixed utilities.
- Core tasks: browse recommendations, manage personal data, book/order/save, track status, configure preferences.
- IA/pages: Home, category/discover, detail, action/booking/order if relevant, favorites, profile/settings.
- Components: cards, category grids, filters, detail pages, status cards, reminders, personalization controls.
- Visual posture: approachable and flexible; choose calm utility or richer editorial style based on task weight.
- Avoid: vague lifestyle feeds without user control, too many entry points, unclear primary action.

## 15. 体育 / Sports

- Use for scores, teams, fitness sports communities, events, tickets, fantasy sports, and training content.
- Core tasks: check live scores, follow teams, view schedules, watch highlights, track stats, join events.
- IA/pages: Today/live, leagues/teams, match detail, standings, media, notifications, profile/settings.
- Components: live score cards, timelines, tables, team filters, video cards, notification toggles, rankings.
- Visual posture: energetic and data-forward; live state and time sensitivity need strong hierarchy.
- Avoid: stale live states, tiny stat tables, unclear timezone/schedule, autoplay that blocks score checking.

## 16. 天气 / Weather

- Use for weather forecasts, severe alerts, air quality, radar, and planning around conditions.
- Core tasks: check now, scan forecast, understand alerts, compare locations, view radar/details.
- IA/pages: Current location, hourly/daily forecast, radar/map, alerts, saved locations, settings.
- Components: forecast cards, charts, alert banners, location switcher, map layers, widgets, permission states.
- Visual posture: glanceable and atmospheric; visual richness is fine when numbers and alerts stay readable.
- Avoid: burying severe alerts, ambiguous units, low-contrast overlays, permission dead ends.

## 17. 图书 / Books

- Use for ebook reading, audiobooks, libraries, book discovery, notes, highlights, and reading communities.
- Core tasks: find book, read/listen, continue, bookmark, annotate, manage library, sync progress.
- IA/pages: Library, discover/search, book detail, reader/player, notes/highlights, downloads, settings.
- Components: shelves, book cards, reader toolbar, font/theme controls, progress, bookmarks, audio controls.
- Visual posture: reading-first and quiet; let typography, spacing, and continuation carry the experience.
- Avoid: intrusive recommendations inside reading, hard-to-find reading settings, losing progress across devices.

## 18. 图形和设计 / Graphics And Design

- Use for design creation, templates, image generation, poster/social assets, layout tools, and visual editing.
- Core tasks: choose template, edit canvas, adjust elements, manage assets, preview, export/share.
- IA/pages: Template/discover, canvas editor, asset picker, layers/properties, preview, export, projects.
- Components: canvas, tool trays, property panels, layer controls, asset grids, undo/redo, export progress.
- Visual posture: creative but tool-first; keep the working area dominant and make modes explicit.
- Avoid: overdecorated template browsing, hidden layer controls, unlabeled advanced tools, export uncertainty.

## 19. 效率 / Productivity

- Use for notes, tasks, calendars, documents, planning, collaboration, and personal organization.
- Core tasks: capture quickly, organize, search, remind, collaborate, sync, recover drafts/offline changes.
- IA/pages: Inbox/today, create/edit, lists/projects, calendar/search, detail, notifications, settings.
- Components: quick-add, checklists, calendars, tags, filters, search, sync status, empty states, reminders.
- Visual posture: calm and efficient; reduce friction more than decoration.
- Avoid: desktop project-management density, deep nesting on phone, unclear sync/conflict states.

## 20. 新闻 / News

- Use for breaking news, topic feeds, alerts, live updates, video news, and personalized briefings.
- Core tasks: scan headlines, read, follow topics, watch/live, save/share, manage alerts and trust sources.
- IA/pages: Top stories, topics, article detail, live, video, saved, notifications, settings.
- Components: headline lists, topic tabs, article pages, live badges, source labels, alert controls, paywall states.
- Visual posture: immediate and credible; speed and source clarity beat decorative editorial polish.
- Avoid: mixing ads and news without labeling, sensational hierarchy, notification overload, buried source context.

## 21. 医疗 / Medical

- Use for appointments, hospitals, telehealth, prescriptions, records, symptom intake, and clinical workflows.
- Core tasks: book appointment, verify identity, submit health data, consult, view records, pay, follow instructions.
- IA/pages: Home/care options, appointments, doctor/hospital detail, intake forms, consultation, records, payments, support.
- Components: step flows, secure forms, identity verification, document upload, appointment cards, alerts, consent screens.
- Visual posture: calm, accessible, highly trustworthy; language must be plain and consequences explicit.
- Avoid: vague medical claims, inaccessible forms, hidden privacy controls, unclear emergency boundaries.

## 22. 音乐 / Music

- Use for streaming, playlists, discovery, audio communities, radio, podcasts when music-led, and playback control.
- Core tasks: play, search, discover, save, manage playlists, control queue, download, switch devices.
- IA/pages: Home/discover, search, library, player, playlist/album detail, queue, downloads, settings.
- Components: mini player, full player, media cards, playlist lists, sliders, queue, lyrics, offline/download status.
- Visual posture: immersive and media-led; album art and motion can enrich, but controls must remain reliable.
- Avoid: hiding playback controls, confusing shuffle/repeat state, low-contrast text over artwork.

## 23. 娱乐 / Entertainment

- Use for video, live, games-adjacent content, events, fandom, streaming, short-form entertainment, and leisure discovery.
- Core tasks: discover, watch/play, follow, react, comment, save, subscribe, manage history and recommendations.
- IA/pages: Home/feed, categories, detail/player, comments, following, downloads/history, profile/settings.
- Components: media cards, player controls, follow/reaction buttons, comments, rankings, recommendations, subscription prompts.
- Visual posture: rich and immersive; prioritize media, but keep navigation and recovery visible.
- Avoid: infinite entertainment without user agency, illegible overlays, intrusive monetization, unclear content controls.

## Secondary Task Models

- Transaction: add search/filter, detail, confirmation, payment, receipt, order/support states.
- Content feed: add source/creator cues, save/share, comments, recommendations, moderation/reporting.
- Creation/editing: add canvas/workspace, tool modes, undo/redo, drafts, export failure recovery.
- Social exchange: add identity, privacy, notifications, blocking/reporting, message/comment states.
- Utility lookup: add search-first entry, recents, favorites, offline/error states.
- Habit loop: add today view, progress, reminders, streaks, recovery from missed days.
- Booking: add date/time selectors, availability, rules, cancellation, itinerary/status.
- High-trust data entry: add verification, review, consent, privacy, audit trail, support.

## Style Selection Rule

When unsure, choose the industry that owns the user's most frequent task. Then use the secondary task model to tune page structure and components. Finance and medical should bias trustworthy and explicit; tools, reference, navigation, weather, and productivity should bias fast and low-noise; shopping, food, travel, entertainment, music, and photo/video can be richer, but only after the task path is clear.
