import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrateur</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h2>
          <p className="text-muted-foreground">Gérez les comptes et les permissions</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Audit</h2>
          <p className="text-muted-foreground">Consultez les logs et activités</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <p className="text-muted-foreground">Paramètres système</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;