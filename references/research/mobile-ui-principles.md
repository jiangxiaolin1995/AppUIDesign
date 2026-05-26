# Mobile UI Principles

This is a synthesis layer built from large-company mobile design guidance. Use it to create practical mobile app specs without copying any one company's visual style.

## 1. Platform Familiarity

- iOS should feel native in navigation, modal behavior, system permissions, text scaling, safe-area usage, and destructive actions.
- Android should use Material/Android patterns for navigation, adaptive layouts, edge-to-edge content, back behavior, dynamic color where appropriate, and component states.
- Cross-platform apps should share product logic, brand tokens, and content hierarchy, but adapt navigation, controls, gestures, and system affordances per platform.
- Mini programs and H5 surfaces inside mobile containers should bias toward familiar host-platform patterns: cell lists, action sheets, toasts, simple forms, fast entry, and low-friction completion.
- Do not import desktop or website style by default. If a source is primarily an admin design system, use it for governance, tokens, content, and accessibility only; redesign the actual surface for mobile.

## 2. Product-Type Fit

- Tools should be direct, quiet, stateful, and quick to complete.
- Social/chat should make conversation, identity, presence, media, safety, and notification control feel native.
- Communities should emphasize scanning, contribution, comments, moderation, and trust.
- Algorithmic feeds should prioritize media, creator identity, captions, fast feedback, and user agency.
- Commerce should support search, comparison, promotion, trust, payment, delivery, and after-sales without hiding critical decision data.
- Local-service apps should foreground location, ETA, price, availability, status, support, and cancellation.
- Finance and health apps should be conservative, legible, explicit, and accessible.
- Creator tools should keep the canvas primary and tools contextual.
- Enterprise field apps should prioritize offline behavior, repeat workflows, large targets, and error recovery.

## 3. Information Architecture

- Start with user goals, not screens. Each screen needs one primary job and a clear next action.
- Use bottom navigation only for stable top-level destinations; keep it short and persistent.
- Use tabs for peer content sections inside a destination, not for global app structure.
- Keep deep hierarchy visible through titles, back behavior, breadcrumbs only when appropriate, and persistent context.
- Avoid landing-page thinking inside apps; the first screen should be usable, not promotional.

## 4. Layout And Ergonomics

- Design for thumb reach on tall phones. Put frequent, safe actions low; keep destructive or rare actions separated.
- Respect safe areas, status bars, camera cutouts, home indicators, fold hinges, and host-app chrome.
- Use stable spacing scales and grid logic instead of one-off values.
- Preserve enough horizontal margin for curved edges and accidental-grip zones; Samsung One UI uses this as an explicit large-screen concern.
- For larger screens, add structure or panes instead of simply stretching phone layouts.

## 5. Touch And Input

- Default touch target floors: iOS `44x44pt`; Android `48x48dp`; H5/mobile hybrid surfaces should usually meet the larger practical target when possible.
- Expand hit areas with invisible padding when the visible icon is smaller.
- Avoid placing adjacent small targets too close together, especially in toolbars, rows, media controls, and dense cards.
- Forms should bring up the right keyboard, preserve context while editing, expose validation near the field, and provide an obvious way to dismiss or proceed.
- Gesture shortcuts need visible alternatives. Core actions cannot rely only on swipe, long-press, multi-finger gestures, or hidden drag behavior.

## 6. Components

- Build from a small canonical inventory first: navigation bar, tab bar, app bar, list/cell, button, input, picker, sheet, dialog, toast, empty state, loading state, error state, uploader/media picker, search, and segmented control.
- Specify every component's enabled, pressed, loading, disabled, selected, error, and destructive states.
- Dialogs interrupt; sheets collect contextual choices; toasts confirm lightweight status; inline messages explain recoverable errors.
- Use system-provided components where platform fidelity matters more than brand expression.

## 7. Visual System

- Typography must stay readable under dynamic type or user font-size changes.
- Color roles should be semantic: primary, surface, background, text, secondary text, border, success, warning, danger, info, disabled.
- Do not convey status through color alone; pair color with text, icon, shape, or position.
- Dark mode is not simple inversion. Check contrast, elevation, borders, imagery, charts, and disabled states separately.
- Icons should be familiar, visually balanced, labeled when ambiguous, and consistent in stroke/fill style.
- Style should follow product intent: calm for utility/finance/health, expressive for creator/content/community, information-rich but disciplined for commerce/local service.

## 8. Motion, Haptics, And Feedback

- Use motion to preserve continuity: navigation transitions, sheet presentation, loading progress, state changes, and drag interactions.
- Keep mobile motion short and interruptible. Avoid animation that delays task completion.
- Pair important audio cues with visual or haptic alternatives.
- Provide immediate feedback after taps, submissions, destructive actions, and permission requests.

## 9. Accessibility

- Check minimum contrast with WCAG AA as a baseline where applicable.
- Support large text without clipping, overlap, or loss of critical actions.
- Define labels, roles, values, and hints for controls that are icon-only, custom, or stateful.
- Design focus order for keyboard, switch control, remote, and screen-reader users.
- Ensure empty/error/offline states explain what happened and what the user can do next.

## 10. Performance And Perceived Quality

- Mobile design must account for slow networks, one-handed interruptions, partial attention, and short sessions.
- Use skeletons or progressive loading for content-heavy views; do not block entire screens unless the task truly requires it.
- Use real or representative data when testing density; fake-short copy often hides layout problems.
- Keep high-frequency workflows short. Reduce repeated confirmation, typing, and context switching.

## 11. Governance

- Store reusable decisions as tokens, component specs, and page patterns.
- Map design components to implementation components when possible.
- Keep source-of-truth assets small and versioned: color, type, spacing, radius, shadow/elevation, icon, motion, and haptic/audio rules.
- Review designs with a checklist before handoff so consistency does not depend on memory.
