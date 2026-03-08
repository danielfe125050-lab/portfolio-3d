import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, useCursor, useTexture, Html, RoundedBox, Image } from '@react-three/drei'
import * as THREE from 'three'
import { playHoverSound, playClickSound } from '../utils/audio'

export default function Frame({ project, position, rotation, onClick, isActive }) {
  const [hovered, setHovered] = useState(false)
  const frameRef = useRef()
  useCursor(hovered)

  const { viewport } = useThree()
  const isMobile = viewport.width < 10

  // The Image component works better with URLs for rounded corners, 
  // but if we are manually texturing something like the pricing placeholder, we might still need useTexture for regular meshes.
  // We'll use Image for projects, and a manual material for pricing.

  // Smooth hover animation for the light/scale using useFrame
  useFrame((state, dt) => {
    if (frameRef.current) {
      // Animate the emissive intensity based on hover/active state
      const targetScale = isActive ? 1.05 : hovered ? 1.02 : 1
      frameRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group position={position} rotation={rotation} ref={frameRef}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!isActive) playHoverSound();
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation()
          if (!isActive) playClickSound();
          onClick()
        }}
        visible={false} // Invisible hit box
        position={[0, 0, 0]}
      >
        <boxGeometry args={[3.2, 4.2, 0.4]} />
        <meshBasicMaterial depthWrite={false} color="red" />
      </mesh>

      {/* Emissive glow around the screen. Put behind the frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.3, 4.3, 0.1]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={hovered || isActive ? 2 : 0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* The Frame border - Now with Rounded Corners! */}
      <RoundedBox args={[3.2, 4.2, 0.2]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* The Screen */}
      <group position={[0, 0, 0.11]}>
        {project.isPricing ? (
          <RoundedBox args={[3, 4, 0.02]} radius={0.1} smoothness={4}>
            <meshBasicMaterial color="#111111" />
          </RoundedBox>
        ) : (
          project.image ? (
            <Image url={project.image} scale={[3, 4]} radius={0.1} position={[0, 0, 0]} toneMapped={false} />
          ) : null
        )}
      </group>

      {/* Internal Text for Pricing Card */}
      {project.isPricing && (
        <group position={[0, 0, 0.13]}>
          <Text fontSize={0.5} position={[0, 0.4, 0]} color="#fbbf24" anchorX="center" anchorY="middle" letterSpacing={0.05} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hjp-Ek-_EeA.woff">
            SERVICIOS
          </Text>
          <Text fontSize={0.2} position={[0, -0.2, 0]} color="#ffffff" anchorX="center" anchorY="middle" letterSpacing={0.1}>
            Y PLANES VIP
          </Text>
        </group>
      )}

      {/* Project details floating below the frame */}
      <group position={[0, -2.5, 0]}>
        {/* Dark background pill for text legibility */}
        <RoundedBox args={[isMobile ? 2.8 : 3.5, 0.8, 0.05]} radius={0.15} position={[0, -0.2, -0.05]}>
          <meshBasicMaterial color="#000000" transparent opacity={0.6} depthWrite={false} />
        </RoundedBox>

        <Text
          position={[0, 0.1, 0]}
          fontSize={isMobile ? 0.25 : 0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          {project.name}
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={isMobile ? 0.14 : 0.18}
          color="#f1f5f9"
          anchorX="center"
          anchorY="middle"
          maxWidth={isMobile ? 2.5 : 3}
          textAlign="center"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {project.description}
        </Text>
      </group>
    </group>
  )
}
