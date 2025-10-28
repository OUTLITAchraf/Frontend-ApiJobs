import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthUser } from "../features/AuthSlice";

const ProtectedGuestRoute = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const { user } = useSelector((state) => state.auth);
  
  const role = user.roles?.[0]?.name;  
  
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);
  
  
  if (token && user) {
    if (role == 'user') {
      return <Navigate to="/offers" replace />;
    } else if (role == 'employer') {
      return <Navigate to="/dashboard-emloyer" replace />;
    } else {
      return <Navigate to="/dashboard-admin" replace />;
    }
    
  }

  return <Outlet />;
};

export default ProtectedGuestRoute;
