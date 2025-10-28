import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthUser } from "../features/AuthSlice";

const ProtectedAutenticatedRoute = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAutenticatedRoute;
