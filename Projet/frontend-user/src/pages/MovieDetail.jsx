import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movies from '../../../data/movies.json';
import Button from '../components/common/Button';
import Navbar from '../components/common/Navbar';
import Breadcrumb from '../components/common/Breadcrumb';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [panier, setPanier] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const checkRented = () => {
    if (!movie) return false;
    const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
    return rentals.some(m => m.id === movie.id);
  };

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id.toString() === id);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setMovie(foundMovie);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleRent = () => {
    const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
    if (rentals.find(m => m.id === movie.id)) {
        return;
    }

    const isInCart = panier.find(m => m.id === movie.id);
    if (!isInCart) {
        const nouveauPanier = [...panier, movie];
        setPanier(nouveauPanier);
        localStorage.setItem('cart', JSON.stringify(nouveauPanier));
        alert("Film ajouté au panier !");
    } else {
        alert("Ce film est déjà dans votre panier !");
    }
  };

  const handleRemove = (movieId) => {
    const nouveauPanier = panier.filter(item => item.id !== movieId);
    setPanier(nouveauPanier);
    localStorage.setItem('cart', JSON.stringify(nouveauPanier));
  };

  const handlePaiement = () => {
    const dateExp = new Date();
    dateExp.setMonth(dateExp.getMonth() + 2);
    const dateString = dateExp.toLocaleDateString('fr-FR');
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const currentRentals = JSON.parse(localStorage.getItem('rentals')) || [];
    const nouveauxFilmsLoues = currentCart.map(m => ({...m, dateFin: dateString}));
    
    localStorage.setItem('rentals', JSON.stringify([...currentRentals, ...nouveauxFilmsLoues]));
    localStorage.removeItem('cart');
    setPanier([]);
    alert(`Merci ! Vos films sont loués jusqu'au ${dateString}`);
    navigate('/my-rentals');
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

  const isRented = checkRented();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar itemsInCart={panier} onRemove={handleRemove} onCheckout={handlePaiement} />
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
              variant={isRented ? "secondary" : "primary"} 
              size="lg" 
              onClick={handleRent}
            >
                {isRented ? "✔ Loué" : `▶ Ajouter au panier (${movie.price}€)`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;