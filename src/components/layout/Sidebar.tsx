import { useAuthStore } from "@/store/authStore";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  BarChart,
  Briefcase,
  CheckSquare
} from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const menuItems = {
    admin: [
      { icon: Users, label: "Utilisateurs", path: "/admin/users" },
      { icon: Briefcase, label: "Prospects", path: "/admin/leads" },
      { icon: FileText, label: "Documents", path: "/admin/documents" },
      { icon: Calendar, label: "Réunions", path: "/admin/meetings" },
      { icon: BarChart, label: "Statistiques", path: "/admin/stats" },
      { icon: Settings, label: "Paramètres", path: "/admin/settings" },
    ],
    commercial: [
      { icon: Briefcase, label: "Mes Prospects", path: "/commercial/leads" },
      { icon: CheckSquare, label: "Mes Tâches", path: "/commercial/tasks" },
      { icon: Calendar, label: "Réunions", path: "/commercial/meetings" },
      { icon: FileText, label: "Documents", path: "/commercial/documents" },
      { icon: BarChart, label: "Performance", path: "/commercial/stats" },
    ],
    employee: [
      { icon: Briefcase, label: "Prospects partagés", path: "/employee/leads" },
      { icon: CheckSquare, label: "Mes Tâches", path: "/employee/tasks" },
      { icon: Calendar, label: "Réunions", path: "/employee/meetings" },
      { icon: FileText, label: "Documents", path: "/employee/documents" },
    ],
  };

  const currentMenuItems = user ? menuItems[user.role as keyof typeof menuItems] : [];

  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">CRM Pro</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {user?.name} ({user?.role})
        </p>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {currentMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Button
        variant="ghost"
        className="w-full justify-start mt-auto"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-3" />
        Se déconnecter
      </Button>
    </div>
  );
};