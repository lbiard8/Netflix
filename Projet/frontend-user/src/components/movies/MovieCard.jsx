import Button from '../common/Button';

function MovieCard({ movie }) {
  return (
    <div className="group relative h-40 w-full overflow-hidden rounded-md bg-zinc-900 transition-all duration-300 hover:scale-105 hover:z-10">
      {/* Image principale */}
      <img
        src={movie.image}
        alt={movie.title}
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-30"
      />

      {/* Badge de note (visible par défaut) */}
      <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 text-xs text-yellow-500 backdrop-blur-md">
        ⭐ {movie.rating}
      </div>

      {/* Overlay au hover */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-sm font-bold text-white">{movie.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-300">
          <span className="text-green-400">{movie.rating}/10</span>
          <span>{movie.year}</span>
          <span>{movie.duration}min</span>
        </div>

        <p className="mt-2 line-clamp-2 text-[10px] text-gray-400">
          {movie.description}
        </p>

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Button variant="primary" size="sm" className="w-full text-[10px]">
            ▶ Louer {movie.price}€
          </Button>
          <Button variant="secondary" size="sm" className="px-2">
            + Info
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;