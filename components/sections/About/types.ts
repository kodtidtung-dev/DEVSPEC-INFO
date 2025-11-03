/**
 * Type Definitions for About Section
 *
 * This file contains all TypeScript interfaces and types used in the About Section feature.
 * These contracts ensure type safety across all components.
 */

// ============================================================================
// Core Data Models
// ============================================================================

/**
 * Profile Content
 * Represents the developer's personal information and introduction
 */
export interface ProfileContent {
  /** Developer's full name */
  name: string;

  /** Professional title or role (e.g., "Full-Stack Developer") */
  title: string;

  /** Introduction biography (50-500 words) */
  bio: string;

  /** Path to profile image */
  profileImage: string;

  /** Accessibility alt text for profile image */
  profileImageAlt: string;
}

/**
 * Philosophy Card
 * Represents one of the four core professional philosophy cards
 */
export interface PhilosophyCard {
  /** Unique identifier */
  id: 'who-i-am' | 'what-i-do' | 'why-i-do-it' | 'my-approach';

  /** Optional label displayed above title (e.g., "Who I Am") */
  label?: string;

  /** Card title (e.g., "Developer who thinks like a product strategist") */
  title: string;

  /** Lucide icon name */
  icon: string;

  /** Card description (50-200 characters) */
  description: string;

  /** Optional accent color override (hex code) */
  color?: string;
}

/**
 * Technology Category
 * Categories for grouping technologies in the tech stack
 */
export type TechCategory = 'Frontend' | 'Backend' | 'Tools';

/**
 * Technology Item
 * Represents a single technology or tool
 */
export interface TechnologyItem {
  /** Unique identifier (lowercase-with-dashes) */
  id: string;

  /** Display name */
  name: string;

  /** Technology category */
  category: TechCategory;

  /** Lucide icon name or SVG path */
  icon: string;

  /** Optional proficiency level (1-5) */
  proficiency?: number;

  /** Optional Simple Icons slug for CDN logo (e.g., 'react', 'nextdotjs') */
  logoSlug?: string;

  /** Optional custom logo URL (overrides logoSlug if provided) */
  logoUrl?: string;
}

/**
 * Value Principle
 * Represents one of the four core value cards
 */
export interface ValuePrinciple {
  /** Unique identifier */
  id: 'clean-code' | 'user-first' | 'continuous-learning' | 'performance';

  /** Value title */
  title: string;

  /** Emoji icon */
  emoji: string;

  /** Value description/motto (20-100 characters) */
  description: string;

  /** Optional expanded explanation (100-300 characters) */
  details?: string;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * About Section Props
 * Top-level props for the main About section component
 */
export interface AboutSectionProps {
  /** Profile content */
  profile: ProfileContent;

  /** Philosophy cards (must be exactly 4) */
  philosophyCards: PhilosophyCard[];

  /** Technology stack items (minimum 3) */
  techStack: TechnologyItem[];

  /** Value principles (must be exactly 4) */
  values: ValuePrinciple[];

  /** Optional CSS classes */
  className?: string;

  /** Optional: toggle 3D ring effect (default: true) */
  showRing?: boolean;
}

/**
 * Profile Section Props
 * Props for the profile image and introduction section
 */
export interface ProfileSectionProps {
  /** Profile content */
  profile: ProfileContent;

  /** Show 3D orbital ring effect */
  showRing?: boolean;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Core Card Props
 * Props for individual philosophy card component
 */
export interface CoreCardProps {
  /** Philosophy card data */
  card: PhilosophyCard;

  /** Animation delay for stagger effect (in seconds) */
  delay?: number;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Philosophy Cards Props
 * Props for the philosophy cards grid container
 */
export interface PhilosophyCardsProps {
  /** Array of philosophy cards (must be 4) */
  cards: PhilosophyCard[];

  /** Optional CSS classes */
  className?: string;
}

/**
 * Tech Icon Props
 * Props for individual technology icon component
 */
export interface TechIconProps {
  /** Technology item data */
  tech: TechnologyItem;

  /** Click handler for burst effect */
  onClick?: (event: React.MouseEvent) => void;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Tech Stack Props
 * Props for the technology showcase component
 */
export interface TechStackProps {
  /** Array of technology items */
  technologies: TechnologyItem[];

  /** Optional CSS classes */
  className?: string;
}

/**
 * Value Card Props
 * Props for individual value principle card
 */
export interface ValueCardProps {
  /** Value principle data */
  value: ValuePrinciple;

  /** Animation delay for stagger effect (in seconds) */
  delay?: number;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Values Section Props
 * Props for the values cards container
 */
export interface ValuesSectionProps {
  /** Array of value principles (must be 4) */
  values: ValuePrinciple[];

  /** Optional CSS classes */
  className?: string;
}

// ============================================================================
// Helper Types
// ============================================================================

/**
 * Grouped Technologies
 * Technologies grouped by category for display
 */
export interface GroupedTechnologies {
  Frontend: TechnologyItem[];
  Backend: TechnologyItem[];
  Tools: TechnologyItem[];
}

/**
 * Animation Config
 * Configuration for scroll-reveal animations
 */
export interface AnimationConfig {
  /** Initial opacity */
  initialOpacity?: number;

  /** Initial Y offset */
  initialY?: number;

  /** Animation duration (seconds) */
  duration?: number;

  /** Animation delay (seconds) */
  delay?: number;

  /** Stagger delay between items (seconds) */
  stagger?: number;
}

/**
 * Burst Effect Config
 * Configuration for the burst effect on tech icons
 */
export interface BurstEffectConfig {
  /** Particle count */
  particleCount?: number;

  /** Spread angle (degrees) */
  spread?: number;

  /** Colors for particles */
  colors?: string[];

  /** Animation duration (milliseconds) */
  duration?: number;
}

// ============================================================================
// Validation Guards
// ============================================================================

/**
 * Type guard for ProfileContent
 */
export function isProfileContent(obj: unknown): obj is ProfileContent {
  const profile = obj as ProfileContent;
  return (
    typeof profile?.name === 'string' &&
    typeof profile?.title === 'string' &&
    typeof profile?.bio === 'string' &&
    typeof profile?.profileImage === 'string' &&
    typeof profile?.profileImageAlt === 'string'
  );
}

/**
 * Type guard for PhilosophyCard array (must be exactly 4)
 */
export function isPhilosophyCards(arr: unknown): arr is PhilosophyCard[] {
  return Array.isArray(arr) && arr.length === 4;
}

/**
 * Type guard for TechnologyItem array (minimum 3)
 */
export function isTechStack(arr: unknown): arr is TechnologyItem[] {
  return Array.isArray(arr) && arr.length >= 3;
}

/**
 * Type guard for ValuePrinciple array (must be exactly 4)
 */
export function isValuePrinciples(arr: unknown): arr is ValuePrinciple[] {
  return Array.isArray(arr) && arr.length === 4;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Group technologies by category
 */
export function groupTechnologies(technologies: TechnologyItem[]): GroupedTechnologies {
  return {
    Frontend: technologies.filter(t => t.category === 'Frontend'),
    Backend: technologies.filter(t => t.category === 'Backend'),
    Tools: technologies.filter(t => t.category === 'Tools')
  };
}

/**
 * Sort technologies within a category (alphabetically by name)
 */
export function sortTechnologies(technologies: TechnologyItem[]): TechnologyItem[] {
  return [...technologies].sort((a, b) => a.name.localeCompare(b.name));
}
