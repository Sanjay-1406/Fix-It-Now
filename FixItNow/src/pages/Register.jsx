import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Check,
  Wrench,
  Briefcase,
} from 'lucide-react';
import { services } from '../data/services';
import './Register.css';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[6-9]\d{9}$/;

function getPasswordStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '#e5e7eb' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { score, label: 'Weak', color: '#ef4444' };
  if (score <= 3) return { score, label: 'Fair', color: '#f59e0b' };
  return { score, label: 'Strong', color: '#10b981' };
}

function Register({ onBack, role = 'customer', onLoginClick }) {
  const isPro = role === 'provider';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    terms: false,
    service: '',
    years: '',
  });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    else if (form.name.trim().length < 3) e.name = 'Enter at least 3 characters';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!emailRe.test(form.email)) e.email = 'Enter a valid email';

    if (!form.phone.trim()) e.phone = 'Mobile number is required';
    else if (!phoneRe.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Min. 8 characters';

    if (!form.confirm) e.confirm = 'Confirm your password';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match';

    if (isPro) {
      if (!form.service) e.service = 'Select a service';
      if (form.years === '' || form.years === null) e.years = 'Years of experience is required';
      else if (Number(form.years) < 0 || Number(form.years) > 60) e.years = 'Enter 0–60 years';
    }

    if (!form.terms) e.terms = 'You must accept the terms';

    return e;
  }, [form, isPro]);

  const isValid = Object.keys(errors).length === 0;
  const strength = getPasswordStrength(form.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      name: true, email: true, phone: true, password: true, confirm: true,
      terms: true, service: true, years: true,
    });
    if (!isValid) return;

    setLoading(true);
    // TODO: POST /api/register with { ...form, role }
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onLoginClick?.(), 1600);
    }, 1500);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  const showErr = (field) => touched[field] && errors[field];
  const RoleIcon = isPro ? Briefcase : User;

  return (
    <div className="register">
      <div className="blob blob--blue blob--animate" style={{ top: '-80px', left: '-80px' }} />
      <div className="blob blob--purple blob--animate" style={{ bottom: '-120px', right: '-100px', animationDelay: '3s' }} />
      <div className="blob blob--pink blob--animate" style={{ top: '50%', right: '20%', animationDelay: '6s' }} />

      <motion.button
        className="register__back"
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

      <motion.div className="register__card" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="register__logo">
          <span className="register__logoMark">
            <Wrench size={18} strokeWidth={2.5} />
          </span>
          <span className="register__logoText">
            FixIt<span className="gradient-text">Now</span>
          </span>
        </motion.div>

        <motion.div variants={item} className={`register__roleChip ${isPro ? 'is-pro' : ''}`}>
          <RoleIcon size={14} />
          <span>{isPro ? 'Service Provider' : 'Customer'}</span>
        </motion.div>

        <motion.h1 variants={item} className="register__title">
          {isPro ? (
            <>Become a <span className="gradient-text">Pro</span></>
          ) : (
            <>Create your <span className="gradient-text">account</span></>
          )}
        </motion.h1>
        <motion.p variants={item} className="register__subtitle">
          {isPro
            ? 'Earn more by serving customers near you.'
            : 'Book trusted pros in minutes. Free, no strings attached.'}
        </motion.p>

        <form className="register__form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <motion.div variants={item} className="register__field">
            <label htmlFor="name" className="register__label">Full Name</label>
            <div className={`register__inputWrap ${showErr('name') ? 'is-error' : ''}`}>
              <User size={16} className="register__inputIcon" />
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Ravi Kumar"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <AnimatePresence>
              {showErr('name') && (
                <motion.span
                  className="register__errorText"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email */}
          <motion.div variants={item} className="register__field">
            <label htmlFor="email" className="register__label">Email</label>
            <div className={`register__inputWrap ${showErr('email') ? 'is-error' : ''}`}>
              <Mail size={16} className="register__inputIcon" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <AnimatePresence>
              {showErr('email') && (
                <motion.span
                  className="register__errorText"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile */}
          <motion.div variants={item} className="register__field">
            <label htmlFor="phone" className="register__label">Mobile Number</label>
            <div className={`register__inputWrap ${showErr('phone') ? 'is-error' : ''}`}>
              <Phone size={16} className="register__inputIcon" />
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                placeholder="98765 43210"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))
                }
                onBlur={handleBlur}
              />
            </div>
            <AnimatePresence>
              {showErr('phone') && (
                <motion.span
                  className="register__errorText"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.phone}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password */}
          <motion.div variants={item} className="register__field">
            <label htmlFor="password" className="register__label">Password</label>
            <div className={`register__inputWrap ${showErr('password') ? 'is-error' : ''}`}>
              <Lock size={16} className="register__inputIcon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="register__eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {form.password && (
              <div className="register__strength">
                <div className="register__strengthBar">
                  <motion.div
                    className="register__strengthFill"
                    style={{ background: strength.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength.score / 5) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                </div>
                <span className="register__strengthLabel" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}

            <AnimatePresence>
              {showErr('password') && (
                <motion.span
                  className="register__errorText"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.password}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={item} className="register__field">
            <label htmlFor="confirm" className="register__label">Confirm Password</label>
            <div className={`register__inputWrap ${showErr('confirm') ? 'is-error' : ''}`}>
              <Lock size={16} className="register__inputIcon" />
              <input
                id="confirm"
                name="confirm"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                className="register__eye"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.confirm && form.confirm === form.password && (
              <span className="register__match">
                <Check size={14} /> Passwords match
              </span>
            )}
            <AnimatePresence>
              {showErr('confirm') && (
                <motion.span
                  className="register__errorText"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.confirm}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pro-only fields */}
          <AnimatePresence initial={false}>
            {isPro && (
              <motion.div
                key="pro-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="register__field" style={{ marginTop: 4 }}>
                  <label htmlFor="service" className="register__label">Service You Offer</label>
                  <div className={`register__inputWrap ${showErr('service') ? 'is-error' : ''}`}>
                    <select
                      id="service"
                      name="service"
                      className="register__select"
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Select a service…</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.icon} {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <AnimatePresence>
                    {showErr('service') && (
                      <motion.span
                        className="register__errorText"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.service}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="register__field" style={{ marginTop: 14 }}>
                  <label htmlFor="years" className="register__label">Years of Experience</label>
                  <div className={`register__inputWrap ${showErr('years') ? 'is-error' : ''}`}>
                    <input
                      id="years"
                      name="years"
                      type="number"
                      min="0"
                      max="60"
                      placeholder="e.g. 5"
                      value={form.years}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <AnimatePresence>
                    {showErr('years') && (
                      <motion.span
                        className="register__errorText"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {errors.years}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terms */}
          <motion.label variants={item} className="register__terms">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span className="register__termsBox" aria-hidden>
              {form.terms && <Check size={12} />}
            </span>
            <span className="register__termsText">
              I agree to the{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              {' '}and{' '}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </span>
          </motion.label>

          <AnimatePresence>
            {showErr('terms') && (
              <motion.span
                className="register__errorText"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {errors.terms}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            variants={item}
            type="submit"
            className="register__submit"
            disabled={loading || success}
            whileHover={!loading && !success ? { y: -2 } : {}}
            whileTap={!loading && !success ? { scale: 0.98 } : {}}
          >
            {success ? (
              <motion.span className="register__submitInner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Check size={18} /> Account created
              </motion.span>
            ) : loading ? (
              <span className="register__submitInner">
                <span className="register__spinner" /> Creating…
              </span>
            ) : (
              <span className="register__submitInner">
                {isPro ? 'Register as Pro' : 'Create Account'}
              </span>
            )}
          </motion.button>
        </form>

        <motion.p variants={item} className="register__login">
          Already have an account?{' '}
          <button
            type="button"
            className="register__loginLink"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Register;