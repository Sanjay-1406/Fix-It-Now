import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h3>🛠️ FixItNow</h3>
          <p>
            Your one-stop platform to book verified technicians, plumbers,
            electricians and more — right at your doorstep.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Plumber</a></li>
            <li><a href="#services">Electrician</a></li>
            <li><a href="#services">Carpenter</a></li>
            <li><a href="#services">AC Technician</a></li>
            <li><a href="#services">Painter</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#how">How it Works</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} FixItNow. All rights reserved.</p>
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

export default Footer;