function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={photo.author}
          className="w-full h-48 object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Heart Button */}
        <button
          onClick={() => onToggle(photo.id)}
          className="heart-btn absolute top-3 right-3 rounded-full w-9 h-9 flex items-center justify-center"
        >
          <span
            className={`text-lg transition-all duration-200 ${isFavourite ? "scale-110" : "opacity-60"}`}
          >
            {isFavourite ? "❤️" : "🤍"}
          </span>
        </button>
      </div>

      {/* Author */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-blue-100 truncate">
          📸 {photo.author}
        </p>
      </div>
    </div>
  );
}

export default PhotoCard;
