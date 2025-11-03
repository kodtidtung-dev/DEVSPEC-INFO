/**
 * Global Spaceship Effect Component
 * Client component wrapper for SpaceshipPatrol effect
 */

'use client';

import dynamic from 'next/dynamic';

// Lazy load SpaceshipPatrol for spaceship effect
const SpaceshipPatrol = dynamic(() => import('@/components/effects/SpaceshipPatrol'), {
  ssr: false,
});

export function GlobalSpaceshipEffect() {
  return <SpaceshipPatrol />;
}
