import { useState } from 'react';

function CartButton({ panier = [], onRemove }) {
  const [estOuvert, setEstOuvert] = useState(false);

  const nombreArticles = panier.length;

  const inverserAffichage = () => {
    setEstOuvert(!estOuvert);
  };

  return (
    <div className="relative">
      {/* Bouton Panier */}
      <button 
        onClick={inverserAffichage}
        className="p-2 text-white hover:text-gray-300 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>

        {nombreArticles > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
            {nombreArticles}
          </span>
        )}
      </button>

      {estOuvert && nombreArticles > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-3 border-b border-gray-800 font-semibold text-white text-sm">
            Mes Locations
          </div>
          <ul className="p-2 max-h-60 overflow-y-auto">
            {panier.map((film) => (
              <li 
                key={film.id}
                onDoubleClick={() => onRemove(film.id)}
                className="p-2 hover:bg-gray-800 text-white text-sm cursor-pointer border-b border-gray-800 last:border-none flex items-center justify-between gap-4"              >
                <div className="flex flex-col">
                    <span className="font-medium">{film.title}</span>
                    <span className="text-[10px] text-gray-500 italic">Double-clic pour retirer</span>
                </div>
                <div className="text-primary font-bold text-xs shrink-0">
                    {film.price}€
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CartButton;