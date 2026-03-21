import Button from '../common/Button';
import MovieDescription from './MovieDescription';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const genreColors = {
  'Action': 'bg-red-500',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-500',
  'Science-Fiction': 'bg-purple-500',
  'Horreur': 'bg-orange-500',
  'Thriller': 'bg-gray-500'
};

function MovieCard({ movie, onLouer, isRented }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const isAlreadyRented = isRented ? isRented(movie.id || movie._id) : false;
  const handleCardClick = () => {
    navigate(`/movie/${movie.id || movie._id}`); 
  };

  return (
    <div className="group relative h-[400px] w-full overflow-hidden rounded-md bg-zinc-900 transition-all duration-300 hover:scale-110 hover:z-50 text-center shadow-2xl border border-zinc-800">
      
      {/* Image de fond */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-20" 
      />

      {/* Badges du haut */}
      <div className="absolute top-2 left-2 z-20 rounded bg-black/60 px-2 py-1 text-xs text-yellow-500 backdrop-blur-md">
        <button onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} className="cursor-pointer">
          {isLiked ? '❤' : '🤍'}
        </button>
      </div>

      <div className="absolute top-2 right-2 z-20 rounded bg-black/60 px-2 py-1 text-xs text-yellow-500 backdrop-blur-md font-bold">
        ⭐ {movie.rating}
      </div>

      {/* Overlay Détails */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 
                      opacity-0 group-hover:opacity-100 
                      pointer-events-none group-hover:pointer-events-auto
                      transition-all duration-300 
                      bg-gradient-to-t from-black via-black/90 to-transparent"> 
        
        <h3 className="text-sm font-bold text-white mb-1 truncate">{movie.title}</h3>

        <div className="mb-2 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
          <span className="text-green-400">{movie.rating}/10</span>
          <span>{movie.year}</span>
          <span>{movie.duration}min</span>
        </div>

        <div className="text-[10px] text-gray-300 mb-4 overflow-hidden leading-relaxed italic"
             style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          <MovieDescription description={movie.description} />
        </div>

        {/* Boutons en bas */}
        <div className="mt-2 flex gap-2">
          <Button
            variant="primary" 
            size="sm" 
            disabled={isAlreadyRented}
            onClick={(e) => { e.stopPropagation(); if (!isAlreadyRented) onLouer(movie); }}
            className={`flex-1 text-[9px] py-2 rounded font-bold uppercase transition-colors ${
              isAlreadyRented ? 'bg-zinc-700 border-zinc-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isAlreadyRented ? "✔ Loué" : `Louer ${movie.price}€`}
          </Button>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="px-2 text-[9px] bg-zinc-800 hover:bg-zinc-700 border-none"
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
          >
            + Infos
          </Button>
        </div>
      </div>

      {/* Pastille de genre */}
      <div className={`absolute bottom-2 left-2 w-3 h-3 rounded-full z-10 ${genreColors[movie.genre] || 'bg-gray-400'}`} />
    </div>
  );
}

export default MovieCard;