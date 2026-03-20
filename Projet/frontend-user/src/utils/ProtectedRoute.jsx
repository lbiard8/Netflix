import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-600 font-bold text-xl animate-pulse">Chargement...</div>
            </div>
        );
    }
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default ProtectedRoute;