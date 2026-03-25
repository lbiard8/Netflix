import { useEffect, useState, useMemo } from 'react';
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieCarousel from "../components/movies/MovieCarousel";
import MovieFilter from "../components/movies/MovieFilter";
import Navbar from "../components/common/Navbar";
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import { moviesAPI } from '../services/api';

function Home() {
    const [allMovies, setAllMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]); 
    const [loading, setLoading] = useState(true);
    const { addToCart, isRented, isInCart, loadRentals, rentals, setRentals } = useCart();
    const { success, error } = useNotification();
    const { user } = useAuth();

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            const moviesRes = await moviesAPI.getAll();

            const moviesList = Array.isArray(moviesRes) ? moviesRes : (moviesRes.movies || moviesRes.data || []);
            setAllMovies(moviesList);
            setFilteredMovies(moviesList);
            if (user) {
                await loadRentals();
            }
            if (rentals.length === 0 && moviesList.length > 0) {
                setRentals([
                    {
                        id: 'test1',
                        movieId: moviesList[0]._id,
                        title: moviesList[0].title,
                        poster: moviesList[0].poster,
                        price: moviesList[0].price,
                        rentalDate: new Date().toISOString(),
                        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        status: 'active'
                    },
                    {
                        id: 'test2',
                        movieId: moviesList[1]._id,
                        title: moviesList[1].title,
                        poster: moviesList[1].poster,
                        price: moviesList[1].price,
                        rentalDate: new Date().toISOString(),
                        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                        status: 'active'
                    }
                ]);
            }
        } catch (err) {
            console.error("Erreur :", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); 
        fetchHomeData();
    }, []);



    const { moviesArray, rentedList, recommendations } = useMemo(() => {
        const moviesArray = Array.isArray(allMovies) ? allMovies : [];
        const rentedList = moviesArray.filter(m => isRented(m._id));
        const recommendations = rentedList.length === 0 ? [] : (() => {
            const rentedGenres = [...new Set(rentedList.flatMap(m => Array.isArray(m.genre) ? m.genre : [m.genre]).filter(Boolean))];
            return moviesArray.filter(m => 
                !rentedList.some(r => r._id === m._id) && 
                rentedGenres.some(g => m.genre === g || (Array.isArray(m.genre) && m.genre.includes(g)))
            );
        })();
        return { moviesArray, rentedList, recommendations };
    }, [allMovies, rentals]);

    const heroMovie = moviesArray.length > 0 ? moviesArray[0] : null;
    const recentMovies = moviesArray.filter(m => m.year > 2010).slice(0, 10);
    const actionMovies = moviesArray.filter(m => m.genre === 'Action' || m.genre?.includes('Action')).slice(0, 10);
    const popularMovies = [...moviesArray].sort(() => 0.5 - Math.random()).slice(0, 10);

    const recommendationTitle = "Films similaires à vos locations";

    const handleLouer = (movie) => {
        const movieId = movie._id;
        if (isRented(movieId)) { 
            error("Vous avez déjà loué ce film !");
            return; 
        }
        if (!isInCart(movieId)) { 
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

    if (!loading && allMovies.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl font-semibold text-gray-400 text-center">
                        Aucun film disponible dans la base de données.<br/>
                        <span className="text-sm font-normal">Vérifiez la connexion à MongoDB.</span>
                    </p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="space-y-12 pb-20 bg-black min-h-screen text-white">        
            {heroMovie && (
                <MovieHero 
                    movie={heroMovie} 
                    onLouer={handleLouer} 
                    isRented={isRented(heroMovie._id)}
                    isInCart={isInCart(heroMovie._id)}
                />
            )}
            
            <div className="container mx-auto px-4 space-y-12">
                <section className="py-6">
                    <h2 className="text-xl font-semibold mb-4">Explorer par genre</h2>
                    <MovieFilter 
                        movies={allMovies} 
                        onFilter={(data) => setFilteredMovies(data)} 
                    />
                </section> 
                <hr className="border-gray-800" />
                {rentedList.length > 0 && (
                    <>
                        <MovieList 
                            title={recommendationTitle} 
                            movies={recommendations} 
                            onLouer={handleLouer} 
                            isRented={isRented} 
                            isInCart={isInCart}
                        />
                        <hr className="border-gray-800" />
                    </>
                )} 
                
                {rentedList.length > 0 && (
                    <>
                        <MovieList 
                            title="Vos films loués" 
                            movies={rentedList} 
                            onLouer={handleLouer} 
                            isRented={isRented} 
                            isInCart={isInCart}
                        />
                        <hr className="border-gray-800" />
                    </>
                )}
                
                <MovieCarousel title="Tous les films" movies={allMovies} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />                <MovieList title={`Filtrage par genre (${filteredMovies.length})`} movies={filteredMovies} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />
                <MovieList title="Populaires" movies={popularMovies} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />
                <MovieList title="Action" movies={actionMovies} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />
                <MovieList title="Récents" movies={recentMovies} onLouer={handleLouer} isRented={isRented} isInCart={isInCart} />
                
                <hr className="border-gray-800" />
            </div>
        </div>
    );
}

export default Home;