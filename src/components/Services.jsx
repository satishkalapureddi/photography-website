import { ArrowUpRight } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Wedding Photography",
    description:
      "Authentic moments and emotions from your most important day.",
  },
  {
    number: "02",
    title: "Pre-Wedding",
    description:
      "Beautiful cinematic sessions created around your unique story.",
  },
  {
    number: "03",
    title: "Events",
    description:
      "Professional coverage for celebrations and unforgettable occasions.",
  },
  {
    number: "04",
    title: "Portraits",
    description:
      "Natural portraits that reveal personality and emotion.",
  },
];

function enquire(service) {
  const phone = "91XXXXXXXXXX";

  const message =
    `Hi, I'm interested in ${service}. ` +
    `I'd like to know about availability and pricing.`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

export default function Services() {
  return (
    <section className="services-section section" id="services">

      <div className="container">

        <p className="section-label dark-label">
          WHAT WE DO
        </p>

        <h2 className="services-title">
          Photography
          <br />
          <em>with purpose.</em>
        </h2>

        <div className="services-list">

          {services.map((service) => (

            <div className="service-item" key={service.number}>

              <span className="service-number">
                {service.number}
              </span>

              <div className="service-content">

                <h3>{service.title}</h3>

                <p>
                  {service.description}
                </p>

              </div>

              <button
                className="service-button"
                onClick={() => enquire(service.title)}
              >
                <ArrowUpRight size={22} />
              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}