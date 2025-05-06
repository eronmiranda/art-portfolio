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

  const motionVariants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      // transition: 'ease-in',
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        // transition: 'ease-in',
        transition: {
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      };
    },
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-zinc-100">
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-100 [background:radial-gradient(125%_125%_at_50%_10%,#f4f4f5_40%,#efd7e5_100%)]"></div>
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 text-zinc-800 sm:px-8 lg:px-12">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={location.pathname}
            variants={motionVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
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
