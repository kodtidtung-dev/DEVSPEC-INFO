# Tasks: Modern Frontend Developer Portfolio

**Input**: Design documents from `/specs/001-modern-portfolio/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Tests are NOT explicitly requested in the specification, so test tasks are omitted. Focus is on implementation and manual testing per acceptance criteria.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Following Next.js 14 App Router structure from plan.md:
- `src/app/` - App Router pages and layouts
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities and libraries
- `src/data/` - Static data files
- `src/types/` - TypeScript definitions
- `public/` - Static assets

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure per quickstart.md

- [ ] T001 Initialize Next.js 14 project with TypeScript, Tailwind CSS, and App Router
- [ ] T002 Install core dependencies: framer-motion, next-themes, react-hook-form, zod, resend, lucide-react
- [ ] T003 [P] Create directory structure: src/{app,components,hooks,lib,data,types}, public/images/{projects,profile}
- [ ] T004 [P] Configure Tailwind CSS with custom theme in tailwind.config.ts
- [ ] T005 [P] Configure TypeScript with strict mode and path aliases in tsconfig.json
- [ ] T006 [P] Configure Next.js with image optimization in next.config.js
- [ ] T007 [P] Create .env.local.example with required environment variables
- [ ] T008 [P] Setup .gitignore with Next.js and environment file exclusions
- [ ] T009 Copy TypeScript type definitions from specs/001-modern-portfolio/contracts/data-schemas.ts to src/types/index.ts

**Checkpoint**: Foundation ready - dependencies installed, configuration complete

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 Setup font optimization using next/font/google for Inter and JetBrains Mono in src/app/layout.tsx
- [ ] T011 Create root layout with ThemeProvider from next-themes in src/app/layout.tsx
- [ ] T012 [P] Create global styles with Tailwind imports and custom CSS in src/app/globals.css
- [ ] T013 [P] Create animation variants library in src/lib/animations.ts with fadeUp, stagger, slideIn variants
- [ ] T014 [P] Create utility functions library in src/lib/utils.ts for cn() classname helper
- [ ] T015 [P] Create constants file in src/lib/constants.ts with navigation items and config
- [ ] T016 [P] Create initial profile data file in src/data/profile.ts with placeholder content
- [ ] T017 [P] Create initial projects data file in src/data/projects.ts with placeholder content
- [ ] T018 [P] Create initial skills data file in src/data/skills.ts with placeholder content
- [ ] T019 Create base UI components: Button in src/components/ui/Button.tsx
- [ ] T020 [P] Create base UI components: Card in src/components/ui/Card.tsx
- [ ] T021 [P] Create base UI components: Input in src/components/ui/Input.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Initial Impression and Navigation (Priority: P1) 🎯 MVP

**Goal**: Visitors can immediately understand who the developer is and navigate the portfolio smoothly

**Independent Test**: Load homepage and verify developer's name, title, and navigation are visible within 1 second. Test navigation clicks to all sections. Test mobile menu. Test scroll progress indicator.

### Implementation for User Story 1

- [ ] T022 [P] [US1] Create useScrollProgress custom hook in src/hooks/useScrollProgress.ts
- [ ] T023 [P] [US1] Create useMediaQuery custom hook in src/hooks/useMediaQuery.ts for mobile detection
- [ ] T024 [US1] Create Navigation component with fixed header and scroll progress in src/components/Navigation.tsx
- [ ] T025 [US1] Implement mobile hamburger menu with slide-in drawer in src/components/Navigation.tsx
- [ ] T026 [US1] Create ThemeToggle component with next-themes integration in src/components/ThemeToggle.tsx
- [ ] T027 [US1] Integrate ThemeToggle into Navigation component
- [ ] T028 [US1] Create Hero component with name, title, and value proposition in src/components/Hero.tsx
- [ ] T029 [US1] Add animated text reveal to Hero using Framer Motion
- [ ] T030 [US1] Add typewriter effect for role titles in Hero component
- [ ] T031 [US1] Add CTA buttons to Hero component with navigation links
- [ ] T032 [US1] Create main page layout integrating Navigation and Hero in src/app/page.tsx
- [ ] T033 [US1] Implement smooth scroll navigation for anchor links
- [ ] T034 [US1] Add keyboard navigation support with visible focus states
- [ ] T035 [US1] Test mobile responsive behavior (320px to 2560px)
- [ ] T036 [US1] Test theme toggle functionality (light/dark mode with localStorage persistence)
- [ ] T037 [US1] Verify scroll progress indicator tracks page position accurately

**Checkpoint**: User Story 1 complete - visitors see professional identity and can navigate smoothly

---

## Phase 4: User Story 2 - Viewing Project Portfolio (Priority: P1) 🎯 MVP

**Goal**: Visitors can see developer's projects with clear descriptions, technologies, and images

**Independent Test**: Navigate to projects section and verify 3+ projects display with titles, descriptions, technology tags, and images. Test hover interactions. Test external links.

### Implementation for User Story 2

- [ ] T038 [P] [US2] Create useIntersectionObserver custom hook in src/hooks/useIntersectionObserver.ts
- [ ] T039 [US2] Create Projects component with project list layout in src/components/Projects.tsx
- [ ] T040 [US2] Implement ProjectCard subcomponent with image, title, description in src/components/Projects.tsx
- [ ] T041 [US2] Add technology tags display to ProjectCard with styling
- [ ] T042 [US2] Implement image carousel/gallery for multiple project images
- [ ] T043 [US2] Add hover effects and Ken Burns effect to project images
- [ ] T044 [US2] Add external links (demo, GitHub) to ProjectCard with icons
- [ ] T045 [US2] Implement scroll-triggered reveal animations using useIntersectionObserver
- [ ] T046 [US2] Add perspective tilt effect on project cards (max 5 degrees)
- [ ] T047 [US2] Integrate Projects component into main page in src/app/page.tsx
- [ ] T048 [US2] Populate projects data file with actual project information in src/data/projects.ts
- [ ] T049 [US2] Optimize and add project images to public/images/projects/
- [ ] T050 [US2] Test project card interactions and animations
- [ ] T051 [US2] Verify external links open correctly
- [ ] T052 [US2] Test image optimization and loading performance

**Checkpoint**: User Story 2 complete - visitors can view and explore projects portfolio

---

## Phase 5: User Story 3 - Learning About the Developer (Priority: P2)

**Goal**: Visitors understand developer's background, skills, and professional journey

**Independent Test**: Navigate to About section and verify professional photo, bio, and skills are displayed. Test skill indicators and proficiency levels.

### Implementation for User Story 3

- [ ] T053 [US3] Create About component with bento grid layout in src/components/About.tsx
- [ ] T054 [US3] Implement bio card (2x1 grid span) with professional description
- [ ] T055 [US3] Implement photo card (1x2 grid span) with 3D tilt on hover
- [ ] T056 [US3] Create skills display with category grouping
- [ ] T057 [US3] Implement animated progress bars for skill proficiency levels
- [ ] T058 [US3] Add tech stack carousel with animated pills
- [ ] T059 [US3] Apply glass morphism effect to all About cards
- [ ] T060 [US3] Implement stagger animation on scroll reveal for cards
- [ ] T061 [US3] Add bounce animation to tech pills on hover
- [ ] T062 [US3] Integrate About component into main page in src/app/page.tsx
- [ ] T063 [US3] Populate profile data with actual bio and information in src/data/profile.ts
- [ ] T064 [US3] Populate skills data with actual skill categories in src/data/skills.ts
- [ ] T065 [US3] Add and optimize profile photo to public/images/profile/
- [ ] T066 [US3] Test bento grid responsive behavior on different screen sizes
- [ ] T067 [US3] Test 3D tilt effect on photo card
- [ ] T068 [US3] Verify skills display correctly with proficiency indicators

**Checkpoint**: User Story 3 complete - visitors understand developer's background and skills

---

## Phase 6: User Story 4 - Contacting the Developer (Priority: P2)

**Goal**: Visitors can easily reach out and initiate communication

**Independent Test**: Navigate to Contact section, fill out form with valid data, submit, and verify confirmation message. Test email copy to clipboard. Test social links.

### Implementation for User Story 4

- [ ] T069 [P] [US4] Create email service integration in src/lib/email.ts with Resend SDK
- [ ] T070 [P] [US4] Create contact form validation schema using Zod in src/lib/email.ts
- [ ] T071 [US4] Create Contact API route with validation in src/app/api/contact/route.ts
- [ ] T072 [US4] Implement honeypot spam protection in API route
- [ ] T073 [US4] Implement rate limiting (3 requests per hour per IP) in API route
- [ ] T074 [US4] Add email sending logic with error handling in API route
- [ ] T075 [US4] Create Contact component with split layout (form + info) in src/components/Contact.tsx
- [ ] T076 [US4] Implement contact form with React Hook Form in src/components/Contact.tsx
- [ ] T077 [US4] Add floating labels animation to form inputs
- [ ] T078 [US4] Implement form validation with clear error messages
- [ ] T079 [US4] Add red glow effect on input focus
- [ ] T080 [US4] Implement submit button with liquid loading state
- [ ] T081 [US4] Add success state with confetti animation after submission
- [ ] T082 [US4] Implement copy email to clipboard functionality with visual confirmation
- [ ] T083 [US4] Add social media links with icons from Lucide React
- [ ] T084 [US4] Add availability status indicator with pulsing dot animation
- [ ] T085 [US4] Integrate Contact component into main page in src/app/page.tsx
- [ ] T086 [US4] Setup Resend API key in .env.local
- [ ] T087 [US4] Test contact form submission end-to-end
- [ ] T088 [US4] Test form validation for invalid inputs
- [ ] T089 [US4] Test honeypot spam protection blocks bot submissions
- [ ] T090 [US4] Test rate limiting prevents abuse
- [ ] T091 [US4] Verify email delivery works correctly

**Checkpoint**: User Story 4 complete - visitors can contact developer via form or email

---

## Phase 7: User Story 5 - Visual Experience and Engagement (Priority: P3)

**Goal**: Engaging and polished visual experience that demonstrates frontend craftsmanship

**Independent Test**: Interact with various elements, toggle theme, scroll through sections, and observe smooth animations and visual feedback. Test reduced motion support.

### Implementation for User Story 5

- [ ] T092 [P] [US5] Create useMousePosition custom hook in src/hooks/useMousePosition.ts for parallax effects
- [ ] T093 [US5] Add hover state visual feedback to all interactive elements (buttons, links, cards)
- [ ] T094 [US5] Implement smooth scroll-triggered reveal animations for all sections
- [ ] T095 [US5] Add magnetic hover effect to navigation menu items using useMousePosition
- [ ] T096 [US5] Add liquid hover animation to CTA buttons in Hero
- [ ] T097 [US5] Implement theme transition animations (< 0.5s color changes)
- [ ] T098 [US5] Add loading states and skeleton screens for images
- [ ] T099 [US5] Implement blur placeholder for images during load
- [ ] T100 [US5] Add page transition animations between sections
- [ ] T101 [US5] Implement prefers-reduced-motion media query support
- [ ] T102 [US5] Test animations complete within 0.6 seconds
- [ ] T103 [US5] Verify 60fps performance during scrolling and animations
- [ ] T104 [US5] Test reduced motion mode disables/minimizes animations
- [ ] T105 [US5] Ensure all interactions feel responsive with no lag

**Checkpoint**: User Story 5 complete - site has polished animations and visual feedback

---

## Phase 8: User Story 6 - Accessibility and Performance (Priority: P2)

**Goal**: Site is accessible to all users and performs well on all devices and connections

**Independent Test**: Test keyboard navigation, run screen reader, test on slow 3G connection, run Lighthouse audit, verify WCAG 2.1 AA compliance.

### Implementation for User Story 6

- [ ] T106 [P] [US6] Add semantic HTML5 elements (nav, main, section, article) throughout
- [ ] T107 [P] [US6] Add ARIA labels to all interactive elements and icon buttons
- [ ] T108 [P] [US6] Implement skip-to-content link for keyboard users
- [ ] T109 [P] [US6] Ensure proper heading hierarchy (h1 → h2 → h3)
- [ ] T110 [US6] Add visible focus indicators to all focusable elements
- [ ] T111 [US6] Implement focus trap for mobile navigation menu
- [ ] T112 [US6] Ensure minimum 44x44px touch targets on mobile
- [ ] T113 [US6] Verify color contrast meets WCAG 2.1 AA (4.5:1 for text)
- [ ] T114 [US6] Add loading="lazy" to below-fold images
- [ ] T115 [US6] Implement dynamic imports for heavy components
- [ ] T116 [US6] Optimize bundle size with code splitting
- [ ] T117 [US6] Add proper meta tags for SEO in src/app/layout.tsx
- [ ] T118 [US6] Create Open Graph image for social sharing
- [ ] T119 [US6] Add structured data (JSON-LD) for Person schema
- [ ] T120 [US6] Generate sitemap.xml for SEO
- [ ] T121 [US6] Create robots.txt file
- [ ] T122 [US6] Test keyboard navigation through all interactive elements
- [ ] T123 [US6] Test with screen reader (NVDA/VoiceOver)
- [ ] T124 [US6] Run Lighthouse audit (target 90+ for mobile and desktop)
- [ ] T125 [US6] Run axe-core accessibility tests
- [ ] T126 [US6] Test on slow 3G connection (< 3 second load time)
- [ ] T127 [US6] Test responsive layout on screen sizes 320px to 2560px
- [ ] T128 [US6] Verify Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)

**Checkpoint**: User Story 6 complete - site is accessible and performant for all users

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements and validation

- [ ] T129 [P] Add error boundary for React error handling
- [ ] T130 [P] Add 404 page with navigation back to home
- [ ] T131 [P] Implement console ASCII art easter egg
- [ ] T132 [P] Add Konami code trigger for fun animation
- [ ] T133 [P] Setup Google Analytics 4 (optional)
- [ ] T134 Optimize all images in public/images/ (< 500KB each)
- [ ] T135 Run bundle analysis and optimize if > 200KB
- [ ] T136 Code cleanup and remove console.logs
- [ ] T137 Update README.md with project documentation
- [ ] T138 Validate all environment variables are documented
- [ ] T139 Final Lighthouse audit on all pages
- [ ] T140 Run full accessibility audit
- [ ] T141 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T142 Mobile device testing (iOS and Android)
- [ ] T143 Verify all external links work correctly
- [ ] T144 Test contact form in production environment
- [ ] T145 Setup Vercel deployment with environment variables
- [ ] T146 Configure custom domain (if applicable)
- [ ] T147 Setup monitoring and analytics
- [ ] T148 Final QA pass against all acceptance criteria

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-8)**: All depend on Foundational phase completion
  - US1 (P1) and US2 (P1) are MVP-critical, should be done first
  - US3 (P2), US4 (P2), US6 (P2) can be done in parallel after MVP
  - US5 (P3) is enhancement, can be done last
- **Polish (Phase 9)**: Depends on all user stories being complete

### User Story Dependencies

All user stories are **independently testable** after Foundational phase:

- **US1 (P1)**: Can start after Foundational ✅ MVP CRITICAL
- **US2 (P1)**: Can start after Foundational ✅ MVP CRITICAL
- **US3 (P2)**: Can start after Foundational ✅ Independent
- **US4 (P2)**: Can start after Foundational ✅ Independent (requires Resend setup)
- **US5 (P3)**: Can start after Foundational ✅ Independent (enhances other stories)
- **US6 (P2)**: Can start after Foundational ✅ Independent (adds to all stories)

### Recommended MVP Scope

**MVP = User Story 1 + User Story 2** (Phases 1, 2, 3, 4)

This delivers:
- Professional identity and navigation ✅
- Project portfolio showcase ✅
- Deployable, demo-able portfolio

Add incrementally:
- User Story 3 (About section)
- User Story 4 (Contact form)
- User Story 6 (Accessibility/Performance polish)
- User Story 5 (Visual enhancements)

### Within Each User Story

- Models/data before components
- Core components before integration
- Basic functionality before animations
- Story complete before moving to next priority

### Parallel Opportunities

**Setup Phase (Phase 1)**:
- T003, T004, T005, T006, T007, T008, T009 can run in parallel

**Foundational Phase (Phase 2)**:
- T012, T013, T014, T015, T016, T017, T018 can run in parallel
- T019, T020, T021 can run in parallel

**User Story 1**:
- T022, T023 can run in parallel (different hooks)

**User Story 2**:
- T038 can run in parallel with other US2 tasks (different file)

**User Story 4**:
- T069, T070 can run in parallel with T075 (API vs frontend)

**User Story 5**:
- T092, T093 can run in parallel initially

**User Story 6**:
- T106, T107, T108, T109 can run in parallel (different files/concerns)

**Polish Phase**:
- T129, T130, T131, T132, T133 can run in parallel

---

## Parallel Example: User Story 1

```bash
# After Foundational Phase completes, launch US1 tasks in parallel:

