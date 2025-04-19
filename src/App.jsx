import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex h-full bg-zinc-50">
      <Router>
        <div className="flex w-full flex-col">
          <Header />
          <main className="flex-grow">
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
    </div>
  );
}

export default App;
