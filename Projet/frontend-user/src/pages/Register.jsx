import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { register, error: serverError, loading } = useAuth();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = "Nom requis";
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const success = await register({
      name: formData.nom,
      email: formData.email,
      password: formData.password
    });

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-red-600 text-6xl font-bold mb-8 tracking-tighter">
        UMAFLIX
      </h1>

      <div className="w-full max-w-md p-10 bg-black rounded border border-zinc-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8">S'inscrire</h2>
        
        {serverError && (
          <div className="bg-red-600/10 border border-red-600 text-red-600 p-3 rounded mb-6 text-sm text-center">
            {serverError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Nom"
              className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600 transition-colors"
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              disabled={loading}
            />
            {errors.nom && <p className="text-red-600 text-xs mt-1 ml-1">{errors.nom}</p>}
          </div>
          <div>
            <input 
              type="email" 
              placeholder="Email"
              className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600 transition-colors"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={loading}
            />
            {errors.email && <p className="text-red-600 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Mot de passe"
              className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600 transition-colors"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              disabled={loading}
            />
            {errors.password && <p className="text-red-600 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Confirmez le Mot de passe"
              className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600 transition-colors"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              disabled={loading}
            />
            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
          </div>
          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 bg-red-600 text-white font-bold rounded mt-4 hover:bg-red-700 transition-all ${
              loading ? 'opacity-50 cursor-not-allowed scale-95' : 'active:scale-95'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création du compte...
              </span>
            ) : "S'inscrire"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Déjà un compte ?{' '}
          <span 
            className="text-red-600 cursor-pointer hover:underline font-semibold"
            onClick={() => navigate('/login')}
          >
            Se connecter
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;