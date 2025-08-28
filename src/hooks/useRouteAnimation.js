import { useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ROUTE_ORDER = [
  "/",
  "/work",
  "/contact",
  "/admin",
  "/signin",
  "/forgot-password",
  "/404",
];

// manages route animation direction based on route order
// returns object containing current location and animation direction
export default function useRouteAnimation() {
  const location = useLocation();
  const prevIndex = useRef(ROUTE_ORDER.indexOf(location.pathname));
  const currentIndex = ROUTE_ORDER.indexOf(location.pathname);
  const direction = currentIndex > prevIndex.current ? 1 : -1;

  useLayoutEffect(() => {
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  return { location, direction };
}
