import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import './BackToTop.css';

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Check initial position (in case they refresh halfway down)
    const checkScroll = () => {
      if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check immediately on mount
    checkScroll();

    // 2. Listen to scroll events (with { passive: true } for mobile smoothness)
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('touchmove', checkScroll, { passive: true }); // Mobile specific fix

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('touchmove', checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp size={22} strokeWidth={2.5} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BackToTop;