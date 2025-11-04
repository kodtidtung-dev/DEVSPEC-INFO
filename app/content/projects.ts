/**
 * Projects Data
 * Contains all portfolio projects to be displayed in the Projects section
 */

import { Project, isProject, validateFeaturedProject } from '@/components/sections/Projects/types';

export const projects: Project[] = [
  {
    id: 'stock-management',
    title: 'Stock Management',
    description: 'Inventory system for small retail businesses and shops',
    detailedDescription: 'An affordable alternative to expensive enterprise inventory systems, designed specifically for small retail businesses. Features real-time stock tracking, low-stock alerts, sales analytics, and an intuitive dashboard for managing products efficiently.',
    technologies: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
    image: '/projects/placeholder-stock.jpg',
    githubUrl: 'https://github.com/kodtidtung-dev/Stock-Management-Demo',
    liveUrl: 'https://stock-management-demo-xawq.vercel.app',
    featured: true,
  },
  {
    id: 'ecommerce-fashion',
    title: 'E-Commerce Fashion Store',
    description: 'Modern e-commerce platform for fashion retail',
    detailedDescription: 'A comprehensive e-commerce web application built for a fashion clothing store. Features include product catalog with filtering, shopping cart, user authentication, order management, and secure payment integration. Built with modern web technologies for optimal performance and user experience.',
    technologies: [
      { name: 'Next.js' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase' },
    ],
    image: '/e-img.png',
    githubUrl: 'https://github.com/kodtidtung-dev/ecommerce-fashion',
    liveUrl: null,
    featured: false,
  },
  {
    id: 'dorm-management',
    title: 'Dorm Management System',
    description: 'Management system for small dormitories',
    detailedDescription: 'A complete dormitory management solution for small-scale operations. Streamlines tenant registration, room assignments, rent collection tracking, maintenance requests, and financial reporting. Designed to simplify administrative tasks and improve operational efficiency.',
    technologies: [
      { name: 'Vite' },
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Supabase' },
    ],
    image: '/dorm-management.png',
    githubUrl: 'https://github.com/kodtidtung-dev/dorm-management',
    liveUrl: null,
    featured: false,
  },
];

// Runtime validation (development only)
if (process.env.NODE_ENV === 'development') {
  // Validate each project
  projects.forEach((project, index) => {
    if (!isProject(project)) {
      console.error(`❌ Invalid project at index ${index}:`, project);
    }
  });

  // Validate exactly one featured project
  if (!validateFeaturedProject(projects)) {
    console.error('❌ Exactly one project must be featured!');
  } else {
    console.log('✅ Projects data validated successfully');
  }
}
