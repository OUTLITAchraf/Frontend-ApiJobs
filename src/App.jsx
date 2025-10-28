import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import OffersPage from "./pages/OffersPage";
import ProtectedAutenticatedRoute from "./routes/ProtectedAutenticatedRoute";
import ProtectedGuestRoute from "./routes/ProtectedGuestRoute";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedGuestRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedAutenticatedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/offers" element={<OffersPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
