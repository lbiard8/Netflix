import Button from '../common/Button';

function MovieHero({ movie, onLouer }) {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover opacity-60"
        />
        {/* Gradient overlays : noir en bas et sur la gauche pour le texte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-center px-8 md:px-16 lg:w-2/3">
        {/* Title */}
        <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
          {movie.title}
        </h1>

        {/* Meta information */}
        <div className="mt-4 flex items-center gap-4 text-sm font-semibold md:text-base">
          <span className="text-green-400">{movie.rating}/10</span>
          <span className="text-gray-300">{movie.year}</span>
          <span className="text-gray-300">{movie.duration} min</span>
          <span className="rounded border border-gray-500 px-2 py-0.5 text-xs text-gray-300">
            {movie.genre}
          </span>
        </div>

        {/* Description */}
        <p className="mt-6 line-clamp-3 max-w-2xl text-lg text-gray-200 shadow-black drop-shadow-md">
          {movie.description}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button 
          variant="primary" 
          size="lg" // Tu peux mettre "lg" pour le Hero
          onClick={() => onLouer(movie)}
          className="px-8 py-3 font-bold"
        >
          ▶ Louer pour {movie.price}€
        </Button>
          
          <Button variant="secondary" size="lg" className="gap-2">
            <span className="text-xl">ⓘ</span> Plus d'infos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;