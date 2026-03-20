import Movie from '../models/Movie.js';

// @desc      Obtenir tous les films
// @route     GET /api/movies
// @access    Public
export const getAllMovies = async (req, res, next) => {
    try{
        const query = req.query;
        const movies = await Movie.find();
        res.status(200).json({
            success: true,
            message: 'Obtenir tous les films',
            data: movies
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir un film par ID
// @route     GET /api/movies/:id
// @access    Public
export const getMovieById = async (req, res, next) => {
    try{
    const query = req.params;
    const id = query.id;
    const movie = await Movie.findById(id);
    res.status(200).json({
        success: true,
        message: `Obtenir le film avec ID ${req.params.id} - TODO`,
        data : movie
    });
    }catch(error){
        next(error);
    }
};

// @desc      Créer un nouveau film
// @route     POST /api/movies
// @access    Private/Admin
export const createMovie = async (req, res, next) => {
    try{
        const body = req.body;
        const newMovie = new Movie(body);
        await newMovie.save();
        res.status(201).json({
            success: true,
            message: 'Créer un nouveau film',
            data: newMovie
        });
    }catch(error){
        next(error);
    }
};

// @desc      Modifier un film
// @route     PUT /api/movies/:id
// @access    Private/Admin
export const updateMovie = async (req, res, next) => {
    try{
        const id = req.params.id;
        const updateData = req.body;
        await Movie.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        res.status(200).json({
            success: true,
            message: `Modifier le film avec ID ${req.params.id}`
        });
    }catch(error){
        next(error);
    }
};

// @desc      Supprimer un film
// @route     DELETE /api/movies/:id
// @access    Private/Admin
export const deleteMovie = async (req, res, next) => {
    try{
        const id = req.params.id;
        await Movie.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: `Supprimer le film avec ID ${req.params.id}`
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir les statistiques des films
// @route     GET /api/movies/stats
// @access    Private/Admin
export const getMovieStats = async (req, res, next) => {
    try{
        const totalRevenue = await Movie.aggregate([{ $group: { _id: null, total: { $sum: { $multiply: ['$price', '$rentalCount'] } } } } ]);
        res.status(200).json({
            success: true,
            message: 'Obtenir les statistiques des films',
            data: { totalRevenue }
        });
    }catch(error){
        next(error);
    }
};

// @desc      Obtenir les filmes similaires
// @route     GET /api/movies/:id/similar
// @access    Public
export const getSimilarMovies = async (req, res, next) => {
    try{
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "Film non trouvé" });
        }
        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: id }
        }).limit(4);
        res.status(200).json({
            success: true,
            message: `Obtenir les films similaires au film avec ID ${req.params.id}`,
            data: similarMovies
        });
    }catch(error){
        next(error);
    }
};
