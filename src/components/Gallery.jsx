import { motion } from 'framer-motion'

const Gallery = () => {
  // Sample gallery items - replace with actual content
  const galleryItems = [
    { id: 1, title: 'Corporate Conference', category: 'Corporate Events', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Wedding Celebration', category: 'General Events', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Trade Show Booth', category: 'Exhibitions', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Product Launch', category: 'Corporate Events', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Birthday Party', category: 'General Events', image: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Art Exhibition', category: 'Exhibitions', image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ]

  return (
    <section id="gallery" className="section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Portfolio
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our past events and creative solutions
        </motion.p>
        
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="gallery-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img src={item.image} alt={item.title} className="gallery-img" />
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
                <p>{item.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery