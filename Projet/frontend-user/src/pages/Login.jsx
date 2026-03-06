import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button'; 

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email requis";
    if (!formData.password) newErrors.password = "Mot de passe requis";
    return newErrors;
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }
        setLoading(true);
        setTimeout(() => {
        const userData = {
            email: formData.email,
            name: formData.email.split('@')[0]
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setLoading(false);
            navigate('/'); 
    }, 1000);
  };

return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 font-sans">
      {/* Logo */}
      <h1 className="text-red-600 text-5xl font-bold tracking-tighter mb-8">
        UMAFLIX
      </h1>

      <div className="w-full max-w-md p-10 bg-black rounded-lg border border-zinc-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-8">Se connecter</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-zinc-800/50 rounded text-white border border-zinc-700 focus:border-red-600 outline-none transition-all placeholder:text-gray-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.email}</p>}
          </div>

          <div className="relative">
            <input 
              type="password"
              placeholder="Mot de passe"
              className="w-full p-4 bg-zinc-800/50 rounded text-white border border-zinc-700 focus:border-red-600 outline-none transition-all placeholder:text-gray-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <p className="text-red-600 text-xs mt-1 font-semibold">{errors.password}</p>}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Lien d'inscription comme sur ton image */}
        <div className="mt-8 text-center">
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