import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
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
      <ShaderGradientCanvas style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} pixelDensity={1.2} fov={45} lazyLoad>
        <ShaderGradient type="waterPlane" animate="on" uSpeed={0.16} uStrength={1.2} uDensity={1.3} uFrequency={3} color1="#123b2b" color2="#4f9a68" color3="#c9e9b9" cDistance={3.4} cPolarAngle={110} cAzimuthAngle={180} lightType="3d" envPreset="dawn" grain="on" grainBlending={0.18} />
      </ShaderGradientCanvas>
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
