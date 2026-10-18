import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, Wrench } from "lucide-react";
import "./Header.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "How it Works", href: "#how" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Header({ onLoginClick, onRegisterClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const lastY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    setHidden(y > lastY.current && y > 200);
    lastY.current = y;
  });

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (event, href) => {
    event.preventDefault();
    closeMenu();

    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const handleLogin = () => {
    closeMenu();
    onLoginClick?.();
  };

  const handleRegister = () => {
    closeMenu();
    onRegisterClick?.();
  };

  return (
    <>
      <motion.header
        className={`header ${scrolled ? "header--glass" : ""}`}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="header__container">
          {/* Logo */}
          <a
            href="#home"
            className="header__logo"
            onClick={(event) => handleNavClick(event, "#home")}
          >
            <motion.span
              className="header__logoMark"
              whileHover={{ rotate: 12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Wrench size={20} strokeWidth={2.5} />
            </motion.span>

            <span className="header__logoText">
              FixIt<span className="gradient-text">Now</span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={`header__link ${isActive ? "is-active" : ""}`}
                >
                  {link.label}

                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="header__underline"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop login and registration buttons */}
          <div className="header__actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={handleLogin}
            >
              Log In
            </button>

            <button
              type="button"
              className="btn btn--primary btn--glow"
              onClick={handleRegister}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger / close button */}
          <button
            type="button"
            className="header__hamburger"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  className="header__icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  className="header__icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} strokeWidth={2.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* 
        Mobile drawer via Portal
      */}
      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                className="header__backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
                aria-hidden="true"
              />

              <motion.nav
                id="mobile-navigation"
                className="header__drawer"
                aria-label="Mobile navigation"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                }}
              >
                {/* NEW WRAPPER for scrollable links */}
                <div className="header__drawerLinks">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(event) => handleNavClick(event, link.href)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * index + 0.1 }}
                      className="header__drawerLink"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                {/* Buttons pinned to bottom */}
                <div className="header__drawerActions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={handleLogin}
                  >
                    Log In
                  </button>

                  <button
                    type="button"
                    className="btn btn--primary btn--glow"
                    onClick={handleRegister}
                  >
                    Get Started
                  </button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default Header;