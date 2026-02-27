import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-[150px] font-bold text-red-600 leading-none">
        404
      </h1>
      
      <h2 className="text-4xl font-bold mt-4">Page introuvable</h2>
      
      <p className="text-zinc-400 mt-4 text-center max-w-md">
        Oups ! La page que vous recherchez n'existe pas.
      </p>

      <div className="mt-10">
        <Button 
          variant="primary" 
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
          onClick={() => navigate('/')}
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}

export default NotFound;