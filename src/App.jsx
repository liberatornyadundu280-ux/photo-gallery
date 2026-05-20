import { useReducer, useCallback, useMemo, useEffect, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import PhotoCard from "./components/PhotoCard";

function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE":
      const exists = state.includes(action.id);
      if (exists) {
        return state.filter((id) => id !== action.id);
      } else {
        return [...state, action.id];
      }
    default:
      return state;
  }
}

function getInitialFavourites() {
  const saved = localStorage.getItem("favourites");
  return saved ? JSON.parse(saved) : [];
}

function formatCategory(slug) {
  if (!slug) return "Photo Gallery";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    getInitialFavourites(),
  );

  const [searchQuery, setSearchQuery] = useState("");

  const categoryFilter = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("category") || "";
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesSearch = photo.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !categoryFilter || photo.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [photos, searchQuery, categoryFilter]);

  // ── Loading ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-blue-200 text-sm tracking-widest uppercase">
            Loading Photos
          </p>
        </div>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card rounded-2xl p-8 text-center max-w-sm mx-4">
          <p className="text-4xl mb-3">⚠️</p>
          <p className="text-white font-semibold text-lg mb-1">
            Something went wrong
          </p>
          <p className="text-blue-200 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Main UI ───────────────────────────────────────────
  return (
    <div className="relative min-h-screen z-10">
      {/* Background orbs for depth */}
      <div className="orb w-96 h-96 bg-blue-400 top-0 left-0" />
      <div className="orb w-80 h-80 bg-cyan-300 bottom-0 right-0" />
      <div className="orb w-64 h-64 bg-blue-600 top-1/2 left-1/2" />

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="title-font text-5xl font-extrabold text-white mb-2 tracking-tight">
            {formatCategory(categoryFilter)}
          </h1>
          <p className="text-blue-200 text-sm tracking-widest uppercase">
            {filteredPhotos.length} photos &nbsp;•&nbsp; {favourites.length}{" "}
            favourites
          </p>
          {categoryFilter && (
            <a
              href="/"
              className="inline-block mt-3 text-xs text-blue-300 hover:text-white tracking-widest uppercase transition-colors"
            >
              ← All Photos
            </a>
          )}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by author..."
            value={searchQuery}
            onChange={handleSearch}
            className="glass-input w-full px-5 py-3 rounded-2xl text-white text-sm"
          />
        </div>

        {/* No results */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-blue-200 text-lg">
              No photos found for{" "}
              <span className="text-white font-semibold">"{searchQuery}"</span>
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={handleToggleFavourite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
