import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import './Preloader.css';

function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="preloader__logo"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          >
            <Wrench size={28} />
            <span>FixIt<span className="gradient-text">Now</span></span>
          </motion.div>
          <div className="preloader__bar">
            <motion.div
              className="preloader__barFill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;