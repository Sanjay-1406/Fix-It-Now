import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import './FloatingCTA.css';

function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="floating-cta"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        >
          🛠️ Book Now
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default FloatingCTA;