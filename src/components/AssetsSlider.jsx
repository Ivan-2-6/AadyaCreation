import { useState } from 'react'
import { motion } from 'framer-motion'
import AssetModels from './canvas/AssetModels'

const AssetsSlider = () => {
  const assets = [
    { id: 0, title: 'Hangar', description: 'Spacious and versatile structures for large events' },
    { id: 1, title: 'Octonorm', description: 'Modular exhibition systems for professional displays' },
    { id: 2, title: 'Stalls', description: 'Customizable booth solutions for exhibitions and trade shows' },
    { id: 3, title: 'Furniture', description: 'High-quality event furniture for comfort and style' },
    { id: 4, title: 'Flex Printing', description: 'Premium quality printing services for event branding' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? assets.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === assets.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <section id="assets" className="assets-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Assets
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our range of event assets and equipment
        </motion.p>
      </div>
      
      <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <AssetModels currentAsset={currentIndex} />
        </div>
        
        <div style={{ position: 'absolute', bottom: 20, left: 0, width: '100%', textAlign: 'center', zIndex: 10 }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#2c3e50' }}>
            {assets[currentIndex].title}
          </h3>
          <p style={{ fontSize: '1rem', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>
            {assets[currentIndex].description}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button 
              onClick={goToPrevious} 
              style={{ 
                background: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                margin: '0 10px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Previous asset"
            >
              ←
            </button>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {assets.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentIndex(index)}
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    background: index === currentIndex ? '#3498db' : '#bdc3c7', 
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label={`Go to asset ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNext} 
              style={{ 
                background: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                margin: '0 10px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Next asset"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AssetsSlider