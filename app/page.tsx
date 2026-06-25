'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'

function Butterfly() {
  const group = useRef<any>(null)

  const { scene } = useGLTF('/model/butterfly.glb')

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (group.current) {
      // Circular flight path around user
      group.current.position.x = Math.sin(t) * 3
      group.current.position.z = -3 + Math.cos(t) * 3
      group.current.position.y = 1.8 + Math.sin(t * 3) * 0.4

      // Face flight direction
      group.current.rotation.y = -t

      // Slight tilt while flying
      group.current.rotation.z = Math.sin(t * 5) * 0.2
    }
  })

  return (
    <primitive
      ref={group}
      object={scene}
      scale={0.02}
    />
  )
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 1.6, 5], fov: 75 }}>

        {/* Sky */}
        <color attach="background" args={['#87CEEB']} />

        {/* Lighting */}
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[10, 15, 10]}
          intensity={3}
        />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#6dbf4b" />
        </mesh>

        {/* Butterfly */}
        <Butterfly />

      </Canvas>
    </div>
  )
}