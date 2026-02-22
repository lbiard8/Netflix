import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import movies from "../../../data/movies.json";
import MovieFilter from "../components/movies/MovieFilter";
import { useState } from 'react';
import Navbar from "../components/common/Navbar";

const POPULAR_MOVIES = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);


function Home() {
    const [allMovies] = useState(movies);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const heroMovie = movies[0];
    const recentMovies = movies.filter(m => m.year > 2010);
    const popularMovies = POPULAR_MOVIES;
    const actionMovies = movies.filter(m => m.genre === 'Action').slice(0, 5);
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (film) => {
        if (!panier.find(item => item.id === film.id)) {
            setPanier([...panier, film]);
            console.log("Film ajouté :", film.title);
        }
    };

    const supprimerDuPanier = (id) => {
    setPanier(panier.filter(item => item.id !== id));
    };
    
    return (
        <div className="space-y-12 pb-20">
            <Navbar itemsInCart={panier} onRemove={supprimerDuPanier} />
            <MovieHero movie={heroMovie} onLouer={ajouterAuPanier}/>
            <div className="container mx-auto px-4 space-y-12">
                <section className="py-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Explorer par genre</h2>
                    <MovieFilter 
                        movies={allMovies} 
                        onFilter={(data) => setFilteredMovies(data)} 
                    />
                </section>
                

                <hr className="border-gray-800" />
                    <MovieList title={`Résultats (${filteredMovies.length})`} movies={filteredMovies} onLouer={ajouterAuPanier} />
                    <MovieList title="Populaires" movies={popularMovies} onLouer={ajouterAuPanier} />
                    <MovieList title="Action" movies={actionMovies} onLouer={ajouterAuPanier} />
                    <MovieList title="Récents" movies={recentMovies} onLouer={ajouterAuPanier} />
                <hr className="border-gray-800" />
            </div>
        </div>
    );
}
export default Home