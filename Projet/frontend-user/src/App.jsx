
import './App.css'
import Navbar from './components/common/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

function App() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Home />
            </main>
            <Footer />
        </div>
    )
    }
    export default App
