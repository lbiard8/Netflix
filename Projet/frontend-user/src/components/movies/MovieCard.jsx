import Button from '../common/Button';
import MovieDescription from './MovieDescription';
import { useState } from 'react';

const genreColors = {
  'Action': 'bg-red-500',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-500',
  'Science-Fiction': 'bg-purple-500',
  'Horreur': 'bg-orange-500',
  'Thriller': 'bg-gray-500'
 };

function MovieCard({ movie }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  return (
    <div className="group relative h-80 w-full overflow-hidden rounded-md bg-zinc-900 transition-all duration-300 hover:scale-105 hover:z-10 text-center">
      {/* Image principale */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-30"
      />

      <div className="absolute top-2 left-2 z-10 rounded bg-black/60 px-2 py-1 text-xs text-yellow-500 backdrop-blur-md">
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Empêche le clic de se propager au parent (la carte du film)
            setIsLiked(!isLiked);
            setLikes(prev => isLiked ? prev - 1 : prev + 1);
          }} 
          className="like-button"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            position: 'relative', 
            zIndex: 20            
          }}
        >
          {isLiked ? '❤' : '🤍'}
        </button>
      </div>

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

        <MovieDescription description={movie.description} />

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Button variant="primary" size="sm" className="w-full text-[10px]">
            ▶ Louer {movie.price}€
          </Button>
          <Button variant="secondary" size="sm" className="px-2">
            + Info Movie
          </Button>
        </div>
      </div>
      <div className={`absolute bottom-2 left-2 w-4 h-4 rounded-full ${genreColors[movie.genre] || 'bg-gray-400'}`} />
    </div>
  );
}

export default MovieCard;