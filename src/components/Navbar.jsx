import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge class names (replacing the cn import)
const cn = (...inputs) => twMerge(clsx(inputs));

// Define luminescent color variables
const GLOW_COLOR = "rgba(52, 152, 219, 0.6)"; // Bright blue glow
const ACCENT_COLOR = "#3498db";
const HOVER_COLOR = "#2ecc71"; // Green for hover effect

export const Navbar = ({ children, className }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child)}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(15px)",
        boxShadow: visible
          ? `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${GLOW_COLOR}`
          : `0 0 15px ${GLOW_COLOR}`,
        width: visible ? "80%" : "100%",
        y: visible ? 10 : 0,
        backgroundColor: visible ? "rgba(20, 30, 40, 0.85)" : "rgba(20, 30, 40, 0.7)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between rounded-full border-b border-blue-500/30 px-8 py-4 lg:flex",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex-1 flex flex-row items-center justify-center space-x-8 text-sm font-medium text-white",
        className
      )}>
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-white uppercase text-sm tracking-wider"
          key={`link-${idx}`}
          href={item.link}>
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-blue-500/10"
              style={{
                boxShadow: `0 0 15px ${HOVER_COLOR}`,
              }}
            />
          )}
          <span 
            className="relative z-20"
            style={{
              textShadow: hovered === idx ? `0 0 10px ${HOVER_COLOR}, 0 0 20px ${HOVER_COLOR}` : 'none',
            }}
          >
            {item.name}
          </span>
          {hovered === idx && (
            <motion.div
              layoutId="hovered-underline"
              className="absolute bottom-0 left-1/2 h-0.5 w-1/2 -translate-x-1/2"
              style={{
                background: `linear-gradient(90deg, transparent, ${HOVER_COLOR}, transparent)`,
                boxShadow: `0 0 10px ${HOVER_COLOR}, 0 0 20px ${HOVER_COLOR}`,
              }}
            />
          )}
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: "blur(15px)",
        boxShadow: visible
          ? `0 10px 30px rgba(0, 0, 0, 0.2), 0 0 20px ${GLOW_COLOR}`
          : `0 0 15px ${GLOW_COLOR}`,
        width: visible ? "90%" : "100%",
        backgroundColor: visible ? "rgba(20, 30, 40, 0.85)" : "rgba(20, 30, 40, 0.7)",
        borderRadius: visible ? "16px" : "0px",
        y: visible ? 10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between border-b border-blue-500/30 px-4 py-4 lg:hidden",
        className
      )}>
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }) => {
  return (
    <div
      className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-[rgba(20,30,40,0.9)] px-8 py-12 backdrop-blur-lg",
            className
          )}
          style={{
            boxShadow: `0 0 30px rgba(0, 0, 0, 0.3), 0 0 20px ${GLOW_COLOR}`,
          }}
        >
          {/* Background animation */}
          <motion.div
            className="absolute inset-0 rounded-lg z-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(52, 152, 219, 0.1), transparent 60%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="relative z-10 w-full">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="p-2 rounded-full relative"
      whileHover={{ scale: 1.1 }}
      style={{
        boxShadow: isOpen ? `0 0 15px ${GLOW_COLOR}` : 'none',
      }}
    >
      <div className="w-6 h-5 relative flex flex-col justify-between items-center">
        <motion.span 
          className="w-full h-0.5 bg-white rounded-full block"
          animate={{ 
            rotate: isOpen ? 45 : 0, 
            y: isOpen ? 9 : 0 
          }}
          style={{
            boxShadow: `0 0 5px ${GLOW_COLOR}`,
          }}
        />
        <motion.span 
          className="w-full h-0.5 bg-white rounded-full block"
          animate={{ opacity: isOpen ? 0 : 1 }}
          style={{
            boxShadow: `0 0 5px ${GLOW_COLOR}`,
          }}
        />
        <motion.span 
          className="w-full h-0.5 bg-white rounded-full block"
          animate={{ 
            rotate: isOpen ? -45 : 0, 
            y: isOpen ? -9 : 0 
          }}
          style={{
            boxShadow: `0 0 5px ${GLOW_COLOR}`,
          }}
        />
      </div>
    </motion.button>
  );
};

export const NavbarLogo = ({ className }) => {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative z-20 flex items-center space-x-2 px-4 py-2",
        className
      )}
    >
      <motion.div 
        className="relative px-4 py-2 rounded-md"
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <motion.span
          className="text-xl font-bold text-white tracking-wider"
          style={{ 
            textShadow: `0 0 8px ${GLOW_COLOR}, 0 0 12px ${GLOW_COLOR}`,
          }}
        >
          Aadya Creations
        </motion.span>
        <motion.div
          className="absolute inset-0 rounded-md z-[-1]"
          style={{
            background: `linear-gradient(90deg, rgba(52, 152, 219, 0.1), rgba(52, 152, 219, 0), rgba(52, 152, 219, 0.1))`,
            opacity: 0.6,
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-bold relative cursor-pointer transition duration-200 inline-block text-center";

  const variantStyles = {
    primary: `bg-blue-500 text-white hover:-translate-y-1`,
    secondary: "bg-transparent border border-blue-500/50 text-white hover:-translate-y-1",
    luminescent: "bg-blue-500/20 text-white border border-blue-400/30 hover:-translate-y-1",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative"
    >
      <Tag
        href={href || undefined}
        className={cn(baseStyles, variantStyles[variant], className)}
        style={{
          boxShadow: `0 0 15px ${GLOW_COLOR}`,
          textShadow: `0 0 5px ${GLOW_COLOR}`,
        }}
        {...props}
      >
        {children}
      </Tag>
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 z-[-1]"
        style={{
          boxShadow: `0 0 30px ${GLOW_COLOR}`,
        }}
        whileHover={{ opacity: 0.8 }}
      />
    </motion.div>
  );
};

// Example usage component that ties everything together
export const LuminescentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: "Services", link: "#services" },
    { name: "Gallery", link: "#gallery" },
    { name: "Assets", link: "#assets" },
    { name: "Contact", link: "#contact" }
  ];

  // Define accent colors
  const accentColor = "#3498db";
  const hoverColor = "#2980b9";

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      padding: '20px 40px',
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(44, 62, 80, 0.8)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold',
          color: 'white',
          letterSpacing: '1px'
        }}>
          Aadya Creations
        </div>
        
        {/* Desktop Navigation */}
        <ul style={{
          display: 'flex',
          gap: '40px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          '@media (max-width: 768px)': {
            display: 'none'
          }
        }}>
          {navItems.map((item, idx) => (
            <li key={`desktop-${idx}`}>
              <a 
                href={item.link}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  position: 'relative',
                  padding: '5px 0'
                }}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 1001,
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block'
            }
          }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div style={{
            width: '30px',
            height: '2px',
            backgroundColor: 'white',
            margin: '6px 0',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            width: '30px',
            height: '2px',
            backgroundColor: 'white',
            margin: '6px 0',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: isOpen ? 0 : 1
          }}></div>
          <div style={{
            width: '30px',
            height: '2px',
            backgroundColor: 'white',
            margin: '6px 0',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}></div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(44, 62, 80, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {navItems.map((item, idx) => (
              <li key={`mobile-${idx}`}>
                <a
                  href={item.link}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    fontWeight: '500',
                    letterSpacing: '1px',
                    display: 'block',
                    margin: '15px 0',
                    textShadow: `0 0 10px ${accentColor}`
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;