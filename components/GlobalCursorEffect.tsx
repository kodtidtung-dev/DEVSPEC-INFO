/**
 * Global Cursor Effect Component
 * Client component wrapper for MinimalEnhancement cursor effect
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load MinimalEnhancement for cursor effect
const MinimalEnhancement = dynamic(
  () => import('@/components/ui/MinimalEnhancement'),
  { ssr: false }
);

export function GlobalCursorEffect() {
  return <MinimalEnhancement />;
}
