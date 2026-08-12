import { useState } from "react";

import {
  Plus,
  Trash2,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

import {
  getGalleryImages,
  saveGalleryImages,
  resetGalleryImages,
} from "../utils/galleryStorage";

export default function GalleryManager() {

  const [images, setImages] = useState(
    getGalleryImages()
  );

  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState("WEDDINGS");

  const [url, setUrl] = useState("");

  const [message, setMessage] =
    useState("");

  const updateImages = (newImages) => {

    setImages(newImages);

    saveGalleryImages(newImages);

    window.dispatchEvent(
      new Event("galleryUpdated")
    );
  };

  const addImage = (event) => {

    event.preventDefault();

    if (!title.trim() || !url.trim()) {
      setMessage(
        "Please enter image title and URL."
      );

      return;
    }

    const newImage = {
      id: Date.now(),
      title: title.trim(),
      category,
      url: url.trim(),
    };

    updateImages([
      ...images,
      newImage,
    ]);

    setTitle("");
    setUrl("");

    setMessage("Photo added successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const deleteImage = (id) => {

    const confirmed =
      window.confirm(
        "Delete this photograph?"
      );

    if (!confirmed) {
      return;
    }

    updateImages(
      images.filter(
        (image) => image.id !== id
      )
    );
  };

  const resetImages = () => {

    const confirmed =
      window.confirm(
        "Reset gallery to default photos?"
      );

    if (!confirmed) {
      return;
    }

    const defaults =
      resetGalleryImages();

    setImages(defaults);

    window.dispatchEvent(
      new Event("galleryUpdated")
    );
  };

  return (
    <div className="gallery-manager">

      <div className="manager-header">

        <div>

          <span>
            CONTENT MANAGEMENT
          </span>

          <h2>
            Gallery
          </h2>

        </div>

        <button
          className="reset-gallery-button"
          onClick={resetImages}
        >
          <RotateCcw size={16} />

          Reset Gallery
        </button>

      </div>

      <div className="gallery-manager-grid">

        {/* ADD PHOTO */}

        <section className="add-photo-card">

          <div className="manager-card-icon">
            <ImageIcon size={20} />
          </div>

          <h3>
            Add Photograph
          </h3>

          <p>
            Add a new photograph to
            your public gallery.
          </p>

          <form onSubmit={addImage}>

            <label>
              PHOTO TITLE
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Example: Golden Hour"
            />

            <label>
              CATEGORY
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option>
                WEDDINGS
              </option>

              <option>
                PRE-WEDDING
              </option>

              <option>
                EVENTS
              </option>

              <option>
                PORTRAITS
              </option>

            </select>

            <label>
              IMAGE URL
            </label>

            <input
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://..."
            />

            <button
              type="submit"
              className="add-photo-button"
            >
              <Plus size={18} />
              Add Photograph
            </button>

          </form>

          {message && (
            <div className="manager-message">
              {message}
            </div>
          )}

        </section>


        {/* PHOTOS */}

        <section className="managed-photos">

          <div className="managed-photos-header">

            <h3>
              Current Photos
            </h3>

            <span>
              {images.length} photos
            </span>

          </div>

          <div className="managed-photo-grid">

            {images.map((image) => (

              <article
                className="managed-photo"
                key={image.id}
              >

                <img
                  src={image.url}
                  alt={image.title}
                />

                <div className="managed-photo-info">

                  <div>

                    <span>
                      {image.category}
                    </span>

                    <h4>
                      {image.title}
                    </h4>

                  </div>

                  <button
                    onClick={() =>
                      deleteImage(
                        image.id
                      )
                    }
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>

      </div>

    </div>
  );
}