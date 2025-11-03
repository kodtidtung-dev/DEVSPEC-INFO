'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mousePosition = useMousePosition()

  // Calculate parallax based on mouse position
  const targetRotation = useMemo(() => {
    const x = (mousePosition.x / window.innerWidth - 0.5) * 0.5
    const y = (mousePosition.y / window.innerHeight - 0.5) * 0.5
    return { x: y, y: x }
  }, [mousePosition])

  useFrame((state) => {
    if (!meshRef.current) return

    // Smooth rotation following mouse
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.x,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.y,
      0.05
    )

    // Continuous slow rotation
    meshRef.current.rotation.z += 0.001

    // Float animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
  })

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#FF3333"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const count = 200
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.02}
        color="#FF3333"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function ThreeOrb() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#FF3333" />

        <AnimatedOrb />
        <ParticleField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
