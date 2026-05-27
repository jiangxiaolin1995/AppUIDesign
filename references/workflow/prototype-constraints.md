# Prototype Constraints

Use this file when the user provides a prototype, wireframe, screenshot, sketch, or existing Figma frame.

## Core Rule

The prototype is a structural source of truth. Improve visual quality and mobile usability, but do not casually change the user's product logic, navigation, or core workflow.

## Constraint Categories

Classify prototype details into four groups before designing:

- `must-preserve`: required product structure or workflow.
- `may-improve`: visual hierarchy, spacing, component quality, copy clarity, accessibility, states.
- `must-not-change`: business rules, key navigation count, required fields, compliance copy, irreversible actions.
- `usability-override`: places where the prototype should be changed because it would be hard, unsafe, or broken on mobile.

## Must Preserve

Usually preserve:

- Screen purpose.
- Primary action.
- Required content blocks.
- Navigation destinations.
- User-entered data fields.
- Checkout/payment/booking/submit flow order.
- Upload, publish, export, chat, report, consent, and confirmation steps.
- Existing brand/product names when provided.
- Legal, medical, finance, privacy, or risk copy.

## May Improve

Usually improve:

- Typography scale and hierarchy.
- Spacing and alignment.
- Icon clarity.
- Touch target size.
- Button priority.
- Card/list structure.
- Empty/loading/error states.
- Visual style and image quality.
- Color semantics and contrast.
- Platform chrome, safe area, sheet/dialog behavior.

## Must Not Change

Do not change unless the user explicitly asks:

- Number of top-level tabs in a supplied prototype.
- Required fields or compliance steps.
- Confirmation before high-risk actions.
- Payment, medical, finance, identity, or safety flows.
- User-supplied names, labels, or domain-specific categories.
- Data relationships such as product -> cart -> checkout or photo -> edit -> export.

## Usability Override

You may change the prototype structure when:

- Text or controls are too small for mobile.
- Primary action is unreachable or hidden.
- Touch targets collide.
- Critical state is communicated only by color.
- A destructive action sits next to a safe primary action.
- Keyboard would cover the main CTA.
- A desktop table or dashboard is squeezed onto phone.
- The layout violates safe areas or host-app chrome.

When applying a usability override, document it in the production brief.

## Prototype Reading Template

```md
# Prototype Constraints

## Source
- User file/screenshot/prototype:
- Target screen(s):

## Must Preserve
- 

## May Improve
- 

## Must Not Change
- 

## Usability Overrides
| issue | change | reason |
| --- | --- | --- |
|  |  |  |

## Open Questions
- 
```

## Design Transformation Rules

- Keep the same workflow; upgrade the UI.
- Keep required modules; improve hierarchy and grouping.
- Keep tab meanings; replace placeholder icons with semantic icons.
- Keep user-supplied content; rewrite only if the user asks or the copy is placeholder.
- Keep domain logic; do not invent unrelated growth/commerce/social mechanics.
- If adding missing states, make them feel like natural extensions of the prototype.

## Figma Reconstruction From Prototype

If converting a prototype to high-fidelity Figma:

- Put the original prototype as a locked reference.
- Rebuild the high-fidelity frame beside it.
- Label preserved modules and changed modules.
- Use component names that map back to prototype regions.
- Record usability overrides in the ledger.

## Acceptance Checklist

- Prototype constraints are listed.
- Must-preserve items remain visible in the design.
- Must-not-change items were not changed.
- Usability overrides are justified.
- The final design does not become an unrelated popular-app pattern.
- The user can recognize their prototype's workflow in the output.
