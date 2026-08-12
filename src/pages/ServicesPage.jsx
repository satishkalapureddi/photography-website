import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const services = [
  {
    number: "01",
    title: "Wedding Photography",
    category: "WEDDINGS",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90",
    description:
      "Your wedding day is filled with moments that happen once. We document the emotions, people, details and celebrations naturally and beautifully.",
    features: [
      "Full wedding day coverage",
      "Candid photography",
      "Traditional photography",
      "Couple portraits",
      "Family & guest moments",
    ],
  },
  {
    number: "02",
    title: "Pre-Wedding",
    category: "COUPLES",
    image:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1600&q=90",
    description:
      "Relaxed, cinematic and personal sessions designed around your relationship and your story.",
    features: [
      "Location planning",
      "Creative concepts",
      "Couple portraits",
      "Cinematic photography",
      "Multiple outfit changes",
    ],
  },
  {
    number: "03",
    title: "Events",
    category: "CELEBRATIONS",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
    description:
      "From intimate celebrations to large events, we capture the atmosphere and every important moment.",
    features: [
      "Event coverage",
      "Candid photography",
      "Guest photography",
      "Stage & decoration",
      "Professional editing",
    ],
  },
  {
    number: "04",
    title: "Portraits",
    category: "PORTRAITS",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90",
    description:
      "Portrait sessions that feel natural, confident and completely personal to you.",
    features: [
      "Individual portraits",
      "Professional headshots",
      "Creative portraits",
      "Outdoor sessions",
      "Studio-style portraits",
    ],
  },
];

function enquire(service) {
  const phone = "91XXXXXXXXXX";

  const message =
    `Hi, I'm interested in ${service}. ` +
    `I'd like to know about availability, packages and pricing.`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="services-page">

        {/* HERO */}

        <section className="services-hero">

          <div className="services-hero-overlay" />

          <div className="services-hero-content">

            <p className="section-label">
              WHAT WE OFFER
            </p>

            <h1>
              Services
              <br />
              <em>designed around you.</em>
            </h1>

            <p>
              From intimate moments to grand celebrations,
              we create photographs that tell your story.
            </p>

          </div>

        </section>

        {/* SERVICES */}

        <section className="service-details section">

          <div className="container">

            {services.map((service, index) => (

              <motion.article
                className="service-detail"
                key={service.number}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                }}
              >

                <div className="service-detail-image">

                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                  />

                  <span className="service-detail-number">
                    {service.number}
                  </span>

                </div>

                <div className="service-detail-content">

                  <p className="service-category">
                    {service.category}
                  </p>

                  <h2>
                    {service.title}
                  </h2>

                  <p className="service-description">
                    {service.description}
                  </p>

                  <div className="service-features">

                    {service.features.map((feature) => (

                      <div
                        className="service-feature"
                        key={feature}
                      >
                        <span />
                        {feature}
                      </div>

                    ))}

                  </div>

                  <button
                    className="service-enquire"
                    onClick={() =>
                      enquire(service.title)
                    }
                  >
                    Enquire on WhatsApp
                    <ArrowUpRight size={18} />
                  </button>

                </div>

              </motion.article>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="services-bottom-cta">

          <div>

            <p>
              HAVE SOMETHING ELSE IN MIND?
            </p>

            <h2>
              Let's create
              <br />
              something <em>unique.</em>
            </h2>

            <button
              className="primary-button"
              onClick={() =>
                enquire("Photography")
              }
            >
              Talk to us
            </button>

          </div>

        </section>

      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}