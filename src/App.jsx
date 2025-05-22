import { lazy, Suspense, useRef, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { MotionDiv, MotionPresence } from "./components/Motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CircleLoader from "./components/CircleLoader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routeOrder = [
  "/",
  "/work",
  "/about",
  "/contact",
  "/admin",
  "/signin",
  "/forgot-password",
  "/404",
];

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
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-hidden">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 sm:px-8 lg:px-12">
        <MotionPresence mode="popLayout" initial={false} custom={direction}>
          <MotionDiv
            key={location.pathname}
            variants={motionVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Suspense fallback={<CircleLoader size="36" className="mt-35" />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Routes>
            </Suspense>
          </MotionDiv>
        </MotionPresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
