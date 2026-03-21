import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import movies from '../../../data/movies.json';
import { useCart } from '../context/CartContext'; 
import MovieCard from '../components/movies/MovieCard';
import { useNotification } from '../context/NotificationContext';

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [sortBy, setSortBy] = useState('rating');
    const { addToCart, isInCart, isRented } = useCart(); 
    const { success, error } = useNotification();

  const results = movies.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.genre.toLowerCase().includes(query.toLowerCase())
  );

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleLouer = (movie) => {
    if (!isInCart(movie.id)) { 
      addToCart(movie); 
      success("Film ajouté au panier !");
    } else {
      error("Ce film est déjà dans votre panier !");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">
          Résultats pour : <span className="text-red-600">"{query}"</span>
          <span className="ml-4 text-sm text-zinc-500 font-normal">({results.length} films trouvés)</span>
        </h1>

        {/* Barre de Tri */}
        <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-lg border border-zinc-800">
          <label className="text-xs font-bold uppercase text-zinc-500">Trier par :</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-sm outline-none cursor-pointer"
          >
            <option value="rating" className="bg-zinc-900">Note ⭐</option>
            <option value="year" className="bg-zinc-900">Année 📅</option>
            <option value="title" className="bg-zinc-900">Nom A-Z 🔠</option>
          </select>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {sortedResults.map(movie => (
            <MovieCard key={movie.id} movie={movie} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-zinc-500 text-xl">Désolé, aucun film ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}

export default Search;