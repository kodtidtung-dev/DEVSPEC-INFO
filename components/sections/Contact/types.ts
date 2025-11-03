/**
 * Contact Section Types
 * TypeScript interfaces for Contact components
 */

import { contactFormSchema } from '@/specs/001-modern-portfolio/contracts/data-schemas';
import type { z } from 'zod';

// Re-export form data type from schema
export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface QuickConnectProps {
  className?: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}
