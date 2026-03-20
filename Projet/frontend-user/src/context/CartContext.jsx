import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('umaflix_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const savedRentals = localStorage.getItem('umaflix_rentals');
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  useEffect(() => {
    localStorage.setItem('umaflix_cart', JSON.stringify(cart));
    localStorage.setItem('umaflix_rentals', JSON.stringify(rentals));
  }, [cart, rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    if (!isInCart(movie.id) && !isRented(movie.id)) {
      setCart((prev) => [...prev, movie]);
    }
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart((prev) => prev.filter((movie) => movie.id !== movieId));
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
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    setRentals((prev) => [...prev, rental]);
    
    removeFromCart(movie.id);

    return { success: true, rental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const newRentals = cart.map((movie) => ({
      id: Date.now() + Math.random(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    }));

    setRentals((prev) => [...prev, ...newRentals]);
    
    clearCart();

    return { success: true, count: newRentals.length };
  };

  // Vérifier si un film est loué
  const isRented = (movieId) => {
    return rentals.some((r) => r.movieId === movieId);
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find((r) => r.movieId === movieId);
  };

  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some((m) => m.id === movieId);
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