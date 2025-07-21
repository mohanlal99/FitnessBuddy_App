import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { checkUser } from "./services/userAuthSlice";
import PrivateRoute from "./app/PrivateRoute";
import GuestRoute from "./app/GuestRoute";
import NotFound from "./components/NotFound";
import { Loader } from "lucide-react";
import LoadingScreen from "./components/LoadingScreen";

const Navbar = lazy(() => import("./components/Navbar"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Buddies = lazy(() => import("./pages/Buddies"));
const Profile = lazy(() => import("./pages/Profile"));
const Messages = lazy(() => import("./pages/Messages"));
const Challenges = lazy(() => import("./pages/Challenges"));
const Workouts = lazy(() => import("./pages/Workouts"));
const SignIn = lazy(() => import("./pages/auth/SignIn"));
const Signup = lazy(() => import("./pages/auth/Signup"));

function App() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  useEffect(() => {
    if (location.pathname.includes("auth")) {
      setHidden(true);
    }else{
      setHidden(false)
    }
  }, [location]);

  useEffect(() => {
      if (user?.theam || false) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }, [user]);

  

  useEffect(() => {
  if (!user) {
    dispatch(checkUser());
  }
}, [dispatch, user]);


  return (
    <Suspense fallback={<div><LoadingScreen/></div>}>
      <div
      id="app"
        className={`flex flex-col min-h-screen max-w-7xl mx-auto overflow-x-hidden ${
          !hidden ? "pb-30" : ""
        }`}>
        <Routes>
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/auth/login" element={<GuestRoute><SignIn /></GuestRoute>} />
          <Route path="/auth/register" element={<GuestRoute><Signup /></GuestRoute>} />
          <Route path="/buddies" element={<PrivateRoute><Buddies /></PrivateRoute>} />
          <Route path="/challenges" element={<PrivateRoute><Challenges /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
          <Route path="/workouts" element={<PrivateRoute><Workouts /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="*" element={<NotFound hidden={setHidden} />} />
        </Routes>
      </div>
        {!hidden && <Navbar />}
      </Suspense>
  );
}

export default App;
