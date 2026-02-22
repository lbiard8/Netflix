import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import movies from "../../../data/movies.json";
import MovieFilter from "../components/movies/MovieFilter";
import { useState } from 'react';

const POPULAR_MOVIES = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);


function Home() {
    const [allMovies] = useState(movies);
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const heroMovie = movies[0];
    const recentMovies = movies.filter(m => m.year > 2010);
    const popularMovies = POPULAR_MOVIES;
    const actionMovies = movies.filter(m => m.genre === 'Action').slice(0, 5);
    return (
        <div className="space-y-12 pb-20">
            <MovieHero movie={heroMovie} />
            <div className="container mx-auto px-4 space-y-12">
                <section className="py-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Explorer par genre</h2>
                    <MovieFilter 
                        movies={allMovies} 
                        onFilter={(data) => setFilteredMovies(data)} 
                    />
                </section>

                <hr className="border-gray-800" />
                    <MovieList 
                            title={`Résultats (${filteredMovies.length})`} 
                            movies={filteredMovies} 
                        />
                    <MovieList title="Populaires" movies={popularMovies} />
                    <MovieList title="Action" movies={actionMovies} />
                    <MovieList title="Récents" movies={recentMovies} />
                <hr className="border-gray-800" />
            </div>
        </div>
    );
}
export default Home