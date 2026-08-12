import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Gallery />
      </div>
      <Footer />
    </>
  );
}