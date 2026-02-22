import MovieCard from './MovieCard';

function MovieList({ title, movies, onLouer }) {
  return (
    <section className="py-8 px-8 md:px-16">
      {/* Titre de la section */}
      <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
        {title}
      </h2>

      {/* Grille de films */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onLouer={onLouer}/>
          ))
        ) : (
          <p className="text-gray-400">Aucun film disponible pour le moment.</p>
        )}
      </div>
    </section>
  );
}

export default MovieList;