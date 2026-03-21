import { useEffect, useState } from 'react';
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieCarousel from "../components/movies/MovieCarousel";
import MovieFilter from "../components/movies/MovieFilter";
import Navbar from "../components/common/Navbar";
import { useCart } from '../context/CartContext';
import movies from "../../../data/movies.json";
import { useNotification } from '../context/NotificationContext';

const POPULAR_MOVIES = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);

function Home() {
    const [allMovies] = useState(movies);
    const [filteredMovies, setFilteredMovies] = useState(movies);    
    const { addToCart, isRented, isInCart } = useCart();
    const rentedList = allMovies.filter(m => isRented(m.id || m._id));
    const heroMovie = movies[0];
    const recentMovies = movies.filter(m => m.year > 2010);
    const popularMovies = POPULAR_MOVIES;
    const actionMovies = movies.filter(m => m.genre === 'Action').slice(0, 5);
    const { success, error } = useNotification();

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    const handleLouer = (movie) => {
        if (isRented(movie.id)) { 
            error("Vous avez déjà loué ce film !");
            return; 
        }
        
        if (!isInCart(movie.id)) { 
            addToCart(movie); 
            success("Film ajouté au panier !");
        } else {
            error("Ce film est déjà dans votre panier !");
        }
    };
    
    return (
        <div className="space-y-12 pb-20 bg-black min-h-screen text-white">
            <Navbar />             
            <MovieHero 
                movie={heroMovie} 
                onLouer={handleLouer} 
                isRented={isRented(heroMovie.id || heroMovie._id)}
                isInCart={isInCart(heroMovie.id || heroMovie._id)}
            />             
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