---
name: Acoustic Precision Light
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5c3f40'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#906f70'
  outline-variant: '#e5bdbe'
  surface-tint: '#be0037'
  primary: '#b80035'
  on-primary: '#ffffff'
  primary-container: '#e11d48'
  on-primary-container: '#fffaf9'
  inverse-primary: '#ffb3b6'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#4a40e0'
  on-tertiary: '#ffffff'
  tertiary-container: '#645dfa'
  on-tertiary-container: '#fffaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b6'
  on-primary-fixed: '#40000c'
  on-primary-fixed-variant: '#920028'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  ipa-display:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.04em
  ipa-body:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.02em
  telemetry-data:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system expresses the intersection of high-precision phonetic science and intuitive, luminous digital education. Engineered for an AI-driven Vietnamese pronunciation and speech analytics platform, the aesthetic balances laboratory rigor with inviting pedagogical warmth. 

The visual style blends **Modern Clean Precision** with **Subtle Frosted Micro-Glassmorphism**. The UI avoids heavy skeuomorphic clutter in favor of crisp delineation, translucent utility layers, vibrant spectral telemetry, and razor-sharp typographic hierarchy.

Key Brand Attributes:
- **Acoustic Clarity:** Form follows auditory precision. Visualizations of pitch contours, tone registers, and formant dispersion are rendered with surgical fidelity.
- **Luminous Porcelain Ambience:** The interface feels airy, clinical yet inviting, evoking optical cleanrooms, laboratory glass, and modern scientific instruments.
- **Empowering Feedback:** Interactive states offer immediate, positive reinforcement through vibrant coral-rose accents and high-contrast diagnostic indicators.

## Colors

The palette is engineered around an ultra-clean cool white substrate, anchored by deep slate typography and electrified by targeted acoustic and diagnostic accents.

### Color Architecture
- **Base Canvas & Surfaces:** 
  - Canvas Base: `#f8fafc` (Slate 50) transitioning to `#f1f5f9` (Slate 100) for structural depth.
  - Surface Pure: `#ffffff` for elevated cards, modal layers, and analytical readouts.
  - Surface Glass: `rgba(255, 255, 255, 0.85)` with backdrop filtering for control decks and sticky headers.
- **Primary Brand (Coral-Rose):** `#e11d48` (hover/active: `#be123c`, soft tinted surface: `#fff1f2`, border tint: `#fecdd3`). Used for dominant CTAs, primary action triggers, recording prompts, and core focus rings.
- **Secondary Telemetry (Acoustic Cyan):** `#0284c7` and `#0ea5e9` (soft container: `#f0f9ff`, border tint: `#bae6fd`). Reserved for pitch contour tracks, audio spectrogram grids, audio playback progress, and soundwave telemetry.
- **Tertiary AI (Deep Indigo):** `#4f46e5` (soft container: `#eef2ff`). Used for neural network badges, automated model suggestions, speech game tags, and machine intelligence indicators.
- **Neutral Hierarchy:**
  - Heading & Primary Text: `#0f172a` (Slate 900)
  - Body & Form Text: `#334155` (Slate 700)
  - Muted & Secondary Metadata: `#64748b` (Slate 500)
  - Hairlines & Borders: `rgba(15, 23, 42, 0.08)` (Slate 900 at 8% opacity)
- **Diagnostic / Accuracy Signals:**
  - High GOP / Native Accuracy: `#059669` (Emerald 600) with `#ecfdf5` background.
  - Warning / Weak Consonant / Tonal Drift: `#d97706` (Amber 600) with `#fffbeb` background.
  - Critical Error / Dropped Coda / Phoneme Miss: `#dc2626` (Rose 600) with `#fef2f2` background.

## Typography

The typography pairs the geometric legibility and soft humanism of **Plus Jakarta Sans** with the structural precision of **JetBrains Mono**.

### Typographic Roles & Rules
- **Plus Jakarta Sans** governs editorial context, drill directions, instructions, and standard user interactions. Headings utilize tight negative tracking (`-0.02em` to `-0.03em`) to deliver modern editorial weight without sacrificing readability.
- **JetBrains Mono** is reserved exclusively for:
  - International Phonetic Alphabet (IPA) transcriptions (e.g., `[tʰwaːj˧˧]`, `[ŋiən˧˩]`).
  - Tone register numbers, acoustic frequency notations (`Hz`, `dB`), and duration metrics (`ms`).
  - Goodness of Pronunciation (GOP) percentage scores and raw acoustic analytics.
- **Tone & Diacritics Quality:** Due to Vietnamese diacritics complexity (stacked marks such as `ệ`, `ở`, `ử`), line-heights for body text are calibrated to avoid mark clipping.

## Layout & Spacing

The layout model is anchored on an 8pt base grid with a responsive 12-column fluid grid system on desktop, collapsing to an 8-column layout on tablet, and a 4-column layout on mobile devices.

### Grid & Breakpoints
- **Desktop (≥ 1280px):** 12-column grid, max canvas width 1360px centered, `margin: 2rem`, `gutter: 1.5rem`.
- **Tablet (768px – 1279px):** 8-column grid, dynamic margins `1.5rem`, `gutter: 1rem`. Side navigation collapses to an acoustic docked rail.
- **Mobile (< 768px):** 4-column fluid layout, `margin-mobile: 1rem`, `gutter-mobile: 1rem`. Waveform monitors shift from multi-tier stereo views to stacked longitudinal pitch curves.

