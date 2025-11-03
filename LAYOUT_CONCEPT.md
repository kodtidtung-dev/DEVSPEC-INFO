# Portfolio Layout Concept

## Full Page Structure Overview

```
1. Hero (100vh)
2. About (80vh - 100vh)
3. Skills (auto height, comfortable)
4. Projects (auto, generous spacing)
5. Contact (60vh - centered)
6. Footer (minimal)
```

All sections have equal visual weight through:
- Similar vertical rhythm
- Consistent typography scale
- Balanced whitespace
- Strategic use of accent color

---

## 1. Hero Section (100vh)

### Layout
```
┌─────────────────────────────────────────┐
│                                         │
│         [Minimal Navigation]            │
│                                         │
│                                         │
│     Hi, I'm [Your Name]                │ ← 96px, weight 700
│     Frontend Developer                  │ ← 56px, red accent
│                                         │
│     Crafting pixel-perfect              │ ← 21px, secondary color
│     experiences with code               │
│                                         │
│     [See My Work ↓] [Get In Touch]     │ ← Pill buttons
│                                         │
│          ⌄ scroll indicator             │
│                                         │
└─────────────────────────────────────────┘

Background: Subtle gradient mesh animation
Floating: 2-3 abstract geometric shapes (soft red tint, parallax on scroll)
```

### Design Details
- **Name**: Fade in letter-by-letter with blur → sharp effect (0.05s stagger)
- **Title**: Slide up + fade (delay 0.4s)
- **Subtitle**: Fade in (delay 0.8s)
- **Buttons**: Fade + slight scale from 0.95 → 1 (delay 1s)
- **Scroll Indicator**: Gentle bouncing animation (infinite)
- **Background**: Gradient mesh with slow morphing animation (20s loop)

### Navigation (Fixed)
```
[Logo/Name]                    [About][Skills][Projects][Contact][🌓]
                                                          dark mode toggle
```
- Fixed position with backdrop-blur
- Appears after scrolling 100px with slide-down animation
- Active section highlighted with red indicator below

---

## 2. About Section

### Layout (Two-Column Desktop, Stack Mobile)
```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  About Me                            [Your Photo]         │
│  ─────────                           Rounded square       │
│                                      400x400              │
│  [Paragraph about you]               Subtle shadow        │
│  Multi-line, comfortable             Hover: gentle lift   │
│  line-height, easy to read                                │
│                                                            │
│  • Detail 1 (e.g., Years exp)                             │
│  • Detail 2 (e.g., Location)                              │
│  • Detail 3 (e.g., Specialty)                             │
│                                                            │
│  [Download Resume]                                         │
│                                                            │
└────────────────────────────────────────────────────────────┘

Background: Clean, section uses secondary background color for subtle separation
```

### Design Details
- **Section Title**: Scroll-triggered fade + slide up
- **Text**: Fade in with slight delay (0.2s after title)
- **Photo**: Slide from right with fade (parallax: moves slower than scroll)
- **Bullets**: Stagger fade in (0.1s each)
- **Resume Button**: Hover shows download icon with bounce

### Visual Enhancements
- Red accent line (4px, 80px wide) above section title
- Photo hover: scale(1.02) + shadow increase
- Background: Soft gradient from background to secondary color

---

## 3. Skills Section

### Layout (Grid of Pills + Proficiency Visualization)
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     What I Work With                        │
│                     ────────────────                        │
│                                                             │
│  Frontend                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │  React   │ │ Next.js  │ │TypeScript│ │Tailwind  │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐                                │
│  │  Framer  │ │   GSAP   │                                │
│  └──────────┘ └──────────┘                                │
│                                                             │
│  Tools & Others                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                  │
│  │   Git    │ │  Figma   │ │  Vercel  │                  │
│  └──────────┘ └──────────┘ └──────────┘                  │
│                                                             │
│  [Interactive visualization or favorite tech callout]      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Design Details

**Skill Pills:**
- Background: Glass effect (backdrop-blur-md)
- Border: 1px solid rgba(red, 0.1)
- Padding: 12px 24px
- Border-radius: 20px
- Font: 15px, medium weight

**Interactions:**
- Hover: Scale(1.05) + gentle rotate(2deg) + red border full opacity
- Active/Selected: Red background with white text
- Scroll trigger: Pills cascade in with spring animation (0.08s stagger)

**Category Headers:**
- 14px uppercase, letter-spacing 0.1em, red color
- Slight margin-bottom: 16px

**Alternative Visualization:**
Radial/circular skill display showing comfort level:
- Inner circle: Expert skills (full red)
- Middle ring: Proficient (red 70%)
- Outer ring: Familiar (red 40%)
- Hover each skill for tooltip with years of experience

---

## 4. Projects Section

### Layout (Featured Grid)
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    Selected Works                            │
│                    ─────────────                             │
│                                                              │
│  ┌─────────────────────────────────────────────────┐       │
│  │                                                  │       │
│  │         [Large Project Image/Video]             │       │ Featured
│  │                                                  │       │ Project
│  │  Project 1 Title                                │       │ (Full width)
│  │  Brief description • Tech stack                 │       │
│  │  [View Project →]                               │       │
│  └─────────────────────────────────────────────────┘       │
│                                                              │
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │   [Project Image]        │ │   [Project Image]        │ │
│  │                          │ │                          │ │
│  │   Project 2              │ │   Project 3              │ │ 2-column
│  │   Description            │ │   Description            │ │ Grid
│  │   [View →]               │ │   [View →]               │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │   Project 4              │ │   Project 5              │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
│                                                              │
│              [View All Projects on GitHub →]                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design Details

