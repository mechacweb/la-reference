import { LoginForm } from "@/components/auth/LoginForm";
import { APP_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            {APP_NAME}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Gérez vos prospects efficacement
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
};

export default Index;