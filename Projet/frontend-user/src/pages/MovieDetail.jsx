import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { moviesAPI } from '../services/api';
import MovieCard from '../components/movies/MovieCard';
import MovieDescription from '../components/movies/MovieDescription';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const { success, error } = useNotification();
  const { addToCart, isInCart, isRented } = useCart();
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieAndSimilar = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const response = await moviesAPI.getById(id);
        const currentMovie = response.data;
        setMovie(currentMovie);
        const allMoviesResponse = await moviesAPI.getAll();
        const allMovies = Array.isArray(allMoviesResponse) ? allMoviesResponse : allMoviesResponse.data;
        const filtered = allMovies.filter(m => {
          if (m._id === currentMovie._id) return false;
          const currentGenres = Array.isArray(currentMovie.genre) ? currentMovie.genre : [currentMovie.genre];
          const targetGenres = Array.isArray(m.genre) ? m.genre : [m.genre];
          return currentGenres.some(g => targetGenres.includes(g));
        }).slice(0, 5);
        setSimilarMovies(filtered);
      } catch (err) {
        console.error(err);
        error("Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieAndSimilar();
  }, [id]);

  const handleRentAction = () => {
    if (isRented(movie._id)) {
      error("Vous possédez déjà ce film !");
      return;
    }
    if (!isInCart(movie._id)) {
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
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      <div className="pt-28 px-8 md:px-16"> 
        <Breadcrumb items={[ 
          { label: 'Films', path: '/' }, 
          { 
            label: Array.isArray(movie.genre) ? movie.genre.join(' & ') : movie.genre, 
            path: `/?genre=${Array.isArray(movie.genre) ? movie.genre[0] : movie.genre}` 
          }, 
          { label: movie.title }]} 
        />
      </div>
      <div className="relative h-[80vh] w-full mt-8">
        <div className="absolute inset-0">
          <img 
            src={movie.backdrop || movie.poster} 
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        <div className="absolute top-8 left-8 md:left-16 z-20">
          <Button 
            variant="secondary" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 bg-black/50 hover:bg-black/80 backdrop-blur-sm border-none"
          >
            ← Retour
          </Button>
        </div>
        <div className="relative z-10 h-full flex flex-col md:flex-row items-end pb-12 px-8 md:px-16 gap-8 text-left">
          <img 
            src={movie.poster} 
            alt={`Poster de ${movie.title}`} 
            className="w-48 rounded-lg shadow-2xl hidden md:block border border-zinc-800"
          />
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-4 mb-4 text-sm font-semibold text-gray-400">
              <span className="text-green-400">{movie.rating}/10</span>
              <span>{movie.year}</span>
              <span>{movie.duration} min</span>
              <span className="text-zinc-500 uppercase border border-zinc-800 px-2 py-0.5 rounded text-xs">
                {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
              </span>
            </div>
            <div className="mb-6">
               <MovieDescription description={movie.description} />
            </div>
            <Button 
              variant={isRented(movie._id) || isInCart(movie._id) ? "secondary" : "primary"} 
              size="lg" 
              onClick={handleRentAction}
              disabled={isRented(movie._id) || isInCart(movie._id)}
              className="px-8"
            >
              {isRented(movie._id)
                ? "✔ Déjà Loué"
                : isInCart(movie._id) ? "Dans le panier" : `▶ Louer pour ${movie.price}€`
              }
            </Button>
          </div>
        </div>
      </div>

      {/* INFOS TECHNIQUES */}
      <div className="mt-10 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 max-w-2xl ml-10 ">
        <h3 className="text-xl font-bold mb-4 text-white">Informations</h3>
        <div className="space-y-4">
          <div className="flex border-b border-zinc-800/50 pb-2">
            <span className="w-32 text-gray-500 font-medium">Genre:</span>
            <span className="text-gray-200">
              {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
            </span>
          </div>
          <div className="flex border-b border-zinc-800/50 pb-2">
            <span className="w-32 text-gray-500 font-medium">Année:</span>
            <span className="text-gray-200">{movie.year}</span>
          </div>
          <div className="flex border-b border-zinc-800/50 pb-2">
            <span className="w-32 text-gray-500 font-medium">Durée:</span>
            <span className="text-gray-200">{movie.duration} minutes</span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-500 font-medium">Note:</span>
            <span className="text-red-500 font-bold">{movie.rating}/10</span>
          </div>
        </div>
      </div>

      {/* FILMS SIMILAIRES */}
      <div className="px-8 md:px-16 mt-20">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4">Films similaires</h2>
        {similarMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {similarMovies.map(similar => (
              <MovieCard 
                key={similar._id} 
                movie={similar} 
                isRented={isRented} 
                onLouer={() => addToCart(similar)}
                isInCart={isInCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Aucun film similaire pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;