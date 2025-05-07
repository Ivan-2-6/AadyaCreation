// src/App.jsx
import './App.css';
import { LuminescentNavbar } from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import AssetsSlider from './components/AssetsSlider.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
  return (
    <div className="app">
      <LuminescentNavbar />
      <Hero />
      <Services />
      <section id="gallery" className="section">
        <Gallery />
      </section>
      
      <section id="assets" className="section">
        <AssetsSlider />
      </section>
      
      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Get in touch with us for your event needs</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;