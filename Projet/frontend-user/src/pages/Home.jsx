import MovieHero from "../components/movies/MovieHero";
import MovieList from "../components/movies/MovieList";
import movies from "../../../data/movies.json";

const POPULAR_MOVIES = [...movies].sort(() => 0.5 - Math.random()).slice(0, 5);


function Home() {
    const heroMovie = movies[0];
    const recentMovies = movies.filter(m => m.year > 2010);
    const popularMovies = POPULAR_MOVIES;
    const actionMovies = movies.filter(m => m.genre === 'Action').slice(0, 5);
    return (
        <div className="space-y-12 pb-20">
            <MovieHero movie={heroMovie} />
            <div className="container mx-auto px-4 space-y-12">
                <MovieList title="Populaires" movies={popularMovies} />
                <MovieList title="Action" movies={actionMovies} />
                <MovieList title="Récents" movies={recentMovies} />
            </div>
        </div>
    );
}
export default Home