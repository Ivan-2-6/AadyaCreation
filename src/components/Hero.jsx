import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroCanvas from './canvas/HeroCanvas'

const Hero = () => {
  const heroRef = useRef()
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: '#2980b9',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    tap: {
      scale: 0.95
    }
  }

  // Split text for character animation
  const titleText = "Aadya Creations"
  const titleChars = titleText.split('')
  
  return (
    <div ref={heroRef} className="hero-section">
      <HeroCanvas />
      
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial="hidden"
          animate="visible"
          style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
        >
          {titleChars.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={i}
              variants={titleVariants}
              style={{ display: 'inline-block', marginRight: char === ' ' ? '0.5em' : '0.02em' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          Bringing your event visions to life
        </motion.p>
        
        <motion.a 
          href="#services"
          className="btn"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          Explore Our Services
        </motion.a>
      </div>
      
      <motion.div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          opacity: 0.7
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>Scroll to explore</p>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero