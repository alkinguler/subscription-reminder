import { refreshToken } from "@/app/api/authApi";
import useAuthStore from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken(
      () => {},
      () => navigate("/login")
    );
  });

  const { username } = useAuthStore();
  return <div>Hi, {username}</div>;
};

export default Dashboard;
