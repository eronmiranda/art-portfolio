import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

function App() {
  return (
      <Router>
        <div className="flex w-full flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-zinc-100 text-zinc-800">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/Contact" element={<Work />} /> */}
              {/* <Route path="/Contact" element={<Contact />} /> */}
              {/* <Route path="/Gallery" element={<Gallery />} /> */}
              {/* <Route path="/Blog" element={<Blog />} /> */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
