import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

// @desc      Louer un film
// @route     POST /api/rentals
// @access    Private
export const createRental = async (req, res, next) => {
    try{
        const body = req.body;
        const newRental = new Rental(body);
        await newRental.save();
        
        await Movie.findByIdAndUpdate(body.movie, { $inc: { rentalCount: 1 } });

        res.status(201).json({
            success: true,
            message: 'Film loué avec succès',
            data: newRental
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir les locations d'un utilisateur
// @route     GET /api/rentals/my-rentals
// @access    Private
export const getMyRentals = async (req, res, next) => {
    try{
        const query = req.query; 
        const userId = query.userId;
        const rentals = await Rental.find({ user: userId }).populate('movie');
        
        res.status(200).json({
            success: true,
            message: 'Mes locations récupérées',
            data: rentals
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir toutes les locations (admin)
// @route     GET /api/rentals
// @access    Private/Admin
export const getAllRentals = async (req, res, next) => {
    try{
        const rentals = await Rental.find().populate('user', 'name email').populate('movie', 'title price'); 
        
        res.status(200).json({
            success: true,
            message: 'Toutes les locations récupérées (Admin)',
            data: rentals
        });
    }catch(error){
        next(error);
    }
};

// @desc      Annuler une location
// @route     DELETE /api/rentals/:id
// @access    Private
export const cancelRental = async (req, res, next) => {
    try{
        const params = req.params;
        const id = params.id;
        
        await Rental.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: `Location ${id} annulée`
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir les statistiques des locations
// @route     GET /api/rentals/stats
// @access    Private/Admin
export const getRentalStats = async (req, res, next) => {
    try{
        const stats = await Rental.aggregate([
            {
                $group: {
                    _id: null,
                    totalRentals: { $sum: 1 },
                    totalRevenue: { $sum: '$price' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: 'Statistiques des locations récupérées',
            data: stats[0] || { totalRentals: 0, totalRevenue: 0 }
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir des recommandations personnalisées
// @route     GET /api/rentals/recommendations
// @access    Private
export const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRentals = await Rental.find({ user: userId }).populate('movie');
        if (userRentals.length === 0) {
            const popularMovies = await Movie.find({ isAvailable: true })
                .sort({ rentalCount: -1 })
                .limit(10);
            return res.status(200).json({
                success: true,
                message: "Pour vous",
                data: popularMovies
            });
        }
        const genreCounts = {};
        userRentals.forEach(r => {
            const genres = Array.isArray(r.movie.genre) ? r.movie.genre : [r.movie.genre];
            genres.forEach(g => {
                genreCounts[g] = (genreCounts[g] || 0) + 1;
            });
        });
        const sortedGenres = Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]);
        const rentedMovieIds = userRentals.map(r => r.movie._id);
        let allRecommended = [];

        for (const genre of sortedGenres) {
            const moviesForThisGenre = await Movie.find({
                isAvailable: true,
                genre: genre,
                _id: { $nin: [...rentedMovieIds, ...allRecommended.map(m => m._id)] }
            })
            .sort({ rating: -1 })
            .limit(2);

            allRecommended = [...allRecommended, ...moviesForThisGenre];
        }

        res.status(200).json({
            success: true,
            message: `Parce que vous aimez ${sortedGenres.slice(0, 2).join(' et ')}`,
            data: allRecommended
        });

    } catch (error) {
        next(error);
    }
};

