# Portfolio Design System

## Design Philosophy
Apple-inspired minimalism with playful micro-interactions. Every element serves a purpose. Space is a feature, not emptiness.

---

## Color System

### Light Mode
```
Background:
  - Primary: #FFFFFF
  - Secondary: #F5F5F7 (Apple's signature gray)
  - Tertiary: #FAFAFA

Text:
  - Primary: #1D1D1F (Apple's near-black)
  - Secondary: #6E6E73
  - Tertiary: #86868B

Accent Red:
  - Primary: #FF3B30 (Apple red, vibrant but refined)
  - Hover: #FF2D20
  - Muted: #FF453A (slightly softer for backgrounds)
```

### Dark Mode
```
Background:
  - Primary: #000000
  - Secondary: #1C1C1E
  - Tertiary: #2C2C2E

Text:
  - Primary: #F5F5F7
  - Secondary: #A1A1A6
  - Tertiary: #8E8E93

Accent Red:
  - Primary: #FF453A (softer in dark mode)
  - Hover: #FF5247
  - Muted: #FF6961
```

### Glassmorphism Layers
```
Light Mode Glass: rgba(255, 255, 255, 0.7) with backdrop-blur-xl
Dark Mode Glass: rgba(28, 28, 30, 0.7) with backdrop-blur-xl
Border: rgba(255, 59, 48, 0.1) - subtle red tint
```

---

## Typography

### Font Stack
```
Primary: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif
Code: 'SF Mono', 'Fira Code', monospace
```

### Type Scale (Desktop)
```
Hero Headline: 96px / 1.05 / -2% letter-spacing / 700 weight
Section Title: 56px / 1.1 / -1% letter-spacing / 700 weight
Subsection: 32px / 1.3 / 0% letter-spacing / 600 weight
Body Large: 21px / 1.5 / 0% letter-spacing / 400 weight
Body: 17px / 1.6 / 0% letter-spacing / 400 weight
Small: 14px / 1.5 / 0% letter-spacing / 400 weight
Label: 12px / 1.4 / 0% letter-spacing / 500 weight (uppercase)
```

### Type Scale (Mobile)
```
Hero Headline: 48px / 1.1
Section Title: 32px / 1.2
Subsection: 24px / 1.3
Body Large: 19px / 1.5
Body: 17px / 1.6
```

---

## Spacing Scale
Following Apple's generous spacing philosophy:

```
4px   : xs   (tight inline gaps)
8px   : sm   (component padding)
16px  : md   (element margins)
24px  : lg   (section inner spacing)
48px  : xl   (between sections - mobile)
80px  : 2xl  (between sections - tablet)
120px : 3xl  (between sections - desktop)
160px : 4xl  (hero padding)
```

---

## Layout Grid

### Container
```
Max-width: 1200px
Padding: 24px (mobile) / 48px (tablet) / 80px (desktop)
Centered with margin auto
```

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## Motion System

### Timing Functions (Framer Motion)
```javascript
// Apple-like easing
const easing = {
  smooth: [0.25, 0.1, 0.25, 1], // Default smooth
  entrance: [0.32, 0.72, 0, 1], // Entry animations
  exit: [0.4, 0, 1, 1], // Exit animations
  spring: { type: "spring", stiffness: 100, damping: 15 } // Physics-based
}
```

### Duration Scale
```
Instant: 0.15s (button hover)
Quick: 0.3s (small elements)
Medium: 0.5s (cards, modals)
Slow: 0.8s (page transitions, large movements)
Cinematic: 1.2s (hero reveals)
```

### Motion Principles
1. **Subtlety First**: Motion should enhance, not distract
2. **Physics-Based**: Use spring animations for natural feel
3. **Choreography**: Stagger children with 0.1-0.15s delays
4. **Scroll-Linked**: Use scroll progress for parallax/reveals
5. **Performance**: Transform and opacity only for 60fps

---

## Component Patterns

### Cards
```
Border-radius: 16px (medium) / 24px (large)
Shadow (light): 0 4px 24px rgba(0, 0, 0, 0.06)
Shadow (dark): 0 4px 24px rgba(0, 0, 0, 0.4)
Hover lift: translateY(-4px)
Transition: all 0.3s smooth easing
```

### Buttons
```
Primary (Red):
  - Background: accent red
  - Text: white
  - Padding: 12px 32px
  - Border-radius: 24px (pill shape)
  - Hover: scale(1.05) + brightness increase

Secondary (Outline):
  - Border: 1.5px solid red
  - Text: red
  - Hover: red background with white text

Tertiary (Ghost):
  - Text: primary text color
  - Hover: background tertiary gray
```

### Inputs
```
Background: Secondary background
Border: 1px solid transparent
Focus: Border red with subtle glow
Padding: 14px 20px
Border-radius: 12px
Font-size: 17px
```

---

## Micro-Interactions

### Magnetic Cursor Effect
On project cards and buttons - elements slightly pull toward cursor when nearby (desktop only)

### Text Reveal
Hero text masks in character by character with blur → sharp transition

### Scroll Progress Indicator
Thin red line at top that fills as you scroll (1px height)

### Hover Spotlight
Subtle gradient spotlight follows cursor on project cards

### Skill Pills
Hover triggers gentle bounce (scale 1.05) with rotation (2deg)

### Floating Elements
Background decorative elements with parallax (move 0.3x scroll speed)

### Link Underline
Animated from left to right on hover (scaleX transform)

### Code Block Glow
Red glow pulse on code snippets when they enter viewport

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Reduced motion: Respect `prefers-reduced-motion` - disable all animations
- Focus indicators: 2px red outline with 2px offset
- Keyboard navigation: All interactive elements accessible via Tab
- ARIA labels on all icon buttons
- Semantic HTML structure (h1→h6 hierarchy)

---

## Implementation Notes

### Tailwind Config Extensions
```javascript
// Add to tailwind.config.ts
colors: {
  'apple-gray': '#F5F5F7',
  'apple-dark': '#1D1D1F',
  'accent-red': '#FF3B30',
}
fontFamily: {
  'apple': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display'],
}
spacing: {
  '18': '4.5rem',
  '88': '22rem',
  '128': '32rem',
}
```

### Framer Motion Variants Pattern
```javascript
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

---

This design system ensures visual consistency while allowing creative expression through motion and interaction.
