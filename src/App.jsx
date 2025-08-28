import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import { MotionDiv, MotionPresence } from "./components/Motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Toaster from "./components/Toaster";
import useRouteAnimation from "./hooks/useRouteAnimation";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const SignIn = lazy(() => import("./pages/SignIn"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

const ADMIN_ROUTE = "/admin";

const MOTION_CONFIG = {
  spring: { stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

const MOTION_VARIANTS = {
  initial: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", ...MOTION_CONFIG.spring },
      opacity: MOTION_CONFIG.opacity,
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    transition: {
      x: { type: "spring", ...MOTION_CONFIG.spring },
      opacity: MOTION_CONFIG.opacity,
    },
  }),
};

// Public routes configuration
const PUBLIC_ROUTES = [
  { path: "/", component: Home },
  { path: "/work", component: Work },
  { path: "/contact", component: Contact },
  { path: "/signin", component: SignIn },
  { path: "/forgot-password", component: ForgotPassword },
  { path: "/404", component: NotFound },
];

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Suspense fallback={<Loader size="h-9 w-9" className="mt-35" />}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path={ADMIN_ROUTE} element={<Admin />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function PublicLayout({ location, direction }) {
  return (
    <div className="relative isolate flex min-h-screen w-full flex-col overflow-hidden">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-grow lg:px-12">
        <MotionPresence mode="popLayout" initial={false} custom={direction}>
          <MotionDiv
            key={location.pathname}
            variants={MOTION_VARIANTS}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Suspense fallback={<Loader size="h-9 w-9" className="mt-35" />}>
              <Routes location={location} key={location.pathname}>
                {PUBLIC_ROUTES.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
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

function AnimatedApp() {
  const { location, direction } = useRouteAnimation();
  const isAdminRoute = location.pathname === ADMIN_ROUTE;

  if (isAdminRoute) {
    return <AdminLayout />;
  }

  return <PublicLayout location={location} direction={direction} />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AnimatedApp />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
