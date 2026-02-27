import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function MyRentals() {
  const navigate = useNavigate();
  
  const [rentals] = useState(() => {
    const savedRentals = localStorage.getItem('rentals');
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-8 md:px-16">
      <h1 className="text-4xl font-bold mb-12">Mes locations</h1>

      {rentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <div className="text-6xl text-zinc-700 mb-6">🎬</div> 
          <p className="text-zinc-400 text-xl mb-8">Aucune location pour le moment</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Découvrir des films
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {rentals.map((movie) => (
            <div key={movie.id} className="group flex flex-col gap-2">
              <div 
                className="relative aspect-[2/3] overflow-hidden rounded-md cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img 
                  src={movie.poster} 
                  alt={movie.title} 
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-lg">{movie.title}</h3>
              <p className="text-red-500 text-sm italic font-medium">
                Expire le : {movie.dateFin || "Date inconnue"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRentals;