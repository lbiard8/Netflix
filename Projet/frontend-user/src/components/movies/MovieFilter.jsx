import { useState } from 'react';

function MovieFilter({ movies, onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const genres = ['all', ...new Set(movies.map(movie => movie.genre))];

  const genreColors = {
    'Action': 'bg-red-500',
    'Comédie': 'bg-yellow-500',
    'Drame': 'bg-blue-500',
    'Science-Fiction': 'bg-purple-500',
    'Horreur': 'bg-orange-500',
    'Thriller': 'bg-gray-500'
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);

    if (genre === 'all') {
      onFilter(movies);
    } else {
      const filteredMovies = movies.filter(movie => movie.genre === genre);
      onFilter(filteredMovies);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((genre) => {
        const isActive = selectedGenre === genre;
        
        const activeClass = genreColors[genre] || 'bg-primary';

        return (
          <button
            key={genre}
            onClick={() => handleGenreChange(genre)}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              isActive
                ? `${activeClass} text-white shadow-md`
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {genre === 'all' ? 'Tous' : genre}
          </button>
        );
      })}
    </div>
  );
}

export default MovieFilter;