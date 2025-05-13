import { lazy, Suspense, useRef, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { MotionDiv } from "./components/Motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SkeletonContent from "./components/SkeletonContent";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routeOrder = ["/", "/work", "/about", "/contact", "/404"];

function AnimatedApp() {
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
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-hidden dark:bg-zinc-900">
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-100 [background:radial-gradient(125%_125%_at_50%_10%,#f4f4f5_40%,#efd7e5_100%)] dark:hidden dark:bg-zinc-900" />
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 text-zinc-800 sm:px-8 lg:px-12 dark:text-zinc-100">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <MotionDiv
            key={location.pathname}
            variants={motionVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Suspense fallback={<SkeletonContent />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </Suspense>
          </MotionDiv>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatedApp />
    </Router>
  );
}

export default App;
