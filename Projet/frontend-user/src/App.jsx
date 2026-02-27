import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MyRentals from './pages/MyRentals';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/common/Navbar';
import Footer from './components/layout/Footer'; 
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/my-rentals" element={<ProtectedRoute><MyRentals /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;