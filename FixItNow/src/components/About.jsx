import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

function CountUp({ end, suffix = '', duration = 1500 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function About() {
  return (
    <section className="about" id="about">
      <div className="blob blob--purple blob--animate" style={{ top: '-80px', right: '-100px' }} />

      <div className="about__container">
        <motion.div
          className="about__image"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="about__imageCard">🏠</div>
          <div className="about__imageBadge">✅ Verified Pros</div>
        </motion.div>

        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about__badge">About Us</span>
          <h2 className="about__title">
            Your Home, Our <span className="gradient-text">Expertise</span>
          </h2>
          <p className="about__text">
            At <strong>FixItNow</strong>, we connect you with verified, background-checked
            professionals across 12 different trades. From a leaking tap to a full home
            renovation — we make booking a service as easy as ordering food.
          </p>

          <ul className="about__list">
            <li>✅ Verified & background-checked pros</li>
            <li>✅ Transparent, upfront pricing</li>
            <li>✅ 100% satisfaction guarantee</li>
            <li>✅ 24/7 customer support</li>
          </ul>

          <div className="about__stats">
            <div className="about__stat">
              <h3><CountUp end={10} suffix="K+" /></h3>
              <p>Happy Homes</p>
            </div>
            <div className="about__stat">
              <h3><CountUp end={500} suffix="+" /></h3>
              <p>Verified Pros</p>
            </div>
            <div className="about__stat">
              <h3><CountUp end={49} suffix="★" /></h3>
              <p>Rating (4.9)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;