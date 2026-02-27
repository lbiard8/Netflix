import { useEffect, useState } from 'react';
import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import MovieFilter from "../components/movies/MovieFilter";
import Navbar from "../components/common/Navbar";
import movies from "../../../data/movies.json";
import { useNavigate } from 'react-router-dom';

const POPULAR_MOVIES = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);

function Home() {
    const navigate = useNavigate();
    const [allMovies] = useState(movies);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [panier, setPanier] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const checkIsRented = (movieId) => {
        const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
        return rentals.some(m => m.id === movieId);
    };

    const rentedList = movies.filter(m => checkIsRented(m.id));
    const heroMovie = movies[0];
    const recentMovies = movies.filter(m => m.year > 2010);
    const popularMovies = POPULAR_MOVIES;
    const actionMovies = movies.filter(m => m.genre === 'Action').slice(0, 5);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    const handleLouer = (movie) => {
        const rentals = JSON.parse(localStorage.getItem('rentals')) || [];
        if (rentals.find(m => m.id === movie.id)) {
            return; 
        }
        
        if (!panier.find(item => item.id === movie.id)) {
            const nouveauPanier = [...panier, movie];
            setPanier(nouveauPanier);
            localStorage.setItem('cart', JSON.stringify(nouveauPanier));
        } else {
            alert("Ce film est déjà dans votre panier !");
        }
    };

    const supprimerDuPanier = (id) => {
        const nouveauPanier = panier.filter(item => item.id !== id);
        setPanier(nouveauPanier);
        localStorage.setItem('cart', JSON.stringify(nouveauPanier));
    };

    const handlePaiement = () => {
        const dateExp = new Date();
        dateExp.setMonth(dateExp.getMonth() + 2);
        const dateString = dateExp.toLocaleDateString('fr-FR');
       
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const currentRentals = JSON.parse(localStorage.getItem('rentals')) || [];        
        const nouveauxFilmsLoues = currentCart.map(movie => ({
            ...movie,
            dateFin: dateString
        }));
        localStorage.setItem('rentals', JSON.stringify([...currentRentals, ...nouveauxFilmsLoues]));
        localStorage.removeItem('cart');
        setPanier([]);
        alert(`Merci ! Vos films sont loués jusqu'au ${dateString}`);
        navigate('/my-rentals');
    };
    
    return (
        <div className="space-y-12 pb-20 bg-black min-h-screen text-white">
            <Navbar itemsInCart={panier} onRemove={supprimerDuPanier} onCheckout={handlePaiement}/>             
            <MovieHero 
                movie={heroMovie} 
                onLouer={handleLouer} 
                isRented={checkIsRented(heroMovie.id)}
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
                            title="Vos films loués" movies={rentedList} onLouer={handleLouer} checkRented={checkIsRented} 
                        />
                        <hr className="border-gray-800" />
                    </>
                )}
                
                <MovieList title={`Résultats (${filteredMovies.length})`} movies={filteredMovies} onLouer={handleLouer} checkRented={checkIsRented} />
                <MovieList title="Populaires" movies={popularMovies} onLouer={handleLouer} checkRented={checkIsRented} />
                <MovieList title="Action" movies={actionMovies} onLouer={handleLouer} checkRented={checkIsRented} />
                <MovieList title="Récents" movies={recentMovies} onLouer={handleLouer} checkRented={checkIsRented} /> 
                
                <hr className="border-gray-800" />
            </div>
        </div>
    );
}

export default Home;