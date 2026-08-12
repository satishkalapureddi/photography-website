import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const gallery = [
  {
    id: 1,
    category: "Wedding",
    title: "Forever Begins",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 2,
    category: "Wedding",
    title: "The Promise",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 3,
    category: "Pre-Wedding",
    title: "Two Souls",
    image:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 4,
    category: "Events",
    title: "The Celebration",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 5,
    category: "Portraits",
    title: "The Portrait",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 6,
    category: "Pre-Wedding",
    title: "In The Moment",
    image:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 7,
    category: "Wedding",
    title: "Together",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: 8,
    category: "Portraits",
    title: "Soul",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=90",
  },
];

const categories = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Events",
  "Portraits",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter(
          (item) => item.category === activeCategory
        );

  const currentIndex = selectedImage
    ? filteredGallery.findIndex(
        (item) => item.id === selectedImage.id
      )
    : -1;

  const nextImage = () => {
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + 1) % filteredGallery.length;

    setSelectedImage(filteredGallery[nextIndex]);
  };

  const previousImage = () => {
    if (currentIndex === -1) return;

    const previousIndex =
      (currentIndex - 1 + filteredGallery.length) %
      filteredGallery.length;

    setSelectedImage(filteredGallery[previousIndex]);
  };

  return (
    <>
      <section className="gallery-page section" id="work">

        <div className="container">

          <div className="gallery-header">

            <div>
              <p className="section-label">
                OUR PORTFOLIO
              </p>

              <h2>
                Stories
                <br />
                <em>captured.</em>
              </h2>
            </div>

            <p className="gallery-intro">
              A collection of moments, people and stories
              we've had the privilege of documenting.
            </p>

          </div>

          <div className="gallery-filters">

            {categories.map((category) => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? "gallery-filter active"
                    : "gallery-filter"
                }
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
              >
                {category}
              </button>

            ))}

          </div>

          <motion.div layout className="advanced-gallery">

            <AnimatePresence mode="popLayout">

              {filteredGallery.map((item, index) => (

                <motion.article
                  layout
                  key={item.id}
                  className={`advanced-gallery-card card-${index % 4}`}
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  onClick={() =>
                    setSelectedImage(item)
                  }
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                  />

                  <div className="advanced-gallery-overlay">

                    <div>
                      <span>
                        {item.category}
                      </span>

                      <h3>
                        {item.title}
                      </h3>
                    </div>

                    <span>
                      View
                    </span>

                  </div>

                </motion.article>

              ))}

            </AnimatePresence>

          </motion.div>

        </div>

      </section>

      <AnimatePresence>

        {selectedImage && (

          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <button
              className="lightbox-close"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              <X size={28} />
            </button>

            <button
              className="lightbox-prev"
              onClick={previousImage}
            >
              <ChevronLeft size={35} />
            </button>

            <motion.img
              key={selectedImage.id}
              src={selectedImage.image}
              alt={selectedImage.title}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.4,
              }}
            />

            <button
              className="lightbox-next"
              onClick={nextImage}
            >
              <ChevronRight size={35} />
            </button>

            <div className="lightbox-info">

              <div>
                <span>
                  {selectedImage.category}
                </span>

                <h3>
                  {selectedImage.title}
                </h3>
              </div>

              <p>
                {currentIndex + 1} /{" "}
                {filteredGallery.length}
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}