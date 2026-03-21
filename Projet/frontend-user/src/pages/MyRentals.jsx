import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

function MyRentals() {
  const navigate = useNavigate();
  const { rentals } = useCart()
  const activeRentals = rentals.filter(rental => {
    const expiry = new Date(rental.expiryDate);
    return expiry > new Date();
  });

  const expiredRentals = rentals.filter(rental => {
    const expiry = new Date(rental.expiryDate);
    return expiry <= new Date();
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-8 md:px-16">
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
        <>
          {activeRentals.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Actives ({activeRentals.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {activeRentals.map((rental) => (
                  <div key={rental._id || rental.id} className="group flex flex-col gap-2">
                    <div 
                      className="relative aspect-[2/3] overflow-hidden rounded-md cursor-pointer border border-zinc-800"
                      onClick={() => navigate(`/movie/${rental.movie?._id || rental.movieId}`)}
                    >
                      <img 
                        src={rental.movie?.poster || rental.poster} 
                        alt={rental.movie?.title || rental.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-bold text-lg truncate">
                        {rental.movie?.title || rental.title}
                    </h3>
                    <p className="text-green-400 text-sm font-medium">
                      Expire dans {Math.ceil((new Date(rental.expiryDate) - new Date()) / (1000 * 60 * 60 * 24))} jour(s)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {expiredRentals.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-zinc-500">Expirées ({expiredRentals.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {expiredRentals.map((rental) => (
                  <div key={rental._id || rental.id} className="group flex flex-col gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md border border-zinc-900">
                      <img 
                        src={rental.movie?.poster || rental.poster} 
                        alt={rental.movie?.title || rental.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg truncate text-zinc-400">
                        {rental.movie?.title || rental.title}
                    </h3>
                    <p className="text-red-500 text-sm italic">Accès expiré</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyRentals;