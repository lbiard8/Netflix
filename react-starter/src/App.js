import "./App.css";
import Formulaire from "./components/Formulaire"; // Import du composant formulaire
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="m-5">
      <header className="title">
        <h1 className="text-center">Mon formulaire</h1>
      </header>

      <div className="center">
        {/* Utilisation du composant */}
        <Formulaire />
      </div>
    </div>
  );
}

export default App;