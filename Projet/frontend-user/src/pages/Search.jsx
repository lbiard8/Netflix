import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; 
import MovieCard from '../components/movies/MovieCard';
import { useNotification } from '../context/NotificationContext';
import { moviesAPI } from '../services/api'; 

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [sortBy, setSortBy] = useState('rating');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { addToCart, isInCart, isRented } = useCart(); 
    const { success, error } = useNotification();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const response = await moviesAPI.getAll();
                const moviesList = Array.isArray(response) ? response : (response.movies || response.data || []);         
                const filtered = moviesList.filter(movie => 
                    movie.title.toLowerCase().includes(query.toLowerCase()) ||
                    (movie.genre && Array.isArray(movie.genre) && movie.genre.some(g => g.toLowerCase().includes(query.toLowerCase())))
                );
                
                setResults(filtered);
            } catch (err) {
                error("Erreur lors de la recherche");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const sortedResults = [...results].sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'year') return b.year - a.year;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return 0;
    });

    const handleLouer = (movie) => {
        if (isRented(movie._id)) {
            return error("Déjà loué !");
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold">
                    Résultats pour : <span className="text-red-600">"{query}"</span>
                    <span className="ml-4 text-sm text-zinc-500 font-normal">({results.length} films trouvés)</span>
                </h1>

                <div className="flex items-center gap-3 bg-zinc-900 p-2 rounded-lg border border-zinc-800">
                    <label className="text-xs font-bold uppercase text-zinc-500">Trier par :</label>
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent text-sm outline-none cursor-pointer text-white"
                    >
                        <option value="rating" className="bg-zinc-900">Note </option>
                        <option value="year" className="bg-zinc-900">Année </option>
                        <option value="title" className="bg-zinc-900">Nom A-Z </option>
                    </select>
                </div>
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-20">
                    {sortedResults.map(movie => (
                        <MovieCard 
                            key={movie._id} 
                            movie={movie} 
                            onLouer={() => handleLouer(movie)} 
                            isRented={isRented(movie._id)} 
                            isInCart={isInCart(movie._id)} 
                        />
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