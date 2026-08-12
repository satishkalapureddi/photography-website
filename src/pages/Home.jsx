
import PhotographyGallery from "../components/PhotographyGallery";
import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main style={{ paddingTop: "85px" }}>
        <Gallery />
      </main>
      
      <PhotographyGallery />

      <WhatsAppButton />
      <Footer />
    </>
  );
}