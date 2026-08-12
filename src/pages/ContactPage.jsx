import Navbar from "../components/Navbar";
import CTA from "../components/CTA";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "80px" }}>
        <CTA />

        <section className="section">
          <div className="container">
            <p className="section-label">Contact</p>

            <h1 className="section-title">
              Let's talk.
            </h1>

            <p className="muted" style={{ marginTop: "30px" }}>
              WhatsApp: +91 XXXXX XXXXX
              <br />
              Email: hello@example.com
              <br />
              Location: India
            </p>
          </div>
        </section>
      </main>

      <WhatsAppButton />
      <Footer />
    </>
  );
}