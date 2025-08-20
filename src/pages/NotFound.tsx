import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="mesrs-card max-w-md w-full p-8 text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-accent" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">404</h1>
            <h2 className="text-xl font-semibold text-foreground">
              Page non trouvée
            </h2>
            <p className="text-muted-foreground">
              Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
            </p>
          </div>
        </div>
        
        <Button 
          onClick={() => navigate('/')}
          className="mesrs-button-primary w-full"
        >
          <Home className="h-4 w-4 mr-2" />
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
