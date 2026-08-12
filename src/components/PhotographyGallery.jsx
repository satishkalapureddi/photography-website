import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Lightbox from "./Lightbox";

import { getGalleryImages } from "../utils/galleryStorage";

const categories = [
  "ALL",
  "WEDDINGS",
  "PRE-WEDDING",
  "EVENTS",
  "PORTRAITS",
];

export default function PhotographyGallery() {

  const [images, setImages] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("ALL");

  const [selectedIndex, setSelectedIndex] =
    useState(null);

  useEffect(() => {

    const loadImages = () => {
      setImages(getGalleryImages());
    };

    loadImages();

    window.addEventListener(
      "galleryUpdated",
      loadImages
    );

    window.addEventListener(
      "storage",
      loadImages
    );

    return () => {

      window.removeEventListener(
        "galleryUpdated",
        loadImages
      );

      window.removeEventListener(
        "storage",
        loadImages
      );

    };

  }, []);

  const filteredImages =
    activeCategory === "ALL"
      ? images
      : images.filter(
          (image) =>
            image.category ===
            activeCategory
        );

  return (
    <section
      className="premium-gallery"
      id="work"
    >

      <div className="gallery-heading">

        <div>

          <span className="section-label">
            SELECTED WORK
          </span>

          <h2>
            Stories
            <em> captured.</em>
          </h2>

        </div>

        <p>
          A collection of moments,
          emotions and memories
          captured through our lens.
        </p>

      </div>

      <div className="gallery-filters">

        {categories.map((category) => (

          <button
            key={category}
            className={
              activeCategory === category
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveCategory(category)
            }
          >
            {category}
          </button>

        ))}

      </div>

      {filteredImages.length === 0 ? (

        <div className="gallery-empty">
          No photographs available.
        </div>

      ) : (

        <motion.div
          className="premium-gallery-grid"
          layout
        >

          {filteredImages.map(
            (image, index) => (

              <motion.article
                key={image.id}
                className={
                  index === 1
                    ? "gallery-item gallery-item-large"
                    : "gallery-item"
                }
                layout
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                onClick={() =>
                  setSelectedIndex(index)
                }
              >

                <img
                  src={image.url}
                  alt={image.title}
                />

                <div className="gallery-overlay">

                  <span>
                    {image.category}
                  </span>

                  <h3>
                    {image.title}
                  </h3>

                </div>

              </motion.article>

            )
          )}

        </motion.div>

      )}

      {selectedIndex !== null && (

        <Lightbox
          images={filteredImages}
          currentIndex={selectedIndex}
          setCurrentIndex={
            setSelectedIndex
          }
          onClose={() =>
            setSelectedIndex(null)
          }
        />

      )}

    </section>
  );
}