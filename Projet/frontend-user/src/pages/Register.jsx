import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    setLoading(true);

    // Simulation d'inscription
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({
        name: formData.nom,
        email: formData.email,
      }));
      setLoading(false);
      navigate('/'); // Retour à l'accueil
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      {/* Logo exact de ton image */}
      <h1 className="text-red-600 text-6xl font-bold mb-8 tracking-tighter">
        UMAFLIX
      </h1>

      <div className="w-full max-w-md p-10 bg-black rounded border border-zinc-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8">S'inscrire</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Nom"
            className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600"
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
          />
          {errors.nom && <p className="text-red-600 text-xs">{errors.nom}</p>}

          <input 
            type="email" 
            placeholder="Email"
            className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}

          <input 
            type="password" 
            placeholder="Mot de passe"
            className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}

          <input 
            type="password" 
            placeholder="Confirmez le Mot de passe"
            className="w-full p-4 bg-[#232a34] rounded text-white outline-none border-b-2 border-transparent focus:border-red-600"
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}

          <button 
            type="submit"
            className="w-full py-3 bg-red-600 text-white font-bold rounded mt-4 hover:bg-red-700 transition-colors"
          >
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-400 text-sm">
          Déjà un compte ?{' '}
          <span 
            className="text-red-600 cursor-pointer hover:underline"
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