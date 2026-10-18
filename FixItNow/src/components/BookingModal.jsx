import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';           // ⬅️ NEW
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Zap, Check } from 'lucide-react';
import SlideToBook from './SlideToBook';
import {
  BASE_FARE,
  PRIORITIES,
  DATES,
  calculateBill,
  formatINR,
} from '../data/pricing';
import './BookingModal.css';

function BookingModal({ open, service, onClose }) {
  const [priority, setPriority] = useState('standard');
  const [date, setDate] = useState('today');
  const [address, setAddress] = useState('');
  const [distanceKm, setDistanceKm] = useState(8);
  const [coupon, setCoupon] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (open) {
      setPriority('standard');
      setDate('today');
      setAddress('');
      setDistanceKm(8);
      setCoupon(false);
      setBooked(false);
    }
  }, [open, service]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const bill = useMemo(
    () => calculateBill({ priority, distanceKm, hasCoupon: coupon }),
    [priority, distanceKm, coupon]
  );

  const canBook = address.trim().length >= 8;

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => onClose(), 2200);
  };

  return createPortal(                                 // ⬅️ PORTAL WRAP
    <AnimatePresence>
      {open && service && (
        <motion.div
          className="bm-root"                          // ⬅️ NEW WRAPPER
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="bm__backdrop" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="bm"
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${service.name}`}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {/* Header */}
            <div className="bm__header">
              <div className="bm__icon" aria-hidden>{service.icon}</div>
              <div className="bm__headText">
                <h2>Book {service.name}</h2>
                <p>{service.desc}</p>
              </div>
              <button className="bm__close" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="bm__body">
              <div className="bm__row">
                <div className="bm__field">
                  <label className="bm__label">
                    <Zap size={14} /> Priority
                  </label>
                  <div className="bm__chips">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`bm__chip ${priority === p.id ? 'is-active' : ''}`}
                        onClick={() => setPriority(p.id)}
                      >
                        <span className="bm__chipLabel">{p.label}</span>
                        <span className="bm__chipSub">{p.eta}</span>
                        {p.surcharge > 0 && (
                          <span className="bm__chipPrice">+{formatINR(p.surcharge)}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bm__row">
                <div className="bm__field">
                  <label className="bm__label">
                    <Calendar size={14} /> Preferred Date
                  </label>
                  <div className="bm__chips bm__chips--compact">
                    {DATES.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        className={`bm__chip bm__chip--sm ${date === d.id ? 'is-active' : ''}`}
                        onClick={() => setDate(d.id)}
                      >
                        <span className="bm__chipLabel">{d.label}</span>
                        <span className="bm__chipSub">{d.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bm__field">
                <label className="bm__label" htmlFor="bm-address">
                  <MapPin size={14} /> Service Address
                </label>
                <textarea
                  id="bm-address"
                  className="bm__input"
                  rows="3"
                  placeholder="Flat / House no, street, area, city, pincode"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="bm__helper">
                  <span>Distance from nearest pro: <strong>{distanceKm} km</strong></span>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(Number(e.target.value))}
                    className="bm__range"
                    aria-label="Distance"
                  />
                </div>
              </div>

              <label className="bm__coupon">
                <input
                  type="checkbox"
                  checked={coupon}
                  onChange={(e) => setCoupon(e.target.checked)}
                />
                <span>Apply promo <strong>FIRST10</strong> — 10% off</span>
              </label>

              <div className="bm__bill">
                <h3 className="bm__billTitle">Estimated Bill</h3>

                <div className="bm__billRow">
                  <span>Base / visiting charges</span>
                  <span>{formatINR(bill.basic)}</span>
                </div>

                <div className="bm__billRow">
                  <span>Priority — {bill.priorityLabel}</span>
                  <span>
                    {bill.priorityFee > 0 ? `+${formatINR(bill.priorityFee)}` : 'Free'}
                  </span>
                </div>

                <div className="bm__billRow">
                  <span>Distance ({bill.extraKm} km × ₹12)</span>
                  <span>
                    {bill.distanceFee > 0 ? `+${formatINR(bill.distanceFee)}` : 'Free'}
                  </span>
                </div>

                <div className="bm__billRow">
                  <span>Platform fee</span>
                  <span>+{formatINR(bill.platformFee)}</span>
                </div>

                {bill.discount > 0 && (
                  <div className="bm__billRow bm__billRow--discount">
                    <span>Promo (FIRST10)</span>
                    <span>−{formatINR(bill.discount)}</span>
                  </div>
                )}

                <div className="bm__billRow bm__billRow--muted">
                  <span>GST (18%)</span>
                  <span>+{formatINR(bill.gst)}</span>
                </div>

                <div className="bm__billTotal">
                  <span>Total</span>
                  <strong>{formatINR(bill.total)}</strong>
                </div>
              </div>
            </div>

            <div className="bm__footer">
              <SlideToBook
                disabled={!canBook || booked}
                label={
                  booked
                    ? 'Booking Confirmed ✓'
                    : canBook
                    ? `Slide to Book · ${formatINR(bill.total)}`
                    : 'Enter address to continue'
                }
                onBook={handleBook}
              />
            </div>

            <AnimatePresence>
              {booked && (
                <motion.div
                  className="bm__success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bm__successCircle"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <Check size={36} />
                  </motion.div>
                  <h3>Booking Confirmed!</h3>
                  <p>We'll notify you once a pro accepts the job.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body                                        
  );
}

export default BookingModal;