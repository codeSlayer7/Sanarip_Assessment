import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [isAuth, setAuth] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setAuth(user);
    }
  }, []);
  if (!isAuth) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
