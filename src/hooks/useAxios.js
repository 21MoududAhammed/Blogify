import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    const authToken = auth?.authToken;

    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const originalRequest = err?.config;

        if (err?.response?.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = auth?.refreshToken;

          try {
            const response = await axios.post(
              `http://localhost:3000/auth/refresh-token`,
              { refreshToken }
            );
            if (response?.status === 200) {
              const { accessToken } = response.data;
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              setAuth({ ...auth, authToken: accessToken });
              return axios(originalRequest);
            }
          } catch (err) {
            console.log(err);
          }
        }

        return Promise.reject(err);
      }
    );
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { api };
};

export default useAxios;
