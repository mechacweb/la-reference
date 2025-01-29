import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet } from "react-router-dom";

export const MainLayout = () => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  // Redirection basée sur le rôle si l'utilisateur essaie d'accéder à une route non autorisée
  const currentPath = window.location.pathname;
  if (
    (user.role === 'employee' && !currentPath.startsWith('/employee')) ||
    (user.role === 'commercial' && !currentPath.startsWith('/commercial')) ||
    (user.role === 'admin' && !currentPath.startsWith('/admin'))
  ) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};