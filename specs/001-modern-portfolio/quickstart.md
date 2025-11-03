# Quickstart Guide

**Feature**: Modern Frontend Developer Portfolio
**Date**: 2025-10-30
**Purpose**: Step-by-step guide to set up, develop, and deploy the portfolio

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Version 18.17 or higher ([Download](https://nodejs.org/))
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))
- **Resend Account**: For email service ([Sign up](https://resend.com/))
- **Vercel Account**: For deployment ([Sign up](https://vercel.com/))

**Verify Installation**:
```bash
node --version  # Should be v18.17+
npm --version   # Should be v9+
git --version   # Any recent version
```

## Project Setup

### Step 1: Initialize Next.js Project

```bash
# Create Next.js app with TypeScript and Tailwind
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project directory
cd portfolio
```

**Configuration Prompts**:
- Would you like to use TypeScript? **Yes**
- Would you like to use ESLint? **Yes**
- Would you like to use Tailwind CSS? **Yes**
- Would you like to use `src/` directory? **Yes**
- Would you like to use App Router? **Yes**
- Would you like to customize the default import alias? **No** (use @/*)

### Step 2: Install Dependencies

```bash
# Core dependencies
npm install framer-motion next-themes react-hook-form @hookform/resolvers zod resend lucide-react

# Development dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
npm install -D @playwright/test
npm install -D @axe-core/react
```

**Package Explanations**:
- `framer-motion`: Animation library
- `next-themes`: Theme management
- `react-hook-form`: Form handling
- `zod`: Schema validation
- `resend`: Email service SDK
- `lucide-react`: Icon library
- `@playwright/test`: E2E testing
- `@axe-core/react`: Accessibility testing

### Step 3: Project Structure Setup

```bash
# Create directory structure
mkdir -p src/{components,hooks,lib,data,types}
mkdir -p src/components/ui
mkdir -p src/app/api/contact
mkdir -p public/images/{projects,profile}
mkdir -p tests/{e2e,components}
mkdir -p specs/001-modern-portfolio/contracts
```

### Step 4: Environment Variables

Create `.env.local` in the project root:

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX # Optional: Google Analytics
```

**Getting Resend API Key**:
1. Sign up at [resend.com](https://resend.com/)
2. Verify your domain (or use onboarding@resend.dev for testing)
3. Go to "API Keys" in dashboard
4. Create new API key
5. Copy and paste into `.env.local`

Create `.env.local.example` for version control:

```bash
# .env.local.example
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=your@email.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=
```

**Add to `.gitignore`**:
```
.env.local
.env*.local
```

### Step 5: Tailwind Configuration

Update `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        // Light mode
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'text-primary': '#0A0A0A',
        'text-secondary': '#4A4A4A',
        accent: '#FF3333',
        'accent-hover': '#FF5555',
        // Dark mode
        'dark-background': '#0A0A0A',
        'dark-surface': '#141414',
        'dark-glass': 'rgba(255,255,255,0.05)',
        'dark-text-primary': '#F5F5F5',
        'dark-text-secondary': '#A0A0A0',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### Step 6: TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 7: Next.js Configuration

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Uncomment for bundle analysis
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     )
  //   }
  //   return config
  // },
}

module.exports = nextConfig
```

### Step 8: Create Type Definitions

Copy the schema file from planning docs:

```bash
cp specs/001-modern-portfolio/contracts/data-schemas.ts src/types/index.ts
```

### Step 9: Initial Data Files

Create `src/data/profile.ts`:

```typescript
import { Profile } from '@/types'

export const profile: Profile = {
  name: "Your Name",
  title: "Frontend Developer",
  tagline: "Building accessible, performant web applications with modern technologies",
  bio: "Replace with your bio...",
  email: "your@email.com",
  location: "Your Location",
  availability: "open-to-opportunities",
  image: {
    url: "/images/profile/photo.jpg",
    alt: "Portrait of Your Name",
    width: 800,
    height: 800
  },
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/yourusername",
      icon: "github",
      username: "yourusername"
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourusername",
      icon: "linkedin",
      username: "yourusername"
    }
  ],
  yearsOfExperience: 5
}
```

Create `src/data/projects.ts`:

```typescript
import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: "project-1",
    title: "Project Title",
    description: "Short description of the project for card display",
    longDescription: "Detailed description with features, challenges, and outcomes...",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: [
      {
        type: "screenshot",
        url: "/images/projects/project-1.png",
        alt: "Screenshot of project 1",
        width: 1920,
        height: 1080
      }
    ],
    links: {
      demo: "https://demo.example.com",
      github: "https://github.com/username/project"
    },
    featured: true,
    order: 1
  }
]
```

Create `src/data/skills.ts`:

```typescript
import { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend-frameworks",
    title: "Frontend Frameworks",
    skills: [
      { name: "React", proficiency: "expert", yearsOfExperience: 5 },
      { name: "Next.js", proficiency: "expert", yearsOfExperience: 3 },
      { name: "TypeScript", proficiency: "advanced", yearsOfExperience: 4 }
    ],
    order: 1
  }
]
```

## Development Workflow

### Running the Development Server

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

**Hot Reloading**: Changes to code automatically refresh the browser.

### Building for Production

```bash
# Create optimized production build
npm run build

# Test production build locally
npm start

# Open browser to http://localhost:3000
```

### Linting and Type Checking

```bash
# Run ESLint
npm run lint

# Run TypeScript compiler check
npx tsc --noEmit
```

### Testing

```bash
# Run unit tests
npm test

# Run unit tests in watch mode
npm test -- --watch

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e -- --ui

# Run accessibility tests
npm run test:a11y
```

## Implementation Order

Follow this order for building features:

### Phase 1: Foundation (Days 1-2)

1. **Setup and Configuration** ✅
   - Project initialization
   - Dependencies installation
   - Configuration files

2. **Type Definitions and Data**
   - Copy type definitions
   - Create initial data files
   - Validate data structure

3. **Basic Layout**
   - Root layout with theme provider
   - Font optimization
   - Global styles

### Phase 2: Core Components (Days 3-5)

4. **Navigation Component**
   - Fixed navigation bar
   - Mobile hamburger menu
   - Scroll progress indicator
   - Theme toggle

5. **Hero Section**
   - Animated text reveal
   - Typewriter effect
   - CTA buttons

6. **About Section**
   - Bento grid layout
   - Skills display
   - Professional photo

### Phase 3: Projects and Contact (Days 6-8)

7. **Projects Section**
   - Project cards
   - Image carousel
   - Technology tags
   - External links

8. **Contact Section**
   - Contact form with validation
   - Honeypot spam protection
   - API route for email
   - Success/error states

### Phase 4: Polish and Optimization (Days 9-10)

9. **Animations and Interactions**
   - Framer Motion integration
   - Scroll animations
   - Hover effects
   - Page transitions

10. **Accessibility**
    - Keyboard navigation
    - ARIA labels
    - Focus indicators
    - Screen reader testing

11. **Performance Optimization**
    - Image optimization
    - Code splitting
    - Bundle analysis
    - Lighthouse audit

### Phase 5: Testing and Deployment (Days 11-12)

12. **Testing**
    - Unit tests for components
    - E2E tests for user flows
    - Accessibility tests
    - Performance tests

13. **SEO and Metadata**
    - Meta tags
    - Open Graph tags
    - Sitemap generation
    - robots.txt

14. **Deployment**
    - Vercel setup
    - Environment variables
    - Domain configuration
    - Analytics setup

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Portfolio foundation"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add each variable from `.env.local`:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (use your Vercel domain)
   - `NEXT_PUBLIC_GA_ID` (optional)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Visit your deployed site at `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for propagation (~24-48 hours)

## Troubleshooting

### Common Issues

**Port 3000 Already in Use**:
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

**Type Errors After Installing Packages**:
```bash
# Clear TypeScript cache
rm -rf .next
rm -rf node_modules/.cache

# Restart TypeScript server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Images Not Loading**:
- Ensure images are in `/public/images/` directory
- Check image paths start with `/images/...`
- Verify image dimensions are specified

**Email Not Sending**:
- Check Resend API key is correct
- Verify domain is verified in Resend dashboard
- Check server logs for errors
- Test with `onboarding@resend.dev` first

**Build Failures**:
```bash
# Clear build cache
rm -rf .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### Getting Help

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind Docs**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Framer Motion Docs**: [framer.com/motion](https://www.framer.com/motion/)
- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Next.js Discord**: [discord.gg/nextjs](https://discord.gg/nextjs)

## Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all dependencies
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

### Adding New Projects

1. Add optimized images to `/public/images/projects/`
2. Add project object to `src/data/projects.ts`
3. Rebuild and redeploy

### Updating Content

1. Edit data files in `src/data/`
2. Push changes to GitHub
3. Vercel automatically rebuilds and deploys

## Performance Checklist

Before deploying, ensure:

- [ ] All images optimized (< 500KB each)
- [ ] Lighthouse score 90+ (mobile and desktop)
- [ ] No console errors or warnings
- [ ] All links work correctly
- [ ] Contact form sends emails successfully
- [ ] Theme toggle works in both modes
- [ ] Mobile responsive on all screen sizes
- [ ] Keyboard navigation functional
- [ ] Fast load time on 3G connection
- [ ] SEO meta tags present
- [ ] Analytics tracking works

## Next Steps

After completing the quickstart:

1. **Customize Content**: Replace placeholder data with your actual information
2. **Add Projects**: Showcase your best work with detailed descriptions
3. **Optimize Images**: Compress and optimize all images
4. **Test Thoroughly**: Run all test suites and fix any issues
5. **Deploy**: Push to production on Vercel
6. **Monitor**: Set up analytics and monitor performance
7. **Iterate**: Gather feedback and continuously improve

## Useful Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm start                # Start production server

# Testing
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:a11y        # Run accessibility tests

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npx tsc --noEmit         # Type check

# Analysis
npm run analyze          # Bundle size analysis
npx lighthouse <url>     # Lighthouse audit

# Deployment
git push origin main     # Deploy to Vercel (if connected)
vercel                   # Deploy to Vercel CLI
vercel --prod            # Deploy to production
```

## Summary

You should now have:
- ✅ Complete project structure
- ✅ All dependencies installed
- ✅ Environment variables configured
- ✅ Type definitions in place
- ✅ Initial data files created
- ✅ Development server running
- ✅ Clear implementation roadmap

**Estimated Time to Complete**: 10-12 days for full implementation

**Ready to start coding!** Follow the implementation order and refer to research.md and data-model.md for detailed guidance on each component.
