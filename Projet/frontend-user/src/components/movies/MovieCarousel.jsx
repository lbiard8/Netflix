import { useState, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";

function MovieCarousel({ title, movies, onLouer, isRented, isInCart }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [movies]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    const newScrollPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <section className="group relative my-10 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-10 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-red-600 p-4 h-full opacity-0 group-hover:opacity-100 transition-all duration-300 text-white cursor-pointer backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Liste scrollable */}
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          className="flex space-x-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth py-4"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="w-[200px] md:w-[250px] lg:w-[300px] shrink-0 transition-transform duration-300"
            >
               <MovieCard movie={movie} 
                          isRented={isRented} 
                          isInCart={isInCart} 
                          onLouer={onLouer} />
            </div>
          ))}
        </div>

        {/* Bouton Droite */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-10 top-1/2 -translate-y-1/2 z-40 bg-black/60 hover:bg-red-600 p-4 h-full opacity-0 group-hover:opacity-100 transition-all duration-300 text-white cursor-pointer backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieCarousel;