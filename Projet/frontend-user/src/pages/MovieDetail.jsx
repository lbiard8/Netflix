import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movies from '../../../data/movies.json';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useNotification();
  
  const { addToCart, isInCart, isRented } = useCart();

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id.toString() === id);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setMovie(foundMovie);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleRentAction = () => {
    if (isRented(movie.id)) {
      error("Vous possédez déjà ce film !");
      return;
    }

    if (!isInCart(movie.id)) {
      addToCart(movie);
      success("Film ajouté au panier !");
    } else {
      error("Ce film est déjà dans votre panier !");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-bold text-2xl">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-xl font-medium animate-pulse">Chargement...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Film introuvable</h1>
        <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-28 px-8 md:px-16"> 
        <Breadcrumb items={[ 
          { label: 'Films', path: '/' }, 
          { label: movie.genre, path: `/?genre=${movie.genre}` }, 
          { label: movie.title }]} 
        />
      </div>
      <div className="relative h-[80vh] w-full">
        <img 
          src={movie.poster || movie.image} 
          alt={movie.title}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black" />

        <div className="absolute top-24 left-8">
          <Button variant="secondary" onClick={() => navigate(-1)} className="flex items-center gap-2">
            ← Retour
          </Button>
        </div>
        <div className="absolute bottom-12 left-8 md:left-16 flex flex-col md:flex-row items-end gap-8">
          <img 
            src={movie.poster} 
            alt={`Poster de ${movie.title}`} 
            className="w-48 rounded-lg shadow-2xl hidden md:block border-2 border-gray-800"
          />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-4 mb-4 text-sm font-semibold text-gray-400">
              <span className="text-green-400">{movie.rating}/10</span>
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {movie.description}
            </p>
            
            <Button 
              variant={isRented(movie.id) || isInCart(movie.id) ? "secondary" : "primary"} 
              size="lg" 
              onClick={handleRentAction}
              disabled={isRented(movie.id) || isInCart(movie.id)}
            >
              {isRented(movie.id)
                ? "✔ Loué"
                : isInCart(movie.id) ? "Dans le panier" : `▶ Ajouter au panier (${movie.price}€)`
              }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;