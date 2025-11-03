import type { TechnologyItem, GroupedTechnologies, TechCategory } from '../types';

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

/**
 * Get all unique categories from technologies
 */
export function getCategories(technologies: TechnologyItem[]): TechCategory[] {
  const categories = new Set(technologies.map(t => t.category));
  return Array.from(categories) as TechCategory[];
}
