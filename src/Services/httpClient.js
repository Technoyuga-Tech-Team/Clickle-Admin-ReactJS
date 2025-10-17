import axios from "axios";
import { logout } from "../Utills/logout";
import { VITE_APP_REACT_BASE_URL } from "../config/config";
import { getCancelToken } from "./cancelToken";
const url = VITE_APP_REACT_BASE_URL;

export const api_services = axios.create({
  baseURL: url,
});

const getToken = () => {
  const token = localStorage.getItem("PIE_ADMIN_TOKEN");
  return `Bearer ${token}`;
};

const urlToAddCancelToken = [];

api_services.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    if (urlToAddCancelToken?.includes(config.url)) {
      config.cancelToken = getCancelToken(config.url);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api_services.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
