import { useRef, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

const routeOrder = ["/", "/work", "/about", "/contact", "/404"];

function App() {
  const location = useLocation();
  const prevIndex = useRef(routeOrder.indexOf(location.pathname));
  const currentIndex = routeOrder.indexOf(location.pathname);

  const direction = currentIndex > prevIndex.current ? 1 : -1;

  useLayoutEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col bg-zinc-100">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#efd7e5_100%)]"></div>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 text-zinc-800 sm:px-8 lg:px-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 64 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 64 * direction }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function AnimatedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
