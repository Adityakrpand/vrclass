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
      group.current.position.x = Math.sin(t) * 2
      group.current.position.y = 2 + Math.sin(t * 3) * 0.5
      group.current.position.z = Math.cos(t) * 2

      group.current.rotation.y += 0.02
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
      <Canvas camera={{ position: [0, 2, 5] }}>

        <ambientLight intensity={2} />

        <directionalLight position={[5, 5, 5]} />

        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="green" />
        </mesh>

        <Butterfly />

      </Canvas>
    </div>
  )
}