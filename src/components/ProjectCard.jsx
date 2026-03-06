import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Image, Text } from '@react-three/drei'

export default function ProjectCard({ position, rotation, project, onClick, active }) {
    const group = useRef()
    const [hovered, setHovered] = useState(false)

    useFrame((state, delta) => {
        if (!active) {
            // Gentle floating animation when not active
            group.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.002
            // Rotate slightly on hover
            const targetRotationY = hovered ? 0.1 : 0
            const targetRotationX = hovered ? -0.1 : 0
            group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 4 * delta
            group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 4 * delta
        } else {
            // Return to flat if active
            group.current.rotation.y += (0 - group.current.rotation.y) * 2 * delta
            group.current.rotation.x += (0 - group.current.rotation.x) * 2 * delta
        }
    })

    return (
        <group ref={group} position={position} rotation={rotation}>
            <mesh
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
                onClick={(e) => { e.stopPropagation(); onClick() }}
            >
                <planeGeometry args={[3, 4]} />
                <meshStandardMaterial color={hovered ? '#4c1d95' : '#1e1b4b'} />

                {/* Project Title Text directly embedded on the card */}
                <Text
                    position={[0, -1.2, 0.01]}
                    fontSize={0.25}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {project.name}
                </Text>

                <Text
                    position={[0, -1.6, 0.01]}
                    fontSize={0.12}
                    color="#a78bfa"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={2.5}
                    textAlign="center"
                >
                    {project.description}
                </Text>
            </mesh>
        </group>
    )
}
