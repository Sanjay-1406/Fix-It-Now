import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <section className="contact" id="contact">
      <div className="blob blob--pink blob--animate" style={{ bottom: '-100px', left: '-100px' }} />

      <div className="contact__container">
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="contact__badge">Contact</span>
          <h2 className="contact__title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="contact__text">
            Have a question or need help? We're here 24/7 to assist you.
          </p>

          {[
            { icon: '📞', label: 'Phone',   value: '+91 98765 43210' },
            { icon: '✉️', label: 'Email',   value: 'support@fixitnow.com' },
            { icon: '📍', label: 'Address', value: '123 MG Road, Bengaluru' },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="contact__detail"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.5 }}
            >
              <span className="contact__icon">{d.icon}</span>
              <div>
                <h4>{d.label}</h4>
                <p>{d.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <input type="text"  name="name"    placeholder="Your Name"    value={form.name}    onChange={handleChange} required />
          <input type="email" name="email"   placeholder="Your Email"   value={form.email}   onChange={handleChange} required />
          <textarea           name="message" placeholder="Your Message" rows="5" value={form.message} onChange={handleChange} required />

          <button type="submit" className="btn btn--primary btn--lg btn--glow">
            Send Message
          </button>

          <AnimatePresence>
            {submitted && (
              <motion.p
                className="contact__success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}

export default Contact;