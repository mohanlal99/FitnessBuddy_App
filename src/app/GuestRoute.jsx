// GuestRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function GuestRoute({ children }) {
  const {user, loading} = useSelector((state) => state.auth);


  if (loading) return <LoadingScreen/>

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
