import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

function MyRentals() {
  const navigate = useNavigate();
  const { rentals, cancelRental } = useCart();

  const activeRentals = rentals.filter(rental => {
    const expiry = new Date(rental.expiryDate);
    return rental.status !== 'cancelled' && expiry > new Date();
  });

  const inactiveRentals = rentals.filter(rental => {
    const expiry = new Date(rental.expiryDate);
    return rental.status === 'cancelled' || expiry <= new Date();
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
          {/* SECTION ACTIVES */}
          {activeRentals.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Actives ({activeRentals.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {activeRentals.map((rental) => (
                  <div key={rental._id || rental.id} className="group flex flex-col gap-2 relative">
                    <div 
                      className="relative aspect-[2/3] overflow-hidden rounded-md cursor-pointer border border-zinc-800"
                      onClick={() => navigate(`/movie/${rental.movie?._id || rental.movieId}`)}
                    >
                      <img 
                        src={rental.movie?.poster || rental.poster} 
                        alt={rental.movie?.title || rental.title} 
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      
                      {/* BOUTON ANNULER*/}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if(window.confirm("Annuler cette location ?")) cancelRental(rental._id || rental.id);
                        }}
                        className="absolute bottom-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-md z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
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

          {/* SECTION EXPIRÉES ET ANNULÉES */}
          {inactiveRentals.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-zinc-500">Historique / Inactives ({inactiveRentals.length})</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {inactiveRentals.map((rental) => (
                  <div key={rental._id || rental.id} className="group flex flex-col gap-2 opacity-40 grayscale transition-all">
                    <div className="relative aspect-[2/3] overflow-hidden rounded-md border border-zinc-900">
                      <img 
                        src={rental.movie?.poster || rental.poster} 
                        alt={rental.movie?.title || rental.title} 
                        className="h-full w-full object-cover"
                      />
                      {/* BADGE ANNULÉ / EXPIRÉ */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="text-red-500 font-bold uppercase tracking-widest text-xs border-2 border-red-500 px-2 py-1 rotate-12">
                          {rental.status === 'cancelled' ? 'Annulé' : 'Expiré'}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg truncate text-zinc-400">
                        {rental.movie?.title || rental.title}
                    </h3>
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