### Spacing Principles
- **Internal Component Spacing:** Use `space-xs` (4px) for micro-alignment between tone markers and IPA symbols; `space-sm` (8px) for button internal icon-label gaps; `space-md` (16px) for card body padding; `space-lg` (24px) for analytical panel padding and section gaps.
- **Section Rhythm:** Major diagnostic quadrants utilize `space-xl` (40px) vertical separation to prevent sensory fatigue during intensive phonetic drills.

## Elevation & Depth

This design system avoids dark or heavy drop shadows, favoring ambient porcelain diffusion, delicate borders, and crystalline frosted translucency.

### Depth Tiers
1. **Level 0 (Base Canvas):** Background tone `#f8fafc` to `#f1f5f9`. Fully matte, non-interactive.
2. **Level 1 (Subsurface Diagnostic Grids):** Recessed containers (e.g., inactive audio wave tracks, waveform troughs). Rendered with subtle inset contrast: `inset 0 1px 3px rgba(15, 23, 42, 0.04)` and border `1px solid rgba(15, 23, 42, 0.04)`.
3. **Level 2 (Standard Surface Cards & Panels):** Pure crisp white (`#ffffff`) surfaces paired with a micro-border `1px solid rgba(15, 23, 42, 0.08)`. 
   - Ambient Shadow: `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 3px 0 rgba(15, 23, 42, 0.02)`.
4. **Level 3 (Floating Controls & Popovers):** Active playback bars, floating microphone docks, and phonetic diagnostic cards.
   - Background: `rgba(255, 255, 255, 0.88)` with `backdrop-filter: blur(12px)`.
   - Elevated Shadow: `box-shadow: 0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.03)`.
5. **Interactive Glows (Focused/Recording):** When a recording session or active audio stream is engaged, the primary Coral-Rose or Cyan elements project a diffuse 16px soft aura: `0 0 24px -4px rgba(225, 29, 72, 0.25)`.

## Shapes

The design system employs a Level 2 (`0.5rem` / 8px) baseline roundedness, creating an aesthetic balance between clinical instrument panel precision and modern ergonomic comfort.

### Shape Scale Rules
- **Micro Radii (`rounded-sm` / 4px):** Diagnostic tags, inline IPA phoneme indicators, spectrogram legend chips.
- **Default Base (`rounded-md` / 8px):** Form input fields, dropdown trigger targets, secondary action controls, and waveform segment boundaries.
- **Component Enclosures (`rounded-lg` / 16px):** Primary exercise cards, pitch contour monitors, drill summary panels.
- **Container Enclosures (`rounded-xl` / 24px):** Full-screen diagnostic dialogs, audio recorder bottom sheets, and practice stage viewports.
- **Complete Pills (`rounded-full` / 9999px):** Microphone record triggers, user status badges, audio playback scrub heads, and GOP evaluation chips.

## Components

### Buttons & Interactive Controls
- **Primary CTA (Record / Confirm):** Solid `#e11d48`, label `#ffffff` in `label-md`. Height 44px (touch target 48px). Slight gradient overlay `linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%)`. Hover shifts to `#be123c`. Focus ring: 3px solid `rgba(225, 29, 72, 0.25)`.
- **Secondary (Acoustic Action / Listen):** White surface `#ffffff`, border `1px solid rgba(15, 23, 42, 0.12)`, text `#0284c7`. Hover brings surface `#f0f9ff` and border `#0ea5e9`.
- **Ghost Action:** Borderless, text `#334155`, hover background `#f1f5f9`.

### Chips & Accuracy Badges
- Built with `JetBrains Mono` at `telemetry-data` scale, height 24px, padding 2px 8px, border radius `rounded-sm`.
- **Pass / High GOP:** `#ecfdf5` background, `#059669` text, `rgba(5, 150, 105, 0.2)` border.
- **Warning / Lateral Tonal Shift:** `#fffbeb` background, `#d97706` text, `rgba(217, 119, 6, 0.2)` border.
- **Error / Dropped Sound:** `#fef2f2` background, `#dc2626` text, `rgba(220, 38, 38, 0.2)` border.

### Pitch Contour & Spectrogram Monitor
- Background: Surface White `#ffffff` with frosted backdrop.
- Grid: Hairline rules `rgba(15, 23, 42, 0.04)` indicating tone tiers (Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng).
- Target Contour: Drawn with dashed neutral `#94a3b8` (2px).
- User Voice Plot: Smooth electric cyan line `#0ea5e9` (3px) with active nodes. Erroneous deviations transition real-time to `#dc2626`.

### IPA Phoneme Breakdown Cards
- Background: `#ffffff`, border `1px solid rgba(15, 23, 42, 0.08)`, radius `rounded-lg`.
- Top Header: Vietnamese word in `headline-sm` (`#0f172a`), followed by IPA block in `ipa-display`.
- Interactive segments: Each phoneme (Initial Consonant, Nucleus Vowel, Tone Mark, Final Coda) is interactive. Hovering highlights corresponding acoustic frequencies in `#0284c7`.

### Input Fields & Controls
- Background: `#ffffff`, border `1px solid rgba(15, 23, 42, 0.12)`, radius `rounded-md`.
- Active focus state: Border color transitions to `#e11d48`, outline halo `0 0 0 3px rgba(225, 29, 72, 0.15)`.
- Placeholder: `#94a3b8`. Typography: `body-md`.

### Checkboxes & Radio Buttons
- Base: 18x18px box, border `1.5px solid rgba(15, 23, 42, 0.2)`, radius 4px (checkbox) or circular (radio).
- Checked: Background `#e11d48`, border `#e11d48`, inner checkmark in crisp white.