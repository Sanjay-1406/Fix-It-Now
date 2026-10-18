import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";

const words = [
  "Technicians",
  "Plumbers",
  "Electricians",
  "Carpenters",
  "Painters",
];

function useTypewriter(words, speed = 100, pause = 1500) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(0, text.length + 1);
          setText(next);
          if (next === current) setTimeout(() => setDeleting(true), pause);
        } else {
          const next = current.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setIndex((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

function Hero({ onBookServiceClick, onBecomeProClick }) {
  const typed = useTypewriter(words);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div
        className="blob blob--blue blob--animate"
        style={{ top: "-100px", left: "-100px" }}
      />
      <div
        className="blob blob--purple blob--animate"
        style={{ bottom: "-120px", right: "-80px", animationDelay: "3s" }}
      />
      <div
        className="blob blob--pink blob--animate"
        style={{ top: "40%", right: "30%", animationDelay: "6s" }}
      />

      <motion.div
        className="hero__container"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity }}
      >
        <motion.div className="hero__content" style={{ y: yText }}>
          <motion.span variants={item} className="hero__badge">
            ⚡ Trusted by 10,000+ homes
          </motion.span>

          <motion.h1 variants={item} className="hero__title">
            Book Verified <br />
            <span className="gradient-text">{typed}</span>
            <span className="hero__caret">|</span>
            <br />
            in Minutes
          </motion.h1>

          <motion.p variants={item} className="hero__subtitle">
            Plumbers, electricians, carpenters & more — all in one place. Fast,
            reliable, and at your doorstep.
          </motion.p>

          <motion.div variants={item} className="hero__actions">
            <button
              className="btn btn--primary btn--lg btn--glow"
              onClick={onBookServiceClick}
            >
              Book a Service
            </button>

            <button
              className="btn btn--ghost btn--lg"
              onClick={onBecomeProClick}
            >
              Become a Pro
            </button>
          </motion.div>

          <motion.div variants={item} className="hero__trust">
            <div>
              <strong>10K+</strong>
              <span>Bookings</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Rating</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>Pros</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          className="hero__visual"
          style={{ y: yCard }}
        >
          <motion.div
            className="hero__card"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero__cardHeader">
              <span className="hero__dot" style={{ background: "#ef4444" }} />
              <span className="hero__dot" style={{ background: "#f59e0b" }} />
              <span className="hero__dot" style={{ background: "#10b981" }} />
            </div>
            <div className="hero__cardBody">
              <div className="hero__avatar">🧑‍🔧</div>
              <h4>Ravi Kumar</h4>
              <p>Plumber · 4.9★ · 5 yrs exp</p>
              <div className="hero__pills">
                <span>⚡ 30 min ETA</span>
                <span>💰 ₹299 onwards</span>
              </div>
              <button className="hero__cardBtn" onClick={onBookServiceClick}>Book Now</button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
