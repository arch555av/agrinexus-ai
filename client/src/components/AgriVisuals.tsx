import { MeshGradient } from '@paper-design/shaders-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { Mesh } from 'three'

function SignalMesh() {
  const mesh = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.x += delta * 0.14
    mesh.current.rotation.y += delta * 0.22
  })
  return (
    <mesh ref={mesh} scale={1.35}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial color="#8bc79b" metalness={0.35} roughness={0.28} wireframe />
    </mesh>
  )
}

export function AgriSignalOrb({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={compact ? 'signal-orb signal-orb-compact' : 'signal-orb'}
      initial={reduce ? false : { opacity: 0, scale: 0.9, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <MeshGradient
        colors={['#0f2619', '#2e7048', '#78bd87', '#e9f2db']}
        distortion={0.75}
        swirl={0.6}
        speed={0.16}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }}
      />
      <div className="orb-glass" aria-hidden="true" />
      <Canvas className="orb-canvas" camera={{ position: [0, 0, 3.1], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.4} />
        <pointLight position={[3, 2, 4]} intensity={2.2} color="#d6f5c7" />
        <SignalMesh />
      </Canvas>
      <div className="orb-caption">
        <span className="orb-pulse" />
        <span>Live farm intelligence</span>
      </div>
    </motion.div>
  )
}

export function GlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`glass-panel ${className}`}>{children}</div>
}
