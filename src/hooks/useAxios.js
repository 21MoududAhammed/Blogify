import { useEffect } from "react";
import api from "../api";
import useAuth from "./useAuth";
import axios from "axios";

const useAxios = () => {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // auth/ access token
    const authToken = auth?.authToken;
    //  request interceptor
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
    //  response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        const originalRequest = err?.config;

        if (err?.response?.status === 403 && !originalRequest._retry) {
          // to prevent recall
          originalRequest._retry = true;
          // refreshToken
          const refreshToken = auth?.refreshToken;

          try {
            const response = await axios.post(
              `http://localhost:3000/auth/refresh-token`,
              { refreshToken }
            );
            if (response?.status === 200) {
              const { accessToken } = response.data;
              // set new bearer token to recall
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
    // clean up
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return { api };
};

export default useAxios;
