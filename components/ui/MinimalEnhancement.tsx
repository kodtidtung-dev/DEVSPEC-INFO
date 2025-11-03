'use client'

import CursorLightTrail from '@/components/effects/CursorLightTrail'

export default function MinimalEnhancement() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Cursor Light Trail - Global */}
      <CursorLightTrail />
    </div>
  )
}
