import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Placeholder model component until you have actual 3D models
function Model({ position, rotation, scale, color }) {
  const mesh = useRef()
  
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
    </mesh>
  )
}

// Asset types with placeholder colors
const assetTypes = [
  { name: 'Hangar', color: '#e74c3c', scale: [2.5, 2, 2] },
  { name: 'Octonorm', color: '#3498db', scale: [2, 2.5, 2] },
  { name: 'Stalls', color: '#2ecc71', scale: [2, 2, 2.5] },
  { name: 'Furniture', color: '#f39c12', scale: [2.2, 2.2, 2.2] },
  { name: 'Flex Printing', color: '#9b59b6', scale: [2.3, 1.8, 1.8] }
]

function AssetDisplay({ currentAsset }) {
  const asset = assetTypes[currentAsset]
  
  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 300 }}
    >
      <Model 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
        scale={asset.scale} 
        color={asset.color} 
      />
      <Environment preset="city" />
    </PresentationControls>
  )
}

export default function AssetModels({ currentAsset }) {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <AssetDisplay currentAsset={currentAsset} />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={7} blur={2.4} />
    </Canvas>
  )
}