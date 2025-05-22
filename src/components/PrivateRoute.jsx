import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ redirectPath = "/signin" }) {
  const { currentUser } = useAuth();

  return <>{currentUser ? <Outlet /> : <Navigate to={redirectPath} />}</>;
}