# Custom hooks (parallel - different files):
Task T022: "Create useScrollProgress hook in src/hooks/useScrollProgress.ts"
Task T023: "Create useMediaQuery hook in src/hooks/useMediaQuery.ts"

# Then proceed with components sequentially (they depend on hooks):
Task T024: "Create Navigation component in src/components/Navigation.tsx"
Task T025: "Implement mobile menu in Navigation.tsx"
# ... etc
```

---

## Parallel Example: Multiple User Stories

```bash
# After Foundational Phase completes, if you have team capacity:

Developer A:
- Works on User Story 1 (Navigation & Hero) - Tasks T022-T037

Developer B:
- Works on User Story 2 (Projects) - Tasks T038-T052

Developer C:
- Works on User Story 3 (About) - Tasks T053-T068

# Each developer can complete their story independently
# Stories integrate on the main page without conflicts
```

---

## Implementation Strategy

### Approach 1: MVP First (Recommended for Solo Developer)

1. **Week 1**: Complete Phase 1 + Phase 2 (Foundation)
2. **Week 2**: Complete Phase 3 (User Story 1 - Navigation & Hero)
3. **Week 3**: Complete Phase 4 (User Story 2 - Projects Portfolio)
4. **STOP and VALIDATE**: Test MVP independently, deploy preview
5. **Week 4**: Add Phase 5 (User Story 3 - About)
6. **Week 5**: Add Phase 6 (User Story 4 - Contact)
7. **Week 6**: Add Phase 8 (User Story 6 - Accessibility) + Phase 7 (User Story 5 - Polish)
8. **Week 7**: Phase 9 (Final Polish) + Production deployment

### Approach 2: Parallel Team Strategy

With 3 developers:

1. **Day 1-2**: All devs complete Setup + Foundational together
2. **Day 3-10**: Once foundation done:
   - Dev A: US1 (Navigation/Hero) + US4 (Contact)
   - Dev B: US2 (Projects) + US5 (Visual Polish)
   - Dev C: US3 (About) + US6 (Accessibility)
3. **Day 11-12**: Integration testing + Phase 9 (Polish)
4. **Day 13-14**: Final QA + Deployment

### Approach 3: Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add US1 → Test independently → Deploy preview (Basic portfolio!)
3. Add US2 → Test independently → Deploy preview (MVP with projects!)
4. Add US3 → Test independently → Deploy preview (Full profile!)
5. Add US4 → Test independently → Deploy preview (Contact enabled!)
6. Add US6 → Test independently → Deploy preview (Accessible & performant!)
7. Add US5 → Test independently → Deploy production (Polished final version!)

Each increment is deployable and adds value without breaking previous features.

---

## Validation Checkpoints

After each user story phase, validate independently:

**US1 Validation**:
- [ ] Homepage loads in < 1 second
- [ ] Name, title, and value proposition visible
- [ ] Navigation works smoothly to all sections
- [ ] Mobile menu opens/closes correctly
- [ ] Theme toggle works and persists
- [ ] Scroll progress indicator tracks position

**US2 Validation**:
- [ ] Projects section displays 3+ projects
- [ ] Project cards show title, description, tech tags, images
- [ ] Hover effects work on cards
- [ ] External links open correctly
- [ ] Images load optimized and fast

**US3 Validation**:
- [ ] About section displays with bento grid
- [ ] Professional photo loads with 3D tilt
- [ ] Bio text is readable and well-formatted
- [ ] Skills display with categories and proficiency
- [ ] Animations trigger on scroll

**US4 Validation**:
- [ ] Contact form validates inputs correctly
- [ ] Form submits and shows confirmation
- [ ] Email is sent to developer
- [ ] Honeypot blocks spam submissions
- [ ] Rate limiting prevents abuse
- [ ] Email copy to clipboard works

**US5 Validation**:
- [ ] All animations complete < 0.6 seconds
- [ ] Hover effects provide visual feedback
- [ ] Theme transitions smoothly
- [ ] Reduced motion mode works
- [ ] 60fps maintained during scroll

**US6 Validation**:
- [ ] Keyboard navigation works for all elements
- [ ] Screen reader announces content properly
- [ ] Lighthouse score 90+ mobile and desktop
- [ ] WCAG 2.1 AA compliance verified
- [ ] Site loads in < 3 seconds on 3G
- [ ] Responsive on all screen sizes

---

## Notes

- **[P] tasks** = different files, no dependencies - can run in parallel
- **[Story] label** maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **Tests are omitted** since not explicitly requested in specification
- Focus on manual testing per acceptance scenarios
- Refer to quickstart.md for detailed setup instructions
- Refer to research.md for implementation guidance on each technology
- Refer to data-model.md for data structure reference
- Refer to contracts/api-routes.md for API implementation details

---

## Task Summary

**Total Tasks**: 148 tasks across 9 phases

**Task Distribution by User Story**:
- Phase 1 (Setup): 9 tasks
- Phase 2 (Foundational): 12 tasks (CRITICAL - blocks all stories)
- Phase 3 (US1 - Navigation): 16 tasks ✅ MVP
- Phase 4 (US2 - Projects): 15 tasks ✅ MVP
- Phase 5 (US3 - About): 16 tasks
- Phase 6 (US4 - Contact): 23 tasks
- Phase 7 (US5 - Visual): 14 tasks
- Phase 8 (US6 - Accessibility): 23 tasks
- Phase 9 (Polish): 20 tasks

**MVP Tasks**: 52 tasks (Phases 1, 2, 3, 4)
**Full Implementation**: 148 tasks

**Parallel Opportunities**: 29 tasks marked [P] can run in parallel
**Independent Stories**: All 6 user stories can be developed independently after Foundational phase

**Estimated Timeline**:
- Solo developer: 6-8 weeks
- 2 developers: 4-5 weeks
- 3 developers: 3-4 weeks
