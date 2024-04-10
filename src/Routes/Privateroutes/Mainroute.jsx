import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth-pages/context";
export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to="/form" />;
  }

  return children;
};

// Mock authentication (replace with your actual implementation)
