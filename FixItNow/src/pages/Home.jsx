import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import ServiceCard from "../components/ServiceCard";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import { services } from "../data/services";
import "./Home.css";

function Home({ onBookServiceClick, onBecomeProClick }) {
  return (
    <>
      <main>
        <Hero
          onBookServiceClick={onBookServiceClick}
          onBecomeProClick={onBecomeProClick}
        />
        <TrustBar />

        <section className="services" id="services">
          <h2 className="services__title">Our Services</h2>
          <p className="services__subtitle">
            Pick what you need — we've got a pro for it
          </p>
          <div className="services__grid">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </section>

        <HowItWorks />
        <About />
        <Contact />
      </main>

      <Footer />
      <FloatingCTA />
    </>
  );
}

export default Home;
