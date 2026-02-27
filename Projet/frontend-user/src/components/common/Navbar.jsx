import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import movies from '../../../../data/movies.json';
import CartButton from './CartButton';

function Navbar({itemsInCart = [], onRemove, onCheckout}) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-black/90 to-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-red-600 text-3xl font-bold tracking-tighter">
                UMAFLIX
              </h1>
            </Link>
            <ul className="hidden md:flex space-x-6 text-white font-medium">
              <li>
                <NavLink to="/" className={({isActive}) => isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}>
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-rentals" className={({isActive}) => isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}>
                  Mes locations
                </NavLink>
              </li>
            </ul>
            <SearchBar movies={movies} onSearch={(m) => navigate(`/movie/${m.id}`)} />
          </div>
          <div className="flex items-center space-x-6 text-white">
            {/* On passe le panier + la suppression + le paiement au CartButton */}
            <CartButton 
              panier={itemsInCart} 
              onRemove={onRemove} 
              onCheckout={onCheckout} 
            />
            
            {user ? (
              <div className="flex items-center gap-4">
                <div 
                  onClick={handleLogout}
                  className="w-10 h-10 bg-red-600 rounded flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                  title="Se déconnecter"
                >
                  <span className="text-sm font-bold uppercase">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            ) : (
              <NavLink to="/login" className="text-sm font-semibold hover:text-red-600 transition-colors">
                Connexion
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;