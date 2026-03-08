import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial, CameraControls, ContactShadows, Text, Stars, RoundedBox } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import Frame from './Frame'

export default function Scene({ active, setActive, projects }) {
    const controlsRef = useRef()
    const { viewport } = useThree()
    const isMobile = viewport.width < 10

    // Layout configuration
    const radius = 8
    const angleSpread = Math.PI * 0.75; // 135 degrees total spread for more space

    const calculatePosition = (index, total) => {
        // Spread the cards in a wide semicircle
        const angle = (index / (total - 1)) * angleSpread - (angleSpread / 2);
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * -radius // pushed back
        return [x, 1, z]
    }

    const calculateRotation = (index, total) => {
        const angle = (index / (total - 1)) * angleSpread - (angleSpread / 2);
        // face towards the center (0,0,0)
        return [0, -angle, 0]
    }

    useEffect(() => {
        if (!controlsRef.current) return

        if (active !== null) {
            // Find the active project
            const index = projects.findIndex(p => p.id === active)
            const [px, py, pz] = calculatePosition(index, projects.length)

            // Move camera close to the frame
            // We push the camera out along the normal vector by 5 units
            const angle = (index / (projects.length - 1)) * angleSpread - (angleSpread / 2);
            const cx = Math.sin(angle) * (radius - 5)
            const cz = Math.cos(angle) * -(radius - 5)

            controlsRef.current.setLookAt(
                cx, py, cz, // Camera position
                px, py, pz, // Look at target
                true // animate
            )
        } else {
            // Reset to general view
            controlsRef.current.setLookAt(
                0, isMobile ? 3 : 2, isMobile ? 12 : 8, // Camera position (Zoomed out on mobile)
                0, 1, -5, // Look at target
                true // animate
            )
        }
    }, [active, projects])

    return (
        <group>
            {/* The invisible background that catches clicks to reset view */}
            <mesh position={[0, 0, -15]} onClick={() => setActive(null)}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial visible={false} />
            </mesh>

            <CameraControls
                ref={controlsRef}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
                maxDistance={25}
                makeDefault
            />

            {/* The Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[100, 50]}
                    resolution={512}
                    mixBlur={1}
                    mixStrength={80}
                    roughness={1}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#0a0a0a"
                    metalness={0.5}
                />
            </mesh>

            {/* 3D Typography on the floor */}
            <group position={[0, -1.9, -1.5]} rotation={[-Math.PI / 2.5, 0, 0]} visible={active === null}>
                {/* Glowing Premium Base */}
                <RoundedBox args={[isMobile ? 5 : 8, isMobile ? 1.5 : 2.2, 0.05]} radius={0.15} position={[0, isMobile ? -0.1 : -0.2, -0.1]}>
                    <meshStandardMaterial color="#080812" metalness={0.8} roughness={0.2} transparent opacity={0.85} />
                </RoundedBox>
                {/* Thin emissive border behind the base */}
                <RoundedBox args={[isMobile ? 5.1 : 8.15, isMobile ? 1.6 : 2.35, 0.02]} radius={0.18} position={[0, isMobile ? -0.1 : -0.2, -0.12]}>
                    <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.6} transparent opacity={0.8} />
                </RoundedBox>

                <Text
                    position={[0, 0, 0]}
                    fontSize={isMobile ? 0.45 : 0.9}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={-0.02}
                    opacity={0.9}
                    transparent
                >
                    DISEÑO WEB QUE VENDE
                    <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.8} />
                </Text>

                <Text
                    position={[0, isMobile ? -0.4 : -0.6, 0]}
                    fontSize={isMobile ? 0.12 : 0.2}
                    color="#a1a1aa"
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.05}
                    maxWidth={8}
                    textAlign="center"
                    opacity={0.5}
                    transparent
                >
                    CONVIERTO VISITANTES EN CLIENTES CON EXPERIENCIAS DIGITALES MEMORABLES
                </Text>
            </group>

            {/* Some geometric pillars floating in the background for depth */}
            <mesh position={[-12, 0, -10]} castShadow>
                <boxGeometry args={[1, 15, 1]} />
                <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[12, -1, -8]} castShadow>
                <boxGeometry args={[1, 10, 1]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[0, 4, -15]} castShadow>
                <boxGeometry args={[20, 1, 1]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
            </mesh>

            {/* Project Frames */}
            {projects.map((project, i) => (
                <Frame
                    key={project.id}
                    project={project}
                    position={calculatePosition(i, projects.length)}
                    rotation={calculateRotation(i, projects.length)}
                    isActive={active === project.id}
                    onClick={() => setActive(project.id)}
                />
            ))}

            {/* Lighting and Effects */}
            <ambientLight intensity={0.2} />
            <spotLight position={[0, 10, 0]} intensity={1} penumbra={1} angle={0.8} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
            </EffectComposer>
        </group>
    )
}
