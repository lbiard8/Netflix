import { createContext, useContext, useState, useEffect } from 'react';
import { rentalsAPI } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const savedRentals = localStorage.getItem('rentals');
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('rentals', JSON.stringify(rentals));
  }, [cart, rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    setCart((prevCart) => {
      if (prevCart.find((item) => String(item._id) === String(movie._id))) {
        return prevCart;
      }
      return [...prevCart, movie];
    });
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart((prev) => prev.filter((movie) => String(movie._id) !== String(movieId)));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, movie) => total + movie.price, 0);
  };

  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };

  // Louer un film
  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const rental = {
      id: Date.now(),
      movieId: movie._id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'active'
    };

    setRentals((prev) => [...prev, rental]);
    removeFromCart(movie._id);
    return { success: true, rental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const newRentals = cart.map((movie) => ({
      id: Date.now() + Math.random(),
      movieId: movie._id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
      status: 'active'
    }));

    setRentals((prev) => [...prev, ...newRentals]);
    clearCart();
    return { success: true, count: newRentals.length };
  };

  // Charger les locations depuis l'API
  const loadRentals = async () => {
    try {
      const response = await rentalsAPI.getMyRentals();
      if (response && response.success && response.data && response.data.length > 0) {
        // Convertir les données API au format local
        const apiRentals = response.data.map(rental => ({
          id: rental._id,
          movieId: rental.movie._id,
          title: rental.movie.title,
          poster: rental.movie.poster,
          price: rental.price,
          rentalDate: rental.rentalDate,
          expiryDate: rental.expiryDate,
          status: rental.status
        }));
        setRentals(apiRentals);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des locations:', error);
    }
  };

  // Annuler une location
  const cancelRental = (rentalId) => {
    setRentals((prev) =>
      prev.map(rental =>
        (String(rental._id) === String(rentalId) || String(rental.id) === String(rentalId))
          ? { ...rental, status: 'cancelled' }
          : rental
      )
    );
  };

  // Vérifier si un film est loué
  const isRented = (movieId) => {
    return rentals.some(r =>
      String(r.movieId) === String(movieId) && r.status !== 'cancelled'
    );
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find((r) => String(r.movieId) === String(movieId));
  };

  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some((m) => String(m._id) === String(movieId));
  };

  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart,
    cancelRental,
    loadRentals,
    setRentals,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
} 

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}