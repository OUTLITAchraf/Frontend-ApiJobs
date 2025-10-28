import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthUser } from "../features/AuthSlice";

const ProtectedGuestRoute = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);
  
  
  if (token && user) {
    return <Navigate to="/offers" replace />;
  }

  return <Outlet />;
};

export default ProtectedGuestRoute;
