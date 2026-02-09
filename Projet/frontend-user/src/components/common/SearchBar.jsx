import { useState } from 'react';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="relative flex items-center">
      {/* Bouton de recherche */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:text-gray-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* Input de recherche (apparaît au clic) */}
      {isOpen && (
        <div className="absolute left-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un film..."
            className="w-64 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-primary text-white"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;