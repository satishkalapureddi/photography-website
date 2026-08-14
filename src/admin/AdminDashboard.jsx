import GalleryManager from "./GalleryManager";
import "./Admin.css";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Images,
  Briefcase,
  User,
  Phone,
  LogOut,
  Plus,
  Upload,
  Trash2,
  Save,
  Menu,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [services, setServices] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "visuals_services"
        );

      if (saved) {
        return JSON.parse(saved);
      }

      return [
        {
          id: 1,
          title: "Wedding Photography",
          category: "WEDDINGS",
        },
        {
          id: 2,
          title: "Pre-Wedding",
          category: "COUPLES",
        },
        {
          id: 3,
          title: "Events",
          category: "CELEBRATIONS",
        },
        {
          id: 4,
          title: "Portraits",
          category: "PORTRAITS",
        },
      ];
    });

  const [gallery, setGallery] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "visuals_gallery"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  const [galleryTitle, setGalleryTitle] =
    useState("");

  const [galleryCategory, setGalleryCategory] =
    useState("WEDDINGS");

  const [galleryUploading, setGalleryUploading] =
    useState(false);

  const [galleryMessage, setGalleryMessage] =
    useState("");

  const [about, setAbout] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "visuals_about"
        );

      return saved
        ? JSON.parse(saved)
        : {
            title:
              "We believe the best photographs feel real.",
            description:
              "Photography is about preserving emotions, connections and memories.",
          };
    });

  const [contact, setContact] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "visuals_contact"
        );

      return saved
        ? JSON.parse(saved)
        : {
            phone: "+91 XXXXX XXXXX",
            whatsapp: "91XXXXXXXXXX",
            email: "hello@visuals20.com",
            location:
              "Andhra Pradesh, India",
            instagram:
              "https://instagram.com/",
          };
    });

  useEffect(() => {

    localStorage.setItem(
      "visuals_services",
      JSON.stringify(services)
    );

  }, [services]);

  useEffect(() => {

    localStorage.setItem(
      "visuals_gallery",
      JSON.stringify(gallery)
    );

  }, [gallery]);

  useEffect(() => {

    localStorage.setItem(
      "visuals_about",
      JSON.stringify(about)
    );

  }, [about]);

  useEffect(() => {

    localStorage.setItem(
      "visuals_contact",
      JSON.stringify(contact)
    );

  }, [contact]);

 const handleLogout = () => {
  localStorage.removeItem("visuals_admin");

  navigate("/admin");
};

  const addService = () => {

    const newService = {
      id: Date.now(),
      title: "New Service",
      category: "CATEGORY",
    };

    setServices([
      ...services,
      newService,
    ]);
  };

  const deleteService = (id) => {

    setServices(
      services.filter(
        (service) =>
          service.id !== id
      )
    );
  };

  const updateService = (
    id,
    field,
    value
  ) => {

    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              [field]: value,
            }
          : service
      )
    );
  };

  const addGalleryImage = () => {

    const input =
      document.getElementById(
        "gallery-image-upload"
      );

    if (input) {
      input.click();
    }
  };

  const handleGalleryUpload = async (event) => {

    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setGalleryMessage(
        "Please choose an image file."
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setGalleryMessage(
        "Please choose an image smaller than 10 MB."
      );
      return;
    }

    const cloudName =
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setGalleryMessage(
        "Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to Vercel Environment Variables."
      );
      return;
    }

    setGalleryUploading(true);
    setGalleryMessage("Uploading photograph...");

    try {

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "upload_preset",
        uploadPreset
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.secure_url) {
        throw new Error(
          result.error?.message ||
          "Image upload failed."
        );
      }

      const newImage = {
        id: Date.now(),
        title:
          galleryTitle.trim() ||
          file.name.replace(
            /\\.[^/.]+$/,
            ""
          ),
        category: galleryCategory,
        url: result.secure_url,
      };

      setGallery([
        ...gallery,
        newImage,
      ]);

      setGalleryTitle("");
      setGalleryCategory("WEDDINGS");
      setGalleryMessage(
        "Photograph uploaded successfully."
      );

      setTimeout(() => {
        setGalleryMessage("");
      }, 3000);

    } catch (error) {

      setGalleryMessage(
        error.message ||
        "Unable to upload photograph."
      );

    } finally {

      setGalleryUploading(false);

    }
  };

  const deleteGalleryImage = (id) => {

    setGallery(
      gallery.filter(
        (image) =>
          image.id !== id
      )
    );
  };

  const changeSection = (section) => {

    setActiveSection(section);

    setMobileMenu(false);
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <aside
        className={
          mobileMenu
            ? "admin-sidebar active"
            : "admin-sidebar"
        }
      >

        <div className="admin-sidebar-top">

          <div className="admin-logo">
            REDDY<span> PHOTOGRAPHY</span>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            <X />
          </button>

        </div>

        <p className="admin-nav-label">
          MANAGEMENT
        </p>

        <button
          className={
            activeSection === "dashboard"
              ? "admin-nav active"
              : "admin-nav"
          }
          onClick={() =>
            changeSection("dashboard")
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button
          className={
            activeSection === "services"
              ? "admin-nav active"
              : "admin-nav"
          }
          onClick={() =>
            changeSection("services")
          }
        >
          <Briefcase size={18} />
          Services
        </button>

        <button
          className={
            activeSection === "gallery"
              ? "admin-nav active"
              : "admin-nav"
          }
          onClick={() =>
            changeSection("gallery")
          }
        >
          <Images size={18} />
          Gallery
        </button>

        <button
          className={
            activeSection === "about"
              ? "admin-nav active"
              : "admin-nav"
          }
          onClick={() =>
            changeSection("about")
          }
        >
          <User size={18} />
          About
        </button>

        <button
          className={
            activeSection === "contact"
              ? "admin-nav active"
              : "admin-nav"
          }
          onClick={() =>
            changeSection("contact")
          }
        >
          <Phone size={18} />
          Contact
        </button>

        <div className="admin-sidebar-bottom">

          <button
  className="admin-nav logout"
  onClick={handleLogout}
>
            <LogOut size={18} />
            Logout
          </button>


        </div>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        <header className="admin-header">

          <button
            className="admin-mobile-menu"
            onClick={() =>
              setMobileMenu(true)
            }
          >
            <Menu />
          </button>

          <div>

            <p>
              ADMIN PANEL
            </p>

            <h1>
              {activeSection ===
                "dashboard" &&
                "Dashboard"}

              {activeSection ===
                "services" &&
                "Services"}

              {activeSection ===
                "gallery" &&
                "Gallery"}

              {activeSection ===
                "about" &&
                "About"}

              {activeSection ===
                "contact" &&
                "Contact"}
            </h1>

          </div>

          <div className="admin-status">
            <span />
            Online
          </div>

        </header>

        {/* DASHBOARD */}

        {activeSection ===
          "dashboard" && (

          <section className="admin-content">

            <div className="admin-welcome">

              <p>
                WELCOME BACK
              </p>

              <h2>
                Manage your
                <br />
                <em>photography studio.</em>
              </h2>

            </div>

            <div className="admin-stats">

              <AdminStat
                title="Services"
                value={services.length}
              />

              <AdminStat
                title="Gallery Images"
                value={gallery.length}
              />

              <AdminStat
                title="Website"
                value="LIVE"
              />

              <AdminStat
                title="WhatsApp"
                value="ON"
              />

            </div>

            <div className="admin-quick">

              <h3>
                Quick Actions
              </h3>

              <div>

                <button
                  onClick={() =>
                    changeSection(
                      "services"
                    )
                  }
                >
                  <Briefcase />
                  Manage Services
                </button>

                <button
                  onClick={() =>
                    changeSection(
                      "gallery"
                    )
                  }
                >
                  <Images />
                  Manage Gallery
                </button>

                <button
                  onClick={() =>
                    changeSection(
                      "contact"
                    )
                  }
                >
                  <Phone />
                  Contact Settings
                </button>

              </div>

            </div>

            {/* <GalleryManager /> */}

          </section>
        )}

        {/* SERVICES */}

        {activeSection ===
          "services" && (

          <section className="admin-content">

            <div className="admin-section-header">

              <div>

                <p>
                  CONTENT
                </p>

                <h2>
                  Services
                </h2>

              </div>

              <button
                className="admin-primary"
                onClick={addService}
              >
                <Plus size={18} />
                Add Service
              </button>

            </div>

            <div className="service-admin-list">

              {services.map(
                (service) => (

                  <div
                    className="service-admin-card"
                    key={service.id}
                  >

                    <div className="service-admin-number">
                      #
                      {String(
                        service.id
                      ).slice(-2)}
                    </div>

                    <div>

                      <label>
                        SERVICE NAME
                      </label>

                      <input
                        value={
                          service.title
                        }
                        onChange={(e) =>
                          updateService(
                            service.id,
                            "title",
                            e.target.value
                          )
                        }
                      />

                    </div>

                    <div>

                      <label>
                        CATEGORY
                      </label>

                      <input
                        value={
                          service.category
                        }
                        onChange={(e) =>
                          updateService(
                            service.id,
                            "category",
                            e.target.value
                          )
                        }
                      />

                    </div>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteService(
                          service.id
                        )
                      }
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                )
              )}

            </div>

          </section>
        )}

        {/* GALLERY */}

        {activeSection ===
          "gallery" && (

          <section className="admin-content">

            <div className="admin-section-header">

              <div>

                <p>
                  PHOTOGRAPHY
                </p>

                <h2>
                  Gallery
                </h2>

              </div>

              <button
                className="admin-primary"
                onClick={
                  addGalleryImage
                }
                disabled={galleryUploading}
              >
                <Upload size={18} />
                {galleryUploading
                  ? "Uploading..."
                  : "Upload Image"}
              </button>

            </div>

            <input
              id="gallery-image-upload"
              type="file"
              accept="image/*"
              onChange={
                handleGalleryUpload
              }
              style={{
                display: "none",
              }}
            />

            <div className="admin-gallery-upload-card">

              <div className="admin-gallery-upload-fields">

                <div>
                  <label>
                    PHOTO TITLE
                  </label>

                  <input
                    value={galleryTitle}
                    onChange={(e) =>
                      setGalleryTitle(
                        e.target.value
                      )
                    }
                    placeholder="Example: Golden Hour"
                  />
                </div>

                <div>
                  <label>
                    CATEGORY
                  </label>

                  <select
                    value={galleryCategory}
                    onChange={(e) =>
                      setGalleryCategory(
                        e.target.value
                      )
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
                </div>

              </div>

              <button
                className="gallery-upload-button"
                onClick={
                  addGalleryImage
                }
                disabled={galleryUploading}
              >
                <Upload size={18} />

                {galleryUploading
                  ? "Uploading photograph..."
                  : "Choose Photo & Upload"}
              </button>

              <p className="gallery-upload-help">
                JPG, PNG or WEBP • Maximum 10 MB
              </p>

              {galleryMessage && (
                <div
                  className={
                    galleryMessage.includes(
                      "successfully"
                    )
                      ? "gallery-upload-message success"
                      : "gallery-upload-message"
                  }
                >
                  {galleryMessage}
                </div>
              )}

            </div>

            {gallery.length === 0 ? (

              <div className="empty-gallery">

                <Images size={40} />

                <h3>
                  No images yet
                </h3>

                <p>
                  Choose a photograph above
                  to add it to your gallery.
                </p>

              </div>

            ) : (

              <div className="admin-gallery-grid">

                {gallery.map(
                  (image) => (

                    <div
                      className="admin-gallery-card"
                      key={image.id}
                    >

                      <img
                        src={image.url}
                        alt={
                          image.title ||
                          "Gallery photograph"
                        }
                      />

                      <div className="admin-gallery-card-info">
                        <span>
                          {image.category ||
                            "PHOTOGRAPHY"}
                        </span>

                        <strong>
                          {image.title ||
                            "Untitled"}
                        </strong>
                      </div>

                      <button
                        onClick={() =>
                          deleteGalleryImage(
                            image.id
                          )
                        }
                        title="Delete image"
                      >
                        <Trash2
                          size={18}
                        />
                      </button>

                    </div>
                  )
                )}

              </div>

            )}

          </section>
        )}

        {/* ABOUT */}

        {activeSection ===
          "about" && (

          <section className="admin-content">

            <div className="admin-section-header">

              <div>

                <p>
                  WEBSITE CONTENT
                </p>

                <h2>
                  About
                </h2>

              </div>

              <button
                className="saved-button"
              >
                <Save size={17} />
                Auto Saved
              </button>

            </div>

            <div className="admin-form-card">

              <label>
                MAIN TITLE
              </label>

              <input
                value={about.title}
                onChange={(e) =>
                  setAbout({
                    ...about,
                    title:
                      e.target.value,
                  })
                }
              />

              <label>
                DESCRIPTION
              </label>

              <textarea
                rows="8"
                value={
                  about.description
                }
                onChange={(e) =>
                  setAbout({
                    ...about,
                    description:
                      e.target.value,
                  })
                }
              />

            </div>

          </section>
        )}

        {/* CONTACT */}

        {activeSection ===
          "contact" && (

          <section className="admin-content">

            <div className="admin-section-header">

              <div>

                <p>
                  BUSINESS DETAILS
                </p>

                <h2>
                  Contact
                </h2>

              </div>

              <button
                className="saved-button"
              >
                <Save size={17} />
                Auto Saved
              </button>

            </div>

            <div className="admin-form-card">

              <AdminField
                label="PHONE"
                value={contact.phone}
                onChange={(value) =>
                  setContact({
                    ...contact,
                    phone: value,
                  })
                }
              />

              <AdminField
                label="WHATSAPP NUMBER"
                value={
                  contact.whatsapp
                }
                onChange={(value) =>
                  setContact({
                    ...contact,
                    whatsapp: value,
                  })
                }
              />

              <AdminField
                label="EMAIL"
                value={contact.email}
                onChange={(value) =>
                  setContact({
                    ...contact,
                    email: value,
                  })
                }
              />

              <AdminField
                label="LOCATION"
                value={
                  contact.location
                }
                onChange={(value) =>
                  setContact({
                    ...contact,
                    location: value,
                  })
                }
              />

              <AdminField
                label="INSTAGRAM URL"
                value={
                  contact.instagram
                }
                onChange={(value) =>
                  setContact({
                    ...contact,
                    instagram: value,
                  })
                }
              />

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

function AdminStat({
  title,
  value,
}) {
  return (
    <div className="admin-stat">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}

function AdminField({
  label,
  value,
  onChange,
}) {
  return (
    <div className="admin-form-group">

      <label>
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />

    </div>
  );
}