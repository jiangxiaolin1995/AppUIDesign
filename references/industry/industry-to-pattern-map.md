# Industry To Pattern Map

Use this file after selecting a UI Notes `/app` industry. It maps each industry to UI Notes `/pin` function and component categories to inspect before designing. The terms below intentionally mirror the public UI Notes Pin taxonomy where possible.

## Common Baseline For Every Industry

- Core functions: launch, onboarding, registration/login, user authorization, home, search entry, search page, result page, settings, help/feedback, loading, empty state, error recovery.
- Core components: top navigation, bottom navigation or tabs, toolbar, filter/sort, buttons, forms, inputs, dialogs, bottom sheets, toast/snackbar, lists, cards.
- Always cover: permission denied, offline/poor network, empty data, loading, submission failure, success, disabled state, dark mode when relevant.

## Industry Mapping

| UI Notes industry | App-level benchmark focus | UI Notes Pin functions to inspect | Components to inspect | Must-cover states |
| --- | --- | --- | --- | --- |
| 报刊杂志 | Issue structure, reading flow, subscription | home, article detail, recommendation, book/article list, membership unlock, history/favorites | tabs, lists, cards, top navigation, bottom sheet | paywall, offline downloads, reading progress |
| 财务 | Trust, amounts, security, confirmation | wallet/income-expense, payment, verification, result page, data statistics, help/feedback | forms, inputs, dialogs, buttons, progress, charts/cards | risk warning, failed payment, receipt, security lock |
| 参考 | Search-first lookup and saved entries | search entry, search page, search result, article/detail, history/favorites, explanation page | search, lists, tags, cards, tabs | no result, offline dictionary/data, copy/share success |
| 导航 | Map/list switching and real-time guidance | map, search result, location/authorization, result page, timeline, help/feedback | bottom sheet, toolbar, filters, floating button | GPS denied, reroute, offline map, arrival |
| 工具 | One-job completion and export/share | camera/scan, edit, delete, result page, share, settings, loading | primary/secondary buttons, sliders, switches, segmented controls, toolbar | permission denied, undo, export failure, history empty |
| 购物 | Browse to buy and after-sales | category, search, product detail, cart, coupons, payment, orders, review/rating | product cards, filters, bottom sheet, sticky actions, dialogs | out of stock, payment failed, refund/return, address missing |
| 健康健美 | Session start, progress, reminders | check-in, task center, data statistics, timeline, membership center, notifications | progress, cards, sliders, calendar, switches | missed goal, device sync failed, privacy notice |
| 教育 | Lesson continuation and feedback | steps, task center, result page, ranking, membership unlock, explanation page | progress, cards, tabs, forms, buttons | wrong answer, retry, download/offline, locked lesson |
| 旅游 | Search, booking, itinerary, support | search result, map, orders, coupons, payment, timeline, help/feedback | date/calendar, filters, cards, bottom sheet | sold out, rule change, cancellation, itinerary update |
| 美食佳饮 | Menu, customization, delivery status | store, product detail, cart, coupons, payment, orders, review/rating | lists, cards, bottom sheet, forms, sticky actions | unavailable item, delivery delay, modifier required |
| 商务 | Triage, records, approvals, sync | home, data statistics, search result, edit, notifications, result page | lists, forms, filters, dialogs, progress | offline queue, approval failed, validation error |
| 社交 | Identity, feed, chat, safety | feed/home, user homepage, chat, comments, follow, likes/favorites, post/create, report/help | cards, composer, tabs, bottom nav, dialogs | failed send, privacy state, blocked/reported, empty feed |
| 摄影与录像 | Canvas, editing tools, export | camera/scan, edit image, edit video, post/create, share, loading | toolbar, sliders, bottom tool trays, segmented controls | permission denied, undo, export progress/failure |
| 生活 | Mixed daily services and personalization | category, recommendation, detail, favorites, notifications, themes, settings | grids, cards, filters, bottom sheets, switches | personalization empty, permission denied, service unavailable |
| 体育 | Live scores, teams, rankings, schedules | ranking, timeline, video/detail, notifications, data statistics, follow | lists, tabs, cards, tables, video controls | live delay, timezone, score correction, alert setting |
| 天气 | Forecast, alerts, saved locations | home, map, widgets, notifications, data statistics, result page | cards, charts, map layers, switches | location denied, severe alert, stale data, unit change |
| 图书 | Library, reader/player, notes | book list, book detail, audio playback, history/favorites, membership unlock | lists, cards, toolbar, progress, sliders | download failed, reading sync, paywall, bookmark saved |
| 图形和设计 | Templates, canvas, asset editing | edit image, post/create, share, membership unlock, loading | grids, toolbar, sliders, bottom sheets, cards | export failed, asset missing, undo/redo, permission denied |
| 效率 | Capture, organize, search, reminders | home, edit, search, timeline, notifications, settings, empty state | forms, lists, tabs, calendar, switches | sync conflict, draft saved, empty project, reminder permission |
| 新闻 | Headline scan, live updates, alerts | home, article detail, recommendation, video detail, notifications, comments | lists, cards, tabs, top nav, media controls | breaking alert, paywall, source label, saved/offline |
| 医疗 | Appointment, intake, records, consent | verification, orders/appointments, forms, payment, help/feedback, result page | forms, steps, dialogs, uploaders, cards | identity failed, emergency boundary, privacy consent, appointment changed |
| 音乐 | Playback, discovery, library | audio playback, audio list, recommendation, favorites, membership unlock, downloads | player controls, lists, cards, sliders, bottom nav | offline playback, subscription lock, queue empty |
| 娱乐 | Media feed, player, reactions, subscription | video list, video detail, live, comments, likes/favorites, ranking, membership center | media cards, player controls, bottom nav, dialogs | autoplay control, age/content warning, paywall, report |

## How To Apply

1. Pick the primary industry row.
2. Add rows for secondary industries only if the app truly combines daily tasks.
3. Convert the selected functions into a screen inventory.
4. Convert selected components into a component/state matrix.
5. Design missing edge states before visual polish.
