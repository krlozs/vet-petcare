---
name: Serene Clinical
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3f4850'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#6f7881'
  outline-variant: '#bec7d1'
  surface-tint: '#006492'
  primary: '#006492'
  on-primary: '#ffffff'
  primary-container: '#2d9cdb'
  on-primary-container: '#003049'
  inverse-primary: '#8ccdff'
  secondary: '#006780'
  on-secondary: '#ffffff'
  secondary-container: '#63d7fe'
  on-secondary-container: '#005c72'
  tertiary: '#006d37'
  on-tertiary: '#ffffff'
  tertiary-container: '#1fa95c'
  on-tertiary-container: '#003417'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cae6ff'
  primary-fixed-dim: '#8ccdff'
  on-primary-fixed: '#001e2f'
  on-primary-fixed-variant: '#004b6f'
  secondary-fixed: '#b7eaff'
  secondary-fixed-dim: '#60d4fb'
  on-secondary-fixed: '#001f28'
  on-secondary-fixed-variant: '#004e61'
  tertiary-fixed: '#7efba4'
  tertiary-fixed-dim: '#61de8a'
  on-tertiary-fixed: '#00210c'
  on-tertiary-fixed-variant: '#005228'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The design system is built on the principles of **Minimalism** and **Modern Professionalism**. It aims to evoke a sense of calm, trust, and cleanliness, which are essential for a veterinary environment. The target audience includes pet owners seeking reliable care and clinic staff requiring an efficient, distraction-free interface.

The aesthetic prioritizes clarity and breathing room. By utilizing heavy whitespace and a restricted color palette, the UI reduces cognitive load during potentially stressful situations (like booking an emergency pet visit). The emotional response should be one of "composed empathy"—efficient and clinical, yet approachable and soft.

## Colors
The palette is anchored by a **Soft Teal Primary**, chosen for its associations with health, hygiene, and tranquility. 

- **Primary (#2D9CDB):** Used for primary actions, active states, and brand markers.
- **Secondary (#56CCF2):** A lighter blue for accents, progress bars, or illustrative icons.
- **Success (#27AE60):** Reserved for "Healthy" status indicators and completed appointments.
- **Neutral/Text (#333333):** A dark charcoal rather than pure black to maintain a softer, more sophisticated editorial feel.
- **Surfaces:** Pure white is used for primary content cards to maximize contrast, while a very light gray (`#F8FAFC`) is used for background regions to define boundaries without heavy lines.

## Typography
This design system utilizes **Inter** for all roles to ensure maximum readability and a systematic, modern feel. The typeface’s high x-height makes it exceptionally legible for medical records and scheduling data.

- **Headlines:** Use Bold or SemiBold weights with slight negative letter-spacing to create a clean, grounded appearance.
- **Body Text:** Uses a generous line height (1.5 - 1.6) to ensure pet history notes and instructions are easy to scan.
- **Labels:** Small caps or slightly tracked-out bold weights should be used for table headers and form category titles to differentiate them from user input.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a standard 12-column structure for desktop. 

- **Desktop:** 12 columns, 24px gutters, 48px side margins.
- **Tablet:** 6 columns, 16px gutters, 24px side margins.
- **Mobile:** 2 columns, 16px gutters, 16px side margins.

A strict 8px spacing scale is used for all internal paddings and margins. Generous whitespace (the `xl` unit) should be used between major sections to prevent the clinical data from feeling cramped or overwhelming.

## Elevation & Depth
To maintain a minimalist profile, the design system avoids heavy shadows. Instead, it uses **Ambient Shadows** and **Tonal Layers**.

- **Level 0 (Background):** `#F8FAFC` - The base canvas.
- **Level 1 (Cards/Surface):** `#FFFFFF` - Used for the primary content containers. These should have a very soft, diffused shadow: `0 4px 12px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Interactive/Hover):** When a card or button is hovered, the shadow deepens slightly to `0 8px 20px rgba(0, 0, 0, 0.08)` to indicate interactivity.
- **Outlines:** Use a 1px solid border of `#E2E8F0` for form inputs and table dividers instead of shadows to keep the interface crisp.

## Shapes
The shape language is defined as **Rounded**, utilizing an 8px base radius. This softens the "clinical" feel of the app, making it appear more friendly to pet owners.

- **Standard Elements (Buttons, Inputs):** 8px (`0.5rem`).
- **Containers (Cards, Modals):** 16px (`1rem`).
- **Small Elements (Tags, Badges):** 4px (`0.25rem`) or fully pill-shaped.

## Components
- **Buttons:** Primary buttons use the Teal background with White text. Secondary buttons should use a Ghost style (Teal border and Teal text) to maintain hierarchy.
- **Cards:** Clean white backgrounds with the Level 1 shadow and 16px corner radius. Padding inside cards should be `lg` (24px) for desktop.
- **Forms:** Input fields use a 1px `#E2E8F0` border. On focus, the border transitions to the Primary Teal with a subtle 2px outer glow of the same color at 20% opacity.
- **Tables:** Minimalist design with no vertical borders. Use a light horizontal divider (`#F1F5F9`) between rows. The header row should have a subtle gray background (`#F8FAFC`).
- **Chips/Badges:** Use soft tinted backgrounds (e.g., a Status: "Active" chip uses a 10% opacity green background with 100% opacity green text) to keep the UI colorful but light.
- **Lists:** Use plenty of vertical padding (16px) between list items to ensure touch-friendliness on mobile devices and high legibility for pet data.