**Project Cards:**
- Border-radius: 24px
- Overflow hidden for image
- Padding: 32px
- Glass background with subtle shadow
- Image aspect ratio: 16:9
- Image: Grayscale → color on hover

**Card Interaction (The Playful Part):**
1. **Magnetic Cursor**: Card slightly tilts toward cursor (3D transform)
2. **Spotlight Effect**: Radial gradient follows cursor on hover
3. **Image Zoom**: Scale(1.05) on hover with smooth transition
4. **Lift**: translateY(-8px) with shadow increase

**Featured Project:**
- Larger scale (spans full width on desktop)
- Video/GIF preview that plays on hover
- More detailed description
- Tech stack as individual pills

**Tech Stack Tags:**
- Small pills below description
- Red outline, hover fills with red
- 12px font, slight padding

**Scroll Animations:**
- Featured project: Fade + slide from bottom
- Grid projects: Stagger from bottom (0.15s delay each)
- Parallax: Images move slightly slower than card container

---

## 5. Contact Section

### Layout (Centered, Minimal)
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                  Let's Work Together                    │
│                  ───────────────────                    │
│                                                         │
│         Have a project in mind or just want            │
│         to chat? I'd love to hear from you.            │
│                                                         │
│              [Email Me] [LinkedIn] [GitHub]            │
│                                                         │
│                    Or send a message:                  │
│                                                         │
│  ┌───────────────────────────────────────────────┐   │
│  │  Name                                         │   │
│  └───────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────┐   │
│  │  Email                                        │   │
│  └───────────────────────────────────────────────┘   │
│  ┌───────────────────────────────────────────────┐   │
│  │  Message                                      │   │
│  │                                               │   │
│  │                                               │   │
│  └───────────────────────────────────────────────┘   │
│                                                         │
│              [Send Message]                            │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘

Background: Gradient from background → subtle red tint (5% opacity)
```

### Design Details

**Social Buttons:**
- Icon + Label
- Glass effect with border
- Hover: Red background, white icon/text
- Arranged horizontally with 16px gap
- Icons: 24px size

**Form Inputs:**
- Following design system input styles
- Focus: Red border with subtle glow (box-shadow)
- Label animates up on focus (floating label pattern)
- Error states: Red outline with shake animation

**Submit Button:**
- Primary red button
- Loading state: Spinner replaces text
- Success: Checkmark animation + green pulse
- Hover: Slight scale + shadow

**Micro-interactions:**
- Form slides up with fade on scroll
- Inputs stagger in (0.1s each)
- Copy email button: Click shows "Copied!" tooltip with fade out

---

## 6. Footer (Minimal)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  [Your Name]                    [Social Icons]  │
│  Frontend Developer                             │
│                                                 │
│  Built with Next.js, Tailwind, Framer Motion   │
│  © 2025                                        │
│                                                 │
└─────────────────────────────────────────────────┘

Background: Secondary background
Padding: 48px 0
Text: Small, secondary color
```

### Design Details
- Social icons: Simple outline style, hover red fill
- Links to top: Smooth scroll with easing
- Copyright year: Dynamic
- "Back to top" button (right side, small, appears after scrolling)

---

## Global Elements

### Navigation State
Active section gets:
- Red underline (2px, animated from left)
- Slightly brighter text
- Updates on scroll with intersection observer

### Scroll Progress Bar
- Fixed top, 2px height
- Red fill animates left → right as you scroll
- Uses scaleX transform for performance

### Dark Mode Toggle
- Position: Top right of fixed nav
- Icon: Sun/Moon with rotate transition
- Toggle animates with scale + rotate(180deg)
- Color theme transition: 0.3s on all elements

### Page Transitions
- Smooth fade between pages (if multi-page)
- Red wipe animation (optional, for flair)

---

## Responsive Behavior

### Mobile (< 768px)
- Hero text: 48px headline
- Stack all two-column layouts
- Project cards: 1 column, full width
- Navigation: Hamburger menu with slide-in drawer
- Reduce section padding: 48px vertical
- Skills: 2 columns max

### Tablet (768px - 1024px)
- Hero text: 64px
- About: Stack with larger text
- Projects: 2 columns
- Section padding: 80px vertical

### Desktop (> 1024px)
- Full design as described
- Enable magnetic cursor effects
- Parallax effects active
- Section padding: 120px vertical

---

## Visual Hierarchy Balance

Each section maintains equal visual weight through:

1. **Vertical Space**: All sections have similar height (60-100vh)
2. **Typography**: Each section uses the same title style (56px)
3. **Accent Usage**: Red appears once per section (title underline, button, or highlight)
4. **Motion Timing**: All sections use consistent animation speeds
5. **Background Variation**: Alternates between pure background and secondary tint

This creates a **rhythmic flow** — like pages in a magazine, each with its own purpose but part of a cohesive story.

---

## Narrative Flow (The Story You Tell)

1. **Hero**: "This is who I am" — Confident introduction
2. **About**: "This is my background" — Build trust
3. **Skills**: "This is what I can do" — Demonstrate capability
4. **Projects**: "This is what I've done" — Proof of work
5. **Contact**: "Let's create something together" — Call to action

The scroll feels like turning pages in a premium coffee table book about design and code.
