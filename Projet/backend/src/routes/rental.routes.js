import express from 'express';
import { 
  createRental, 
  cancelRental, 
  getRentalStats, 
  getRecommendations, 
  getAllRentals, 
  getMyRentals 
} from '../controllers/rental.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createRental);
router.get('/my-rentals', protect, getMyRentals);
router.get('/recommendations', protect, getRecommendations);
router.delete('/:id', protect, cancelRental);

router.get('/stats', protect, admin, getRentalStats);
router.get('/', protect, admin, getAllRentals);

export default router;