import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="about-page">

        {/* HERO */}

        <section className="about-hero">

          <div className="about-hero-image" />

          <div className="about-hero-overlay" />

          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            <p className="section-label">
              OUR STORY
            </p>

            <h1>
              Behind
              <br />
              the <em>lens.</em>
            </h1>

          </motion.div>

        </section>

        {/* INTRO */}

        <section className="about-intro section">

          <div className="container about-intro-grid">

            <div>
              <p className="section-label">
                WHO WE ARE
              </p>
            </div>

            <div>

              <h2>
                We believe the
                <br />
                best photographs
                <br />
                <em>feel real.</em>
              </h2>

              <p>
                Photography isn't simply about creating
                beautiful images. It's about preserving the
                feeling of a moment so you can experience it
                again years from now.
              </p>

              <p>
                At VISUALS 2.0, we combine a documentary
                approach with cinematic composition to
                create photographs that are emotional,
                honest and timeless.
              </p>

            </div>

          </div>

        </section>

        {/* PHOTOGRAPHER */}

        <section className="photographer-section">

          <div className="container photographer-grid">

            <motion.div
              className="photographer-image"
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >

              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1400&q=90"
                alt="Photographer"
              />

            </motion.div>

            <motion.div
              className="photographer-content"
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >

              <p className="section-label">
                THE PHOTOGRAPHER
              </p>

              <h2>
                Every story
                <br />
                deserves to be
                <br />
                <em>remembered.</em>
              </h2>

              <p>
                I'm a photographer passionate about
                capturing genuine human connection,
                beautiful light and the little moments
                that often go unnoticed.
              </p>

              <p>
                Whether it's a wedding, a pre-wedding
                session, an event or a simple portrait,
                my goal is always the same:
                make photographs that feel like you.
              </p>

              <div className="signature">
                VISUALS 2.0
              </div>

            </motion.div>

          </div>

        </section>

        {/* STATS */}

        <section className="stats-section">

          <div className="container stats-grid">

            <div className="stat">
              <strong>100+</strong>
              <span>Stories Captured</span>
            </div>

            <div className="stat">
              <strong>5+</strong>
              <span>Years Experience</span>
            </div>

            <div className="stat">
              <strong>50+</strong>
              <span>Happy Couples</span>
            </div>

            <div className="stat">
              <strong>∞</strong>
              <span>Beautiful Memories</span>
            </div>

          </div>

        </section>

        {/* PHILOSOPHY */}

        <section className="philosophy-section section">

          <div className="container">

            <div className="philosophy-heading">

              <p className="section-label">
                OUR PHILOSOPHY
              </p>

              <h2>
                Less posing.
                <br />
                More <em>living.</em>
              </h2>

            </div>

            <div className="philosophy-grid">

              <div>
                <span>01</span>

                <h3>
                  Authentic
                </h3>

                <p>
                  We let moments happen naturally
                  instead of forcing every photograph.
                </p>
              </div>

              <div>
                <span>02</span>

                <h3>
                  Cinematic
                </h3>

                <p>
                  We use light, composition and
                  movement to create photographs
                  with a cinematic feeling.
                </p>
              </div>

              <div>
                <span>03</span>

                <h3>
                  Timeless
                </h3>

                <p>
                  Trends change. Your memories
                  shouldn't. We create images designed
                  to stay beautiful for generations.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* CONTACT */}

        <section
          className="contact-section"
          id="contact"
        >

          <div className="container contact-grid">

            <div className="contact-info">

              <p className="section-label">
                GET IN TOUCH
              </p>

              <h2>
                Let's talk about
                <br />
                your <em>story.</em>
              </h2>

              <p className="contact-description">
                Tell us a little about your event,
                your date and what you're looking for.
                We'll get back to you as soon as possible.
              </p>

              <div className="contact-details">

                <a href="tel:+91XXXXXXXXXX">
                  <span>PHONE</span>
                  +91 XXXXX XXXXX
                </a>

                <a href="mailto:hello@visuals20.com">
                  <span>EMAIL</span>
                  hello@visuals20.com
                </a>

                <div>
                  <span>LOCATION</span>
                  Andhra Pradesh, India
                </div>

              </div>

            </div>

            <ContactForm />

          </div>

        </section>

      </main>

      <WhatsAppButton />

      <Footer />
    </>
  );
}

function ContactForm() {

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const service = form.service.value;
    const date = form.date.value;
    const message = form.message.value;

    const phone = "91XXXXXXXXXX";

    const whatsappMessage =
      `Hi, I'm ${name}.%0A%0A` +
      `I'm interested in: ${service}%0A` +
      `Event date: ${date || "Not decided yet"}%0A%0A` +
      `${message}`;

    window.open(
      `https://wa.me/${phone}?text=${whatsappMessage}`,
      "_blank"
    );
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">

        <label>
          YOUR NAME
        </label>

        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />

      </div>

      <div className="form-group">

        <label>
          SERVICE
        </label>

        <select
          name="service"
          defaultValue=""
          required
        >

          <option value="" disabled>
            Select a service
          </option>

          <option>
            Wedding Photography
          </option>

          <option>
            Pre-Wedding
          </option>

          <option>
            Events
          </option>

          <option>
            Portraits
          </option>

          <option>
            Other
          </option>

        </select>

      </div>

      <div className="form-group">

        <label>
          EVENT DATE
        </label>

        <input
          name="date"
          type="date"
        />

      </div>

      <div className="form-group">

        <label>
          TELL US ABOUT IT
        </label>

        <textarea
          name="message"
          rows="5"
          placeholder="Tell us about your event..."
          required
        />

      </div>

      <button
        type="submit"
        className="form-submit"
      >
        Send Enquiry on WhatsApp
      </button>

    </form>
  );
}