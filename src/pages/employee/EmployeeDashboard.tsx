import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'employee') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Employé</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Prospects partagés</h2>
          <p className="text-muted-foreground">Consultez les prospects partagés avec vous</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <p className="text-muted-foreground">Accédez aux documents partagés</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mes tâches</h2>
          <p className="text-muted-foreground">Gérez vos tâches assignées</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;