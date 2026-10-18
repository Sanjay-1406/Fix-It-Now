import { useRef } from "react";
import { motion } from "framer-motion";
import { useBooking } from "../context/BookingContext";
import "./ServiceCard.css";

function ServiceCard({ service, index = 0 }) {
  const ref = useRef(null);
  const { openBooking } = useBooking(); // ⬅️ REQUIRED

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onClick={() => openBooking(service)}
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -8 }}
    >
      <div className="service-card__glow" aria-hidden />
      <div className="service-card__icon">{service.icon}</div>
      <h3 className="service-card__title">{service.name}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <button className="service-card__btn">Book Now →</button>
    </motion.div>
  );
}

export default ServiceCard;
