import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Bienvenue, {user?.name}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Vous êtes connecté en tant que {user?.role}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;