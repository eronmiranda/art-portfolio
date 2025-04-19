import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
      <Router>
        <div className="flex w-full flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-zinc-50 text-zinc-800">
            <Routes>
              <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<Work />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/articles" element={<Articles />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
