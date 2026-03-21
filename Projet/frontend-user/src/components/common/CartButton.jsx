import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartButton() {
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  
  const nombreArticles = getCartCount();

  return (
    <div className="relative">
      {/* Navigue vers la page Cart */}
      <button 
        onClick={() => navigate('/cart')}
        className="p-2 text-white hover:text-gray-300 cursor-pointer relative"
        title="Voir mon panier"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>

        {/* Le badge reste visible s'il y a des articles */}
        {nombreArticles > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
            {nombreArticles}
          </span>
        )}
      </button>
    </div>
  );
}

export default CartButton;