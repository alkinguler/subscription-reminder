import axios from "axios";

interface AxiosConfig {
  baseURL: string;
  withCredentials: boolean;
}

const axiosConfig: AxiosConfig = {
  baseURL: "http://localhost:8080/",
  withCredentials: true,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;
