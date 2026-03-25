import { useState } from 'react';

function MovieFilter({ movies, onFilter }) {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const allGenres = movies.flatMap(m => {
    if (!m.genre) return [];
    return Array.isArray(m.genre) 
      ? m.genre 
      : m.genre.split(',').map(g => g.trim());
  });
  const genres = ['all', ...new Set(allGenres)];
  const colors = [
    'bg-red-600', 
    'bg-blue-600', 
    'bg-purple-600', 
    'bg-green-600', 
    'bg-yellow-600', 
    'bg-pink-600', 
    'bg-indigo-600'
  ];

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    if (genre === 'all') {
      onFilter(movies);
    } else {
      const filteredMovies = movies.filter(movie => {
        if (!movie.genre) return false;
                const movieGenres = Array.isArray(movie.genre) 
          ? movie.genre 
          : movie.genre.split(',').map(g => g.trim());
        return movieGenres.includes(genre);
      });
      onFilter(filteredMovies);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre, index) => {
        const isActive = selectedGenre === genre;
        const bgColor = genre === 'all' 
          ? (isActive ? 'bg-red-600' : 'bg-gray-800') 
          : (isActive ? colors[index % colors.length] : 'bg-gray-800');

        return (
          <button
            key={`${genre}-${index}`}
            onClick={() => handleGenreChange(genre)}
            className={`px-4 py-2 rounded-md transition-all duration-300 font-medium text-sm ${bgColor} ${
              isActive ? 'text-white scale-105 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-700'
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