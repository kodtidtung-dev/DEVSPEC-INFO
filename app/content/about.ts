import type { AboutSectionProps } from '@/components/sections/About/types';

export const aboutContent: AboutSectionProps = {
  profile: {
    name: "TUNG PAKAPON",
    title: "Full-Stack Developer",
    bio: "I’m a full-stack developer who builds web applications that don’t just look good — they move businesses forward. With experience in both development and product thinking, I focus on creating solutions that balance clean code, user experience, and real-world impact.My goal is to help brands turn ideas into digital products that drive growth and long-term value.",
    profileImage: "/mesmile2nobg.png",
    profileImageAlt: "DEVSPEC profile photo"
  },

  philosophyCards: [
    {
      id: 'who-i-am',
      label: 'Who I Am',
      title: 'Developer who thinks like a product strategist',
      icon: 'User',
      description: 'Developer who loves clean code & exceptional UX and connect technical decisions to business outcomes',
      color: '#FF3333'
    },
    {
      id: 'what-i-do',
      label: 'What I do',
      title: 'Build scalable, user-centric web solutions',
      icon: 'Briefcase',
      description: 'From MVPs to production systems, built to deliver value and scale',
      color: '#FF8533'
    },
    {
      id: 'why-i-do-it',
      label: 'Why I Do It',
      title: 'Because good software should create impact',
      icon: 'Heart',
      description: 'Code is just the tool — understanding people and goals is the real craft',
      color: '#B833FF'
    },
    {
      id: 'my-approach',
      label: 'My Approach',
      title: 'Product-first mindset, engineered for performance',
      icon: 'Target',
      description: 'Each feature starts with purpose, ends with measurable results',
      color: '#3399FF'
    }
  ],

  techStack: [
    // Frontend
    { id: 'react', name: 'React', category: 'Frontend', icon: 'Component', logoSlug: 'react', proficiency: 5 },
    { id: 'nextjs', name: 'Next.js', category: 'Frontend', icon: 'Zap', logoSlug: 'nextdotjs', proficiency: 5 },
    { id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: 'Code', logoSlug: 'typescript', proficiency: 4 },
    { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'Palette', logoSlug: 'tailwindcss', proficiency: 5 },

    // Backend
    { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: 'Server', logoSlug: 'nodedotjs', proficiency: 4 },
    { id: 'express', name: 'Express', category: 'Backend', icon: 'Route', logoSlug: 'express', proficiency: 4 },
    { id: 'mongodb', name: 'MongoDB', category: 'Backend', icon: 'Database', logoSlug: 'mongodb', proficiency: 3 },

    // Tools
    { id: 'git', name: 'Git', category: 'Tools', icon: 'GitBranch', logoSlug: 'git', proficiency: 5 },
    { id: 'docker', name: 'Docker', category: 'Tools', icon: 'Container', logoSlug: 'docker', proficiency: 3 },
    { id: 'vscode', name: 'VS Code', category: 'Tools', icon: 'FileCode', logoUrl: 'https://code.visualstudio.com/favicon.ico', proficiency: 5 },
    { id: 'figma', name: 'Figma', category: 'Tools', icon: 'Figma', logoSlug: 'figma', proficiency: 4 }
  ],

  values: [
    {
      id: 'clean-code',
      title: 'Clean Code',
      emoji: '💎',
      description: 'Readable code is maintainable code',
      details: 'I write code that humans can read and understand. Clean, well-structured code reduces bugs and makes collaboration seamless.'
    },
    {
      id: 'user-first',
      title: 'User-First',
      emoji: '🎯',
      description: 'Every feature serves user needs',
      details: 'Users are at the center of every decision. Features exist to solve real problems, not just to showcase technology.'
    },
    {
      id: 'continuous-learning',
      title: 'Continuous Learning',
      emoji: '📚',
      description: 'Technology evolves, so do I',
      details: 'The web moves fast. I stay current with new tools, patterns, and best practices to deliver modern solutions.'
    },
    {
      id: 'performance',
      title: 'Performance',
      emoji: '⚡',
      description: 'Speed is a feature, not a luxury',
      details: 'Fast applications create better experiences. I optimize for performance from day one, not as an afterthought.'
    }
  ]
};
