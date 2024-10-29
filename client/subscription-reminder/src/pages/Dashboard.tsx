import { refreshToken } from "@/app/api/authApi";
import SubscriptionContainer from "@/modules/Subscriptions/SubscriptionContainer";
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

  return <SubscriptionContainer />;
};

export default Dashboard;
