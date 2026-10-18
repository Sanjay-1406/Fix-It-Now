import { motion } from 'framer-motion';
import './HowItWorks.css';

const steps = [
  { icon: '🔍', title: 'Choose a Service', desc: 'Pick from 12 categories of home services.' },
  { icon: '📅', title: 'Book a Slot',      desc: 'Select your date, time, and address.' },
  { icon: '✅', title: 'Get it Done',      desc: 'Verified pro arrives, fixes it, you relax.' },
];

function HowItWorks() {
  return (
    <section className="how" id="how">
      <motion.h2
        className="how__title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        How It <span className="gradient-text">Works</span>
      </motion.h2>
      <motion.p
        className="how__subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Get help in 3 simple steps
      </motion.p>

      <div className="how__grid">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            className="how__step"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className="how__number">0{i + 1}</div>
            <div className="how__stepIcon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;