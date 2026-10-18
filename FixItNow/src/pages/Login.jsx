import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Check, Wrench, Briefcase, User } from 'lucide-react';
import './Login.css';

function Login({ onBack, role = 'customer', onRegisterClick }) {
  const isPro = role === 'provider';

  const [form, setForm] = useState({ identifier: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.identifier.trim() || !form.password.trim()) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    // TODO: POST /api/login with { identifier, password, role }
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onBack?.(), 1800);
    }, 1400);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  const RoleIcon = isPro ? Briefcase : User;

  return (
    <div className="login">
      <div className="blob blob--blue blob--animate" style={{ top: '-80px', left: '-80px' }} />
      <div className="blob blob--purple blob--animate" style={{ bottom: '-120px', right: '-100px', animationDelay: '3s' }} />
      <div className="blob blob--pink blob--animate" style={{ top: '50%', right: '20%', animationDelay: '6s' }} />

      <motion.button
        className="login__back"
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

      <motion.div className="login__card" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="login__logo">
          <span className="login__logoMark">
            <Wrench size={18} strokeWidth={2.5} />
          </span>
          <span className="login__logoText">
            FixIt<span className="gradient-text">Now</span>
          </span>
        </motion.div>

        {/* Role chip — visible confirmation of what's selected */}
        <motion.div variants={item} className={`login__roleChip ${isPro ? 'is-pro' : ''}`}>
          <RoleIcon size={14} />
          <span>{isPro ? 'Service Provider' : 'Customer'}</span>
        </motion.div>

        <motion.h1 variants={item} className="login__title">
          {isPro ? (
            <>Pro <span className="gradient-text">Login</span></>
          ) : (
            <>Welcome <span className="gradient-text">Back</span></>
          )}
        </motion.h1>
        <motion.p variants={item} className="login__subtitle">
          {isPro
            ? 'Sign in to manage jobs, availability & earnings.'
            : 'Sign in to book trusted pros in minutes.'}
        </motion.p>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <motion.div variants={item} className="login__field">
            <label htmlFor="identifier" className="login__label">Email or Phone</label>
            <div className="login__inputWrap">
              <Mail size={16} className="login__inputIcon" />
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="username"
                placeholder="you@example.com or 98765 43210"
                value={form.identifier}
                onChange={handleChange}
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="login__field">
            <label htmlFor="password" className="login__label">Password</label>
            <div className="login__inputWrap">
              <Lock size={16} className="login__inputIcon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="login__eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="login__error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            variants={item}
            type="submit"
            className="login__submit"
            disabled={loading || success}
            whileHover={!loading && !success ? { y: -2 } : {}}
            whileTap={!loading && !success ? { scale: 0.98 } : {}}
          >
            {success ? (
              <motion.span className="login__submitInner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Check size={18} /> Signed in
              </motion.span>
            ) : loading ? (
              <span className="login__submitInner">
                <span className="login__spinner" /> Signing in…
              </span>
            ) : (
              <span className="login__submitInner">
                {isPro ? 'Log In as Pro' : 'Log In'}
              </span>
            )}
          </motion.button>

          <motion.div variants={item} className="login__forgotRow">
            <button
              type="button"
              className="login__forgot"
              onClick={() => alert('Reset link will be sent (static for now)')}
            >
              Forgot password?
            </button>
          </motion.div>
        </form>

        <motion.p variants={item} className="login__signup">
          New to FixItNow?{' '}
          <button
            type="button"
            className="login__signupLink"
            onClick={onRegisterClick}
          >
            {isPro ? 'Register' : 'Create an account'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;