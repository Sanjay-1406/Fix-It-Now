import { motion } from 'framer-motion';
import { ArrowLeft, User, Briefcase, ChevronRight, Wrench } from 'lucide-react';
import './RoleSelector.css';

const ROLES = [
  {
    id: 'customer',
    label: 'Customer',
    tagline: 'Book trusted pros for your home',
    icon: User,
    accent: 'blue',
  },
  {
    id: 'provider',
    label: 'Service Provider',
    tagline: 'Earn more by serving customers',
    icon: Briefcase,
    accent: 'purple',
  },
];

function RoleSelector({ mode, onSelect, onBack }) {
  // mode = 'login' | 'register'
  const verb = mode === 'login' ? 'log in' : 'sign up';

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="roles">
      <div className="blob blob--blue blob--animate" style={{ top: '-100px', left: '-80px' }} />
      <div className="blob blob--purple blob--animate" style={{ bottom: '-120px', right: '-100px', animationDelay: '3s' }} />
      <div className="blob blob--pink blob--animate" style={{ top: '45%', right: '25%', animationDelay: '6s' }} />

      <motion.button
        className="roles__back"
        onClick={onBack}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Back"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </motion.button>

      <motion.div className="roles__card" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="roles__logo">
          <span className="roles__logoMark">
            <Wrench size={18} strokeWidth={2.5} />
          </span>
          <span className="roles__logoText">
            FixIt<span className="gradient-text">Now</span>
          </span>
        </motion.div>

        <motion.h1 variants={item} className="roles__title">
          {mode === 'login' ? (
            <>How do you want to <span className="gradient-text">log in</span>?</>
          ) : (
            <>How do you want to <span className="gradient-text">join</span>?</>
          )}
        </motion.h1>

        <motion.p variants={item} className="roles__subtitle">
          Choose your account type to continue
        </motion.p>

        <div className="roles__options">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.button
                key={r.id}
                variants={item}
                type="button"
                className={`roles__option roles__option--${r.accent}`}
                onClick={() => onSelect(r.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="roles__optionIcon">
                  <Icon size={22} strokeWidth={2.2} />
                </span>
                <span className="roles__optionText">
                  <span className="roles__optionLabel">{r.label}</span>
                  <span className="roles__optionTag">{r.tagline}</span>
                </span>
                <span className="roles__optionArrow">
                  <ChevronRight size={18} />
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.p variants={item} className="roles__footer">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                className="roles__switch"
                onClick={() => onBack('register')}
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="roles__switch"
                onClick={() => onBack('login')}
              >
                Log In
              </button>
            </>
          )}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default RoleSelector;