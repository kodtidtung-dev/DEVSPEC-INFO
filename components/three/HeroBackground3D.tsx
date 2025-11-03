'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    // Continuous slow rotation
    meshRef.current.rotation.x += 0.0005
    meshRef.current.rotation.y += 0.001
    meshRef.current.rotation.z += 0.0003

    // Gentle float animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.2
  })

  return (
    <Sphere ref={meshRef} args={[2.5, 100, 100]} scale={1.2}>
      <MeshDistortMaterial
        color="#FF3333"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.6}
        emissive="#FF1111"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

export default function HeroBackground3D() {
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setShouldRender(false)
    }

    // Check if mobile (optional - reduce quality on mobile)
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      // You can choose to hide on mobile or just reduce quality
      // setShouldRender(false)
    }

    // Listener for reduced motion changes
    const handler = (e: MediaQueryListEvent) => {
      setShouldRender(!e.matches)
    }
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (!shouldRender) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} color="#FF5555" intensity={3} />
        <pointLight position={[-10, -10, -10]} color="#FF3333" intensity={2} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#FF3333" />

        <FloatingSphere />
      </Canvas>
    </div>
  )
}
