import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Rental from '../models/Rental.js';

dotenv.config();

const testModels = async () => {
  try {
    // Connexion à la base de données
    await connectDB();

    console.log('🧪 Tests des modèles...\n');

    // Test 1: Créer un utilisateur
    console.log('Test 1: Création d\'un utilisateur');
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123'
    });
    console.log('✅ Utilisateur créé:', testUser.toJSON());
    console.log('   Avatar auto-généré:', testUser.avatar);

    // Test 2: Tester la méthode comparePassword (Méthode d'instance)
    console.log('\nTest 2: Comparaison de mot de passe');
    // On doit forcer la sélection du password car il est select: false par défaut
    const userWithPassword = await User.findById(testUser._id).select('+password');
    const isMatch = await userWithPassword.comparePassword('test123');
    console.log('✅ Password match:', isMatch);

    // Test 3: Créer un film
    console.log('\nTest 3: Création d\'un film');
    const testMovie = await Movie.create({
      title: 'Test Movie',
      description: 'Un film de test',
      poster: 'https://example.com/poster.jpg',
      backdrop: 'https://example.com/backdrop.jpg',
      genre: ['Action'],
      year: 2024,
      duration: 120,
      price: 4.99,
      rating: 7.5
    });
    console.log('✅ Film créé:', testMovie.title);
    console.log('   Durée formatée (Virtual):', testMovie.durationFormatted);

    // Test 4: Créer une location
    console.log('\nTest 4: Création d\'une location');
    const testRental = await Rental.create({
      user: testUser._id,
      movie: testMovie._id,
      price: testMovie.price
    });
    console.log('✅ Location créée');
    console.log('   Jours restants (Virtual):', testRental.daysLeft);
    console.log('   Est active (Method):', testRental.isActive());

    // Test 5: Populate (Vérifier les relations entre collections)
    console.log('\nTest 5: Populate (relations)');
    const rentalWithDetails = await Rental.findById(testRental._id)
      .populate('user', 'name email')
      .populate('movie', 'title price');

    console.log('✅ Location avec détails:', {
      user: rentalWithDetails.user.name,
      movie: rentalWithDetails.movie.title,
      price: rentalWithDetails.price
    });

    // Test 6: Méthodes statiques
    console.log('\nTest 6: Méthodes statiques');
    const activeRentals = await Rental.getActiveRentals(testUser._id);
    console.log('✅ Locations actives trouvées:', activeRentals.length);

    console.log('\nTest 7: Validation des contraintes (Exercice 2)');
    try {
      await Movie.create({
        title: 'Film invalide',
        duration: 600, //Trop long
        price: 3.999   //Trop de décimales
      });
    } catch (error) {
      console.log('✅ Validation échouée comme prévu:', error.message);
    }

    console.log('\nTest 8: Méthodes de requête avancées (Exercice 3)');

    const actionMovies = await Movie.getByGenre("Action");
    console.log(`✅ Films d'Action trouvés: ${actionMovies.length}`);


    const affordableMovies = await Movie.getByPriceRange(0, 5);
    console.log(`✅ Films à moins de 5€: ${affordableMovies.length}`);

    const stats = await Movie.getStatsByGenre();
    console.log("✅ Statistiques par genre générées avec succès");
    console.table(stats);

    // Nettoyage de la base après les tests
    console.log('\n🧹 Nettoyage des données de test...');
    await User.deleteOne({ _id: testUser._id });
    await Movie.deleteOne({ _id: testMovie._id });
    await Rental.deleteOne({ _id: testRental._id });

    console.log('\n🎉 Tous les tests sont passés avec succès !');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erreur durant les tests:', error);
    process.exit(1);
  }
  
};

testModels();