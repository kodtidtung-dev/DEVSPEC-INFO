/**
 * Type Definitions for Projects Section
 *
 * This file contains all TypeScript interfaces and types used in the Projects Section.
 * These contracts ensure type safety across all components.
 */

// ============================================================================
// Core Data Models
// ============================================================================

/**
 * Technology Item
 * Represents a single technology or framework used in a project
 */
export interface Technology {
  /** Technology name (e.g., "Next.js", "TypeScript") */
  name: string;

  /** Optional custom color hex code (defaults to --accent-red if not provided) */
  color?: string;
}

/**
 * Project
 * Represents a portfolio project with all metadata
 */
export interface Project {
  /** Unique identifier in kebab-case (e.g., "stock-management") */
  id: string;

  /** Project display title */
  title: string;

  /** Brief description for card front (20-150 chars) */
  description: string;

  /** Detailed description for flip card back (100-500 chars) */
  detailedDescription: string;

  /** Array of technologies used in the project */
  technologies: Technology[];

  /** Path to project image (e.g., "/projects/placeholder-stock.jpg") */
  image: string;

  /** GitHub repository URL */
  githubUrl: string;

  /** Live demo URL (null if not deployed) */
  liveUrl: string | null;

  /** Whether this project should be featured (only one should be true) */
  featured: boolean;
}

// ============================================================================
// Component Props
// ============================================================================

/**
 * Projects Section Props
 * Top-level props for the main Projects section component
 */
export interface ProjectsSectionProps {
  /** Array of all projects (at least 1 must be featured) */
  projects: Project[];

  /** Optional CSS classes */
  className?: string;
}

/**
 * Featured Project Card Props
 * Props for the large featured project card
 */
export interface FeaturedProjectCardProps {
  /** Featured project data */
  project: Project;

  /** Animation delay for stagger effect (in seconds) */
  delay?: number;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Project Flip Card Props
 * Props for flip card component
 */
export interface ProjectFlipCardProps {
  /** Project data for the flip card */
  project: Project;

  /** Animation delay for stagger effect (in seconds) */
  delay?: number;

  /** Optional CSS classes */
  className?: string;
}

/**
 * Technology Badge Props
 * Props for individual tech badge component
 */
export interface TechnologyBadgeProps {
  /** Technology data */
  technology: Technology;

  /** Optional CSS classes */
  className?: string;
}

// ============================================================================
// Validation Guards
// ============================================================================

/**
 * Type guard for Technology
 */
export function isTechnology(obj: unknown): obj is Technology {
  const tech = obj as Technology;
  return (
    typeof tech?.name === 'string' &&
    tech.name.length >= 2 &&
    tech.name.length <= 30 &&
    (tech.color === undefined || /^#[0-9A-F]{6}$/i.test(tech.color))
  );
}

/**
 * Type guard for Project
 */
export function isProject(obj: unknown): obj is Project {
  const project = obj as Project;
  return (
    typeof project?.id === 'string' &&
    typeof project?.title === 'string' &&
    typeof project?.description === 'string' &&
    typeof project?.detailedDescription === 'string' &&
    Array.isArray(project?.technologies) &&
    project.technologies.every(isTechnology) &&
    typeof project?.image === 'string' &&
    (project.image.startsWith('/projects/') || project.image.startsWith('/')) &&
    typeof project?.githubUrl === 'string' &&
    project.githubUrl.startsWith('https://github.com/') &&
    (project?.liveUrl === null ||
     (typeof project.liveUrl === 'string' && project.liveUrl.startsWith('https://'))) &&
    typeof project?.featured === 'boolean'
  );
}

/**
 * Validate that exactly one project is featured
 */
export function validateFeaturedProject(projects: Project[]): boolean {
  const featuredCount = projects.filter(p => p.featured).length;
  return featuredCount === 1;
}

/**
 * Get the featured project from an array
 */
export function getFeaturedProject(projects: Project[]): Project | undefined {
  return projects.find(p => p.featured);
}

/**
 * Get non-featured projects from an array
 */
export function getRegularProjects(projects: Project[]): Project[] {
  return projects.filter(p => !p.featured);
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Project without internal fields (for display)
 */
export type ProjectDisplay = Omit<Project, 'id' | 'featured'>;

/**
 * Project card variant type
 */
export type ProjectCardVariant = 'featured' | 'flip';
