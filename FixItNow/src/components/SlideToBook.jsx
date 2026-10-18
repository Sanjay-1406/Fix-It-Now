import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import './SlideToBook.css';

function SlideToBook({ onBook, disabled = false, label = 'Slide to Book' }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [done, setDone] = useState(false);

  // Text fades as handle moves
  const textOpacity = useTransform(x, [0, 140], [1, 0]);
  const trackFill = useTransform(x, [0, 240], ['0%', '100%']);

  const handleDragEnd = async () => {
    const el = trackRef.current;
    if (!el) return;
    const maxX = el.offsetWidth - 62; // handle width + padding
    if (x.get() >= maxX - 20) {
      await animate(x, maxX, { type: 'spring', stiffness: 400, damping: 30 });
      setDone(true);
      onBook?.();
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
    }
  };

  return (
    <div
      ref={trackRef}
      className={`slide-book ${done ? 'is-done' : ''} ${disabled ? 'is-disabled' : ''}`}
    >
      <motion.div className="slide-book__fill" style={{ width: trackFill }} />
      <motion.span className="slide-book__label" style={{ opacity: textOpacity }}>
        {label}
      </motion.span>

      <motion.div
        className="slide-book__handle"
        drag={disabled || done ? false : 'x'}
        dragConstraints={trackRef}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.96 }}
      >
        {done ? <Check size={20} /> : <ChevronRight size={20} />}
      </motion.div>
    </div>
  );
}

export default SlideToBook;