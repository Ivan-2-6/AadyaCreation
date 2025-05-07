import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture, PerspectiveCamera, useGLTF, Float, Text } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'

function ParallaxBackground({ layers, scrollY, mouse }) {
  const group = useRef()
  const { viewport } = useThree()
  
  useFrame(({ clock }) => {
    if (!group.current) return
    
    // Apply parallax effect based on scroll position and mouse movement
    group.current.children.forEach((layer, i) => {
      const depth = 1 - i * 0.1 // Deeper layers move slower
      layer.position.y = scrollY.current * 0.01 * depth
      
      // Add subtle mouse movement effect
      layer.position.x = mouse.current.x * 0.02 * depth
      layer.position.z = -5 + i + Math.sin(clock.getElapsedTime() * 0.2 + i) * 0.1 // Subtle floating effect
    })
  })

  return (
    <group ref={group}>
      {layers.map((texture, i) => (
        <mesh key={i} position={[0, 0, -5 + i]} scale={[viewport.width, viewport.height, 1]}>
          <planeGeometry args={[1, 1, 32, 32]} />
          <meshBasicMaterial 
            map={texture} 
            transparent 
            opacity={0.9 - i * 0.15} 
            depthTest={false} 
            blending={THREE.AdditiveBlending} 
          />
        </mesh>
      ))}
    </group>
  )
}

function FloatingText({ scrollY }) {
  const textRef = useRef()
  
  useFrame(({ clock }) => {
    if (!textRef.current) return
    
    // Subtle floating animation
    textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    textRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.02
    
    // Fade out when scrolling
    textRef.current.material.opacity = Math.max(0, 1 - scrollY.current * 0.003)
  })
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={[0, 0, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-depthTest={false}
      >
        AADYA CREATIONS
      </Text>
    </Float>
  )
}

function Scene({ scrollY, mouse }) {
  // Create gradient textures for parallax layers
  const textures = useMemo(() => {
    const colors = [
      ['#240046', '#3c096c'],
      ['#3c096c', '#5a189a'],
      ['#5a189a', '#7b2cbf'],
      ['#7b2cbf', '#9d4edd']
    ]
    
    return colors.map(([colorA, colorB]) => {
      const canvas = document.createElement('canvas')
      canvas.width = 1024
      canvas.height = 1024
      const ctx = canvas.getContext('2d')
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, colorA)
      gradient.addColorStop(1, colorB)
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add some noise for texture
      ctx.globalAlpha = 0.05
      for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000'
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 2 + 1,
          Math.random() * 2 + 1
        )
      }
      
      return new THREE.CanvasTexture(canvas)
    })
  }, [])

  return (
    <>
      <ParallaxBackground layers={textures} scrollY={scrollY} mouse={mouse} />
      <FloatingText scrollY={scrollY} />
      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
      </EffectComposer>
    </>
  )
}

export default function HeroCanvas() {
  const scrollY = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    
    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <Scene scrollY={scrollY} mouse={mouse} />
    </Canvas>
  )
}