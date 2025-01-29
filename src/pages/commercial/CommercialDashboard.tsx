import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const CommercialDashboard = () => {
  const { user } = useAuthStore();

  if (!user || user.role !== 'commercial') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Commercial</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mes Prospects</h2>
          <p className="text-muted-foreground">Gérez vos prospects et opportunités</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Pipeline</h2>
          <p className="text-muted-foreground">Visualisez votre pipeline de vente</p>
        </div>
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tâches</h2>
          <p className="text-muted-foreground">Gérez vos tâches et relances</p>
        </div>
      </div>
    </div>
  );
};

export default CommercialDashboard;