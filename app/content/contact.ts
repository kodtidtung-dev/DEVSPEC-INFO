/**
 * Contact Section Content
 * Centralized data for contact information and social links
 */

export interface SocialLink {
  platform: string;
  url: string;
  // include Instagram and Facebook as supported icon keys
  icon: 'Github' | 'Linkedin' | 'Twitter' | 'Mail' | 'Instagram' | 'Facebook';
  ariaLabel: string;
}

export interface AvailabilityStatus {
  status: 'available' | 'busy' | 'unavailable';
  message: string;
}

export interface ContactContent {
  heading: string;
  subheading: string;
  typingTexts: string[];
  email: string;
  socialLinks: SocialLink[];
  availability: AvailabilityStatus;
  formSettings: {
    showHoneypot: boolean;
    rateLimit: {
      maxRequests: number;
      windowMs: number;
    };
  };
}

export const contactContent: ContactContent = {
  heading: "Let's Build Together",
  subheading: "Have a project in mind? Let's make it happen.",
  typingTexts: [
    "const contact = { email, message }",
    "const reach = { linkedin, github }",
    "const build = { together, amazing }",
  ],
  email: "devspec26@gmail.com", // TODO: Replace with actual email
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/kodtidtung-dev', // TODO: Replace with actual URL
      icon: 'Github',
      ariaLabel: 'Visit my GitHub profile',
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/devspec.dev', // TODO: Replace with actual URL
      icon: 'Instagram',
      ariaLabel: 'Follow me on Instagram',
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61579394442936', // TODO: Replace with actual Page URL
      icon: 'Facebook',
      ariaLabel: 'Visit my Facebook page',
    },
    {
      platform: 'Twitter',
      url: 'https://x.com/Devspec26', // TODO: Replace with actual URL
      icon: 'Twitter',
      ariaLabel: 'Follow me on Twitter',
    },
  ],
  availability: {
    status: 'available',
    message: 'Available for freelance projects',
  },
  formSettings: {
    showHoneypot: true,
    rateLimit: {
      maxRequests: 3, // 3 submissions per hour
      windowMs: 3600000, // 1 hour in milliseconds
    },
  },
};
