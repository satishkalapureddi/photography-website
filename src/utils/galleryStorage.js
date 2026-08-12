const STORAGE_KEY = "visuals_gallery";

const defaultImages = [
  {
    id: 1,
    title: "Forever Begins",
    category: "WEDDINGS",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "PRE-WEDDING",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "The Celebration",
    category: "EVENTS",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    title: "Pure Emotion",
    category: "PORTRAITS",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    title: "Love Story",
    category: "PRE-WEDDING",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    title: "Moments",
    category: "WEDDINGS",
    url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1200&q=85",
  },
];

export function getGalleryImages() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultImages)
    );

    return defaultImages;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return defaultImages;
  }
}

export function saveGalleryImages(images) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(images)
  );
}

export function resetGalleryImages() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(defaultImages)
  );

  return defaultImages;
}