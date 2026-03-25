import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { useNotification } from '../context/NotificationContext';
import { authAPI } from '../services/api';

function Profile() {
  const { success, error } = useNotification();
  const [loading, setLoading] = useState(true);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await authAPI.getMe();
        if (response && response.success && response.user) {
          const u = response.user;
          setUserData({
            name: u.name || "",
            email: u.email || "",
            avatar: u.avatar || ""
          });
        }
      } catch (err) {
        console.error("Erreur Profil:", err);
        error("Impossible de charger le profil");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.updateProfile(userData);
      success("Informations mises à jour !");
      setIsEditingInfo(false);
    } catch (err) {
      error("Erreur lors de la mise à jour");
    }
  };
  const handlePasswordSubmit = async (e) => {
  e.preventDefault();
  if (passwords.new.length < 6) {
    return error("Le nouveau mot de passe doit faire au moins 6 caractères");
  }
  if (passwords.new !== passwords.confirm) {
    return error("Les mots de passe ne correspondent pas");
  }

  try {
    await authAPI.changePassword({
      currentPassword: passwords.current, 
      newPassword: passwords.new
    });
    success("Mot de passe modifié !");
    setIsChangingPassword(false);
    setPasswords({ current: "", new: "", confirm: "" });
  } catch (err) {
    error(err.message || "Ancien mot de passe incorrect");
  }
};

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <Navbar />
      
      <div className="pt-28 px-8 md:px-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12">Mon profil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Informations personnelles</h2>
              </div>
              {!isEditingInfo && (
                <Button variant="primary" size="sm" onClick={() => setIsEditingInfo(true)}>
                  Modifier
                </Button>
              )}
            </div>

            {!isEditingInfo ? (
              <div className="space-y-6">
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Nom</p>
                  <p className="text-lg font-medium">{userData.name}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-sm mb-1">Email</p>
                  <p className="text-lg font-medium">{userData.email}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInfoSubmit} className="space-y-6">
                <div>
                  <label className="text-zinc-500 text-sm block mb-2">Nom</label>
                  <input 
                    type="text" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none focus:border-red-600 transition-colors text-white"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-sm block mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 outline-none focus:border-red-600 transition-colors text-white"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" variant="primary" className="flex-1">Enregistrer</Button>
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsEditingInfo(false)}>Annuler</Button>
                </div>
              </form>
            )}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-bold mb-8">Sécurité</h2>
            {!isChangingPassword ? (
              <Button variant="secondary" className="w-full" onClick={() => setIsChangingPassword(true)}>
                Changer le mot de passe
              </Button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="text-zinc-500 text-sm block mb-1">Mot de passe actuel</label>
                  <input 
                    type="password" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 outline-none focus:border-red-600 text-white"
                    value={passwords.current}
                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-sm block mb-1">Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 outline-none focus:border-red-600 text-white"
                    value={passwords.new}
                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-sm block mb-1">Confirmer le mot de passe</label>
                  <input 
                    type="password" 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 outline-none focus:border-red-600 text-white"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-4">
                  <Button type="submit" variant="primary">Confirmer</Button>
                  <Button type="button" variant="secondary" onClick={() => setIsChangingPassword(false)}>Annuler</Button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;