import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { error: notifyError } = useNotification();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        navigate("/");
      } else {
        notifyError(result.error || "Email ou mot de passe incorrect");
      }
    } catch (_) {
      notifyError("Impossible de contacter le serveur");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 font-sans">
      <h1 className="text-red-600 text-5xl font-bold tracking-tighter mb-8">
        UMAFLIX
      </h1>

      <div className="w-full max-w-md p-10 bg-black rounded-lg border border-zinc-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">Se connecter</h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">          <div className="relative">
            <input 
              type="email"
              placeholder="Email"
              value={formData.email}
              className="w-full p-4 bg-zinc-800/50 rounded text-white border border-zinc-700 focus:border-red-600 outline-none transition-all placeholder:text-gray-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div className="relative">
            <input 
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              className="w-full p-4 bg-zinc-800/50 rounded text-white border border-zinc-700 focus:border-red-600 outline-none transition-all placeholder:text-gray-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-zinc-800 pt-6">
          <p className="text-gray-400 text-sm">
            Pas encore de compte ?{' '}
            <span 
              className="text-red-600 cursor-pointer hover:underline font-semibold"
              onClick={() => navigate('/register')}
            >
              S'inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;