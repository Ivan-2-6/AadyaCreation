import { motion } from 'framer-motion'

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'General Events',
      description: 'From weddings to birthday celebrations, we create memorable experiences for all your special occasions.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '🎉'
    },
    {
      id: 2,
      title: 'Corporate Events',
      description: 'Professional event management for conferences, product launches, team building, and corporate gatherings.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '💼'
    },
    {
      id: 3,
      title: 'Exhibitions',
      description: 'Comprehensive exhibition solutions including booth design, setup, and management for trade shows and expos.',
      image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: '🏢'
    }
  ]

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We specialize in creating exceptional experiences across various event categories
        </motion.p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={service.id} 
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              <div className="service-icon">{service.icon}</div>
              <img src={service.image} alt={service.title} className="service-img" />
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <motion.button 
                  className="service-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services