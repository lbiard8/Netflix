import { useState } from 'react';

function CartButton({ panier = [], onRemove, onCheckout }) {
  const [estOuvert, setEstOuvert] = useState(false);
  const nombreArticles = panier.length;
  const totalPrix = panier.reduce((acc, film) => acc + (film.price || 0), 0);
  const inverserAffichage = () => {
    setEstOuvert(!estOuvert);
  };

  return (
    <div className="relative">
      {/* Bouton Panier */}
      <button 
        onClick={inverserAffichage}
        className="p-2 text-white hover:text-gray-300 cursor-pointer relative"
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

      {/* Menu déroulant du panier */}
      {estOuvert && nombreArticles > 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-3 border-b border-gray-800 font-semibold text-white text-sm">
            Mon panier ({nombreArticles})
          </div>

          <ul className="p-2 max-h-60 overflow-y-auto">
            {panier.map((film) => (
              <li 
                key={film.id}
                onDoubleClick={() => onRemove(film.id)}
                className="p-2 hover:bg-gray-800 text-white text-sm cursor-pointer border-b border-gray-800 last:border-none flex items-center justify-between gap-4"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{film.title}</span>
                  <span className="text-[10px] text-gray-500 italic">Double-clic pour retirer</span>
                </div>
                <div className="text-red-600 font-bold text-xs shrink-0">
                  {film.price}€
                </div>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-gray-800 bg-gray-900/50 rounded-b-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 text-sm">Total à régler :</span>
              <span className="text-white font-bold text-lg">{totalPrix}€</span>
            </div>
            
            <button 
              onClick={() => {
                onCheckout();
                setEstOuvert(false);
              }}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-sm transition-colors shadow-lg active:scale-95"
            >
              Payer et Louer (2 mois)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartButton;