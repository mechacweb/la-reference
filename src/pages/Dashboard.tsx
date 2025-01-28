import { useAuthStore } from "@/store/authStore";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Bienvenue, {user?.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Vous êtes connecté en tant que {user?.role}
      </p>
    </div>
  );
};

export default Dashboard;