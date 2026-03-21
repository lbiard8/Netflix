import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ movies, onSearch }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const suggestions = searchTerm.length >= 2 
        ? movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          ).slice(0, 5)
        : [];

    const handleGlobalSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            setShowDropdown(false);
            setIsOpen(false);
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="relative flex items-center">
            {/* Bouton Loupe */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-10 top-0 z-50">
                    <input
                        type="text"
                        value={searchTerm}
                        onKeyDown={handleGlobalSearch}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowDropdown(true); 
                        }}
                        onFocus={() => setShowDropdown(true)}
                        placeholder="Rechercher un film..."
                        className="w-64 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white shadow-2xl outline-none focus:border-red-600 transition-all"
                        autoFocus
                    />

                    {/* Suggestions rapides */}
                    {showDropdown && suggestions.length > 0 && (
                        <ul className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1">
                            {suggestions.map((movie) => (
                                <li 
                                    key={movie.id}
                                    onClick={() => {
                                        setSearchTerm('');
                                        setShowDropdown(false);
                                        setIsOpen(false);
                                        onSearch(movie);
                                    }}
                                    className="px-4 py-3 hover:bg-gray-800 cursor-pointer border-b border-gray-800 last:border-none flex items-center gap-4 transition-colors"
                                >
                                    <img src={movie.poster} alt="" className="w-10 h-14 object-cover rounded shadow-sm" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-sm">{movie.title}</span>
                                        <span className="text-xs text-gray-400">{movie.genre} • {movie.year}</span>
                                    </div>
                                </li>
                            ))}
                            {/* Option pour voir tous les résultats */}
                            <li 
                                onClick={() => navigate(`/search?q=${searchTerm}`)}
                                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-center text-xs text-red-500 font-bold cursor-pointer"
                            >
                                Voir tous les résultats
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;