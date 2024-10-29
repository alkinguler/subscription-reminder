import Button from "./ui/Button/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/Toaster/hooks/use-toast";
import { useLogOut } from "@/app/api/authApi";
import { useAuthSlice } from "@/store/useStore";

const LogoutButton = () => {
  const { resetAuthData } = useAuthSlice();
  const logOutQuery = useLogOut();
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
    logOutQuery.mutate(undefined, {
      onSuccess: () => {
        onLogOutSuccess();
      },
      onError: () => {
        onLogOutError();
      },
    });
  };
  return (
    <Button size="icon" variant="outline" onClick={onLogoutClick}>
      <LogOut className="absolute" />
    </Button>
  );
};

export default LogoutButton;
