import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import movies from '../../../../data/movies.json';
import CartButton from './CartButton';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
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
            {/* panier */}
            <CartButton 
            />
            
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                  >
                  <img
                    src={user.avatar}
                    alt={user.name} className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"/>
                  <span className="hidden md:block text-sm">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2">
                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-800 transition" onClick={() => setShowUserMenu(false)}>
                      Mon profil
                    </NavLink>
                    <NavLink to="/my-rentals" className="block px-4 py-2 hover:bg-gray-800 transition" onClick={() => setShowUserMenu(false)}>
                      Mes locations
                    </NavLink>
                    <hr className="border-gray-800 my-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-800 transition text-red-400">
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-sm font-semibold hover:text-red-600 transition-colors">
                <button className="px-4 py-2 bg-primary hover:bg-primary-dark rounded transition">
                  Connexion
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;