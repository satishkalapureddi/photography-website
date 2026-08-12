import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Lightbox({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) {

  const currentImage =
    images[currentIndex];

  const nextImage = () => {
    setCurrentIndex(
      (currentIndex + 1) %
        images.length
    );
  };

  const previousImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + images.length) %
        images.length
    );
  };

  useEffect(() => {

    const handleKeyboard = (event) => {

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyboard
    );

    document.body.style.overflow =
      "hidden";

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyboard
      );

      document.body.style.overflow =
        "";
    };

  }, [currentIndex]);

  if (!currentImage) {
    return null;
  }

  return (
    <AnimatePresence>

      <motion.div
        className="lightbox"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >

        <button
          className="lightbox-close"
          onClick={onClose}
        >
          <X size={25} />
        </button>

        <button
          className="lightbox-prev"
          onClick={previousImage}
        >
          <ChevronLeft size={30} />
        </button>

        <motion.div
          className="lightbox-image-wrapper"
          key={currentImage.url}
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.35,
          }}
        >

          <img
            src={currentImage.url}
            alt={currentImage.title}
          />

          <div className="lightbox-caption">

            <span>
              {currentIndex + 1}
              {" / "}
              {images.length}
            </span>

            <strong>
              {currentImage.title}
            </strong>

          </div>

        </motion.div>

        <button
          className="lightbox-next"
          onClick={nextImage}
        >
          <ChevronRight size={30} />
        </button>

      </motion.div>

    </AnimatePresence>
  );
}