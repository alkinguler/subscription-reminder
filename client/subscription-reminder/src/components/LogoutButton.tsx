import Button from "./ui/Button/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/Toaster/hooks/use-toast";
import { logOut } from "@/app/api/authApi";
import useAuthStore from "@/store/auth/useAuthStore";

const LogoutButton = () => {
  const { resetAuthData } = useAuthStore();
  const { toast } = useToast();
  const onLogOutSuccess = () => {
    toast({
      title: "Successful",
      variant: "successful",
      icon: true,
    });
    resetAuthData();
  };

  const onLogOutError = () => {
    toast({
      title: "Could not logout",
      variant: "destructive",
      icon: true,
    });
  };

  const onLogoutClick = () => {
    logOut(onLogOutSuccess, onLogOutError);
  };
  return (
    <Button size="icon" variant="outline" onClick={onLogoutClick}>
      <LogOut className="absolute" />
    </Button>
  );
};

export default LogoutButton;
