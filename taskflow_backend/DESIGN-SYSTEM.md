# TaskFlow Frontend Design System

**Status:** Shared baseline
**Framework:** Bootstrap 5.3.3 with custom CSS
**Applies to:** `taskflow_frontend.html` and its `wwwroot` assets

## Design principles

- Keep interfaces clear, calm, and practical.
- Prefer familiar patterns, clear hierarchy, and consistent shared components.
- Support keyboard navigation, visible focus, and responsive layouts.
- Avoid decorative gradients, excessive rounding, heavy shadows, and unnecessary animation.

## Brand and theme tokens

`wwwroot/css/design-tokens.css` is the source of truth for color, spacing, shape, and elevation tokens. Feature styles must use semantic variables such as `--tf-primary`, `--tf-surface`, `--tf-text`, and `--tf-border` rather than hardcoded colors.

| Token | Light | Dark |
|---|---|---|
| Page background | `#F8F9FA` | `#121212` |
| Surface | `#FFFFFF` | `#1C1C1F` |
| Main text | `#171923` | `#F2F3F5` |
| Muted text | `#687080` | `#A3A7B0` |
| Border | `#E4E7EC` | `#34343B` |
| Primary accent | `#505AC9` | `#7C84E8` |
| Font | Inter | Inter |

## Typography and components

Use Inter with the system sans-serif stack as fallback. Prefer the shared classes in `wwwroot/css/components.css`:

| Component | Class |
|---|---|
| Card | `.tf-card` |
| Card header | `.tf-card-header` |
| Card body | `.tf-card-body` |
| Page title | `.tf-page-heading` |
| Page subtitle | `.tf-page-subtitle` |
| Primary button | `.tf-btn-primary` |
| Outline button | `.tf-btn-outline` |
| Form control | `.tf-form-control` |
| Status badge | `.tf-badge` with a semantic variant |
| Muted text | `.tf-muted` |
| Data table | `.tf-table` |
| Empty state | `.tf-empty-state` |

Use Bootstrap grid and utility classes where helpful. Shared visual decisions must come from TaskFlow tokens and components.

## Application shell and responsive behavior

This repository contains a standalone HTML frontend, not an ASP.NET Core MVC `TaskFlow.Web` project. The shared shell is therefore composed once in `taskflow_frontend.html`; MVC partials and Tag Helpers do not apply here. Keep feature-specific presentation in `wwwroot/css/taskflow.css`.

- Desktop sidebar width: 256px; collapsed width: 76px.
- Mobile breakpoint: 992px; navigation opens as a drawer with a backdrop.
- Keep content fluid and put wide tables in a horizontal overflow wrapper.
- Load Bootstrap CSS once. Do not add a second copy of Bootstrap CSS or JavaScript.

## Dark mode and JavaScript

The shared theme toggle stores the preference in `localStorage` under `taskflow-theme`. Use semantic tokens so feature styles work in both themes. Keep theme behavior in `wwwroot/js/theme.js`, shell behavior in `wwwroot/js/layout.js`, and page-specific behavior in `wwwroot/js/app.js`.

Use semantic HTML, labels for form fields, accessible names for icon-only buttons, visible keyboard focus, and `aria-current="page"` for the selected navigation item. Do not use `href="#"` for unfinished actions.

## Reusable implementation prompt

> Implement changes in the existing standalone TaskFlow frontend. Follow `DESIGN-SYSTEM.md` and the shared files in `wwwroot/css` and `wwwroot/js` as the source of truth. Use Bootstrap 5.3.3 with the existing TaskFlow custom classes; do not introduce another CSS framework. Keep the shared shell in `taskflow_frontend.html`, reuse design tokens and components, and do not duplicate navigation or theme controls. Support light and dark themes through CSS variables, responsive layouts, keyboard navigation, and visible focus states. Keep the UI simple and professional. If a reusable component is missing, add it to `components.css` using existing tokens and document it here. Do not change shared tokens or the shell unless explicitly requested.
