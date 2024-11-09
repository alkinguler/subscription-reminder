import { useRefreshToken } from "@/app/api/authApi";
import SubscriptionContainer from "@/modules/Subscriptions/SubscriptionContainer";
import { useNavigate } from "react-router-dom";
import { memo, useEffect } from "react";
import { useAuthSlice } from "@/store/useStore";

const Dashboard = memo(() => {
  const navigate = useNavigate();
  const { data, isSuccess, isError } = useRefreshToken();
  const { setToken } = useAuthSlice();
  const responseAccessToken: string = isSuccess ? data!.data.accessToken : null;

  useEffect(() => {
    if (isSuccess && responseAccessToken) {
      setToken(responseAccessToken);
    }
  }, [responseAccessToken, isSuccess, setToken]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return <SubscriptionContainer />;
});

export default Dashboard;
