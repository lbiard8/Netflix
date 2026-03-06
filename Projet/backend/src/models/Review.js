import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur est requis']
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Le film est requis']
  },
  rating: {
    type: Number,
    required: [true, 'La note est requise'],
    min: [1, 'La note minimale est de 1'],
    max: [5, 'La note maximale est de 5']
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Le commentaire ne peut pas dépasser 500 caractères']
  }
}, {
  timestamps: true
});

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRating = async function(movieId) {
  const stats = await this.aggregate([
    { $match: { movie: movieId } },
    {
      $group: {
        _id: '$movie',
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    if (stats.length > 0) {
      await mongoose.model('Movie').findByIdAndUpdate(movieId, {
        rating: Math.round(stats[0].avgRating * 10) / 10
      });
    }
  } catch (err) {
    console.error('Erreur mise à jour note film:', err);
  }
};

reviewSchema.post('save', function() {
  this.constructor.calculateAverageRating(this.movie);
});

reviewSchema.post('remove', function() {
  this.constructor.calculateAverageRating(this.movie);
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;