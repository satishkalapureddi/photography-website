import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <About />
      </div>
      
    </>
  );
}