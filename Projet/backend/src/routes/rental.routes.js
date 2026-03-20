import express from 'express';
import { createRental, 
         cancelRental, 
         getRentalStats, 
         getRecommendations, 
         getAllRentals, 
         getMyRentals } from '../controllers/rental.controller.js';
const router = express.Router();
router.post('/', createRental);
router.get('/my-rentals', getMyRentals);
router.get('/recommendations', getRecommendations);
router.delete('/:id', cancelRental);
router.get('/stats', getRentalStats);
router.get('/', getAllRentals);

export default router; 