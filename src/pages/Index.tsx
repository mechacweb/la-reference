import { LoginForm } from "@/components/auth/LoginForm";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { useState } from "react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);

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
        
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            variant={showLogin ? "default" : "outline"}
            onClick={() => setShowLogin(true)}
          >
            Connexion
          </Button>
          <Button
            variant={!showLogin ? "default" : "outline"}
            onClick={() => setShowLogin(false)}
          >
            Inscription
          </Button>
        </div>

        {showLogin ? <LoginForm /> : <SignUpForm />}
      </div>
    </div>
  );
};

export default Index;