import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./features/auth/context/AuthContext";

// Layout (src/features/layout/)
import Header from "./features/layout/Header";
import Content from "./features/layout/Content";
import Footer from "./features/layout/Footer";
 
// Auth Pages
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import { AdminDashboard } from "./dashboard/dashboard";

// ──────────────────────────────────────────────
// Layout principal con Header y Footer
// ──────────────────────────────────────────────
const MainLayout = () => (
  <>
    <Header />
    <Content />
    <Footer />
  </>
);

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 32, textAlign: 'center' }}>Cargando...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

// ──────────────────────────────────────────────
// Rutas de la aplicación
// ──────────────────────────────────────────────
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route
          path="/login"
          element={!loading && isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;