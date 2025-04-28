import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen w-full flex-col bg-zinc-100">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-grow px-4 text-zinc-800 sm:px-8 lg:px-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
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
