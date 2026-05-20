import { useState, useEffect } from "react";

const CATEGORIES = [
  "prize-giving",
  "sciences",
  "cultural-day",
  "ict",
  "sport",
  "arts",
];

function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?limit=30")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch photos");
        return res.json();
      })
      .then((data) => {
        const categorized = data.map((photo, i) => ({
          ...photo,
          category: CATEGORIES[i % CATEGORIES.length],
        }));
        setPhotos(categorized);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;
