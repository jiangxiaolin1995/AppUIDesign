# State Matrix

Use this file to decide which states must be designed for a mobile app flow.

## Core Rule

A screen is not complete until its important states are considered. High-trust, transaction, creation, and permission-heavy flows require more state coverage than a simple static concept.

## Universal State Set

Consider these states for every interactive screen:

- default
- loading
- refreshing
- empty
- error
- offline
- permission denied
- disabled
- pressed/active
- selected
- success
- destructive confirmation

## State Matrix Template

```md
| screen | component/flow | default | loading | empty | error | offline | permission | success | destructive | notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Feed | required | skeleton | empty feed | retry | cached/offline | location |  |  |  |
```

## Industry Requirements

### 财务

Must include:

- balance/data loading
- hidden/private amount state
- transfer confirmation
- risk warning
- failure/retry
- pending transaction
- success receipt
- session timeout

### 医疗

Must include:

- privacy/consent
- appointment loading
- unavailable doctor/time
- report loading/failure
- medication reminder states
- emergency/safety copy
- permission and identity verification

### 购物 / 美食佳饮

Must include:

- search loading/empty
- filter no results
- product/restaurant unavailable
- cart empty
- payment loading/failure/success
- order status
- refund/support
- coupon invalid

### 旅游 / 导航

Must include:

- location permission
- route loading
- offline/no network
- no route/result
- booking unavailable
- delay/cancel status
- map loading/fallback

### 摄影与录像 / 图形和设计

Must include:

- camera/photo permission
- import loading/failure
- editing progress
- undo/redo availability
- AI processing
- before/after compare
- export loading/failure/success
- storage permission

### 社交 / 娱乐 / 音乐 / 新闻

Must include:

- feed loading/empty
- pagination loading
- content unavailable/deleted
- comment loading/error
- report/block flow
- notification badge states
- playback/reading continuation where applicable

### 健康健美

Must include:

- workout start/pause/complete
- sensor/data permission
- plan empty
- progress loading
- missed activity
- rest/recovery state
- health warning when relevant

### 工具 / 效率 / 参考 / 天气

Must include:

- quick query loading
- no result
- offline/cache
- permission denied
- sync conflict when relevant
- settings disabled/error

## Component State Requirements

### Buttons

- default
- pressed
- loading
- disabled
- destructive
- success, if submission has a completion state

### Forms

- empty
- focused
- filled
- validation error
- disabled
- submitting
- submitted

### Lists / Feeds

- skeleton loading
- pull-to-refresh
- empty
- pagination loading
- pagination end
- item deleted/unavailable
- offline cached

### Media / Images

- loading placeholder
- loaded
- failed
- permission denied
- processing
- selected

### Editor Tools

- available
- selected
- disabled
- processing
- undo available/unavailable
- export loading/failure/success

## Visual Guidance

- Loading states should preserve layout size and prevent jumping.
- Empty states should explain what to do next.
- Error states should provide a recovery action.
- Permission states should explain value and provide a route to settings.
- Success states should confirm what happened and what can be done next.
- Destructive states should separate safe and dangerous actions.

## Acceptance Checklist

- State matrix exists for core flows.
- Required industry states are included.
- Loading/empty/error/offline states are not generic afterthoughts.
- Permission states include rationale and recovery.
- High-risk actions include confirmation and recovery.
- Component states are consistent across screens.
