import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-background" />

      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >

        <p className="hero-small">
          WEDDING • PORTRAIT • EVENTS
        </p>

        <h1>
          Moments
          <br />
          <em>made</em>
          <br />
          eternal.
        </h1>

        <p className="hero-text">
          We capture authentic stories, emotions and
          unforgettable moments through cinematic photography.
        </p>

        <div className="hero-actions">

          <a href="#work" className="primary-button">
            Explore Work
          </a>

          <a href="#contact" className="outline-button">
            Book A Session
          </a>

        </div>

      </motion.div>

      <div className="hero-scroll">
        <ArrowDown size={18} />
        <span>Scroll to explore</span>
      </div>

    </section>
  );
}